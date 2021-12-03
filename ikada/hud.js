
import {HudMenu} from './hud_menu.js';

import {ItemSlot} from './item_slot.js';

export class Hud {
    constructor( game ){
        this.name = 'hud';
        this.game = game

        this.hud_menu = new HudMenu( game )
        this.item_slot = new ItemSlot( game )

    }

    on_update(){
        this.hud_menu.on_update()
        this.item_slot.on_update()
    }

    on_draw( canvas ){

        // メニュー画面
        this.hud_menu.on_draw( canvas );
        // メニューアイコン

        // アイテムスロットを描く
        this.item_slot.on_draw( canvas );

    }
}
