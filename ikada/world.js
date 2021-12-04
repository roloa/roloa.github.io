
import {Entity} from './entity.js';
import {Player} from './player.js';
import {Ship} from './ship.js';
import {DropItem} from './dropitem.js';
import {EffectWind} from './effect_wind.js';

export class World {
    constructor( game ){
        this.name = 'world';
        this.game = game;

        this.camera = {}
        this.camera.x = 0
        this.camera.y = 0
        this.camera.zoom = 1.0

        this.entity_list = []

        this.player = new Player( this.game )
        this.ship = new Ship( this.game )

    }

    on_update(){

        // カメラ操作？
        if(  this.game.input_controller.is_down_key['KeyI']){
            this.camera.y -= 1;
        }
        // カメラ移動
        // TODO 簡易
        if( this.camera.x < this.player.x - 100 ){
            this.camera.x += 1;
        }
        if( this.player.x + 100 < this.camera.x ){
            this.camera.x -= 1;
        }
        if( this.camera.y < this.player.y - 100 ){
            this.camera.y += 1;
        }
        if( this.player.y + 100 < this.camera.y ){
            this.camera.y -= 1;
        }

        if( Math.random() < 0.01) {
            let new_item = new DropItem( this.game )
            new_item.x = 300
            this.entity_list.push( new_item )
        }
        if( Math.random() < 0.01) {
            let new_entity = new EffectWind( this.game )
            new_entity.x = 300
            new_entity.y = -100 - Math.random() * 100;
            this.entity_list.push( new_entity )
        }


        for( let i = 0 ; i < this.entity_list.length ; i++ ){
            this.entity_list[i].on_update( );
        }

        this.player.on_update()

    }
    //
    on_draw( canvas ){

        canvas.save();
        // カメラの視点に移動
        canvas.translate( -this.camera.x , -this.camera.y);
        // 画面の中心
        canvas.translate( this.game.SCREEN_WIDTH_HALF, this.game.SCREEN_HEIGHT_HALF );

        // 拡大指定
        // TODO
        //
        this.ship.on_draw( canvas );
        this.player.on_draw( canvas );

        for( let i = 0 ; i < this.entity_list.length ; i++ ){
            this.entity_list[i].on_draw( canvas );
        }
        // 海面
        canvas.strokeStyle = 'rgb(0,100,200)'
        canvas.beginPath()
        canvas.moveTo(-500,0)
        canvas.lineTo( 500,0)
        canvas.stroke()


        //
        canvas.restore();

    }
}
