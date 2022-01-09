
import {ShipBlock} from './ShipBlock.js';

// TODO
export class BotHome extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = 'ボットホーム';

        this.is_floor = true;
        this.image = this.game.image_library.get_image('ship_floor');
    }

    on_update(){
        super.on_update();
    }

}
