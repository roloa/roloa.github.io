
import {ShipBlock} from './ShipBlock.js';

export class CommonBlock extends ShipBlock{

    constructor( game ){
        super( game );

        this.name = '名もなきブロック';

        this.is_floor = true;
        this.set_image( 'ship_floor' );
    }

    set_image( image_name ){
        this.saving_data.image_name = image_name;
        this.image = this.game.image_library.get_image( image_name );
    }

    save_data(){
        // saving_dataにセーブ対象のデータをいれとく
        this.saving_data.max_hp = this.max_hp;
        this.saving_data.is_floor = this.is_floor;
        // あとはsuperのsaveが勝手に記録してくれる
        return super.save_data();
    }
    load_data( data ){
        super.load_data( data );

        this.set_image( this.saving_data.image_name );
        // カスタムブロックのデータを標準のブロックデータに移す
        this.max_hp = this.saving_data.max_hp;
        this.is_floor = this.saving_data.is_floor;


    }
}
