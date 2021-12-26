
import {Entity} from './Entity.js';
import {DropItem} from './DropItem.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {DeadBody} from './particle/DeadBody.js';
import {DamageNumber} from './particle/DamageNumber.js';
import {EnemyBullet} from './EnemyBullet.js';

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
        this.max_hp = 100;
        this.hp = 100;

        this.direct_damage = 23;
        this.knock_back_rate = 1.0;

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

        this.fire_spread = 3;
        this.fire_spread_angle = 0.1;
        this.bullet_lifetime = 100;
        this.bullet_velocity = 10;
        this.fire_cool_time = 100;
        this.fire_cool_time_count = 0;
        this.blast_lifetime = 0;

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
            this.hp -= taken_damage;
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
            this.showing_hp_timer = 100;

            // ダメージ数字を出す
            let damage_number = new DamageNumber( this.game );
            damage_number.x = this.x;
            damage_number.y = this.y;
            damage_number.number = taken_damage;
            this.game.world.push_entity( damage_number );
            if( this.hp <= 0) {
                this.on_die();
            }
            return true;
        }
        return false;
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
        let new_tool_item = new ResourceItem( this.game );
        new_tool_item.generate_drifting_item();
        new_tool_item.set_image( 'tree_ryuuboku' );
        new_tool_item.add_material( 'wood', 5);
        return new_tool_item;
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

            bullet.line_x = Math.cos(fire_rad) * 30;
            bullet.line_y = Math.sin(fire_rad) * 30;
            this.game.world.push_entity( bullet );
        }
    }
    on_update(){
        super.on_update();

        // 敵の行動AI
        this.enemy_move_ai();

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
        }

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
            canvas.fillStyle = 'rgb(20,20,20)'
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
