
import {Entity} from './entity.js';

export class Bullet extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.vx = 0;
        this.vy = 0;
        this.gravity = 0;

        this.line_x = 10;
        this.line_y = 10;

    }
    on_update(){
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        super.on_update();

    }
    on_draw( canvas ){
        canvas.strokeStyle = 'rgb(250,250,20)';
        canvas.lineWidth = 5;
        canvas.beginPath();
        canvas.moveTo( this.x, this.y);
        canvas.lineTo( this.x + this.line_x, this.y + this.line_y);
        canvas.stroke();
    }
}
