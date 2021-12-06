
import {Entity} from './entity.js';

export class EnemyFish extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'fish_sakana_iwashi' )

        this.width = 128;
        this.height = 128;
        this.max_hp = 100;
        this.hp = 100;

        this.showing_hp_timer = 0;

    }

    test_hit_bullet( bullet ){
        if( this.x < bullet.x && bullet.x < this.x + this.width &&
            this.y < bullet.y && bullet.y < this.y + this.height ){
            // 弾に当たった

            this.hp -= 12;

            this.showing_hp_timer = 100;
            if( this.hp <= 0) {
                this.is_alive = false;
            }
            return true;
        }
        return false;
    }

    on_update(){
        this.x -= 1;

        if( 0 < this.showing_hp_timer ){
            this.showing_hp_timer -= 1;
        }
    }
    on_draw( canvas ){

        canvas.drawImage( this.image, this.x, this.y, this.width, this.height );

        if( 0 < this.showing_hp_timer ){
            const HP_RADIUS = 16;
            const center_x = this.x + this.width * 0.5;
            const center_y = this.y + this.height * 0.5;

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
