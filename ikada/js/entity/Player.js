
import {Entity} from './Entity.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';
import {EquipmentItem} from '../tool_item/EquipmentItem.js';

import {PlayerHealth} from './PlayerHealth.js';


export class Player extends Entity {
    constructor( game ){

        super( game );

        this.name = 'player';
        this.image = this.game.image_library.get_image('cooking_agodashi');
        this.image_ghost = this.game.image_library.get_image('yurei_youngwoman3_sad');
        this.x = 0
        this.y = -60

        this.vx = 0;
        this.vy = 0;

        this.health = new PlayerHealth( this.game );

        this.hit_invincible_timer = 0;
        this.is_ghost = 0;
        this.ghost_timer_max = 500;
        this.ghost_timer = 0;

        this.width = 32;
        this.width_half = this.width / 2;
        this.height = 32;
        this.height_half = this.height / 2;

        this.is_landing = false;
        this.is_in_sea = false;

        // 装備関係
        this.equip_list = []
        this.clear_equip_status()
    }

    get_vector_to_cursor(){
        // プレイヤーからカーソルの向きの長さ1のベクトルを返す
        let vecx = this.game.world.cursor_x - this.x;
        let vecy = this.game.world.cursor_y - this.y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
        vecx = vecx / length;
        vecy = vecy / length;
        return {x: vecx, y: vecy};
    }
    clear_equip_status(){
        for( var i = 0 ; i < EquipmentItem.EQUIP_MAX ; i++){
            this.equip_list[i] = null;
        }
        // 装備をすべて外し、装備によるステータス上昇を取り消す

        // 風を受けた時の上昇力
        this.riseup_power = 0;
        // 空中での移動力補正
        this.midair_speed = 0;
        // 落下速度補正
        this.fall_speed = 1;
        // 水中での移動力補正
        this.underwater_speed = 0;
    }

    equip_item( new_equip ){
        // 装備する
        if( this.equip_list[ new_equip.equip_part ] == null){
            // 装備がカラの場合
            this.equip_list[ new_equip.equip_part ] = new_equip;

            // ステータス上昇を適用する
            // 装備部位
            this.riseup_power += new_equip.riseup_power;
            this.midair_speed += new_equip.midair_speed;
            this.fall_speed *= new_equip.fall_speed;
            this.underwater_speed += new_equip.underwater_speed ;

        } else {
            // 装備部位が重複したら装備せずにfalseを返す
            return false;
        }
        return true;
    }

    hit_wind( wind ){
        if( this.is_falling ){
            // 急降下中は風に当たらない
        } else if( this.riseup_power <= 0 ){
            // 上昇力がなければ風に押されるだけ
            this.vx = wind.vx * 0.5;
        } else {
            // 上昇力がある場合は、飛行モードになって上昇する
            this.vy = -this.riseup_power;
            this.is_flying = true;
        }
    }

    hit_drop_item( new_item ){
        // アイテムスロットの後側から入る場所を探す
        return this.game.hud.item_slot.put_pickup_item( new_item.item_to_pickup )

    }

    hit_damage( damage_amount, knockback_vec, attacker ){
        // 無敵時間
        if( 0 < this.hit_invincible_timer ){
            return false;
        }
        this.health.mod_hp( damage_amount );
        this.vx = knockback_vec.x;
        this.vy = knockback_vec.y;
        this.hit_invincible_timer = 50;

        return true;
    }

    on_update(){
        super.on_update();

        // 物理法則
        this.x += this.vx;
        this.y += this.vy;

        // ステータスの変動
        this.health.always_process();

        if ( this.is_ghost ) {
            // 死んでリスポン待ちの幽霊
            this.ghost_timer -= 1;
            this.health.hp = (1-(this.ghost_timer / this.ghost_timer_max)) * this.health.max_hp;
            if( this.ghost_timer <= 0 ){
                this.is_ghost = false;
            }
            // 以降の処理は飛ばしちゃう？
            //return;
        } else if( this.is_flying ){
            // 飛行中
            this.vy += 0.5
            if( 0 < this.vy ){
                this.vy *= this.fall_speed;
            }
            this.vy *= 0.99;

            this.control_midair();

        } else if ( this.is_diving ){
            // 潜水中
            this.vx *= 0.8;
            this.vy *= 0.8;

            this.control_diving();
        } else if ( this.is_falling ){
            // 飛行キャンセル中
            this.vy += 0.5;
            this.vy *= 0.99;
            this.control_falling();
        } else {
            // それ以外
            this.vy += 0.5;
            this.vy *= 0.99;
            this.update_land();
            this.hittest_ship();
            this.control_land();
        }



        if( 1 < this.vy ){
            this.is_landing = false;
        }

        // 海との当たり判定
        if( 16 <= this.y ){
            if( !this.is_diving && 24 <= this.y){
                // 潜水中でない場合は浮かぶ
                this.vy -= 1;
                this.vy *= 0.8;
            }
            this.is_landing = false;
            this.is_in_sea = true;
            this.is_flying = false;
            this.is_falling = false;

            // スタミナ消費
            this.health.mod_sp( -0.3, true )
        } else {
            // 海の中にいない
            this.is_in_sea = false;
            this.is_diving = false;
        }

        // 無敵時間タイマーを減らす
        if( 0 < this.hit_invincible_timer ){
            this.hit_invincible_timer -= 1;
        }
        // 死亡判定
        if( this.health.hp <= 0 ){
            this.health.hp = 1;
            this.health.hunger = 20;
            this.health.thirst = 20;
            this.is_ghost = true;
            this.ghost_timer = this.ghost_timer_max;
            this.x = 0;
            this.y = -20;
            this.vx = 0;
            this.vy = 0;
        }

        // マウスクリック

        if( this.game.input_controller.is_mouse_press ) {
            this.on_click( this.game.world.cursor_x, this.game.world.cursor_y );
        }
    }
    on_click( cursor_x, cursor_y ){
        // 船の設備へのインタラクトを試みる
        let block = this.game.world.ship.get_ship_block( cursor_x, cursor_y );
        if( block ){
            if( block.on_interact() ){
                // インタラクトに成功した場合、処理終了
                return;
            }
        }
        // アイテムスロット使用
        this.game.hud.item_slot.activate_item( cursor_x, cursor_y, this.x, this.y );

    }

    update_land(){


    }
    control_land(){
        // WASDで移動
        if( this.game.input_controller.is_down_right ){
            this.vx += 2
        }
        if( this.game.input_controller.is_down_left ){
            this.vx -= 2
        }
        this.vx *= 0.5;

        // ジャンプ　海面でも小さくジャンプできる
        if( this.game.input_controller.is_down_up ){
            if( -1 < this.vy ){
                if( this.is_landing ){
                    if( this.health.consume_sp( 3 ) ){
                        this.vy = -8;
                        this.is_landing = false;
                    }

                } else if( this.is_in_sea ){
                    if( this.health.consume_sp( 3 ) ){
                        this.vy = -8;
                        this.is_in_sea = false;
                    }

                }
            }
        }
        // 下入力
        if( this.game.input_controller.is_down_down ){
            // TODO 床すりぬけ

            if( this.is_in_sea ){
                if( 0 < this.underwater_speed ){
                    // 潜水モードに入る
                    this.is_diving = true;
                    this.vy += 3;
                    this.y += 3;
                } else {
                    // 潜水装備をつけてない場合
                }
            }
        }

    }

    control_midair(){
        // WASDで移動
        if( this.game.input_controller.is_down_right ){
            this.vx += 1 + this.midair_speed
        }
        if( this.game.input_controller.is_down_left ){
            this.vx -= 1 + this.midair_speed
        }
        this.vx *= 0.5;

        // 急降下
        if( this.game.input_controller.is_down_down ){
            this.is_flying = false;
            this.is_falling = true;
        }
    }

    control_falling(){
        // WASDで移動
        if( this.game.input_controller.is_down_right ){
            this.vx += 1 + this.midair_speed
        }
        if( this.game.input_controller.is_down_left ){
            this.vx -= 1 + this.midair_speed
        }
        this.vx *= 0.5;

        // 急降下を解除して飛行状態に
        if( this.game.input_controller.is_down_up ){
            this.is_flying = true;
            this.is_falling = false;
        }
    }

    control_diving(){
        // WASDで移動
        if( this.game.input_controller.is_down_right ){
            this.vx += 1 + this.underwater_speed;
        }
        if( this.game.input_controller.is_down_left ){
            this.vx -= 1 + this.underwater_speed;
        }
        if( this.game.input_controller.is_down_up ){
            this.vy -= 1 + this.underwater_speed;
        }
        if( this.game.input_controller.is_down_down ){
            this.vy += 1 + this.underwater_speed;
        }

    }

    hittest_ship(){
        // 船との当たり判定
        // 船から見たローカル座標
        let local_x_in_ship = this.x + (this.game.world.ship.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = this.y + (this.game.world.ship.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;

        // 触れているブロックの座標
        let block_x = Math.floor( local_x_in_ship / ShipBlock.BLOCK_SIZE);
        let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
        if( 0 <= block_x && block_x < this.game.world.ship.block_array.length &&
            0 <= block_y && block_y < this.game.world.ship.block_array[0].length){
            if( local_y_in_ship % ShipBlock.BLOCK_SIZE < 8 && // 床の厚さ
                this.game.world.ship.block_array[block_x][block_y] != null &&
                this.game.world.ship.block_array[block_x][block_y].is_floor
            ){
                // 着地判定を得る
                this.y = ( block_y - this.game.world.ship.ship_offset_y) * ShipBlock.BLOCK_SIZE - ShipBlock.BLOCK_RADIUS;
                this.vy = 0;
                this.is_landing = true;
                this.is_on_ship = true;
            }
        }
    }
    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,0,200)'
        canvas.strokeRect( this.x - this.width_half, this.y - this.height, this.width, this.height)

        if( this.is_ghost ){
            canvas.drawImage( this.image_ghost, this.x - this.width_half, this.y - this.height, this.width, this.height )
        } else {
            canvas.drawImage( this.image, this.x - this.width_half, this.y - this.height, this.width, this.height )
        }



    }
}
