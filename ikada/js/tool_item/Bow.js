

import {WeaponItem} from './WeaponItem.js';
import {Bullet} from '../entity/Bullet.js';

export class Bow extends WeaponItem {

    constructor( game ){
        super( game )
        this.game = game;
        this.saving_data.item_name = 'クロスボウ'

        this.image = this.game.image_library.get_image( 'yumiya_bowgun' );
        // this.image = this.game.image_library.get_image( 'yumiya' );

    }

    on_attack( cursor_x, cursor_y, player_x, player_y ){
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
        arrow.damage = this.calc_damage();
        this.game.world.push_entity( arrow );
    }

}
