

export class HudCameraControl {

    constructor( game ){
        this.game = game;

        this.button_size = 60;
        this.text_margin = 10;
        this.calc_button_position();

        this.is_enable = true;
    }
    toggle_enable(){
        this.is_enable = !this.is_enable;
    }
    calc_button_position(){
        // 下キーの位置が基準になる
        this.down_x = 20;
        this.down_y = 150;
        this.up_x = this.down_x + this.button_size * 1.1;
        this.up_y = this.down_y ;
    }
    on_update(){
        if( this.is_enable ){
            if( this.game.input_controller.get_mouse_press() ){
                let mouse_x = this.game.input_controller.mouse_x;
                let mouse_y = this.game.input_controller.mouse_y;
                if( this.hit_test_button( mouse_x, mouse_y, this.down_x, this.down_y, this.button_size ) ){
                    this.game.world.zoom_out();
                }
                if( this.hit_test_button( mouse_x, mouse_y, this.up_x, this.up_y, this.button_size ) ){
                    this.game.world.zoom_in();
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
            canvas.fillStyle = 'rgb(200,200,200)';
            canvas.strokeStyle = 'rgb(200,200,200)';
            canvas.font = 'bold 24px monospace'
            canvas.textBaseline = 'top';
            canvas.strokeRect(this.down_x  , this.down_y  , this.button_size , this.button_size);
            canvas.fillText('[-]', this.down_x + this.text_margin , this.down_y + this.text_margin);
            canvas.strokeRect(this.up_x    , this.up_y    , this.button_size , this.button_size);
            canvas.fillText('[+]', this.up_x + this.text_margin , this.up_y + this.text_margin);

            canvas.restore();
        }
    }
}
