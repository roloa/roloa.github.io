
import {Entity} from './entity/Entity.js';
import {Player} from './entity/Player.js';
import {Ship} from './Ship.js';
import {DropItem} from './entity/DropItem.js';
import {EffectWind} from './entity/EffectWind.js';
import {EnemyFish} from './entity/EnemyFish.js';
import {FishingLure} from './entity/FishingLure.js';

export class World {
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

        this.player = new Player( this.game )
        this.ship = new Ship( this.game )
        this.lure = new FishingLure( this.game );

    }
    push_enemy( new_entity ){
        this.enemy_list.push( new_entity )
    }
    give_tool_item_player( new_tool_item ){
        let new_drop_item = new DropItem( this.game );
        new_drop_item.set_tool_item( new_tool_item );
        new_drop_item.x = this.game.world.player.x
        new_drop_item.y = this.game.world.player.y - 48;
        this.entity_list.push( new_drop_item )
    }

    on_update(){

        // セーブテスト
        if( this.game.input_controller.is_pressed_key['KeyI']){
            this.game.log('セーブします。');
            this.game.save_data_manager.save_game();
            this.game.log('セーブしました。');
        }
        if( this.game.input_controller.is_pressed_key['KeyO']){
            this.game.log('ロードします。');
            this.game.save_data_manager.load_game();
            this.game.log('ロードしました。');

        }

        // カメラ操作？
        if( this.game.input_controller.is_down_key['ShiftLeft']){
            if( this.game.input_controller.is_wheel_up ){
                this.camera.zoom += 0.1;
            } else if( this.game.input_controller.is_wheel_down ){
                this.camera.zoom -= 0.1;
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


        // いろいろ自然わき
        if( Math.random() < 0.001) {
            let new_item = new DropItem( this.game )
            new_item.x = 300
            new_item.generate_drifting_item();
            this.entity_list.push( new_item )
        }
        if( Math.random() < 0.01) {
            let new_entity = new EffectWind( this.game )
            new_entity.x = 300
            new_entity.y = -100 - Math.random() * 100;
            this.entity_list.push( new_entity )
        }
        if( Math.random() < 0.01) {
            let new_enemy = new EnemyFish( this.game );
            new_enemy.x = 500;
            new_enemy.y = 500;

            this.push_enemy( new_enemy );
        }

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
        canvas.strokeStyle = 'rgb(0,100,200)'
        canvas.beginPath()
        canvas.moveTo(this.camera.x - 500,0)
        canvas.lineTo(this.camera.x + 500,0)
        canvas.stroke()

        // マウスカーソル
        canvas.strokeStyle = 'rgb(250,20,20)'
        canvas.strokeRect( this.cursor_x - 10, this.cursor_y - 10, 20, 20)

        //
        canvas.restore();

    }
}
