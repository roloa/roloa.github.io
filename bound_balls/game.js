
import * as Balls from './balls.js';

export class Game {
    constructor(){
        this.name = 'Bound Balls'
        this.version = '0.1'

        this.ball_list = []
        this.ball_id_counter = 10

        this.canvas = document.getElementById('my_canvas')
        this.canvas2d = this.canvas.getContext('2d')

        this.field = {}
        this.field.width = 640
        this.field.height = 480

        this.grabbing_ball = null

        this.mouse_x = 100
        this.mouse_y = 100

        setInterval( this.on_update.bind(this), 20 )
        this.canvas.onmousedown = this.on_mouse_down.bind(this)
        this.canvas.onmouseup = this.on_mouse_up.bind(this)
        this.canvas.onmousemove = this.on_mouse_move.bind(this)
    }

    on_mouse_down( event ){
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y

        for( let i in this.ball_list ){
            if( this.ball_list[ i ].hit_point_test( this.mouse_x, this.mouse_y )){
                this.grabbing_ball = this.ball_list[ i ]
                this.grabbing_ball.on_grab( this )
                break;
            }
        }
    }

    on_mouse_up( event ){
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y
        if( this.grabbing_ball !== null ){
            this.grabbing_ball.on_release( this )
            this.grabbing_ball = null
        }
    }
    on_mouse_move( event ) {
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y

    }

    reset(){
        console.log(this.name, this.version)


        this.add_ball( new Balls.BaseBall() , Math.random()*400, Math.random()*400 )
        this.add_ball( new Balls.BaseBall() , Math.random()*400, Math.random()*400 )
        this.add_ball( new Balls.NineBall() , Math.random()*400, Math.random()*400 )
        this.add_ball( new Balls.NineBall() , Math.random()*400, Math.random()*400 )
        this.add_ball( new Balls.NineBall() , Math.random()*400, Math.random()*400 )
        this.add_ball( new Balls.RedBall() , Math.random()*400, Math.random()*400 )
    }

    add_ball( new_ball, new_x, new_y ){

        new_ball.id = this.ball_id_counter

        new_ball.x = new_x
        new_ball.y = new_y

        this.ball_list[ this.ball_id_counter ] = new_ball
        this.ball_id_counter += 1


        // DOM設置
        // let new_div = document.createElement('div')
        // new_div.id = new_ball.name + new_ball.id
        // new_div.style['position'] = 'absolute'
        // let new_img = document.createElement('img')
        // new_img.src = new_ball.image_file_name
        // new_div.appendChild( new_img )
        // new_ball.dom = new_div
        // document.getElementById('app').appendChild( new_div )

    }

    remove_ball( delete_id ){
        if ( delete this.ball_list[ delete_id ] ) {
            console.log('delete ok')
        } else {
            console.log('delete NG')
        }

    }

    on_update(){

        for( let ball in this.ball_list ){
            this.ball_list[ ball ].on_update( this )
        }

        this.canvas2d.fillStyle = 'rgb(200,200,255)'
        this.canvas2d.fillRect(0,0,640,480)

        for( let ball in this.ball_list ){
            this.ball_list[ ball ].draw_canvas( this.canvas2d )
        }

    }
}
