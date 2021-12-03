
import {Entity} from './entity.js';

export class DropItem extends Entity {
    constructor( world ){

        super( world );

        this.name = 'unknown item';

        this.x = 0;
        this.y = 0;

    }

    on_update(){
        super.on_update();

        if( this.is_in_sea ) {
            this.vx = -1;
        }

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,200,200)'
        canvas.strokeRect( this.x - 8, this.y - 16, 16, 16)

    }
}
