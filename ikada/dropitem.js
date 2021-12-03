
import {Entity} from './entity.js';

export class DropItem extends Entity {

    static IMAGE_LIST = [
        'tree_ryuuboku.png',
        'alohashirt_gray.png',
        'junk_kikai.png',
    ];

    constructor( game ){

        super( game );

        this.name = 'unknown item';

        this.x = 0;
        this.y = 0;

        let image_number = Math.floor( Math.random() * 3 );
        let image_name = DropItem.IMAGE_LIST[ image_number ];
        this.image = this.game.image_library.get_image( image_name );

    }

    on_update(){
        super.on_update();

        if( this.is_in_sea ) {
            this.vx = -1;
        }

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,200,200)'
        canvas.strokeRect( this.x - 8, this.y - 16, 16, 16)

        canvas.drawImage( this.image ,this.x - 8, this.y - 16, 16, 16)

    }
}
