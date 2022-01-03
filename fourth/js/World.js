
export class World extends Object {
    constructor( game ){
        super( game );
        this.game = game;
        this.g = this.game;

        this.image_player1 = this.game.image_library.get_image('1')
        this.image_player2 = this.game.image_library.get_image('2')
        this.image_block = this.game.image_library.get_image('b')
        this.image_block_p = this.game.image_library.get_image('c')
        this.image_goal = this.game.image_library.get_image('goal')

        this.block_size = 32;
        // 地形の
        this.field = [];
        this.field_height = 12;
        this.field_width = 18;
        this.field_string =
        '0                0'+
        '0                0'+
        '0                0'+
        '0                0'+
        '0000             0'+
        '0     00    00   0'+
        '0                0'+
        '0              000'+
        '0                0'+
        '0            00000'+
        '00000  00      000'+
        '0                0'
        for(let x = 0 ; x < this.field_width ; x++){
            this.field[x] = []
            for(let y = 0 ; y < this.field_height ; y++){
                this.field[x][y] = (this.field_string.charAt(x + y * this.field_width) == '0');
            }
        }
        this.goal_x = 2;
        this.goal_y = 1;
        this.placed_block_x = 8;
        this.placed_block_y = 6;
        this.placed_block_timer = 0;
        this.placed_block_timer_max = 200;
        this.placed_block_timer_fade = 100;
        this.placed_block_timer_vanish = 50;

        this.player_start_x = 100;
        this.player_start_y = 250;

        this.player_x = this.player_start_x;
        this.player_y = this.player_start_y;
        this.player_vx = 0;
        this.player_vy = 0;
        this.player_display_width = 32;
        this.player_display_height = 32;
        this.player_hitbox_width = 24;
        this.player_hitbox_height = 30;
        this.player_can_jump = false;
        this.player_walk_animation_count = 0;
        this.player_head_left = false;

        // 外側のプレイヤーの要素
        this.outer_player_img = document.createElement('img')
        this.outer_player_img.src = './img/1g.png';
        this.outer_player_img.width = this.player_display_width;
        this.outer_player_img.height = this.player_display_height;
        this.outer_player_img.style.position = 'absolute';
        this.outer_player_img.style.top = '200px';
        this.outer_player_img.style.left = '170px';
        this.outer_player_img.style['z-index'] = -1;
        this.outer_player_img.style.visibility = 'hidden';

        this.canvas_x_in_browser = 200;
        this.canvas_y_in_browser = 200;

        this.outer_star_img = document.getElementById('goal_icon');
        this.true_another_goal_span = null;

        this.is_first_goal = true;
        this.outer_player_is_active = false;
        this.is_goaled = false;
        this.is_outer_goaled = false;
        this.is_right_edge_goaled = false;


        document.getElementById('app').prepend( this.outer_player_img );
    }
    set_outer_player_pos( x, y ){
        let canvas_pos = this.g.canvas_element.getBoundingClientRect();

        this.outer_player_img.style.left = (canvas_pos.x + window.pageXOffset + x ) + 'px';
        this.outer_player_img.style.top =  (canvas_pos.y + window.pageYOffset + y ) + 'px';

    }
    reset(){
        this.is_goaled = false;
        this.is_outer_goaled = false;
        this.is_right_edge_goaled = false;
        this.player_x = this.player_start_x;
        this.player_y = this.player_start_y;

        if( this.is_first_goal ){
            this.is_first_goal = false;
            document.getElementById('desc_another_goal').innerHTML += "一度クリアしたら、<span id='another_goal'>裏ゴール</span>も探してみてください。";
            this.true_another_goal_span = document.getElementById('another_goal');
        }
    }
    on_update(){

        if( this.is_goaled ){
            // ゴール済みならリセット操作以外何もしない
            if( this.g.in_co.get_press_space() ){
                this.reset();
            }
            return;
        }
        // プレイヤーの動作
        this.player_vy += 0.5;
        this.player_vy *= 0.99;
        this.player_y += this.player_vy;

        // プレイヤーが地形に当たる
        let ceil_block = this.get_block_at( this.get_player_left(), this.get_player_top()) ||
        this.get_block_at( this.get_player_right(), this.get_player_top())
        if( ceil_block ){
            this.player_vy = 0;
            this.player_y = Math.floor(this.player_y / this.block_size) * this.block_size + this.player_hitbox_height * 0.51;
        }

        let ground_block = this.get_block_at( this.get_player_left(), this.get_player_bottom()) ||
        this.get_block_at( this.get_player_right(), this.get_player_bottom())
        if( ground_block ){
            this.player_vy = 0;
            this.player_y = Math.ceil(this.player_y / this.block_size) * this.block_size - this.player_hitbox_height * 0.51;
            this.player_can_jump = true;
        }
        this.player_vx *= 0.6;
        this.player_x += this.player_vx;

        let left_block = this.get_block_at( this.get_player_left(), this.get_player_top()) ||
        this.get_block_at( this.get_player_left(), this.get_player_bottom())
        if( left_block ){
            this.player_vx = 0;
            this.player_x = Math.floor(this.player_x / this.block_size) * this.block_size + this.player_hitbox_width * 0.51;
        }

        let right_block = this.get_block_at( this.get_player_right(), this.get_player_top()) ||
        this.get_block_at( this.get_player_right(), this.get_player_bottom())
        if( right_block ){
            this.player_vx = 0;
            this.player_x = Math.ceil(this.player_x / this.block_size) * this.block_size - this.player_hitbox_width * 0.51;
        }
        // 崖から落ちたらジャンプできない
        if( 1 < this.player_vy){
            this.player_can_jump = false;
        }
        // プレイヤーの歩行アニメーション
        if( Math.abs( this.player_vx) < 0.1){
            this.player_walk_animation_count = 0;
        } else {
            this.player_walk_animation_count += 1;
        }
        // プレイヤーの左右向き
        if( this.player_vx < 0 ){
            this.player_head_left = true;
        } else if( 0 < this.player_vx ){
            this.player_head_left = false;
        }
        // ゴール判定
        this.check_goal();

        if( this.outer_player_is_active ){
            // 外側のゴール判定
            this.check_outer_goal();
            // 外側の壁
            let bottom_floor = 450;
            if( bottom_floor < this.player_y + this.player_hitbox_height * 0.5){
                this.player_y = bottom_floor - this.player_hitbox_height * 0.5;
                this.player_vy = 0;
                this.player_can_jump = true;
            }
            if( this.player_x - this.player_hitbox_width * 0.5 < -100){
                this.player_x = -100 + this.player_hitbox_width * 0.5;
                this.player_vx = 0;
            }
            if( 700 < this.player_x + this.player_hitbox_width * 0.5){
                this.player_x = 700 - this.player_hitbox_width * 0.5;
                this.player_vx = 0;
                this.is_right_edge_goaled = true;
                this.is_goaled = true;
            }
        } else if( this.g.SCREEN_HEIGHT + 32 < this.player_y ){
            // 落下死
            this.player_x = this.player_start_x;
            this.player_y = this.player_start_y;
            this.player_vx = 0;
            this.player_vy = 0;
        }
        // 外側プレイヤーのアクティブ化
        if( this.outer_player_is_active ){
            if( 50 < this.player_y && this.player_y < this.g.SCREEN_HEIGHT &&
                0 < this.player_x && this.player_x < this.g.SCREEN_WIDTH
            ){
                this.outer_player_is_active = false;
                this.set_outer_player_pos( 50, 50 );
            }
        } else {
            if( this.player_y < 50 ){
                this.outer_player_is_active = true;
            }
        }

        // 操作
        if( this.g.in_co.get_down_left()){
            this.player_vx -= 2;
        }
        if( this.g.in_co.get_down_right()){
            this.player_vx += 2;
        }
        if( this.g.in_co.get_down_space() || this.g.in_co.get_down_up()){
            if( this.player_can_jump ){
                this.player_vy = -9;
                this.player_can_jump = false;
            }
        }
        // マウス操作
        if( this.g.in_co.get_mouse_press()){
            if( this.placed_block_timer <= 0){
                this.placed_block_x = Math.floor(this.g.in_co.get_mouse_x() / this.block_size);
                this.placed_block_y = Math.floor(this.g.in_co.get_mouse_y() / this.block_size);
                this.placed_block_timer = this.placed_block_timer_max;
            }
        }
        if( 0 < this.placed_block_timer ){
            this.placed_block_timer -= 1;
        }


    }
    check_goal(){
        let cell_x = Math.floor(this.player_x / this.block_size);
        let cell_y = Math.floor(this.player_y / this.block_size);
        if( cell_x == this.goal_x && cell_y == this.goal_y ){
            this.is_goaled = true;
        }
    }
    check_outer_goal(){
        let outer_goal_pos = this.outer_star_img.getBoundingClientRect();
        let outer_player_pos = this.outer_player_img.getBoundingClientRect();
        outer_goal_pos.x += outer_goal_pos.width * 0.5;
        outer_goal_pos.y += outer_goal_pos.height * 0.5;
        outer_player_pos.x += outer_player_pos.width * 0.5;
        outer_player_pos.y += outer_player_pos.height * 0.5;
        if( Math.abs(outer_goal_pos.x - outer_player_pos.x) < outer_player_pos.width * 0.2 &&
            Math.abs(outer_goal_pos.y - outer_player_pos.y) < outer_player_pos.height * 0.5
        ){
            this.is_goaled = true;
        }
        if( this.true_another_goal_span != null ){
            let true_another_goal_pos = this.true_another_goal_span.getBoundingClientRect();
            let outer_player_pos = this.outer_player_img.getBoundingClientRect();
            true_another_goal_pos.x += true_another_goal_pos.width * 0.5;
            true_another_goal_pos.y += true_another_goal_pos.height * 0.5;
            outer_player_pos.x += outer_player_pos.width * 0.5;
            outer_player_pos.y += outer_player_pos.height * 0.5;
            if( Math.abs(outer_player_pos.x - true_another_goal_pos.x) < true_another_goal_pos.width * 0.5 &&
                Math.abs(outer_player_pos.y - true_another_goal_pos.y) < true_another_goal_pos.height
            ){
                this.is_goaled = true;
                this.is_outer_goaled = true;
            }
        }
    }
    get_block_at(x, y){
        let cell_x = Math.floor(x / this.block_size);
        let cell_y = Math.floor(y / this.block_size);
        if( cell_x < 0 || this.field_width <= cell_x ||
            cell_y < 0 || this.field_height <= cell_y
        ) {
            return false;
        }
        if( this.placed_block_timer_vanish < this.placed_block_timer &&
            this.placed_block_x == cell_x && this.placed_block_y == cell_y ){
            return true;
        }
        return this.field[cell_x][cell_y];
    }
    get_player_left(){
        return this.player_x - this.player_hitbox_width * 0.5;
    }
    get_player_right(){
        return this.player_x + this.player_hitbox_width * 0.5;
    }
    get_player_top(){
        return this.player_y - this.player_hitbox_height * 0.5;
    }
    get_player_bottom(){
        return this.player_y + this.player_hitbox_height * 0.5;
    }
    calc_player_walkstate(){
        if( this.player_can_jump == false ){
            return true;
        }
        return Math.floor(this.player_walk_animation_count / 5) % 2 == 1;
    }
    on_draw( canvas ){
        for(let x = 0 ; x < this.field_width ; x++){
            for(let y = 0 ; y < this.field_height ; y++){
                if( this.field[x][y]) {
                    canvas.drawImage( this.image_block,
                        x * this.block_size,
                        y * this.block_size,
                        this.block_size, this.block_size)
                }
                if( this.placed_block_x == x && this.placed_block_y == y ){
                    if( this.placed_block_timer_fade < this.placed_block_timer ||
                        (
                            this.placed_block_timer_vanish < this.placed_block_timer &&
                            Math.floor(this.placed_block_timer / 3) % 2 == 0
                        )
                        ){
                        canvas.drawImage( this.image_block_p,
                            x * this.block_size,
                            y * this.block_size,
                            this.block_size, this.block_size);
                    }
                }
                if( this.goal_x == x && this.goal_y == y ){
                    canvas.drawImage( this.image_goal,
                        x * this.block_size,
                        y * this.block_size,
                        this.block_size, this.block_size);
                }
            }
        }
        canvas.save();
        canvas.translate( this.player_x, this.player_y);
        if( this.player_head_left ){
            canvas.scale(-1, 1);
        }
        if( this.calc_player_walkstate() ){
            canvas.drawImage( this.image_player2,
                0 - this.player_display_width * 0.5,
                0 - this.player_display_height * 0.5,
                this.block_size,this.block_size);
        } else {
            canvas.drawImage( this.image_player1,
                0 - this.player_display_width * 0.5,
                0 - this.player_display_height * 0.5,
                this.block_size,this.block_size);
        }
        canvas.restore();

        if( this.show_box ){
            canvas.strokeStyle = 'rgb(0,255,0)';
            canvas.strokeRect(
                this.player_x - this.player_display_width * 0.5,
                this.player_y - this.player_display_height * 0.5,
                this.player_display_width,this.player_display_height);
            canvas.strokeStyle = 'rgb(255,0,0)';
            canvas.strokeRect(
                this.player_x - this.player_hitbox_width * 0.5,
                this.player_y - this.player_hitbox_height * 0.5,
                this.player_hitbox_width,this.player_hitbox_height);
        }
        // 外のプレイヤー
        if( this.outer_player_is_active ){
            this.set_outer_player_pos(this.player_x - this.player_display_width * 0.5,
            this.player_y - this.player_display_height * 0.5, );
            if( this.calc_player_walkstate() ){
                this.outer_player_img.src = './img/2g.png';
            } else {
                this.outer_player_img.src = './img/1g.png';
            }
            if( this.player_head_left ){
                this.outer_player_img.style.transform = 'scale(-1,1)' ;
            } else {
                this.outer_player_img.style.transform = 'scale(1,1)' ;
            }
            this.outer_player_img.style.visibility = '';

        } else {
            this.outer_player_img.style.visibility = 'hidden';
        }

        if( this.is_goaled ){
            canvas.fillStyle = 'rgb(100,50,0)';
            canvas.font = 'bold 24px monospace';
            if( this.is_right_edge_goaled ){
                canvas.fillText('画面外の右端に到達しました！！', 150,100);
                canvas.fillText('これは文字通り、裏ゴールを超えた偉業ですよ！', 50,125);
            } else if( this.is_outer_goaled){
                canvas.fillText('見事、真の「裏ゴール」に到達しました！', 75,100);
            } else {
                canvas.fillText('ゴールしました！', 150,100);
            }
            canvas.fillText('Spaceキーでリセット', 150, 150);
        }
    }
}
