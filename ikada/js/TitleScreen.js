

export class TitleScreen extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    on_update(){
        if( this.game.input_controller.is_down_key['KeyX'] ) {
            this.game.is_there_title = false;

            // this.game.log('ロードします。');
            this.game.save_data_manager.load_game();

        }
    }
    on_draw( canvas ){
        canvas.font = 'bold 64px monospace';
        canvas.strokeStyle = 'rgb(250,250,250)';
        canvas.fillStyle = 'rgb(250,250,250)';
        canvas.strokeText('Ikada',100,150)
        canvas.font = 'bold 32px monospace';
        canvas.fillText('press [X] to start',100,250)

    }
}
