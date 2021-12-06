
import {Entity} from './entity.js';

export class EnemyFish extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'fish_sakana_iwashi' )

        this.width = 128;
        this.height = 128;
    }

    test_hit_bullet( bullet ){
        if( this.x < bullet.x && bullet.x < this.x + this.width &&
            this.y < bullet.y && bullet.y < this.y + this.height ){
            // 弾に当たった
            return true;
        }
        return false;
    }

    on_update(){
        this.x -= 1;
    }
    on_draw( canvas ){

        canvas.drawImage( this.image, this.x, this.y, this.width, this.height );

    }
}
