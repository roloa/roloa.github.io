

import {ToolItem} from './ToolItem.js';

export class FishKirimi extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( './img/illustya/food_fish_kirimi_red.png');

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('kirimi onclick!')
    }

}
