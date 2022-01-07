
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {SolidFuel} from '../tool_item/SolidFuel.js';
import {AmmoItem} from '../tool_item/AmmoItem.js';

// import {} from '../tool_item/.js';

export class RecipeSupply extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category ){

        c_r.add_recipe( category,
            ['設備に補充するための燃料です。'],
            ['fuel'],
            [10],
            function( game ){
                return new SolidFuel( game );},
            ''
        );
        c_r.add_recipe( category,
            ['設備に補充するための弾薬です。'],
            ['metal', 'fuel'],
            [2, 10],
            function( game ){
                return new AmmoItem( game );},
            ''
        );

        c_r.add_recipe( category,
            ['木材を燃料マテリアルに変換します。'],
            ['wood'],
            [10],
            function( game ){
                let new_item = new ResourceItem( game );
                new_item.set_image( 'cooking_kokei_nenryou_fire' );
                new_item.add_material( 'fuel', 10);
                return new_item; },
            'wood'
        );


    }
}
