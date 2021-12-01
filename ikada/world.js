
import {Entity} from './entity.js';



export class World {
    constructor( game ){
        this.name = 'world';
        this.game = game;

        this.camera = {}
        this.camera.x = 0
        this.camera.y = 0
        this.camera.zoom = 1.0

        this.player = new Entity()

    }

    //
    on_draw( canvas ){

        canvas.save()
        // カメラの視点に移動
        canvas.translate( -this.camera.x , -this.camera.y)
        // 画面の中心
        canvas.translate( this.game.SCREEN_WIDTH_HALF, this.game.SCREEN_HEIGHT_HALF )

        // 拡大指定
        // TODO
        //

        this.player.on_draw( canvas )
        //
        canvas.restore()

    }
}
