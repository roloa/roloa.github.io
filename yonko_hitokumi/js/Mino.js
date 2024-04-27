


class Mino extends Object {
    constructor( mino_id ){
        super();
        this.mino_id = mino_id;
        this.rotation = 0;
    }

    get_cell( y, x ){
        return this.get_cell_with_rotate( y, x, 0 );
    }
    get_cell_with_rotate( y, x, rotate ){
        let rotation = this.rotation + rotate;
        if( rotation < 0){
            rotation = 3;
        }
        if( 3 < rotation ){
            rotation = 0;
        }
        if( MINO_SHAPE_LIST[this.mino_id][rotation][y][x] ){
            return true;
        }
        return false;
    }
    rotate( rotate ){
        let rotation = this.rotation + rotate;
        if( rotation < 0){
            rotation = 3;
        }
        if( 3 < rotation ){
            rotation = 0;
        }
        this.rotation = rotation;
    }
}

