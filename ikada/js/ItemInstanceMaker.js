
import {ResourceItem} from './tool_item/ResourceItem.js'
import {FishRod} from './tool_item/FishRod.js'
import {EquipmentItem} from './tool_item/EquipmentItem.js'
import {CatchNet} from './tool_item/CatchNet.js'
import {ToolItem} from './tool_item/ToolItem.js'
import {WeaponItem} from './tool_item/WeaponItem.js'
import {Spear} from './tool_item/Spear.js'
import {DistillBottle} from './tool_item/DistillBottle.js'
import {BuildBlock} from './tool_item/BuildBlock.js'
import {ItemBoomerang} from './tool_item/ItemBoomerang.js'
import {Arrow} from './tool_item/Arrow.js'
import {Oar} from './tool_item/Oar.js'
import {DeconstructHammer} from './tool_item/DeconstructHammer.js'
import {Bow} from './tool_item/Bow.js'
import {ChickenRawSaki} from './tool_item/d_foods/ChickenRawSaki.js'
import {ChickenRawMoto} from './tool_item/d_foods/ChickenRawMoto.js'
import {ChickenCookedSaki} from './tool_item/d_foods/ChickenCookedSaki.js'
import {GenericFood} from './tool_item/d_foods/GenericFood.js'
import {CookedFish} from './tool_item/d_foods/CookedFish.js'
import {VeggieTomato} from './tool_item/d_foods/VeggieTomato.js'
import {ChickenCookedMoto} from './tool_item/d_foods/ChickenCookedMoto.js'
import {ChickenDried} from './tool_item/d_foods/ChickenDried.js'
import {DriedFish} from './tool_item/d_foods/DriedFish.js'
import {FishKirimi} from './tool_item/d_foods/FishKirimi.js'

export class ItemInstanceMaker {
    constructor( game ){
        this.game = game;
    }
    make_instance( item_data ){

        if( item_data == null ){
            return null;
        } else if( item_data.class_name == 'ResourceItem' ){
            return new ResourceItem( this.game );
        } else if( item_data.class_name == 'FishRod' ){
            return new FishRod( this.game );
        } else if( item_data.class_name == 'EquipmentItem' ){
            return new EquipmentItem( this.game );
        } else if( item_data.class_name == 'CatchNet' ){
            return new CatchNet( this.game );
        } else if( item_data.class_name == 'ToolItem' ){
            return new ToolItem( this.game );
        } else if( item_data.class_name == 'WeaponItem' ){
            return new WeaponItem( this.game );
        } else if( item_data.class_name == 'Spear' ){
            return new Spear( this.game );
        } else if( item_data.class_name == 'DistillBottle' ){
            return new DistillBottle( this.game );
        } else if( item_data.class_name == 'BuildBlock' ){
            return new BuildBlock( this.game );
        } else if( item_data.class_name == 'ItemBoomerang' ){
            return new ItemBoomerang( this.game );
        } else if( item_data.class_name == 'Arrow' ){
            return new Arrow( this.game );
        } else if( item_data.class_name == 'Oar' ){
            return new Oar( this.game );
        } else if( item_data.class_name == 'DeconstructHammer' ){
            return new DeconstructHammer( this.game );
        } else if( item_data.class_name == 'Bow' ){
            return new Bow( this.game );
        } else if( item_data.class_name == 'ChickenRawSaki' ){
            return new ChickenRawSaki( this.game );
        } else if( item_data.class_name == 'ChickenRawMoto' ){
            return new ChickenRawMoto( this.game );
        } else if( item_data.class_name == 'ChickenCookedSaki' ){
            return new ChickenCookedSaki( this.game );
        } else if( item_data.class_name == 'GenericFood' ){
            return new GenericFood( this.game );
        } else if( item_data.class_name == 'CookedFish' ){
            return new CookedFish( this.game );
        } else if( item_data.class_name == 'VeggieTomato' ){
            return new VeggieTomato( this.game );
        } else if( item_data.class_name == 'ChickenCookedMoto' ){
            return new ChickenCookedMoto( this.game );
        } else if( item_data.class_name == 'ChickenDried' ){
            return new ChickenDried( this.game );
        } else if( item_data.class_name == 'DriedFish' ){
            return new DriedFish( this.game );
        } else if( item_data.class_name == 'FishKirimi' ){
            return new FishKirimi( this.game );
        }
        return new ToolItem( this.game );
    }
}

