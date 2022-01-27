
import {Entity} from '../Entity.js';

export class OperateEffect extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        //this.image = this.game.image_library.get_image('yurei_youngwoman3_sad');
        this.speed = 2;
        this.vx = 0;
        this.vy = 0;
        this.parent = null;
    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;

        if( this.parent ){
            let xdist = this.parent.x - this.x;
            let ydist = this.parent.y - this.y;
            if( 5 < xdist ){
                this.vx = this.speed;
            } else if ( xdist < -5 ){
                this.vx = -this.speed;
            } else {
                this.vx = 0;
            }
            if( 5 < ydist ){
                this.vy = this.speed;
            } else if( ydist < -5 ){
                this.vy = -this.speed;
            } else {
                this.vy = 0;
            }
            if( Math.abs( xdist) < 10 && Math.abs( ydist ) < 10 ){
                this.is_alive = false;
            }
        } else {
            // なぜか親がいない
            this.is_alive = false;
        }
    }
    on_draw( canvas ){
        // drawimageで幅高さをマイナスにしても反転しない？
        // canvas.drawImage( this.image, this.x + this.width, this.y + this.height, -this.width, -this.height);

        canvas.save();
        canvas.translate(this.x, this.y);
        canvas.strokeStyle = 'rgb(100, 200, 200)';
        canvas.lineWidth = 3;
        canvas.beginPath();
        canvas.moveTo(0, 0);
        canvas.lineTo(this.vx * 5, this.vy * 5);
        canvas.stroke();
        canvas.restore();
    }
}
