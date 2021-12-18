
import {Entity} from './entity.js';

// TODO
export class FriendlyBot extends Entity {
    constructor( game ){
        this.name = 'noname_entity';

        this.game = game;

        this.x = 0;
        this.y = 0;

    }

    on_update(){

    }

    on_draw( canvas ){
        canvas.strokeStyle = 'rgb(200,0,0)'
        canvas.strokeRect( this.x - 16, this.y - 32, 32, 32)
    }
}
