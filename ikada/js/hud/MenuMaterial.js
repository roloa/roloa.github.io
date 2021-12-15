
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
    static TEXT_X_COUNT = 200;

    constructor( game ){
        this.game = game;

        this.cursor_index = 0;
    }
    on_update(){

        // TODO 範囲外
        if( this.game.input_controller.is_pressed_key['KeyD'] ){
            this.cursor_index += 1;
        }
        if( this.game.input_controller.is_pressed_key['KeyA'] ){
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
        for( let material_id in this.game.materials.name_list ){
            if(true){
                canvas.fillText( this.game.materials.name_list[material_id] ,
                MenuMaterial.TEXT_X,
                MenuMaterial.TEXT_Y + MenuMaterial.TEXT_HEIGHT * row);

                canvas.fillText( this.game.materials.list[material_id] ,
                MenuMaterial.TEXT_X_COUNT,
                MenuMaterial.TEXT_Y + MenuMaterial.TEXT_HEIGHT * row);
            }
            row += 1;
        }

    }
}