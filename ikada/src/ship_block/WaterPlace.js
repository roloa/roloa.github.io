
import {ShipBlock} from './ShipBlock.js';

export class WaterPlace extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = '水飲み場';

        this.is_floor = false;
        this.image = this.game.image_library.get_image('fantasy_gargoyle_water');
        this.image_empty = this.game.image_library.get_image('fantasy_gargoyle');

        this.saving_data.is_water_filled = true;
        this.saving_data.water_fill_timer = 0;

        this.water_fill_timer_max = 500;
    }
    get_image(){
        if( this.saving_data.is_water_filled ){
            return this.image;
        }
        return this.image_empty;
    }
    on_update(){
        super.on_update();

        if( !this.saving_data.is_water_filled ){
            if( 0 < this.saving_data.water_fill_timer){
                this.saving_data.water_fill_timer -= 1;
            } else {
                this.saving_data.is_water_filled = true;
            }
        }
    }
    on_interact(){

        if( this.saving_data.is_water_filled ){
            this.game.log( this.get_name() + 'の水を飲みました。');
            this.game.log('水分: +50%');
            this.game.world.player.health.mod_thirst(50);
            this.saving_data.is_water_filled = false;
            this.saving_data.water_fill_timer = this.water_fill_timer_max;
        } else {
            this.game.log( '飲み水がまだ足りません。')
            this.game.log( 'もう少し待ちましょう。')
        }
        return true;
    }

}
