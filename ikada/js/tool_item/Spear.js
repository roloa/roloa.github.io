
import {ToolItem} from './ToolItem.js';

// TODO
export class Spear extends ToolItem {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'buki_yari' );
        // this.image = this.game.image_library.get_image( 'war_trident' );
        this.saving_data.item_name = '槍';

    }
}
