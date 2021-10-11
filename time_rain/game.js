
import * as Sprites from './sprites.js';

export class Game {
    constructor(){
        this.name = 'Screen Saver'
        this.version = '0.1'

        this.sprite_list = []
        this.sprite_id_counter = 10
        this.MAX_SPRITE_NUM = 1000

        this.canvas = document.getElementById('my_canvas')
        this.canvas2d = this.canvas.getContext('2d')

        this.field = {}
        this.field.width = 640
        this.field.height = 480


        this.mouse_x = 100
        this.mouse_y = 100

        this.shorter_width = 100

        this.wind = 0.1
        this.wind_changing = -0.01

        setInterval( this.on_update.bind(this), 20 )
        this.canvas.onmousedown = this.on_mouse_down.bind(this)
        this.canvas.onmouseup = this.on_mouse_up.bind(this)
        this.canvas.onmousemove = this.on_mouse_move.bind(this)
    }

    add_sprite( new_sprite, new_x, new_y ){
        new_sprite.x = new_x
        new_sprite.y = new_y

        this.sprite_id_counter += 1
        if( this.MAX_SPRITE_NUM < this.sprite_id_counter ){
            this.sprite_id_counter = 0
        }

        this.sprite_list[ this.sprite_id_counter ] = new_sprite
    }

    on_mouse_down( event ){
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y

    }

    on_mouse_up( event ){
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y
    }
    on_mouse_move( event ) {
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y

        this.add_sprite( new Sprites.Sparkle(), this.mouse_x, this.mouse_y )

    }

    reset(){
        console.log(this.name, this.version)
    }

    on_update(){

        this.canvas2d.fillStyle = 'rgba(0,0,0,0.1)'
        this.canvas2d.fillRect(0,0, this.canvas.width, this.canvas.height )

        // 短辺の算出
        if( this.canvas.width < this.canvas.height ){
            this.shorter_width = this.canvas.width
        } else {
            this.shorter_width = this.canvas.height
        }

        // 降雨
        for(let i = 0 ; i < 1 ; i++) {
            let new_rain_x = (Math.random() * (this.canvas.width + 400)) - 200
            let new_rain_y = -10
            this.add_sprite( new Sprites.Raindrop(), new_rain_x , new_rain_y )
        }

        // 時計のパラメータ計算
        let date = new Date()

        let hour_rot = ((date.getHours()+(date.getMinutes()*0.0166)-3)/6) * Math.PI
        let hour_hand_length = this.shorter_width * 0.2
        let hour_hand_thick  = this.shorter_width * 0.04

        let minute_rot = ((date.getMinutes()+(date.getSeconds()*0.0166)-15)/30) * Math.PI
        let minute_hand_length = this.shorter_width * 0.4
        let minute_hand_thick  = this.shorter_width * 0.02

        let second_rot = ((date.getSeconds()+(date.getMilliseconds()*0.001)-15)/30) * Math.PI
        let second_hand_length = this.shorter_width * 0.35
        let second_hand_thick  = this.shorter_width * 0.001

        if( false ){
            // テストモード
            hour_rot　 = second_rot * -2
            minute_rot = second_rot * 5
        }

        // 各スプライトの処理と描画
        for(let i in this.sprite_list){
            if( this.sprite_list[ i ].isAlive ){
                this.sprite_list[ i ].on_update( this )
            }
        }
        for(let i in this.sprite_list){
            if( this.sprite_list[ i ].isAlive ){
                this.sprite_list[ i ].on_draw( this.canvas2d )
            }
        }

        // 水たまり

        // 秒針の先端座標
        let second_x = second_hand_length * Math.cos( second_rot )
        let second_y = second_hand_length * Math.sin( second_rot )

        // 長針の先端座標
        let minute_x = minute_hand_length * Math.cos( minute_rot )
        let minute_y = minute_hand_length * Math.sin( minute_rot )
        if( 0 < minute_x ){
            // 針が右側の位置にあるなら、針の太さ分だけ左側に
            minute_x += minute_hand_thick * Math.cos( minute_rot - Math.PI * 0.5 ) * 0.5
            minute_y += minute_hand_thick * Math.sin( minute_rot - Math.PI * 0.5 ) * 0.5
        } else {
            minute_x += minute_hand_thick * Math.cos( minute_rot + Math.PI * 0.5 ) * 0.5
            minute_y += minute_hand_thick * Math.sin( minute_rot + Math.PI * 0.5 ) * 0.5
        }

        // 短針の先端座標
        let hour_x = hour_hand_length * Math.cos( hour_rot )
        let hour_y = hour_hand_length * Math.sin( hour_rot )
        if( 0 < hour_x ){
            // 針が右側の位置にあるなら、針の太さ分だけ左側に
            hour_x += hour_hand_thick * Math.cos( hour_rot - Math.PI * 0.5 ) * 0.5
            hour_y += hour_hand_thick * Math.sin( hour_rot - Math.PI * 0.5 ) * 0.5
        } else {
            hour_x += hour_hand_thick * Math.cos( hour_rot + Math.PI * 0.5 ) * 0.5
            hour_y += hour_hand_thick * Math.sin( hour_rot + Math.PI * 0.5 ) * 0.5
        }
        //this.add_sprite( new Sprites.Sparkle(), hour_x, hour_y )

        if( minute_y　< 0 && hour_y < 0){
            // 両針の先が真ん中より高い位置にある
            let hour_actual_x = hour_x + this.canvas.width * 0.5
            let hour_actual_y = hour_y + this.canvas.height * 0.5
            let minute_actual_x = minute_x + this.canvas.width * 0.5
            let minute_actual_y = minute_y + this.canvas.height * 0.5
            if( hour_y < minute_y ){
                // 短針のほうが上
                // 交点のy座標と針先のy座標の割合を、針先のx座標に掛ける
                let hour_cross_x = Math.abs(minute_y / hour_y) * hour_x + this.canvas.width * 0.5
                this.canvas2d.strokeStyle = 'rgb(0,0,0)'
                this.canvas2d.fillStyle = 'rgb(1,1,10)'
                this.canvas2d.beginPath()
                this.canvas2d.moveTo( minute_actual_x , minute_actual_y )
                this.canvas2d.lineTo( hour_cross_x , minute_actual_y )
                this.canvas2d.lineTo( this.canvas.width * 0.5 ,this.canvas.height * 0.5 )
                this.canvas2d.fill()

                this.canvas2d.fillStyle = 'rgba(0,0,0,0)'
                this.canvas2d.strokeStyle = 'rgb(0,0,255)'
                this.canvas2d.beginPath()
                this.canvas2d.moveTo( minute_actual_x , minute_actual_y )
                let start_x = minute_actual_x
                let goal_x = hour_cross_x
                if( goal_x <= start_x ){
                    start_x = hour_cross_x
                    goal_x = minute_actual_x
                }
                for( let ripple_x = start_x ; ripple_x < goal_x ; ripple_x += Math.random() * 10 ){
                    if( Math.random() < 0.02) {
                        this.canvas2d.lineTo( ripple_x , minute_actual_y + Math.random() * 10 - 5)
                    } else {
                        this.canvas2d.lineTo( ripple_x , minute_actual_y )
                    }
                }
                this.canvas2d.lineTo( hour_cross_x , minute_actual_y )
                this.canvas2d.stroke()

                //長針の先から雨がこぼれる
                // let new_drop = new Sprites.Raindrop()
                // if( 0 < minute_x ) {
                //     new_drop.dx = 2
                // } else {
                //     new_drop.dx = -2
                // }
                // this.add_sprite( new_drop, minute_actual_x, minute_actual_y)

            } else {
                let minute_cross_x = Math.abs(hour_y / minute_y) * minute_x + this.canvas.width * 0.5

                this.canvas2d.strokeStyle = 'rgb(0,0,0)'
                this.canvas2d.fillStyle = 'rgb(1,1,10)'
                this.canvas2d.beginPath()
                this.canvas2d.moveTo( hour_actual_x , hour_actual_y )
                this.canvas2d.lineTo( minute_cross_x , hour_actual_y )
                this.canvas2d.lineTo( this.canvas.width * 0.5 ,this.canvas.height * 0.5 )
                this.canvas2d.fill()

                this.canvas2d.fillStyle = 'rgba(0,0,0,0)'
                this.canvas2d.strokeStyle = 'rgb(0,0,255)'
                this.canvas2d.beginPath()
                this.canvas2d.moveTo( hour_actual_x , hour_actual_y )
                let start_x = hour_actual_x
                let goal_x = minute_cross_x
                if( goal_x <= start_x ){
                    start_x = minute_cross_x
                    goal_x = hour_actual_x
                }
                for( let ripple_x = start_x ; ripple_x < goal_x ; ripple_x += Math.random() * 10 ){
                    if( Math.random() < 0.02) {
                        this.canvas2d.lineTo( ripple_x , hour_actual_y + Math.random() * 10 - 5)
                    } else {
                        this.canvas2d.lineTo( ripple_x , hour_actual_y )
                    }
                }
                this.canvas2d.lineTo( minute_cross_x , hour_actual_y )
                this.canvas2d.stroke()


            }
        }

        // 時計の描画
        this.canvas2d.save()
        this.canvas2d.translate( this.canvas.width * 0.5 , this.canvas.height * 0.5 )
        this.canvas2d.rotate(hour_rot)
        this.canvas2d.fillStyle = "rgb(255,255,255)"
        this.canvas2d.translate(-hour_hand_length/10, -hour_hand_thick/2 )
        this.canvas2d.fillRect(0, 0, hour_hand_length*1.1 , hour_hand_thick )
        this.canvas2d.restore()

        this.canvas2d.save()
        this.canvas2d.translate( this.canvas.width * 0.5 , this.canvas.height * 0.5 )
        this.canvas2d.rotate(minute_rot)
        this.canvas2d.fillStyle = "rgb(255,255,255)"
        this.canvas2d.translate(-minute_hand_length/10, -minute_hand_thick/2 )
        this.canvas2d.fillRect(0, 0, minute_hand_length*1.1 , minute_hand_thick )
        this.canvas2d.restore()

        this.canvas2d.save()
        this.canvas2d.translate( this.canvas.width * 0.5 , this.canvas.height * 0.5 )
        this.canvas2d.rotate(second_rot)
        this.canvas2d.fillStyle = "rgb(255,255,255)"
        this.canvas2d.translate(-second_hand_length/10, -second_hand_thick/2 )
        this.canvas2d.fillRect(0, 0, second_hand_length*1.1 , second_hand_thick )
        this.canvas2d.restore()

        // 風向
        this.wind *= 0.9
        this.wind += Math.random() * this.wind_changing
        this.wind_changing *= 0.997
        if( Math.random() < 0.01){
            this.wind_changing += Math.random() * 0.2 - 0.1
        }





    }
}
