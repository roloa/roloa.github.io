

import {ToolItem} from './ToolItem.js';

export class SolidFuel extends ToolItem {

    constructor( game ){
        super( game )

        this.saving_data.item_name = '燃料';

        this.image = this.game.image_library.get_image( 'cooking_kokei_nenryou' );
        this.ammo_type = 'fuel';
        this.ammo_value = 100;
        this.fuel_value = 100;
    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        this.game.log('これは燃料です。')
        this.game.log('燃料を必要とする設備に補充できます。')
    }

}
