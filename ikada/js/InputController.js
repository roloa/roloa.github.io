

export class InputController {

    constructor( game ){
        this.game = game;

        this.mouse_x = 100;
        this.mouse_y = 100;

        this.is_mouse_holding = false;

        this.is_down_left = false;
        this.is_down_right = false;
        this.is_down_up = false;
        this.is_down_down = false;
        this.is_down_space = false;

        this.is_press_left = false;
        this.is_press_right = false;
        this.is_press_up = false;
        this.is_press_down = false;
        this.is_press_space = false;
        this.is_press_enter = false;
        this.is_press_tab = false;
        this.is_press_esc = false;

        this.is_buffer_left = false;
        this.is_buffer_right = false;
        this.is_buffer_up = false;
        this.is_buffer_down = false;
        this.is_buffer_space = false;
        this.is_buffer_enter = false;
        this.is_buffer_tab = false;
        this.is_buffer_esc = false;

        this.is_mouse_down = false;
        this.is_mouse_press = false;
        this.is_mouse_press_buffer = false;

        this.is_wheel_up = false;
        this.is_wheel_down = false;
        this.is_wheel_up_buffer = false;
        this.is_wheel_down_buffer = false;

        this.is_enable_any_key_input = true;
        this.is_down_key = []
        this.is_pressed_key = []
        this.is_pressed_key_buffer = []


    }
    setup(){
        this.game.display_canvas_element.onmousedown = this.on_mouse_down.bind(this);
        this.game.display_canvas_element.onmouseup = this.on_mouse_up.bind(this);
        this.game.display_canvas_element.onmousemove = this.on_mouse_move.bind(this);
        this.game.display_canvas_element.onwheel = this.on_wheel.bind(this);

        document.addEventListener('keydown', this.on_key_down.bind(this));
        document.addEventListener('keyup', this.on_key_up.bind(this));
        // document.addEventListener('keypress', function(){return false;});

    }

    on_update(){
        this.is_pressed_key = this.is_pressed_key_buffer;
        this.is_pressed_key_buffer = []

        this.is_wheel_up = this.is_wheel_up_buffer;
        this.is_wheel_down = this.is_wheel_down_buffer;
        this.is_wheel_up_buffer = false;
        this.is_wheel_down_buffer = false;

        this.is_mouse_press = this.is_mouse_press_buffer;
        this.is_mouse_press_buffer = false;

        this.is_press_left = this.is_buffer_left;
        this.is_press_right = this.is_buffer_right;
        this.is_press_up = this.is_buffer_up;
        this.is_press_down = this.is_buffer_down;
        this.is_press_space = this.is_buffer_space;
        this.is_press_enter = this.is_buffer_enter;
        this.is_press_tab = this.is_buffer_tab;
        this.is_press_esc = this.is_buffer_esc;

        this.is_buffer_left = false;
        this.is_buffer_right = false;
        this.is_buffer_up = false;
        this.is_buffer_down = false;
        this.is_buffer_space = false;
        this.is_buffer_enter = false;
        this.is_buffer_tab = false;
        this.is_buffer_esc = false;

    }


    on_key_down(e) {
        if(!e.repeat){
            // リピートは捨てる

            //console.log('key_down', e.code);

            if( this.is_enable_any_key_input){
                this.is_down_key[ e.code ] = true;
                this.is_pressed_key_buffer[ e.code ] = true ;
            }

            if( e.code == 'Space'){
                this.is_down_space = true;
                this.is_buffer_space = true;
            } else if( e.code == 'Escape' ){
                this.is_buffer_esc = true;
            } else if( e.code == 'Tab' ){
                this.is_buffer_tab = true;
            } else if( e.code == 'Enter' ){
                this.is_buffer_enter = true;
            } else if( e.code == 'KeyA' || e.code == 'ArrowLeft' ){
                this.is_down_left = true;
                this.is_buffer_left = true;
            } else if( e.code == 'KeyD' || e.code == 'ArrowRight' ){
                this.is_down_right = true;
                this.is_buffer_right = true;
            } else if( e.code == 'KeyS' || e.code == 'ArrowDown' ){
                this.is_down_down = true;
                this.is_buffer_down = true;
            } else if( e.code == 'KeyW' || e.code == 'ArrowUp' ){
                this.is_down_up = true;
                this.is_buffer_up = true;
            }

        }
        if( e.code == 'F5' ){
            return false;
        }
        e.preventDefault();
        return false;
    }

    on_key_up(e) {

        if( this.is_enable_any_key_input){
            this.is_down_key[ e.code ] = false;
        }

        if( e.code == 'Space'){
            this.is_down_space = false;
        } else if( e.code == 'KeyA' || e.code == 'ArrowLeft' ){
            this.is_down_left = false;
        } else if( e.code == 'KeyD' || e.code == 'ArrowRight' ){
            this.is_down_right = false;
        } else if( e.code == 'KeyS' || e.code == 'ArrowDown' ){
            this.is_down_down = false;
        } else if( e.code == 'KeyW' || e.code == 'ArrowUp' ){
            this.is_down_up = false;
        }

        e.preventDefault();
    	return false;
    }

    on_wheel( event ){
//        console.log('wheel', event.deltaY);
        if( 0 < event.deltaY ){
            this.is_wheel_down_buffer = true;
        }
        if( event.deltaY < 0 ){
            this.is_wheel_up_buffer = true;
        }
    	return false;

    }

    on_mouse_down( event ){
        let bcr = this.game.display_canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
//        console.log('mouse_down', this.mouse_x, this.mouse_y);
        this.is_mouse_down = true;
        this.is_mouse_press_buffer = true;
        return false;
    }

    on_mouse_up( event ){
        let bcr = this.game.display_canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
//        console.log('mouse_up', this.mouse_x, this.mouse_y);
        this.is_mouse_down = false;
        return false;
    }
    on_mouse_move( event ) {
        let bcr = this.game.display_canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
        return false;
    }

}
