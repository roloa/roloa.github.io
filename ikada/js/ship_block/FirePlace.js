
import {ShipBlock} from './ShipBlock.js';
import {DropItem} from '../entity/DropItem.js';

export class FirePlace extends ShipBlock{

    constructor( game ){
        super( game );

        this.is_floor = true;
        this.image = this.game.image_library.get_image('takibi_dai_fire');
        this.food = null;

    }

    on_interact(){
        console.log('onclick fire!');

        if( super.on_interact() ){
            // 親クラスの方でインタラクトイベントを消化したら、何もしない
            return true;
        }

        if( this.food ){
            // 調理結果をプレイヤーの位置に生成
            this.game.world.give_tool_item_player( this.food.get_cooked_item() );
            this.food = null;
            return true;
        } else {
            let item = this.game.hud.item_slot.get_active_item();
            if( item && item.get_cooked_item ) {
                this.food = item;
                this.game.hud.item_slot.delete_active_item();
                return true;
            }
        }
        return false;
    }

    on_update(){

    }

}
