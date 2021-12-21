
import {RecipeEquip} from './RecipeEquip.js';
import {RecipeShipBlock} from './RecipeShipBlock.js';
import {RecipeTool} from './RecipeTool.js';
import {RecipeWeapon} from './RecipeWeapon.js';

export class CraftRecipe extends Object {
    constructor( game ){
        super( game );
        this.game = game;
        this.recipe_list = [];
        this.setup();
    }
    setup(){

        let new_recipe = null;

        let recipe_lib = null;
        recipe_lib = new RecipeTool( this.game );
        recipe_lib.setup_recipe( this, 0 );
        recipe_lib = new RecipeShipBlock( this.game );
        recipe_lib.setup_recipe( this, 1 );
        recipe_lib = new RecipeWeapon( this.game );
        recipe_lib.setup_recipe( this, 2 );
        recipe_lib = new RecipeEquip( this.game );
        recipe_lib.setup_recipe( this, 3 );

    }
    add_recipe( category,
        description_list,
        material_list,
        material_count_list,
        result_func,
        icon_mini_text,
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
