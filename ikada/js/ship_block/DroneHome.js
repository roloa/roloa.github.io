
import {ShipBlock} from './ShipBlock.js';

// TODO
export class DroneHome extends ShipBlock {

    constructor( game ){
        super( game );

        this.is_floor = true;
        this.image = this.game.image_library.get_image('kaden_wifi_router');
    }

    on_update(){

    }

}
