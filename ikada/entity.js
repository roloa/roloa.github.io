
//import {Entity} from './entity.js';
import {ShipBlock} from './ship_block/ship_block.js';

export class Entity {
    constructor( game ){
        this.name = 'noname_entity';

        this.game = game;

        this.x = 0;
        this.y = 0;

        this.is_alive = true;


    }

    on_update(){

        // 消滅判定
        if( this.x < -1000 || 1000 < this.x || this.y < -1000 || 1000 < this.y ){
            this.is_alive = false;
        }


    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,0,0)'
        canvas.strokeRect( this.x - 16, this.y - 32, 32, 32)

    }
}
