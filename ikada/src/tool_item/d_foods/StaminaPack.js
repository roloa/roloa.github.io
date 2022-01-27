
import {ToolItem} from '../ToolItem.js';

export class StaminaPack extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'medical_bannouyaku');
        this.saving_data.item_name = '強壮剤';

        this.is_stackable = true;

    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 満腹度を回復させる
        this.game.log( '強壮剤を使いました。');
        this.game.log( 'スタミナが回復します。');

        this.game.world.player.health.mod_sp( 100 );

        this.is_consumed = true;
    }

}
