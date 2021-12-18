

import {ToolItem} from './ToolItem.js';

export class Oar extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'syamoji_mokusei' );
        this.saving_data.item_name = 'オール';

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){

        if( player_y < -50 ){
            this.game.log( '舟を漕ぐには海面から遠すぎます。' )
        } else {
            // TODO イカダに乗ってる判定を追加
            if( this.game.world.player.health.consume_sp( 5 ) ){
                this.game.world.ship.on_oar();
            }
        }

    }

}
