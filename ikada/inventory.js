

import {CatchNet} from './tool_item/catch_net.js';

export class Inventory {

    constructor( game ){
        this.game = game;

        this.item_inventory_size = 32;

        this.tool_item_inventory = []
        for( let i = 0 ; i < this.item_inventory_size ; i++ ){
            this.tool_item_inventory[ i ] = null;
        }

        this.tool_item_inventory[0] = new CatchNet( game );



    }
    on_update(){


    }
    on_draw(){

    }
}
