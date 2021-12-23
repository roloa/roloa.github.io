
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
        this.sight_distance = 1100;

        for(let i = 0 ; i < 100 ; i++ ){
            this.spawn_wind();
        }
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
        if( Math.random() < 0.1){
            this.spawn_wind();
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
    spawn_wind(){
        // 風
        // TODO 数え上げを節約
        if( this.world.entity_list.filter(function( elem ){ return elem instanceof EffectWind; }).length < 100 ){
            let new_entity = new EffectWind( this.game )
            let rand = Math.random();
            if( rand < 0.1){
                new_entity.x = this.world.camera.x - 1200;
            // } else if( rand < 0.5 ){
            //     new_entity.x = this.world.camera.x + Math.random() * 1000;
            } else {
                new_entity.x = this.world.camera.x + Math.random() * 2000 - 500
            }
            new_entity.y = this.world.camera.y + Math.random() * 3000 - 1500;

            if( -100 < new_entity.y){
                // 海の中はだめ
                return;
            }
            if( this.check_is_in_sight( new_entity.x, new_entity.y )){
                // 視界内はだめ
                new_entity.x = this.world.camera.x + this.sight_distance + Math.random() * 200;
            }

            this.world.entity_list.push( new_entity )

        }
    }
    check_is_in_sight(x1, y1){
        return (
        this.world.camera.x - this.sight_distance < x1 && x1 < this.world.camera.x + this.sight_distance &&
        this.world.camera.y - this.sight_distance < y1 && y1 < this.world.camera.y + this.sight_distance)
    }
}
