

export class ToolItem {

    constructor( game ){

        this.game = game;

        this.image = this.game.image_library.get_image( './img/illustya/text_mu.png' );

        this.saving_data = {}

        this.saving_data.item_name = 'noname item'
        this.saving_data.item_subtitle = '';

        // デフォルトの料理時間
        this.cooking_finish_time = 500;

        // 消費されたかどうか
        this.is_consumed = false;

        this.saving_data.durability_max = 100;
        this.saving_data.durability = this.saving_data.durability_max;
        this.set_durability( 100 );
    }
    set_durability( du ){
        this.saving_data.durability_max = du;
        this.saving_data.durability = this.saving_data.durability_max;
    }
    get_durability_rate(){
        return this.saving_data.durability / this.saving_data.durability_max;
    }
    consume_durability( amount ){
        if( amount ){
            this.saving_data.durability -= amount;
        } else {
            this.saving_data.durability -= 1;
        }
        if( this.saving_data.durability <= 0 ){
            this.is_consumed = true;
        }
    }
    get_subtitle(){
        return this.saving_data.item_subtitle;
    }
    set_image( file_name ){
        this.image = this.game.image_library.get_image( file_name )
        this.saving_data.image_name = file_name;
    }
    get_image(){
        return this.image;
    }
    set_name( new_name ){
        this.saving_data.item_name = new_name;
    }
    get_name(){
        return this.saving_data.item_name;
    }
    on_update(){

    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        console.log('default ToolItem onclick!')
    }
    on_keep_click( cursor_x, cursor_y, player_x, player_y ) {
        //console.log('default ToolItem keep click!')
    }
    dump_information_to_log(){
        this.game.log( this.saving_data.item_name );
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
