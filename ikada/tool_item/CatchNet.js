

import {ToolItem} from '/ToolItem.js';

export class CatchNet extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( './img/illustya/mushi_mushitoriami.png' );

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('catchnet onclick!')
    }

}
