

export class Inventory {

    static ITEM_SLOT_COUNT = 9;

    constructor( game ){
        this.game = game;

        this.item_slot = []
        for( let i = 0 ; i < ITEM_SLOT_COUNT ; i++ ){
            this.item_slot[0] = null;
        }

        // this.item_slot[0] = new CatchNet();

        this.item_slot_cursor = 0;

    }
    on_update(){


    }
    on_draw(){

    }
}
