
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {SolidFuel} from '../tool_item/SolidFuel.js';
import {AmmoItem} from '../tool_item/AmmoItem.js';
import {AmmoStone} from '../tool_item/AmmoStone.js';
import {CannonAmmoItem} from '../tool_item/CannonAmmoItem.js';
import {MedicalPack} from '../tool_item/d_foods/MedicalPack.js';
import {StaminaPack} from '../tool_item/d_foods/StaminaPack.js';


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
            ['カタパルトから撃ち出すための石ころです。'],
            ['stone'],
            [10],
            function( game ){
                return new AmmoStone( game );},
            ''
        );
        c_r.add_recipe( category,
            ['機銃に補充するための弾薬です。'],
            ['lead', 'fuel'],
            [10, 10],
            function( game ){
                return new AmmoItem( game );},
            ''
        );
        c_r.add_recipe( category,
            ['大砲に補充するための砲弾です。'],
            ['iron', 'fuel'],
            [10, 10],
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
                new_item.set_name('燃料マテリアル (木材)');
                new_item.set_image( 'fuel_wood' );
                new_item.add_material( 'fuel', 10);
                return new_item; },
            'wood'
        );
        c_r.add_recipe( category,
            ['残飯を燃料マテリアルに変換します。'],
            ['leftover'],
            [10],
            function( game ){
                let new_item = new ResourceItem( game );
                new_item.set_name('燃料マテリアル (残飯)');
                new_item.set_image( 'fuel_leftover' );
                new_item.add_material( 'fuel', 10);
                return new_item; },
            'lo'
        );
        c_r.add_recipe( category,
            ['羽根を燃料マテリアルに変換します。'],
            ['feather'],
            [10],
            function( game ){
                let new_item = new ResourceItem( game );
                new_item.set_name('燃料マテリアル (羽根)');
                new_item.set_image( 'fuel_feather' );
                new_item.add_material( 'fuel', 10);
                return new_item; },
            'fea'
        );

        c_r.add_recipe( category,
            ['布切れを燃料マテリアルに変換します。'],
            ['cloth'],
            [10],
            function( game ){
                let new_item = new ResourceItem( game );
                new_item.set_name('燃料マテリアル (布)');
                new_item.set_image( 'fuel_cloth' );
                new_item.add_material( 'fuel', 10);
                return new_item; },
            'cloth'
        );

        c_r.add_recipe( category,
            ['消費すると体力を回復します。'],
            ['jar', 'leftover','feather'],
            [1, 10, 5],
            function( game ){ return new MedicalPack( game ) },
            ''
        );
        c_r.add_recipe( category,
            ['消費するとスタミナを回復します。'],
            ['jar', 'leftover', 'feather'],
            [1, 5, 10],
            function( game ){ return new StaminaPack( game ) },
            ''
        );
    }
}
