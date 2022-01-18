

export class HudVirtualInput {

    constructor( game ){
        this.game = game;

        this.button_size = 120;
        this.text_margin = 30;
        this.calc_button_position();

        this.is_enable = false;
    }
    toggle_enable(){
        this.is_enable = !this.is_enable;
    }
    calc_button_position(){
        // 下キーの位置が基準になる
        this.down_x = 100;
        this.down_y = 400;
        this.left_x = this.down_x - this.button_size * 0.5
        this.left_y = this.down_y - this.button_size * 0.8
        this.right_x = this.down_x + this.button_size * 0.5
        this.right_y = this.down_y - this.button_size * 0.8
        this.up_x = this.down_x;
        this.up_y = this.down_y - this.button_size * 1.6
        this.a_x = 800;
        this.a_y = 300;
        this.b_x = this.a_x - this.button_size * 1.2;
        this.b_y = this.a_y + this.button_size * 0.2;
    }
    on_update(){
        if( this.is_enable ){
            if( this.game.input_controller.get_mouse_press() ){
                let mouse_x = this.game.input_controller.mouse_x;
                let mouse_y = this.game.input_controller.mouse_y;
                if( this.hit_test_button( mouse_x, mouse_y, this.down_x, this.down_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_press_down = true;
                    this.game.input_controller.is_mouse_press_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.up_x, this.up_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_press_up = true;
                    this.game.input_controller.is_mouse_press_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.left_x, this.left_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_press_left = true;
                    this.game.input_controller.is_mouse_press_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.right_x, this.right_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_press_right = true;
                    this.game.input_controller.is_mouse_press_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.a_x, this.a_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_press_space = true;
                    this.game.input_controller.is_mouse_press_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.b_x, this.b_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_press_esc = true;
                    this.game.input_controller.is_mouse_press_consumed = true;
                }
            }
            if( this.game.input_controller.get_mouse_down() ){
                let mouse_x = this.game.input_controller.mouse_x;
                let mouse_y = this.game.input_controller.mouse_y;
                if( this.hit_test_button( mouse_x, mouse_y, this.down_x, this.down_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_down_down = true;
                    this.game.input_controller.is_mouse_down_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.up_x, this.up_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_down_up = true;
                    this.game.input_controller.is_mouse_down_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.left_x, this.left_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_down_left = true;
                    this.game.input_controller.is_mouse_down_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.right_x, this.right_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_down_right = true;
                    this.game.input_controller.is_mouse_down_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.a_x, this.a_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_down_space = true;
                    this.game.input_controller.is_mouse_down_consumed = true;
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.b_x, this.b_y, this.button_size ) ){
                    this.game.input_controller.is_virtual_down_esc = true;
                    this.game.input_controller.is_mouse_down_consumed = true;
                }
            }
        }
    }
    hit_test_button( mouse_x, mouse_y, button_x, button_y, button_size ){
        return (
            button_x < mouse_x && mouse_x < button_x + button_size &&
            button_y < mouse_y && mouse_y < button_y + button_size );
    }

    on_draw( canvas ){
        if( this.is_enable ){
            canvas.save();
            canvas.fillStyle = 'rgb(100,100,100)';
            canvas.strokeStyle = 'rgb(50,50,50)';
            canvas.font = 'bold 24px monospace'
            canvas.textBaseline = 'top';
            canvas.strokeRect(this.down_x  , this.down_y  , this.button_size , this.button_size);
            canvas.fillText('↓', this.down_x + this.text_margin , this.down_y + this.text_margin);
            canvas.strokeRect(this.up_x    , this.up_y    , this.button_size , this.button_size);
            canvas.fillText('↑', this.up_x + this.text_margin , this.up_y + this.text_margin);
            canvas.strokeRect(this.left_x  , this.left_y  , this.button_size , this.button_size);
            canvas.fillText('←', this.left_x + this.text_margin , this.left_y + this.text_margin);
            canvas.strokeRect(this.right_x , this.right_y , this.button_size , this.button_size);
            canvas.fillText('→', this.right_x + this.text_margin , this.right_y + this.text_margin);

            canvas.strokeRect(this.a_x , this.a_y , this.button_size , this.button_size);
            canvas.fillText('A', this.a_x + this.text_margin , this.a_y + this.text_margin);
            canvas.strokeRect(this.b_x , this.b_y , this.button_size , this.button_size);
            canvas.fillText('B', this.b_x + this.text_margin , this.b_y + this.text_margin);


            canvas.restore();
        }
    }
}
