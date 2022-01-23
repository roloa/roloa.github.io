
import {ShipBlock} from './ShipBlock.js';
import {ShipFarm} from './ShipFarm.js';
import {VeggieTomato} from '../tool_item/d_foods/VeggieTomato.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

export class ShipFarmFood extends ShipFarm {

    constructor( game ){
        super( game );

        this.name = '食料プランター';
        this.image = this.game.image_library.get_image('dougu_torobune_tsuchi_red');
        this.image_dark = this.game.image_library.get_image('dougu_torobune_tsuchi_red_dark');
    }
    generate_veggie(){
        return new VeggieTomato( this.game );
    }
}
