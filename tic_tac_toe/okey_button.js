
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
    on_click(){
        let m_x = this.game.input_controller.mouse_x;
        let m_y = this.game.input_controller.mouse_y;

        return (
        this.hit_rect( m_x, m_y, OkeyButton.LD_X, OkeyButton.LD_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT ) ||
        this.hit_rect( m_x, m_y, OkeyButton.RD_X, OkeyButton.RD_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT ) ||
        this.hit_rect( m_x, m_y, OkeyButton.LU_X, OkeyButton.LU_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT ) ||
        this.hit_rect( m_x, m_y, OkeyButton.RU_X, OkeyButton.RU_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT ))
    }
    hit_rect( test_x, test_y, x, y, w, h ){
        return x < test_x && test_x < x + w && y < test_y && test_y < y + h
    }
    on_draw( canvas ){
        canvas.strokeStyle = 'rgb(250,250,250)'
        canvas.fillStyle = 'rgb(20,20,20)'
        canvas.lineWidth = 5

        canvas.fillRect( OkeyButton.LD_X, OkeyButton.LD_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT )
        canvas.fillRect( OkeyButton.RD_X, OkeyButton.RD_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT )
        canvas.fillRect( OkeyButton.LU_X, OkeyButton.LU_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT )
        canvas.fillRect( OkeyButton.RU_X, OkeyButton.RU_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT )

        canvas.strokeRect( OkeyButton.LD_X, OkeyButton.LD_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT )
        canvas.strokeRect( OkeyButton.RD_X, OkeyButton.RD_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT )
        canvas.strokeRect( OkeyButton.LU_X, OkeyButton.LU_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT )
        canvas.strokeRect( OkeyButton.RU_X, OkeyButton.RU_Y, OkeyButton.WIDTH, OkeyButton.HEIGHT )
    }
}
