

import {ToolItem} from './ToolItem.js';

export class ResourceItem extends ToolItem {

    constructor( game ){
        super( game )

        this.saving_data.materials_id = [];
        this.saving_data.materials_count = [];

        this.saving_data.item_name = 'noname resource';

    }

    add_material( m_id, m_count){
        this.saving_data.materials_id.push( m_id );
        this.saving_data.materials_count.push( m_count );

    }

    on_click( cursor_x, cursor_y, player_x, player_y ){
        for( let i = 0 ; i < this.saving_data.materials_id.length ; i++ ){
            //this.game.log(this.materials_id[i] + ' x ' + this.materials_count[i] );
            this.game.materials.put_material( this.saving_data.materials_id[i], this.saving_data.materials_count[i] );
        }
        this.is_consumed = true;
    }



}
