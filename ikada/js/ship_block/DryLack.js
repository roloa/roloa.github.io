
import {ShipBlock} from './ShipBlock.js';

export class DryLack extends ShipBlock {

    constructor( game ){
        super( game );

        this.is_floor = false;
        this.image = this.game.image_library.get_image('dry_lack');
    }

    on_update(){

    }

}
