
import {ShipBlock} from './ShipBlock.js';
import {BotDog} from '../entity/BotDog.js';

export class BotHouseDog extends ShipBlock {

    constructor( game ){
        super( game );

        this.name = 'イヌハウス';

        this.image = this.game.image_library.get_image('inugoya_blue');

        this.respawn_timer_max = 50;
        this.respawn_timer_count = this.respawn_timer_max;
        this.active_bot = null;
        this.spawn_new_bot();
    }
    create_new_bot(){
        return new BotDog( this.game );
    }
    spawn_new_bot(){
        this.active_bot = this.create_new_bot();
        this.active_bot.x = this.x;
        this.active_bot.y = this.y;
        this.active_bot.home_block = this;
        this.active_bot.home_cell_x = this.cell_x;
        this.active_bot.home_cell_y = this.cell_y;

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
