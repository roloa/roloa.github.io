

export class HudCompass {

    static MARGIN_TOP   = 30;
    static MARGIN_LEFT = 940;
    static FONT = 'bold 16px monospace'
    static TEXT_COLOR = 'rgb(200,200,200)';
    static TEXT_HEIGHT = 20;
    static LOG_ROWS = 12;

    constructor( game ){
        this.game = game;

    }
    on_update(){

    }
    on_draw( canvas ){
        canvas.save();
        canvas.fillStyle = HudCompass.TEXT_COLOR;
        canvas.font = HudCompass.FONT;
        canvas.textAlign = 'end'
        canvas.fillText( Math.floor((this.game.world.player.y) / -32) + 'm :高度' ,
        HudCompass.MARGIN_LEFT,
        HudCompass.MARGIN_TOP + 0 * HudCompass.TEXT_HEIGHT);
        if( 0 <= this.game.world.player.x ){
            canvas.fillText( Math.floor((this.game.world.player.x) / 32) + 'm :前方' ,
            HudCompass.MARGIN_LEFT,
            HudCompass.MARGIN_TOP + 1 * HudCompass.TEXT_HEIGHT);
        } else {
            canvas.fillText( Math.floor((this.game.world.player.x) / -32) + 'm :後方' ,
            HudCompass.MARGIN_LEFT,
            HudCompass.MARGIN_TOP + 1 * HudCompass.TEXT_HEIGHT);

        }

        canvas.restore();
    }
}
