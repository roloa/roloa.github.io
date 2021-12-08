
import {Bow} from '/tool_item/bow.js';


export class CraftRecipe extends Object {
    constructor( game ){
        super( game );
        this.game = game;

        this.recipe_list = [];
        this.setup();

    }

    setup(){

        let new_recipe = null;

        new_recipe = {};
        new_recipe.description_list = [
            '遠距離武器です。',
            '矢を使います。'];
        new_recipe.material_list = ['wood', 'cloth'];
        new_recipe.material_count_list = [3, 1];
        new_recipe.result_func = function( game ){
            return new Bow( game );
        }
        new_recipe.sample_item = new_recipe.result_func( this.game );
        new_recipe.image = new_recipe.sample_item.image;
        new_recipe.icon_mini_text = 'Lv1';

        this.recipe_list.push( new_recipe );


    }
}
