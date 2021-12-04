

export class MenuInventory {

    static TITLE_X = 100;
    static TITLE_Y = 40;
    static TITLE_COLOR = 'rgb(20,20,20)';
    static TITLE_FONT = 'bold 32px monospace'

    static LIST_X = 20;
    static LIST_Y = 60;
    static LIST_ICON_SIZE = 50;
    static LIST_SPACING = 10;
    static LIST_X_COUNT = 10;
    static LIST_Y_COUNT = 4;
    static LIST_ICON_FRAME_COLOR = 'rgb(20,20,20)';
    static LIST_ICON_FRAME_COLOR_SELECTED = 'rgb(200,20,20)';


    constructor( game ){
        this.game = game;

        this.cursor_index = 0;

    }
    on_update(){

        // カーソル操作
        // TODO 範囲外
        if( this.game.input_controller.is_pressed_key['KeyD'] ){
            this.cursor_index += 1;
        }
        if( this.game.input_controller.is_pressed_key['KeyA'] ){
            this.cursor_index -= 1;
        }
        if( this.game.input_controller.is_pressed_key['KeyW'] ){
            if( MenuInventory.LIST_X_COUNT < this.cursor_index ){
                this.cursor_index -= MenuInventory.LIST_X_COUNT;
            }
        }
        if( this.game.input_controller.is_pressed_key['KeyS'] ){
            if( MenuInventory.LIST_X_COUNT + this.cursor_index < 25  ){
                this.cursor_index += MenuInventory.LIST_X_COUNT;
            }
        }

    }
    on_draw( canvas ){

        // タイトルを印字
        canvas.fillStyle = MenuInventory.TITLE_COLOR;
        canvas.font = MenuInventory.TITLE_FONT
        canvas.fillText( 'インベントリ Inventory' ,
            MenuInventory.TITLE_X ,MenuInventory.TITLE_Y);

        // インベントリのアイテムリスト
        for( let i = 0 ; i < 25 ; i++ ){
            if( this.cursor_index == i ){
                canvas.strokeStyle = MenuInventory.LIST_ICON_FRAME_COLOR_SELECTED;
            } else {
                canvas.strokeStyle = MenuInventory.LIST_ICON_FRAME_COLOR;
            }
            let x = i % MenuInventory.LIST_X_COUNT;
            let y = Math.floor( i / MenuInventory.LIST_X_COUNT);
            let frame_x = MenuInventory.LIST_X + x * (MenuInventory.LIST_ICON_SIZE + MenuInventory.LIST_SPACING);
            let frame_y = MenuInventory.LIST_Y + y * (MenuInventory.LIST_ICON_SIZE + MenuInventory.LIST_SPACING);

            if( this.game.inventory.tool_item_inventory[ i ] != null ){
                if( this.game.inventory.tool_item_inventory[ i ].image ) {
                    canvas.drawImage( this.game.inventory.tool_item_inventory[ i ].image ,
                    frame_x, frame_y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );
                }
            }
            canvas.strokeRect( frame_x, frame_y, MenuInventory.LIST_ICON_SIZE, MenuInventory.LIST_ICON_SIZE );


        }

    }
}
