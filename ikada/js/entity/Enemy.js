
import {Entity} from './Entity.js';
import {DropItem} from './DropItem.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';
import {DeadBody} from './particle/DeadBody.js';

export class Enemy extends Entity {
    constructor( game ){
        super( game );
        this.game = game;

        this.image = this.game.image_library.get_image( 'fish_sakana_iwashi' )

        this.name = 'noname enemy';
        this.strength_lv = 1;

        this.is_scouted = false;

        this.width = 128;
        this.height = 128;
        this.width_half = this.width * 0.5;
        this.height_half = this.height * 0.5;
        this.max_hp = 100;
        this.hp = 100;

        this.vx = 0;
        this.vy = 0;
        this.dash_speed = 2;
        this.is_angry = false;

        this.is_preparing_jump = false;
        this.preparing_jump_minimum_time = 50;
        this.preparing_jump_timer = 0;

        this.showing_hp_timer = 0;

    }
    enemy_move_ai(){
        // 怒っている場合
        if( this.is_angry ){
            if( this.is_preparing_jump){
                // 助走をつけようとする状態
                // プレイヤーとは反対側に進む
                let vec = this.get_vector_to_player_with_bias(0, 64);
                this.vx += -vec.x * this.dash_speed;
                this.vy += -(vec.y - 0.1) * this.dash_speed;
                if( Math.random() < 0.1 ){
                    if( 40000 < this.get_distance_p2_to_player()){
                        this.is_preparing_jump = false;
                    }
                }
            } else {
                // プレイヤーの方に向かう
                let vec = this.get_vector_to_player_with_bias(0, 0)
                this.vx += vec.x * this.dash_speed;
                this.vy += vec.y * this.dash_speed;
                if( Math.random() < 0.01){
                        this.is_preparing_jump = true;
                }
            }
            if( 0 < this.y ){
                // 海につっこんだ
                this.vy -= 2;
                this.is_preparing_jump = true;
            }

            // 弾を撃つ
        } else {
            // 平常時
            this.vx = -3;
        }
    }
    test_hit( x1, y1 ){
        return (this.x - this.width_half < x1 && x1 < this.x + this.width_half &&
            this.y - this.height_half < y1 && y1 < this.y + this.height_half)
    }
    test_hit_bullet( bullet ){
        if( this.test_hit( bullet.x, bullet.y ) ){
            // 弾に当たった

            this.hp -= bullet.damage;
            this.vx += bullet.vx * bullet.knock_back_rate;
            this.vy += bullet.vy * bullet.knock_back_rate;

            this.is_angry = true;
            this.showing_hp_timer = 100;
            if( this.hp <= 0) {
                this.on_die();
            }
            return true;
        }
        return false;
    }
    on_die(){
        // 生存フラグをなくす
        this.is_alive = false;

        // パーティクル生成
        // 死体
        this.game.world.push_entity( this.get_dead_body() );
        // ドロップアイテム生成
        this.game.world.push_entity( this.get_drop_item() );
    }
    get_dead_body(){
        let new_dead_body = new DeadBody( this.game );
        new_dead_body.x = this.x;
        new_dead_body.y = this.y;
        new_dead_body.width = this.width;
        new_dead_body.height = this.height;
        new_dead_body.image = this.image;
        return new_dead_body;
    }
    get_drop_item(){
        let drop_item = new DropItem( this.game )
        drop_item.x = this.x;
        drop_item.y = this.y;
        drop_item.set_tool_item( this.get_drop_tool_item() );
        return drop_item;
    }
    get_drop_tool_item(){
        let new_tool_item = new ResourceItem( this.game );
        new_tool_item.generate_drifting_item();
        new_tool_item.set_image( 'tree_ryuuboku' );
        new_tool_item.add_material( 'wood', 5);
        return new_tool_item;
    }
    get_distance_p2_to_player(){
        let vecx = this.game.world.player.x - this.x;
        let vecy = this.game.world.player.y - this.y;
        return (vecx * vecx) + (vecy * vecy);
    }
    get_distance_to_player(){
        let vecx = this.game.world.player.x - this.x;
        let vecy = this.game.world.player.y - this.y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
    }
    get_vector_to_player(){
        let vecx = this.game.world.player.x - this.x;
        let vecy = this.game.world.player.y - this.y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
        vecx = vecx / length;
        vecy = vecy / length;
        return {x: vecx, y: vecy};
    }
    get_vector_to_player_with_bias( bias_x, bias_y){
        let vecx = this.game.world.player.x - this.x + bias_x;
        let vecy = this.game.world.player.y - this.y + bias_y;
        let length = Math.sqrt( (vecx * vecx) + (vecy * vecy) );
        vecx = vecx / length;
        vecy = vecy / length;
        return {x: vecx, y: vecy};
    }

    on_update(){
        super.on_update();



        // 敵の行動AI
        this.enemy_move_ai();

        // プレイヤーとの当たり判定
        if( this.test_hit( this.game.world.player.x, this.game.world.player.y ) ){
            let knockback_vec = this.get_vector_to_player();
            knockback_vec.x *= 20;
            knockback_vec.y *= 20;
            let damage = 10;
            this.game.world.player.hit_damage( damage, knockback_vec, this );
        }

        // hp表示タイマー
        if( 0 < this.showing_hp_timer ){
            this.showing_hp_timer -= 1;
        }
    }
    on_draw( canvas ){

        canvas.drawImage( this.image, this.x - this.width * 0.5 , this.y - this.height * 0.5 , this.width, this.height );

        if( 0 < this.showing_hp_timer ){
            const HP_RADIUS = 16;
            const center_x = this.x ;
            const center_y = this.y ;

            canvas.strokeStyle = 'rgb(200,200,200)'
            canvas.fillStyle = 'rgb(20,20,20)'
            canvas.beginPath();
            canvas.arc( center_x, center_y, HP_RADIUS, 0, Math.PI*2, true );
            canvas.fill();
            canvas.fillStyle = 'rgb(20,200,20)'
            canvas.beginPath();
            canvas.moveTo( center_x, center_y)
            canvas.arc( center_x, center_y, HP_RADIUS, Math.PI*-0.5, Math.PI*-0.5 - (Math.PI * 2 ) * (this.hp / this.max_hp ), true );
            canvas.fill();

        }

    }
}
