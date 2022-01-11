
import {ShipBlock} from './ShipBlock.js';
import {WeaponAirCannon} from './WeaponAirCannon.js';

import {Bullet} from '../entity/Bullet.js';

// TODO
export class WeaponMortorTube extends WeaponAirCannon {

    constructor( game ){
        super( game );

        this.name = '大砲';
        this.image = this.game.image_library.get_image('mortor');
        this.bullet_image = this.game.image_library.get_image('cannonball_right');

        this.accept_ammo_type = 'cannon';

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
        this.gun_data.basic_power = 100;
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


}
