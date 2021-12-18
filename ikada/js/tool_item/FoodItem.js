
import {ToolItem} from './ToolItem.js';

// TODO
export class FoodItem extends ToolItem {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'cooking_agodashi' );
        this.saving_data.item_name = '食糧';

    }
}
