
import {ShipFarmWet} from './ship_block/ShipFarmWet.js'
import {WaterPlace} from './ship_block/WaterPlace.js'
import {ShipBlock} from './ship_block/ShipBlock.js'
import {BotHome} from './ship_block/BotHome.js'
import {BotHouseDog} from './ship_block/BotHouseDog.js'
import {ShipCore} from './ship_block/ShipCore.js'
import {BotHouseCat} from './ship_block/BotHouseCat.js'
import {WeaponMortorTube} from './ship_block/WeaponMortorTube.js'
import {ShipFrame} from './ship_block/ShipFrame.js'
import {DryLack} from './ship_block/DryLack.js'
import {ShipFloor} from './ship_block/ShipFloor.js'
import {LevelFlag2} from './ship_block/LevelFlag2.js'
import {ShipFarm} from './ship_block/ShipFarm.js'
import {WeaponAirCannon} from './ship_block/WeaponAirCannon.js'
import {WeaponCatapult} from './ship_block/WeaponCatapult.js'
import {ShipMast} from './ship_block/ShipMast.js'
import {FuelEngine} from './ship_block/FuelEngine.js'
import {VictoryRocket} from './ship_block/VictoryRocket.js'
import {DroneHome} from './ship_block/DroneHome.js'
import {WaterPlace2} from './ship_block/WaterPlace2.js'
import {WeaponMachineGun} from './ship_block/WeaponMachineGun.js'
import {LevelFlag1} from './ship_block/LevelFlag1.js'
import {LevelFlag3} from './ship_block/LevelFlag3.js'
import {FirePlace} from './ship_block/FirePlace.js'

export class BlockInstanceMaker {
    constructor( game ){
        this.game = game;
    }
    make_instance( block_data ){

        if( block_data == null ){
            return null;
        } else if( block_data.class_name == 'ShipFarmWet' ){
            return new ShipFarmWet( this.game );
        } else if( block_data.class_name == 'WaterPlace' ){
            return new WaterPlace( this.game );
        } else if( block_data.class_name == 'ShipBlock' ){
            return new ShipBlock( this.game );
        } else if( block_data.class_name == 'BotHome' ){
            return new BotHome( this.game );
        } else if( block_data.class_name == 'BotHouseDog' ){
            return new BotHouseDog( this.game );
        } else if( block_data.class_name == 'ShipCore' ){
            return new ShipCore( this.game );
        } else if( block_data.class_name == 'BotHouseCat' ){
            return new BotHouseCat( this.game );
        } else if( block_data.class_name == 'WeaponMortorTube' ){
            return new WeaponMortorTube( this.game );
        } else if( block_data.class_name == 'ShipFrame' ){
            return new ShipFrame( this.game );
        } else if( block_data.class_name == 'DryLack' ){
            return new DryLack( this.game );
        } else if( block_data.class_name == 'ShipFloor' ){
            return new ShipFloor( this.game );
        } else if( block_data.class_name == 'LevelFlag2' ){
            return new LevelFlag2( this.game );
        } else if( block_data.class_name == 'ShipFarm' ){
            return new ShipFarm( this.game );
        } else if( block_data.class_name == 'WeaponAirCannon' ){
            return new WeaponAirCannon( this.game );
        } else if( block_data.class_name == 'WeaponCatapult' ){
            return new WeaponCatapult( this.game );
        } else if( block_data.class_name == 'ShipMast' ){
            return new ShipMast( this.game );
        } else if( block_data.class_name == 'FuelEngine' ){
            return new FuelEngine( this.game );
        } else if( block_data.class_name == 'VictoryRocket' ){
            return new VictoryRocket( this.game );
        } else if( block_data.class_name == 'DroneHome' ){
            return new DroneHome( this.game );
        } else if( block_data.class_name == 'WaterPlace2' ){
            return new WaterPlace2( this.game );
        } else if( block_data.class_name == 'WeaponMachineGun' ){
            return new WeaponMachineGun( this.game );
        } else if( block_data.class_name == 'LevelFlag1' ){
            return new LevelFlag1( this.game );
        } else if( block_data.class_name == 'LevelFlag3' ){
            return new LevelFlag3( this.game );
        } else if( block_data.class_name == 'FirePlace' ){
            return new FirePlace( this.game );
        }
        return new ShipBlock( this.game );
    }
}

