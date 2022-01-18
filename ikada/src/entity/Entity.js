
//import {Entity} from './entity.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';

export class Entity {

    static DESPAWN_DISTANCE = 1500;

    constructor( game ){
        this.name = 'noname_entity';

        this.game = game;

        this.x = 0;
        this.y = 0;

        this.is_facing_right = true;

        this.is_alive = true;

        this.is_on_ship = false;
        this.despawn_distance = Entity.DESPAWN_DISTANCE;
        this.despawn_distance_ship = 500;
    }

    on_update(){

        // 舟の速度によって逆行する
        if( !this.is_on_ship ){
            this.x -= this.game.world.ship.velocity;
        }

        // vxによって向きを変える
        if( 1 < this.vx ){
            this.is_facing_right = true;
        } else if( this.vx < -1 ){
            this.is_facing_right = false;
        }
        
        // 消滅判定
        if( this.x < -this.despawn_distance_ship || this.despawn_distance_ship < this.x ||
            this.y < -this.despawn_distance_ship || this.despawn_distance_ship < this.y
        ){
            if( this.x < this.game.world.camera.x - this.despawn_distance || this.game.world.camera.x + this.despawn_distance < this.x ||
                this.y < this.game.world.camera.y - this.despawn_distance || this.game.world.camera.y + this.despawn_distance < this.y
            ){
                 this.is_alive = false;
            }

        }

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,0,0)'
        canvas.strokeRect( this.x - 16, this.y - 32, 32, 32)

    }
}
