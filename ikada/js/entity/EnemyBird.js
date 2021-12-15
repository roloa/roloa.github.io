
import {Entity} from './Entity.js';

export class EnemyBird extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'bird_kamome' )

        this.width = 128;
        this.height = 128;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;
        this.max_hp = 100;
        this.hp = 100;

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 2;
        this.is_angry = false;

        this.showing_hp_timer = 0;

    }
    test_hit( x1, y1 ){
        return (this.x - this.width_half < x1 && x1 < this.x + this.width_half &&
            this.y - this.height_half < y1 && y1 < this.y + this.height_half)
    }
    test_hit_bullet( bullet ){
        if( this.test_hit( bullet.x, bullet.y ) ){
            // 弾に当たった

            this.hp -= 12;

            this.is_angry = true;
            this.showing_hp_timer = 100;
            if( this.hp <= 0) {
                this.is_alive = false;
            }
            return true;
        }
        return false;
    }

    get_vector_to_player(){
        let vecx = this.game.world.player.x - this.x;
        let vecy = this.game.world.player.y - this.y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
        vecx = vecx / length;
        vecy = vecy / length;
        return {x: vecx, y: vecy};
    }

    on_update(){
        super.on_update();

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.99;
        this.vy *= 0.99;

        // 怒っている場合
        if( this.is_angry ){

            // プレイヤーの方に向かう
            let vec = this.get_vector_to_player();
            this.vx = vec.x * this.dash_speed;
            this.vy = vec.y * this.dash_speed;

            // 弾を撃つ
        } else {
            // 平常時
            this.vx = -1;
        }

        // プレイヤーとの当たり判定
        if( this.test_hit( this.game.world.player.x, this.game.world.player.y ) ){
            let knockback_vec = this.get_vector_to_player();
            knockback_vec.x *= 20;
            knockback_vec.y *= 20;
            let damage = 10;
            this.game.world.player.hit_damage( damage, knockback_vec, this );
        }

        // hp表示タイマー
        if( 0 < this.showing_hp_timer ){
            this.showing_hp_timer -= 1;
        }
    }
    on_draw( canvas ){

        canvas.drawImage( this.image, this.x - this.width * 0.5 , this.y - this.height * 0.5 , this.width, this.height );

        if( 0 < this.showing_hp_timer ){
            const HP_RADIUS = 16;
            const center_x = this.x ;
            const center_y = this.y ;

            canvas.strokeStyle = 'rgb(200,200,200)'
            canvas.fillStyle = 'rgb(20,20,20)'
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
