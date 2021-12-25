
import {Enemy} from './Enemy.js';
import {DropItem} from './DropItem.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

import {ChickenRawMoto} from '../tool_item/d_foods/ChickenRawMoto.js';
import {ChickenRawSaki} from '../tool_item/d_foods/ChickenRawSaki.js';



export class Kamome extends Enemy {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'bird_kamome' )

        this.name = 'カモメ';
        this.strength_lv = 3;

        this.width = 64;
        this.height = 40;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;

        this.max_hp = 100;
        this.hp = 100;

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 0.1;


    }

    get_drop_tool_item(){
        let rand = Math.random() * 2
        if( rand < 1){
            let new_tool_item = new ResourceItem( this.game );
            new_tool_item.set_image( 'feather_white' );
            new_tool_item.add_material( 'feather',  Math.floor(Math.random() * 3) + 3 );
            return new_tool_item;
        } else {
            if( Math.random() < 0.5 ){
                return new ChickenRawMoto( this.game );
            } else {
                return new ChickenRawSaki( this.game );
            }
        }
    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;
    }
    on_draw( canvas ){
        super.on_draw( canvas );
    }
}
