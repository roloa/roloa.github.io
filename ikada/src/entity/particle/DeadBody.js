
import {Entity} from '../Entity.js';

export class DeadBody extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.vx = Math.random() * 6 - 3;
        this.vy = Math.random() * -3 - 3;
        this.gravity = 0.2;

        this.number = 0;
        this.image = this.game.image_library.get_image('yurei_youngwoman3_sad');
        this.height = 100;
        this.width = 100;

        this.life_time = 100;

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
        // drawimageで幅高さをマイナスにしても反転しない？
        // canvas.drawImage( this.image, this.x + this.width, this.y + this.height, -this.width, -this.height);

        canvas.save();
        canvas.translate(this.x, this.y);
        canvas.scale(-1, -1)
        canvas.drawImage( this.image, -this.width*0.5, -this.height*0.5, this.width, this.height);
        canvas.restore();
    }
}
