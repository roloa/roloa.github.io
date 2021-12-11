

export class ToolItem {

    constructor( game ){

        this.game = game;
        this.name = 'noname item'

        this.image = this.game.image_library.get_image( './img/illustya/text_mu.png' );

        // 消費されたかどうか
        this.is_consumed = false;

    }

    set_image( file_name ){
        this.image = this.game.image_library.get_image( file_name )
    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('default ToolItem onclick!')
    }
    save_data(){
        let data = {};
        data.class_name = this.constructor.name;
        return data;
    }
    load_data( data ){
        
    }
}
