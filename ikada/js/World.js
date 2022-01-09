
import {Entity} from './entity/Entity.js';
import {Player} from './entity/Player.js';
import {Ship} from './Ship.js';
import {DropItem} from './entity/DropItem.js';
import {FishingLure} from './entity/FishingLure.js';
import {WorldSpawner} from './WorldSpawner.js';
import {ResourceItem} from './tool_item/ResourceItem.js';
import {EffectWind} from './entity/EffectWind.js';

export class World {

    static SEA_WAVE_COUNT = 40;
    static SEA_WAVE_SPACE = 2000 / World.SEA_WAVE_COUNT;
    static SEA_WAVE_SPACE_2 = World.SEA_WAVE_SPACE * 2;

    constructor( game ){
        this.name = 'world';
        this.game = game;

        this.camera = {}
        this.camera.x = 1000
        this.camera.y = 0
        this.camera.zoom = 1.0

        // ワールド内座標におけるマウスカーソルの座標
        this.cursor_x = 0;
        this.cursor_y = 0;

        this.entity_list = [];
        this.enemy_list = [];

        this.player = new Player( this.game );
        this.ship = new Ship( this.game );
        this.lure = new FishingLure( this.game );

        this.world_spawner = new WorldSpawner( this.game, this );

        this.auto_save_timer_max = 50 * 180; // 3min
        this.auto_save_timer = this.auto_save_timer_max ;

        this.sea_offset_x = 0;

        // 風のテスト
        let test_wind = new EffectWind( this.game );
        test_wind.x = 500;
        test_wind.y = -100;
        this.push_entity( test_wind );

        this.newgame_gift();
    }

    newgame_gift(){
        // 新規ゲーム開始時に支給されるアイテム
        let new_item = new DropItem( this.game )
        new_item.x = -32
        new_item.y = -100;
        let new_tool_item = new ResourceItem( this.game );
        new_tool_item.saving_data.item_name = '流木';
        new_tool_item.set_image( 'tree_ryuuboku' );
        new_tool_item.add_material( 'wood', 5);
        new_item.set_tool_item( new_tool_item );
        this.entity_list.push( new_item )
        new_item = new DropItem( this.game )
        new_item.x = 32
        new_item.y = -150;
        new_tool_item = new ResourceItem( this.game );
        new_tool_item.saving_data.item_name = '古着';
        new_tool_item.set_image( 'alohashirt_gray' );
        new_tool_item.add_material( 'cloth', 3);
        new_item.set_tool_item( new_tool_item );
        this.entity_list.push( new_item )
    }

    count_enemy(){
        let count = 0;
        for( let enemy of this.enemy_list ){
            if( enemy != null ){
                count++;
            }
        }
        return count;
    }
    push_enemy( new_entity ){
        this.enemy_list.push( new_entity )
    }
    push_entity( new_entity ){
        this.entity_list.push( new_entity )
    }
    search_nearest_enemy( x1, y1 ){
        let nearest_dist_p2 = 1000 * 1000; // range
        let nearest_enemy = null;
        for( let enemy of this.enemy_list ){
            if( enemy != null ){
                let dist_p2 = (enemy.x - x1) * (enemy.x - x1) + (enemy.y - y1) * (enemy.y - y1);
                if( dist_p2 < nearest_dist_p2 ){
                    nearest_enemy = enemy;
                    nearest_dist_p2 = dist_p2;
                }
            }
        }
        return nearest_enemy;
    }
    give_tool_item_player( new_tool_item ){
        let new_drop_item = new DropItem( this.game );
        new_drop_item.set_tool_item( new_tool_item );
        new_drop_item.x = this.game.world.player.x;
        new_drop_item.y = this.game.world.player.y;
        this.entity_list.push( new_drop_item )
    }

    on_update(){

        // オートセーブ
        if( 0 < this.auto_save_timer ){
            this.auto_save_timer -= 1;
        } else {
            this.auto_save_timer = this.auto_save_timer_max;
            this.game.save_data_manager.save_game('save_data_auto')
            this.game.log('オートセーブしました。')
            // オートセーブのついでに、配列を整理する
            this.entity_list = this.entity_list.filter(v => v);
            this.enemy_list = this.enemy_list.filter(v => v);
        }


        // カメラ操作？
        if( this.game.input_controller.is_down_key['ShiftLeft']){
            if( this.game.input_controller.is_wheel_up ){
                this.camera.zoom *= 1.1;

                this.game.log('カメラ倍率:' + this.camera.zoom )
            } else if( this.game.input_controller.is_wheel_down ){
                this.camera.zoom *= 0.9;
                this.game.log('カメラ倍率:' + this.camera.zoom )
            }

        }
        // カメラ移動
        // TODO 簡易
        if( this.camera.x + 50 < this.player.x ){
            this.camera.x += (this.player.x - this.camera.x ) * 0.05;
        }
        if( this.player.x < this.camera.x - 50 ){
            this.camera.x += (this.player.x - this.camera.x ) * 0.05;
        }
        if( this.camera.y < this.player.y - 50 ){
            this.camera.y += (this.player.y - this.camera.y ) * 0.05;
        }
        if( this.player.y + 50 < this.camera.y ){
            this.camera.y += (this.player.y - this.camera.y ) * 0.05;
        }

        this.world_spawner.on_update();


        // TODO エンティティリストのnullを取り除く作業
        for( let i = 0 ; i < this.entity_list.length ; i++ ){
            if( this.entity_list[i] ){
                this.entity_list[i].on_update( );
                if( !this.entity_list[i].is_alive ){
                    // エンティティが死んでいるなら取り除く
                    this.entity_list[i] = null;
                }
            }
        }

        // 敵エンティティリストは別管理
        for( let i = 0 ; i < this.enemy_list.length ; i++ ){
            if( this.enemy_list[i] ){
                this.enemy_list[i].on_update( );
                if( !this.enemy_list[i].is_alive ){
                    // エンティティが死んでいるなら取り除く
                    this.enemy_list[i] = null;
                }
            }
        }

        // マウスカーソルの位置
        this.cursor_x = (this.game.input_controller.mouse_x - this.game.SCREEN_WIDTH_HALF)  / this.camera.zoom + this.camera.x ;
        this.cursor_y = (this.game.input_controller.mouse_y - this.game.SCREEN_HEIGHT_HALF) / this.camera.zoom + this.camera.y ;

        // 常在オブジェクトの処理
        this.ship.on_update();
        this.player.on_update();
        this.lure.on_update();

        // 海の処理
        this.sea_offset_x -= this.ship.velocity;
        if( this.sea_offset_x < -World.SEA_WAVE_SPACE_2 ){
            this.sea_offset_x += World.SEA_WAVE_SPACE_2
        }

    }
    draw_sea( canvas ){
        canvas.strokeStyle = 'rgb(0,100,200)'
        canvas.beginPath()

        // 海のなみなみを描く
        let start_x = Math.floor(this.camera.x / World.SEA_WAVE_SPACE_2) * World.SEA_WAVE_SPACE_2 - 1000;

        canvas.moveTo(start_x + this.sea_offset_x  , 0)
         for( let i = 0 ; i < World.SEA_WAVE_COUNT ; i++ ){
             canvas.lineTo( World.SEA_WAVE_SPACE * i + start_x + this.sea_offset_x  ,
                 (i % 2)*10)
        }
        canvas.lineTo( 2000 + start_x + this.sea_offset_x , 0)
        canvas.stroke()

    }
    //
    on_draw( canvas ){

        canvas.save();

        // 画面の中心
        canvas.translate( this.game.SCREEN_WIDTH_HALF, this.game.SCREEN_HEIGHT_HALF );

        // 拡大指定
        canvas.scale( this.camera.zoom, this.camera.zoom );

        // カメラの視点に移動
        canvas.translate( -this.camera.x , -this.camera.y);





        // TODO
        //
        this.ship.on_draw( canvas );
        this.player.on_draw( canvas );
        this.lure.on_draw( canvas );

        for( let i = 0 ; i < this.entity_list.length ; i++ ){
            if( this.entity_list[i] ){
                this.entity_list[i].on_draw( canvas );
            }
        }
        for( let i = 0 ; i < this.enemy_list.length ; i++ ){
            if( this.enemy_list[i] ){
                this.enemy_list[i].on_draw( canvas );
            }
        }
        // 海面
        this.draw_sea( canvas );

        // マウスカーソル
        canvas.strokeStyle = 'rgb(250,20,20)'
        canvas.strokeRect( this.cursor_x - 10, this.cursor_y - 10, 20, 20)

        //
        canvas.restore();

    }
}
