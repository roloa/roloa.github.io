
import {ShipBlock} from './ShipBlock.js';
import {ShipFarm} from './ShipFarm.js';
import {VeggieTomato} from '../tool_item/d_foods/VeggieTomato.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

export class ShipFarmWood extends ShipFarm {

    constructor( game ){
        super( game );

        this.name = '木材プランター';
        this.image = this.game.image_library.get_image('dougu_torobune_tsuchi_yellow');
        this.image_dark = this.game.image_library.get_image('dougu_torobune_tsuchi_yellow_dark');
    }
    generate_veggie(){
        let new_item = new ResourceItem( game );
        new_item.set_name('木材マテリアル');
        new_item.set_image( 'wood_maruta_single' );
        new_item.add_material( 'wood', 30);
        return new_item;
    }
}
