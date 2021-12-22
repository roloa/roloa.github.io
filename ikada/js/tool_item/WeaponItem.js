import {ToolItem} from './ToolItem.js';
import {Bullet} from '../entity/Bullet.js';

export class WeaponItem extends ToolItem {

    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'war_trident' );
        this.saving_data.item_name = '無名の武器';

        // 攻撃力
        // (武器の基礎攻撃力 x 矢弾の乗算 + 矢弾の加算) x 幸福度補正x1.5 x あれこれ補正？

        // 基礎攻撃力
        this.saving_data.power = 10;
        // クールタイム(50=1秒)
        this.saving_data.cool_time = 50
        this.cool_time_count = 0;

    }
    calc_damage(){
        // TODO 攻撃力計算
        return this.saving_data.power;
    }
    on_update(){
        if( 0 < this.cool_time_count ){
            this.cool_time_count -= 1;
        }
    }
    on_attack( cursor_x, cursor_y, player_x, player_y ){
        this.game.log(this.saving_data.item_name + ': 武器の攻撃アクションが設定されていません。');
    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        if( 0 < this.cool_time_count ){
            this.game.log('武器はクールタイム中です。');
        } else {
            this.on_attack( cursor_x, cursor_y, player_x, player_y );
            this.cool_time_count = this.saving_data.cool_time;
        }
    }
}
