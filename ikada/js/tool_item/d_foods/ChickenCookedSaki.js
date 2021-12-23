

import {GenericFood} from './GenericFood.js';


export class ChickenCookedSaki extends GenericFood {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'food_tebasaki');
        this.saving_data.item_name = '焼き鳥';
        this.saving_data.hunger_value = 40;
        this.saving_data.thirst_value = 0;
        this.saving_data.is_be_leftover = true;
    }

}
