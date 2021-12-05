

import {ToolItem} from '/tool_item.js';

export class ResourceItem extends ToolItem {

    constructor( game ){
        super( game )

        this.materials_name = [];
        this.materials_count = [];
    }

    add_material( m_name, m_count){
        this.materials_name.push( m_name );
        this.materials_count.push( m_count );

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        for( let i = 0 ; i < this.materials_name.length ; i++ ){
            this.game.log(this.materials_name[i] + ' x ' + this.materials_count[i] );
        }
    }

}
