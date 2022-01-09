
import {ShipBlock} from './ShipBlock.js';

export class BotHouseCat extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = 'ネコハウス';

        this.image = this.game.image_library.get_image('inugoya');

    }
}
