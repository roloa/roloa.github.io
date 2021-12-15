

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
            } else if( e.code == 'KeyA'){
                this.is_down_left = true;
            } else if( e.code == 'KeyD'){
                this.is_down_right = true;
            } else if( e.code == 'KeyS'){
                this.is_down_down = true;
            } else if( e.code == 'KeyW'){
                this.is_down_up = true;
            }

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
        } else if( e.code == 'KeyA'){
            this.is_down_left = false;
        } else if( e.code == 'KeyD'){
            this.is_down_right = false;
        } else if( e.code == 'KeyS'){
            this.is_down_down = false;
        } else if( e.code == 'KeyW'){
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
