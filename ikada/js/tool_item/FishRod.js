

import {ToolItem} from './ToolItem.js';

export class FishRod extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'fishing_tsurizao_nobezao' );

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){

        if( this.game.world.lure.is_working ){
            this.game.world.lure.is_rewinding = true;

        } else {
            // 針を投げる
            this.game.world.lure.is_working = true;

            let vec = this.game.world.player.get_vector_to_cursor();

            this.game.world.lure.vx = vec.x * 7;
            this.game.world.lure.vy = vec.y * 7;

            this.game.world.lure.x = player_x + vec.x * 10;
            this.game.world.lure.y = player_y - 16 + vec.y * 10;
        }

    }

}
