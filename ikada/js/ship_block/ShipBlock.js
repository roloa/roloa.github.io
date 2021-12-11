
export class ShipBlock {

    static BLOCK_RADIUS = 16
    static BLOCK_SIZE = ShipBlock.BLOCK_RADIUS + ShipBlock.BLOCK_RADIUS

    constructor( game ){
        this.game = game;
        this.is_floor = false
        this.image = null;
    }
    on_interact(){
        return false;
    }
    on_update(){

    }
    on_draw( canvas ){
        if( this.image != null ) {
            canvas.drawImage( this.image, -ShipBlock.BLOCK_RADIUS, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_SIZE, ShipBlock.BLOCK_SIZE);
        }
    }
    save_data(){
        let data = {};
        data.class_name = this.constructor.name;
        return data;
    }
    load_data( data ){

    }
}
