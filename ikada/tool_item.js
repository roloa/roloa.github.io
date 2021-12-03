

export class ToolItem {

    constructor( game ){

        this.game = game;

        this.image = this.game.image_library.get_image( 'text_mu.png' );

    }
    
    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('default ToolItem onclick!')
    }

    on_update(){

    }
    on_draw(){

    }
}
