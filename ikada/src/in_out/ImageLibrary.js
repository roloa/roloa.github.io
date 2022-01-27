
import {Illustya} from './illustya_filename.js';
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
        this.load_illustya();
        this.load_maked_player();
    }
    load_maked_player(){
        this.saved_character_image = localStorage.getItem('character_image')
        if( this.saved_character_image == null ){
            // セーブがなければ、デフォルトを入れとく
            this.player_image = this.game.image_library.get_image('cooking_agodashi');
            return;
        }

        this.saved_image = new Image();
        this.saved_image.src = this.saved_character_image
        this.player_image = this.saved_image;
    }
    get_player_image(){
        return this.player_image;
    }
    load_illustya(){
        for( let i = 0 ; i < Illustya.FILE_NAME_LIST.length ; i++ ) {
            if( Illustya.FILE_NAME_LIST[ i ] ){
                let new_image = new Image();
                new_image.src = Illustya.FILE_NAME_LIST[ i ];
                this.image_list[ Illustya.FILE_NAME_LIST[ i ] ] = new_image;
                // フルパスじゃない拡張子抜きのファイル名でも入れておく
                let simple_name = Illustya.FILE_NAME_LIST[ i ];
                simple_name = simple_name.replace('./img/illustya/', '');
                simple_name = simple_name.replace('.png', '');
                this.image_list[ simple_name ] = new_image;
                //this.game.log('image: ' + simple_name);
            }
        }
    }


}
