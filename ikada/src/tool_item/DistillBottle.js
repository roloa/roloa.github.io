

import {ToolItem} from './ToolItem.js';

export class DistillBottle extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'science_senjoubin_empty');
        this.image_filled = this.game.image_library.get_image( 'science_senjoubin');

        this.saving_data.item_name = '蒸留ボトル';

        this.saving_data.is_filled = true;
    }
    get_cooked_item(){
        this.saving_data.is_filled = true;
        return this;
    }
    get_image(){
        if( this.saving_data.is_filled ){
            return this.image_filled;
        }
        return this.image;
    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 満腹度を回復させる
        if( this.saving_data.is_filled ){
            this.game.log('ボトルの水を飲みました。');
            this.game.log('水分: +50%');
            this.game.world.player.health.mod_thirst( 50 );
            this.saving_data.is_filled = false;
        } else {
            this.game.log('ボトルは空です。')
            this.game.log('焚き火にかけて飲み水を蒸留しましょう。')
        }

    }

}
