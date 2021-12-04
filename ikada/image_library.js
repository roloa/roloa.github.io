
import {Illustya} from './illustya_filename.js';

export class ImageLibrary {

    static IMAGE_FILE_NAME_LIST = [
        './img/wind_effect.png'
    ]

    constructor( game ){
        this.game = game;

        this.image_list = []

    }

    get_image( name ){
        return this.image_list[ name ];
    }

    load_images(){

        for( let i = 0 ; i < ImageLibrary.IMAGE_FILE_NAME_LIST.length ; i++ ) {
            let new_image = new Image();
            new_image.src = ImageLibrary.IMAGE_FILE_NAME_LIST[ i ];
            this.image_list[ ImageLibrary.IMAGE_FILE_NAME_LIST[ i ] ] = new_image;
        }
        this.load_illustya();

    }
    load_illustya(){
        for( let i = 0 ; i < Illustya.FILE_NAME_LIST.length ; i++ ) {
            if( Illustya.FILE_NAME_LIST[ i ] ){
                let new_image = new Image();
                new_image.src = Illustya.FILE_NAME_LIST[ i ];
                this.image_list[ Illustya.FILE_NAME_LIST[ i ] ] = new_image;
            }
        }
    }


}
