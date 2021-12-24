
import {HudMenu} from './HudMenu.js';
import {HudLog} from './HudLog.js';
import {ItemSlot} from './ItemSlot.js';
import {HudStatus} from './HudStatus.js';
import {HudCompass} from './HudCompass.js';


export class Hud {
    constructor( game ){
        this.name = 'hud';
        this.game = game

        this.hud_menu = new HudMenu( game )
        this.item_slot = new ItemSlot( game )
        this.hud_log = new HudLog( game )
        this.hud_status = new HudStatus( game );
        this.hud_compass = new HudCompass( game );
    }

    on_update(){
        this.hud_menu.on_update()
        this.item_slot.on_update()
        this.hud_status.on_update()
        this.hud_compass.on_update()
    }

    on_draw( canvas ){

        // メッセージログ
        this.hud_log.on_draw( canvas );
        // メニュー画面
        this.hud_menu.on_draw( canvas );
        // アイテムスロットを描く
        this.item_slot.on_draw( canvas );
        // ステータス
        this.hud_status.on_draw( canvas );
        // コンパス
        this.hud_compass.on_draw( canvas );

    }
}
