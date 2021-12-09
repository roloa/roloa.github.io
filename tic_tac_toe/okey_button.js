
export class OkeyButton {

    static LD_X = 20;
    static LD_Y = 400;

    static RD_X = 660;
    static RD_Y = 400;

    static LU_X = 20;
    static LU_Y = 100;

    static RU_X = 660;
    static RU_Y = 100;

    static HEIGHT = 100;
    static WIDTH = 100

    constructor( game ){
        this.game = game;

        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]

        ]
    }

    on_draw( canvas ){
        canvas.strokeStyle = 'rgb(0,0,0)'
        canvas.strokeRect( OkeyButton.LD_X, OkeyButton.LD_Y, OkeyButton.HEIGHT, OkeyButton.WIDTH )
        canvas.strokeRect( OkeyButton.RD_X, OkeyButton.RD_Y, OkeyButton.HEIGHT, OkeyButton.WIDTH )
        canvas.strokeRect( OkeyButton.LU_X, OkeyButton.LU_Y, OkeyButton.HEIGHT, OkeyButton.WIDTH )
        canvas.strokeRect( OkeyButton.RU_X, OkeyButton.RU_Y, OkeyButton.HEIGHT, OkeyButton.WIDTH )
    }
}
