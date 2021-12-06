
import {HudMenu} from './hud_menu.js';
import {HudLog} from './hud_log.js';
import {ItemSlot} from './item_slot.js';
import {HudStatus} from './hud_status.js';


export class Hud {
    constructor( game ){
        this.name = 'hud';
        this.game = game

        this.hud_menu = new HudMenu( game )
        this.item_slot = new ItemSlot( game )
        this.hud_log = new HudLog( game )
        this.hud_status = new HudStatus( game );

    }

    on_update(){
        this.hud_menu.on_update()
        this.item_slot.on_update()
        this.hud_status.on_update()
    }

    on_draw( canvas ){

        // メッセージログ
        this.hud_log.on_draw( canvas );

        // メニュー画面
        this.hud_menu.on_draw( canvas );
        // メニューアイコン

        // アイテムスロットを描く
        this.item_slot.on_draw( canvas );
        // ステータス
        this.hud_status.on_draw( canvas );

    }
}
