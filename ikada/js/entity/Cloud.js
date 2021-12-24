
import {Entity} from './Entity.js';

export class Cloud extends Entity {

    constructor( game ){
        super( game )
        this.game = game;

        this.vx = -0.1;

        this.image = this.game.image_library.get_image('cloud');

    }
    on_update(){
        super.on_update();
        this.x += this.vx;

        // プレイヤーとの当たり判定
        let player = this.game.world.player;
        if( player.x - 64 < this.x && this.x < player.x + 64 &&
            player.y - 48 < this.y && this.y < player.y + 48
        ){
            this.is_alive = false;
        }


    }
    on_draw( canvas ){
        canvas.strokeStyle = 'rgb(200,0,0)'
        canvas.drawImage( this.image, this.x - 64, this.y - 48, 128, 96)

    }
}
