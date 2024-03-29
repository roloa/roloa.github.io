
import {ShipBlock} from './ShipBlock.js';

export class DryLack extends ShipBlock {

    // 焚き火のまるコピ
    constructor( game ){
        super( game );

        this.name = '乾燥ラック';

        this.is_floor = false;
        this.image = this.game.image_library.get_image('dry_lack');
        this.food = null;
        this.cooking_count = 0;

    }

    on_interact(){

        if( this.food ){
            // 調理結果をプレイヤーの位置に生成
            this.game.world.give_tool_item_player( this.food );
            this.food = null;
            return true;
        } else {
            let item = this.game.hud.item_slot.get_active_item();
            if( item && item.get_dried_item ) {
                this.food = item;
                this.game.hud.item_slot.delete_active_item();
                this.cooking_count = 0;
                return true;
            }
        }
        return false;
    }

    on_update(){
        super.on_update();

        if( this.food != null && this.food.get_cooked_item ){
            //
            this.cooking_count += 1;
            if( this.food.cooking_finish_time < this.cooking_count ){
                this.food = this.food.get_dried_item();
                this.cooking_count = 0;
            }
        }
    }
    on_draw( canvas ){
        super.on_draw( canvas );

        if( this.food != null ) {
            canvas.drawImage( this.food.get_image(), -ShipBlock.BLOCK_RADIUS * 0.5, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_RADIUS);
        }
    }

    save_data(){
        let data = super.save_data();
        if( this.food != null ){
            data.food = this.food.save_data()
        }
        return data;
    }
    load_data( data ){
        if( data.food ){
            this.food = this.game.save_data_manager.deserialize_item( data.food );
        }
    }
}
