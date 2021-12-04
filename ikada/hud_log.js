

export class HudLog {

    static MARGIN_TOP   = 50;
    static MARGIN_RIGHT = 50;
    static FONT = 'bold 16px monospace'
    static TEXT_COLOR = 'rgb(200,200,200)';
    static TEXT_HEIGHT = 20;

    constructor( game ){
        this.game = game;

        this.message_log = []
        for( let i = 0 ; i < 20 ; i++ ){
            this.message_log[ i ] = '~';
        }

    }
    push_log( new_msg ) {
        this.message_log.shift();
        this.message_log.push( new_msg );
    }
    on_update(){

    }
    on_draw( canvas ){
        canvas.fillStyle = HudLog.TEXT_COLOR;
        canvas.textAlign = 'end';
        canvas.font = HudLog.FONT;
        for( let i = 0 ; i < 20 ; i++ ){
            canvas.fillText( this.message_log[ i ] ,
            this.game.SCREEN_WIDTH - HudLog.MARGIN_RIGHT,
            HudLog.MARGIN_TOP + i * HudLog.TEXT_HEIGHT);
        }
        canvas.textAlign = 'start';


    }
}
