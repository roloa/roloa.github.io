import {ToolItem} from './ToolItem.js';
import {Bullet} from '../entity/Bullet.js';

export class WeaponItem extends ToolItem {

    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'text_mu' );
        this.saving_data.item_name = '無名の武器';

        this.bullet_image = this.game.image_library.get_image('bullet_arrow');


        // 攻撃力
        // (武器の基礎攻撃力) x 幸福度補正x1.5 x あれこれ補正？

        // 基礎攻撃力
        this.saving_data.basic_power = 10;
        // クールタイム(50=1秒)
        this.saving_data.cool_time = 50

        //this.saving_data.fire_burst = 5;
        this.saving_data.fire_spread = 1;
        this.saving_data.fire_spread_angle = 0.1;

        this.saving_data.bullet_lifetime = 50;
        this.saving_data.bullet_velocity = 10;
        this.saving_data.bullet_weight = 50;
        this.saving_data.blast_lifetime = 0;
        this.saving_data.blast_velocity = 0;

        this.saving_data.critical_range_lifetime = 0;
        this.saving_data.critical_range_lifetime_window = 0;
        this.saving_data.critical_range_damage = 0;
        this.saving_data.critical_chance = 0;
        this.saving_data.critical_chance_damage = 1.0;
        this.saving_data.knockback_rate = 0.1;
        this.saving_data.poison_damage = 0;
        this.saving_data.slow_rate = 0.0;
        this.saving_data.life_leech = 0;
        this.saving_data.bullet_color = 'rgb(250,0,250)';

        this.cool_time_count = 0;

    }

    calc_damage(){
        // TODO 攻撃力計算
        return this.saving_data.basic_power;
    }
    on_update(){
        if( 0 < this.cool_time_count ){
            this.cool_time_count -= 1;
        }
    }
    on_attack( cursor_x, cursor_y, player_x, player_y ){

        let vec = this.game.world.player.get_vector_to_cursor();

        let rad = this.game.world.player.get_radian_to_cursor();

        for( let i = 0 ; i < this.saving_data.fire_spread ; i++ ){
            let bullet = new Bullet( this.game );
            bullet.x = this.game.world.player.x + vec.x * 30;
            bullet.y = this.game.world.player.y + vec.y * 30;
            // bullet.vx = vec.x * 10;
            // bullet.vy = vec.y * 10;
            let fire_rad = rad;
            if( 0 < i){
            let spread_direction = this.saving_data.fire_spread_angle;
                for( let spread_num = 1 ; spread_num <= i ; spread_num++ ){
                    spread_direction = spread_direction * -spread_num;
                    fire_rad += spread_direction;
                }
            }
            bullet.vx = Math.cos(fire_rad) * this.saving_data.bullet_velocity;
            bullet.vy = Math.sin(fire_rad) * this.saving_data.bullet_velocity;

            bullet.vx += this.game.world.player.vx;
            bullet.vy += this.game.world.player.vy;

            if( this.game.world.player.is_in_ship_inertial ){
                bullet.vx += this.game.world.ship.velocity;
            }
            bullet.life_time = this.saving_data.bullet_lifetime;
            bullet.weight = this.saving_data.bullet_weight;

            if( 0 < this.saving_data.blast_lifetime ){
                bullet.is_blaster_bullet = true;
            }

            bullet.rotation = fire_rad;
            bullet.image = this.bullet_image;
            bullet.gun_data = this.saving_data;
            this.game.world.push_entity( bullet );
        }
    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        if( 0 < this.cool_time_count ){
            if( Math.random() < 0.01){
                this.game.log('[Tips] 押しっぱなしでも連射できます。');
            }
        } else {
            this.on_attack( cursor_x, cursor_y, player_x, player_y );
            this.cool_time_count = this.saving_data.cool_time;
        }
    }
    on_keep_click( cursor_x, cursor_y, player_x, player_y ) {
        if( 0 < this.cool_time_count ){
        } else {
            this.on_attack( cursor_x, cursor_y, player_x, player_y );
            this.cool_time_count = this.saving_data.cool_time;
        }
    }
    dump_information_to_log(){
        this.game.log('名前 : ' + this.saving_data.item_name);
        this.game.log('攻撃力  : ' + this.saving_data.basic_power);
        let ct = Math.floor(this.saving_data.cool_time / 50 * 1000);
        this.game.log('クールタイム: ' + ct + 'ms');
        let lt = Math.floor(this.saving_data.bullet_lifetime/ 50 * 1000);
        let vel = Math.floor(this.saving_data.bullet_velocity * 50 / 32)
        this.game.log('飛翔速度,時間: ' + vel+'m/s, '+lt+'ms');
        this.game.log('弾の重さ: ' + this.saving_data.bullet_weight + '%');
        let kb = Math.floor( this.saving_data.knockback_rate * 100);
        this.game.log('ノックバック: ' + kb + '%');

        if( 1 < this.saving_data.fire_spread){
            let deg = Math.floor((this.saving_data.fire_spread_angle / Math.PI * 180) * this.saving_data.fire_spread);
            this.game.log('散弾数, 角度: ' + this.saving_data.fire_spread +', ' + deg +'度');
        }
        if(0 < this.saving_data.blast_lifetime){
            let b_vel = ( this.saving_data.blast_velocity * 50 / 32)
            let b_lt =  Math.floor(this.saving_data.blast_lifetime/ 50 * 1000);
            this.game.log('爆発速度,時間: ' + b_vel+'m/s, '+b_lt+'ms');
        }
        if( 0 < this.saving_data.critical_chance ){
            let chance = Math.floor( this.saving_data.critical_chance * 100 )
            let chance_damage = Math.floor( this.saving_data.critical_chance_damage * 100)
            this.game.log('クリティカル確率,倍率: ' + chance+'%, '+chance_damage+'%');
        }
        if( 0 < this.saving_data.critical_range_lifetime ){
            let crit_lt = Math.floor(this.saving_data.critical_range_lifetime / 50 * 1000);
            let crit_window = Math.floor(this.saving_data.critical_range_lifetime_window/ 50 * 1000);
            let crit_range_damage = Math.floor(this.saving_data.critical_range_damage * 100)
            this.game.log('クリティカル距離,猶予,倍率: ' + crit_lt+'ms, '+crit_window+'ms, '+crit_range_damage+'%');
        }
        if( 0 < this.saving_data.poison_damage){
            this.game.log('毒ダメージ: ' + this.saving_data.poison_damage);
        }
        if( 0 < this.saving_data.slow_rate ){
            let slow = Math.floor( this.saving_data.slow_rate * 100 );
            this.game.log('減速効果: -' + slow + '%');
        }
        if( 0 < this.saving_data.life_leech ){
            this.game.log('自己回復効果: ' + this.saving_data.life_leech);
        }

    }
}
