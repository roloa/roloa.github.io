
import {Entity} from './Entity.js';
import {DropItem} from './DropItem.js';
import {FishKirimi} from '../tool_item/FishKirimi.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

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
        this.is_fish_hitting = false;
        this.fish_hit_timer = 0;
        this.hit_item = null;

        this.image = this.game.image_library.get_image( 'fishing_lure' );

    }
    generate_hit_item(){
        if( Math.random() < 0.5 ){
            let new_item = new ResourceItem( this.game )
            new_item.generate_drifting_item();
            return new_item;
        }
        return new FishKirimi( this.game );
    }
    on_click_rod( cursor_x, cursor_y, player_x, player_y ){
        if( this.is_working ){
            if( !this.is_rewinding ){
                // 巻取り中に巻き取るのを防止
                if( this.is_fish_hitting ){
                    this.hit_item = this.generate_hit_item();
                }
                this.is_rewinding = true;
            }
        } else {
            // 針を投げる
            this.is_working = true;
            this.is_fish_hitting = false;


            let vec = this.game.world.player.get_vector_to_cursor();

            this.vx = vec.x * 7;
            this.vy = vec.y * 7;

            this.x = player_x + vec.x * 10;
            this.y = player_y - 16 + vec.y * 10;
        }

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
                    this.is_fish_hitting = false;

                    // 釣った魚をプレイヤーの位置に生成
                    if( this.hit_item != null ){
                        this.game.world.give_tool_item_player( this.hit_item );
                    }
                    this.hit_item = null;
                }
            } else {
                this.vy += 0.5
                this.x += this.vx;
                this.y += this.vy;

                // 海との当たり判定
                if( 0 <= this.y ){
                    //this.y = 0
                    this.vy -= 1;
                    this.vy *= 0.8;
                    this.vx *= 0.9;

                    if( Math.random() < 0.005 ){
                        this.is_fish_hitting = true;
                        this.vy += 6;
                        this.fish_hit_timer = 300;
                    }
                    if( this.is_fish_hitting ){
                        if( this.y <= 20 && this.vy <= 1 ){
                            this.vy += 6;
                        }
                        this.fish_hit_timer -= 1;
                        if( this.fish_hit_timer <= 0 ) {
                            this.is_fish_hitting = false;
                        }
                    }
                } else {
                    // 海の中にいない
                }
            }
        }

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,200,200)'
        //canvas.strokeRect( this.x - 16, this.y - 16, 32, 32)

        if( this.hit_item != null ){
            canvas.drawImage( this.hit_item.get_image() ,this.x - 16, this.y - 16, 32 , 32)
        }
        if( this.is_working ){
            canvas.drawImage( this.image ,this.x - 16, this.y - 16, 32 , 32)
        }

    }
}
