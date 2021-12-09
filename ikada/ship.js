
import {ShipBlock} from './ship_block/ShipBlock.js';
import {ShipFloor} from './ship_block/ShipFloor.js';

export class Ship {

    constructor( game ){

        this.game = game;

        // 船を構成するブロックを並べた2次元配列。
        // 必要に応じて拡張する
        this.block_array = []
        if( true ) {
            // デバッグ用初期配置
            for( let x = 0 ; x < 9 ; x++ ){
                this.block_array[x] = [];
                for( let y = 0 ; y < 9 ; y++ ){
                    this.block_array[x][y] = new ShipBlock( this.game );
                }
            }
            this.ship_offset_x = 5
            this.ship_offset_y = 8

            this.block_array[6][5] = new ShipFloor( this.game )
            this.block_array[4][6] = new ShipFloor( this.game )
            this.block_array[2][7] = new ShipFloor( this.game )

            this.block_array[1][8] = new ShipFloor( this.game )
            this.block_array[2][8] = new ShipFloor( this.game )
            this.block_array[3][8] = new ShipFloor( this.game )
            this.block_array[4][8] = new ShipFloor( this.game )
            this.block_array[5][8] = new ShipFloor( this.game )
            this.block_array[6][8] = new ShipFloor( this.game )
            this.block_array[7][8] = new ShipFloor( this.game )

        } else {
            // 通常の初期配置
            for( let x = 0 ; x < 6 ; x++ ){
                this.block_array[x] = [];
                for( let y = 0 ; y < 6 ; y++ ){
                    this.block_array[x][y] = new ShipBlock( this.game );
                }
            }
            this.ship_offset_x = 3
            this.ship_offset_y = 5

            this.block_array[1][5] = new ShipFloor( this.game )
            this.block_array[2][5] = new ShipFloor( this.game )
            this.block_array[3][5] = new ShipFloor( this.game )
            this.block_array[4][5] = new ShipFloor( this.game )
            this.block_array[5][5] = new ShipFloor( this.game )
        }

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

    }

}
