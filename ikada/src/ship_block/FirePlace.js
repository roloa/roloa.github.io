
import {ShipBlock} from './ShipBlock.js';
import {DropItem} from '../entity/DropItem.js';

export class FirePlace extends ShipBlock{

    constructor( game ){
        super( game );

        this.name = '焚き火';

        this.is_floor = false;
        this.image = this.game.image_library.get_image('takibi_dai_fire');
        this.image_no_fire = this.game.image_library.get_image('takibi_dai');

        this.food = null;

        this.saving_data.ammo_amount = 100;
        this.cooking_count = 0;

        this.accept_ammo_type = 'fuel';
    }

    deposit_item( item ){
        if( super.deposit_item( item ) ){
            return true;
        }
        if( this.food == null && item && item.get_cooked_item ) {
            this.food = item;
            this.cooking_count = 0;
            return true;
        }
    }
    on_interact(){

        if( this.food ){
            // 調理結果をプレイヤーの位置に生成
            this.game.world.give_tool_item_player( this.food );
            this.food = null;
            return true;
        } else {
        }
        return false;
    }

    on_update(){
        super.on_update();

        if( 0 < this.saving_data.ammo_amount && this.food != null && this.food.get_cooked_item ){
            // 料理タイマーが進む
            this.cooking_count += 1;
            if( this.food.cooking_finish_time < this.cooking_count ){
                // 料理が完成
                this.food = this.food.get_cooked_item();
                this.saving_data.ammo_amount = 0;
                this.cooking_count = 0;
            }
        }
    }
    get_image(){
        if( this.saving_data.ammo_amount <= 0){
            return this.image_no_fire;
        }
        return super.get_image();
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
