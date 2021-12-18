

import {ToolItem} from './ToolItem.js';

export class CookedFish extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'wasyoku_yakizakana' );
        this.saving_data.item_name = '焼き魚';

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 満腹度を回復させる
        this.game.world.player.health.mod_hunger( 50 );

        this.is_consumed = true;

    }

}
