

import {ToolItem} from './ToolItem.js';

export class Oar extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'syamoji_mokusei' );
        this.saving_data.item_name = 'オール';

        this.cool_time_count = 30;
        this.cool_time_max = 30;

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        if( 0 < this.cool_time_count ){
            // クールタイム待ち
            return;
        }
        this.cool_time_count = this.cool_time_max;

        if( this.game.world.player.is_in_ship_inertial == false ){
            this.game.log( '舟の外では漕げません。' );
            return;
        }
        if( player_y < -100 ){
            this.game.log( '舟を漕ぐには海面から遠すぎます。' );
            return;
        }

        if( this.game.world.player.health.consume_sp( 5 ) ){
            this.game.world.ship.on_oar( 30 );
        } else {
            // スタミナ不足
            return;
        }
    }
    on_update(){
        if( 0 < this.cool_time_count ){
            this.cool_time_count -= 1;
        }
    }
    on_keep_click( cursor_x, cursor_y, player_x, player_y ) {
        if( 0 < this.cool_time_count ){
        } else {
            this.on_click( cursor_x, cursor_y, player_x, player_y );
        }
    }

}
