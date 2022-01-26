
import {Entity} from './Entity.js';
import {DropItem} from './DropItem.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {DeadBody} from './particle/DeadBody.js';
import {DamageNumber} from './particle/DamageNumber.js';
import {EnemyBullet} from './EnemyBullet.js';
import {WeaponItem} from '../tool_item/WeaponItem.js';
import {FishKirimi} from '../tool_item/d_foods/FishKirimi.js';


export class Enemy extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'fish_sakana_iwashi' )

        this.name = 'noname enemy';
        this.strength_lv = 1;

        this.is_scouted = false;

        this.width = 128;
        this.height = 128;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;




        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 2;
        this.target_vy = Math.random()*2-1;
        this.target_vx = Math.random()*2-1;

        this.is_angry = false;
        this.angry_timer_max = 500;
        this.angry_timer_count = 0;
        this.gosya_forgive_count = 1;

        this.is_preparing_jump = false;
        this.preparing_jump_minimum_time = 50;
        this.preparing_jump_timer = 0;

        this.max_hp = 100;
        this.hp = 100;

        this.direct_damage = 7;
        this.knock_back_rate = 1.0;
        this.bullet_damage = 5;
        this.bullet_knock_back_rate = 1.0;

        this.fire_spread = 3;
        this.fire_spread_angle = 0.1;
        this.bullet_lifetime = 100;
        this.bullet_velocity = 10;
        this.fire_cool_time = 100;
        this.fire_cool_time_count = 0;
        this.blast_lifetime = 0;

        this.bullet_image = null;

        this.poison_count = 0;
        this.poison_damage = 0;
        this.slow_count = 0;
        this.slow_rate = 1.0;

        this.showing_hp_timer = 0;

    }
    enemy_move_ai(){
        // デフォルトでは何もしない
    }
    test_hit( x1, y1 ){
        return (this.x - this.width_half < x1 && x1 < this.x + this.width_half &&
            this.y - this.height_half < y1 && y1 < this.y + this.height_half)
    }
    test_hit_bullet( bullet ){
        if( this.test_hit( bullet.x, bullet.y ) ){
            // 弾に当たった

            let taken_damage = bullet.calc_damage();
            this.take_damage( taken_damage );
            this.vx += bullet.vx * bullet.gun_data.knockback_rate;
            this.vy += bullet.vy * bullet.gun_data.knockback_rate;
            if( 0 < this.gosya_forgive_count ){
                // 1発だけなら誤射かもしれない
                this.gosya_forgive_count -= 1;
                // 進行方向をプレイヤーの方に変える
                let vec = this.get_vector_to_player_with_bias(0, 0)
                this.target_vx = vec.x * 2;
                this.target_vy = vec.y * 2;
            } else {
                if( this.hp < this.max_hp * 0.9 ){
                    this.is_angry = true;
                    this.angry_timer_count = this.angry_timer_max;
                }
            }

            // 状態異常を受ける
            if( 0 < bullet.gun_data.poison_damage ){
                this.poison_damage = bullet.gun_data.poison_damage;
                this.poison_count = 255; // 5秒間、5回分
            }
            if( 0 < bullet.gun_data.slow_rate ){
                this.slow_rate = 1.0 - bullet.gun_data.slow_rate;
                this.slow_count = 255; // 約5秒間
            }
            if( 0 < bullet.gun_data.life_leech ){
                this.game.world.player.health.mod_hp( bullet.gun_data.life_leech );
            }

            return true;
        }
        return false;
    }
    take_damage( taken_damage ){
        this.hp -= taken_damage;
        // ダメージ数字を出す
        let damage_number = new DamageNumber( this.game );
        damage_number.x = this.x;
        damage_number.y = this.y;
        damage_number.number = taken_damage;
        this.game.world.push_entity( damage_number );
        if( this.hp <= 0) {
            this.on_die();
        }
        this.showing_hp_timer = 250;
    }
    test_hit_ship(){
        // 舟との当たり判定を取り、当たった場合はなんか処理する
        // そもそも舟の範囲にいるかどうか
        let ship = this.game.world.ship;
        let ship_block = ship.get_ship_block( this.x, this.y );
        if( ship_block != null ){
            ship_block.take_damage( this.direct_damage );
            this.take_damage( ship_block.kickback_damage );
            if( this.vx < ship.velocity ){
                // 右から入った
                this.vx *= -1.1;
                this.vx += ship.velocity * 2;
                this.x += ship.velocity;
            } else {
                // 左から
                this.vx *= -1.1;
                this.x -= 16;
            }
            if( this.vy < 0){
                this.vy *= -1.1;
                this.y += 16;
            } else {
                this.vy *= -1.1;
                this.y -= 16;
            }
            this.on_hit_ship();
        }
    }
    on_hit_ship(){
        // 舟に当たった時の処理を書く
    }
    on_hit_player(){
        // プレイヤーに体当たりした時の処理
    }
    on_die(){
        // 生存フラグをなくす
        this.is_alive = false;

        // パーティクル生成
        // 死体
        this.game.world.push_entity( this.get_dead_body() );
        // ドロップアイテム生成
        this.game.world.push_entity( this.get_drop_item() );
    }
    get_dead_body(){
        let new_dead_body = new DeadBody( this.game );
        new_dead_body.x = this.x;
        new_dead_body.y = this.y;
        new_dead_body.width = this.width;
        new_dead_body.height = this.height;
        new_dead_body.image = this.image;
        return new_dead_body;
    }
    get_drop_item(){
        let drop_item = new DropItem( this.game )
        drop_item.x = this.x;
        drop_item.y = this.y;
        drop_item.set_tool_item( this.get_drop_tool_item() );
        return drop_item;
    }
    get_drop_tool_item(){
        // let new_drop_weapon = new WeaponItem( this.game );
        // new_drop_weapon.generate_random_weapon( this.strength_lv , null );
        // return new_drop_weapon;
        return new FishKirimi( this.game );
    }
    get_distance_p2_to_player(){
        let vecx = this.game.world.player.x - this.x;
        let vecy = this.game.world.player.y - this.y;
        return (vecx * vecx) + (vecy * vecy);
    }
    get_distance_to_player(){
        let vecx = this.game.world.player.x - this.x;
        let vecy = this.game.world.player.y - this.y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
    }
    get_vector_to_point( x1, y1 ){
        let vecx = x1 - this.x;
        let vecy = y1 - this.y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
        vecx = vecx / length;
        vecy = vecy / length;
        return {x: vecx, y: vecy};
    }
    get_vector_to_player(){
        let vecx = this.game.world.player.x - this.x;
        let vecy = this.game.world.player.y - this.y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
        vecx = vecx / length;
        vecy = vecy / length;
        return {x: vecx, y: vecy};
    }
    get_vector_to_player_with_bias( bias_x, bias_y){
        let vecx = this.game.world.player.x - this.x + bias_x;
        let vecy = this.game.world.player.y - this.y + bias_y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
        vecx = vecx / length;
        vecy = vecy / length;
        return {x: vecx, y: vecy};
    }
    fire_bullet(){

        let rad = Math.atan2(
            this.game.world.player.y - this.y,
            this.game.world.player.x - this.x
        );


        for( let i = 0 ; i < this.fire_spread ; i++ ){
            let bullet = new EnemyBullet( this.game );
            bullet.owner_enemy = this;
            bullet.damage = this.bullet_damage;
            bullet.knock_back_rate = this.bullet_knock_back_rate;

            let fire_rad = rad;
            if( 0 < i){
                let spread_direction = this.fire_spread_angle;
                for( let spread_num = 1 ; spread_num <= i ; spread_num++ ){
                    spread_direction = spread_direction * -spread_num;
                    fire_rad += spread_direction;
                }
            }
            bullet.vx = Math.cos(fire_rad) * this.bullet_velocity;
            bullet.vy = Math.sin(fire_rad) * this.bullet_velocity;
            bullet.x = this.x + bullet.vx;
            bullet.y = this.y + bullet.vy;

            bullet.life_time = this.bullet_lifetime;
            if( 0 < this.blast_lifetime ){
                bullet.is_blaster_bullet = true;
            }

            bullet.rotation = fire_rad;
            bullet.image = this.bullet_image;

            // 舟の慣性系の有無を引き継ぐ
            bullet.is_in_ship_inertial = this.is_in_ship_inertial;

            this.game.world.push_entity( bullet );
        }
    }
    on_update(){
        super.on_update();

        // 敵の行動AI
        this.enemy_move_ai();

        // 状態異常カウントの減少
        if( 0 < this.poison_count ){
            this.poison_count -= 1;
            if( this.poison_count % 50 == 0){
                this.take_damage( this.poison_damage )
            }
        }
        if( 0 < this.slow_count ){
            this.slow_count -= 1;
        }

        if( 0 < this.angry_timer_count && !this.game.world.player.is_ghost ){
            this.angry_timer_count -= 1;
        } else {
            // 怒り時間終了か、プレイヤーが死んでいる
            this.is_angry = false;
        }

        // プレイヤーとの当たり判定
        if( this.game.world.player.test_hit_enemy( this ) ){
            this.vx = -this.vx;
            this.vy = -this.vy;
            this.on_hit_player();
        }
        // 舟との当たり判定
        this.test_hit_ship();

        // TODO ボットへの当たり判定

        // hp表示タイマー
        if( 0 < this.showing_hp_timer ){
            this.showing_hp_timer -= 1;
        }
    }
    on_draw( canvas ){

        canvas.drawImage( this.image, this.x - this.width * 0.5 , this.y - this.height * 0.5 , this.width, this.height );

        if( 0 < this.showing_hp_timer ){
            const HP_RADIUS = 16;
            const center_x = this.x ;
            const center_y = this.y ;

            canvas.strokeStyle = 'rgb(200,200,200)'
            canvas.fillStyle = 'rgb(40,30,20)'
            canvas.beginPath();
            canvas.arc( center_x, center_y, HP_RADIUS, 0, Math.PI*2, true );
            canvas.fill();
            canvas.fillStyle = 'rgb(20,200,20)'
            canvas.beginPath();
            canvas.moveTo( center_x, center_y)
            canvas.arc( center_x, center_y, HP_RADIUS, Math.PI*-0.5, Math.PI*-0.5 - (Math.PI * 2 ) * (this.hp / this.max_hp ), true );
            canvas.fill();

        }

    }
}
