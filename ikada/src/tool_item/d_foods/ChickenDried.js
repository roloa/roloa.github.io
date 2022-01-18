

import {GenericFood} from './GenericFood.js';

export class ChickenDried extends GenericFood {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'yakitori_kawa');
        this.saving_data.item_name = '鳥の干し肉';
        this.saving_data.hunger_value = 30;
        this.saving_data.thirst_value = 0;
        this.saving_data.is_be_leftover = true;
    }

}
