
import {ShipBlock} from './ShipBlock.js';

export class FirePlace extends ShipBlock{

    constructor( game ){
        super( game );

        this.is_floor = true;
        this.image = this.game.image_library.get_image('takibi_dai_fire');
    }

    on_update(){

    }

}
