

export class MenuUpgrade {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(20,20,20)';
    static TITLE_FONT = 'bold 32px monospace'

    static LIST_X = 20;
    static LIST_Y = 60;
    static LIST_WIDTH = 300;
    static LIST_HEIGHT = 320;

    static LIST_TEXT_MARGIN_LEFT = 24;
    static LIST_TEXT_MARGIN_TOP = 30;
    static LIST_TEXT_FONT = 'bold 20px monospace';
    static LIST_TEXT_COLOR = 'rgb(240,240,240)';
    static LIST_TEXT_COLOR_DISABLE = 'rgb(100,100,100)'
    static LIST_TEXT_HEIGHT = 30;

    static LIST_CURSOR_COLOR = 'rgb(20,150,20)';
    static LIST_CURSOR_ADJUST = 6;

    static DESC_TEXT_X = 340;
    static DESC_TEXT_Y = 60;
    static DESC_TEXT_FONT = 'bold 18px monospace';
    static DESC_TEXT_COLOR = 'rgb(20,20,20)';
    static DESC_TEXT_COLOR_GREEN = 'rgb(20,200,20)';
    static DESC_TEXT_COLOR_RED = 'rgb(200,20,20)';
    static DESC_TEXT_HEIGHT = 28;

    static UPGRADE_BUTTON_X = 400;
    static UPGRADE_BUTTON_Y = 330;
    static UPGRADE_BUTTON_HEIGHT = 50;
    static UPGRADE_BUTTON_WIDTH =  200;
    static UPGRADE_BUTTON_COLOR = 'rgb(160,160,160)';
    static UPGRADE_BUTTON_TEXT_COLOR = 'rgb(20,20,20)';
    static UPGRADE_BUTTON_FONT = 'bold 24px monospace';
    static UPGRADE_BUTTON_TEXT_Y = 32;
    static UPGRADE_BUTTON_TEXT_X = 45;




    constructor( game ){
        this.game = game;

        this.upgrade_list = []
        this.upgrade_list[0] = 'グライダー Lv1'
        this.upgrade_list[1] = '乾燥棚'
        this.upgrade_list[2] = 'ほげほげほげほげほげ'
        this.upgrade_list[3] = '12345678901234567890'

        this.upgrade_cursor = 0;
        this.upgrade_scroll = 0;
        this.menu_icon = this.game.image_library.get_image( 'text_mu' );
    }
    get_menu_icon(){
        return this.menu_icon;
    }

    on_update(){

        if( this.game.input_controller.is_pressed_key['KeyW'] ){
            this.upgrade_cursor -= 1
        }
        if( this.game.input_controller.is_pressed_key['KeyS'] ){
            this.upgrade_cursor += 1
        }
    }
    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuUpgrade.TITLE_COLOR;
        canvas.font = MenuUpgrade.TITLE_FONT
        canvas.fillText( 'アップグレード Upgrade' ,
            MenuUpgrade.TITLE_X ,MenuUpgrade.TITLE_Y);

        // アプグレリスト
        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.fillRect( MenuUpgrade.LIST_X, MenuUpgrade.LIST_Y, MenuUpgrade.LIST_WIDTH, MenuUpgrade.LIST_HEIGHT　);

        for( let i = 0 ; i < 10 ; i++ ){
            // カーソル
            if( i == this.upgrade_cursor ){
                canvas.fillStyle = MenuUpgrade.LIST_CURSOR_COLOR;
                canvas.fillRect( MenuUpgrade.LIST_X ,
                MenuUpgrade.LIST_Y + MenuUpgrade.LIST_TEXT_MARGIN_TOP + MenuUpgrade.LIST_CURSOR_ADJUST +
                MenuUpgrade.LIST_TEXT_HEIGHT * i ,
                MenuUpgrade.LIST_WIDTH, - MenuUpgrade.LIST_TEXT_HEIGHT );
            }
            if( this.upgrade_list[ i ] ){
                canvas.fillStyle = MenuUpgrade.LIST_TEXT_COLOR;
                canvas.font = MenuUpgrade.LIST_TEXT_FONT;
                canvas.fillText( this.upgrade_list[ i ] ,
                    MenuUpgrade.LIST_X + MenuUpgrade.LIST_TEXT_MARGIN_LEFT,
                    MenuUpgrade.LIST_Y + MenuUpgrade.LIST_TEXT_MARGIN_TOP + MenuUpgrade.LIST_TEXT_HEIGHT * i);
            }
        }
        // アプグレ説明文など
        canvas.font = MenuUpgrade.DESC_TEXT_FONT;

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR;
        canvas.fillText( '・アップグレード名' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 1);

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR;
        canvas.fillText( '  グライダーを強化します。' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 2);

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR;
        canvas.fillText( '  上昇力がさらにアップします。' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 3);

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR;
        canvas.fillText( '  (説明文3)' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 4);

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR;
        canvas.fillText( '・必要資材' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 5);

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR_GREEN;
        canvas.fillText( '  資材1 ....   7 / (  42 )' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 6);

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材2 ....   7 / ( 3  )' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 7);

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材3 ....   7 / ( 3  )' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 8);

        canvas.fillStyle = MenuUpgrade.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材4 ....   7 / ( 3  )' ,
        MenuUpgrade.DESC_TEXT_X,
        MenuUpgrade.DESC_TEXT_Y + MenuUpgrade.DESC_TEXT_HEIGHT * 9);

        // アップグレードボタン
        canvas.fillStyle = MenuUpgrade.UPGRADE_BUTTON_COLOR;
        canvas.fillRect( MenuUpgrade.UPGRADE_BUTTON_X, MenuUpgrade.UPGRADE_BUTTON_Y, MenuUpgrade.UPGRADE_BUTTON_WIDTH, MenuUpgrade.UPGRADE_BUTTON_HEIGHT )
        canvas.fillStyle = MenuUpgrade.UPGRADE_BUTTON_TEXT_COLOR;
        canvas.font = MenuUpgrade.UPGRADE_BUTTON_FONT;
        canvas.fillText(
            '実行! (X)',
            MenuUpgrade.UPGRADE_BUTTON_X + MenuUpgrade.UPGRADE_BUTTON_TEXT_X,
            MenuUpgrade.UPGRADE_BUTTON_Y + MenuUpgrade.UPGRADE_BUTTON_TEXT_Y
        );

    }
}
