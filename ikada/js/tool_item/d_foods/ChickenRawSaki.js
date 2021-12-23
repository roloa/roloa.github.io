

import {GenericFood} from './GenericFood.js';

import {ChickenCookedSaki} from './ChickenCookedSaki.js';
import {ChickenDried} from './ChickenDried.js';

export class ChickenRawSaki extends GenericFood {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'food_chicken_tebasaki_nama');
        this.saving_data.item_name = '鳥肉';
        this.saving_data.hunger_value = 20;
        this.saving_data.thirst_value = 5;
        this.saving_data.is_be_leftover = true;
    }
    get_cooked_item(){
        return new ChickenCookedSaki( this.game );
    }
    get_dried_item(){
        return new ChickenDried( this.game );
    }

}
