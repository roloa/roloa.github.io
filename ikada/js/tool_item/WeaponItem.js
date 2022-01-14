import {ToolItem} from './ToolItem.js';
import {Bullet} from '../entity/Bullet.js';

export class WeaponItem extends ToolItem {

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
        this.saving_data.knockback_rate = 1.0;
        this.saving_data.poison_damage = 0;
        this.saving_data.slow_rate = 0.0;
        this.saving_data.life_leech = 0;
        this.saving_data.bullet_color = 'rgb(250,0,250)';

        this.cool_time_count = 0;

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
