
import {ResourceItem} from '../tool_item/ResourceItem.js';

export class TutorialData {

    constructor( game ){

        this.game = game;

    }
    get_list(){

        let tutorial_list = [];
        let tutorial = null;

        tutorial = {};
        tutorial.title = 'チュートリアルの使い方';
        tutorial.check_list = [];
        tutorial.check_list.push({
            description: 'チュートリアル1',
            is_need_check: true, checked: false, condition_func: function( game ){
                return true;
        }});
        tutorial.check_list.push({
            description: 'チュートリアル2',
            is_need_check: true, checked: false, condition_func: function( game ){
                return false;
        }});
        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('glass_bin6_clear');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '基本操作';
        tutorial.check_list = [];
        tutorial.check_list.push({
            description: '左右移動',
            is_need_check: true, checked: false, condition_func: function( game ){
                return true;
        }});
        tutorial.check_list.push({
            description: 'ジャンプ',
            is_need_check: true, checked: false, condition_func: function( game ){
                return true;
        }});
        tutorial.check_list.push({
            description: '床を降りる',
            is_need_check: true, checked: false, condition_func: function( game ){
                return false;
        }});
        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );


        return tutorial_list;
    }

}
