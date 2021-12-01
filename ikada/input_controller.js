

export class InputController {

    constructor( game ){
        this.game = game;

        this.mouse_x = 100;
        this.mouse_y = 100;

        this.is_mouse_holding = false;

    }
    setup(){
        this.game.canvas_element.onmousedown = this.on_mouse_down.bind(this)
        this.game.canvas_element.onmouseup = this.on_mouse_up.bind(this)
        this.game.canvas_element.onmousemove = this.on_mouse_move.bind(this)

        document.addEventListener('keydown', this.on_key_down);
        document.addEventListener('keyup', this.on_key_up);
    }
    on_key_down(e) {
        if(!e.repeat){
            // リピートは捨てる
            console.log('key_down', e.key);
    	   return false;
        }
    }

    on_key_up(e) {
        console.log('key_up', e.key);
    	return false;
    }

    on_mouse_down( event ){
        let bcr = this.game.canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
        this.is_mouse_holding = true;
        console.log('mouse_down', this.mouse_x, this.mouse_y);
        return false;
    }

    on_mouse_up( event ){
        let bcr = this.game.canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
        this.is_mouse_holding = false;
        console.log('mouse_up', this.mouse_x, this.mouse_y);
        return false;
    }
    on_mouse_move( event ) {
        let bcr = this.game.canvas_element.getBoundingClientRect();
        this.mouse_x = event.clientX -  bcr.x;
        this.mouse_y = event.clientY -  bcr.y;
        return false;
    }

}
