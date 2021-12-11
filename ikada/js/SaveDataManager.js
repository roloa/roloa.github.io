
import {ItemInstanceMaker} from './ItemInstanceMaker.js'
import {BlockInstanceMaker} from './BlockInstanceMaker.js'

export class SaveDataManager {
    constructor( game ){
        this.game = game;
        this.item_instance_maker = new ItemInstanceMaker( this.game );
        this.block_instance_maker = new BlockInstanceMaker( this.game );
    }
    save_game(){
        let data = {};
        data.hoge = 'fuga';
        data.item_slot = this.game.hud.item_slot.save_data();
        data.ship = this.game.world.ship.save_data();
        localStorage.setItem('save_data_1', JSON.stringify(data));

    }
    load_game(){
        let data = JSON.parse(localStorage.getItem('save_data_1'));

        this.game.hud.item_slot.load_data( data.item_slot );
        this.game.world.ship.load_data( data.ship );

        console.log( data );
    }

    deserialize_item( item_data ){
        let new_item = this.item_instance_maker.make_instance( item_data );
        if( new_item == null ){
            return null;
        }
        new_item.load_data( item_data );
        return new_item;
    }
    deserialize_block( block_data ){
        let new_block = this.block_instance_maker.make_instance( block_data );
        if( new_block == null ){
            return null;
        }
        new_block.load_data( block_data );
        return new_block;
    }

}
