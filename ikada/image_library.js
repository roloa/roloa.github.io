
export class ImageLibrary {

    static IMAGE_FILE_NAME_LIST = [
        'tree_ryuuboku.png',
        'alohashirt_gray.png',
        'junk_kikai.png',
        'mushi_mushitoriami.png'
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
            new_image.src = './img/' + ImageLibrary.IMAGE_FILE_NAME_LIST[ i ];
            this.image_list[ ImageLibrary.IMAGE_FILE_NAME_LIST[ i ] ] = new_image;
        }

    }


}
