

import {ToolItem} from './ToolItem.js';

export class AmmoStone extends ToolItem {

    constructor( game ){
        super( game )

        this.saving_data.item_name = 'カタパルト用石ころ';

        this.image = this.game.image_library.get_image( 'catapult_ammo' );
        this.ammo_type = 'stone';
        this.ammo_value = 100;
    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        this.game.log('これはカタパルト用の石ころです。')
        this.game.log('カタパルトをクリックすると補充できます。')
    }

}
