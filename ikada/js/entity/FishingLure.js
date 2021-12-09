
import {Entity} from './Entity.js';
import {DropItem} from './DropItem.js';
import {FishKirimi} from '../tool_item/FishKirimi.js';

export class FishingLure extends Entity {

    constructor( game ){

        super( game );

        this.game = game;
        this.name = 'unknown item';

        this.x = 0;
        this.y = 0;

        this.vx = 0;
        this.vy = 0;
        this.is_landing = false;
        this.is_in_sea = false;

        this.is_working = false;
        this.is_rewinding = false;

        this.image = this.game.image_library.get_image( 'fishing_lure' );

    }

    on_update(){
        super.on_update();

        if( this.is_working ){
            if( this.is_rewinding ){
                // 巻取り中
                this.x = this.game.world.player.x * 0.3 + this.x * 0.7;
                this.y = this.game.world.player.y * 0.3 + this.y * 0.7;
                if( Math.abs(this.game.world.player.x - this.x) < 32 ){
                    this.x = this.game.world.player.x;
                    this.y = this.game.world.player.y;
                    this.is_rewinding = false;
                    this.is_working = false;

                    // 釣った魚をプレイヤーの位置に生成
                    let new_item = new DropItem( this.game )
                    new_item.x = this.game.world.player.x
                    new_item.y = this.game.world.player.y - 48;
                    new_item.set_tool_item( new FishKirimi( this.game ) );
                    this.game.world.push_entity( new_item )
                }
            } else {
                this.vy += 0.5
                this.x += this.vx;
                this.y += this.vy;

                if( 1 < this.vy ){
                    this.is_landing = false;
                }

                // 海との当たり判定
                if( 0 <= this.y ){
                        //this.y = 0
                        this.vy -= 1;
                        this.vy *= 0.8;
                        this.vx *= 0.9;
                        this.is_landing = false;
                        this.is_in_sea = true;
                } else {
                    // 海の中にいない
                    this.is_in_sea = false;
                }
            }
        }

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,200,200)'
        //canvas.strokeRect( this.x - 16, this.y - 16, 32, 32)
        if( this.is_working ){
            canvas.drawImage( this.image ,this.x - 16, this.y - 16, 32 , 32)
        }

    }
}
