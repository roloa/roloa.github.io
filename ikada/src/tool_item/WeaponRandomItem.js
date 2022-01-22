
import {WeaponItem} from './WeaponItem.js';
import {Bullet} from '../entity/Bullet.js';

export class WeaponRandomItem extends WeaponItem {
    static IMAGE_NAME_LIST = [
        'music_recorder',
        'shovel_scoop_ken',
        'gas_burner',
        'nokogiri',
        'itonokogiri',
        'souji_yuka_mop',
        'handagote',
        'water_gardening_hose',
        'cooking_dendou_mixer',
        'syousyuzai_spray',
        'harisen',
        'chain_saw',
        'muchi',
        'syousyuzai_spray_musyu',
        'smartphone_selfystick',
        'kouji_dendou_driver',
        'kaji_hikeshi_matoi',
        'tool_pickel',
        'dougu_micrometer_digital',
        'dougu_army_knife',
        'cooking_masher',
        'dougu_gluegun',
        'kouji_dendou_drill',
        'bug_haetataki_atack',
        'kouji_yuudoubou',
        'dougu_nogisu_digital',
        'cooking_houchou_chopper',
        'wood_hammer_100t',
        'wood_hammer_10t',
        'cooking_urokohiki',
        'dougu_bar',
        'hair_curl_dryer',
        'hair_drier',
        'machine_heat_gun',
        'nunchaku',
        'gardening_sentei_hasami',
        'cooking_hand_blender',
        'tosou_airbrush',
        'mizudeppou',
        'katana_shirasaya',
        'starter_starting_pistol',
        'game_ken',
        'hinawaju',
        'buki_morningstar_flail',
        'tozan_stick',
        'tsue_sennin',
        'music_alto_saxophone',
        'soccer_cheer_horn_music',
        'soccer_vuvuzela_music',
        'music_trumpet'
    ];

    constructor( game ){
        super( game );
        this.game = game;

    }
    generate_random_weapon( level, rarity ){
        // 基礎攻撃力
        let power = ( level ) * (2 + Math.random());

        let spread = Math.floor(Math.random() * Math.random() * 7 + 1.1);
        this.saving_data.fire_spread = spread
        power = (power * 2) / (1 + spread);

        this.saving_data.fire_spread_angle = Math.random() * 0.2 + 0.02;

        let velocity_factor = Math.random() + 0.5
        this.saving_data.bullet_lifetime = Math.floor( (30 + Math.random() * 30) / velocity_factor);
        this.saving_data.bullet_velocity = Math.floor(12 * velocity_factor );

        this.saving_data.bullet_weight = Math.floor(5 + Math.random() * 90);

        if( Math.random() < 0.2 ){
            let blast_velocity_factor = Math.random() + 0.5
            this.saving_data.blast_lifetime = Math.floor(( 10 + Math.random() * 10) / blast_velocity_factor);
            this.saving_data.blast_velocity = Math.floor( 12 * blast_velocity_factor);
        } else {
            this.saving_data.blast_lifetime = 0;
            this.saving_data.blast_velocity = 0;
        }

        if( Math.random() < 0.2 ){
            let range_crit_factor = 0.5 + Math.random();
            this.saving_data.critical_range_lifetime = Math.floor(1 + Math.random() * this.saving_data.bullet_lifetime);
            this.saving_data.critical_range_lifetime_window = Math.floor( 3 + Math.random() * 3 * range_crit_factor );
            this.saving_data.critical_range_damage = 2.0 / range_crit_factor;
        } else {
            this.saving_data.critical_range_lifetime = 0;
            this.saving_data.critical_range_lifetime_window = 0;
            this.saving_data.critical_range_damage = 1.0;
        }
        if( Math.random() < 0.2){
            let range_crit_factor = 0.5 + Math.random();
            this.saving_data.critical_chance = 0.1 + Math.random() * 0.1 * range_crit_factor;
            this.saving_data.critical_chance_damage = 2.0 / range_crit_factor;
        } else {
            this.saving_data.critical_chance = 0;
            this.saving_data.critical_chance_damage = 1.0;
        }

        this.saving_data.knockback_rate = 0.1 + Math.random() * Math.random();
        if( Math.random() < 0.2){
            this.saving_data.poison_damage = Math.floor(power * (0.1 + Math.random() * 0.3 + Math.random() * Math.random() * 0.9));
            power *= 0.8;
        } else {
            this.saving_data.poison_damage = 0;
        }
        if( Math.random() < 0.2){
            this.saving_data.slow_rate = (0.1 + Math.random() * 0.1 + Math.random() * Math.random() * 0.5);
        } else {
            this.saving_data.slow_rate = 0;
        }
        if( Math.random() < 0.2){
            this.saving_data.life_leech = Math.floor(1 + Math.random() * 3 + Math.random() * Math.random() * 7);
            power *= 0.8;
        } else {
            this.saving_data.life_leech = 0;
        }

        // クールタイム(50=1秒)
        let cool_time_factor = Math.random() + 0.5;
        this.saving_data.cool_time = Math.floor( 25 * cool_time_factor )
        power /= cool_time_factor;
        // 基礎攻撃力
        this.saving_data.basic_power = Math.floor(power);

        this.saving_data.bullet_color = 'rgb(250,0,250)';

        let image_index = Math.floor( Math.random() * WeaponItem.IMAGE_NAME_LIST.length);

        this.set_image( WeaponItem.IMAGE_NAME_LIST[image_index] );
    }
}
