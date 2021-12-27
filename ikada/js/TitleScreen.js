

export class TitleScreen extends Object {

    static MENU_MARGIN_TOP = 200;
    static MENU_MARGIN_LEFT = 300;
    static MENU_FONT = 'bold 24px monospace';
    static MENU_COLOR = 'rgb(250,250,250)';
    static MENU_COLOR_ACTIVE = 'rgb(150,250,150)';

    static MENU_ITEM_HEIGHT = 50;
    static MENU_ITEM_WIDTH = 300;
    static MENU_TEXT_MARGIN = 10;
    static MENU_ARROW_X = 50;

    constructor( game ){
        super( game );
        this.game = game;

        this.savedata_cursor = 1;

        this.load_menu_string = []
        this.load_menu_string[0] = '新しく始める';
        this.load_menu_string[1] = 'オートセーブをロード';
        this.load_menu_string[2] = 'データ[1]をロード';
        this.load_menu_string[3] = 'データ[2]をロード';
        //this.load_menu_string[4] = 'データ[3]をロード';
        this.data_item_count = 4;
    }
    on_update(){
        if( this.game.input_controller.get_press_enter() ||
            this.game.input_controller.get_press_space() ) {
            // this.game.log('ロードします。');
            this.select_menu( this.savedata_cursor );
        }
        if( this.game.input_controller.get_press_up() ) {
            if( 0 < this.savedata_cursor ){
                this.savedata_cursor -= 1;
            }
        }
        if( this.game.input_controller.get_press_down() ) {
            if( this.savedata_cursor < this.data_item_count - 1){
                this.savedata_cursor += 1;
            }
        }


        // マウス操作
        if( this.game.input_controller.get_mouse_press() ){
            if( TitleScreen.MENU_MARGIN_LEFT - TitleScreen.MENU_ARROW_X < this.game.input_controller.mouse_x &&
                TitleScreen.MENU_MARGIN_LEFT + TitleScreen.MENU_ITEM_WIDTH > this.game.input_controller.mouse_x
             ){
                 for(let i = 0 ; i < this.data_item_count ; i++){
                     if( TitleScreen.MENU_MARGIN_TOP + TitleScreen.MENU_ITEM_HEIGHT * (i    ) < this.game.input_controller.mouse_y &&
                         TitleScreen.MENU_MARGIN_TOP + TitleScreen.MENU_ITEM_HEIGHT * (i + 1) > this.game.input_controller.mouse_y ){
                             this.select_menu( i );
                             break;
                     }
                 }
            }
        }

    }

    select_menu( cursor ){
        if( cursor == 0 ){
            // 新規データ
            this.game.is_there_title = false;
            this.game.log('新しく始めます。');
        } else if( cursor == 1 ){
            this.game.log('オートセーブデータをロードします。');
            if( this.game.save_data_manager.load_game('save_data_auto') ){
                this.game.is_there_title = false;
            }
        } else if( cursor == 2 ){
            this.game.log('データ[1]をロードします。');
            if( this.game.save_data_manager.load_game('save_data_1') ){
                this.game.is_there_title = false;
            }
        } else if( cursor == 3 ){
            this.game.log('データ[2]をロードします。');
            if( this.game.save_data_manager.load_game('save_data_2') ){
                this.game.is_there_title = false;
            }
        } else if( cursor == 4 ){
            this.game.log('データ[3]をロードします。');
            if( this.game.save_data_manager.load_game('save_data_3') ){
                this.game.is_there_title = false;
            }
        }
    }

    on_draw( canvas ){
        canvas.save()
        canvas.font = 'bold 64px monospace';
        canvas.strokeStyle = 'rgb(250,250,250)';
        canvas.fillStyle = 'rgb(250,250,250)';
        canvas.strokeText('Ikada',100,150)
        canvas.font = TitleScreen.MENU_FONT;
        canvas.textBaseline = 'top'
        for( let i = 0 ; i < this.data_item_count ; i++){
            canvas.fillStyle = TitleScreen.MENU_COLOR;
            if( i == this.savedata_cursor ){
                canvas.fillStyle = TitleScreen.MENU_COLOR_ACTIVE;
                canvas.fillText('->',
                    TitleScreen.MENU_MARGIN_LEFT - TitleScreen.MENU_ARROW_X,
                    TitleScreen.MENU_MARGIN_TOP + TitleScreen.MENU_ITEM_HEIGHT * i + TitleScreen.MENU_TEXT_MARGIN)
            }
            canvas.fillText(this.load_menu_string[i],
                TitleScreen.MENU_MARGIN_LEFT + TitleScreen.MENU_TEXT_MARGIN,
                TitleScreen.MENU_MARGIN_TOP + TitleScreen.MENU_ITEM_HEIGHT * i + TitleScreen.MENU_TEXT_MARGIN)
            canvas.strokeRect( TitleScreen.MENU_MARGIN_LEFT, TitleScreen.MENU_MARGIN_TOP + TitleScreen.MENU_ITEM_HEIGHT * i,
                TitleScreen.MENU_ITEM_WIDTH , TitleScreen.MENU_ITEM_HEIGHT );
        }
        canvas.restore()


    }
}
