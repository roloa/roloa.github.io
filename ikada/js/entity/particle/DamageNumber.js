
import {Entity} from '../Entity.js';

export class DamageNumber extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * -3 - 3;
        this.gravity = 0.2;

        this.number = 0;

        this.life_time = 50;

    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        // 寿命
        if( 0 < this.life_time ){
            this.life_time -= 1;
        } else {
            this.is_alive = false;
        }
    }
    on_draw( canvas ){
        canvas.fillStyle = 'rgb(250,20,20)';
        canvas.font = 'bold 32px monospace'
        canvas.fillText( this.number, this.x, this.y);
    }
}
