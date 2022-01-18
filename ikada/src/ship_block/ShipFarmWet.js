
import {ShipBlock} from './ShipBlock.js';
import {ShipFarm} from './ShipFarm.js';
import {VeggieTomato} from '../tool_item/d_foods/VeggieTomato.js';


export class ShipFarmWet extends ShipFarm {

    constructor( game ){
        super( game );

        this.name = '上級プランター';

        this.is_floor = false;
        this.image = this.game.image_library.get_image('dougu_torobune_tsuchi');
        this.food = null;
        this.saving_data.growing_timer = 0;
        this.growing_timer_max = 500;
    }

}
