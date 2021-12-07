
import {CraftRecipe} from './craft_recipe.js'

export class MenuCraft {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(20,20,20)';
    static TITLE_FONT = 'bold 32px monospace'


    static LIST_CURSOR_COLOR = 'rgb(20,150,20)';
    static LIST_CURSOR_ADJUST = 6;

    static DESC_TEXT_X = 340;
    static DESC_TEXT_Y = 60;
    static DESC_TEXT_FONT = 'bold 18px monospace';
    static DESC_TEXT_COLOR = 'rgb(20,20,20)';
    static DESC_TEXT_COLOR_GREEN = 'rgb(20,200,20)';
    static DESC_TEXT_COLOR_RED = 'rgb(200,20,20)';
    static DESC_TEXT_HEIGHT = 28;

    static CRAFT_BUTTON_X = 400;
    static CRAFT_BUTTON_Y = 330;
    static CRAFT_BUTTON_HEIGHT = 50;
    static CRAFT_BUTTON_WIDTH =  200;
    static CRAFT_BUTTON_COLOR = 'rgb(160,160,160)';
    static CRAFT_BUTTON_TEXT_COLOR = 'rgb(20,20,20)';
    static CRAFT_BUTTON_FONT = 'bold 24px monospace';
    static CRAFT_BUTTON_TEXT_Y = 32;
    static CRAFT_BUTTON_TEXT_X = 45;

    static LIST_X = 20;
    static LIST_Y = 60;
    static LIST_ICON_SIZE = 50;
    static LIST_SPACING = 10;
    static LIST_X_COUNT = 5;
    static LIST_Y_COUNT = 7;
    static LIST_ICON_FRAME_COLOR = 'rgb(20,20,20)';
    static LIST_ICON_FRAME_COLOR_SELECTED = 'rgb(200,20,20)';


    constructor( game ){
        this.game = game;

        this.craft_recipe = new CraftRecipe( this.game );

        this.cursor_index = 0;
        this.list_scroll = 0;
    }
    on_update(){

        // TODO 範囲外
        if( this.game.input_controller.is_pressed_key['KeyD'] ){
            this.cursor_index += 1;
        }
        if( this.game.input_controller.is_pressed_key['KeyA'] ){
            this.cursor_index -= 1;
        }
        if( this.game.input_controller.is_pressed_key['KeyW'] ){
            if( MenuCraft.LIST_X_COUNT < this.cursor_index ){
                this.cursor_index -= MenuCraft.LIST_X_COUNT;
            }
        }
        if( this.game.input_controller.is_pressed_key['KeyS'] ){
            if( MenuCraft.LIST_X_COUNT + this.cursor_index < 25  ){
                this.cursor_index += MenuCraft.LIST_X_COUNT;
            }
        }
    }
    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuCraft.TITLE_COLOR;
        canvas.font = MenuCraft.TITLE_FONT
        canvas.fillText( 'クラフト Craft' ,
            MenuCraft.TITLE_X ,MenuCraft.TITLE_Y);

        // アプグレリスト
        canvas.fillStyle = 'rgb(20,20,20)';
//        canvas.fillRect( MenuCraft.LIST_X, MenuCraft.LIST_Y, MenuCraft.LIST_WIDTH, MenuCraft.LIST_HEIGHT　);

    // インベントリのアイテムリスト
    for( let i = 0 ; i < 25 ; i++ ){
        if( this.cursor_index == i ){
            canvas.strokeStyle = MenuCraft.LIST_ICON_FRAME_COLOR_SELECTED;
        } else {
            canvas.strokeStyle = MenuCraft.LIST_ICON_FRAME_COLOR;
        }
        let x = i % MenuCraft.LIST_X_COUNT;
        let y = Math.floor( i / MenuCraft.LIST_X_COUNT);
        let frame_x = MenuCraft.LIST_X + x * (MenuCraft.LIST_ICON_SIZE + MenuCraft.LIST_SPACING);
        let frame_y = MenuCraft.LIST_Y + y * (MenuCraft.LIST_ICON_SIZE + MenuCraft.LIST_SPACING);

        if( this.craft_recipe.recipe_list[ i ] ){
            if( this.craft_recipe.recipe_list[ i ].image ) {
                canvas.drawImage( this.craft_recipe.recipe_list[ i ].image ,
                frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );
            }
        }
        canvas.strokeRect( frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );


    }


        // アプグレ説明文など
        canvas.font = MenuCraft.DESC_TEXT_FONT;

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
        canvas.fillText( '・アップグレード名' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
        canvas.fillText( '  グライダーを強化します。' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
        canvas.fillText( '  上昇力がさらにアップします。' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 3);

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
        canvas.fillText( '  (説明文3)' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 4);

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
        canvas.fillText( '・必要資材' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 5);

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR_GREEN;
        canvas.fillText( '  資材1 ....   7 / (  42 )' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 6);

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材2 ....   7 / ( 3  )' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 7);

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材3 ....   7 / ( 3  )' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 8);

        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR_RED;
        canvas.fillText( '  資材4 ....   7 / ( 3  )' ,
        MenuCraft.DESC_TEXT_X,
        MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 9);

        // アップグレードボタン
        canvas.fillStyle = MenuCraft.CRAFT_BUTTON_COLOR;
        canvas.fillRect( MenuCraft.CRAFT_BUTTON_X, MenuCraft.CRAFT_BUTTON_Y, MenuCraft.CRAFT_BUTTON_WIDTH, MenuCraft.CRAFT_BUTTON_HEIGHT )
        canvas.fillStyle = MenuCraft.CRAFT_BUTTON_TEXT_COLOR;
        canvas.font = MenuCraft.CRAFT_BUTTON_FONT;
        canvas.fillText(
            '実行! (X)',
            MenuCraft.CRAFT_BUTTON_X + MenuCraft.CRAFT_BUTTON_TEXT_X,
            MenuCraft.CRAFT_BUTTON_Y + MenuCraft.CRAFT_BUTTON_TEXT_Y
        );

    }
}
