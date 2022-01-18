
import {Entity} from './Entity.js';

export class EffectWind extends Entity {

    constructor( game ){
        super( game )
        this.game = game;

        // 触れたりすることで影響を受けるフィールド上の特殊効果。
        this.vx = -3;

        this.image = this.game.image_library.get_image('./img/wind_effect.png');

    }
    on_update(){
        super.on_update();
        this.x += this.vx;

        // プレイヤーとの当たり判定
        let player = this.game.world.player;
        if( player.x - 30 < this.x && this.x < player.x + 30 &&
            player.y - 50 < this.y && this.y < player.y + 10
        ){
            player.hit_wind( this );
        }


    }
    on_draw( canvas ){
        canvas.strokeStyle = 'rgb(200,0,0)'
        canvas.drawImage( this.image, this.x - 16, this.y - 16, 32, 32)

    }
}
