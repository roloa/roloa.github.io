
import {ShipBlock} from './ShipBlock.js';

export class ShipFrame extends ShipBlock {

    constructor( game ){
        super( game );

        this.is_floor = false;
        this.image = this.game.image_library.get_image('ship_frame');
    }
    on_update(){
        super.on_update();

    }
}
