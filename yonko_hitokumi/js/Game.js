

class Template extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
}

class Game extends Object  {


    constructor(){
        super();
        this.name = 'text_holdem';
        this.version = '0.1';
        this.game = this;
    }

    init(){

        // ゲーム用の変数
        this.field = [];
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            this.field.push( [] );
            for (let x = 0; x < FIELD_WIDTH; x++) {
                this.field[y].push( 0 );
            }
        }

        //this.field[21][4] = 2;

        this.mino_x = 0;
        this.mino_y = 0;
        this.mino = new Mino( 1 );

        this.spawn_next_mino();
        
        this.CELL_COLOR_CLASS_LIST = [
            "cell_none","cell_J", "cell_L", "cell_S", "cell_Z", "cell_T", "cell_I", "cell_O"
        ]

        this.field_cell_div = [];
        let field_div = document.getElementById("field");
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            this.field_cell_div.push([]);
            for (let x = 0; x < FIELD_WIDTH; x++) {
                let new_cell = document.createElement("div");
                new_cell.classList.add("field_cell");
                field_div.appendChild(new_cell);
                this.field_cell_div[y].push( new_cell );
            }
        }

        this.input_controller = new InputController( this );


        this.input_controller.setup()
        this.interbal_handle = setInterval( this.on_update.bind(this), 40 )
    }

    is_mino_can_move_to( move_by_y, move_by_x, rotate ){
        for( let y = 0 ; y < 4 ; y++ ){
            for( let x = 0 ; x < 4 ; x++ ){
                if( this.mino.get_cell_with_rotate(y, x, rotate)){
                    // ミノ内のそれぞれのブロックについて
                    let checking_x = this.mino_x + x + move_by_x;
                    let checking_y = this.mino_y + y + move_by_y;
                    
                    if( checking_x < 0 ){
                        return false;
                    }
                    if( FIELD_WIDTH <= checking_x ){
                        return false;
                    }
                    if( checking_y < 0 ){
                        return false;
                    }
                    if( FIELD_HEIGHT <= checking_y ){
                        return false;
                    }                        
                    if( this.field[ checking_y ][ checking_x ] ){
                        // ブロックがあったら                        
                        return false;
                    }
                }
            }
        }
        // 動かせる
        return true;
    }
    check_line_clear(){
        for( let y = FIELD_HEIGHT - 1 ; 0 <= y ; y--){
            let filled = true;
            for( let x = 0 ; x < FIELD_WIDTH ; x++){
                if( this.field[y][x] ){

                } else {
                    // ブロックがなかったら中断
                    filled = false;
                    break;
                }
            }
            if( filled ){
                // ラインがそろっていたら
                // これより上の段を1段下にずらしてくる
                for( let y2 = y ; 1 <= y2 ; y2--){
                    for( let x2 = 0 ; x2 < FIELD_WIDTH ; x2++){
                        this.field[y2][x2] = this.field[y2-1][x2]                        
                    }
                }
                // 一番上の段を消す
                for( let x2 = 0 ; x2 < FIELD_WIDTH ; x2++){
                    this.field[0][x2] = 0;                        
                }
            }
        }
    }
    spawn_next_mino(){
        this.mino_x = 3;
        this.mino_y = 0;

        let next_mino = Math.floor(Math.random() * 7) + 1;
        this.mino = new Mino( next_mino );

    }
    lockdown_mino(){
        for( let y = 0 ; y < 4 ; y++ ){
            for( let x = 0 ; x < 4 ; x++ ){
                if( this.mino.get_cell(y, x)){
                    // ミノ内のそれぞれのブロックについて
                    // 地形に書き込む
                    this.field[ this.mino_y + y][ this.mino_x + x] = this.mino.mino_id;
                }
            }
        }
        // ライン消去
        this.check_line_clear();
        // 新しいミノを降らせる
        this.spawn_next_mino();
    }

    on_update(){
        this.input_controller.on_update( game );

        // ミノの操作
        if( this.input_controller.get_press_right()){
            if( this.is_mino_can_move_to(0, 1, 0) ){
                this.mino_x += 1;
            }
        }
        if( this.input_controller.get_press_left()){
            if( this.is_mino_can_move_to(0, -1, 0) ){
                this.mino_x -= 1;
            }
        }
        if( this.input_controller.get_press_up()){
            this.mino_y -= 1;
        }
        if( this.input_controller.get_down_down()){
            if( this.is_mino_can_move_to(1, 0, 0) ){
               this.mino_y += 1;
            } else {
               // ミノが地面にぶつかったら固定 
                this.lockdown_mino();
            }
        }
        if( this.input_controller.get_press_rotate_right() || this.input_controller.get_press_space() ||
            this.input_controller.get_press_enter()){
            if( this.is_mino_can_move_to(0, 0, 1) ){
                    this.mino.rotate(1);
            }
        }
        if( this.input_controller.get_press_rotate_left()){
            if( this.is_mino_can_move_to(0, 0, -1) ){
                this.mino.rotate(-1);
            }
        }

        // 画面の更新
        // すべてのフィールドからミノ色のクラスを取り除く
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            for (let x = 0; x < FIELD_WIDTH; x++) {
                this.field_cell_div[y][x].classList.remove( ...this.CELL_COLOR_CLASS_LIST );
            }
        }

        // 操作中のミノの描画
        for( let y = 0 ; y < 4 ; y++ ){
            for( let x = 0 ; x < 4 ; x++ ){
                if( this.mino.get_cell( y, x )){
                    this.field_cell_div[ this.mino_y + y ][ this.mino_x + x ].classList.add(
                        MINO_ID_TO_CLASS_NAME[ this.mino.mino_id ]
                    );
                }
            }
        }
        
        // 地形の描画
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            for (let x = 0; x < FIELD_WIDTH; x++) {
                if( 1 <= this.field[y][x] ){
                    this.field_cell_div[y][x].classList.add( MINO_ID_TO_CLASS_NAME[this.field[y][x]] );
                }
            }
        }
    }
}
