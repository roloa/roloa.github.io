

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

        this.is_virtual_down_left = false;
        this.is_virtual_down_right = false;
        this.is_virtual_down_up = false;
        this.is_virtual_down_down = false;
        this.is_virtual_down_space = false;

        this.is_virtual_press_left = false;
        this.is_virtual_press_right = false;
        this.is_virtual_press_up = false;
        this.is_virtual_press_down = false;
        this.is_virtual_press_space = false;
        this.is_virtual_press_enter = false;
        this.is_virtual_press_tab = false;
        this.is_virtual_press_esc = false;

        this.is_mouse_down = false;
        this.is_mouse_press = false;
        this.is_mouse_press_buffer = false;

        this.is_wheel_up = false;
        this.is_wheel_down = false;
        this.is_wheel_up_buffer = false;
        this.is_wheel_down_buffer = false;

        this.active_touch = null;
        this.auto_virtual_input_enable = true;

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

        this.game.display_canvas_element.ontouchstart = this.on_touch_start.bind(this);
        this.game.display_canvas_element.ontouchmove = this.on_touch_move.bind(this);
        this.game.display_canvas_element.ontouchend = this.on_touch_end.bind(this);


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
        this.is_mouse_down_consumed = false;
        this.is_mouse_press_consumed = false;

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

        this.is_virtual_down_left = false;
        this.is_virtual_down_right = false;
        this.is_virtual_down_up = false;
        this.is_virtual_down_down = false;
        this.is_virtual_down_space = false;

        this.is_virtual_press_left = false;
        this.is_virtual_press_right = false;
        this.is_virtual_press_up = false;
        this.is_virtual_press_down = false;
        this.is_virtual_press_space = false;
        this.is_virtual_press_enter = false;
        this.is_virtual_press_tab = false;
        this.is_virtual_press_esc = false;
    }
    get_mouse_down(){
        return this.is_mouse_down && !this.is_mouse_down_consumed;
    }
    get_mouse_press(){
        return this.is_mouse_press && !this.is_mouse_press_consumed;
    }
    get_down_left(){
        return this.is_down_left || this.is_virtual_down_left;
    }
    get_down_right(){
        return this.is_down_right || this.is_virtual_down_right;
    }
    get_down_up(){
        return this.is_down_up || this.is_virtual_down_up;
    }
    get_down_down(){
        return this.is_down_down || this.is_virtual_down_down;
    }
    get_down_space(){
        return this.is_down_space || this.is_virtual_down_space;
    }
    get_press_left(){
        return this.is_press_left || this.is_virtual_press_left;
    }
    get_press_right(){
        return this.is_press_right || this.is_virtual_press_right;
    }
    get_press_up(){
        return this.is_press_up || this.is_virtual_press_up;
    }
    get_press_down(){
        return this.is_press_down || this.is_virtual_press_down;
    }
    get_press_space(){
        return this.is_press_space || this.is_virtual_press_space;
    }
    get_press_enter(){
        return this.is_press_enter || this.is_virtual_press_enter;
    }
    get_press_tab(){
        return this.is_press_tab || this.is_virtual_press_tab;
    }
    get_press_esc(){
        return this.is_press_esc || this.is_virtual_press_esc;
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
        if( e.code == 'F5' || e.code == 'F12' ){
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
        //this.game.log('mouse down')
        let bcr = this.game.display_canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
//        console.log('mouse_down', this.mouse_x, this.mouse_y);
        this.is_mouse_down = true;
        this.is_mouse_press_buffer = true;
        // どこでもクリックされたら、サウンド読み込みを始める
        this.game.sound_library.load_sounds();

        return false;
    }

    on_mouse_up( event ){
        //this.game.log('mouse up')
        let bcr = this.game.display_canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
//        console.log('mouse_up', this.mouse_x, this.mouse_y);
        this.is_mouse_down = false;
        return false;
    }
    on_mouse_move( event ) {
        //this.game.log('mouse move')
        let bcr = this.game.display_canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
        return false;
    }
    on_touch_start( event ){
        //this.game.log('touch start')
        if( this.active_touch == null ){
            // 一本指のみ対応
            this.active_touch = event.changedTouches[0].identifier;
            let bcr = this.game.display_canvas_element.getBoundingClientRect();
            this.mouse_x = event.changedTouches[0].pageX -  bcr.x;
            this.mouse_y = event.changedTouches[0].pageY -  bcr.y;
            this.is_mouse_down = true;
            this.is_mouse_press_buffer = true;
        }
        if( this.auto_virtual_input_enable ){
            this.auto_virtual_input_enable = false;
            this.game.log('***** 注意 *****');
            this.game.log('スマホ/タブレットは*非推奨*です。');
            this.game.log('一応、仮想キーはありますが、');
            this.game.log('同時タップが未実装だし、');
            this.game.log('PC向けのアクションをスマホでやるのは');
            this.game.log('無謀だと思います。');
            this.game.log('**************');
            this.game.hud_virtual_input.is_enable = true;
        }
        // どこでもクリックされたら、サウンド読み込みを始める
        this.game.sound_library.load_sounds();
        event.preventDefault();
        return false;
    }
    on_touch_end( event ){
        //this.game.log('touch end')
        for (var i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier == this.active_touch) {
                this.active_touch = null;
                this.is_mouse_down = false;
                break;
            }
        }
        event.preventDefault();

        return false;
    }
    on_touch_move( event ){
        //this.game.log('touch move')
        for (var i = 0; i < event.changedTouches.length; i++) {
            if (event.changedTouches[i].identifier == this.active_touch) {
                let bcr = this.game.display_canvas_element.getBoundingClientRect();
                this.mouse_x = event.changedTouches[i].pageX -  bcr.x;
                this.mouse_y = event.changedTouches[i].pageY -  bcr.y;
                break;
            }
        }
        event.preventDefault();
        return false;
    }
    ongoingTouchIndexById(idToFind) {
    }

}
