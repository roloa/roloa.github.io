
import {BuildBlock} from '../tool_item/BuildBlock.js'

export class ShipBlock {

    static BLOCK_RADIUS = 16
    static BLOCK_SIZE = ShipBlock.BLOCK_RADIUS + ShipBlock.BLOCK_RADIUS

    constructor( game ){
        this.game = game;

        this.saving_data = {}

        this.name = '木製ブロック';

        this.is_floor = false
        this.image = null;
        this.is_removed = false;

        this.x = 0;
        this.y = 0;
        this.cell_x = 0;
        this.cell_y = 0;

        // 敵が衝突したときのダメージ量
        this.kickback_damage = 10;

        this.max_hp = 100;
        this.saving_data.hp = this.max_hp;
        this.saving_data.is_broken = false;

        this.newest_heartbeat_id = 0;
        this.heartbeat_time_limit_max = 150;
        this.heartbeat_time_limit_count = this.heartbeat_time_limit_max;
        this.heartbeat_update_span_max = 10;
        this.heartbeat_update_span_count = this.heartbeat_update_span_max;
        this.is_healthy_heartbeat = true;
        this.is_core = false;

        this.accept_ammo_type = null;
    }
    is_need_operate(){
        //
    }
    on_click(){
        let item = this.game.hud.item_slot.get_active_item();
        if( item && item.is_wrench ){
            // レンチなら、完全に修理される
            this.saving_data.hp = this.max_hp;
            this.saving_data.is_broken = false;
            return true;
        }
        if( this.saving_data.is_broken ){
            this.game.log('その設備は壊れています。');
            this.game.log('修復を待つか、レンチで修理できます。');
            return false;
        }
        if( item && item.is_hammer ){
            // プレイヤーがハンマーを構えているなら、自壊してアイテム化する
            // 撤去される前に修理される
            this.saving_data.hp = this.max_hp;
            this.saving_data.is_broken = false;

            this.is_removed = true;
            let new_item = new BuildBlock( this.game );
            new_item.set_ship_block( this );
            this.game.world.give_tool_item_player( new_item );
            // 処理完了のため、trueを返す
            return true;
        }
        if( item && this.accept_ammo_type && item.ammo_type &&
            this.accept_ammo_type == item.ammo_type ) {
            this.game.hud.item_slot.delete_active_item();
            this.game.log( '補充しました。' );
            this.saving_data.ammo_amount += item.ammo_value;
            return true;
        }
        return this.on_interact();
    }
    deposit_item(){
        // アイテムを投入された時の反応
        // アイテムを受け入れた場合はTrueを返す
        return false;
    }
    on_interact(){
        // 下位クラスでブロックの機能を実装する
        return false;
    }
    on_hit_bullet( bullet ){
        return this.take_damage( bullet.damage );
    }
    take_damage( damage_amount ){

        // ダメージを無効化する条件
        if( this.is_core ){
            // これがコアの場合
            if( this.game.world.ship.get_ship_block_by_index( this.cell_x - 1, this.cell_y) &&
                this.game.world.ship.get_ship_block_by_index( this.cell_x + 1, this.cell_y) ) {
                // 左右両側にブロックがある
                return false;
            }
        } else if( this.game.world.ship.ship_offset_y <= this.cell_y ){
            // 一番下の場合
            if( this.game.world.ship.core_x < this.cell_x){
                // コアより右側
                if( this.game.world.ship.get_ship_block_by_index( this.cell_x + 1, this.cell_y) ) {
                    // 右側にブロックがある
                    return false;
                }
            }
            if( this.cell_x < this.game.world.ship.core_x){
                // コアより左側
                if( this.game.world.ship.get_ship_block_by_index( this.cell_x - 1, this.cell_y) ) {
                    // 左側にブロックがある
                    return false;
                }
            }
        }

        this.saving_data.hp -= damage_amount;
        if( this.saving_data.hp <= 0){
            this.saving_data.is_broken = true;
            this.saving_data.hp = 0;
            return true;
        }
    }

    give_heartbeat( beat_id ){
        // 自分の持つ最新のハートビートidよりも大きいか、0のハートビートが来たら、
        // ハートビートidを更新する
        if( this.newest_heartbeat_id < beat_id ) {
            this.newest_heartbeat_id = beat_id;
            this.heartbeat_time_limit_count = this.heartbeat_time_limit_max;
            this.is_healthy_heartbeat = true;
        }
    }
    update_heartbeat(){
        // 上下左右のブロックに、自分の持つハートビートを与える
        let block = null;
        block = this.game.world.ship.get_ship_block_by_index(  this.cell_x - 1 , this.cell_y, true );
        if ( block ){
            block.give_heartbeat( this.newest_heartbeat_id );
        }
        block = this.game.world.ship.get_ship_block_by_index( this.cell_x + 1 , this.cell_y, true );
        if ( block ){
            block.give_heartbeat( this.newest_heartbeat_id );
        }
        block = this.game.world.ship.get_ship_block_by_index(    this.cell_x , this.cell_y - 1, true );
        if ( block ){
            block.give_heartbeat( this.newest_heartbeat_id );
        }
        block = this.game.world.ship.get_ship_block_by_index(  this.cell_x , this.cell_y + 1, true );
        if ( block ){
            block.give_heartbeat( this.newest_heartbeat_id );
        }
    }

    on_update(){

        if( this.is_healthy_heartbeat ){
            // hpは微量に自然回復する
            if( this.saving_data.hp < this.max_hp ){
                this.saving_data.hp += 0.05;
            } else if( this.saving_data.is_broken ){
                this.saving_data.is_broken = false;
            } else {
                this.saving_data.hp = this.max_hp;
            }
        } else {
            // ハートビートが健全でない場合は、hpが減っていく
            this.take_damage( 1 );
        }
        if( !this.is_core ){
            // コア自体はハートビート処理をしない
            if( !this.saving_data.is_broken ){
                // 壊れたブロックはハートビートを伝搬しない
                if( 0 < this.heartbeat_update_span_count){
                    this.heartbeat_update_span_count -= 1;
                } else {
                    // 1.0 ~ 0.8の範囲でランダム
                    this.heartbeat_update_span_count = Math.floor(
                        this.heartbeat_update_span_max * (Math.random() * 0.2 + 0.8));
                    this.update_heartbeat();
                }
            }
            // ハートビートを受け取らない時間が長いと、ハートビートの健全性が失われる
            if ( 0 < this.heartbeat_time_limit_count ){
                this.heartbeat_time_limit_count -= 1;
            } else {
                this.is_healthy_heartbeat = false;
            }
        }
    }


    get_image(){
        return this.image;
    }
    get_name(){
        return this.name;
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
        // デバッグ用、ハートビート状態を表示
        if ( true ){
            canvas.fillStyle = 'rgb(200,200,200)';
            canvas.fillText(this.newest_heartbeat_id ,0,0);
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
