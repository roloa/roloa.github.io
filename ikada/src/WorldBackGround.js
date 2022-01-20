

export class WorldBackGround {


    constructor( game ){

        this.game = game;

        this.wave_list = [];

        this.world_zero_y = 0;
        this.horizon_line_y = 300;

        for( let i = 0 ; i < 50 ; i++ ){
            let wave = {};
            wave.x = Math.random() * this.game.SCREEN_WIDTH  * 2 - this.game.SCREEN_WIDTH;
            wave.y = Math.random() * this.horizon_line_y * 0.9;
            this.wave_list.push( wave );
        }
    }
    on_update(){
        this.world_zero_y = this.game.SCREEN_HEIGHT_HALF - (this.game.world.camera.zoom * this.game.world.camera.y);
        for( let wave of this.wave_list ){
            let size_multiplier = (wave.y / this.horizon_line_y)* 0.9 + 0.1;
            wave.x += (size_multiplier);
            wave.x -= this.game.world.ship.velocity * size_multiplier;
            if( this.game.SCREEN_WIDTH < wave.x ){
                wave.x = -this.game.SCREEN_WIDTH;
                wave.y = Math.random() * this.horizon_line_y * 0.9;
            } else if( wave.x < -this.game.SCREEN_WIDTH ){
                wave.x = this.game.SCREEN_WIDTH;
                wave.y = Math.random() * this.horizon_line_y * 0.9;
            }
        }
    }
    draw_wave( canvas, wave ){

        let x = wave.x + this.game.SCREEN_WIDTH_HALF;
        let y = wave.y * ( this.world_zero_y - this.horizon_line_y ) / this.horizon_line_y;

        let size_multiplier = (wave.y / this.horizon_line_y) * this.game.world.camera.zoom;

        let bottom_y = y + (20 * size_multiplier);
        let wave_width = 40 * size_multiplier;

        canvas.strokeStyle = 'rgb(50, 100, 250)';
        canvas.beginPath();
        canvas.moveTo(x - wave_width, bottom_y + this.horizon_line_y);
        canvas.lineTo(x, y + this.horizon_line_y);
        canvas.lineTo(x + wave_width, bottom_y + this.horizon_line_y);
        canvas.stroke();

    }
    on_draw( canvas ){
        canvas.fillStyle = 'rgb(255,0,0)';
        canvas.strokeStyle = 'rgb(50, 100, 250)'
        if( this.horizon_line_y < this.world_zero_y ){
            canvas.beginPath();
            canvas.moveTo(0, this.horizon_line_y);
            canvas.lineTo(960, this.horizon_line_y);
            canvas.stroke();
        }
        for( let wave of this.wave_list ){
            this.draw_wave( canvas, wave );
        }

        canvas.fillRect(10,20,30,40);


        canvas.fillRect(10,this.world_zero_y,30,40);

    }

}
