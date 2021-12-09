

export class Board {
    constructor( game ){
        this.game = game;

        this.board = []
        for(let g_x = 0 ; g_x < 3 ; g_x++){
            this.board[g_x] = [];
            for(let g_y = 0 ; g_y < 3 ; g_y++){
                this.board[g_x][g_y] = [];
                for(let lo_x = 0 ; lo_x < 3 ; lo_x++){
                    this.board[g_x][g_y][lo_x] = [];
                    for(let lo_y = 0 ; lo_y < 3 ; lo_y++){
                        this.board[g_x][g_y][lo_x][lo_y] = null;
                    }
                }
            }
        }
        this.global_board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]

        // 1ならマル、2ならバツ
        this.teban = 1;
        this.turn_count = 1;

        this.select_state = 0;
        this.selected_x = 0;
        this.selected_y = 0;
        this.kari_mark_x = 0;
        this.kari_mark_y = 0;


        this.is_selecting_loop = false;
        this.is_overrapping_loop = false;
        this.loop_select_state = 0;
    }
    on_click(){

        let local_x = this.game.input_controller.mouse_x - 175;
        let local_y = this.game.input_controller.mouse_y - 75;
        let cell_x = Math.floor( local_x / 150 );
        let cell_y = Math.floor( local_y / 150 );
        if( 0 <= cell_x && cell_x < 3 && 0 <= cell_y && cell_y < 3){
            console.log(cell_x, cell_y)
            if( this.global_board[ cell_x ][ cell_y ] == null){
                // グローバルボードがまだ未確定の位置
                if( this.is_selecting_loop ){
                    // ループ発生時の手番
                    let cell_lo_x = Math.floor( (local_x % 150) / 50 );
                    let cell_lo_y = Math.floor( (local_y % 150) / 50 );
                    console.log('local', cell_lo_x, cell_lo_y);
                    // 置いた場所から連鎖的に仮確定をする
                    if( this.board[ cell_x ][ cell_y ][ cell_lo_x ][ cell_lo_y ] != null){
                        if( this.board[ cell_x ][ cell_y ][ cell_lo_x ][ cell_lo_y ].in_loop ){
                            // ループ上の量子マークを選べたら
                            // 選んだ量子マークの対を劣勢にして、連鎖確定を呼ぶ
                            this.confirm_state_reset();
                            this.board[ cell_lo_x ][ cell_lo_y ][ cell_x ][ cell_y ].confirm_state = -1;
                            this.confirm_chain( cell_x, cell_y, cell_lo_x, cell_lo_y);

                            if( this.is_overrapping_loop ){
                                // 重複ループの場合、選ばなかったほうにも連鎖確定を呼び、それをもう一度劣勢に設定する
                                this.confirm_chain( cell_lo_x, cell_lo_y, cell_x, cell_y );
                                this.board[ cell_lo_x ][ cell_lo_y ][ cell_x ][ cell_y ].confirm_state = -1;
                                this.is_overrap_g_x = cell_lo_x;
                                this.is_overrap_g_y = cell_lo_y;
                                this.is_overrap_lo_x = cell_x;
                                this.is_overrap_lo_y = cell_y;
                            }
                            this.loop_select_state = 1;
                        }
                    }

                } else {
                    // 通常の手番
                    if( this.select_state == 0 || this.select_state == 2){
                        // 何も選ばれてないなら、選んだマスを赤枠にする
                        this.select_state = 1;
                        this.selected_x = cell_x;
                        this.selected_y = cell_y;
                    } else if( this.select_state == 1) {
                        // 赤枠があるなら、
                        if( cell_x == this.selected_x && cell_y == this.selected_y ){
                            // 赤枠と同じところなら、赤枠をキャンセル
                            this.select_state = 0;
                        } else {
                            // 別の場所なら、仮置き
                            this.select_state = 2;
                            this.kari_mark_x = cell_x;
                            this.kari_mark_y = cell_y;
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }
    okey_button(){
        console.log('okey!')
        if( this.is_selecting_loop ){
            if( this.loop_select_state == 1 ){
                // 量子マークを確定し、グローバルボードに書き込む
                this.confirm_quantum();

                // 重複だった場合は、
                if( this.is_overrapping_loop ){
                    let opponent_teban = 1;
                    if( this.teban == 1){
                        opponent_teban = 2;
                    }
                    this.global_board[this.is_overrap_g_x][this.is_overrap_g_y] = {mark: opponent_teban, count: this.turn_count-1};
                }
                this.is_overrapping_loop = false;
                this.loop_select_state = 0;
                this.is_selecting_loop = false;
            }
        } else {
            if( this.select_state == 2 ){

                if( this.board[ this.selected_x ][ this.selected_y ][ this.kari_mark_x ][ this.kari_mark_y ] != null ){
                    // 既に量子マークがある組み合わせの位置に置こうとした場合
                    this.board[ this.selected_x ][ this.selected_y ][ this.kari_mark_x ][ this.kari_mark_y ].in_loop = true;
                    this.board[ this.kari_mark_x ][ this.kari_mark_y ][ this.selected_x ][ this.selected_y ].in_loop = true;

                    this.is_overrapping_loop = true;
                    this.is_selecting_loop = true;
                    this.loop_select_state = 0;
                    this.loop_path = null;
                } else {
                    // それ以外の通常の配置
                    // 量子マークの配置を確定する
                    let new_mark = {mark: this.teban, count: this.turn_count, in_loop: false, confirm_state: 0}
                    this.board[ this.selected_x ][ this.selected_y ][ this.kari_mark_x ][ this.kari_mark_y ] = new_mark;
                    new_mark = {mark: this.teban, count: this.turn_count, in_loop: false, confirm_state: 0}
                    this.board[ this.kari_mark_x ][ this.kari_mark_y ][ this.selected_x ][ this.selected_y ] = new_mark;

                    // ループチェック
                    let path = this.loop_check();
                    console.log(path);
                    if( path != null ){
                        this.is_selecting_loop = true;
                        this.loop_select_state = 0;
                        this.loop_path = path;

                        // ループ経路上の量子マークに印をつける
                        for(let node of this.loop_path ){
                            this.board[node.g_x][node.g_y][node.lo_x][node.lo_y].in_loop = true;
                            this.board[node.lo_x][node.lo_y][node.g_x][node.g_y].in_loop = true;
                        }
                    }
                }
                // 手番を相手に渡す
                if( this.teban == 1){
                    this.teban = 2;
                } else {
                    this.teban = 1;
                }

                this.turn_count += 1;
                this.select_state = 0;
            }
        }
    }

    confirm_quantum(){
        // ボード上の優勢量子マークを確定させる
        for(let g_x = 0 ; g_x < 3 ; g_x++){
            for(let g_y = 0 ; g_y < 3 ; g_y++){
                for(let lo_x = 0 ; lo_x < 3 ; lo_x++){
                    for(let lo_y = 0 ; lo_y < 3 ; lo_y++){
                        if( this.board[g_x][g_y][lo_x][lo_y] != null){
                            if(this.board[g_x][g_y][lo_x][lo_y].confirm_state == 1){
                                this.global_board[g_x][g_y] = this.board[g_x][g_y][lo_x][lo_y];
                                this.board[g_x][g_y][lo_x][lo_y] = null;
                            } else if(this.board[g_x][g_y][lo_x][lo_y].confirm_state == -1){
                                this.board[g_x][g_y][lo_x][lo_y] = null;
                            }
                        }
                    }
                }
            }
        }
    }
    confirm_chain( g_x, g_y, lo_x, lo_y){
        // 指定された量子マークを優勢にする
        this.board[g_x][g_y][lo_x][lo_y].confirm_state = 1;
        for( let x = 0 ; x < 3 ; x++){
            for( let y = 0 ; y < 3 ; y++){
                // 同枠内の量子マークを劣勢にして、その相方に対して再帰呼び出し
                if( lo_x == x && lo_y == y ){
                    // 自身は無視する
                    continue;
                }
                if( this.board[g_x][g_y][x][y] != null ){
                    if( this.board[g_x][g_y][x][y].confirm_state == 0 ){
                        // 未確定の量子マーク
                        this.board[g_x][g_y][x][y].confirm_state = -1;
                        this.confirm_chain( x, y, g_x, g_y );
                    }
                }
            }
        }
    }
    confirm_state_reset(){
        for(let g_x = 0 ; g_x < 3 ; g_x++){
            for(let g_y = 0 ; g_y < 3 ; g_y++){
                for(let lo_x = 0 ; lo_x < 3 ; lo_x++){
                    for(let lo_y = 0 ; lo_y < 3 ; lo_y++){
                        if( this.board[g_x][g_y][lo_x][lo_y] != null){
                            this.board[g_x][g_y][lo_x][lo_y].confirm_state = 0;
                        }
                    }
                }
            }
        }
    }
    loop_check(){
        // 量子マークのループを探す
        for(let g_x = 0 ; g_x < 3 ; g_x++){
            for(let g_y = 0 ; g_y < 3 ; g_y++){
                for(let lo_x = 0 ; lo_x < 3 ; lo_x++){
                    for(let lo_y = 0 ; lo_y < 3 ; lo_y++){
                        let path = this.loop_finder( [], g_x, g_y, lo_x, lo_y );
                        if (path != null){
                            return path;
                        }
                    }
                }
            }
        }
        return null;
    }
    loop_finder( path , g_x, g_y, lo_x, lo_y){
        if( this.board[g_x][g_y][lo_x][lo_y] != null ){
            let this_node = {g_x:g_x, g_y:g_y, lo_x:lo_x, lo_y:lo_y}

            if( 1 <= path.length){
                if( path[0].g_x == this_node.g_x && path[0].g_y == this_node.g_y &&
                    path[0].lo_x == this_node.lo_x && path[0].lo_y == this_node.lo_y ){
                    // 経路の始点に戻ってきたなら、純粋なループ
                    return path;
                }
            }

            // 今までの経路に自身が含まれてるかをチェック
            for( let node of path ){
                if( node.g_x == this_node.g_x && node.g_y == this_node.g_y &&
                    node.lo_x == this_node.lo_x && node.lo_y == this_node.lo_y
                ){
                    // 余分な経路を含むループなので却下
                    return null;
                }
            }
            path.push( this_node )
            for(let next_lo_x = 0 ; next_lo_x < 3 ; next_lo_x++){
                for(let next_lo_y = 0 ; next_lo_y < 3 ; next_lo_y++){
                    if( next_lo_x == g_x && next_lo_y == g_y ){
                        // 行った道を戻ってくる経路はパス
                        continue;
                    }
                    let next_path = JSON.parse(JSON.stringify(path));
                    let r_path = this.loop_finder( next_path, lo_x, lo_y, next_lo_x, next_lo_y )
                    if( r_path != null ){
                        return r_path;
                    }
                }
            }
        }
        return null;
    }

    draw_line( canvas , x1, y1, x2, y2){
        canvas.beginPath();
        canvas.moveTo( x1, y1);
        canvas.lineTo( x2, y2);
        canvas.stroke();
    }
    drawBatsu( canvas, x, y, size, text, confirm ){
        canvas.lineWidth = 12;
        if( confirm == -1){
            canvas.strokeStyle = 'rgb(30,30,60)';
        } else {
            canvas.strokeStyle = 'rgb(100,150,250)';
        }
        this.draw_line( canvas, x, y, x + size, y + size );
        this.draw_line( canvas, x + size, y, x, y + size );
        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.fillText( text, x + size * 0.5, y + size * 0.5 );
    }
    drawMaru( canvas, x, y, size, text, confirm){
        canvas.lineWidth = 10;
        if( confirm == -1){
            canvas.strokeStyle = 'rgb(80,30,30)';
        } else {
            canvas.strokeStyle = 'rgb(250,100,50)';
        }
        canvas.beginPath();
        canvas.arc( x + size * 0.5, y + size * 0.5 , size * 0.5, 0, Math.PI*2);
        canvas.fillStyle = 'rgb(250,250,250)';
        canvas.fillText( text, x + size * 0.5, y + size * 0.5 );
        canvas.stroke();
    }
    drawMark(canvas, x, y, size, mark, text, confirm){
        if( mark == 1){
            this.drawMaru( canvas, x, y, size, text, confirm );
        } else {
            this.drawBatsu( canvas, x, y, size, text, confirm );
        }
    }
    on_draw( canvas ){
        canvas.save();
        canvas.translate(175,75);

        canvas.lineWidth = 3;
        canvas.strokeStyle = 'rgb(150,150,150)';

        this.draw_line(canvas, 150, 0, 150, 450);
        this.draw_line(canvas, 300, 0, 300, 450);

        this.draw_line(canvas,   0, 150, 450, 150);
        this.draw_line(canvas,   0, 300, 450, 300);
        canvas.strokeRect(0,0,450,450)

        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.font = 'bold 20px monospace';
        canvas.textAlign = 'center'
        canvas.textBaseline = 'middle'


        for(let g_y = 0 ; g_y < 3 ; g_y++){
            for(let g_x = 0 ; g_x < 3 ; g_x++){
                // グローバルボードの処理

                // グローバルボードに確定済みのマークがあるなら、それを大きく表示する
                if( this.global_board[g_x][g_y] != null){
                    this.drawMark( canvas, g_x * 150 + 10, g_y * 150 + 10, 130, this.global_board[g_x][g_y].mark, this.global_board[g_x][g_y].count, 1 );
                    continue;
                }
                // 選択の枠線
                if( g_x == this.selected_x && g_y == this.selected_y ){
                    if( this.select_state == 1 ){
                        canvas.lineWidth = 3;
                        canvas.strokeStyle = 'rgb(250,0,0)';
                        canvas.strokeRect( g_x * 150, g_y * 150, 150, 150 )
                    }
                }


                // ローカルボードの処理
                for(let lo_y = 0 ; lo_y < 3 ; lo_y++){
                    for(let lo_x = 0 ; lo_x < 3 ; lo_x++){
                        let draw_x = g_x * 150 + lo_x * 50 + 5;
                        let draw_y = g_y * 150 + lo_y * 50 + 5;
                        //this.drawBatsu( canvas, draw_x , draw_y, 40, 7 );

                        // 既存の量子マーク
                        if( this.board[g_x][g_y][lo_x][lo_y] != null ){
                            this.drawMark( canvas, draw_x , draw_y, 40, this.board[g_x][g_y][lo_x][lo_y].mark, this.board[g_x][g_y][lo_x][lo_y].count, this.board[g_x][g_y][lo_x][lo_y].confirm_state );

                            // ループ経路を強調
                            if( this.is_selecting_loop ) {
                                if( this.board[g_x][g_y][lo_x][lo_y].in_loop ){
                                    canvas.lineWidth = 3;
                                    canvas.strokeStyle = 'rgb(0,250,0)';
                                    canvas.strokeRect( draw_x-5, draw_y-5, 50, 50 );
                                }
                            }
                        }


                        // 仮置き量子マーク
                        if( this.select_state == 2 ){
                            if( (this.selected_x == g_x && this.selected_y == g_y &&
                                this.kari_mark_x == lo_x && this.kari_mark_y == lo_y) ||
                                (this.kari_mark_x == g_x && this.kari_mark_y == g_y &&
                                this.selected_x == lo_x && this.selected_y == lo_y)
                            ){
                                if( 10 < this.game.anime_count){
                                    this.drawMark( canvas, draw_x , draw_y, 40, this.teban, this.turn_count );
                                }
                            }
                        }
                        // 重複ループ時の仮置き
                        if( this.is_overrapping_loop ){
                            if( (this.selected_x == g_x && this.selected_y == g_y &&
                                this.kari_mark_x == lo_x && this.kari_mark_y == lo_y) ||
                                (this.kari_mark_x == g_x && this.kari_mark_y == g_y &&
                                this.selected_x == lo_x && this.selected_y == lo_y)
                            ){
                                let opponent_teban = 1;
                                if( this.teban == 1){
                                    opponent_teban = 2;
                                }
                                let overlap_confirm_state = 1;
                                if( this.board[g_x][g_y][lo_x][lo_y].confirm_state == 1){
                                    overlap_confirm_state = -1
                                }
                                if( 10 < this.game.anime_count){

                                    this.drawMark( canvas, draw_x , draw_y, 40, opponent_teban, this.turn_count - 1, overlap_confirm_state );
                                }
                            }
                        }



                    }
                }

            }
        }
        // 手番状況を表示する
        canvas.fillStyle = 'rgb(250,250,250)';
        canvas.font = 'bold 32px monospace';
        canvas.textAlign = 'center'
        canvas.textBaseline = 'top'
        if( this.is_selecting_loop ){

            if( this.teban == 1 ){
                canvas.fillStyle = 'rgb(250,100,100)';
                canvas.fillText('ループ発生！○プレイヤーが始点を決めてください。' ,225, 460)
            } else {
                canvas.fillStyle = 'rgb(100,100,250)';
                canvas.fillText('ループ発生！×プレイヤーが始点を決めてください。' ,225, 460)
            }

        } else {
            if( this.teban == 1 ){
                canvas.fillStyle = 'rgb(250,100,100)';
                canvas.fillText('○の手番です。2箇所に○を置いてください。' ,225, 460)
            } else {
                canvas.fillStyle = 'rgb(100,100,250)';
                canvas.fillText('×の手番です。2箇所に×を置いてください。' ,225, 460)
            }
        }


        canvas.restore();
    }
}
