
import {ShipBlock} from './ShipBlock.js';
import {Bullet} from '../entity/Bullet.js';

// TODO
export class WeaponAirCannon extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = '燃料式空気砲';
        this.image = this.game.image_library.get_image('air_cannon');

        this.saving_data.fuel_amount = 0;
        this.cool_time_count = 0;
        this.cool_time_max = 60;

        this.target_enemy = null;
        this.target_range = 320;
        this.target_range_p2 = this.target_range * this.target_range;

        this.setup_gun_data();
    }

    setup_gun_data(){
        this.gun_data = {};
        // 基礎攻撃力
        this.gun_data.basic_power = 10;
        // クールタイム(50=1秒)
        this.gun_data.cool_time = 50

        //this.gun_data.fire_burst = 5;
        this.gun_data.fire_spread = 1;
        this.gun_data.fire_spread_angle = 0.1;

        this.gun_data.bullet_lifetime = 50;
        this.gun_data.bullet_velocity = 10;
        this.gun_data.bullet_weight = 1;
        this.gun_data.blast_lifetime = 0;
        this.gun_data.blast_velocity = 0;

        this.gun_data.critical_range_lifetime = 0;
        this.gun_data.critical_range_lifetime_window = 0;
        this.gun_data.critical_range_damage = 0;
        this.gun_data.critical_chance = 0;
        this.gun_data.critical_chance_damage = 1.0;
        this.gun_data.knockback_rate = 1.0;
        this.gun_data.poison_damage = 0;
        this.gun_data.slow_rate = 0.0;
        this.gun_data.life_leech = 0;
        this.gun_data.bullet_color = 'rgb(250,0,250)';
    }

    on_interact(){

        let item = this.game.hud.item_slot.get_active_item();
        if( item && item.fuel_value ) {
            this.game.hud.item_slot.delete_active_item();
            this.game.log( '空気砲に燃料を補充しました。' );
            this.saving_data.fuel_amount += item.fuel_value;
            return true;
        } else {
        }
        this.game.log( '燃料の量: ' + this.saving_data.fuel_amount );
        return true;
    }
    on_update(){
        super.on_update();

        if( 0 < this.cool_time_count ){
            // クールタイム
            this.cool_time_count -= 1;
        } else {
            if( 0 < this.saving_data.fuel_amount ){
                this.cool_time_count = this.cool_time_max;
                // 燃料があるなら、燃料を消費して弾を撃つ
                this.saving_data.fuel_amount -= 1;

                if( this.target_enemy == null || this.target_enemy.is_alive == false){
                    this.search_target();
                }
                if( this.target_enemy != null ){
                    this.on_fire();
                }
            }
        }
    }
    get_radian_to_target(){
        return Math.atan2( this.target_enemy.y - this.y, this.target_enemy.x - this.x )
    }
    search_target(){
//        this.target_enemy = this.game.world.player;
        this.target_enemy = this.game.world.search_nearest_enemy( this.x, this.y );
    }
    on_fire(){

        let rad = this.get_radian_to_target();
        let vec_x = Math.cos(rad)
        let vec_y = Math.sin(rad)

        let bullet = new Bullet( this.game );
        bullet.x = this.x + vec_x * 30;
        bullet.y = this.y + vec_y * 30;
        bullet.vx = vec_x * this.gun_data.bullet_velocity;
        bullet.vy = vec_y * this.gun_data.bullet_velocity;
        bullet.line_x = vec_x * 30;
        bullet.line_y = vec_y * 30;
        bullet.life_time = this.gun_data.bullet_lifetime;
        bullet.weight = this.gun_data.bullet_weight;
        bullet.gun_data = this.gun_data;
        this.game.world.push_entity( bullet );

    }
}
