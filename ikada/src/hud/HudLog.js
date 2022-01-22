

export class HudLog {

    static MARGIN_TOP   = 270;
    static MARGIN_LEFT = 10;
    static FONT = 'bold 16px monospace'
    static TEXT_COLOR = 'rgb(200,200,200)';
    static TEXT_COLOR_STROKE = 'rgb(50,50,50)';
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
        canvas.strokeStyle = HudLog.TEXT_COLOR_STROKE;
        canvas.lineWidth = 2;
        canvas.textAlign = 'start';
        canvas.font = HudLog.FONT;
        for( let i = 0 ; i < HudLog.LOG_ROWS ; i++ ){
            // canvas.strokeText( this.message_log[ i ] ,
            // HudLog.MARGIN_LEFT,
            // HudLog.MARGIN_TOP + i * HudLog.TEXT_HEIGHT);
            canvas.fillText( this.message_log[ i ] ,
            HudLog.MARGIN_LEFT,
            HudLog.MARGIN_TOP + i * HudLog.TEXT_HEIGHT);
        }
        canvas.textAlign = 'start';


    }
}
