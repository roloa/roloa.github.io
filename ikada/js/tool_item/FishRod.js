

import {ToolItem} from './ToolItem.js';

export class FishRod extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'fishing_tsurizao_nobezao' );

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('fishrod onclick!');
    }

}
