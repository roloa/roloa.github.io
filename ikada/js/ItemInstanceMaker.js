
import {ToolItem} from './tool_item/ToolItem.js'
import {FishKirimi} from './tool_item/FishKirimi.js'

export class ItemInstanceMaker {
    constructor( game ){
        this.game = game;
    }
    make_instance( item_data ){

        if( item_data == null ){
            return null;
        } else if( item_data.class_name == 'FishKirimi' ){
            return new FishKirimi( this.game );
        }
        return new ToolItem( this.game );
    }
}
