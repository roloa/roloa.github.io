
import {SoundFileName} from './SoundFileName.js';

export class SoundLibrary {

    static SAVE_MUTE = 1;
    static SAVE_NOT_MUTE = 2;

    constructor( game ){
        this.game = game;

        this.sound_list = []
        this.is_load_start = false;

        this.is_mute = false;

        // セーブデータのロード
        let saved_mute = localStorage.getItem( 'sound_mute' );
        if( saved_mute ){
            if( saved_mute == SoundLibrary.SAVE_MUTE ){
                this.is_mute = true;
            } else {
                this.is_mute = false;
            }
        }
    }
    toggle_mute(){
        this.is_mute = !this.is_mute;
        if( this.is_mute ){
            localStorage.setItem( 'sound_mute' , SoundLibrary.SAVE_MUTE );
        } else {
            localStorage.setItem( 'sound_mute' , SoundLibrary.SAVE_NOT_MUTE );
        }
    }
    get_sound( name ){
        return this.sound_list[ name ];
    }
    play_sound( name ){
        if( !this.is_mute ){
            if( this.sound_list[ name ] ){
                this.bufferSource = this.context.createBufferSource();
                this.bufferSource.buffer = this.sound_list[ name ];
                this.bufferSource.connect(this.context.destination);
                this.bufferSource.start(0);
            }
        }
    }
    load_sounds(){
        if( !this.is_mute ){
            if( this.is_load_start ){

            } else {
                this.is_load_start = true;
                this.context = new(window.AudioContext || window.webkitAudioContext);

                this.context.createMediaElementSource( document.getElementById('audio_tag_c6') ).connect(this.context.destination);
                document.getElementById('audio_tag_c6').play();
                this.load_files();
            }
        }
    }

    load_files(){
        for( let i = 0 ; i < SoundFileName.FILE_NAME_LIST.length ; i++ ) {
            if( SoundFileName.FILE_NAME_LIST[ i ] ){

                // 外部のファイルよみこみ
                let xhr = null;
                let file_name = SoundFileName.FILE_NAME_LIST[ i ];
                xhr = new XMLHttpRequest();
                xhr.open('GET', file_name , true);
                xhr.responseType = 'arraybuffer';
                xhr.onload = function(){
                    this.context.decodeAudioData( xhr.response, function( buffer ){
                        this.sound_list[ file_name ] = buffer;
                        let simple_name = file_name;
                        simple_name = simple_name.replace('./sound/', '');
                        simple_name = simple_name.replace('.wav', '');
                        simple_name = simple_name.replace('.mp3', '');
                        this.sound_list[ simple_name ] = buffer;
                        this.game.log('sound: ' + simple_name);

                    }.bind(this) );
                }.bind(this);
                xhr.send();

            }
        }
    }


}
