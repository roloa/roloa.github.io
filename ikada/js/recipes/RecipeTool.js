
import {DeconstructHammer} from '../tool_item/DeconstructHammer.js';
import {DistillBottle} from '../tool_item/DistillBottle.js';
import {FishRod} from '../tool_item/FishRod.js';
import {Oar} from '../tool_item/Oar.js';
import {Scouter} from '../tool_item/Scouter.js';
import {RepairWrench} from '../tool_item/RepairWrench.js';


// import {} from '../tool_item/.js';

export class RecipeTool extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category ){

        c_r.add_recipe( category,
            ['クリックした敵の情報を調べることが出来ます。'],
            ['mech_parts'],
            [3],
            function( game ){ return new Scouter( game ); },
            ''
        );

        c_r.add_recipe( category,
            ['舟を漕げば、より多くの素材が流れてきます。'],
            ['wood'],
            [3],
            function( game ){ return new Oar( game ); },
            'Lv1'
        );

        c_r.add_recipe( category,
            ['魚釣りができます。','海に浮いているものを引き揚げることも出来ます。'],
            ['wood', 'cloth'],
            [3, 1],
            function( game ){ return new FishRod( game ); },
            'Lv1'
        );

        c_r.add_recipe( category,
            ['撤去ハンマー', '船のブロックを撤去できます。'],
            ['wood', 'metal'],
            [3, 3],
            function( game ){ return new DeconstructHammer( game ); },
            ''
        );
        c_r.add_recipe( category,
            ['修理レンチ', '船のブロックを修理できます。'],
            ['wood', 'metal'],
            [3, 3],
            function( game ){ return new RepairWrench( game ); },
            ''
        );

        c_r.add_recipe( category,
            ['蒸留ボトル',
            '焚き火にかけることで飲み水を得られます。'],
            ['plastic'],
            [3],
            function( game ){ return new DistillBottle( game ); },
            ''
        );

    }
}
