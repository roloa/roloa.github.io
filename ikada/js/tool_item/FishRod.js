

import {ToolItem} from './ToolItem.js';

export class FishRod extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'fishing_tsurizao_nobezao' );
        this.saving_data.item_name = '釣り竿';

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){

        this.game.world.player.health.mod_sp( -10 );
        this.game.world.lure.on_click_rod( cursor_x, cursor_y, player_x, player_y )


    }

}
