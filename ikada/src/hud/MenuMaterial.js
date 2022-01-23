
//import {} from './craft_recipe.js'

export class MenuMaterial {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(20,20,20)';
    static TITLE_FONT = 'bold 32px monospace'

    static TEXT_X = 60;
    static TEXT_Y = 100;
    static TEXT_FONT = 'bold 18px monospace';
    static TEXT_COLOR = 'rgb(20,20,20)';
    static TEXT_HEIGHT = 28;
    static TEXT_X_COUNT = 180;

    static COLUMN_WIDTH = 210;
    static ROW_IN_COLUMN = 10;

    constructor( game ){
        this.game = game;

        this.cursor_index = 0;
        this.menu_icon = this.game.image_library.get_image( 'kouji_shizai_okiba' );
    }
    get_menu_icon(){
        return this.menu_icon;
    }

    on_update(){

        // TODO 範囲外
        if( this.game.input_controller.get_press_down() ){
            this.cursor_index += 1;
        }
        if( this.game.input_controller.get_press_up() ){
            this.cursor_index -= 1;
        }
    }
    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuMaterial.TITLE_COLOR;
        canvas.font = MenuMaterial.TITLE_FONT
        canvas.fillText( 'マテリアル Material' ,
            MenuMaterial.TITLE_X ,MenuMaterial.TITLE_Y);

        // マテリアルのリスト
        canvas.font = MenuMaterial.TEXT_FONT;
        canvas.fillStyle = MenuMaterial.TEXT_COLOR;

        let row = 0;
        let column = 0;
        for( let material_id in this.game.materials.name_list ){
            if( 0 < this.game.materials.list[material_id] ){
                canvas.fillText( this.game.materials.name_list[material_id] ,
                MenuMaterial.TEXT_X + MenuMaterial.COLUMN_WIDTH * column,
                MenuMaterial.TEXT_Y + MenuMaterial.TEXT_HEIGHT * row);

                canvas.fillText( this.game.materials.list[material_id] ,
                MenuMaterial.TEXT_X_COUNT + MenuMaterial.COLUMN_WIDTH * column,
                MenuMaterial.TEXT_Y + MenuMaterial.TEXT_HEIGHT * row);
            }
            row += 1;
            if( MenuMaterial.ROW_IN_COLUMN <= row) {
                row = 0;
                column += 1;
            }
        }

    }
}
