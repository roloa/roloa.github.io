
import {ResourceItem} from '../tool_item/ResourceItem.js';

export class TutorialData {

    constructor( game ){

        this.game = game;
        this.tutorial_list = [];

        this.condition_check_timer_max = 10;
        this.condition_check_timer_count = this.condition_check_timer_max;

        this.setup_tutorial();
    }
    get_list(){
        return this.tutorial_list;
    }
    setup_tutorial(){

        this.tutorial_list = [];
        let tutorial = null;

        tutorial = {};
        tutorial.title = 'チュートリアルの使い方';
        tutorial.check_list = [];
        tutorial.check_list.push({
        description: 'チュートリアルの項目を達成すると、', is_need_check: false, checked: false, condition_func: function( game ){ return true; }});
        tutorial.check_list.push({
        description: '<-のアイコンがチェックになります。',
        is_need_check: true, checked: true, condition_func: function( game ){
            return true;
        }});
        tutorial.check_list.push({
        description: '全項目を達成したら', is_need_check: false, checked: false, condition_func: function( game ){ return true; }});
        tutorial.check_list.push({
        description: '下の完了ボタンを押して', is_need_check: false, checked: false, condition_func: function( game ){ return true; }});
        tutorial.check_list.push({
        description: '報酬を受け取れます。', is_need_check: false, checked: false, condition_func: function( game ){ return true; }});

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('glass_bin6_clear');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '基本操作';
        tutorial.check_list = [];
        tutorial.check_list.push({
            description: '左右移動: 矢印キー左右 or A,D',
            is_need_check: true, checked: false, condition_func: function( game ){
                return 1 < Math.abs(game.world.player.vx);
        }});
        tutorial.check_list.push({
            description: 'ジャンプ: 矢印キー上, Space or W',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.world.player.vy < -2;
        }});
        tutorial.check_list.push({
            description: '床を降りる: 矢印キー下 or S',
            is_need_check: false, checked: false, condition_func: function( game ){
                return true;
        }});
        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        // クリアマークをfalseに設定しとく
        for( let tutorial of this.tutorial_list ){
            tutorial.cleared = false;
        }
    }
    on_update(){

        // クエスト条件達成チェック
        if( this.condition_check_timer_count ){
            this.condition_check_timer_count -= 1;
        } else {
            this.condition_check_timer_count = this.condition_check_timer_max;
            for( let tutorial of this.tutorial_list ){
                if( !tutorial.cleared ){
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
            for( let check_index = 0 ; check_index < load_data.tutorial_list[ tutorial_index ].check_list.length ; check_index++ ){
                this.tutorial_list[ tutorial_index ].check_list[ check_index ].checked = (
                    load_data.tutorial_list[ tutorial_index ].check_list[ check_index ].checked );
            }
        }
    }
}
