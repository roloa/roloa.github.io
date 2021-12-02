
import {Entity} from './entity.js';
import {Player} from './player.js';
import {Ship} from './ship.js';


export class World {
    constructor( game ){
        this.name = 'world';
        this.game = game;

        this.camera = {}
        this.camera.x = 0
        this.camera.y = 0
        this.camera.zoom = 1.0

        this.player = new Player( this )
        this.ship = new Ship( this )

    }

    on_update(){

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
