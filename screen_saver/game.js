
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

        // 時計
        let date = new Date()

        this.canvas2d.save()
        this.canvas2d.translate( this.canvas.width * 0.5 , this.canvas.height * 0.5 )
        let hour_rot = ((date.getHours()+(date.getMinutes()*0.0166)-3)/6) * Math.PI
        this.canvas2d.rotate(hour_rot)
        this.canvas2d.fillStyle = "rgb(255,255,255)"
        let hour_hand_length = this.shorter_width * 0.2
        let hour_hand_thick  = this.shorter_width * 0.04

        this.canvas2d.translate(-hour_hand_length/10, -hour_hand_thick/2 )
        this.canvas2d.fillRect(0, 0, hour_hand_length*1.1 , hour_hand_thick )
        this.canvas2d.restore()

        this.canvas2d.save()
        this.canvas2d.translate( this.canvas.width * 0.5 , this.canvas.height * 0.5 )
        let minute_rot = ((date.getMinutes()+(date.getSeconds()*0.0166)-15)/30) * Math.PI
        this.canvas2d.rotate(minute_rot)
        this.canvas2d.fillStyle = "rgb(255,255,255)"
        let minute_hand_length = this.shorter_width * 0.4
        let minute_hand_thick  = this.shorter_width * 0.02
        this.canvas2d.translate(-minute_hand_length/10, -minute_hand_thick/2 )
        this.canvas2d.fillRect(0, 0, minute_hand_length*1.1 , minute_hand_thick )
        this.canvas2d.restore()

        this.canvas2d.save()
        this.canvas2d.translate( this.canvas.width * 0.5 , this.canvas.height * 0.5 )
        let second_rot = ((date.getSeconds()+(date.getMilliseconds()*0.001)-15)/30) * Math.PI
        this.canvas2d.rotate(second_rot)
        this.canvas2d.fillStyle = "rgb(255,255,255)"
        let second_hand_length = this.shorter_width * 0.35
        let second_hand_thick  = this.shorter_width * 0.001
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

        // 水たまり
        // 数学がわからなくなったので断念
        // // 秒針の先端座標
        // let second_x = second_hand_length * Math.cos( second_rot )
        // let second_y = second_hand_length * Math.sin( second_rot )
        //
        // // 長針の先端座標
        // let minute_x = second_x
        // let minute_y = second_y
        // //this.add_sprite( new Sprites.Sparkle(), minute_x, minute_y )
        //
        // // 短針の先端座標
        // let hour_x = hour_hand_length * Math.cos( hour_rot )
        // let hour_y = hour_hand_length * Math.sin( hour_rot )
        // //this.add_sprite( new Sprites.Sparkle(), hour_x, hour_y )
        //
        // if( 0 < minute_y && 0 < hour_y ){
        //     // 両針の先が真ん中より上にある
        //     let hour_actual_x = hour_x + this.canvas.width * 0.5
        //     let hour_actual_y = hour_y + this.canvas.height * 0.5
        //     let minute_actual_x = minute_x + this.canvas.width * 0.5
        //     let minute_actual_y = minute_y + this.canvas.height * 0.5
        //     if( hour_y < minute_y ){
        //         // 短針のほうが上
        //
        //     } else {
        //
        //     }
        //
        //
        // }

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

    }
}
