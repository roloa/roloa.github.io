
import {ShipBlock} from './ShipBlock.js';
import {WaterPlace} from './WaterPlace.js';

export class WaterPlace2 extends WaterPlace {

    constructor( game ){
        super( game );

        this.name = '給水バケツ';

        this.is_floor = false;
        this.image = this.game.image_library.get_image('bucket_iron_water_up');
        this.image_empty = this.game.image_library.get_image('bucket_iron_empty_up');

        this.saving_data.is_water_filled = true;
        this.saving_data.water_fill_timer = 0;

        this.water_fill_timer_max = 5000;
    }
}
