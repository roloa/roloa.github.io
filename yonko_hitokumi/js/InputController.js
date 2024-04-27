
class InputController {

    constructor(game) {
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
        this.is_press_rotate_right = false;
        this.is_press_rotate_left = false;
        this.is_press_mino_hold = false;

        this.is_buffer_left = false;
        this.is_buffer_right = false;
        this.is_buffer_up = false;
        this.is_buffer_down = false;
        this.is_buffer_space = false;
        this.is_buffer_enter = false;
        this.is_buffer_tab = false;
        this.is_buffer_esc = false;
        this.is_buffer_rotate_right = false;
        this.is_buffer_rotate_left = false;
        this.is_buffer_mino_hold = false;

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

        this.is_enable_any_key_input = false;
        this.is_down_key = []
        this.is_pressed_key = []
        this.is_pressed_key_buffer = []


    }
    setup() {

        document.addEventListener('keydown', this.on_key_down.bind(this));
        document.addEventListener('keyup', this.on_key_up.bind(this));
        // document.addEventListener('keypress', function(){return false;});

    }

    on_update() {

        this.is_press_left = this.is_buffer_left;
        this.is_press_right = this.is_buffer_right;
        this.is_press_up = this.is_buffer_up;
        this.is_press_down = this.is_buffer_down;
        this.is_press_space = this.is_buffer_space;
        this.is_press_enter = this.is_buffer_enter;
        this.is_press_tab = this.is_buffer_tab;
        this.is_press_esc = this.is_buffer_esc;
        this.is_press_rotate_right = this.is_buffer_rotate_right;
        this.is_press_rotate_left = this.is_buffer_rotate_left;
        this.is_press_mino_hold = this.is_buffer_mino_hold;

        this.is_buffer_left = false;
        this.is_buffer_right = false;
        this.is_buffer_up = false;
        this.is_buffer_down = false;
        this.is_buffer_space = false;
        this.is_buffer_enter = false;
        this.is_buffer_tab = false;
        this.is_buffer_esc = false;
        this.is_buffer_rotate_right = false;
        this.is_buffer_rotate_left = false;
        this.is_buffer_mino_hold = false;

    }

    get_down_left() {
        return this.is_down_left || this.is_virtual_down_left;
    }
    get_down_right() {
        return this.is_down_right || this.is_virtual_down_right;
    }
    get_down_up() {
        return this.is_down_up || this.is_virtual_down_up;
    }
    get_down_down() {
        return this.is_down_down || this.is_virtual_down_down;
    }
    get_down_space() {
        return this.is_down_space || this.is_virtual_down_space;
    }
    get_press_left() {
        return this.is_press_left || this.is_virtual_press_left;
    }
    get_press_right() {
        return this.is_press_right || this.is_virtual_press_right;
    }
    get_press_up() {
        return this.is_press_up || this.is_virtual_press_up;
    }
    get_press_down() {
        return this.is_press_down || this.is_virtual_press_down;
    }
    get_press_space() {
        return this.is_press_space || this.is_virtual_press_space;
    }
    get_press_enter() {
        return this.is_press_enter || this.is_virtual_press_enter;
    }
    get_press_tab() {
        return this.is_press_tab || this.is_virtual_press_tab;
    }
    get_press_esc() {
        return this.is_press_esc || this.is_virtual_press_esc;
    }
    get_press_rotate_right() {
        return this.is_press_rotate_right;
    }
    get_press_rotate_left() {
        return this.is_press_rotate_left;
    }
    get_press_mino_hold() {
        return this.is_press_mino_hold;
    }

    on_key_down(e) {
        if (!e.repeat) {
            // リピートは捨てる

            //console.log('key_down', e.code);
            //document.getElementById("debug_log").innerText = e.code;

            if (e.code == 'Space') {
                this.is_down_space = true;
                this.is_buffer_space = true;
                e.preventDefault();
            } else if (e.code == 'Escape') {
                this.is_buffer_esc = true;
                e.preventDefault();
            } else if (e.code == 'Tab') {
                this.is_buffer_tab = true;
                e.preventDefault();
            } else if (e.code == 'Enter') {
                this.is_buffer_enter = true;
                e.preventDefault();
            } else if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
                this.is_down_left = true;
                this.is_buffer_left = true;
                e.preventDefault();
            } else if (e.code == 'KeyD' || e.code == 'ArrowRight') {
                this.is_down_right = true;
                this.is_buffer_right = true;
                e.preventDefault();
            } else if (e.code == 'KeyS' || e.code == 'ArrowDown') {
                this.is_down_down = true;
                this.is_buffer_down = true;
                e.preventDefault();
            } else if (e.code == 'KeyW' || e.code == 'ArrowUp') {
                this.is_down_up = true;
                this.is_buffer_up = true;
                e.preventDefault();
            } else if (e.code == 'Key1' || e.code == 'KeyQ' || e.code == 'KeyZ' || e.code == 'F3') {
                this.is_buffer_rotate_left = true;
                e.preventDefault();
            } else if (e.code == 'Key3' || e.code == 'KeyE' || e.code == 'KeyX' || e.code == 'F4') {
                this.is_buffer_rotate_right = true;
                e.preventDefault();
            } else if (e.code == 'Key2' || e.code == 'KeyC' || e.code == 'F2') {
                this.is_buffer_mino_hold = true;
                e.preventDefault();
            }
            return false;
        }

        e.preventDefault();
        return false;
    }

    on_key_up(e) {

        if (e.code == 'Space') {
            this.is_down_space = false;
        } else if (e.code == 'KeyA' || e.code == 'ArrowLeft') {
            this.is_down_left = false;
        } else if (e.code == 'KeyD' || e.code == 'ArrowRight') {
            this.is_down_right = false;
        } else if (e.code == 'KeyS' || e.code == 'ArrowDown') {
            this.is_down_down = false;
        } else if (e.code == 'KeyW' || e.code == 'ArrowUp') {
            this.is_down_up = false;
        }

        e.preventDefault();
        return false;
    }

}
