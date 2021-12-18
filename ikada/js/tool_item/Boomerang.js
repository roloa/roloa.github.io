
import {ToolItem} from './ToolItem.js';

// TODO
export class Boomerang extends ToolItem {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'boomerang' );
        this.saving_data.item_name = 'ブーメラン';

    }
}
