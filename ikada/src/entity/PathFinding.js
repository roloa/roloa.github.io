
import {ShipBlock} from '../ship_block/ShipBlock.js';

export class PathFinding {

    constructor( game ){
        this.game = game;

        this.start = {};
        this.goal = {};

        this.start.x = 0;
        this.start.y = 0;
        this.goal.x = 0;
        this.goal.y = 0;

        this.path = []

        this.ship_map = [];

        this.is_processing = false;
        this.is_finding_success = false;

        this.delay = 0;
        this.delay_count = this.delay;
    }
    make_path_node(x1, y1 ){
        return {
            x:x1,
            y:y1,
            go_up: true,
            go_down: true,
            go_left: true,
            go_right: true
        };
    }
    init_finding( x1, y1, x2, y2 ){
        this.start.x = x1;
        this.start.y = y1;
        this.goal.x = x2;
        this.goal.y = y2;
        this.path = [];
        this.is_processing = true;
        this.is_finding_success = false;

        this.ship_map = [];
        for( let x = 0 ; x < this.game.world.ship.block_array.length ; x++ ){
            this.ship_map[x] = [];
            for( let y = 0 ; y < this.game.world.ship.block_array[x].length ; y++ ){
                this.ship_map[x][y] = 0;
                let floor = this.game.world.ship.get_ship_block_by_index(x, y+1);
                if( floor != null && floor.is_floor ){
                    this.ship_map[x][y] = 1;
                }
            }
        }
        this.path.push( this.make_path_node(x1, y1) );
    }

    process_finding(){

        if( 0 < this.delay_count){
            this.delay_count -= 1;
            return null;
        } else {
            this.delay_count = this.delay;
        }
        let current = this.path[ this.path.length - 1 ];

        // パスがなくなったら、到達不能ということ
        if( this.path.length == 0 ){
            this.is_processing = false;
            return;
        }

        // 舟の外に飛び出したなら、戻る
        if( current.x < 0 || this.ship_map.length <= current.x ||
            current.y < 0 || this.ship_map[ current.x ].length <= current.y ){
            this.path.pop();
            return;
        }
        // 現在地がゴールなら、処理中フラグをfalseにする
        if( current.x == this.goal.x && current.y == this.goal.y ){
            this.is_processing = false;
            this.is_finding_success = true;
            return;
        }

        // 壁に立っているなら、戻る
        if( this.ship_map[ current.x ][ current.y ] == 0 ){
            this.path.pop();
            return;
        }
        // TODO 現在地から見て目的地に近い方角から探索したい
        let x_dist = current.x - this.goal.x;
        let y_dist = current.y - this.goal.y;
//        if( Math.abs( x_dist ) < Math.abs( y_dist ) ){}

        if( current.go_right ){
            current.go_right = false;
            if( this.check_path_overrapping( current.x + 1, current.y )){
                this.path.push( this.make_path_node( current.x + 1, current.y ) );
            }
            return;
        }
        if( current.go_left ){
            current.go_left = false;
            if(this.check_path_overrapping( current.x - 1, current.y )){
                this.path.push( this.make_path_node( current.x - 1, current.y ) );
            }
            return;
        }
        if( current.go_up ){
            current.go_up = false;
            if(this.check_path_overrapping( current.x, current.y - 1 )){
                this.path.push( this.make_path_node( current.x , current.y - 1) );
            }
            return;
        }
        if( current.go_down ){
            current.go_down = false;
            if( this.check_path_overrapping( current.x, current.y + 1 ) ){
                this.path.push( this.make_path_node( current.x , current.y + 1) );
            }
            return;
        }

        // 行き止まりなら、現在地を通行不可に指定してから戻る
        this.ship_map[ current.x ][ current.y ] = 0;
        this.path.pop();
        return;
    }
    // パス内に指定座標と同じものが含まれてるなら、falseを返す
    check_path_overrapping( x1, y1 ){
        for( let node of this.path ){
            if( node.x == x1 && node.y == y1 ){
                return false;
            }
        }
        return true;
    }
    on_draw( canvas ){

        // マップの描画
        if( false ) {
            for( let x = 0 ; x < this.ship_map.length ; x++ ){
                for( let y = 0 ; y < this.ship_map[x].length ; y++ ){
                    if( this.ship_map[x][y] == 0 ){
                        canvas.fillStyle = 'rgba(250,100,100, 0.5)'
                    }
                    if( this.ship_map[x][y] == 1 ){
                        canvas.fillStyle = 'rgba(100,250,100, 0.5)'
                    }
                    if( x == this.start.x && y == this.start.y){
                        canvas.fillStyle = 'rgba(100,100,250, 0.5)'
                    }
                    if( x == this.goal.x && y == this.goal.y){
                        canvas.fillStyle = 'rgba(100,250,250, 0.5)'
                    }

                    canvas.save();
                    canvas.translate(
                        (-this.game.world.ship.ship_offset_x + x) * ShipBlock.BLOCK_SIZE,
                        (-this.game.world.ship.ship_offset_y + y) * ShipBlock.BLOCK_SIZE);
                    canvas.fillRect( -ShipBlock.BLOCK_RADIUS, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_SIZE, ShipBlock.BLOCK_SIZE );

                    canvas.restore()
                }
            }
        }
        // パスの描画
        if( true ){
            canvas.strokeStyle = 'rgb(200,200,200)'
            canvas.beginPath();
            canvas.moveTo( (-this.game.world.ship.ship_offset_x + this.start.x) * ShipBlock.BLOCK_SIZE,
                           (-this.game.world.ship.ship_offset_y + this.start.y) * ShipBlock.BLOCK_SIZE );
            for( let node of this.path ){
                canvas.lineTo( (-this.game.world.ship.ship_offset_x + node.x) * ShipBlock.BLOCK_SIZE,
                               (-this.game.world.ship.ship_offset_y + node.y) * ShipBlock.BLOCK_SIZE );
            }
            canvas.stroke();
        }
    }


}
