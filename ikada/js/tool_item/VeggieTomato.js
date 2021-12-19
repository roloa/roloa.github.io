
import {GenericFood} from './GenericFood.js';


export class VeggieTomato extends GenericFood {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'tomato_red');
        this.saving_data.item_name = 'トマト';
        this.saving_data.hunger_value = 20;
        this.saving_data.thirst_value = 20;
        this.saving_data.is_be_leftover = true;

    }

}
