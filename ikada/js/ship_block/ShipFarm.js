
import {ShipBlock} from './ShipBlock.js';
import {VeggieTomato} from '../tool_item/d_foods/VeggieTomato.js';


export class ShipFarm extends ShipBlock {

    constructor( game ){
        super( game );

        this.is_floor = false;
        this.image = this.game.image_library.get_image('dougu_torobune_tsuchi');
        this.food = null;
        this.saving_data.growing_timer = 0;
        this.growing_timer_max = 500;
    }

    on_interact(){

        if( this.food ){
            // 調理結果をプレイヤーの位置に生成
            this.game.world.give_tool_item_player( this.food );
            this.food = null;
            this.saving_data.growing_timer = this.growing_timer_max;
            return true;
        } else {
            // TODO 種が必要なように
            let item = this.game.hud.item_slot.get_active_item();
            if( item && item.get_seed_item ) {
                this.food = item;
                this.game.hud.item_slot.delete_active_item();
                this.cooking_count = 0;
                return true;
            }
            this.game.log('まだ野菜がなっていません。')
        }
        return false;
    }
    generate_veggie(){
        return new VeggieTomato( this.game );
    }
    on_update(){
        super.on_update();

        if( this.food == null ){
            //
            if( 0 < this.saving_data.growing_timer ){
                this.saving_data.growing_timer -= 1;
            } else {
                // 野菜の成長完了
                this.food = this.generate_veggie();
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
        super.save_data( data );
        if( data.food ){
            this.food = this.game.save_data_manager.deserialize_item( data.food );
        }
    }
}
