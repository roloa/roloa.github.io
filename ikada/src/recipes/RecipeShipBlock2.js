
import {BuildBlock} from '../tool_item/BuildBlock.js'

import {BotHouseDog} from '../ship_block/BotHouseDog.js';
import {BotHouseCat} from '../ship_block/BotHouseCat.js';

import {FuelEngine} from '../ship_block/FuelEngine.js';
import {WeaponAirCannon} from '../ship_block/WeaponAirCannon.js';
import {WeaponCatapult} from '../ship_block/WeaponCatapult.js';
import {WeaponMachineGun} from '../ship_block/WeaponMachineGun.js';
import {WeaponMortorTube} from '../ship_block/WeaponMortorTube.js';

import {WaterPlace} from '../ship_block/WaterPlace.js';
import {WaterPlace2} from '../ship_block/WaterPlace2.js';
import {ShipFarmFood} from '../ship_block/ShipFarmFood.js';
import {ShipFarmWood} from '../ship_block/ShipFarmWood.js';

import {FirePlace} from '../ship_block/FirePlace.js';
import {DryLack} from '../ship_block/DryLack.js';
import {ShipMast} from '../ship_block/ShipMast.js';

// import {} from '../tool_item/.js';

// 武装、生産系、家具

export class RecipeShipBlock2 extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r , category ){

        c_r.add_recipe( category,
            ['船に設置する焚き火です。',
            '燃料を消費して、蒸留や調理ができます。'],
            ['wood', 'iron', 'stone'],
            [20, 10, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new FirePlace( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['舟の帆です。',
            '風が当たると舟が前進します。'],
            ['wood', 'cloth', 'feather'],
            [10, 10, 3],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipMast( game ) ); },
            ''
        );


        // とりあえずオミット
        // c_r.add_recipe( category,
        //     ['食材を乾燥させます。'],
        //     ['wood', 'cloth'],
        //     [20, 10],
        //     function( game ){ return new BuildBlock( game ).set_ship_block( new DryLack( game ) ); },
        //     ''
        // );

        c_r.add_recipe( category,
            ['自動で敵を撃つ空気砲です。','燃料を投入すると、自動で敵を攻撃します。'],
            ['parts', 'iron', 'plastic'],
            [10, 30, 30],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponAirCannon( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['自動で敵を撃つ投石機です。','カタパルト用石ころを投入すると、自動で敵を攻撃します。'],
            ['parts', 'wood', 'cloth'],
            [10, 50, 50],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponCatapult( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['自動で敵を撃つ機銃です。','弾薬を投入すると、自動で敵を攻撃します。'],
            ['circuit','parts', 'iron'],
            [3, 3, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponMachineGun( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['自動で敵を撃つ大砲です。','砲弾を投入すると、自動で敵を攻撃します。'],
            ['parts', 'lead', 'silver'],
            [5, 10, 5],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WeaponMortorTube( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['燃料式のエンジンです。','燃料を投入すると、舟を前に進めます。'],
            ['iron', 'parts'],
            [10, 2],
            function( game ){ return new BuildBlock( game ).set_ship_block( new FuelEngine( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['水飲み場です。', 'より短い時間経過で飲み水がたまります。'],
            ['parts', 'stone', 'jar'],
            [3, 50, 3],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WaterPlace( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['水が自然にたまるバケツです。', '時間経過で飲み水がたまります。'],
            ['iron', 'stone'],
            [10, 10],
            function( game ){ return new BuildBlock( game ).set_ship_block( new WaterPlace2( game ) ); },
            ''
        );

        c_r.add_recipe( category,
            ['食用の作物を育てます。'],
            ['leftover', 'iron', 'stone'],
            [20, 20, 20],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFarmFood( game ) ); },
            'Food'
        );
        c_r.add_recipe( category,
            ['木材を育てます。'],
            ['leftover', 'plastic', 'stone'],
            [20, 20, 20],
            function( game ){ return new BuildBlock( game ).set_ship_block( new ShipFarmWood( game ) ); },
            'Wood'
        );


        c_r.add_recipe( category,
            ['イヌ型ロボットです。','砲撃を優先して手伝ってくれます。'],
            ['parts', 'circuit', 'plastic', 'silver'],
            [10, 5, 10, 3],
            function( game ){ return new BuildBlock( game ).set_ship_block( new BotHouseDog( game ) ); },
            ''
        );
        c_r.add_recipe( category,
            ['ネコ型ロボットです。','弾薬や燃料の補給を優先して手伝ってくれます。'],
            ['parts', 'circuit', 'plastic', 'silver'],
            [10, 5, 10, 3],
            function( game ){ return new BuildBlock( game ).set_ship_block( new BotHouseCat( game ) ); },
            ''
        );



    }
}
