
import {ToolItem} from './ToolItem.js';
import {Bullet} from '../entity/Bullet.js';

// TODO
export class Spear extends ToolItem {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'buki_yari' );
        // this.image = this.game.image_library.get_image( 'war_trident' );
        this.saving_data.item_name = '槍';

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){

        let vec = this.game.world.player.get_vector_to_cursor();

        let arrow = new Bullet( this.game );
        arrow.x = this.game.world.player.x + vec.x * 10;
        arrow.y = this.game.world.player.y + vec.y * 10 - 16 ;
        arrow.vx = vec.x * 15;
        arrow.vy = vec.y * 15;
        arrow.line_x = vec.x * 30;
        arrow.line_y = vec.y * 30;
        arrow.gravity = 0;
        arrow.life_time = 10;
        this.game.world.push_entity( arrow );
    }

}
