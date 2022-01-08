
import {BuildBlock} from '../tool_item/BuildBlock.js'

export class ShipBlock {

    static BLOCK_RADIUS = 16
    static BLOCK_SIZE = ShipBlock.BLOCK_RADIUS + ShipBlock.BLOCK_RADIUS

    constructor( game ){
        this.game = game;

        this.saving_data = {}

        this.is_floor = false
        this.image = null;
        this.is_removed = false;

        this.max_hp = 100;
        this.saving_data.hp = this.max_hp;
        this.saving_data.is_broken = false;
    }
    on_click(){
        // プレイヤーがハンマーを構えているなら、自壊してアイテム化する
        let item = this.game.hud.item_slot.get_active_item();
        if( item && item.is_hammer ){
            this.is_removed = true;
            let new_item = new BuildBlock( this.game );
            new_item.set_ship_block( this );
            this.game.world.give_tool_item_player( new_item );
            // 処理完了のため、trueを返す
            return true;
        }
        return this.on_interact();
    }
    on_interact(){
        // 下位クラスでブロックの機能を実装する
        return false;
    }
    on_hit_bullet( bullet ){
        this.saving_data.hp -= bullet.damage;
        if( this.saving_data.hp <= 0){
            this.saving_data.is_broken = true;
            this.saving_data.hp = 0;
        }
    }
    on_update(){

        // hpは微量に自然回復する
        if( this.saving_data.hp < this.max_hp ){
            this.saving_data.hp += 0.05;
        } else if( this.saving_data.is_broken ){
            this.saving_data.is_broken = false;
        } else {
            this.saving_data.hp = this.max_hp;
        }

    }
    get_image(){
        return this.image;
    }
    on_draw( canvas ){
        if( this.saving_data.is_broken ){
            // 壊れている
            canvas.globalAlpha = 0.2;
            if( this.image != null ) {
                canvas.drawImage( this.get_image(), -ShipBlock.BLOCK_RADIUS, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_SIZE, ShipBlock.BLOCK_SIZE);
            }
        } else {
            if( this.image != null ) {
                canvas.drawImage( this.get_image(), -ShipBlock.BLOCK_RADIUS, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_SIZE, ShipBlock.BLOCK_SIZE);
            }
        }
        // ダメージによるヒビ
        if( this.saving_data.hp < this.max_hp ){
            canvas.strokeStyle = 'rgb(0,0,0)'
            canvas.beginPath();
            canvas.moveTo(0, 0);
            let crack_length = ShipBlock.BLOCK_RADIUS * (this.max_hp - this.saving_data.hp) / this.max_hp
            canvas.lineTo( crack_length, crack_length );
            canvas.stroke()
            canvas.strokeStyle = 'rgb(200,200,200)'
            canvas.beginPath();
            canvas.moveTo(0, 0);
            canvas.lineTo( -crack_length, -crack_length );
            canvas.stroke()
        }
    }
    save_data(){
        let data = {};
        data.class_name = this.constructor.name;
        data.saving_data_serial = JSON.stringify( this.saving_data );
        return data;
    }
    load_data( data ){
        this.saving_data = JSON.parse( data.saving_data_serial );
    }
}
