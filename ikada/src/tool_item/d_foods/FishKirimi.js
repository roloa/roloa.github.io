

import {ToolItem} from '../ToolItem.js';
import {GenericFood} from './GenericFood.js';
import {CookedFish} from './CookedFish.js';
import {DriedFish} from './DriedFish.js';

export class FishKirimi extends GenericFood {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( './img/illustya/food_fish_kirimi_red.png');
        this.saving_data.item_name = '生魚';

    }
    get_cooked_item(){
        return new CookedFish( this.game );
    }
    get_dried_item(){
        return new DriedFish( this.game );
    }

}
