
import {ShipBlock} from './ShipBlock.js';

export class ShipFarm extends ShipBlock {

    constructor( game ){
        super( game );

        this.is_floor = false;
        this.image = this.game.image_library.get_image('dougu_torobune_tsuchi');
    }

    on_update(){

    }

}
