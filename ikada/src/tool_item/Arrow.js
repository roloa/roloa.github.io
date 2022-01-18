
import {ToolItem} from './ToolItem.js';

// TODO
export class Arrow extends ToolItem {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'darts_ya' );
        this.saving_data.item_name = '矢';

    }
}
