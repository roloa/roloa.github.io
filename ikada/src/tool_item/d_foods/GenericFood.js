
import {ToolItem} from '../ToolItem.js';

export class GenericFood extends ToolItem {

    constructor( game ){
        super( game )

        this.image = this.game.image_library.get_image( 'wasyoku_yakizakana');
        this.saving_data.item_name = '名もなき食べ物';
        this.saving_data.hunger_value = 5;
        this.saving_data.thirst_value = 5;
        this.saving_data.is_be_leftover = true;

    }
    on_click( cursor_x, cursor_y, player_x, player_y ){
        // 満腹度を回復させる
        if( this.saving_data.hunger_value < this.saving_data.thirst_value){
            this.game.log( this.saving_data.item_name + 'を飲みました。');
        } else {
            this.game.log( this.saving_data.item_name + 'を食べました。');
        }
        this.game.log( '養分: +' + this.saving_data.hunger_value + '%')
        this.game.log( '水分: +' + this.saving_data.thirst_value + '%')

        let leftover = this.game.world.player.health.mod_hunger( this.saving_data.hunger_value );
        this.game.world.player.health.mod_thirst( this.saving_data.thirst_value );

        if( this.saving_data.is_be_leftover && 10 < leftover ){
            this.game.materials.put_material( 'leftover', Math.floor( leftover / 9 ) )
        }
        this.is_consumed = true;
    }
    dump_information_to_log(){
        this.game.log( this.saving_data.item_name );
        this.game.log( '養分: +' + this.saving_data.hunger_value + '%')
        this.game.log( '水分: +' + this.saving_data.thirst_value + '%')
        this.game.log('何もない場所をクリックする事でこれを食べます。');

    }
}
