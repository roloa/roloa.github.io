

import {ToolItem} from './ToolItem.js';

export class Scouter extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'megane_3d_blue_red' );
        this.saving_data.item_name = 'スカウター';

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){

        for( let enemy of this.game.world.enemy_list ){
            if( enemy == null ){
                continue;
            }
            enemy.is_scouted = true;

            if( enemy.test_hit( cursor_x, cursor_y )){
                this.game.log('    名前 : ' + enemy.name);
                this.game.log('     Lv : ' + enemy.strength_lv);
                this.game.log('     HP : ' + Math.ceil(enemy.hp) +'/'+Math.ceil(enemy.max_hp));
                this.game.log('攻撃(弾) : ' + enemy.bullet_damage);
                this.game.log('  (接触) : ' + enemy.direct_damage);
            }
        }

    }

}
