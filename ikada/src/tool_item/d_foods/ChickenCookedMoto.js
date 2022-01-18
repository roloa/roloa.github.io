

import {GenericFood} from './GenericFood.js';

import {ChickenDried} from './ChickenDried.js';
import {ChickenCookedSaki} from './ChickenCookedSaki.js';

export class ChickenCookedMoto extends ChickenCookedSaki {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'food_chicken_tebamoto');
    }


}
