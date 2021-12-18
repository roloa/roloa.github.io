

import {ToolItem} from './ToolItem.js';
import {CookedFish} from './CookedFish.js';

export class FishKirimi extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( './img/illustya/food_fish_kirimi_red.png');
        this.saving_data.item_name = '生魚';

    }
    get_cooked_item(){
        return new CookedFish( this.game );
    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 満腹度を回復させる
        let leftover = this.game.world.player.health.mod_hunger( 25 );
        leftover += this.game.world.player.health.mod_thirst( 5 );

        if( 10 < leftover ){
            this.game.materials.put_material( 'leftover', Math.floor( leftover / 9 ) )
        }
        this.game.materials.put_material( 'bone', Math.floor( Math.random() * 1.5 + 1 ) )

        this.is_consumed = true;

    }

}
