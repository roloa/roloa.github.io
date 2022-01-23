
import {ShipBlock} from './ShipBlock.js';
import {VeggieTomato} from '../tool_item/d_foods/VeggieTomato.js';
import {DistillBottle} from '../tool_item/DistillBottle.js';

export class ShipFarm extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = '名もなきプランター';

        this.is_floor = false;
        this.image = this.game.image_library.get_image('dougu_torobune_tsuchi');
        this.image_dark = this.game.image_library.get_image('dougu_torobune_tsuchi');
        this.food = null;
        this.saving_data.growing_timer = 0;
        this.growing_timer_max = 5 * 60 * 50; // 5min

        this.saving_data.water_timer = 0;
        this.water_timer_max = 60 * 50; // 1minの間
        this.water_grow_multiplyer = 3; // 3倍速で育つ
    }

    get_image(){
        if( 0 < this.saving_data.water_timer ){
            return this.image_dark;
        }
        return this.image;
    }
    on_interact(){

        if( this.food ){
            // 調理結果をプレイヤーの位置に生成
            this.game.world.give_tool_item_player( this.food );
            this.food = null;
            this.saving_data.growing_timer = this.growing_timer_max;
            return true;
        } else {
            let bottle = this.game.hud.item_slot.get_active_item();
            if( bottle && bottle instanceof DistillBottle ) {
                let okey = true;
                if( !bottle.saving_data.is_filled ){
                    this.game.log('そのボトルは空っぽです。');
                    okey = false;
                }
                if( 0 < this.saving_data.water_timer ){
                    this.game.log('まだ水をやる必要はありません。');
                    this.game.log('約'+ Math.floor( this.saving_data.water_timer / 50 ) + '秒後にもう一度試してください。');
                    okey = false;
                }
                if( okey ){
                    bottle.saving_data.is_filled = false;
                    this.saving_data.water_timer = this.water_timer_max;
                    this.game.log( this.name + 'に水をやりました。');
                }
                return true;
            } else {
                this.game.log('まだ野菜がなっていません。');
                this.game.log('次の収穫まで約'+ Math.floor( this.saving_data.growing_timer / 50 ) + '秒かかります');
                if( 0 < this.saving_data.water_timer ){
                    this.game.log('水の効果時間: 約'+ Math.floor( this.saving_data.water_timer / 50 ) + '秒');
                    this.game.log('収穫カウントが '+ this.water_grow_multiplyer +' 倍の早さで進みます');
                }
            }

        }
        return false;
    }
    generate_veggie(){
        return new VeggieTomato( this.game );
    }
    on_update(){
        super.on_update();

        if( this.food == null ){
            //
            if( 0 < this.saving_data.growing_timer ){
                if( 0 < this.saving_data.water_timer ){
                    this.saving_data.water_timer -= 1;
                    this.saving_data.growing_timer -= 1 * this.water_grow_multiplyer;
                } else {
                    this.saving_data.growing_timer -= 1;
                }
            } else {
                // 野菜の成長完了
                this.food = this.generate_veggie();
            }
        }
    }
    on_draw( canvas ){
        super.on_draw( canvas );

        if( this.food != null ) {
            canvas.drawImage( this.food.get_image(), -ShipBlock.BLOCK_RADIUS * 0.5, -ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_RADIUS, ShipBlock.BLOCK_RADIUS);
        }
    }

    save_data(){
        let data = super.save_data();
        if( this.food != null ){
            data.food = this.food.save_data()
        }
        return data;
    }
    load_data( data ){
        super.save_data( data );
        if( data.food ){
            this.food = this.game.save_data_manager.deserialize_item( data.food );
        }
    }
}
