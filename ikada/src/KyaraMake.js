
class KyaraMake {
    constructor(){
        // キャンバスの準備
        this.canvas_element = document.getElementById('my_canvas');
        this.canvas = this.canvas_element.getContext('2d');

        this.convert_canvas_element = document.getElementById('convert_canvas');
        this.convert_canvas = this.convert_canvas_element.getContext('2d');

        this.canvas.fillStyle = 'rgb(0,0,30)';
        this.canvas.fillRect(0,0,200,200);

        this.reader = null;

        this.upload_image = new Image();
        this.upload_image.onload = this.on_load_upload_image.bind(this)

        var inputFile = document.getElementById('input-file');

        // イメージの選択時のリスナー
        inputFile.addEventListener("change", this.on_change_image.bind(this), false);

        this.saved_character_image = localStorage.getItem('character_image')
        this.saved_image = new Image();
        this.saved_image.onload = this.on_load_saved_image.bind(this);
        this.saved_image.src = this.saved_character_image

        console.log( 'constructor finish' );
    }
    on_change_image( e ){
        console.log( 'on_change_image' );
        this.reader = new FileReader();
        this.reader.readAsDataURL(e.target.files[0]);
        this.reader.onload = this.on_upload_image.bind(this);
    }
    on_load_saved_image(){
        console.log( 'on_load_saved_image' );
        this.convert_canvas.clearRect(0,0,200,200)
        this.canvas.drawImage( this.saved_image ,100,100);
    }
    on_upload_image(){
        console.log( 'on_upload_image' );
        this.upload_image.src = this.reader.result;
        this.reader = null;
    }
    on_load_upload_image(){
        console.log( 'on_load_upload_image' );
        this.convert_canvas.clearRect(0,0,64,64)
        this.convert_canvas.drawImage( this.upload_image ,0,0,64,64);
        let converted_kyara_url = this.convert_canvas_element.toDataURL('image/png');
        console.log( converted_kyara_url )

        localStorage.setItem('character_image', converted_kyara_url);

        this.saved_image.src = converted_kyara_url;
    }

}

let kyara_make = new KyaraMake();
