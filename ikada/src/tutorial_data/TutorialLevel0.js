
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {FishRod} from '../tool_item/FishRod.js';
import {GenericFood} from '../tool_item/d_foods/GenericFood.js';
import {ChickenCookedMoto} from '../tool_item/d_foods/ChickenCookedMoto.js';
import {FirePlace} from '../ship_block/FirePlace.js';
import {ShipFarm} from '../ship_block/ShipFarm.js';
import {WaterPlace2} from '../ship_block/WaterPlace2.js';
import {ShipFloor} from '../ship_block/ShipFloor.js';
import {DistillBottle} from '../tool_item/DistillBottle.js';
import {SolidFuel} from '../tool_item/SolidFuel.js';
import {WeaponItem} from '../tool_item/WeaponItem.js';
import {Oar} from '../tool_item/Oar.js';
import {RepairWrench} from '../tool_item/RepairWrench.js';
import {DeconstructHammer} from '../tool_item/DeconstructHammer.js';
import {BuildBlock} from '../tool_item/BuildBlock.js';

export class TutorialLevel0 {

    constructor( game ){

        this.game = game;

        this.tutorial_level = 0;
    }
    desc_only( description ){
        return {
            description: description,
            is_need_check: false,
            checked: false,
            level: this.tutorial_level,
            is_open: true,
            condition_func: function( game ){ return true; }
        };
    }
    need_cond( description, condition_func ){
        return {
            description: description,
            is_need_check: true,
            checked: false,
            level: this.tutorial_level,
            is_open: true,
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
        tutorial.title = '基本操作 1';
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
        tutorial.title = '基本操作 2';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'アイテム使用: マウスクリック',
            function( game ){
                return true;
        }));
        tutorial.check_list.push( this.need_cond( 'アイテム選択: マウスホイール',
            function( game ){
                return game.hud.item_slot.item_slot_cursor != 0;
        }));
        tutorial.check_list.push( this.desc_only('　　 or 画面下のアイテム欄クリック'));
        tutorial.check_list.push( this.need_cond( 'カメラ操作: 画面左のカメラボタン',
            function( game ){
                return game.world.camera.zoom != 1;
        }));
        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('glass_bin6_clear');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = 'インベントリ メニュー';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('持っているアイテムを管理する画面です。'));
        tutorial.check_list.push( this.desc_only('クリックでアイテムを移動できます。'));
        tutorial.check_list.push( this.desc_only('1-9キーでアイテムを枠に移動させます。'));
        tutorial.check_list.push( this.desc_only('ゴミ箱にアイテムを置くと消去できます。'));
        tutorial.check_list.push( this.need_cond( 'インベントリ メニューを開く',
            function( game ){
                return game.hud.hud_menu.menu_list_cursor == 1;
        }));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('alohashirt_gray');
        tutorial.reword_tool_item.set_name('マテリアル: 布切れ x 10');
        tutorial.reword_tool_item.add_material('cloth', 10);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = 'クラフト メニュー';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('マテリアルからアイテムを製作する画面です。'));
        tutorial.check_list.push( this.desc_only('作りたいアイテムを選び、'));
        tutorial.check_list.push( this.desc_only('右下の製作ボタンで、'));
        tutorial.check_list.push( this.desc_only('マテリアルを消費してアイテムを作ります。'));
        tutorial.check_list.push( this.need_cond( 'クラフト メニューを開く',
            function( game ){
                return game.hud.hud_menu.menu_list_cursor == 2;
        }));
        tutorial.check_list.push( this.need_cond( '釣り竿 Lv1を製作する',
            function( game ){
                return game.hud.item_slot.has_item_instanceof( FishRod );
        }));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('gomi_can');
        tutorial.reword_tool_item.set_name('マテリアル: 鉄クズ x 10');
        tutorial.reword_tool_item.add_material('iron', 10);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = 'マテリアル メニュー';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('持っているマテリアルを確認する画面です。'));
        tutorial.check_list.push( this.desc_only('マテリアルとは、'));
        tutorial.check_list.push( this.desc_only('アイテムを作るための素材です。'));
        tutorial.check_list.push( this.desc_only('所持上限は基本的にありません。'));
        tutorial.check_list.push( this.need_cond( 'マテリアル メニューを開く',
            function( game ){
                return game.hud.hud_menu.menu_list_cursor == 3;
        }));
        tutorial.check_list.push( this.need_cond( '鉄クズを30個以上集める',
            function( game ){
                return 30 <= game.materials.get_material('iron');
        }));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('tree_ryuuboku');
        tutorial.reword_tool_item.set_name('マテリアル: 木材 x 20');
        tutorial.reword_tool_item.add_material('wood', 20);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = 'コンフィグ メニュー';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('ゲームの保存や設定変更をする画面です。'));
        tutorial.check_list.push( this.need_cond( 'コンフィグ メニューを開く',
            function( game ){
                return game.hud.hud_menu.menu_list_cursor == 4;
        }));
        tutorial.check_list.push( this.need_cond( 'データ[1]にセーブする',
            function( game ){
                return (game.tutorial_data.complete_flag_list[ this.description ] == true);
        }));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = 'ステータス';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('画面左下に並んだゲージは、'));
        tutorial.check_list.push( this.desc_only('プレイヤーのステータスです。'));

        tutorial.reword_tool_item = new ChickenCookedMoto( this.game );
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
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
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
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
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
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
        tutorial_list.push( tutorial );


        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '海について';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('海に落ちても水面を泳ぐことはできます。'));
        tutorial.check_list.push( this.desc_only('泳いでいる間、スタミナを消費します。'));
        tutorial.check_list.push( this.desc_only('なくなると体力を消費し、'));
        tutorial.check_list.push( this.desc_only('最後には死んでしまいます。'));
        tutorial.check_list.push( this.need_cond( '海に飛び込んでみる',
            function( game ){
                return game.world.player.is_in_sea == true;
        }));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
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
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '舟ブロックの設置';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('舟ブロックを持ってクリックすることで'));
        tutorial.check_list.push( this.desc_only('ブロックを設置して舟を拡張できます。'));
        tutorial.check_list.push( this.desc_only('隣にブロックがないと置けません。'));
        tutorial.check_list.push( this.need_cond( '舟に設置できるブロックを製作する',
            function( game ){
                return game.hud.item_slot.has_item_instanceof( BuildBlock );
        }));
        tutorial.reword_tool_item = new BuildBlock( this.game ).set_ship_block( new ShipFloor( this.game ) );
        tutorial_list.push( tutorial );

        // tutorial = {};
        // tutorial.level = this.tutorial_level;
        // tutorial.title = '舟の拡張について';
        // tutorial.check_list = [];
        // tutorial.check_list.push( this.desc_only(''));
        // tutorial.check_list.push( this.desc_only(''));
        // tutorial.check_list.push( this.desc_only(''));
        // tutorial.check_list.push( this.need_cond( '横方向に舟を大きくする',
        //     function( game ){
        //         return 7 < game.world.ship.block_array.length;
        // }));
        // tutorial.check_list.push( this.need_cond( '上方向に舟を大きくする',
        //     function( game ){
        //         return 4 < game.world.ship.block_array[0].length;
        // }));
        // tutorial.reword_tool_item = new BuildBlock( this.game ).set_ship_block( new ShipFloor( this.game ) );
        // tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '食料の確保';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('釣り竿の作成'));
        tutorial.check_list.push( this.need_cond( '釣り竿を使用して釣り針を投げる',
            function( game ){
                return game.world.lure.is_working == true;
        }));
        tutorial.check_list.push( this.desc_only('釣り針が沈んだらクリックで引き上げます。'));
        tutorial.check_list.push( this.desc_only('おもに魚が釣れます。'));
        tutorial.check_list.push( this.desc_only('魚を使用して、魚を食べます。'));
        tutorial.check_list.push( this.desc_only('魚以外の便利なものもよく釣れます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '飲み水の確保(蒸留)';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'クラフトで蒸留ボトルを作成する',
            function( game ){
                return game.hud.item_slot.has_item_instanceof( DistillBottle );
        }));
        tutorial.check_list.push( this.desc_only('蒸留ボトルを使用すると、水を飲めます。'));
        tutorial.check_list.push( this.need_cond( '焚き火を作成し、設置する',
            function( game ){
                return game.world.ship.has_block_instanceof( FirePlace );
        }));
        tutorial.check_list.push( this.desc_only('蒸留ボトルで焚き火をクリックすると'));
        tutorial.check_list.push( this.desc_only('ボトルを焚き火にかけます。しばらく待てば、'));
        tutorial.check_list.push( this.desc_only('蒸留ボトルに再度、水が満たされます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '飲み水の確保(バケツ)';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'クラフトで給水バケツを製作・設置',
            function( game ){
                return game.world.ship.has_block_instanceof( WaterPlace2 );
        }));
        tutorial.check_list.push( this.desc_only('給水バケツをクリックすれば、'));
        tutorial.check_list.push( this.desc_only('水を飲むことができます。'));
        tutorial.check_list.push( this.desc_only('(かなり) 長時間待てば、'));
        tutorial.check_list.push( this.desc_only('給水バケツに再度、水が満たされます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '燃料: 焚き火の補充';
        tutorial.check_list = [];
        tutorial.check_list.push( this.desc_only('焚き火1回につき固形燃料が1つ必要です。'));
        tutorial.check_list.push( this.desc_only('固形燃料の材料は燃料マテリアルです。'));
        tutorial.check_list.push( this.desc_only('燃料マテリアルはクラフトで、'));
        tutorial.check_list.push( this.desc_only('木材や残飯などから製作できます。'));
        tutorial.check_list.push( this.need_cond( 'クラフトで燃料マテリアルを製作する',
            function( game ){
                return 1 <= game.materials.get_material('fuel');
        }));
        tutorial.check_list.push( this.need_cond( 'クラフトで固形燃料を製作する',
            function( game ){
                return game.hud.item_slot.has_item_instanceof( SolidFuel );
        }));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('cooking_kokei_nenryou_fire');
        tutorial.reword_tool_item.set_name('マテリアル: 燃料 x 30');
        tutorial.reword_tool_item.add_material('fuel', 30);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '鳥の狩猟';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'クラフトで弓を製作する',
            function( game ){
                return game.hud.item_slot.has_item_instanceof( WeaponItem );
        }));
        tutorial.check_list.push( this.desc_only('弓を使用すると、敵にダメージを与える'));
        tutorial.check_list.push( this.desc_only('矢を発射することができます。'));
        tutorial.check_list.push( this.desc_only('カモメ等を攻撃して狩りましょう。'));
        tutorial.check_list.push( this.need_cond( '羽根マテリアルを入手する',
            function( game ){
                return 1 <= game.materials.get_material('feather');
        }));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('feather_white');
        tutorial.reword_tool_item.set_name('マテリアル: 羽根 x 3');
        tutorial.reword_tool_item.add_material('feather', 3);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '舟の前進';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'クラフトでオールを製作する',
            function( game ){
                return game.hud.item_slot.has_item_instanceof( Oar );
        }));
        tutorial.check_list.push( this.need_cond( '水面近くでオールを使って舟を進める',
            function( game ){
                return 1 < game.world.ship.velocity;
        }));
        tutorial.check_list.push( this.desc_only('舟を前に進めていると、'));
        tutorial.check_list.push( this.desc_only('多くの素材を持った敵対的な鳥が来ます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );


        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '舟ブロックの撤去と修理';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'クラフトで撤去ハンマーを製作する',
            function( game ){
                return game.hud.item_slot.has_item_instanceof( DeconstructHammer );
        }));
        tutorial.check_list.push( this.desc_only('ハンマーで舟ブロックをクリックすると'));
        tutorial.check_list.push( this.desc_only('そのブロックをアイテムに還元できます。'));
        tutorial.check_list.push( this.need_cond( 'クラフトで修理レンチを製作する',
            function( game ){
                return game.hud.item_slot.has_item_instanceof( RepairWrench );
        }));
        tutorial.check_list.push( this.desc_only('レンチで舟ブロックをクリックすると'));
        tutorial.check_list.push( this.desc_only('敵の攻撃で減った耐久力を回復できます。'));

        tutorial.reword_tool_item = new BuildBlock( this.game ).set_ship_block( new ShipFloor( this.game ) );
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = '栽培プランター';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'クラフトでプランターを製作・設置',
            function( game ){
                return game.world.ship.has_block_instanceof( ShipFarm );
        }));
        tutorial.check_list.push( this.desc_only('プランターを設置すれば、'));
        tutorial.check_list.push( this.desc_only('いくつかの作物を栽培できます。'));
        tutorial.check_list.push( this.desc_only('定期的に蒸留ボトルで水をかけると'));
        tutorial.check_list.push( this.desc_only('成長を早めることができます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: ビン x 1');
        tutorial.reword_tool_item.add_material('jar', 1);
        tutorial_list.push( tutorial );

        tutorial = {};
        tutorial.level = this.tutorial_level;
        tutorial.title = 'レベルフラッグ[1]';
        tutorial.check_list = [];
        tutorial.check_list.push( this.need_cond( 'レベルフラッグ[1]を作成して設置する',
            function( game ){
                return 1 <= game.world.ship.ship_level;
        }));

        tutorial.check_list.push( this.desc_only('レベルフラッグを舟に設置すると、'));
        tutorial.check_list.push( this.desc_only('より強い鳥が現れるようになります。'));
        tutorial.check_list.push( this.desc_only('強い鳥を倒せば、'));
        tutorial.check_list.push( this.desc_only('新しいマテリアルが入手できます。'));

        tutorial.reword_tool_item = new ResourceItem( this.game );
        tutorial.reword_tool_item.set_image('present_box');
        tutorial.reword_tool_item.set_name('マテリアル: 機械部品 x 1');
        tutorial.reword_tool_item.add_material('parts', 1);
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
