

import {ToolItem} from '/ToolItem.js';

export class BuildBlock extends ToolItem {

    constructor( game ){
        super( game )

        //this.image = this.game.image_library.get_image( './img/illustya/food_fish_kirimi_red.png');
        this.ship_block = null;
    }
    set_ship_block( new_ship_block ){
        this.ship_block = new_ship_block;
        this.image = this.ship_block.image;

    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('block onclick!')
    }

}
