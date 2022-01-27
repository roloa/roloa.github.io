
import {ToolItem} from '../ToolItem.js';

export class MedicalPack extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'iryou_kusuribako2');
        this.saving_data.item_name = '救急箱';

        this.is_stackable = true;

    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 満腹度を回復させる
        this.game.log( '救急箱を使いました。');
        this.game.log( '体力が回復します。');

        this.game.world.player.health.mod_hp( 100 );

        this.is_consumed = true;
    }

}
