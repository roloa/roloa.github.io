

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

        // スタック関係
        this.is_stackable = false;
        this.max_stack_count = 9;
        this.stack_next = null;
    }
    try_stack_marge( to_stack_item ){
        // アイテムをスタックしようとする
        // スタックできたらtrue
        if( !to_stack_item ){
            // 一応nullチェック
            return false;
        }
        if( !this.is_stackable ){
            // そもそもスタックできるアイテムじゃない
            return false;
        }
        if( this === to_stack_item ){
            // 何かしらの原因で自身にスタックすると面白い事になるので却下
            return false;
        }
        if( this.constructor.name != to_stack_item.constructor.name ){
            // クラスが違う
            return false;
        }
        if( this.max_stack_count <= this.count_stack() ){
            // 自身のスタック上限数に達している
            return false;
        }
        if( to_stack_item.max_stack_count <= to_stack_item.count_stack() ){
            // スタックしようとする側の上限数
            return false;
        }
        if( !this.additional_stack_condition( to_stack_item ) ){
            // 下位クラスでオーバーライドできる追加の条件
            return false;
        }
        this.stack_to_last( to_stack_item );
        return true;
    }
    additional_stack_condition( to_stack_item ) {
        // 追加のスタック条件をオーバーライドできる
        return true;
    }
    stack_to_last( new_stack ){
        if( this.stack_next ){
            this.stack_next.stack_to_last( new_stack );
        } else {
            this.stack_next = new_stack;
        }
    }
    count_stack(){
        // 再帰でスタック数を数える
        if( this.stack_next ){
            return this.stack_next.count_stack() + 1;
        }
        return 1;
    }
    stack_to_array( ary ){
        if( this.stack_next ){
            ary.push( this.stack_next );
            this.stack_next.stack_to_array( ary );
        }
        return ary;
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
    draw_item( canvas, frame_x, frame_y, width, height ){
        canvas.drawImage(
            this.get_image(),
            frame_x,
            frame_y,
            width,
            height );
        canvas.font = 'bold 16px monospace';
        canvas.fillStyle = 'rgb(200,200,200)';
        canvas.strokeStyle = 'rgb(30,30,30)';
        canvas.fillText( this.get_subtitle(),
            frame_x + 3,
            frame_y + height - 3);
        let stack_count = this.count_stack();
        if( 1 < stack_count ){
            canvas.strokeText( stack_count,
                frame_x + 3,
                frame_y + height - 3);
            canvas.fillText( stack_count,
                frame_x + 3,
                frame_y + height - 3);
        }
        // アイテムの耐久値
        let dura_rate = this.get_durability_rate();
        if( dura_rate != 1 ){
            let dura_frame_x = frame_x + 5;
            let dura_width = width - 10;
            let dura_height = 6;
            let dura_frame_y = frame_y + height - dura_height - 4;
            let r = Math.min( 250, Math.max( 1, 500 - 500 * dura_rate ) );
            let g = Math.min( 250, Math.max( 1, 500 * dura_rate ) );
            canvas.fillStyle = 'rgb('+r+','+g+',30)';
            canvas.fillRect( dura_frame_x, dura_frame_y, dura_width * dura_rate , dura_height);
            canvas.strokeStyle = 'rgb(150,150,150)';
            canvas.strokeRect( dura_frame_x, dura_frame_y, dura_width, dura_height);
        }
    }
    save_data( is_skip_stack_data ){
        let data = {};
        data.class_name = this.constructor.name;

        // スタック
        data.item_stack = [];
        if( !is_skip_stack_data ) {
            let stack_array = [];
            this.stack_to_array( stack_array );
            for( let item of stack_array ){
                data.item_stack.push( item.save_data( true ) );
            }
        }

        data.saving_data_serial = JSON.stringify( this.saving_data );

        return data;
    }
    load_data( data ){
        this.saving_data = JSON.parse( data.saving_data_serial );
        if( this.saving_data.image_name ){
            this.set_image( this.saving_data.image_name )
        }
        // スタック
        let stack_last = null;
        if( data.item_stack ){
            for( let serialized_item of data.item_stack ){
                let item = this.game.save_data_manager.deserialize_item( serialized_item );
                item.stack_next = stack_last;
                stack_last = item;
            }
        }
        this.stack_next = stack_last;
    }
}
