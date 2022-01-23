
import {ShipBlock} from './ShipBlock.js';
import {DistillBottle} from '../tool_item/DistillBottle.js';


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

            if( 0 < this.saving_data.water_fill_timer){
                this.saving_data.water_fill_timer -= 1;
            } else {
                if( !this.saving_data.is_water_filled ){
                    this.saving_data.water_fill_timer = this.water_fill_timer_max;
                    this.saving_data.is_water_filled = true;
                }
        }
    }
    on_interact(){

        if( this.saving_data.is_water_filled ){

            let bottle = this.game.hud.item_slot.get_active_item();
            if( bottle && bottle instanceof DistillBottle ) {
                if( bottle.saving_data.is_filled ){
                    this.game.log('そのボトルにはもう水が入っています。');
                } else {
                    bottle.saving_data.is_filled = true;
                    this.saving_data.is_water_filled = false;
                    this.game.log('ボトルに水を入れました。');
                }
            } else {
                if( this.game.world.player.health.max_thirst * 0.95 < this.game.world.player.health.thirst ){
                    this.game.log('今はこれ以上飲めません。');
                } else {
                    this.game.log( this.get_name() + 'の水を飲みました。');
                    this.game.log('水分: +50%');
                    this.game.world.player.health.mod_thirst(50);
                    this.saving_data.is_water_filled = false;
                }
            }
        } else {
            this.game.log( '飲み水がまだ足りません。')
            this.game.log( '充填まで約'+ Math.floor( this.saving_data.water_fill_timer / 50 ) + '秒かかります。');
        }
        return true;
    }

}
