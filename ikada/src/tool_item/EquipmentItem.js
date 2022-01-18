

import {ToolItem} from './ToolItem.js';

export class EquipmentItem extends ToolItem {

    static EQUIP_GLIDER = 1
    static EQUIP_WING = 2
    static EQUIP_GOGGLE = 3
    static EQUIP_FIN = 4
    static EQUIP_MAX = 5

    constructor( game ){
        super( game )

        //this.image = this.game.image_library.get_image( './img/illustya/mushi_mushitoriami.png' );

        this.saving_data.item_name = 'noname equip';

        // TODO move to saving_data
        // 装備部位
        this.saving_data.equip_part = 0;
        // 風を受けた時の上昇力
        this.saving_data.riseup_power = 0;
        // 空中での移動力補正
        this.saving_data.midair_speed = 0;

        // 落下速度補正(%)
        this.saving_data.fall_speed_reduce = 0;

        // 水中での移動力補正
        this.saving_data.underwater_speed = 0;

        // 環境によるスタミナ減少の軽減(%)
        this.saving_data.stamina_reduce = 0;

        // 防御力、ダメージ軽減率
        this.saving_data.damage_reduce = 0;
    }



    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 装備のステータスをログに出す
        this.game.log(this.saving_data.item_name);

        if( 0 < this.saving_data.damage_reduce ){
            this.game.log('ダメージ軽減: ' + this.saving_data.damage_reduce);
        }
        if( 0 < this.saving_data.riseup_power ){
            this.game.log('上昇力: ' + this.saving_data.riseup_power);
        }
        if( 0 < this.saving_data.midair_speed ){
            this.game.log('空中速度: ' + this.saving_data.midair_speed);
        }
        if( 0 < this.saving_data.fall_speed_reduce ){
            this.game.log('落下速度: ' + this.saving_data.fall_speed_reduce);
        }
        if( 0 < this.saving_data.underwater_speed ){
            this.game.log('水中速度: ' + this.saving_data.underwater_speed);
        }
        if( 0 < this.saving_data.stamina_reduce ){
            this.game.log('スタミナ減少軽減: ' + this.saving_data.stamina_reduce);
        }
    }

}
