
import {ShipFarmWet} from './ship_block/ShipFarmWet.js'
import {WaterPlace} from './ship_block/WaterPlace.js'
import {ShipBlock} from './ship_block/ShipBlock.js'
import {BotHome} from './ship_block/BotHome.js'
import {ShipFrame} from './ship_block/ShipFrame.js'
import {DryLack} from './ship_block/DryLack.js'
import {ShipFloor} from './ship_block/ShipFloor.js'
import {ShipFarm} from './ship_block/ShipFarm.js'
import {WeaponAirCannon} from './ship_block/WeaponAirCannon.js'
import {FuelEngine} from './ship_block/FuelEngine.js'
import {VictoryRocket} from './ship_block/VictoryRocket.js'
import {DroneHome} from './ship_block/DroneHome.js'
import {WaterPlace2} from './ship_block/WaterPlace2.js'
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
        } else if( block_data.class_name == 'ShipFrame' ){
            return new ShipFrame( this.game );
        } else if( block_data.class_name == 'DryLack' ){
            return new DryLack( this.game );
        } else if( block_data.class_name == 'ShipFloor' ){
            return new ShipFloor( this.game );
        } else if( block_data.class_name == 'ShipFarm' ){
            return new ShipFarm( this.game );
        } else if( block_data.class_name == 'WeaponAirCannon' ){
            return new WeaponAirCannon( this.game );
        } else if( block_data.class_name == 'FuelEngine' ){
            return new FuelEngine( this.game );
        } else if( block_data.class_name == 'VictoryRocket' ){
            return new VictoryRocket( this.game );
        } else if( block_data.class_name == 'DroneHome' ){
            return new DroneHome( this.game );
        } else if( block_data.class_name == 'WaterPlace2' ){
            return new WaterPlace2( this.game );
        } else if( block_data.class_name == 'FirePlace' ){
            return new FirePlace( this.game );
        }
        return new ShipBlock( this.game );
    }
}

