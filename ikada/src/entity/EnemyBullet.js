
import {Entity} from './Entity.js';
import {DamageNumber} from './particle/DamageNumber.js';

export class EnemyBullet extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = null;
        this.vx = 0;
        this.vy = 0;
        this.gravity = 0;

        this.line_x = 10;
        this.line_y = 10;
        this.rotation = 0;

        this.life_time = 100;
        this.knock_back_rate = 1.0;
        this.weight = 50;

        this.is_blaster_bullet = false;

        this.damage = 11;
    }
    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;

        // プレイヤーとの当たり判定
        // 舟との当たり判定
        let ship_block = this.game.world.ship.get_ship_block( this.x, this.y );
        if( ship_block ){
            ship_block.on_hit_bullet( this );
            this.is_alive = false;
        }

        let is_hit = this.game.world.player.test_hit_bullet( this );
        if( is_hit ){
            this.is_alive = false;
        }
        // 寿命
        if( 0 < this.life_time ){
            this.life_time -= 1;
        } else {
            this.is_alive = false;
            // ブラスター処理
            if( this.is_blaster_bullet ){
                // 今の所、火の鳥のみなので火の鳥用のパラメータ固定
                for(let i = 0 ; i < 8 ; i++){
                    let rad = (Math.PI * i * 0.25) + 0.125;
                    let bullet = new EnemyBullet( this.game );
                    bullet.owner_enemy = this.owner_enemy;
                    bullet.damage = this.damage * 0.25;
                    bullet.knock_back_rate = this.knock_back_rate;

                    bullet.x = this.x;
                    bullet.y = this.y;

                    bullet.vx = Math.cos(rad) * 5;
                    bullet.vy = Math.sin(rad) * 5;
                    bullet.life_time = 25;
                    bullet.weight = this.weight;

                    bullet.rotation = rad;
                    bullet.image = this.image;
                    bullet.is_in_ship_inertial = this.is_in_ship_inertial;

                    this.game.world.push_entity( bullet );
                }
            }
        }
    }
    on_draw( canvas ){

        canvas.save();

        if( this.image != null ){
            canvas.translate( this.x, this.y );
            canvas.rotate( this.rotation );
            canvas.drawImage( this.image, -16, -16, 32, 32 );
        } else {
            canvas.strokeStyle = 'rgb(250,250,20)';
            canvas.lineWidth = 5;
            canvas.beginPath();
            canvas.moveTo( this.x, this.y);
            canvas.lineTo( this.x + this.line_x, this.y + this.line_y);
            canvas.stroke();
        }
        canvas.restore();
    }
}
