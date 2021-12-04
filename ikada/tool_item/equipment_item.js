

import {ToolItem} from '/tool_item.js';

export class EquipmentItem extends ToolItem {

    static EQUIP_GLIDER = 1
    static EQUIP_WING = 2
    static EQUIP_GOGGLE = 3
    static EQUIP_FIN = 4
    static EQUIP_MAX = 5

    constructor( game ){
        super( game )

        //this.image = this.game.image_library.get_image( './img/illustya/mushi_mushitoriami.png' );

        // 装備部位
        this.equip_part = 0;
        // 風を受けた時の上昇力
        this.riseup_power = 0;
        // 空中での移動力補正
        this.midair_speed = 0;
        // 水中での移動力補正
        this.underwater_speed = 0;

        // 酸素?
        // 水圧?

    }



    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('equipment onclick!')
    }

}
