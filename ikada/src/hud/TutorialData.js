
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {FishRod} from '../tool_item/FishRod.js';
import {GenericFood} from '../tool_item/d_foods/GenericFood.js';
import {ChickenCookedMoto} from '../tool_item/d_foods/ChickenCookedMoto.js';
import {FirePlace} from '../ship_block/FirePlace.js';
import {DistillBottle} from '../tool_item/DistillBottle.js';


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

        this.tutorial_list = [];
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
        // this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'チュートリアルの使い方';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('チュートリアルの項目を達成すると、'));
        tutorial.check_list.push({
        description: '<-のアイコンがチェックになります。',
        is_need_check: true, checked: true, condition_func: function( game ){
            return true;
        }});
        tutorial.check_list.push( this.desc_only('全項目を達成したら'));
        tutorial.check_list.push( this.desc_only('下の完了ボタンを押して'));
        tutorial.check_list.push( this.desc_only('報酬を受け取れます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('tree_ryuuboku');
        tutorial.reword_tool_item.set_name('マテリアル: 木材 x 10');
        tutorial.reword_tool_item.add_material('wood', 10);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '基本操作 1';
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
        tutorial.check_list.push({
            description: 'メニュー開閉: Tabキー',
            is_need_check: false, checked: false, condition_func: function( game ){
                return true;
        }});
        tutorial.check_list.push( this.desc_only(' 　　or 画面左上のメニューボタン'));
        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('glass_bin6_clear');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '基本操作 2';
        tutorial.check_list = [];
        tutorial.check_list.push({
            description: 'アイテム使用: マウスクリック',
            is_need_check: false, checked: false, condition_func: function( game ){
                return true;
        }});
        tutorial.check_list.push({
            description: 'アイテム選択: マウスホイール',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.hud.item_slot.item_slot_cursor != 0;
        }});
        tutorial.check_list.push( this.desc_only('　　 or 画面下のアイテム欄クリック'));
        tutorial.check_list.push({
            description: 'カメラ操作: 画面左のカメラボタン',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.world.camera.zoom != 1;
        }});
        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('glass_bin6_clear');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'インベントリ メニュー';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('持っているアイテムを管理する画面です。'));
        tutorial.check_list.push( this.desc_only('クリックでアイテムを移動できます。'));
        tutorial.check_list.push( this.desc_only('1-9キーでアイテムを枠に移動させます。'));
        tutorial.check_list.push( this.desc_only('ゴミ箱にアイテムを置くと消去できます。'));
        tutorial.check_list.push({
            description: 'インベントリ メニューを開く',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.hud.hud_menu.menu_list_cursor == 1;
        }});

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('alohashirt_gray');
        tutorial.reword_tool_item.set_name('マテリアル: 布切れ x 10');
        tutorial.reword_tool_item.add_material('cloth', 10);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'クラフト メニュー';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('マテリアルからアイテムを製作する画面です。'));
        tutorial.check_list.push( this.desc_only('作りたいアイテムを選び、'));
        tutorial.check_list.push( this.desc_only('右下の製作ボタンで、'));
        tutorial.check_list.push( this.desc_only('マテリアルを消費してアイテムを作ります。'));
        tutorial.check_list.push({
            description: 'クラフト メニューを開く',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.hud.hud_menu.menu_list_cursor == 2;
        }});
        tutorial.check_list.push({
            description: '釣り竿 Lv1を製作する',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.hud.item_slot.has_item_instanceof( FishRod );
        }});

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('gomi_can');
        tutorial.reword_tool_item.set_name('マテリアル: 鉄クズ x 10');
        tutorial.reword_tool_item.add_material('iron', 10);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'マテリアル メニュー';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('持っているマテリアルを確認する画面です。'));
        tutorial.check_list.push( this.desc_only('マテリアルとは、'));
        tutorial.check_list.push( this.desc_only('アイテムを作るための素材です。'));
        tutorial.check_list.push( this.desc_only('所持上限は基本的にありません。'));
        tutorial.check_list.push({
            description: 'マテリアル メニューを開く',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.hud.hud_menu.menu_list_cursor == 3;
        }});
        tutorial.check_list.push({
            description: '鉄クズを30個以上集める',
            is_need_check: true, checked: false, condition_func: function( game ){
                return 30 <= game.materials.get_material('iron');
        }});

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('tree_ryuuboku');
        tutorial.reword_tool_item.set_name('マテリアル: 木材 x 20');
        tutorial.reword_tool_item.add_material('wood', 20);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'コンフィグ メニュー';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('ゲームの保存や設定変更をする画面です。'));
        tutorial.check_list.push({
            description: 'コンフィグ メニューを開く',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.hud.hud_menu.menu_list_cursor == 4;
        }});
        tutorial.check_list.push({
            description: 'データ[1]にセーブする',
            is_need_check: true, checked: false, condition_func: function( game ){
                return (game.tutorial_data.complete_flag_list[ this.description ] == true);
        }});

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'ステータス';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('画面左下に並んだゲージは、'));
        tutorial.check_list.push( this.desc_only('プレイヤーのステータスです。'));

        tutorial.reword_tool_item = new ChickenCookedMoto( this.game );
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'ステータス: 体力';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('左下の赤いゲージは体力で、'));
        tutorial.check_list.push( this.desc_only('なくなると死んでしまいます。'));
        tutorial.check_list.push( this.desc_only('鳥の攻撃に当たったり、'));
        tutorial.check_list.push( this.desc_only('食事を取らずに行動し続けると'));
        tutorial.check_list.push( this.desc_only('減ってしまいます。'));
        tutorial.check_list.push( this.desc_only('体力は少しずつ自然に回復します。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('tree_ryuuboku');
        tutorial.reword_tool_item.set_name('マテリアル: 木材 x 1');
        tutorial.reword_tool_item.add_material('wood', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'ステータス: スタミナ';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('左下の黄色のゲージはスタミナで、'));
        tutorial.check_list.push( this.desc_only('ジャンプやアイテム使用などの'));
        tutorial.check_list.push( this.desc_only('行動によって減少します。'));
        tutorial.check_list.push( this.desc_only('なくなるとスタミナを使う行動ができません。'));
        tutorial.check_list.push( this.desc_only('スタミナは自然に回復しますが、'));
        tutorial.check_list.push( this.desc_only('回復には食料と水分を消費します。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('tree_ryuuboku');
        tutorial.reword_tool_item.set_name('マテリアル: 木材 x 1');
        tutorial.reword_tool_item.add_material('wood', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'ステータス: 食料と水分';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('左下の橙と青のゲージは食料と水分で、'));
        tutorial.check_list.push( this.desc_only('スタミナを回復するために消費します。'));
        tutorial.check_list.push( this.desc_only('なくなるとスタミナが徐々に減少し、'));
        tutorial.check_list.push( this.desc_only('次に体力が減少し、最後には死んでしまいます。'));
        tutorial.check_list.push( this.desc_only('食料や水を摂ることで回復できます。'));

        tutorial.reword_tool_item = new GenericFood( this.game );
        tutorial.reword_tool_item.set_image('petbottle_juice');
        tutorial.reword_tool_item.set_name('フルーツジュース');
        tutorial.reword_tool_item.saving_data.hunger_value = 5;
        tutorial.reword_tool_item.saving_data.thirst_value = 35;
        this.tutorial_list.push( tutorial );


        tutorial = {};
        tutorial.title = '海について';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('海に落ちても水面を泳ぐことはできます。'));
        tutorial.check_list.push( this.desc_only('泳いでいる間、スタミナを消費します。'));
        tutorial.check_list.push( this.desc_only('なくなると体力を消費し、'));
        tutorial.check_list.push( this.desc_only('最後には死んでしまいます。'));
        tutorial.check_list.push({
            description: '海に飛び込んでみる',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.world.player.is_in_sea == true;
        }});

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'デスペナルティ';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('敵の攻撃や溺れたりして死んでしまうと'));
        tutorial.check_list.push( this.desc_only('幽霊になってしばらく動けません。'));
        //tutorial.check_list.push( this.desc_only('また、所持マテリアルの？%を失います。');
        tutorial.check_list.push( this.desc_only('また、食料と水分が残り1割になります。'));
        tutorial.check_list.push( this.desc_only('幽霊の間は体力が徐々に回復し、'));
        tutorial.check_list.push( this.desc_only('満タンになると元の状態に戻ります。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '舟ブロックの設置';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('舟ブロックを持ってクリックすることで'));
        tutorial.check_list.push( this.desc_only('ブロックを設置して舟を拡張できます。'));
        tutorial.check_list.push( this.desc_only('隣にブロックがないと置けません。'));
        tutorial.check_list.push({
            description: '横方向に舟を大きくする',
            is_need_check: true, checked: false, condition_func: function( game ){
                return 7 < game.world.ship.block_array.length;
        }});
        tutorial.check_list.push({
            description: '上方向に舟を大きくする',
            is_need_check: true, checked: false, condition_func: function( game ){
                return 4 < game.world.ship.block_array[0].length;
        }});


        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '食料の確保';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('釣り竿の作成'));
        tutorial.check_list.push({
            description: '釣り竿を使用して釣り針を投げる',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.world.lure.is_working == true;
        }});
        tutorial.check_list.push( this.desc_only('釣り針が沈んだらクリックで引き上げます。'));
        tutorial.check_list.push( this.desc_only('おもに魚が釣れます。'));
        tutorial.check_list.push( this.desc_only('魚を使用して、魚を食べます。'));
        tutorial.check_list.push( this.desc_only('魚以外の便利なものもよく釣れます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '飲み水の確保(蒸留)';
        tutorial.check_list = [];
        tutorial.check_list.push({
            description: 'クラフトで蒸留ボトルを作成する',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.hud.item_slot.has_item_instanceof( DistillBottle );
        }});
        tutorial.check_list.push( this.desc_only('蒸留ボトルを使用すると、水を飲めます。'));
        tutorial.check_list.push({
            description: '焚き火を作成し、設置する',
            is_need_check: true, checked: false, condition_func: function( game ){
                return game.world.ship.has_block_instanceof( FirePlace );
        }});
        tutorial.check_list.push( this.desc_only('蒸留ボトルで焚き火をクリックすると'));
        tutorial.check_list.push( this.desc_only('ボトルを焚き火にかけます。しばらく待てば、'));
        tutorial.check_list.push( this.desc_only('蒸留ボトルに再度、水が満たされます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '飲み水の確保(バケツ)';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('クラフトで給水バケツを作成、設置'));
        tutorial.check_list.push( this.desc_only('給水ボトルをクリックすれば、'));
        tutorial.check_list.push( this.desc_only('水を飲むことができます。'));
        tutorial.check_list.push( this.desc_only('長時間待てば、'));
        tutorial.check_list.push( this.desc_only('給水ボトルに再度、水が満たされます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '焚き火の補充';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('クラフトで燃料マテリアルを作成'));
        tutorial.check_list.push( this.desc_only('クラフトで燃料アイテムを作成'));
        tutorial.check_list.push( this.desc_only('燃料を持って焚き火をクリックする'));
        tutorial.check_list.push( this.desc_only('焚き火が再度使えるようになります。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '鳥の狩猟';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('クラフトで弓を作成'));
        tutorial.check_list.push( this.desc_only('弓を使用すると、敵にダメージを与える'));
        tutorial.check_list.push( this.desc_only('矢を発射することができます。'));
        tutorial.check_list.push( this.desc_only('カモメ等を攻撃して狩りましょう。'));
        tutorial.check_list.push( this.desc_only('羽根マテリアルを入手'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('feather_white');
        tutorial.reword_tool_item.set_name('マテリアル: 羽根 x 1');
        tutorial.reword_tool_item.add_material('feather', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '舟の前進';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('クラフトでオールを作成'));
        tutorial.check_list.push( this.desc_only('水面近くでオールを使うと、'));
        tutorial.check_list.push( this.desc_only('舟が前に進みます。'));
        tutorial.check_list.push( this.desc_only('舟を前に進めていると、'));
        tutorial.check_list.push( this.desc_only('多くの素材を持った敵対的な鳥が来ます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );


        tutorial = {};
        tutorial.title = '舟ブロックの撤去と修理';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('クラフトで撤去ハンマーを作成'));
        tutorial.check_list.push( this.desc_only('ハンマーで舟ブロックをクリックすると'));
        tutorial.check_list.push( this.desc_only('そのブロックをアイテムに還元できます。'));
        tutorial.check_list.push( this.desc_only('クラフトで修理レンチを作成'));
        tutorial.check_list.push( this.desc_only('レンチで舟ブロックをクリックすると'));
        tutorial.check_list.push( this.desc_only('敵の攻撃で減った耐久力を回復できます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = 'レベルフラッグ';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('レベルフラッグ[1]を作成する'));
        tutorial.check_list.push( this.desc_only('レベルフラッグを舟に設置する'));
        tutorial.check_list.push( this.desc_only('より強い鳥が現れるようになります。'));
        tutorial.check_list.push( this.desc_only('強い鳥を倒せば、'));
        tutorial.check_list.push( this.desc_only('新しいマテリアルが入手できます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.title = '';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only(''));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        this.tutorial_list.push( tutorial );


        // クリアマークをfalseに設定しとく
        for( let tutorial of this.tutorial_list ){
            tutorial.cleared = false;
        }
    }
    desc_only( description ){
        return { description: description, is_need_check: false, checked: false, condition_func: function( game ){ return true; }}
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
