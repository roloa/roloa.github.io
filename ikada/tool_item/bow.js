

import {ToolItem} from '/tool_item.js';
import {Bullet} from '/bullet.js';

export class Bow extends ToolItem {

    constructor( game ){
        super( game )
        this.game = game;

        this.image = this.game.image_library.get_image( 'yumiya_bowgun' );

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        //console.log('kirimi onclick!')

        let vec = this.game.world.player.get_vector_to_cursor();

        let arrow = new Bullet( this.game );
        arrow.x = this.game.world.player.x + vec.x * 30;
        arrow.y = this.game.world.player.y + vec.y * 30 - 16 ;
        arrow.vx = vec.x * 10;
        arrow.vy = vec.y * 10;
        arrow.line_x = vec.x * 30;
        arrow.line_y = vec.y * 30;
        arrow.gravity = 0.1;
        this.game.world.push_entity( arrow );
    }

}
