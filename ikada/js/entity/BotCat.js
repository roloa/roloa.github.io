

import {Entity} from './Entity.js';
import {PathFinding} from './PathFinding.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

import {SolidFuel} from '../tool_item/SolidFuel.js';
import {AmmoItem} from '../tool_item/AmmoItem.js';
import {CannonAmmoItem} from '../tool_item/CannonAmmoItem.js';

import {BotDog} from './BotDog.js';

export class BotCat extends BotDog {
    constructor( game ){

        super( game );

        this.name = 'ネコ型ロボット';
        this.image = this.game.image_library.get_image('pet_robot_cat');


    }

    on_think_ai(){

        if( this.ai_healing_self() ){
            return true;
        }
        if( this.ai_delivery_item() ){
            return true;
        }
        if( this.ai_supply_ammo() ){
            return true;
        }
        if( this.ai_operate_weapon() ){
            return true;
        }
        if( this.set_cooldown() ){
            return true;
        }

        return false;
    }
}
