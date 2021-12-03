

export class MenuInventory {

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

    }
    on_update(){

    }
    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuInventory.TITLE_COLOR;
        canvas.font = MenuInventory.TITLE_FONT
        canvas.fillText( 'インベントリ Inventory' ,
            MenuInventory.TITLE_X ,MenuInventory.TITLE_Y);

        // アプグレリスト
        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.fillRect( MenuInventory.LIST_X, MenuInventory.LIST_Y, MenuInventory.LIST_WIDTH, MenuInventory.LIST_HEIGHT　);

        for( let i = 0 ; i < 10 ; i++ ){
            if( this.upgrade_list[ i ] ){
                canvas.fillStyle = MenuInventory.LIST_TEXT_COLOR;
                canvas.font = MenuInventory.LIST_TEXT_FONT;
                canvas.fillText( this.upgrade_list[ i ] ,
                    MenuInventory.LIST_X + MenuInventory.LIST_TEXT_MARGIN_LEFT,
                    MenuInventory.LIST_Y + MenuInventory.LIST_TEXT_MARGIN_TOP + MenuInventory.LIST_TEXT_HEIGHT * i);
            }
        }
        // アプグレ説明文など
        canvas.font = MenuInventory.DESC_TEXT_FONT;

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR;
        canvas.fillText( '・アップグレード名' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 1);

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR;
        canvas.fillText( '  グライダーを強化します。' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 2);

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR;
        canvas.fillText( '  上昇力がさらにアップします。' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 3);

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR;
        canvas.fillText( '  (説明文3)' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 4);

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR;
        canvas.fillText( '・必要資材' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 5);

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR_GREEN;
        canvas.fillText( '  資材1 ....   7 / (  42 )' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 6);

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材2 ....   7 / ( 3  )' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 7);

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材3 ....   7 / ( 3  )' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 8);

        canvas.fillStyle = MenuInventory.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材4 ....   7 / ( 3  )' ,
        MenuInventory.DESC_TEXT_X,
        MenuInventory.DESC_TEXT_Y + MenuInventory.DESC_TEXT_HEIGHT * 9);

        // アップグレードボタン
        canvas.fillStyle = MenuInventory.UPGRADE_BUTTON_COLOR;
        canvas.fillRect( MenuInventory.UPGRADE_BUTTON_X, MenuInventory.UPGRADE_BUTTON_Y, MenuInventory.UPGRADE_BUTTON_WIDTH, MenuInventory.UPGRADE_BUTTON_HEIGHT )
        canvas.fillStyle = MenuInventory.UPGRADE_BUTTON_TEXT_COLOR;
        canvas.font = MenuInventory.UPGRADE_BUTTON_FONT;
        canvas.fillText(
            '実行! (X)',
            MenuInventory.UPGRADE_BUTTON_X + MenuInventory.UPGRADE_BUTTON_TEXT_X,
            MenuInventory.UPGRADE_BUTTON_Y + MenuInventory.UPGRADE_BUTTON_TEXT_Y
        );

    }
}
