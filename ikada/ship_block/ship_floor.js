
import {ShipBlock} from './ShipBlock.js';

export class ShipFloor extends ShipBlock{

    constructor( game ){
        super( game );

        this.is_floor = true;
        this.image = this.game.image_library.get_image('ship_floor');
    }

    on_update(){

    }

}
