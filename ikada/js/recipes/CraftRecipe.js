
import {Bow} from '../tool_item/Bow.js';

import {BuildBlock} from '../tool_item/BuildBlock.js'
import {ShipFloor} from '../ship_block/ShipFloor.js';
import {FirePlace} from '../ship_block/FirePlace.js';
import {DeconstructHammer} from '../tool_item/DeconstructHammer.js';
import {DistillBottle} from '../tool_item/DistillBottle.js';
import {FishRod} from '../tool_item/FishRod.js';
import {EquipmentItem} from '../tool_item/EquipmentItem.js';
import {Spear} from '../tool_item/Spear.js';
import {Oar} from '../tool_item/Oar.js';

import {DroneHome} from '../ship_block/DroneHome.js';
import {DryLack} from '../ship_block/DryLack.js';
import {ShipFrame} from '../ship_block/ShipFrame.js';
import {WaterPlace} from '../ship_block/WaterPlace.js';
import {ShipFarm} from '../ship_block/ShipFarm.js';
import {VictoryRocket} from '../ship_block/VictoryRocket.js';


// import {} from '../tool_item/.js';
// import {} from '../ship_block/.js';

export class CraftRecipe extends Object {
    constructor( game ){
        super( game );
        this.game = game;
        this.recipe_list = [];
        this.setup();
    }
    setup(){

        let new_recipe = null;

        this.add_recipe(
            ['ヴィクトリーロケット。','これを設置して作動させたら*勝利*です。'],
            ['bone'],
            [99],
            function( game ){ return new BuildBlock( game ).set_ship_block( new VictoryRocket( game ) ); },
            ''
        );

        this.add_recipe(
            ['舟の骨組みです。','床と違って上に乗れません。'],
            ['wood'],
            [1],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFrame( game ) ); },
            ''
        );

        this.add_recipe(
            ['食材を乾燥させます。'],
            ['wood', 'cloth'],
            [5, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new DryLack( game ) ); },
            ''
        );

        this.add_recipe(
            ['1機のドローンを放出・維持する基地です。'],
            ['metal', 'plastic','mech_parts'],
            [5, 5, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new DroneHome( game ) ); },
            ''
        );

        this.add_recipe(
            ['水飲み場です。 時間経過で飲み水がたまります。'],
            ['metal', 'plastic'],
            [10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WaterPlace( game ) ); },
            ''
        );

        this.add_recipe(
            ['作物を育てます。'],
            ['leftover', 'wood'],
            [5, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFarm( game ) ); },
            ''
        );

        this.add_recipe(
            ['舟を漕げば、より多くの素材が流れてきます。'],
            ['wood'],
            [3],
            function( game ){ return new Oar( game ); },
            'Lv1'
        );

        this.add_recipe(
            ['魚釣りができます。','海に浮いているものを引き揚げることも出来ます。'],
            ['wood', 'cloth'],
            [3, 1],
            function( game ){ return new FishRod( game ); },
            'Lv1'
        );

        this.add_recipe(
            ['遠距離武器です。',''],
            ['wood', 'cloth'],
            [3, 1],
            function( game ){ return new Bow( game ); },
            'Lv1'
        );

        this.add_recipe(
            ['近接武器です。',''],
            ['wood', 'metal'],
            [3, 1],
            function( game ){ return new Spear( game ); },
            'Lv1'
        );

        new_recipe = {};
        new_recipe.description_list = [
            '撤去ハンマー', '船のブロックを撤去できます。'];
        new_recipe.material_list = ['wood', 'metal'];
        new_recipe.material_count_list = [3, 3];
        new_recipe.result_func = function( game ){
            return new DeconstructHammer( game );
        }
        new_recipe.sample_item = new_recipe.result_func( this.game );
        new_recipe.image = new_recipe.sample_item.image;
        new_recipe.icon_mini_text = 'Lv1';
        this.recipe_list.push( new_recipe );

        new_recipe = {};
        new_recipe.description_list = [
            '蒸留ボトル',
            '焚き火にかけることで飲み水を得られます。'];
        new_recipe.material_list = [ 'plastic' ];
        new_recipe.material_count_list = [3];
        new_recipe.result_func = function( game ){
            return new DistillBottle( game );
        }
        new_recipe.sample_item = new_recipe.result_func( this.game );
        new_recipe.image = new_recipe.sample_item.image;
        new_recipe.icon_mini_text = '';
        this.recipe_list.push( new_recipe );

        new_recipe = {};
        new_recipe.description_list = [
            '船の床ブロックです。',
            '使用して配置できます。'];
        new_recipe.material_list = ['wood'];
        new_recipe.material_count_list = [10];
        new_recipe.result_func = function( game ){
            let result = new BuildBlock( game );
            let block = new ShipFloor( game );
            result.set_ship_block( block );
            return result;
        }
        new_recipe.sample_item = new_recipe.result_func( this.game );
        new_recipe.image = new_recipe.sample_item.image;
        new_recipe.icon_mini_text = 'F';
        this.recipe_list.push( new_recipe );

        new_recipe = {};
        new_recipe.description_list = [
            '船に設置する焚き火です。',
            '配置して、生の食材を調理できます。'];
        new_recipe.material_list = ['wood'];
        new_recipe.material_count_list = [10];
        new_recipe.result_func = function( game ){
            let result = new BuildBlock( game );
            let block = new FirePlace( game );
            result.set_ship_block( block );
            return result;
        }
        new_recipe.sample_item = new_recipe.result_func( this.game );
        new_recipe.image = new_recipe.sample_item.image;
        new_recipe.icon_mini_text = 'F';
        this.recipe_list.push( new_recipe );



    }
    add_recipe(
        description_list,
        material_list,
        material_count_list,
        result_func,
        icon_mini_text
    ){
        let new_recipe = {};
        new_recipe.description_list = description_list;
        new_recipe.material_list = material_list;
        new_recipe.material_count_list = material_count_list;
        new_recipe.result_func = result_func
        new_recipe.sample_item = new_recipe.result_func( this.game );
        new_recipe.image = new_recipe.sample_item.image;
        new_recipe.icon_mini_text = icon_mini_text;
        this.recipe_list.push( new_recipe );
    }

}
