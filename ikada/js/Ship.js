
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
                    this.block_array[x][y] = null;
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
    get_ship_block( x_in_world, y_in_world ){
        let local_x_in_ship = x_in_world + (this.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = y_in_world + (this.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;

        // 触れているブロックの座標
        let block_x = Math.floor( local_x_in_ship / ShipBlock.BLOCK_SIZE);
        let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
        if( 0 <= block_x && block_x < this.block_array.length &&
            0 <= block_y && block_y < this.block_array[0].length){
                return this.block_array[ block_x ][ block_y ];
        }
    }
    on_update(){
        for( let x = 0 ; x < this.block_array.length ; x++ ){
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                if( this.block_array[x][y] != null ){
                    // ブロックごとの処理
                    if( this.block_array[x][y].is_removed ){
                        this.block_array[x][y] = null;
                    } else {
                        
                    }
                }
            }
        }
    }

    on_draw( canvas ){

        for( let x = 0 ; x < this.block_array.length ; x++ ){
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                if( this.block_array[x][y] != null ){
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

    load_data( data ){
        this.ship_offset_x = data.ship_offset_x;
        this.ship_offset_y = data.ship_offset_y;
        this.block_array = []
        for( let x = 0 ; x < data.block_array.length ; x++ ){
            this.block_array[x] = [];
            for( let y = 0 ; y < data.block_array[x].length ; y++ ){
                this.block_array[x][y] =
                this.game.save_data_manager.deserialize_block( data.block_array[x][y] )
            }
        }
    }
    save_data(){
        let data = {}
        data.ship_offset_x = this.ship_offset_x;
        data.ship_offset_y = this.ship_offset_y;
        data.block_array = []

        for( let x = 0 ; x < this.block_array.length ; x++ ){
            data.block_array[x] = [];
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                if( this.block_array[x][y] != null ){
                    data.block_array[x][y] = this.block_array[x][y].save_data();
                } else {
                    data.block_array[x][y] = null;
                }
            }
        }
        return data;
    }
}
