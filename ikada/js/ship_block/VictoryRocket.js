
import {ShipBlock} from './ShipBlock.js';
import {EndingMovie} from '../EndingMovie.js';

export class VictoryRocket extends ShipBlock{

    constructor( game ){
        super( game );

        this.is_floor = true;
        this.image = this.game.image_library.get_image('hanabi_rocket');
    }

    on_update(){
        super.on_update();
    }
    on_interact(){

        this.game.movie_playing = new EndingMovie( this.game );

    }
}
