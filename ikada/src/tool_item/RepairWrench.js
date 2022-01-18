

import {ToolItem} from './ToolItem.js';

export class RepairWrench extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'monkey_wrench' );
        this.is_wrench = true;

        this.saving_data.item_name = '修理レンチ';

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        // ブロックのインタラクト側でハンマーを検知して自壊する仕組みにするので
        // ハンマー側のクリックイベントではなにもしない
    }

}
