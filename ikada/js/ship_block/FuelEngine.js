
import {ShipBlock} from './ShipBlock.js';

// TODO
export class FuelEngine extends ShipBlock {

    constructor( game ){
        super( game );

        this.image = this.game.image_library.get_image('car_engine');
    }

    on_update(){

    }

}
