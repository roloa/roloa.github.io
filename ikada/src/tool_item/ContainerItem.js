

import {ToolItem} from './ToolItem.js';

export class ContainerItem extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'kaizoku_takarabako' );
        this.saving_data.item_name = '名もなき箱';
        this.content_item = null;
    }
    set_content( new_item ){
        this.content_item = new_item;
    }

    on_click( cursor_x, cursor_y, player_x, player_y ){

        if( this.content_item != null ){
            this.game.world.give_tool_item_player( this.content_item );
        } else {
            this.game.log('箱は空っぽでした...');
        }
        this.is_consumed = true;
    }

}
