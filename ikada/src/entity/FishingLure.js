
import {Entity} from './Entity.js';
import {DropItem} from './DropItem.js';
import {FishKirimi} from '../tool_item/d_foods/FishKirimi.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {ContainerItem} from '../tool_item/ContainerItem.js';

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
        this.is_first_fishing = true;
        this.is_rewinding = false;
        this.is_fish_hitting = false;
        this.fish_hit_timer = 0;
        this.hit_item = null;

        this.waiting_hit_timer_base = 100;
        this.waiting_hit_timer = this.waiting_hit_timer_base;

        this.image = this.game.image_library.get_image( 'fishing_lure' );

    }
    generate_hit_item(){
        if( this.is_first_fishing ){
            this.is_first_fishing = false;
            let fishing_result = new ContainerItem( this.game );
            fishing_result.set_image('fish_sakana_iwashi');
            fishing_result.set_content( new FishKirimi( this.game ) );
            return fishing_result;
        } else {
            return this.game.materials.balance.get_fishing_result();
        }
    }
    catch_drop_item(){
        // ドロップアイテムをキャッチする
        for( let entity of this.game.world.entity_list ){
            if( entity && entity instanceof DropItem ){
                if( entity.x - 32 < this.x && this.x < entity.x + 32 &&
                    entity.y - 32 < this.y && this.y < entity.y + 32
                ){
                    this.hit_item = entity.item_to_pickup;
                    entity.is_alive = false;
                    break;
                }
            }
        }
    }
    on_click_rod( cursor_x, cursor_y, player_x, player_y ){
        if( this.is_working ){
            if( !this.is_rewinding ){
                // 巻取り中に巻き取るのを防止
                if( this.is_fish_hitting ){
                    this.hit_item = this.generate_hit_item();
                } else {
                    this.catch_drop_item();
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
                        this.game.world.drop_tool_item_at_player( this.hit_item );
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


                    if( this.is_fish_hitting ){
                        if( this.y <= 20 && this.vy <= 1 ){
                            this.vy += 6;
                        }
                        this.fish_hit_timer -= 1;
                        if( this.fish_hit_timer <= 0 ) {
                            this.is_fish_hitting = false;
                        }
                    } else {
                        if( 0 < this.waiting_hit_timer ){
                            this.waiting_hit_timer -= 1;
                        } else {
                            this.waiting_hit_timer = this.waiting_hit_timer_base * (Math.random() + 0.2);

                            this.is_fish_hitting = true;
                            this.vy += 6;
                            this.fish_hit_timer = 200;
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
