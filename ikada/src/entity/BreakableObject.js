
import {Entity} from './Entity.js';
import {DropItem} from './DropItem.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {DeadBody} from './particle/DeadBody.js';
import {DamageNumber} from './particle/DamageNumber.js';
import {EnemyBullet} from './EnemyBullet.js';
import {WeaponItem} from '../tool_item/WeaponItem.js';


export class BreakableObject extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'small_star6_orange' );

        this.name = 'noname breakobj';
        this.strength_lv = 1;

        this.is_scouted = false;

        this.width = 128;
        this.height = 128;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;

        this.vx = 0;
        this.vy = 0;

        this.max_hp = 100;
        this.hp = 100;

    }
    generate_object(){
        // 鳥の敵を生成する
        // 座標が設定済みの前提で、高度に応じたレベルの敵になる

        let altitude = this.y / 32;

        // HP = Lv x (9~10)
        this.max_hp = 100
        this.hp = this.max_hp;

        if( altitude < -8 ){
            this.image = this.game.image_library.get_image( 'cloud' )
            this.name = '雲';
        } else if( 2 < altitude){
            this.image = this.game.image_library.get_image( 'kaisou_wakame' )
            this.name = '海藻';
        } else {
            this.is_alive = false;

        }
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
        // this.game.world.push_entity( this.get_drop_item() );
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
        let new_drop_weapon = new WeaponItem( this.game );
        new_drop_weapon.generate_random_weapon( this.strength_lv , null );
        return new_drop_weapon;
    }
    on_update(){
        super.on_update();

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
