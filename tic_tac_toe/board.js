

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
    drawBatsu( canvas, x, y, size, text ){
        canvas.lineWidth = 12;
        canvas.strokeStyle = 'rgb(100,150,250)';
        this.draw_line( canvas, x, y, x + size, y + size );
        this.draw_line( canvas, x + size, y, x, y + size );
        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.fillText( text, x + size * 0.5, y + size * 0.5 );
    }
    drawMaru( canvas, x, y, size, text){
        canvas.lineWidth = 10;
        canvas.strokeStyle = 'rgb(250,100,50)';
        canvas.beginPath();
        canvas.arc( x + size * 0.5, y + size * 0.5 , size * 0.5, 0, Math.PI*2);
        canvas.fillStyle = 'rgb(250,250,250)';
        canvas.fillText( text, x + size * 0.5, y + size * 0.5 );
        canvas.stroke();

    }
    on_draw( canvas ){
        canvas.save();
        canvas.translate(175,75);

        canvas.lineWidth = 3;
        canvas.strokeStyle = 'rgb(150,150,150)';

        this.draw_line(canvas, 150, 0, 150, 450);
        this.draw_line(canvas, 300, 0, 300, 450);

        this.draw_line(canvas,   0, 150, 450, 150);
        this.draw_line(canvas,   0, 300, 450, 300);
        canvas.strokeRect(0,0,450,450)

        canvas.fillStyle = 'rgb(20,20,20)';
        canvas.font = 'bold 20px monospace';
        canvas.textAlign = 'center'
        canvas.textBaseline = 'middle'

        this.drawBatsu( canvas, 10, 10, 30, 7 );
        this.drawMaru( canvas, 10, 60, 30, 7 );

        canvas.restore();
    }
}
