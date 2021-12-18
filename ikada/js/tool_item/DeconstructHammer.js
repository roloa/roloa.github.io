

import {ToolItem} from './ToolItem.js';

export class DeconstructHammer extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'tonkachi' );
        this.is_hammer = true;

        this.saving_data.item_name = '撤去ハンマー';

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        // ブロックのインタラクト側でハンマーを検知して自壊する仕組みにするので
        // ハンマー側のクリックイベントではなにもしない
    }

}
