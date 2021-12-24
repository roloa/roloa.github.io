
import {RecipeEquip} from './RecipeEquip.js';
import {RecipeShipBlock} from './RecipeShipBlock.js';
import {RecipeTool} from './RecipeTool.js';
import {RecipeWeapon} from './RecipeWeapon.js';

export class CraftRecipe extends Object {

    static CATEGORY_TOOL = 0;
    static CATEGORY_SHIP = 1;
    static CATEGORY_WEAPON = 2;
    static CATEGORY_EQUIP = 3;
    static CATEGORY_COUNT = 4;

    constructor( game ){
        super( game );
        this.game = game;
        this.recipe_list = [];
        this.recipe_list[ CraftRecipe.CATEGORY_TOOL ] = [];
        this.recipe_list[ CraftRecipe.CATEGORY_SHIP ] = [];
        this.recipe_list[ CraftRecipe.CATEGORY_WEAPON ] = [];
        this.recipe_list[ CraftRecipe.CATEGORY_EQUIP ] = [];

        this.category_icon_list = [];
        this.category_icon_list[ CraftRecipe.CATEGORY_TOOL ] = this.game.image_library.get_image( 'fishing_tsurizao_nobezao' );
        this.category_icon_list[ CraftRecipe.CATEGORY_SHIP ] = this.game.image_library.get_image( 'fune_ikada' );
        this.category_icon_list[ CraftRecipe.CATEGORY_WEAPON ] = this.game.image_library.get_image( 'yumiya_bowgun' );
        this.category_icon_list[ CraftRecipe.CATEGORY_EQUIP ] = this.game.image_library.get_image( 'snorkel_goods' );

        this.category_name_list = [];
        this.category_name_list[ CraftRecipe.CATEGORY_TOOL ] = '道具';
        this.category_name_list[ CraftRecipe.CATEGORY_SHIP ] = '舟';
        this.category_name_list[ CraftRecipe.CATEGORY_WEAPON ] = '武器';
        this.category_name_list[ CraftRecipe.CATEGORY_EQUIP ] = '装備';

        this.setup();
    }
    setup(){
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
    get_recipe( category, index ){
        if( category < this.recipe_list.length){
            if( index < this.recipe_list[ category ].length) {
                return this.recipe_list[ category ][ index ];
            }
        }
        return null;
    }
    get_category_index_with_looping( index ){
        // 配列外を1要素だけカバーするよう要素番号を返す
        if( index < 0){
            return CraftRecipe.CATEGORY_COUNT - 1;
        } else if( CraftRecipe.CATEGORY_COUNT <= index ){
            return 0;
        }
        return index;
    }
    get_category_name( index ){
        return this.category_name_list[ this.get_category_index_with_looping( index ) ];
    }
    get_category_icon( index ){
        return this.category_icon_list[ this.get_category_index_with_looping( index ) ];
    }
    add_recipe( category,
        description_list,
        material_list,
        material_count_list,
        result_func,
        recipe_subtitle,
    ){
        let new_recipe = {};
        new_recipe.description_list = description_list;
        new_recipe.material_list = material_list;
        new_recipe.material_count_list = material_count_list;
        new_recipe.result_func = result_func
        new_recipe.sample_item = new_recipe.result_func( this.game );
        new_recipe.image = new_recipe.sample_item.image;
        new_recipe.recipe_subtitle = recipe_subtitle;
        this.recipe_list[ category ].push( new_recipe );
    }

}
