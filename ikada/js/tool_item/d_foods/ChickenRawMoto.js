

import {GenericFood} from './GenericFood.js';

import {ChickenRawSaki} from './ChickenRawSaki.js';
import {ChickenCookedMoto} from './ChickenCookedMoto.js';

export class ChickenRawMoto extends ChickenRawSaki {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'food_chicken_tebamoto_nama');
    }
    get_cooked_item(){
        return new ChickenCookedMoto( this.game );
    }

}
