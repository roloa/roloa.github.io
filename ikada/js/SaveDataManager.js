
import {ItemInstanceMaker} from './ItemInstanceMaker.js'
import {BlockInstanceMaker} from './BlockInstanceMaker.js'

export class SaveDataManager {
    constructor( game ){
        this.game = game;
        this.item_instance_maker = new ItemInstanceMaker( this.game );
        this.block_instance_maker = new BlockInstanceMaker( this.game );
    }
    delete_save_data(){
        let data = {};
        data.hoge = 'fuga';
        data.deleted = true;
        localStorage.setItem('save_data_1', JSON.stringify(data));
    }
    save_game( save_name ){
        let data = {};
        data.hoge = 'fuga';
        data.deleted = false;
        data.item_slot = this.game.hud.item_slot.save_data();
        data.inventory = this.game.inventory.save_data();
        data.ship = this.game.world.ship.save_data();
        data.materials = this.game.materials.save_data();
        data.player_health = this.game.world.player.health.save_data();
        data.tutorial_data = this.game.tutorial_data.save_data();

        console.log( 'save' );
        console.log( data );
        localStorage.setItem( save_name , JSON.stringify(data));
    }
    load_game( save_name ){

        try {
            let load_data = localStorage.getItem( save_name )
            if( load_data == null ){
                this.game.log('セーブデータがありません。');
                return false;
            }
            let data = JSON.parse( load_data );
            if( data.deleted == true ){
                this.game.log('セーブデータが消去済みです。');
                return false;
            }

            this.game.hud.item_slot.load_data( data.item_slot );
            this.game.inventory.load_data( data.inventory );
            this.game.world.ship.load_data( data.ship );
            this.game.materials.load_data( data.materials );
            this.game.world.player.health.load_data( data.player_health );
            this.game.tutorial_data.load_data( data.tutorial_data );

            console.log( 'load' );
            console.log( data );
            this.game.log('セーブデータをロードしました。');
        } catch( e ) {
            this.game.log('データのロードに失敗しました。');
            this.game.log('エラー: ' + e );
            console.log(e);
            return false;
        }
        return true;
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
