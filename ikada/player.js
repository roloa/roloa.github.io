
import {Entity} from './entity.js';

export class Player extends Entity {
    constructor( world ){

        super( world );

        this.name = 'player';

        this.x = 0
        this.y = -60

    }

    on_update(){
        super.on_update();
        //console.log(this.world.game.input_controller.is_down_right)
        if( this.world.game.input_controller.is_down_right ){
            this.x += 2
        }
        if( this.world.game.input_controller.is_down_left ){
            this.x -= 2
        }
        if( this.world.game.input_controller.is_down_up ){
            if( this.is_landing ){
                this.vy -= 8;
                this.is_landing = false;
            }
        }


    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,0,200)'
        canvas.strokeRect( this.x - 16, this.y - 32, 32, 32)

    }
}
