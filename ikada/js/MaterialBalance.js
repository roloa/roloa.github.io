
import {FishKirimi} from './tool_item/d_foods/FishKirimi.js';
import {ResourceItem} from './tool_item/ResourceItem.js';
import {ContainerItem} from './tool_item/ContainerItem.js';

export class MaterialBalance {


    constructor( game ){
        this.game = game;
    }

    // 釣りで手に入るもの
    get_fishing_result(){

        let item_type = Math.floor( Math.random() * 100 );
        if( item_type < 30 ){
            let fishing_result = new ResourceItem();
            fishing_result.saving_data.item_name = '流木';
            fishing_result.set_image( 'tree_ryuuboku' );
            fishing_result.add_material( 'wood', 5);
            return fishing_result;
        } else if( item_type < 60 ){
            let fishing_result = new ResourceItem();
            fishing_result.saving_data.item_name = '石';
            fishing_result.set_image( 'nature_stone_ishi' );
            fishing_result.add_material( 'stone', 5);
            return fishing_result;
        }
        // 魚
        let fishing_result = new ContainerItem( this.game );
        fishing_result.set_image('fish_sakana_iwashi');
        fishing_result.set_content( new FishKirimi( this.game ) );
        return fishing_result;
    }

    // 漂流物
    get_drifting_item(){
        // 自身に漂流物を生成する
        let drifting_item = null;

        let item_type = Math.floor( Math.random() * 100 );
        if( item_type < 30 ){
            drifting_item = new ResourceItem( this.game );
            drifting_item.saving_data.item_name = '流木';
            drifting_item.set_image( 'tree_ryuuboku' );
            drifting_item.add_material( 'wood', 5);
        } else if( item_type < 60 ){
            drifting_item = new ResourceItem( this.game );
            drifting_item.saving_data.item_name = '古着';
            drifting_item.set_image( 'alohashirt_gray' );
            drifting_item.add_material( 'cloth', 5);
        } else if( item_type < 90 ){
            drifting_item = new ResourceItem( this.game );
            drifting_item.saving_data.item_name = '空き缶';
            drifting_item.set_image( 'gomi_can' );
            drifting_item.add_material( 'iron', 3);
        } else if( item_type < 100 ){
            drifting_item = new ResourceItem( this.game );
            drifting_item.set_image( 'glass_bin6_clear' );
            drifting_item.saving_data.item_name = 'ビン';
            drifting_item.add_material( 'jar', 1);
        } else {
            drifting_item = new ResourceItem( this.game );
            drifting_item.saving_data.item_name = 'ボトル';
            drifting_item.set_image( 'glass_bin6_clear' );
            drifting_item.add_material( 'jar', 1);
        }
        return drifting_item;
    }

}
