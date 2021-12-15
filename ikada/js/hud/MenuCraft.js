
import {CraftRecipe} from './CraftRecipe.js'

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

        // カーソル移動
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

        // クラフト実行
        if( this.game.input_controller.is_pressed_key['KeyX'] ){
            if( this.craft_recipe.recipe_list[ this.cursor_index ] ){
                // カーソル位置にレシピが存在する

                // アイテムを入手
                this.game.hud.item_slot.put_pickup_item( this.craft_recipe.recipe_list[ this.cursor_index ].result_func( this.game) )
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

        if( this.craft_recipe.recipe_list[ this.cursor_index ] ){
            // アプグレ説明文など
            canvas.font = MenuCraft.DESC_TEXT_FONT;

            canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
            canvas.fillText( this.craft_recipe.recipe_list[ this.cursor_index ].sample_item.name ,
            MenuCraft.DESC_TEXT_X,
            MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);

            // クラフト説明
            canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
            canvas.fillText( this.craft_recipe.recipe_list[ this.cursor_index ].description_list[0],
            MenuCraft.DESC_TEXT_X,
            MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);
            if( this.craft_recipe.recipe_list[ this.cursor_index ].description_list[1]) {
                canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
                canvas.fillText( this.craft_recipe.recipe_list[ this.cursor_index ].description_list[1],
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 3);
            }

            // 必要マテリアル
            canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
            canvas.fillText( '・必要資材' ,
            MenuCraft.DESC_TEXT_X,
            MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 4);
            for( let i = 0 ; i < this.craft_recipe.recipe_list[ this.cursor_index ].material_list.length ; i++ ){
                let material_id = this.craft_recipe.recipe_list[ this.cursor_index ].material_list[i];
                // 名前
                canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
                canvas.fillText( this.game.materials.name_list[ material_id ],
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * (5 + i));
                // 必要
                canvas.fillText( this.craft_recipe.recipe_list[ this.cursor_index ].material_count_list[ i ],
                MenuCraft.DESC_TEXT_X + 150,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * (5 + i));
                // 所持
                canvas.fillText( this.game.materials.list[ material_id ],
                MenuCraft.DESC_TEXT_X + 250,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * (5 + i));

            }
        }
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