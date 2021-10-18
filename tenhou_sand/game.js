
import {Tile} from './tile.js';

export class Game {
    constructor(){
        this.name = 'Tenhou Sand'
        this.version = '0.4'



        this.tile_list = []
        this.TILE_NUM = 136

        this.canvas = document.getElementById('my_canvas')
        this.canvas2d = this.canvas.getContext('2d')

        this.SCREEN_WIDTH = 480
        this.SCREEN_HEIGHT = 640
        this.TILE_SIZE = 20

        this.FIELD_WIDTH  = this.SCREEN_WIDTH  / this.TILE_SIZE
        this.FIELD_HEIGHT = this.SCREEN_HEIGHT / this.TILE_SIZE

        this.is_wall_placing = true;
        this.is_mouse_holding = false;

        this.hand_hold_time = 5;
        this.hand_release_time = 5;
        this.hand = [null,null,null,null,null,null,null,null,null,null,null,null,null,null]
        this.shanten_text = ''
        this.hand_lock = false

        this.is_paused = false;

        this.setting_lock_on_richi = false;
        this.setting_lock_on_tenhou = false;
        this.setting_lock_not_allow_seven_pairs = false;
        this.setting_slow_mode = false;
        this.setting_sort_hand = false;

        this.field = []
        for(let y = 0 ; y < this.FIELD_HEIGHT ; y++){
            this.field[y] = []
            for(let x = 0 ; x < this.FIELD_WIDTH ; x++){
                this.field[y][x] = null
            }
        }

        this.place_136()
        this.shuffle_field()

        this.field_wall = []
        for(let y = 0 ; y < this.FIELD_HEIGHT ; y++){
            this.field_wall[y] = []
            for(let x = 0 ; x < this.FIELD_WIDTH ; x++){

                this.field_wall[y][x] = false
                if( x == 0 || x + 1 ==  this.FIELD_WIDTH){
                    this.field_wall[y][x] = true
                }
            }
        }
        this.reset_wall()

        this.mouse_x = 100
        this.mouse_y = 100

    }

    on_mouse_down( event ){
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y

        // クリック箇所に壁を生成する
        let field_x = Math.floor(this.mouse_x / this.TILE_SIZE)
        let field_y = Math.floor(this.mouse_y / this.TILE_SIZE)
        if( 0 < field_x && field_x < 23 ){
            // TODO 範囲外
            this.is_wall_placing = !this.field_wall[field_y][field_x]
            this.field_wall[field_y][field_x] = this.is_wall_placing;
            this.is_mouse_holding = true;
        }
    }

    on_mouse_up( event ){
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y

        this.is_mouse_holding = false;
    }
    on_mouse_move( event ) {
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y

        if( this.is_mouse_holding ){
            let field_x = Math.floor(this.mouse_x / this.TILE_SIZE)
            let field_y = Math.floor(this.mouse_y / this.TILE_SIZE)

            if( 0 < field_x && field_x < 23 ){
                // TODO 範囲外
                this.field_wall[field_y][field_x] = this.is_wall_placing;
            }
        }
    }

    reset(){
        console.log(this.name, this.version)
    }
    start(){
        setInterval( this.on_update.bind(this), 20 )
        this.canvas.onmousedown = this.on_mouse_down.bind(this)
        this.canvas.onmouseup = this.on_mouse_up.bind(this)
        this.canvas.onmousemove = this.on_mouse_move.bind(this)
    }

    reset_wall(){
        this.clear_wall()

        this.field_wall[24][1] = true
        this.field_wall[25][2] = true
        this.field_wall[26][3] = true
        this.field_wall[27][4] = true
        this.field_wall[28][5] = true
        this.field_wall[29][6] = true
//        this.field_wall[29][7] = true
//        this.field_wall[29][8] = true
        this.field_wall[28][9] = true
        this.field_wall[27][10] = true
        this.field_wall[26][11] = true
        this.field_wall[26][12] = true
        this.field_wall[27][13] = true
        this.field_wall[28][14] = true
//        this.field_wall[29][15] = true
//        this.field_wall[29][16] = true
        this.field_wall[29][17] = true
        this.field_wall[28][18] = true
        this.field_wall[27][19] = true
        this.field_wall[26][20] = true
        this.field_wall[25][21] = true
        this.field_wall[24][22] = true

        for(let x = 1 ; x < 22 ; x++){
            for(let y = 4 ; y < 15 ; y++){
                if( Math.random() < 0.15){
                    this.field_wall[y][x] = true
                }
            }
        }
    }
    clear_wall(){
        for(let y = 0 ; y < this.FIELD_HEIGHT ; y++){
            for(let x = 0 ; x < this.FIELD_WIDTH ; x++){
                this.field_wall[y][x] = false
                if( x == 0 || x + 1 ==  this.FIELD_WIDTH){
                    this.field_wall[y][x] = true
                }
            }
        }
    }

    place_136(){

        this.hand_hold_time = 0;
        this.hand_release_time = 250;

        // 麻雀牌の初期配置
        for(let number = 1 ; number <= 9 ; number++ ){
            for(let y = 1 ; y <= 4 ; y++){
                this.field[ y ][ 1 + number ] = new Tile( 3, number, false )
            }
        }
        for(let number = 1 ; number <= 9 ; number++ ){
            for(let y = 1 ; y <= 4 ; y++){
                this.field[ y ][ 11 + number ] = new Tile( 2, number, false )
            }
        }

        for(let number = 1 ; number <= 9 ; number++ ){
            for(let y = 1 ; y <= 4 ; y++){
                this.field[ 5 + y ][ 11 + number ] = new Tile( 1, number, false )
            }
        }

        for(let number = 1 ; number <= 7 ; number++ ){
            for(let y = 1 ; y <= 4 ; y++){
                this.field[ 5 + y ][ 1 + number ] = new Tile( 4, number, false )
            }
        }
    }

    shuffle_field(){

        for(let x = 1 ; x < this.FIELD_WIDTH - 1 ; x++){
            for(let y = 0 ; y < this.FIELD_HEIGHT ; y++){
                let random_x = Math.floor( Math.random() * (this.FIELD_WIDTH - 4) ) + 2
                let random_y = Math.floor( Math.random() * (this.FIELD_HEIGHT - 4) ) + 2
                let temp = this.field[y][x]
                this.field[y][x] = this.field[ random_y ][ random_x ]
                this.field[ random_y ][ random_x ] = temp
            }
        }
    }
    place_manzu(){
        for(let number = 1 ; number <= 9 ; number++ ){
            this.field[ 1 ][ 1 + number ] = new Tile( 1, number, false )
        }
    }
    place_ton(){
        this.field[ 5 ][ 2 ] = new Tile( 4, 1, false )
    }
    place_red_five_pin(){
        let red_five = new Tile( 2, 5, true )
        red_five.is_red = true;
        this.field[ 1 ][ 16 ] = red_five
    }
    place_pei10(){
        for(let x = 1 ; x <= 14 ; x++){
            this.field[ 5 ][ x+2 ] = new Tile( 4, 4, false )
        }
    }
    clear_pai(){
        for(let y = 0 ; y < this.FIELD_HEIGHT ; y++){
            for(let x = 0 ; x < this.FIELD_WIDTH ; x++){
                this.field[y][x] = null
            }
        }
    }

    test(){
        console.log('test!')

        let test_hand = []
        test_hand[0] =  new Tile( 1, 1, false )
        test_hand[1] =  new Tile( 1, 1, false )
        test_hand[2] =  new Tile( 1, 1, false )
        test_hand[3] =  new Tile( 1, 2, false )
        test_hand[4] =  new Tile( 1, 3, false )
        test_hand[5] =  new Tile( 1, 4, false )
        test_hand[6] =  new Tile( 1, 5, false )
        test_hand[7] =  new Tile( 1, 6, false )
        test_hand[8] =  new Tile( 1, 7, false )
        test_hand[9] =  new Tile( 1, 8, false )
        test_hand[10] = new Tile( 1, 9, false )
        test_hand[11] = new Tile( 1, 9, false )
        test_hand[12] = new Tile( 1, 9, false )
        test_hand[13] = new Tile( 2, 7, false )


        console.log( this.hand_to_string( test_hand ) )

        console.log( this.calc_hand_shanten( test_hand ) )

    }
    hand_to_string( c_hand ) {
        let str = '';
        for( let i = 0 ; i < c_hand.length ; i++ ){
            if( c_hand[ i ] == null ){
                str += 'x'
            } else {
                str += c_hand[ i ].text
            }
        }
        return str
    }

    search_next_pai_index( c_hand, c_index ){
        c_index += 1
        while( c_index < c_hand.length ) {
            if( c_hand[ c_index ] != null ){
                return c_index
            }
            c_index += 1
        }
        return -1
    }
    search_next_shuntsu_index( c_hand, c_index ){
        let target_tile = c_hand[ c_index ]
        c_index += 1
        while( c_index < c_hand.length ) {
            if( c_hand[ c_index ] != null ){
                if( target_tile.color != c_hand[ c_index ].color ) {
                    // 違う色が見つかったら終了
                    return -1
                }
                if( target_tile.number + 1 == c_hand[ c_index ].number ) {
                    // 色が同じで、数が1多いシュンツ候補が見つかった
                    return c_index
                }
            }
            c_index += 1
        }
        // 配列の最後に到達した
        return -1
    }

    search_next_kanchan_index( c_hand, c_index ){
        let target_tile = c_hand[ c_index ]
        c_index += 1
        while( c_index < c_hand.length ) {
            if( c_hand[ c_index ] != null ){
                if( target_tile.color != c_hand[ c_index ].color ) {
                    // 違う色が見つかったら終了
                    return -1
                }
                if( target_tile.number + 2 == c_hand[ c_index ].number ) {
                    // 色が同じで、数が2多いカンチャン候補が見つかった
                    return c_index
                }
            }
            c_index += 1
        }
        // 配列の最後に到達した
        return -1
    }

    search_trio( c_hand, c_trios_num, can_make_tatu, can_ignore ){

        // 面子を探索する
        //console.log( c_trios_num, this.hand_to_string( c_hand ) )

        // 1番左の牌を見つける
        let left_pai = this.search_next_pai_index( c_hand, -1 )

        if( left_pai == -1) {
            // 手牌がない
            return c_trios_num
        }

        // アンコになるかどうか
        let trios_num_with_anko = c_trios_num
        let anko_2 = this.search_next_pai_index( c_hand, left_pai )
        if( anko_2 != -1 ){
            let anko_3 = this.search_next_pai_index( c_hand, anko_2 )
            if(anko_3 != -1){
                if( c_hand[ left_pai ].equals( c_hand[anko_2] ) && c_hand[ left_pai ].equals( c_hand[anko_3] ) ){
                    // アンコ成立
                    let next_hand = c_hand.concat()
                    next_hand[ left_pai ] = null
                    next_hand[ anko_2 ] = null
                    next_hand[ anko_3 ] = null
                    trios_num_with_anko = this.search_trio( next_hand, c_trios_num + 1, can_make_tatu, can_ignore)
                }
            }
        }

        // シュンツになるかどうか
        let trios_num_with_shuntsu = c_trios_num
        if( c_hand[ left_pai ].color != 4 ){
            // 字牌はシュンツにならない
            let shuntsu_2 = this.search_next_shuntsu_index( c_hand, left_pai )
            if( shuntsu_2 != -1){
                let shuntsu_3 = this.search_next_shuntsu_index( c_hand, shuntsu_2 )
                if( shuntsu_3 != -1){
                    // シュンツ成立
                    let next_hand = c_hand.concat()
                    next_hand[ left_pai ] = null
                    next_hand[ shuntsu_2 ] = null
                    next_hand[ shuntsu_3 ] = null
                    trios_num_with_shuntsu = this.search_trio( next_hand, c_trios_num + 1, can_make_tatu, can_ignore)
                }
            }
        }

        // 聴牌判定のための雑事

        // 既にターツ候補が決まってるなら作れない
        let trios_num_with_tatsu = c_trios_num
        if( can_make_tatu ){
            // りゃんめん、ぺんちゃん待ちのターツ
            let trios_num_with_ryanmen = c_trios_num
            if( c_hand[ left_pai ].color != 4 ){
                // 字牌はりゃんめんにならない
                let ryanmen_2 = this.search_next_shuntsu_index( c_hand, left_pai )
                if( ryanmen_2 != -1){
                    // りゃんめん成立
                    let next_hand = c_hand.concat()
                    next_hand[ left_pai ] = null
                    next_hand[ ryanmen_2 ] = null
                    trios_num_with_ryanmen = this.search_trio( next_hand, c_trios_num + 0.3, false, can_ignore)
                }
            }

            // かんちゃん待ちのターツ
            let trios_num_with_kanchan = c_trios_num
            if( c_hand[ left_pai ].color != 4 ){
                // 字牌はりゃんめんにならない
                let kanchan_2 = this.search_next_kanchan_index( c_hand, left_pai )
                if( kanchan_2 != -1){
                    // りゃんめん成立
                    let next_hand = c_hand.concat()
                    next_hand[ left_pai ] = null
                    next_hand[ kanchan_2 ] = null
                    trios_num_with_kanchan = this.search_trio( next_hand, c_trios_num + 0.2, false, can_ignore)
                }
            }

            // トイツのターツ
            let trios_num_with_toitsu = c_trios_num
            let toitsu_2 = this.search_next_pai_index( c_hand, left_pai )
            if( toitsu_2 != -1 ){
                if( c_hand[ left_pai ].equals( c_hand[ toitsu_2 ] )){
                    let next_hand = c_hand.concat()
                    next_hand[ left_pai ] = null
                    next_hand[ toitsu_2 ] = null
                    trios_num_with_toitsu = this.search_trio( next_hand, c_trios_num + 0.1, false, can_ignore)
                }
            }
            trios_num_with_tatsu = Math.max( trios_num_with_ryanmen, trios_num_with_kanchan, trios_num_with_toitsu)
        }

        // 左端の牌を使わない場合、既に無視した牌があるなら無視できない
        let trios_num_with_no_trio = c_trios_num
        if( can_ignore ){
            let next_hand = c_hand.concat()
            next_hand[ left_pai ] = null
            trios_num_with_no_trio = this.search_trio( next_hand, c_trios_num, can_make_tatu, false )
        }

        // 成立メンツ数が最も大きかった探索結果を返す
        return Math.max( trios_num_with_anko, trios_num_with_shuntsu, trios_num_with_no_trio, trios_num_with_tatsu)
    }

    calc_hand_shanten( c_hand ){
        // 雀頭候補を総当りする

        let max_trios_num = 0
        for( let jantou1 = 0 ; jantou1 <= 12 ; jantou1++){
            if( c_hand[ jantou1 ] == null ){
                continue;
            }
            if( c_hand[ jantou1 ].equals( c_hand[ jantou1 + 1 ]) ){
                if( 1 <= jantou1 && c_hand[ jantou1 - 1 ] != null && c_hand[ jantou1 ].equals( c_hand[ jantou1 - 1 ])){
                    continue;
                }
                // 次の牌が等価で、前の牌が等価でない場合、雀頭の1つ目になる
                // 前の牌が等価だと、同じ牌が3個以上並んでいた時に同じ候補を探索しないため
                let c_hand_without_jantou = c_hand.concat()
                c_hand_without_jantou[ jantou1 ] = null
                c_hand_without_jantou[ jantou1 + 1 ] = null
                let trios_num = this.search_trio( c_hand_without_jantou, 0, true, true )
                max_trios_num = Math.max( trios_num, max_trios_num )
                //console.log( '雀頭', trios_num, this.hand_to_string( c_hand_without_jantou ) )
                continue;
            }
        }
        if( max_trios_num == 4) {
            return '天和';
        }
        if( max_trios_num > 3) {
            return 'ダブル立直';
        }

        // 雀頭が無い場合
        let trios_num_without_jantou = this.search_trio( c_hand, 0, false, false )
        if( trios_num_without_jantou == 4) {
            return 'ダブル立直(単騎待ち)';
        }

        // 七対子チェック
        let pair_num = 0
        for(let i = 0 ; i < c_hand.length - 1 ; i++){
            if( c_hand[ i ].equals( c_hand[ i + 1 ])){
                pair_num += 1
                while( i < c_hand.length - 1 && c_hand[ i ].equals( c_hand[ i + 1 ]) ){
                    i += 1
                }
            }
        }
        if( pair_num == 7 ){
            return '天和(七対子)'
        }
        if( pair_num == 6 ){
            return 'ダブル立直(七対子)'
        }
        // console.log('対子カウント',pair_num)
        //console.log( trios_num_without_jantou, this.hand_to_string( c_hand ) )
        return null;
    }

    fall_process(x, y){
        // 一番下の場合
        if( Math.random() < 0.1){
        } else if( y == this.FIELD_HEIGHT - 1){
            // 同列一番上に牌がない場合は一番上にワープする
            if(this.field[0][x] == null){
                this.field[0][x] = this.field[y][x]
                this.field[y][x] = null
            }
        } else if( this.field_wall[y+1][x] == false && this.field[y+1][x] == null ){
             // 下に何もなかったら1つ下に移動
            this.field[y+1][x] = this.field[y][x]
            this.field[y][x] = null
        //}
        // else if( 0 < y && this.field_wall[y-1][x] == false && this.field[y-1][x] == null && Math.random() < 0.5) {
            // 上に何もない場合は確率で動かない
        } else if( (this.field_wall[y][x-1] == true || this.field[y][x-1] != null)
        　　　　　&& (this.field_wall[y][x+1] == false && this.field[y][x+1] == null) ){
            // その逆パターン
            if(Math.random() < 0.9){
                this.field[y][x+1] = this.field[y][x]
                this.field[y][x] = null
            }
        } else if( (this.field_wall[y][x+1] == true || this.field[y][x+1] != null)
        　　　　　&& (this.field_wall[y][x-1] == false && this.field[y][x-1] == null) ){
            // 右に障害があって左にないなら左に移動
            if(Math.random() < 0.9){
                this.field[y][x-1] = this.field[y][x]
                this.field[y][x] = null
            }
        } else if( (this.field_wall[y][x-1] == false && this.field[y][x-1] == null)
        　　　　　&& (this.field_wall[y][x+1] == false && this.field[y][x+1] == null) ){
            // 両側に障害がないなら、左右ランダムに動く
            if( Math.random() < 0.5){
                this.field[y][x-1] = this.field[y][x]
                this.field[y][x] = null
            } else {
                this.field[y][x+1] = this.field[y][x]
                this.field[y][x] = null
            }
        }
    }

    on_update(){

        // 手牌受け皿の処理
        if( this.is_paused ){
            // ポーズ中
        } else {
            if( 0 < this.hand_hold_time || this.hand_lock ){
                this.hand_hold_time -= 1

                this.field_wall[19][4] = true
                this.field_wall[20][4] = true

                this.field_wall[20][5] = true
                this.field_wall[20][6] = true
                this.field_wall[20][7] = true
                this.field_wall[20][8] = true
                this.field_wall[20][9] = true
                this.field_wall[20][10] = true
                this.field_wall[20][11] = true
                this.field_wall[20][12] = true
                this.field_wall[20][13] = true
                this.field_wall[20][14] = true
                this.field_wall[20][15] = true
                this.field_wall[20][16] = true
                this.field_wall[20][17] = true
                this.field_wall[20][18] = true

                this.field_wall[19][19] = true
                this.field_wall[20][19] = true

            } else if( 0 < this.hand_release_time ){
                // 開放残り時間を減らす
                this.hand_release_time -= 1

                if( 30 < this.hand_release_time){
                    this.shanten_text = '[洗牌中...]'
                }

                // 手牌受け皿を開放する
                this.field_wall[20][5] = false
                this.field_wall[20][6] = false
                this.field_wall[20][7] = false
                this.field_wall[20][8] = false
                this.field_wall[20][9] = false
                this.field_wall[20][10] = false
                this.field_wall[20][11] = false
                this.field_wall[20][12] = false
                this.field_wall[20][13] = false
                this.field_wall[20][14] = false
                this.field_wall[20][15] = false
                this.field_wall[20][16] = false
                this.field_wall[20][17] = false
                this.field_wall[20][18] = false

            } else {
                // 開放時間ではない場合

                // フィールド上に手牌受け皿を生成する

                this.field_wall[19][4] = true
                this.field_wall[20][4] = true

                this.field_wall[20][5] = true
                this.field_wall[20][6] = true
                this.field_wall[20][7] = true
                this.field_wall[20][8] = true
                this.field_wall[20][9] = true
                this.field_wall[20][10] = true
                this.field_wall[20][11] = true
                this.field_wall[20][12] = true
                this.field_wall[20][13] = true
                this.field_wall[20][14] = true
                this.field_wall[20][15] = true
                this.field_wall[20][16] = true
                this.field_wall[20][17] = true
                this.field_wall[20][18] = true

                this.field_wall[19][19] = true
                this.field_wall[20][19] = true

                if(
                    this.field[19][5] != null &&
                    this.field[19][6] != null &&
                    this.field[19][7] != null &&
                    this.field[19][8] != null &&
                    this.field[19][9] != null &&
                    this.field[19][10] != null &&
                    this.field[19][11] != null &&
                    this.field[19][12] != null &&
                    this.field[19][13] != null &&
                    this.field[19][14] != null &&
                    this.field[19][15] != null &&
                    this.field[19][16] != null &&
                    this.field[19][17] != null &&
                    this.field[19][18] != null
                ) {


                    // 手牌をソートする
                    for(let i = 0 ; i < 14 ; i++){
                        this.hand[i] = this.field[19][5 + i]
                    }
                    this.hand.sort( function( a, b ){
                        if( a.color == b.color ){
                            return a.number - b.number
                        } else {
                            return a.color - b.color
                        }
                    } )

                    // しゃんてんすうを計算
                    let shanten = this.calc_hand_shanten( this.hand )
                    if( shanten == null ){
                        this.shanten_text = '[' + '探索中...' + ']'
                    } else {
                        this.shanten_text = '[' + shanten + ']'
                    }


                    if( shanten != null){
                        console.log( this.hand_to_string(this.hand), shanten )
                        if( this.setting_lock_on_tenhou ){
                            if( shanten == '天和' || shanten == '天和(七対子)' ) {
                                this.hand_lock = true
                            }
                        }
                        if( this.setting_lock_on_richi ){
                            if( shanten == 'ダブル立直' || shanten == 'ダブル立直(七対子)' || shanten == 'ダブル立直(単騎待ち)' ) {
                                this.hand_lock = true
                            }
                        }
                        if( this.setting_lock_not_allow_seven_pairs ){
                            if( shanten == '天和(七対子)' || shanten == 'ダブル立直(七対子)' ) {
                                this.hand_lock = false
                            }
                        }
                    }
                    // ソートした手牌を反映する
                    if( this.setting_sort_hand || shanten != null ){
                        for(let i = 0 ; i < 14 ; i++){
                            this.field[19][5 + i] = this.hand[i]
                        }
                    }

                    if( this.setting_slow_mode ) {
                        this.hand_hold_time = 50
                        this.hand_release_time = 10
                    } else {
                        this.hand_hold_time = 1
                        this.hand_release_time = 1
                    }
                }
            }

            // 落下処理
            // 確率で上下左右どちらかから処理する
            if(Math.random() < 0.5){
                for(let x = 0 ; x < this.FIELD_WIDTH ; x++){
                    for(let y = this.FIELD_HEIGHT - 1; 0 <= y ; y--){
                        this.fall_process(x, y)
                    }
                }
            } else {
                for(let x = this.FIELD_WIDTH- 1 ; 0 < x ; x--){
                    for(let y = this.FIELD_HEIGHT - 1; 0 <= y ; y--){
                        this.fall_process(x, y)
                    }
                }
            }
        }
        // 描画
        this.canvas2d.fillStyle = 'rgb(0,100,0)'
        this.canvas2d.fillRect(0,0, this.canvas.width, this.canvas.height )

        for(let y = 0 ; y < this.FIELD_HEIGHT ; y++){
            for(let x = 0 ; x < this.FIELD_WIDTH ; x++){
                if( this.field[y][x] != null){
                    this.canvas2d.fillStyle = 'rgb(255,255,255)'
                    this.canvas2d.strokeStyle = 'rgb(200,150,100)'
                    this.canvas2d.fillRect(x*this.TILE_SIZE,y*this.TILE_SIZE, this.TILE_SIZE,this.TILE_SIZE  )
                    this.canvas2d.strokeRect(x*this.TILE_SIZE,y*this.TILE_SIZE, this.TILE_SIZE,this.TILE_SIZE )

                    if( this.field[y][x].is_red ){
                        this.canvas2d.fillStyle = 'rgb(200,0,0)'
                    } else if( this.field[y][x].is_green ){
                        this.canvas2d.fillStyle = 'rgb(0,200,0)'
                    } else {
                        this.canvas2d.fillStyle = 'rgb(0,0,0)'
                    }
                    this.canvas2d.font = '16px Gothic'
                    this.canvas2d.textAlign = 'left'
                    this.canvas2d.textBaseline = 'hanging'
                    this.canvas2d.fillText( this.field[y][x].text , 3 + x * this.TILE_SIZE, 3 + y * this.TILE_SIZE)
                } else {
                    if( this.field_wall[y][x] == true ){
                        this.canvas2d.fillStyle = 'rgb(200,150,100)'
                        this.canvas2d.fillRect(x*this.TILE_SIZE,y*this.TILE_SIZE, this.TILE_SIZE,this.TILE_SIZE  )
                    }
                }
            }
        }

        // しゃんてんテキスト
        this.canvas2d.fillStyle = 'rgb(200,0,200)'
        this.canvas2d.font = '16px Gothic'
        this.canvas2d.textAlign = 'left'
        this.canvas2d.textBaseline = 'hanging'
        this.canvas2d.fillText( this.shanten_text , 5 * this.TILE_SIZE , 3 + 21 * this.TILE_SIZE)


    }
}
