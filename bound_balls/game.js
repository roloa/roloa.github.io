
import * as Balls from './balls.js';


export class Game {
    constructor(){
        this.name = 'Bound Balls'
        this.version = '0.1'

        this.ball_list = []
        this.ball_id_counter = 10
        this.canvas = document.getElementById('my_canvas').getContext('2d')

        this.field = {}
        this.field.width = 640
        this.field.height = 480

        setInterval( this.on_update.bind(this), 20 )

    }

    reset(){
        console.log(this.name, this.version)


        this.add_ball( new Balls.BaseBall() , Math.random()*400, Math.random()*400 )
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

        this.canvas.fillStyle = 'rgb(200,200,255)'
        this.canvas.fillRect(0,0,640,480)

        for( let ball in this.ball_list ){
            this.ball_list[ ball ].draw_canvas( this.canvas )
        }

    }
}
