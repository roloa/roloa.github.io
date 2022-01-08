
import {ShipBlock} from './ShipBlock.js';

// TODO
export class FuelEngine extends ShipBlock {

    constructor( game ){
        super( game );

        this.image = this.game.image_library.get_image('car_engine');

        this.saving_data.fuel_amount = 0;
    }

    on_interact(){

        let item = this.game.hud.item_slot.get_active_item();
        if( item && item.fuel_value ) {
            this.game.hud.item_slot.delete_active_item();
            this.game.log( 'エンジンに燃料を補充しました。' );
            this.saving_data.fuel_amount += item.fuel_value;
            return true;
        } else {
        }
        this.game.log( '燃料の量: ' + this.saving_data.fuel_amount );
        return true;
    }
    on_update(){
        super.on_update();

        // 燃料があるなら、燃料を消費して舟を推進する
        if( 0 < this.saving_data.fuel_amount ){
            this.saving_data.fuel_amount -= 0.02;
            this.game.world.ship.impulse_velocity( 0.1 );
        }
    }

    on_draw( canvas ){
        canvas.save();
        if( 0 < this.saving_data.fuel_amount ){
            canvas.translate(Math.random() * 2 - 1, Math.random() * -4)
        }
        super.on_draw( canvas )
        canvas.restore();
    }
}
