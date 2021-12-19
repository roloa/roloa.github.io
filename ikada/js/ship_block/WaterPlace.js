
import {ShipBlock} from './ShipBlock.js';

export class WaterPlace extends ShipBlock {

    constructor( game ){
        super( game );

        this.is_floor = false;
        this.image = this.game.image_library.get_image('fantasy_gargoyle_water');
    }

    on_update(){

    }

}
