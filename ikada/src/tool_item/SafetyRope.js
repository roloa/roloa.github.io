

import {ToolItem} from './ToolItem.js';

export class SafetyRope extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'tora_rope' );
        this.saving_data.item_name = '命綱';

        this.cool_time_count = 30;
        this.cool_time_max = 30;

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        this.game.log( '海を泳いでいる時に命綱を構えると、' );
        this.game.log( '自動的に舟の方向に引っ張られます。' );
        this.game.log( 'マウスボタンを押し続けるとより速く引っ張られます。' );
    }
    on_update(){
        if( this.game.hud.item_slot.get_active_item() === this ){
            // 構えている
            if( !this.game.world.player.is_in_ship_inertial ){
                this.game.world.player.x += this.game.world.ship.velocity
                if( 0 < this.game.world.player.x ){
                    this.game.world.player.x -= 1;
                } else {
                    this.game.world.player.x += 1;
                }
            }
        }
    }
    on_keep_click( cursor_x, cursor_y, player_x, player_y ) {
        if( !this.game.world.player.is_in_ship_inertial ){
            if( 0 < this.game.world.player.x ){
                this.game.world.player.x -= 2;
            } else {
                this.game.world.player.x += 2;
            }
        }
    }

}
