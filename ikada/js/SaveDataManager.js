
import {ItemInstanceMaker} from './ItemInstanceMaker.js'

export class SaveDataManager {
    constructor( game ){
        this.game = game;
        this.item_instance_maker = new ItemInstanceMaker( this.game );
    }
    save_game(){
        let data = {};
        data.hoge = 'fuga';
        data.item_slot = this.game.hud.item_slot.save_data();
        localStorage.setItem('save_data_1', JSON.stringify(data));

    }
    load_game(){
        let data = JSON.parse(localStorage.getItem('save_data_1'));

        this.game.hud.item_slot.load_data( data.item_slot );
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
}
