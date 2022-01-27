
import {ShipBlock} from './ShipBlock.js';
import {WeaponAirCannon} from './WeaponAirCannon.js';

import {Bullet} from '../entity/Bullet.js';

// TODO
export class WeaponCatapult extends WeaponAirCannon {

    constructor( game ){
        super( game );

        this.name = 'カタパルト';
        this.image = this.game.image_library.get_image('catapult');
        this.bullet_image = this.game.image_library.get_image('catapult_bullet');

        this.accept_ammo_type = 'stone';

        this.saving_data.fuel_amount = 0;
        this.cool_time_count = 0;
        this.cool_time_max = 50;

        this.target_enemy = null;
        this.target_range = 320;
        this.target_range_p2 = this.target_range * this.target_range;

        this.setup_gun_data();
    }

    setup_gun_data(){
        super.setup_gun_data();
        // 基礎攻撃力
        this.gun_data.basic_power = 10;
        // クールタイム(50=1秒)
        this.gun_data.cool_time = 300;

    }


}
