
import {ShipBlock} from './ship_block/ShipBlock.js'
import {ShipFloor} from './ship_block/ShipFloor.js'
import {FirePlace} from './ship_block/FirePlace.js'

export class BlockInstanceMaker {
    constructor( game ){
        this.game = game;
    }
    make_instance( block_data ){

        if( block_data == null ){
            return null;
        } else if( block_data.class_name == 'ShipBlock' ){
            return new ShipBlock( this.game );
        } else if( block_data.class_name == 'ShipFloor' ){
            return new ShipFloor( this.game );
        } else if( block_data.class_name == 'FirePlace' ){
            return new FirePlace( this.game );
        }
        return new ShipBlock( this.game );
    }
}

