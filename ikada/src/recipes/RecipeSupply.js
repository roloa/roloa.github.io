
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {SolidFuel} from '../tool_item/SolidFuel.js';
import {AmmoItem} from '../tool_item/AmmoItem.js';
import {AmmoStone} from '../tool_item/AmmoStone.js';
import {CannonAmmoItem} from '../tool_item/CannonAmmoItem.js';


// import {} from '../tool_item/.js';

export class RecipeSupply extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category ){

        c_r.add_recipe( category,
            ['さまざまな設備に補充するための燃料です。'],
            ['fuel'],
            [10],
            function( game ){
                return new SolidFuel( game );},
            ''
        );
        c_r.add_recipe( category,
            ['カタパルトから撃ち出すための小石です。'],
            ['stone'],
            [3],
            function( game ){
                return new AmmoStone( game );},
            ''
        );
        c_r.add_recipe( category,
            ['機銃に補充するための弾薬です。'],
            ['metal', 'fuel'],
            [2, 10],
            function( game ){
                return new AmmoItem( game );},
            ''
        );
        c_r.add_recipe( category,
            ['大砲に補充するための砲弾です。'],
            ['metal', 'fuel'],
            [10, 2],
            function( game ){
                return new CannonAmmoItem( game );},
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
