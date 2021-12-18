
import {DropItem} from './entity/DropItem.js';
import {EffectWind} from './entity/EffectWind.js';
import {EnemyFish} from './entity/EnemyFish.js';
import {EnemyBird} from './entity/EnemyBird.js';
import {Kamome} from './entity/Kamome.js';
import {Tobiuo} from './entity/Tobiuo.js';
import {ResourceItem} from './tool_item/ResourceItem.js';


export class WorldSpawner {
    constructor( game, world ){
        this.game = game;
        this.world = world;
        // 設定値の1倍から2倍までのランダムなフレーム数
        this.drifting_spawn_interval = 400;
        this.drifting_spawn_timer = 0;
    }
    on_update(){
        // いろいろ自然わき

        // 漂流アイテム
        if( 0 < this.drifting_spawn_timer ) {
            this.drifting_spawn_timer -= 1 + Math.floor(this.world.ship.velocity * 3);
        } else {
            this.drifting_spawn_timer = this.drifting_spawn_interval + this.drifting_spawn_interval * Math.random();
            let new_item = new DropItem( this.game )
            new_item.x = 300
            let new_tool_item = new ResourceItem( this.game );
            new_tool_item.generate_drifting_item();
            new_item.set_tool_item( new_tool_item );
            this.world.entity_list.push( new_item )
        }
        if( Math.random() < 0.01) {
            let new_entity = new EffectWind( this.game )
            new_entity.x = 300
            new_entity.y = -100 - Math.random() * 100;
            this.world.entity_list.push( new_entity )
        }
        if( Math.random() < 0.01) {
            if( this.world.count_enemy() < 3 ){
                let new_enemy = new Tobiuo( this.game );
                new_enemy.x = 500;
                new_enemy.y = 200;
                this.world.push_enemy( new_enemy );
            }
        }
        if( Math.random() < 0.01) {
            if( this.world.count_enemy() < 3 ){
                let new_enemy = new Kamome( this.game );
                new_enemy.x = 500;
                new_enemy.y = -200;
                this.world.push_enemy( new_enemy );
            }
        }

    }
}
