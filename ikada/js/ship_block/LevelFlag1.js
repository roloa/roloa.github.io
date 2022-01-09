
import {ShipBlock} from './ShipBlock.js';

export class LevelFlag1 extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = 'レベルフラッグ[1]';

        this.image = this.game.image_library.get_image('undoukai_flag1_i');

        this.is_active = false;
        this.ship_level_value = 1;
    }

    on_interact(){
        // 舟のレベル
        // if(){
        //
        // }
    }
    // on_draw( canvas ){
    //
    // }
}
