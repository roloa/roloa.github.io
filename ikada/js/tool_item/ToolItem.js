

export class ToolItem {

    constructor( game ){

        this.game = game;

        this.image = this.game.image_library.get_image( './img/illustya/text_mu.png' );

        this.saving_data = {}

        this.saving_data.item_name = 'noname item'

        // デフォルトの料理時間
        this.cooking_finish_time = 500;

        // 消費されたかどうか
        this.is_consumed = false;

    }

    set_image( file_name ){
        this.image = this.game.image_library.get_image( file_name )
        this.saving_data.image_name = file_name;
    }
    get_image(){
        return this.image;
    }
    get_name(){
        return this.saving_data.item_name;
    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('default ToolItem onclick!')
    }
    save_data(){
        let data = {};
        data.class_name = this.constructor.name;
        data.saving_data_serial = JSON.stringify( this.saving_data );

        return data;
    }
    load_data( data ){
        this.saving_data = JSON.parse( data.saving_data_serial );
        if( this.saving_data.image_name ){
            this.set_image( this.saving_data.image_name )
        }
    }
}
