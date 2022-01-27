
import {Entity} from './Entity.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';
import {EquipmentItem} from '../tool_item/EquipmentItem.js';
import {DamageNumber} from './particle/DamageNumber.js';
import {DropItem} from './DropItem.js';
import {PlayerHealth} from './PlayerHealth.js';


export class Player extends Entity {
    constructor( game ){

        super( game );

        this.name = 'player';
        this.image = this.game.image_library.get_player_image();
        this.image_ghost = this.game.image_library.get_image('yurei_youngwoman3_sad');
        this.x = 0
        this.y = -60

        this.vx = 0;
        this.vy = 0;

        this.riseup_charge = 0;

        this.health = new PlayerHealth( this.game );

        this.hit_invincible_timer = 0;
        this.hit_invincible_timer_max = 10;
        this.is_ghost = 0;
        this.ghost_timer_max = 500;
        this.ghost_timer = 0;

        this.width = 32;
        this.width_half = this.width / 2;
        this.height = 44;
        this.height_half = this.height / 2;

        this.is_landing = false;
        this.is_in_sea = false;

        this.kickback_damage = 2;

        this.walk_speed = 3;
        this.walk_speed_down_rate = 0.5;

        this.splint_speed = 5;
        this.is_splinting = false;
        this.splint_double_hit_timer = [0,0];
        this.splint_double_hit_timer_max = 5;
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
    get_radian_to_cursor(){
        return Math.atan2( this.game.world.cursor_y - this.y, this.game.world.cursor_x - this.x )
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
        this.fall_speed_reduce = 1;
        // 水中での移動力補正
        this.underwater_speed = 0;
        // 環境によるスタミナ減少の軽減
        this.stamina_reduce = 1;
        // ダメージ軽減、防御力
        this.damage_reduce = 1;

    }

    equip_item( new_equip ){
        // 装備する
        if( this.equip_list[ new_equip.saving_data.equip_part ] == null){
            // 装備がカラの場合
            this.equip_list[ new_equip.saving_data.equip_part ] = new_equip;

            // ステータス上昇を適用する
            // 装備部位
            this.riseup_power += new_equip.saving_data.riseup_power;
            this.midair_speed += new_equip.saving_data.midair_speed;
            this.fall_speed_reduce *= (100 - new_equip.saving_data.fall_speed_reduce) * 0.01;
            this.underwater_speed += new_equip.saving_data.underwater_speed ;
            this.stamina_reduce *= (1 - new_equip.saving_data.stamina_reduce);
            this.damage_reduce *= (1 - new_equip.saving_data.damage_reduce);
        } else {
            // 装備部位が重複したら装備せずにfalseを返す
            return false;
        }
        return true;
    }

    hit_wind( wind ){
        if( this.game.hud.hud_menu.is_menu_open ){
            return false;
        }
        if( this.is_falling ){
            // 急降下中は風に当たらない
        } else if( this.riseup_power <= 0 ){
            // 上昇力がなければ風に押されるだけ
            this.vx = wind.vx * 0.5;
        } else {
            // 上昇力がある場合は、飛行モードになって上昇する
            this.riseup_charge = this.riseup_power;
            this.is_flying = true;
        }
    }

    hit_drop_item( new_item ){
        // アイテムスロットの後側から入る場所を探す
        return this.game.hud.item_slot.put_pickup_item( new_item.item_to_pickup,true );

    }
    test_hit_enemy( enemy ){
        // 当たらない判定
        if( this.game.world.player.is_ghost == true ){
            return false;
        }
        if( 0 < this.hit_invincible_timer ){
            return false;
        }
        if( this.game.hud.hud_menu.is_menu_open ){
            return false;
        }
        // 当たり判定

        if( this.test_hit(enemy.x, enemy.y) ){
            let rad = Math.atan2(this.y - enemy.y , this.x - enemy.x)

            this.hit_damage( enemy.direct_damage,
                enemy.vx * enemy.knock_back_rate + Math.cos(rad) * 2,
                enemy.vy * enemy.knock_back_rate + Math.sin(rad) * 2,
                enemy );
            return true;
        }
        return false;
    }
    test_hit_bullet( bullet ){
        // 当たらない判定
        if( this.game.world.player.is_ghost == true ){
            return false;
        }
        if( 0 < this.hit_invincible_timer ){
            return false;
        }
        // 当たり判定
        if( this.test_hit(bullet.x, bullet.y) ){
            this.hit_damage( bullet.damage,
                bullet.vx * bullet.knock_back_rate,
                bullet.vy * bullet.knock_back_rate,
                bullet.owner_enemy );
            return true;
        }
        return false;
    }
    test_hit(x1, y1){
        return (this.x - this.width_half < x1 && x1 < this.x + this.width_half &&
            this.y - this.height_half < y1 && y1 < this.y + this.height_half)
    }
    hit_damage( damage_amount, knockback_vx, knockback_vy, attacker ){
        // 無敵時間
        if( 0 < this.hit_invincible_timer ){
            return false;
        }
        if( this.game.hud.hud_menu.is_menu_open ){
            return false;
        }

        this.health.mod_hp( -damage_amount );
        this.vx += knockback_vx;
        this.vx = Math.max( -20, Math.min(this.vx, 20) );
        this.vy += knockback_vy;
        this.vy = Math.max( -20, Math.min(this.vy, 20) );
        this.hit_invincible_timer = this.hit_invincible_timer_max;

        let damage_number = new DamageNumber( this.game );
        damage_number.x = this.x;
        damage_number.y = this.y;
        damage_number.number = damage_amount;
        damage_number.color = 'rgb(250, 30, 30)';
        damage_number.font = 'bold 30px monospace';
        this.game.world.push_entity( damage_number );

        return true;
    }

    on_update(){
        super.on_update();

        // 物理法則
        this.x += this.vx;
        this.y += this.vy;



        if ( this.is_ghost ) {
            // 死んでリスポン待ちの幽霊
            this.ghost_timer -= 1;

            this.x = 0;
            this.y = -40;
            this.vx = 0;
            this.vy = 0;

            this.health.hp = (1-(this.ghost_timer / this.ghost_timer_max)) * this.health.max_hp;
            if( this.ghost_timer <= 0 ){
                this.is_ghost = false;
            }
            // 以降の処理は飛ばしちゃう？
            //return;
        } else if( this.is_flying ){
            // 飛行中


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
            if( !this.game.hud.hud_menu.is_menu_open ){
                this.control_land();
            }
            this.vx *= this.walk_speed_down_rate;

        }



        if( 1 < this.vy ){
            this.is_landing = false;
        }

        // 海との当たり判定
        if( -this.height_half <= this.y ){
            if( !this.is_diving && 0 <= this.y){
                // 潜水中でない場合は浮かぶ
                this.vy -= 1;
                this.vy *= 0.8;

                // 海上でのスタミナ消費
                if( !this.health.consume_sp( 0.3 * this.stamina_reduce ) ){
                    // 足りない場合はHPが減っていく
                    this.health.mod_hp( -0.1 );
                }
            }
            this.is_landing = false;
            this.is_in_sea = true;
            this.is_flying = false;
            this.is_falling = false;
            this.is_in_ship_inertial = false;

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
            this.x = this.game.world.ship.core_x;
            this.y = -40;
            this.vx = 0;
            this.vy = 0;
        }

        // ステータスの変動
        this.health.always_process();

        // マウスクリック
        if( !this.game.hud.hud_menu.is_menu_open && !this.is_ghost){
            if( this.game.input_controller.get_mouse_press() ) {
                this.on_click( this.game.world.cursor_x, this.game.world.cursor_y );
            } else if( this.game.input_controller.get_mouse_down() ){
                this.on_keep_click( this.game.world.cursor_x, this.game.world.cursor_y );
            }
            if( this.game.input_controller.is_down_key['KeyT']){
                // アイテムの投棄
                let active_item = this.game.hud.item_slot.get_active_item();
                if( active_item != null){
                    let new_drop_item = new DropItem( this.game );
                    new_drop_item.set_tool_item( active_item );
                    new_drop_item.x = this.x + 32;
                    new_drop_item.y = this.y;
                    this.game.world.push_entity( new_drop_item )
                    this.game.hud.item_slot.delete_active_item()
                }
            }

        }
    }
    on_click( cursor_x, cursor_y ){
        // 船の設備へのインタラクトを試みる
        let block = this.game.world.ship.get_ship_block( cursor_x, cursor_y, true );
        if( block ){
            if( block.on_click() ){
                // インタラクトに成功した場合、処理終了
                return;
            }
        }
        // アイテムスロット使用
        this.game.hud.item_slot.activate_item( cursor_x, cursor_y, this.x, this.y );

    }
    on_keep_click( cursor_x, cursor_y ){
        this.game.hud.item_slot.keep_activate_item( cursor_x, cursor_y, this.x, this.y );
    }
    update_land(){


    }
    splint_check( d ){

        if( 0 == this.splint_double_hit_timer[d] ){
            this.is_splinting = false;
        } else if( this.splint_double_hit_timer_max <= this.splint_double_hit_timer[d]){

        } else if( 0 < this.splint_double_hit_timer[d]){
            this.is_splinting = true;
        } else {
            this.is_splinting = false;
        }
        this.splint_double_hit_timer[d] = this.splint_double_hit_timer_max + 1;
    }
    control_land(){
        // WASDで移動
        if( this.game.input_controller.get_down_right() ){
            this.splint_check( 1 );
            if( this.is_splinting && this.health.consume_sp( 0.2 )) {
                this.vx += this.splint_speed;
            } else {
                if( this.health.consume_sp( 0.1 )){
                    this.vx += this.walk_speed;
                } else {
                    this.vx += this.walk_speed * 0.5;
                }
            }
        }
        if( this.game.input_controller.get_down_left() ){
            this.splint_check( 0 );
            if( this.is_splinting && this.health.consume_sp( 0.2 )){
                this.vx -= this.splint_speed;
            } else {
                if( this.health.consume_sp( 0.1 )){
                    this.vx -= this.walk_speed;
                } else {
                    this.vx -= this.walk_speed * 0.5;
                }
            }
        }
        // スプリント用カウントを減らす
        if( 0 < this.splint_double_hit_timer[0] ){
            this.splint_double_hit_timer[0] -= 1;
        }
        if( 0 < this.splint_double_hit_timer[1] ){
            this.splint_double_hit_timer[1] -= 1;
        }
        // ジャンプ　海面でも小さくジャンプできる
        if( this.game.input_controller.get_down_up() || this.game.input_controller.get_down_space()){
            if( -1 < this.vy ){
                if( this.is_landing ){
                    if( this.health.consume_sp( 3 ) ){
                        this.vy = -8;
                        this.is_landing = false;
                    }

                } else if( this.is_in_sea ){
                    if( this.health.consume_sp( 10 ) ){
                        this.vy = -8;
                        this.is_in_sea = false;
                    } else {
                        // 足りない場合はhpを消費
                        this.health.mod_hp( -3 );
                        this.vy = -8;
                        this.is_in_sea = false;
                    }
                }
            }
        }
        // 下入力
        if( this.game.input_controller.get_down_down() ){
            // TODO 床すりぬけ

            if( this.is_in_sea ){
                if( 0 < this.underwater_speed || this.stamina_reduce < 1){
                    // 潜水モードに入る
                    this.is_diving = true;
                    this.vy += 3;
                    this.y += 3;
                } else {
                    // 潜水装備をつけてない場合
                }
            } else {
                this.is_off_platform = true;
            }
        } else {
            this.is_off_platform = false;
        }

    }

    control_midair(){

        if( 0 < this.riseup_charge ){
            this.riseup_charge -= Math.abs(this.vy * 0.1);
            this.riseup_charge -= 0.1;
            this.vy -= 2;
            let top_speed = this.riseup_charge * 0.1;
            if( this.vy < -top_speed ){
                this.vy *= 0.7;
            }
        } else {
            this.vy += 0.5;
            if( -20 < this.y ){
                this.is_flying = false;
            }
        }

        if( 0 < this.vy ){
            this.vy *= 0.8;
        }
        this.vy *= 0.99;

        // WASDで移動
        if( this.game.input_controller.get_down_right() ){
            this.vx += 1 + this.midair_speed
        }
        if( this.game.input_controller.get_down_left() ){
            this.vx -= 1 + this.midair_speed
        }
        this.vx *= 0.5;

        // 急降下
        if( this.game.input_controller.get_down_down() ){
            this.is_flying = false;
            this.is_falling = true;
            this.riseup_charge = 0;
        }

    }

    control_falling(){
        // WASDで移動
        if( this.game.input_controller.get_down_right() ){
            this.vx += 1 + this.midair_speed
        }
        if( this.game.input_controller.get_down_left() ){
            this.vx -= 1 + this.midair_speed
        }
        this.vx *= 0.5;

        // 急降下を解除して飛行状態に
        if( this.game.input_controller.get_down_up() ){
            this.is_flying = true;
            this.is_falling = false;
        }
    }

    control_diving(){
        // WASDで移動
        this.vx *= 0.99;
        this.vy *= 0.99;

        let water_resist = 0.3;
        if( this.game.input_controller.get_down_right() ){
            this.vx += (1 + this.underwater_speed) * water_resist;
        }
        if( this.game.input_controller.get_down_left() ){
            this.vx -= (1 + this.underwater_speed) * water_resist;
        }
        if( this.game.input_controller.get_down_up() ){
            this.vy -= (1 + this.underwater_speed) * water_resist;
        }
        if( this.game.input_controller.get_down_down() ){
            this.vy += (1 + this.underwater_speed) * water_resist;
        }

        // 水中でのスタミナ消費
        if( !this.health.consume_sp( 1 * this.stamina_reduce ) ){
            // 足りない場合はHPが減っていく
            this.health.mod_hp( -0.1 );
        }

    }
    is_in_ship(){
        let local_x_in_ship = this.x + (this.game.world.ship.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = this.y + (this.game.world.ship.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS + this.height_half;
        let block_x = Math.floor( local_x_in_ship / ShipBlock.BLOCK_SIZE);
        let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
        if( 0 <= block_x && block_x < this.game.world.ship.block_array.length &&
            0 <= block_y && block_y < this.game.world.ship.block_array[0].length){
                return true;
        }
        return false;
    }
    hittest_ship(){
        // 船との当たり判定
        // 船から見たローカル座標
        let local_x_in_ship = this.x + (this.game.world.ship.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = this.y + (this.game.world.ship.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS + this.height_half;

        let ship_block = this.game.world.ship.get_ship_block( this.x, this.y + this.height_half);
        if( local_y_in_ship % ShipBlock.BLOCK_SIZE < 8 && // 床の厚さ
            ship_block != null &&
            ship_block.is_floor
        ){
            // 着地判定を得る
            if( this.is_off_platform || this.vy < -1 ){
                // 床すりぬけ状態
            } else {
                let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
                this.y = ( block_y - this.game.world.ship.ship_offset_y) * ShipBlock.BLOCK_SIZE - ShipBlock.BLOCK_RADIUS - this.height_half;
                this.vy = 0;
                this.is_landing = true;
                this.is_in_ship_inertial = true;
            }
        }
    }
    on_draw( canvas ){

        canvas.save();
        canvas.translate( this.x, this.y );
        if( !this.is_facing_right ){
            canvas.scale( -1, 1 );
        }
        canvas.strokeStyle = 'rgb(200,0,200)';
        canvas.strokeRect( - this.width_half, - this.height_half, this.width, this.height);

        if( this.is_ghost ){
            canvas.drawImage( this.image_ghost, - this.width_half, - this.height_half, this.width, this.height );
        } else {
            canvas.drawImage( this.image, - this.width_half,  - this.height_half, this.width, this.height );
        }

        canvas.restore();
    }
}
