

import {ToolItem} from './ToolItem.js';
import {CookedFish} from './CookedFish.js';

export class FishKirimi extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( './img/illustya/food_fish_kirimi_red.png');

    }
    get_cooked_item(){
        return new CookedFish( this.game );
    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 満腹度を回復させる
        this.game.world.player.mod_hunger( 25 );

        this.is_consumed = true;

    }

}