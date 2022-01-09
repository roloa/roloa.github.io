
import {Entity} from './Entity.js';
import {DamageNumber} from './particle/DamageNumber.js';

export class Bullet extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.name = '名もなき弾丸';
        this.image = null;
        this.rotation = 0;
        this.image_size = 32;

        this.vx = 0;
        this.vy = 0;
        this.gravity = 0;

        this.line_x = 10;
        this.line_y = 10;

        this.life_time = 200;
        this.knock_back_rate = 0.2;
        this.weight = 50;

        this.is_blaster_bullet = false;

        this.gun_data = {};
    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;

        if(0 < this.y){
            // 水中
            this.vy -= (100 - this.weight)*0.001;
        } else {
            // 空中
            this.vy += (this.weight)*0.001;
        }

        // 敵との当たり判定
        for( let enemy of this.game.world.enemy_list){
            if( enemy == null ){
                continue; // カラの配列要素
            }
            if( enemy.is_alive == false ){
                continue; // 敵はもう死んでいる、同フレームに
            }
            let is_hit = enemy.test_hit_bullet( this );
            if( is_hit ){
                this.is_alive = false;

                break;
            }
        }
        // 寿命
        if( 0 < this.life_time ){
            this.life_time -= 1;
        } else {
            this.is_alive = false;
            // ブラスター処理
            if( this.is_blaster_bullet ){
                for(let i = 0 ; i < 8 ; i++){
                    let rad = (Math.PI * i * 0.25) + 0.125;
                    let bullet = new Bullet( this.game );
                    bullet.x = this.x;
                    bullet.y = this.y;

                    bullet.vx = Math.cos(rad) * this.gun_data.blast_velocity;
                    bullet.vy = Math.sin(rad) * this.gun_data.blast_velocity;
                    bullet.life_time = this.gun_data.blast_lifetime;
                    bullet.weight = this.weight;

                    bullet.rotation = rad;
                    bullet.gun_data = this.gun_data;
                    this.game.world.push_entity( bullet );
                }
            }
        }
    }
    calc_damage(){
        let damage = this.gun_data.basic_power;
        // 確率クリティカル
        if( Math.random() <= this.gun_data.critical_chance){
            damage *= this.gun_data.critical_chance_damage;
        }
        // 弾寿命クリティカル
        if( Math.abs(this.life_time - this.gun_data.critical_range_lifetime) < this.gun_data.critical_range_lifetime_window){
            damage *= this.gun_data.critical_range_damage;
        }
        // TODO プレイヤーの幸福度補正
        return damage;
    }
    on_draw( canvas ){
        canvas.save();
        canvas.translate( this.x, this.y );
        canvas.rotate( this.rotation );
        if( this.image != null){
            canvas.drawImage( this.image, this.image_size * -0.5, this.image_size * -0.5, this.image_size, this.image_size);
        } else {
            canvas.strokeStyle = 'rgb(250,250,20)';
            canvas.lineWidth = 5;
            canvas.beginPath();
            canvas.moveTo( 0, 0 );
            canvas.lineTo( this.x, this.y);
            canvas.stroke();
        }
        canvas.restore();
    }
}
