
import {ShipBlock} from './ShipBlock.js';

export class ShipMast extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = '舟の帆';

        this.is_floor = false;
        this.image = this.game.image_library.get_image('mast_open');
        this.image_close = this.game.image_library.get_image('mast_close');

        this.saving_data.is_mast_open = true;
    }
    get_image(){
        if( this.saving_data.is_mast_open ){
            return this.image;
        }
        return this.image_close;
    }
    on_update(){
        super.on_update();

    }
    change_state_chainly(){
        if( this.saving_data.is_mast_open ){
            this.saving_data.is_mast_open = false;
        } else {
            this.saving_data.is_mast_open = true;
        }

        let block = null;
        block = this.game.world.ship.get_ship_block_by_index( this.cell_x - 1, this.cell_y );
        if( block && block instanceof ShipMast &&
            block.saving_data.is_mast_open != this.saving_data.is_mast_open ){
            block.change_state_chainly();
        }
        block = this.game.world.ship.get_ship_block_by_index( this.cell_x + 1, this.cell_y );
        if( block && block instanceof ShipMast &&
            block.saving_data.is_mast_open != this.saving_data.is_mast_open ){
            block.change_state_chainly();
        }
        block = this.game.world.ship.get_ship_block_by_index( this.cell_x, this.cell_y - 1);
        if( block && block instanceof ShipMast &&
            block.saving_data.is_mast_open != this.saving_data.is_mast_open ){
            block.change_state_chainly();
        }
        block = this.game.world.ship.get_ship_block_by_index( this.cell_x, this.cell_y + 1);
        if( block && block instanceof ShipMast &&
            block.saving_data.is_mast_open != this.saving_data.is_mast_open ){
            block.change_state_chainly();
        }

    }
    on_interact(){

        this.change_state_chainly();

        if( this.saving_data.is_mast_open ){
            this.game.log('帆を開きました。');
        } else {
            this.game.log('帆を閉じました。');
        }

        return true;
    }

}
