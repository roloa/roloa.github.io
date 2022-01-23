
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {FishRod} from '../tool_item/FishRod.js';
import {GenericFood} from '../tool_item/d_foods/GenericFood.js';

import {FirePlace} from '../ship_block/FirePlace.js';

import {WeaponItem} from '../tool_item/WeaponItem.js';
import {BuildBlock} from '../tool_item/BuildBlock.js';

import {TutorialLevel0} from './TutorialLevel0.js';

export class TutorialLevel1 extends TutorialLevel0{

    constructor( game ){
        super( game );
        this.game = game;

        this.tutorial_level = 1;
    }
    desc_only( description ){
        return {
            description: description,
            is_need_check: false,
            checked: false,
            condition_func: function( game ){ return true; }
        };
    }
    need_cond( description, condition_func ){
        return {
            description: description,
            is_need_check: true,
            checked: false,
            condition_func: condition_func
        };
    }
    setup_tutorial( tutorial_list ){

        let tutorial = null;

        // tutorial = {};
        // tutorial.title = '(この項目が見えたらバグです。)';
        // tutorial.check_list = [];
        // tutorial.check_list.push( this.desc_only('この文章が見えたらバグです。'));
        //
        // tutorial.reword_tool_item = new ResourceItem( this.game );
        // tutorial.reword_tool_item.set_image('tree_ryuuboku');
        // tutorial.reword_tool_item.set_name('マテリアル: 木材 x 1');
        // tutorial.reword_tool_item.add_material('wood', 1);
        // tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = 'チュートリアルの使い方';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('チュートリアルの項目を達成すると、'));
        tutorial.check_list.push( this.need_cond( '<-のアイコンがチェックになります。',
            function( game ){
                return true;
        }));
        tutorial.check_list.push( this.desc_only('全項目を達成したら'));
        tutorial.check_list.push( this.desc_only('下の完了ボタンを押して'));
        tutorial.check_list.push( this.desc_only('報酬を受け取れます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('tree_ryuuboku');
        tutorial.reword_tool_item.set_name('マテリアル: 木材 x 10');
        tutorial.reword_tool_item.add_material('wood', 10);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '基本操作 2';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( '左右移動: 矢印キー左右 or A,D',
            function( game ){
                return 1 < Math.abs(game.world.player.vx);
        }));
        tutorial.check_list.push( this.need_cond( 'ジャンプ: 矢印キー上, Space or W',
            function( game ){
                return game.world.player.vy < -2;
        }));
        tutorial.check_list.push( this.need_cond( '床を降りる: 矢印キー下 or S',
            function( game ){
                return true;
        }));
        tutorial.check_list.push( this.need_cond( 'メニュー開閉: Tabキー',
            function( game ){
                return true;
        }));
        tutorial.check_list.push( this.desc_only(' 　　or 画面左上のメニューボタン'));
        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('glass_bin6_clear');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );


        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = 'レベルフラッグ[2]';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'レベルフラッグ[2]を作成して設置する',
            function( game ){
                return 2 <= game.world.ship.ship_level;
        }));

        tutorial.check_list.push( this.desc_only('材料を効率よく集めて、'));
        tutorial.check_list.push( this.desc_only('次のレベルフラッグを立てましょう。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: 電子回路 x 1');
        tutorial.reword_tool_item.add_material('circuit', 1);
        tutorial_list.push( tutorial );

        // tutorial = {};
        // tutorial.title = '';
        // tutorial.check_list = [];
        // tutorial.check_list.push( this.desc_only(''));
        //
        // tutorial.reword_tool_item = new ResourceItem( this.game );
        // tutorial.reword_tool_item.set_image('present_box');
        // tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        // tutorial.reword_tool_item.add_material('jar', 1);
        // tutorial_list.push( tutorial );


    }


}
