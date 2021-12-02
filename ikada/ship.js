
import {ShipBlock} from './ship_block.js';
import {ShipFloor} from './ship_floor.js';

export class Ship {

    constructor( world ){

        this.world = world;

        // 船を構成するブロックを並べた2次元配列。
        // 必要に応じて拡張する
        this.block_array = []
        for( let x = 0 ; x < 7 ; x++ ){
            this.block_array[x] = [];
            for( let y = 0 ; y < 7 ; y++ ){
                this.block_array[x][y] = new ShipBlock();
            }
        }
        this.ship_offset_x = 3
        this.ship_offset_y = 6

        this.block_array[1][6] = new ShipFloor()
        this.block_array[2][6] = new ShipFloor()
        this.block_array[3][6] = new ShipFloor()
        this.block_array[4][6] = new ShipFloor()
        this.block_array[5][6] = new ShipFloor()

        this.block = new ShipBlock()

    }

    on_update(){

    }

    on_draw( canvas ){

        for( let x = 0 ; x < this.block_array.length ; x++ ){
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                canvas.save()
                canvas.translate(
                    (-this.ship_offset_x + x) * ShipBlock.BLOCK_SIZE,
                    (-this.ship_offset_y + y) * ShipBlock.BLOCK_SIZE)
                this.block_array[x][y].on_draw( canvas );

                canvas.restore()
            }
        }

        this.block.on_draw( canvas );
    }

}
