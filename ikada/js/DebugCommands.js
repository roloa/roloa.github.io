
import {WeaponItem} from './tool_item/WeaponItem.js';

export class DebugCommands extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    test_log(){
        this.game.log('debug command test!!')
    }
    get_random_weapon(){
        let debug_weapon = new WeaponItem( this.game );
        debug_weapon.generate_random_weapon( 10,10 );
        this.game.world.give_tool_item_player( debug_weapon );

    }
    get_effect_test_weapon(){
        let debug_weapon = new WeaponItem( this.game );
        debug_weapon.image = this.game.image_library.get_image( 'dougu_nail_hammer' );
        debug_weapon.saving_data.item_name = 'デバッグ武器';

        debug_weapon.saving_data.power = 10;
        debug_weapon.saving_data.cool_time = 50

        debug_weapon.saving_data.fire_burst = 5;
        debug_weapon.saving_data.fire_spread = 3;
        debug_weapon.saving_data.fire_spread_angle = 0.2;

        debug_weapon.saving_data.bullet_lifetime = 50;
        debug_weapon.saving_data.bullet_velocity = 10;
        debug_weapon.saving_data.bullet_weight = 50;
        debug_weapon.saving_data.blast_lifetime = 25;

        debug_weapon.saving_data.critical_range_lifetime = 45;
        debug_weapon.saving_data.critical_range_damage = 3.0;
        debug_weapon.saving_data.critical_chance = 0.1;
        debug_weapon.saving_data.critical_chance_damage = 2.0;
        debug_weapon.saving_data.knockback_rate = 1.0;
        debug_weapon.saving_data.poison_damage = 10;
        debug_weapon.saving_data.slow_rate = 0.2;
        debug_weapon.saving_data.life_leech = 10;
        debug_weapon.saving_data.bullet_color = 'rgb(250,0,250)'
        this.game.world.give_tool_item_player( debug_weapon );
    }
}
