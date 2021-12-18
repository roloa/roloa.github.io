

export class HudLog {

    static MARGIN_TOP   = 350;
    static MARGIN_RIGHT = 10;
    static FONT = 'bold 16px monospace'
    static TEXT_COLOR = 'rgb(200,200,200)';
    static TEXT_HEIGHT = 20;
    static LOG_ROWS = 12;

    constructor( game ){
        this.game = game;

        this.message_log = []
        for( let i = 0 ; i < HudLog.LOG_ROWS ; i++ ){
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
        for( let i = 0 ; i < HudLog.LOG_ROWS ; i++ ){
            canvas.fillText( this.message_log[ i ] ,
            this.game.SCREEN_WIDTH - HudLog.MARGIN_RIGHT,
            HudLog.MARGIN_TOP + i * HudLog.TEXT_HEIGHT);
        }
        canvas.textAlign = 'start';


    }
}
