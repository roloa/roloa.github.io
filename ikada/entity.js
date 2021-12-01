
//import {Entity} from './entity.js';

export class Entity {
    constructor(){
        this.name = 'noname_entity';

        this.x = 0
        this.y = 0

    }

    //
    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,0,0)'
        // アイテムスロットを描く
            canvas.strokeRect( this.x, this.y, 50, 50)

        //

    }
}
