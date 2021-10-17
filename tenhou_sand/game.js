
import {Tile} from './tile.js';

export class Game {
    constructor(){
        this.name = 'Tenhou Sand'
        this.version = '0.1'

        this.tile_list = []
        this.TILE_NUM = 136

        this.canvas = document.getElementById('my_canvas')
        this.canvas2d = this.canvas.getContext('2d')

        this.SCREEN_WIDTH = 480
        this.SCREEN_HEIGHT = 640
        this.TILE_SIZE = 20

        this.FIELD_WIDTH  = this.SCREEN_WIDTH  / this.TILE_SIZE
        this.FIELD_HEIGHT = this.SCREEN_HEIGHT / this.TILE_SIZE

        this.field = []
        for(let y = 0 ; y < this.FIELD_HEIGHT ; y++){
            this.field[y] = []
            for(let x = 0 ; x < this.FIELD_WIDTH ; x++){
                this.field[y][x] = null
            }
        }

        // 麻雀牌の初期配置
        for(let number = 1 ; number <= 9 ; number++ ){
            for(let y = 1 ; y <= 4 ; y++){
                this.field[ y ][ 1 + number ] = new Tile( 1, number, false )
            }
        }
        for(let number = 1 ; number <= 9 ; number++ ){
            for(let y = 1 ; y <= 4 ; y++){
                this.field[ y ][ 11 + number ] = new Tile( 2, number, false )
            }
        }

        for(let number = 1 ; number <= 9 ; number++ ){
            for(let y = 1 ; y <= 4 ; y++){
                this.field[ 5 + y ][ 1 + number ] = new Tile( 3, number, false )
            }
        }

        for(let number = 1 ; number <= 7 ; number++ ){
            for(let y = 1 ; y <= 4 ; y++){
                this.field[ 5 + y ][ 11 + number ] = new Tile( 4, number, false )
            }
        }


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
        this.field_wall[4][1] = true
        this.field_wall[5][2] = true
        this.field_wall[5][3] = true
        this.field_wall[6][4] = true
        this.field_wall[6][5] = true
        this.field_wall[6][6] = true
        this.field_wall[7][7] = true
        this.field_wall[7][8] = true
        this.field_wall[7][9] = true
        this.field_wall[7][10] = true
//        this.field_wall[8][11] = true
//        this.field_wall[5][12] = true
        this.field_wall[7][13] = true
        this.field_wall[7][14] = true
        this.field_wall[7][15] = true
        this.field_wall[7][16] = true
        this.field_wall[6][17] = true
        this.field_wall[6][18] = true
        this.field_wall[6][19] = true
        this.field_wall[5][20] = true
        this.field_wall[5][21] = true
        this.field_wall[4][22] = true


        this.mouse_x = 100
        this.mouse_y = 100

        setInterval( this.on_update.bind(this), 20 )
        this.canvas.onmousedown = this.on_mouse_down.bind(this)
        this.canvas.onmouseup = this.on_mouse_up.bind(this)
        this.canvas.onmousemove = this.on_mouse_move.bind(this)
    }

    on_mouse_down( event ){
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y

        // クリック箇所に壁を生成する
        let field_x = Math.floor(this.mouse_x / this.TILE_SIZE)
        let field_y = Math.floor(this.mouse_y / this.TILE_SIZE)
        if( true ){
            // TODO 範囲外
            this.field_wall[field_y][field_x] = !this.field_wall[field_y][field_x]
        }
    }

    on_mouse_up( event ){
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y
    }
    on_mouse_move( event ) {
        let bcr = this.canvas.getBoundingClientRect()
        this.mouse_x = event.clientX -  bcr.x
        this.mouse_y = event.clientY -  bcr.y
    }

    reset(){
        console.log(this.name, this.version)
    }

    on_update(){

        // 落下処理
        for(let x = 0 ; x < this.FIELD_WIDTH ; x++){
            for(let y = this.FIELD_HEIGHT - 1; 0 <= y ; y--){
            //for(let y = 0; y < this.FIELD_HEIGHT ; y++){

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
                } else if( 0 < y && this.field_wall[y-1][x] == false && this.field[y-1][x] == null && Math.random() < 0.5) {

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

                    this.canvas2d.fillStyle = 'rgb(0,0,0)'
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

    }
}
