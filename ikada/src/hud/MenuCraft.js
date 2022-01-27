
import {CraftRecipe} from '../recipes/CraftRecipe.js'
import {HudMenu} from './HudMenu.js'

export class MenuCraft {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(40,30,20)';
    static TITLE_FONT = 'bold 32px monospace'


    static LIST_CURSOR_COLOR = 'rgb(20,150,20)';
    static LIST_CURSOR_ADJUST = 6;

    static DESC_TEXT_X = 340;
    static DESC_TEXT_Y = 60;
    static DESC_TEXT_FONT = 'bold 18px monospace';
    static DESC_TEXT_COLOR = 'rgb(40,30,20)';
    static DESC_TEXT_COLOR_GREEN = 'rgb(20,200,20)';
    static DESC_TEXT_COLOR_RED = 'rgb(200,20,20)';
    static DESC_TEXT_HEIGHT = 28;

    static CRAFT_BUTTON_X = 400;
    static CRAFT_BUTTON_Y = 330;
    static CRAFT_BUTTON_HEIGHT = 50;
    static CRAFT_BUTTON_WIDTH =  200;
    static CRAFT_BUTTON_COLOR = 'rgb(160,160,160)';
    static CRAFT_BUTTON_TEXT_COLOR = 'rgb(40,30,20)';
    static CRAFT_BUTTON_FONT = 'bold 24px monospace';
    static CRAFT_BUTTON_TEXT_Y = 32;
    static CRAFT_BUTTON_TEXT_X = 15;

    static LIST_X = 20;
    static LIST_Y = 60;
    static LIST_ICON_SIZE = 50;
    static LIST_SPACING = 10;
    static LIST_X_COUNT = 5;
    static LIST_Y_COUNT = 5;
    static LIST_COUNT = MenuCraft.LIST_X_COUNT * MenuCraft.LIST_Y_COUNT;
    static LIST_ICON_FRAME_COLOR = 'rgb(40,30,20)';
    static LIST_ICON_FRAME_COLOR_SELECTED = 'rgb(200,20,20)';
    static LIST_ICON_FRAME_COLOR_ACTIVE_CATEGORY = 'rgb(20,200,20)';

    constructor( game ){
        this.game = game;

        this.craft_recipe = new CraftRecipe( this.game );

        this.cursor_index = 0;
        this.category_index = 0;
        this.menu_icon = this.game.image_library.get_image( 'kids_mokkou_kyoushitsu_boy' );
        this.batsu_icon = this.game.image_library.get_image( 'batsu' );

        this.icon_next_category = this.game.image_library.get_image( 'arrow_color12_play_flip' );
        this.icon_prev_category = this.game.image_library.get_image( 'arrow_color12_play' );

    }
    get_menu_icon(){
        return this.menu_icon;
    }
    on_update(){

        // カーソル移動
        if( this.game.input_controller.get_press_right() ){
            if( this.cursor_index < MenuCraft.LIST_COUNT - 1 ){
                this.cursor_index += 1;
            }
        }
        if( this.game.input_controller.get_press_left() ){
            if( 0 < this.cursor_index ){
                this.cursor_index -= 1;
            }
        }
        if( this.game.input_controller.get_press_up() ){
            if( MenuCraft.LIST_X_COUNT <= this.cursor_index ){
                this.cursor_index -= MenuCraft.LIST_X_COUNT;
            }
        }
        if( this.game.input_controller.get_press_down() ){
            if( MenuCraft.LIST_X_COUNT + this.cursor_index < MenuCraft.LIST_COUNT  ){
                this.cursor_index += MenuCraft.LIST_X_COUNT;
            }
        }
        // マウス操作
        if( this.game.input_controller.get_mouse_press() ) {
            this.on_click(
                this.game.input_controller.mouse_x - HudMenu.MENU_MARGIN_LEFT,
                this.game.input_controller.mouse_y - HudMenu.MENU_MARGIN_TOP );
        }

        // クラフト実行
        if( this.game.input_controller.get_press_enter() ||
            this.game.input_controller.get_press_space() ){
            if ( this.cursor_index == 0 || this.cursor_index == 1 ) {
                // 前のレシピカテゴリ
                if( 0 < this.category_index ){
                    this.category_index -= 1;
                } else {
                    this.category_index = CraftRecipe.CATEGORY_COUNT - 1;
                }
            } else if ( this.cursor_index == 4 || this.cursor_index == 3 ){
                // 次
                if( this.category_index < CraftRecipe.CATEGORY_COUNT - 1){
                    this.category_index += 1;
                } else {
                    this.category_index = 0;
                }
            } else {
                // 一般レシピ
                this.execute_craft();
            }
        }

    }
    execute_craft(){
        let recipe = this.craft_recipe.get_recipe( this.category_index, this.cursor_index - MenuCraft.LIST_X_COUNT );
        if( recipe ){
            // カーソル位置にレシピが存在する
            if( this.game.hud.item_slot.has_empty_space( true ) ){
                if( this.take_recipe_materials( recipe ) ){
                    // マテリアルが十分にあり、消費できた
                    // アイテムを入手
                    this.game.hud.item_slot.put_pickup_item( recipe.result_func( this.game ), true )

                    this.game.log('クラフトしました。')
                } else {
                    this.game.log('マテリアルが足りません。')
                }
            } else {
                this.game.log('アイテムスロットがいっぱいです。')
            }
        }
    }
    take_recipe_materials( recipe ){
        // レシピの材料マテリアルが足りているかを調べ
        // 足りている場合は必要数を消費してtrueを返す
        if ( !this.check_recipe_materials( recipe ) ){
            return false;
        }
        for( let i = 0 ; i < recipe.material_list.length ; i++ ){
            this.game.materials.take_material( recipe.material_list[i], recipe.material_count_list[i] );
        }
        return true;
    }
    check_recipe_materials( recipe ){
        // レシピの材料マテリアルが足りているかを調べるだけ
        for( let i = 0 ; i < recipe.material_list.length ; i++ ){
            if( this.game.materials.get_material( recipe.material_list[i] ) < recipe.material_count_list[i] ){
                return false;
            }
        }
        return true;
    }
    check_recipe_unlocked( recipe ){
        // レシピの最初の材料を1つ以上持っているか
        if( 0 < this.game.materials.get_material( recipe.material_list[0] ) ){
            return true;
        }
        return false;
    }
    on_click( mouse_x, mouse_y ){
        // レシピリスト
        for( let i = 0 ; i < MenuCraft.LIST_COUNT ; i++){
            let x = i % MenuCraft.LIST_X_COUNT;
            let y = Math.floor( i / MenuCraft.LIST_X_COUNT);
            let frame_x = MenuCraft.LIST_X + x * (MenuCraft.LIST_ICON_SIZE + MenuCraft.LIST_SPACING);
            let frame_y = MenuCraft.LIST_Y + y * (MenuCraft.LIST_ICON_SIZE + MenuCraft.LIST_SPACING);
            if( frame_x < mouse_x && mouse_x < frame_x + MenuCraft.LIST_ICON_SIZE &&
                frame_y < mouse_y && mouse_y < frame_y + MenuCraft.LIST_ICON_SIZE ){
                this.cursor_index = i;

                // カーソルがカテゴリ選択に合った場合
                if ( this.cursor_index == 0 || this.cursor_index == 1 ) {
                    // 前のレシピカテゴリ
                    if( 0 < this.category_index ){
                        this.category_index -= 1;
                    } else {
                        this.category_index = CraftRecipe.CATEGORY_COUNT - 1;
                    }
                } else if ( this.cursor_index == 4 || this.cursor_index == 3 ){
                    // 次
                    if( this.category_index < CraftRecipe.CATEGORY_COUNT - 1){
                        this.category_index += 1;
                    } else {
                        this.category_index = 0;
                    }
                }
                break;
            }
        }
        // クラフト実行ボタン
        if( MenuCraft.CRAFT_BUTTON_X < mouse_x && mouse_x < MenuCraft.CRAFT_BUTTON_X + MenuCraft.CRAFT_BUTTON_WIDTH  &&
            MenuCraft.CRAFT_BUTTON_Y < mouse_y && mouse_y < MenuCraft.CRAFT_BUTTON_Y + MenuCraft.CRAFT_BUTTON_HEIGHT
        ) {
            this.execute_craft();
        }
    }


    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuCraft.TITLE_COLOR;
        canvas.font = MenuCraft.TITLE_FONT
        canvas.fillText( 'クラフト Craft' ,
            MenuCraft.TITLE_X ,MenuCraft.TITLE_Y);

        canvas.fillStyle = 'rgb(40,30,20)';
//        canvas.fillRect( MenuCraft.LIST_X, MenuCraft.LIST_Y, MenuCraft.LIST_WIDTH, MenuCraft.LIST_HEIGHT　);

        // インベントリのアイテムリスト
        for( let i = 0 ; i < MenuCraft.LIST_COUNT ; i++ ){

            if( this.cursor_index == i ){
                canvas.strokeStyle = MenuCraft.LIST_ICON_FRAME_COLOR_SELECTED;
            } else {
                canvas.strokeStyle = MenuCraft.LIST_ICON_FRAME_COLOR;
            }
            let x = i % MenuCraft.LIST_X_COUNT;
            let y = Math.floor( i / MenuCraft.LIST_X_COUNT);
            let frame_x = MenuCraft.LIST_X + x * (MenuCraft.LIST_ICON_SIZE + MenuCraft.LIST_SPACING);
            let frame_y = MenuCraft.LIST_Y + y * (MenuCraft.LIST_ICON_SIZE + MenuCraft.LIST_SPACING);

            let recipe = this.craft_recipe.get_recipe( this.category_index, i - MenuCraft.LIST_X_COUNT );

            canvas.font = 'bold 16px monospace';
            canvas.fillStyle = 'rgb(50,50,50)';
            // 外枠
            canvas.strokeRect( frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );

            if( i == 0 ){
                // 前のレシピカテゴリ
                canvas.drawImage( this.icon_prev_category ,
                frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );
            } else if( i == 1) {
                canvas.drawImage( this.craft_recipe.get_category_icon( this.category_index - 1) ,
                frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );
            } else if( i == 2) {
                // レシピカテゴリアイコン
                canvas.drawImage( this.craft_recipe.get_category_icon( this.category_index ) ,
                frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );
                canvas.strokeStyle = MenuCraft.LIST_ICON_FRAME_COLOR_ACTIVE_CATEGORY;
                canvas.strokeRect( frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );

            } else if( i == 3) {
                canvas.drawImage( this.craft_recipe.get_category_icon( this.category_index + 1) ,
                frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );
            } else if( i == 4) {
                // 次のレシピカテゴリ
                canvas.drawImage( this.icon_next_category ,
                frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );
            } else if( recipe ){
                // レシピ
                if( this.check_recipe_unlocked( recipe )){

                    if( recipe.image ) {
                        canvas.drawImage( recipe.image ,
                        frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );
                        canvas.fillText( recipe.recipe_subtitle,
                            frame_x, frame_y + MenuCraft.LIST_ICON_SIZE- 3);
                    }
                    // TODO 毎フレームにレシピ材料チェックしたらぜったいおもい

                    if( !this.check_recipe_materials( recipe ) ){
                        // 作れない場合はバツをつける

                        canvas.drawImage( this.batsu_icon ,
                        frame_x, frame_y, MenuCraft.LIST_ICON_SIZE, MenuCraft.LIST_ICON_SIZE );
                        canvas.fillText( recipe.recipe_subtitle,
                            frame_x, frame_y + MenuCraft.LIST_ICON_SIZE- 3);
                    }
                } else {
                    // 未開放レシピ
                }
            } else {
                // アイテムも機能もないところ
            }
        }
        canvas.font = MenuCraft.DESC_TEXT_FONT;
        canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;

        if( this.cursor_index == 0 ){
            canvas.fillText( '前のカテゴリ' ,MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);
        } else if( this.cursor_index == 1){
            // canvas.fillText( '前のカテゴリ' ,MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);
            // canvas.fillText( this.craft_recipe.get_category_name( this.category_index - 1) ,MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);
            canvas.fillText( '現在のカテゴリ' , MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);
            canvas.fillText( this.craft_recipe.get_category_name( this.category_index ) ,MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);
        } else if( this.cursor_index == 2){
            canvas.fillText( '現在のカテゴリ' , MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);
            canvas.fillText( this.craft_recipe.get_category_name( this.category_index ) ,MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);
        } else if( this.cursor_index == 3){
            // canvas.fillText( '次のカテゴリ' , MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);
            // canvas.fillText( this.craft_recipe.get_category_name( this.category_index + 1) ,MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);
            canvas.fillText( '現在のカテゴリ' , MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);
            canvas.fillText( this.craft_recipe.get_category_name( this.category_index ) ,MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);
        } else if( this.cursor_index == 4){
            canvas.fillText( '次のカテゴリ' , MenuCraft.DESC_TEXT_X, MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);
        } else {
            let current_recipe = this.craft_recipe.get_recipe( this.category_index, this.cursor_index - MenuCraft.LIST_X_COUNT );
            if( current_recipe && this.check_recipe_unlocked( current_recipe ) ) {
                // アプグレ説明文など
                canvas.fillText( current_recipe.sample_item.get_name() ,
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);

                // クラフト説明
                canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
                canvas.fillText( current_recipe.description_list[0],
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);
                if( current_recipe.description_list[1]) {
                    canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
                    canvas.fillText( current_recipe.description_list[1],
                    MenuCraft.DESC_TEXT_X,
                    MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 3);
                }

                // 必要マテリアル
                canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
                canvas.fillText( '・必要資材' ,
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 4);
                for( let i = 0 ; i < current_recipe.material_list.length ; i++ ){
                    let material_id = current_recipe.material_list[i];
                    // 名前
                    canvas.fillStyle = MenuCraft.DESC_TEXT_COLOR;
                    canvas.fillText( this.game.materials.name_list[ material_id ],
                    MenuCraft.DESC_TEXT_X,
                    MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * (5 + i));
                    // 必要
                    canvas.fillText( current_recipe.material_count_list[ i ],
                    MenuCraft.DESC_TEXT_X + 150,
                    MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * (5 + i));
                    // 所持
                    canvas.fillText( this.game.materials.list[ material_id ],
                    MenuCraft.DESC_TEXT_X + 250,
                    MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * (5 + i));

                }
            } else {
                canvas.fillText( 'レシピに必要なマテリアルのうち' ,
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 1);
                canvas.fillText( '一番上の材料がキー素材になっています。' ,
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 2);
                canvas.fillText( 'キー素材を1個でも所持することで' ,
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 4);
                canvas.fillText( 'レシピが開放されます。' ,
                MenuCraft.DESC_TEXT_X,
                MenuCraft.DESC_TEXT_Y + MenuCraft.DESC_TEXT_HEIGHT * 5);

            }
        }
        // アップグレードボタン
        canvas.fillStyle = MenuCraft.CRAFT_BUTTON_COLOR;
        canvas.fillRect( MenuCraft.CRAFT_BUTTON_X, MenuCraft.CRAFT_BUTTON_Y, MenuCraft.CRAFT_BUTTON_WIDTH, MenuCraft.CRAFT_BUTTON_HEIGHT )
        canvas.fillStyle = MenuCraft.CRAFT_BUTTON_TEXT_COLOR;
        canvas.font = MenuCraft.CRAFT_BUTTON_FONT;
        canvas.fillText(
            '実行! (Enter)',
            MenuCraft.CRAFT_BUTTON_X + MenuCraft.CRAFT_BUTTON_TEXT_X,
            MenuCraft.CRAFT_BUTTON_Y + MenuCraft.CRAFT_BUTTON_TEXT_Y
        );

    }
}
