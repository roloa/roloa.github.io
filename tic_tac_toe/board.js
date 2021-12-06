

export class Board {
    constructor( game ){
        this.game = game;

        this.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null]

        ]
    }
    on_update(){

        if( this.game.input_controller.is_mouse_press ){
            let local_x = this.game.input_controller.mouse_x - 175;
            let local_y = this.game.input_controller.mouse_y - 75;
            let cell_x = Math.floor( local_x / 150 );
            let cell_y = Math.floor( local_y / 150 );
            if( 0 <= cell_x && cell_x < 3 && 0 < cell_y && cell_y < 3){
                console.log(cell_x, cell_y)
            }
        }
    }
    draw_line( canvas , x1, y1, x2, y2){
        canvas.beginPath();
        canvas.moveTo( x1, y1);
        canvas.lineTo( x2, y2);
        canvas.stroke();
    }
    on_draw( canvas ){
        canvas.save();
        canvas.translate(175,75);

        this.draw_line(canvas, 150, 0, 150, 450);
        this.draw_line(canvas, 300, 0, 300, 450);

        this.draw_line(canvas,   0, 150, 450, 150);
        this.draw_line(canvas,   0, 300, 450, 300);

        canvas.strokeRect(0,0,450,450)

        canvas.restore();
    }
}
