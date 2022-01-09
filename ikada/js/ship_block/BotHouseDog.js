
import {ShipBlock} from './ShipBlock.js';

export class BotHouseDog extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = 'イヌハウス';

        this.image = this.game.image_library.get_image('inugoya');

    }
}
