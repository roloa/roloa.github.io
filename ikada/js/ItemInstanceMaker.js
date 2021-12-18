
import {ResourceItem} from './tool_item/ResourceItem.js'
import {Boomerang} from './tool_item/Boomerang.js'
import {FishRod} from './tool_item/FishRod.js'
import {EquipmentItem} from './tool_item/EquipmentItem.js'
import {CatchNet} from './tool_item/CatchNet.js'
import {ToolItem} from './tool_item/ToolItem.js'
import {CookedFish} from './tool_item/CookedFish.js'
import {Spear} from './tool_item/Spear.js'
import {DistillBottle} from './tool_item/DistillBottle.js'
import {BuildBlock} from './tool_item/BuildBlock.js'
import {FoodItem} from './tool_item/FoodItem.js'
import {Arrow} from './tool_item/Arrow.js'
import {DeconstructHammer} from './tool_item/DeconstructHammer.js'
import {FishKirimi} from './tool_item/FishKirimi.js'
import {Bow} from './tool_item/Bow.js'

export class ItemInstanceMaker {
    constructor( game ){
        this.game = game;
    }
    make_instance( item_data ){

        if( item_data == null ){
            return null;
        } else if( item_data.class_name == 'ResourceItem' ){
            return new ResourceItem( this.game );
        } else if( item_data.class_name == 'Boomerang' ){
            return new Boomerang( this.game );
        } else if( item_data.class_name == 'FishRod' ){
            return new FishRod( this.game );
        } else if( item_data.class_name == 'EquipmentItem' ){
            return new EquipmentItem( this.game );
        } else if( item_data.class_name == 'CatchNet' ){
            return new CatchNet( this.game );
        } else if( item_data.class_name == 'ToolItem' ){
            return new ToolItem( this.game );
        } else if( item_data.class_name == 'CookedFish' ){
            return new CookedFish( this.game );
        } else if( item_data.class_name == 'Spear' ){
            return new Spear( this.game );
        } else if( item_data.class_name == 'DistillBottle' ){
            return new DistillBottle( this.game );
        } else if( item_data.class_name == 'BuildBlock' ){
            return new BuildBlock( this.game );
        } else if( item_data.class_name == 'FoodItem' ){
            return new FoodItem( this.game );
        } else if( item_data.class_name == 'Arrow' ){
            return new Arrow( this.game );
        } else if( item_data.class_name == 'DeconstructHammer' ){
            return new DeconstructHammer( this.game );
        } else if( item_data.class_name == 'FishKirimi' ){
            return new FishKirimi( this.game );
        } else if( item_data.class_name == 'Bow' ){
            return new Bow( this.game );
        }
        return new ToolItem( this.game );
    }
}

