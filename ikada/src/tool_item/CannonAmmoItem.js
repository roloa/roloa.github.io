

import {ToolItem} from './ToolItem.js';

export class CannonAmmoItem extends ToolItem {

    constructor( game ){
        super( game )

        this.saving_data.item_name = '砲弾';

        this.image = this.game.image_library.get_image( 'cannonball_item' );
        this.ammo_type = 'cannon';
        this.ammo_value = 100;
    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        this.game.log('これは砲弾です。')
        this.game.log('砲弾を必要とする設備に補充できます。')
    }

}
