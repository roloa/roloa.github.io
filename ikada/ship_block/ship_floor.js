
import {ShipBlock} from './ship_block.js';

export class ShipFloor extends ShipBlock{

    constructor(){
        super()

        this.is_floor = true;

    }

    on_update(){

    }
    on_draw( canvas ){
        canvas.fillStyle = 'rgb(200,100,0)';

        canvas.fillRect( -ShipBlock.BLOCK_RADIUS, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_SIZE, ShipBlock.BLOCK_SIZE);
    }

}
