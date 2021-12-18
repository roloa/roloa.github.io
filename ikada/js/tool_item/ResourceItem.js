

import {ToolItem} from './ToolItem.js';

export class ResourceItem extends ToolItem {

    constructor( game ){
        super( game )

        this.saving_data.materials_id = [];
        this.saving_data.materials_count = [];

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

    generate_drifting_item(){
        // 自身に漂流物を生成する

        let item_type = Math.floor( Math.random() * 3 );
        if( item_type == 0 ){
            // 木
            this.set_image( 'tree_ryuuboku' );
            this.add_material( 'wood', 5);
        } else if( item_type == 1 ){
            // 機械
            this.set_image( 'junk_kikai' );
            this.add_material( 'mech_parts', 2);
            this.add_material( 'metal', 3);
        } else if( item_type == 2 ){
            // シャツ
            this.set_image( 'alohashirt_gray' );
            this.add_material( 'cloth', 3);
        }

    }

}
