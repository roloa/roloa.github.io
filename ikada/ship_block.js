
//import {ShipBlock} from './ship_block.js';

export class ShipBlock {

    static BLOCK_RADIUS = 16
    static BLOCK_SIZE = ShipBlock.BLOCK_RADIUS + ShipBlock.BLOCK_RADIUS

    constructor(){

        this.is_floor = false

    }

    on_update(){

    }
    on_draw( canvas ){
        if( true ){
            canvas.strokeStyle = 'rgb(200,0,0)'
            canvas.beginPath()
            canvas.moveTo(-ShipBlock.BLOCK_RADIUS,-ShipBlock.BLOCK_RADIUS)
            canvas.lineTo( ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_RADIUS)
            canvas.stroke()
            canvas.beginPath()
            canvas.moveTo( ShipBlock.BLOCK_RADIUS,-ShipBlock.BLOCK_RADIUS)
            canvas.lineTo(-ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_RADIUS)
            canvas.stroke()
        }
    }

}
