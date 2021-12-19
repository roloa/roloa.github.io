

export class EndingMovie extends Object {
    constructor( game ){
        super( game );
        this.game = game;
        this.ship = this.game.world.ship;

        this.image_star = this.game.image_library.get_image('small_star7_yellow')
        this.star_x = [];
        this.star_y = [];
        this.star_num = 10;
        for(let i=0 ; i < this.star_num ; i++){
            this.star_x[i] = Math.random() * this.game.SCREEN_WIDTH;
            this.star_y[i] = Math.random() * this.game.SCREEN_HEIGHT;
        }
    }
    on_update(){
        if( this.game.input_controller.is_down_key['KeyX'] ) {
            //this.game.is_there_title = false;

            // this.game.log('ロードします。');
            //this.game.save_data_manager.load_game();

        }

        for(let i = 0 ; i < this.star_num ; i++){
            this.star_y[i] += Math.random() * 5 + 10;
            if( this.game.SCREEN_HEIGHT < this.star_y[i] ){
                this.star_x[i] = Math.random() * this.game.SCREEN_WIDTH;
                this.star_y[i] = Math.random() * -100;
            }
        }

    }
    on_draw( canvas ){


        for( let i = 0 ; i < this.star_num ; i++ ){
            canvas.drawImage( this.image_star, this.star_x[i], this.star_y[i] );
        }

        canvas.font = 'bold 64px monospace';
        canvas.strokeStyle = 'rgb(250,250,250)';
        canvas.fillStyle = 'rgb(250,250,250)';
        canvas.strokeText('Victory!!',100,150)

        canvas.save();

        // 画面の中心
        canvas.translate( this.game.SCREEN_WIDTH_HALF, this.game.SCREEN_HEIGHT_HALF );

        // 拡大指定
        //canvas.scale( this.camera.zoom, this.camera.zoom );


        canvas.translate( Math.random()*5 , Math.random()*5 );

        this.ship.on_draw( canvas );
        canvas.restore();
    }
}
