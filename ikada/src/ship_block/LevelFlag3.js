
import {LevelFlag1} from './LevelFlag1.js';

export class LevelFlag3 extends LevelFlag1 {

    constructor( game ){
        super( game );

        this.name = 'レベルフラッグ[3]';

        this.image = this.game.image_library.get_image('undoukai_flag3_i');

        this.ship_level_value = 3;
    }

}
