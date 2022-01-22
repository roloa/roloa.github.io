

export class WorldBackGround {


    constructor( game ){

        this.game = game;

        this.wave_list = [];

        this.world_zero_y = 0;
        this.horizon_line_y = 250;

        for( let i = 0 ; i < 50 ; i++ ){
            let wave = {};
            wave.x = Math.random() * this.game.SCREEN_WIDTH - this.game.SCREEN_WIDTH_HALF;
            wave.y = Math.random() * this.horizon_line_y * 0.9;
            this.wave_list.push( wave );
        }

        this.star_list = [];

        for( let i = 0 ; i < 50 ; i++ ){
            let star = {};
            this.reset_star( star );
            star.coodinate_rotate = Math.random() * Math.PI + Math.PI;
            this.calc_star_xy( star );
            this.star_list.push( star );
        }
        this.star_rotate_proc_index = 0;

        this.cloud_list = [];

        for( let i = 0 ; i < 80 ; i++ ){
            let cloud = {};
            //this.reset_cloud( cloud );

            cloud.x = Math.random() * this.game.SCREEN_WIDTH - this.game.SCREEN_WIDTH_HALF;
            cloud.y = this.horizon_line_y - (i * 3) - 100 ;
            cloud.visible = Math.random() < 0.3;

            this.cloud_list.push( cloud );
        }
        this.cloud_image = this.game.image_library.get_image('cloud_border');
        this.cloud_width = 120;
        this.cloud_height = 80;

        this.moon = {};
        this.moon.coodinate_rotate = Math.PI * 1.25;
        this.moon.coodinate_radius = 300;
        this.moon.size = 50;
        this.moon.age = 1;
        this.moon.color_fill = 'rgb(250, 200, 150)';
        this.moon.color_stroke = 'rgb(200, 150, 100)';


    }
    reset_cloud( cloud ){
    }
    reset_star( star ){
        // 星を東側のランダムな位置に設定する
        star.coodinate_radius = Math.random() * this.game.SCREEN_WIDTH_HALF * 0.9 + this.game.SCREEN_WIDTH_HALF * 0.1;
        star.coodinate_rotate = Math.PI;
        star.size = Math.random() * 3 + 1;
        let red = Math.floor( Math.random() * 150 + 100 );
        let blue = Math.floor( Math.random() * 150 + 100 );
        let green = 200;
        star.color = 'rgb(' + red +', ' + green + ', ' + blue + ')';
    }
    calc_star_xy( star ){
        // star.coodinate_rotate += 0.1;
        star.coodinate_rotate += 0.001;
        if( Math.PI * 2 <= star.coodinate_rotate ){
            this.reset_star( star );
        }
        star.x = Math.cos( star.coodinate_rotate ) * star.coodinate_radius + this.game.SCREEN_WIDTH_HALF;
        star.y = Math.sin( star.coodinate_rotate ) * star.coodinate_radius + this.game.SCREEN_HEIGHT_HALF;
    }
    on_update(){
        this.world_zero_y = this.game.SCREEN_HEIGHT_HALF - (this.game.world.camera.zoom * this.game.world.camera.y);
        for( let wave of this.wave_list ){
            let size_multiplier = (wave.y / this.horizon_line_y)* 0.9 + 0.1;
            wave.x += (size_multiplier);
            wave.x -= this.game.world.ship.velocity * size_multiplier;
            if( this.game.SCREEN_WIDTH_HALF < wave.x ){
                wave.x = -this.game.SCREEN_WIDTH_HALF;
                wave.y = Math.random() * this.horizon_line_y * 0.9;
            } else if( wave.x < -this.game.SCREEN_WIDTH_HALF ){
                wave.x = this.game.SCREEN_WIDTH_HALF;
                wave.y = Math.random() * this.horizon_line_y * 0.9;
            }
        }

        this.star_rotate_proc_index += 1;
        if( this.star_list.length <= this.star_rotate_proc_index ){
            this.star_rotate_proc_index = 0;
        }
        this.calc_star_xy( this.star_list[ this.star_rotate_proc_index ] );

        for( let cloud of this.cloud_list ){
            let size_multiplier = 1.1 - (cloud.y / this.horizon_line_y);
            cloud.x += 0.1 * size_multiplier;
            cloud.x -= 0.1 * this.game.world.ship.velocity * size_multiplier;
            if( this.game.SCREEN_WIDTH_HALF < cloud.x ){
                cloud.x = -this.game.SCREEN_WIDTH_HALF;
            } else if( cloud.x < -this.game.SCREEN_WIDTH_HALF ){
                cloud.x = this.game.SCREEN_WIDTH_HALF;
            }

        }

        // 月
        this.moon.coodinate_rotate += 0.0001;
        if( Math.PI * 2.25 < this.moon.coodinate_rotate ){
            this.moon.coodinate_rotate = Math.PI * 0.75;
            this.moon.age += 1;
            if( 8 <= this.moon.age ){
                this.moon.age = 0;
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
    draw_star( canvas, star ){
        canvas.lineWidth = 2;
        canvas.strokeStyle = star.color;

        let star_size = star.size;
        canvas.beginPath();
        canvas.moveTo(star.x - star_size, star.y - star_size);
        canvas.lineTo(star.x + star_size, star.y + star_size);
        canvas.stroke();
        canvas.beginPath();
        canvas.moveTo(star.x - star_size, star.y + star_size);
        canvas.lineTo(star.x + star_size, star.y - star_size);
        canvas.stroke();

        star_size *= 0.5;
        canvas.lineWidth = 3;
        canvas.strokeStyle = 'rgb(250,250,250)';

        canvas.beginPath();
        canvas.moveTo(star.x - star_size, star.y - star_size);
        canvas.lineTo(star.x + star_size, star.y + star_size);
        canvas.stroke();
        canvas.beginPath();
        canvas.moveTo(star.x - star_size, star.y + star_size);
        canvas.lineTo(star.x + star_size, star.y - star_size);
        canvas.stroke();

    }
    draw_cloud( canvas, cloud ){
        if( cloud.visible ) {
            let size_multiplier = 1 - (cloud.y / this.horizon_line_y);
            canvas.drawImage( this.cloud_image,
                cloud.x + this.game.SCREEN_WIDTH_HALF,
                cloud.y,
                this.cloud_width * size_multiplier , this.cloud_height * size_multiplier
            );
        }
    }
    draw_moon( canvas ){

        let x = (Math.cos( this.moon.coodinate_rotate ) * this.moon.coodinate_radius) * 1.2 + this.game.SCREEN_WIDTH_HALF;
        let y =  Math.sin( this.moon.coodinate_rotate ) * this.moon.coodinate_radius        + this.horizon_line_y;
        canvas.lineWidth = 3;
        canvas.save();
        canvas.translate(x, y);
        canvas.rotate( this.moon.coodinate_rotate );
        // 円のシルエット
        canvas.beginPath();
        canvas.strokeStyle = this.moon.color_stroke;
        canvas.fillStyle = 'rgb(0,0,20)';
        canvas.strokeStyle = 'rgb(50,50,50)';
        canvas.arc(0,0,this.moon.size,0,Math.PI * 2,false);
        canvas.fill();
        canvas.stroke();

        canvas.fillStyle = this.moon.color_fill;
        canvas.strokeStyle = this.moon.color_stroke;
        canvas.beginPath();

        const largearc_rad = 1.15;
        let largearc_y = - this.moon.size * 0.5;
        let largearc_size = this.moon.size * 1.1;
        let largearc_start = Math.PI * 0.5 + largearc_rad;
        let largezrc_end = Math.PI * 0.5 - largearc_rad
        if( this.moon.age == 0){
            // 新月
        } else if( this.moon.age == 1 ){
            // 上弦三日月
            canvas.arc(0,0,this.moon.size,0,Math.PI * 1,false);
            canvas.arc(
                0,
                - this.moon.size * 0.5,
                this.moon.size * 1.1,
                Math.PI * 0.5 + largearc_rad,
                Math.PI * 0.5 - largearc_rad,
                true);
        } else if( this.moon.age == 2 ){
            // 上弦半月
            canvas.arc(0,0,this.moon.size,0,Math.PI * 1,false);
        } else if( this.moon.age == 3 ){
            // 上弦十三日月
            canvas.arc(0,0,this.moon.size,0,Math.PI * 1,false);
            canvas.arc(
                0,
                this.moon.size * 0.5,
                this.moon.size * 1.1,
                Math.PI * 1.5 - largearc_rad,
                Math.PI * 1.5 + largearc_rad,
                false);
        } else if( this.moon.age == 4 ){
            // 満月
            canvas.arc(0,0,this.moon.size,0,Math.PI * 2,false);

        } else if( this.moon.age == 5 ){
            // 下弦十三日
            canvas.arc(0,0,this.moon.size,Math.PI * 1,Math.PI * 2,false);
            canvas.arc(
                0,
                - this.moon.size * 0.5,
                this.moon.size * 1.1,
                Math.PI * 0.5 - largearc_rad,
                Math.PI * 0.5 + largearc_rad,
                false);
        } else if( this.moon.age == 6 ){
            // 下弦半月
            canvas.arc(0,0,this.moon.size,Math.PI * 1,Math.PI * 2,false);
        } else if( this.moon.age == 7 ){
            // 下弦三日月
            canvas.arc(0,0,this.moon.size,Math.PI * 1,Math.PI * 2,false);
            canvas.arc(
                0,
                this.moon.size * 0.5,
                this.moon.size * 1.1,
                Math.PI * 1.5 + largearc_rad,
                Math.PI * 1.5 - largearc_rad,
                true);
        } else {
            // 新月？
        }

        canvas.closePath();
        canvas.fill();
        canvas.stroke();

        canvas.restore();

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

        // 空のクリッピングパスを作成
        canvas.save();
        canvas.beginPath();
        canvas.moveTo(0, 0);
        canvas.lineTo(this.game.SCREEN_WIDTH, 0);
        canvas.lineTo(this.game.SCREEN_WIDTH, this.horizon_line_y);
        canvas.lineTo(0, this.horizon_line_y);
        canvas.closePath();
        canvas.clip();
        for( let star of this.star_list ){
            this.draw_star( canvas, star );
        }

        this.draw_moon( canvas );

        for( let cloud of this.cloud_list ){
            this.draw_cloud( canvas, cloud );
        }

        //canvas.fillRect(10,this.world_zero_y,30,40);
        canvas.restore();
    }

}
