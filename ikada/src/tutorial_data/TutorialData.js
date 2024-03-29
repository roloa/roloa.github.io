
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {TutorialLevel0} from './TutorialLevel0.js';
import {TutorialLevel1} from './TutorialLevel1.js';

export class TutorialData {

    constructor( game ){

        this.game = game;
        this.tutorial_list = [];

        this.condition_check_timer_max = 10;
        this.condition_check_timer_count = this.condition_check_timer_max;

        this.complete_flag_list = [];

        this.setup_tutorial();
    }
    get_list(){
        return this.tutorial_list;
    }
    complete( key ){
        this.complete_flag_list[ key ] = true;
    }
    setup_tutorial(){

        let level0 = new TutorialLevel0( this.game );
        level0.setup_tutorial( this.tutorial_list );
        let level1 = new TutorialLevel1( this.game );
        level1.setup_tutorial( this.tutorial_list );

        for( let tutorial of this.tutorial_list ){
            // クリアマークをfalseに設定しとく
            tutorial.cleared = false;
            // レベルに応じて開放状態を決める
            if( tutorial.level == 0 ){
                tutorial.is_open = true;
            } else {
                tutorial.is_open = false;
            }
        }


    }
    update_tutorial_is_open(){
        for( let tutorial of this.tutorial_list ){
            // レベルに応じて開放状態を決める
            if( tutorial.is_open == false && tutorial.level <= this.game.world.ship.ship_level){
                tutorial.is_open = true;
            }
        }
    }
    on_update(){

        // クエスト条件達成チェック
        if( this.condition_check_timer_count ){
            this.condition_check_timer_count -= 1;
        } else {
            this.condition_check_timer_count = this.condition_check_timer_max;
            for( let tutorial of this.tutorial_list ){
                if( tutorial.is_open && !tutorial.cleared ){
                    for( let check_list of tutorial.check_list ){
                        if( check_list.is_need_check && !check_list.checked ){
                            if( check_list.condition_func( this.game ) ){
                                check_list.checked = true;
                                this.game.log('次のチュートリアル項目を達成しました:');
                                this.game.log(tutorial.title + ': ' + check_list.description);
                            }
                        }
                    }
                }
            }
        }
    }
    save_data(){
        let save_data = {};
        save_data.tutorial_list = [];
        for( let tutorial_index = 0 ; tutorial_index < this.tutorial_list.length ; tutorial_index++ ){
            save_data.tutorial_list[ tutorial_index ] = {};
            save_data.tutorial_list[ tutorial_index ].cleared = this.tutorial_list[ tutorial_index ].cleared;
            save_data.tutorial_list[ tutorial_index ].is_open = this.tutorial_list[ tutorial_index ].is_open;
            save_data.tutorial_list[ tutorial_index ].check_list = [];
            for( let check_index = 0 ; check_index < this.tutorial_list[ tutorial_index ].check_list.length ; check_index++ ){
                save_data.tutorial_list[ tutorial_index ].check_list[ check_index ] = {};
                save_data.tutorial_list[ tutorial_index ].check_list[ check_index ].checked = (
                this.tutorial_list[ tutorial_index ].check_list[ check_index ].checked );
            }
        }
        return save_data;
    }
    load_data( load_data ){
        for( let tutorial_index = 0 ; tutorial_index < load_data.tutorial_list.length ; tutorial_index++ ){
            this.tutorial_list[ tutorial_index ].cleared = load_data.tutorial_list[ tutorial_index ].cleared;
            this.tutorial_list[ tutorial_index ].is_open = load_data.tutorial_list[ tutorial_index ].is_open;
            for( let check_index = 0 ; check_index < load_data.tutorial_list[ tutorial_index ].check_list.length ; check_index++ ){
                this.tutorial_list[ tutorial_index ].check_list[ check_index ].checked = (
                    load_data.tutorial_list[ tutorial_index ].check_list[ check_index ].checked );
            }
        }
    }
}
