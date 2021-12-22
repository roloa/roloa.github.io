
import {Entity} from './Entity.js';
import {DamageNumber} from './particle/DamageNumber.js';

export class Bullet extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.vx = 0;
        this.vy = 0;
        this.gravity = 0;

        this.line_x = 10;
        this.line_y = 10;

        this.life_time = 200;
        this.knock_back_rate = 0.2;
        
    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        // 敵との当たり判定
        for( let enemy of this.game.world.enemy_list){
            if( enemy == null ){
                continue;
            }
            let is_hit = enemy.test_hit_bullet( this );
            if( is_hit ){
                this.is_alive = false;
                // ダメージ数字を出す
                let damage_number = new DamageNumber( this.game );
                damage_number.x = this.x;
                damage_number.y = this.y;
                damage_number.number = this.damage;
                this.game.world.push_entity( damage_number );
                break;
            }
        }
        // 寿命
        if( 0 < this.life_time ){
            this.life_time -= 1;
        } else {
            this.is_alive = false;
        }
    }
    on_draw( canvas ){
        canvas.strokeStyle = 'rgb(250,250,20)';
        canvas.lineWidth = 5;
        canvas.beginPath();
        canvas.moveTo( this.x, this.y);
        canvas.lineTo( this.x + this.line_x, this.y + this.line_y);
        canvas.stroke();
    }
}
