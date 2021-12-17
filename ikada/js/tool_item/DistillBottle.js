

import {ToolItem} from './ToolItem.js';

export class DistillBottle extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'science_senjoubin_empty');
        this.image_filled = this.game.image_library.get_image( 'science_senjoubin');

        this.is_filled = false;
    }
    get_cooked_item(){
        this.is_filled = true;
        return this;
    }
    get_image(){
        if( this.is_filled ){
            return this.image_filled;
        }
        return this.image;
    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 満腹度を回復させる
        if( this.is_filled ){
            this.game.world.player.health.mod_thirst( 50 );
            this.is_filled = false;
        } else {
            this.game.log('ボトルは空です。')
            this.game.log('焚き火にかけて飲み水を蒸留しましょう。')
        }

    }

}
