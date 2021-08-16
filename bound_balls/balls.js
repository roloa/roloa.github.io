
import {BallBase} from './ball_base.js';


export class BaseBall extends BallBase{
}
export class RedBall extends BaseBall{
    constructor(){
        super()
        this.name = 'RedBall'
        this.image_file_name = 'red_ball.png'
        this.image.src = this.image_file_name;

    }
    on_release( game ){
        super.on_release( game )
        this.dx = 10
        this.dy = -5
    }

}

export class NineBall extends BaseBall{
    constructor(){
        super()
        this.name = 'NineBall'
        this.image.src = 'nine.png'
        this.gravity = 0
    }

}
