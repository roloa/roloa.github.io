
import {ShipBlock} from './ShipBlock.js';
import {BotHouseDog} from './BotHouseDog.js';
import {BotCat} from '../entity/BotCat.js';


export class BotHouseCat extends BotHouseDog {

    constructor( game ){
        super( game );

        this.name = 'ネコハウス';

        this.image = this.game.image_library.get_image('inugoya');

    }
    create_new_bot(){
        return new BotCat( this.game );
    }

}
