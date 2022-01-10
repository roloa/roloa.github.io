
import {ShipBlock} from './ShipBlock.js';
import {BotDog} from '../entity/BotDog.js';

export class BotHouseDog extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = 'イヌハウス';

        this.image = this.game.image_library.get_image('inugoya');

        this.respawn_timer_max = 50;
        this.respawn_timer_count = this.respawn_timer_max;
        this.active_bot = null;
        this.spawn_new_bot();
    }
    spawn_new_bot(){
        this.active_bot = new BotDog( this.game );
        this.active_bot.x = this.x;
        this.active_bot.y = this.y;
        this.game.world.push_entity( this.active_bot )
    }

    on_update( ){
        //
        if( this.active_bot.is_alive == false ){
            if( 0 < this.respawn_timer_count ){
                this.respawn_timer_count -= 1;
            } else {
                this.respawn_timer_count = this.respawn_timer_max;
                this.spawn_new_bot();
            }
        }
    }
}
