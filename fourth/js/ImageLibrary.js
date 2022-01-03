
import {ImgFileName} from './img_file_name.js';

export class ImageLibrary {

    constructor( game ){
        this.game = game;

        this.image_list = []

    }

    get_image( name ){
        return this.image_list[ name ];
    }

    load_images(){

        for( let i = 0 ; i < ImgFileName.FILE_NAME_LIST.length ; i++ ) {
            let new_image = new Image();
            new_image.src = ImgFileName.FILE_NAME_LIST[ i ];
            this.image_list[ ImgFileName.FILE_NAME_LIST[ i ] ] = new_image;

            // フルパスじゃない拡張子抜きのファイル名でも入れておく
            let simple_name = ImgFileName.FILE_NAME_LIST[ i ];
            simple_name = simple_name.replace('./img/', '');
            simple_name = simple_name.replace('.png', '');
            this.image_list[ simple_name ] = new_image;
        }

    }

}
