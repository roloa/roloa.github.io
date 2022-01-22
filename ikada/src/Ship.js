
import {ShipBlock} from './ship_block/ShipBlock.js';
import {ShipFloor} from './ship_block/ShipFloor.js';
import {ShipFrame} from './ship_block/ShipFrame.js';
import {ShipCore} from './ship_block/ShipCore.js';


export class Ship {

    constructor( game ){

        this.game = game;

        // 船を構成するブロックを並べた2次元配列。
        // 必要に応じて拡張する
        this.block_array = []
        this.init_block_array();

        this.velocity = 0;

        this.ship_level = 0;
    }

    init_block_array(){
        if( true ) {
            // デバッグ用初期配置
            for( let x = 0 ; x < 7 ; x++ ){
                this.block_array[x] = [];
                for( let y = 0 ; y < 4 ; y++ ){
                    this.block_array[x][y] = null;
                }
            }
            this.ship_offset_x = 4
            this.ship_offset_y = 3

            this.put_ship_block(new ShipFloor( this.game ), 5, 0 );
            this.put_ship_block(new ShipFrame( this.game ), 5, 1 );
            this.put_ship_block(new ShipFrame( this.game ), 5, 2 );

            this.put_ship_block(new ShipFloor( this.game ), 3, 1);
            this.put_ship_block(new ShipFrame( this.game ), 3, 2);

            this.put_ship_block(new ShipFloor( this.game ), 1, 2 );

            this.put_ship_block(new ShipFloor( this.game ), 0, 3);
            this.put_ship_block(new ShipFloor( this.game ), 1, 3);
            this.put_ship_block(new ShipCore( this.game ),  2, 3);
            this.core_x = 3;
            this.core_y = 3;
            this.put_ship_block(new ShipFloor( this.game ), 3, 3);
            this.put_ship_block(new ShipFloor( this.game ), 4, 3);
            this.put_ship_block(new ShipFloor( this.game ), 5, 3);
            this.put_ship_block(new ShipFloor( this.game ), 6, 3);

            // this.block_array[6][5] = new ShipFloor( this.game )
            // this.block_array[6][6] = new ShipFrame( this.game )
            // this.block_array[6][7] = new ShipFrame( this.game )
            //
            // this.block_array[4][6] = new ShipFloor( this.game )
            // this.block_array[4][7] = new ShipFrame( this.game )
            //
            // this.block_array[2][7] = new ShipFloor( this.game )
            //
            // this.block_array[1][8] = new ShipFloor( this.game )
            // this.block_array[2][8] = new ShipFloor( this.game )
            // this.block_array[3][8] = new ShipFloor( this.game )
            // this.block_array[4][8] = new ShipCore( this.game )
            // this.block_array[5][8] = new ShipFloor( this.game )
            // this.block_array[6][8] = new ShipFloor( this.game )
            // this.block_array[7][8] = new ShipFloor( this.game )

        }

    }
    get_ship_block( x_in_world, y_in_world, is_force_get_broken ){
        let local_x_in_ship = x_in_world + (this.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = y_in_world + (this.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;

        // 触れているブロックの座標
        let block_x = Math.floor( local_x_in_ship / ShipBlock.BLOCK_SIZE);
        let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
        if( 0 <= block_x && block_x < this.block_array.length &&
            0 <= block_y && block_y < this.block_array[0].length){
                if( this.block_array[ block_x ][ block_y ] != null ){
                    if( !is_force_get_broken && this.block_array[ block_x ][ block_y ].saving_data.is_broken ){
                        // 壊れているなら、nullを返す
                        // forceなら壊れていてもブロックを返す
                        return null;
                    }
                }
                return this.block_array[ block_x ][ block_y ];
        }
        return null;
    }
    get_ship_block_by_index( block_x, block_y, is_force_get_broken ){
        if( 0 <= block_x && block_x < this.block_array.length &&
            0 <= block_y && block_y < this.block_array[0].length){
                if( this.block_array[ block_x ][ block_y ] != null ){
                    if( !is_force_get_broken && this.block_array[ block_x ][ block_y ].saving_data.is_broken ){
                        // 壊れているなら、nullを返す
                        // forceなら壊れていてもブロックを返す
                        return null;
                    }
                }
                return this.block_array[ block_x ][ block_y ];
        }
        return null;
    }
    put_ship_block_coodinate( new_block, cursor_x, cursor_y ){
        let local_x_in_ship = cursor_x + (this.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = cursor_y + (this.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;

        // 触れているブロックの座標
        let block_x = Math.floor( local_x_in_ship / ShipBlock.BLOCK_SIZE);
        let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);


        // 隣接するブロックがあるかをチェック
        let left_block   = this.get_ship_block_by_index( block_x - 1, block_y, true );
        let right_block  = this.get_ship_block_by_index( block_x + 1, block_y, true );
        let up_block     = this.get_ship_block_by_index( block_x, block_y - 1, true );
        let down_block   = this.get_ship_block_by_index( block_x, block_y + 1, true );
        let is_there_neighbor = ( left_block != null || right_block != null || up_block != null || down_block != null);

        if( is_there_neighbor == false ){
            this.game.log('隣接するブロックが無いと置けません。');
            return false;
        }
        //
        if( block_x < 0 ){
            // 左側に拡張する
            let new_col = [];
            for( let y = 0 ; y < this.block_array[0].length ; y++ ){
                new_col.push( null );
            }
            this.block_array.unshift( new_col );
            block_x += 1;
            this.ship_offset_x += 1;
            this.calc_ship_block_cell_xy();
        } else if( this.block_array.length <= block_x){
            // 右側に拡張する
            let new_col = [];
            for( let y = 0 ; y < this.block_array[0].length ; y++ ){
                new_col.push( null );
            }
            this.block_array.push( new_col );
            this.calc_ship_block_cell_xy();
        }
        if( block_y < 0 ){
            // 上側に拡張する
            for( let x = 0 ; x < this.block_array.length ; x++ ){
                this.block_array[x].unshift( null );
            }
            block_y += 1;
            this.ship_offset_y += 1;
            this.calc_ship_block_cell_xy();
        }
        // 下側には拡張できない(海の中にブロックを置けない)

        if( 0 <= block_x && block_x < this.block_array.length &&
            0 <= block_y && block_y < this.block_array[0].length){
                // 範囲内なら、
                if( this.block_array[block_x][block_y] != null ){
                    this.game.log('既にブロックがあります。');
                    return false;
                }

                this.put_ship_block(　new_block, block_x, block_y);
                return true;
        } else {
            // 拡張できる限りここには来ないはず
            this.game.log( 'ブロックを置ける範囲外です。' );
        }
        return false;
    }
    put_ship_block( new_block, put_x, put_y, skip_calc_ship_status ){
        if( new_block != null){
            new_block.is_removed = false;
            this.block_array[ put_x ][ put_y ] = new_block;
            new_block.x = put_x * ShipBlock.BLOCK_SIZE - this.ship_offset_x * ShipBlock.BLOCK_SIZE + ShipBlock.BLOCK_RADIUS;
            new_block.y = put_y * ShipBlock.BLOCK_SIZE - this.ship_offset_y * ShipBlock.BLOCK_SIZE + ShipBlock.BLOCK_RADIUS;
            new_block.cell_x = put_x;
            new_block.cell_y = put_y;
        } else {
            this.block_array[ put_x ][ put_y ] = null;
        }
        if( skip_calc_ship_status != true ){
            this.calc_ship_status();
        }
    }
    global_to_local_x( g_x ){
        return g_x + (this.ship_offset_x * ShipBlock.BLOCK_SIZE);
    }
    global_to_local_y( g_y ){
        return g_y + (this.ship_offset_y * ShipBlock.BLOCK_SIZE);
    }
    local_to_cell_x( l_x ){
        return Math.floor( l_x / ShipBlock.BLOCK_SIZE);
    }
    local_to_cell_y( l_y ){
        return Math.floor( l_y / ShipBlock.BLOCK_SIZE);
    }
    cell_to_global_x( c_x ){
        return (c_x * ShipBlock.BLOCK_SIZE) - (this.ship_offset_x * ShipBlock.BLOCK_SIZE);
    }
    cell_to_global_y( c_y ){
        return (c_y * ShipBlock.BLOCK_SIZE) - (this.ship_offset_y * ShipBlock.BLOCK_SIZE);
    }
    global_to_cell_x( g_x ){
        return this.local_to_cell_x( this.global_to_local_x( g_x ) );
    }
    global_to_cell_y( g_y ){
        return this.local_to_cell_y( this.global_to_local_y( g_y ) );
    }
    search_block_in_nearest_in_condition( x1, y1, condition_func ){
        let cell_x = this.global_to_cell_x( x1 );
        let cell_y = this.global_to_cell_x( y1 );
        let nearest_block = null;
        let nearest_distance = 1000000;
        for( let x = 0 ; x < this.block_array.length ; x++ ){
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                let block = this.block_array[x][y];
                if( block != null ){
                    if( condition_func( block ) ){
                        let distance = (x - cell_x) * (x - cell_x) + (y - cell_y) * (y - cell_y);
                        if( distance < nearest_distance ){
                            nearest_distance = distance;
                            nearest_block = block;
                        }
                    }
                }
            }
        }
        return nearest_block;
    }
    has_block_instanceof( block_class ){
        for( let x = 0 ; x < this.block_array.length ; x++ ){
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                let block = this.block_array[x][y];
                if( block != null ){
                    if( block instanceof block_class ){
                        return true;
                    }
                }
            }
        }
        return false;
    }
    impulse_velocity( amount ){
        this.velocity += amount;
    }
    get_left_side_x(){
        return - ShipBlock.BLOCK_SIZE * this.ship_offset_x;
    }
    get_right_side_x(){
        return   ShipBlock.BLOCK_SIZE * ( - this.ship_offset_x + this.block_array.length - 1);
    }
    get_top_y(){
        return - ShipBlock.BLOCK_SIZE * this.ship_offset_y;
    }

    calc_ship_status(){
        // 舟のレベル
        // TODO 舟のキャパシティ
        let ship_level_value_max = 0;

        for( let x = 0 ; x < this.block_array.length ; x++ ){
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                let block = this.block_array[x][y];
                if( block != null ){
                    if( ship_level_value_max < block.ship_level_value ){
                        ship_level_value_max = block.ship_level_value;
                    }
                }
            }
        }
        if( this.ship_level < ship_level_value_max ){
            this.game.log('舟レベルアップ: ');
            this.game.log( 'Lv' + this.ship_level +' -> Lv' + ship_level_value_max);
            this.ship_level = ship_level_value_max;
        } else if( ship_level_value_max < this.ship_level ){
            this.game.log('舟レベルダウン: ');
            this.game.log( 'Lv' + this.ship_level +' -> Lv' + ship_level_value_max);
            this.ship_level = ship_level_value_max;
        }
    }
    calc_ship_block_cell_xy(){
        // 全舟ブロックのcell_x, cell_yを修正する
        for( let x = 0 ; x < this.block_array.length ; x++ ){
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                let block = this.block_array[x][y];
                if( block != null ){
                    block.cell_x = x;
                    block.cell_y = y;
                    if( block.is_core ){
                        this.core_x = x;
                        this.core_y = y;
                    }
                }
            }
        }

    }
    on_update(){

        this.velocity *= 0.95;

        for( let x = 0 ; x < this.block_array.length ; x++ ){
            for( let y = 0 ; y < this.block_array[x].length ; y++ ){
                if( this.block_array[x][y] != null ){
                    // ブロックごとの処理
                    if( this.block_array[x][y].is_removed ){
                        this.block_array[x][y] = null;
                        this.calc_ship_status();
                    } else {
                        this.block_array[x][y].on_update();
                    }
                }
            }
        }

    }
    on_oar(){
        this.velocity = 3;
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
        if( true ){
            canvas.fillStyle = 'rgb(255,0,0)';
            canvas.fillRect( this.get_left_side_x(),  this.get_top_y(), 10, 10 );
            canvas.fillStyle = 'rgb(0,255,0)';
            canvas.fillRect( this.get_right_side_x(), this.get_top_y(), 10, 10 );

        }

    }

    load_data( data ){
        this.ship_offset_x = data.ship_offset_x;
        this.ship_offset_y = data.ship_offset_y;
        this.block_array = []
        for( let x = 0 ; x < data.block_array.length ; x++ ){
            this.block_array[x] = [];
            for( let y = 0 ; y < data.block_array[x].length ; y++ ){
                let new_block =
                this.game.save_data_manager.deserialize_block( data.block_array[x][y] )
                this.put_ship_block( new_block, x, y, true);
            }
        }
        this.calc_ship_status();
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
