
import {LevelFlag1} from './LevelFlag1.js';

export class LevelFlag2 extends LevelFlag1 {

    constructor( game ){
        super( game );

        this.name = 'レベルフラッグ[2]';

        this.image = this.game.image_library.get_image('undoukai_flag2_i');

        this.ship_level_value = 2;

    }

}
