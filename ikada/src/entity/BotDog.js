
import {Entity} from './Entity.js';
import {PathFinding} from './PathFinding.js';
import {ShipBlock} from '../ship_block/ShipBlock.js';
import {ResourceItem} from '../tool_item/ResourceItem.js';

import {SolidFuel} from '../tool_item/SolidFuel.js';
import {AmmoItem} from '../tool_item/AmmoItem.js';
import {CannonAmmoItem} from '../tool_item/CannonAmmoItem.js';


export class BotDog extends Entity {

    static WORK_HEAL = 10;
    static WORK_SUECIDE = 15;
    static WORK_OPERATE = 20;
    static WORK_CRAFT = 40;
    static WORK_REPAIR = 50;
    static WORK_CARRY = 60;
    static WORK_PICKUP = 70;
    static WORK_DROP_CHEST = 80;
    static WORK_FISHING = 90;

    constructor( game ){

        super( game );

        this.name = 'イヌ型ロボット';

        this.x = 0;
        this.y = 0;

        this.vx = 0;
        this.vy = 0;
        this.is_landing = false;
        this.height = 32;
        this.height_half = this.height * 0.5;

        this.image = this.game.image_library.get_image('pet_robot_dog');

        this.home_cell_x = 1;
        this.home_cell_y = 1;
        this.home_block = null;

        this.current_work = 0;
        this.carrying_item = null;


        this.path_finding = new PathFinding( this.game );
        this.path_leading_index = 0;
        this.path_leading_time_limit_max = 50;
        this.path_leading_time_limit_count = this.path_leading_time_limit_max;
        this.cooldown_time_count = 0;
        this.cooldown_time_max = 50;

        this.dash_speed = 3;
        this.interact_range = 30 * 30;

        this.hp_max = 100;
        this.hp = this.hp_max;
    }

    on_update(){
        super.on_update();

        this.vy += 0.5
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.5;
        this.vy *= 0.99;

        if( 1 < this.vy ){
            this.is_landing = false;
        }

        // 船との当たり判定
        // 船から見たローカル座標
        let local_x_in_ship = this.x + (this.game.world.ship.ship_offset_x * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS;
        let local_y_in_ship = this.y + (this.game.world.ship.ship_offset_y * ShipBlock.BLOCK_SIZE) + ShipBlock.BLOCK_RADIUS + this.height_half;

        let ship_block = this.game.world.ship.get_ship_block( this.x, this.y + this.height_half);
        if( local_y_in_ship % ShipBlock.BLOCK_SIZE < 8 && // 床の厚さ
            ship_block != null &&
            ship_block.is_floor
        ){
            // 着地判定を得る
            if( this.is_off_platform ){
                // 床すりぬけ状態
            } else {
                let block_y = Math.floor( local_y_in_ship / ShipBlock.BLOCK_SIZE);
                this.y = ( block_y - this.game.world.ship.ship_offset_y) * ShipBlock.BLOCK_SIZE - ShipBlock.BLOCK_RADIUS - this.height_half;
                this.vy = 0;
                this.is_landing = true;
                this.is_on_ship = true;
            }
        }

        // 床すり抜けは押しっぱなしにしないと解除
        this.is_off_platform = false;

        // 海との当たり判定
        if( 0 <= this.y ){
            this.is_alive = false;
        }

        // AI
        if( 0 < this.cooldown_time_count ){
            // クールダウン中
            this.cooldown_time_count -= 1;
        } else {
            if( this.path_finding.is_processing ){
                this.path_finding.process_finding();
            } else {
                if( this.path_finding.is_finding_success ){
                    // 探索が成功しているなら、経路に沿って歩く
                    this.on_lead_path();
                } else {
                    // 目的地決め
                    this.on_think_ai();
                }
            }
        }
    }
    ai_healing_self(){
        if( this.hp < this.hp_max * 0.3 ) {
            // HPが減ってたら回復
            this.set_target_place( this.home_cell_x, this.home_cell_y );
            return true;
        }
        return false;
    }
    ai_delivery_item(){
        // アイテムを保持している場合
        if( this.carrying_item != null ){
            // 自分が持っているアイテムに対応した設備を検索
            let block_to_deposit = this.game.world.ship.search_block_in_nearest_in_condition( this.x , this.y,
                function( block ){
                    return block.accept_ammo_type &&
                    this.carrying_item.ammo_type == block.accept_ammo_type &&
                    block.saving_data.ammo_amount < 50;
                }.bind(this)
            );
            if( block_to_deposit ){
                // 投入先設備が近ければ投入する
                if( this.check_block_is_in_range( block_to_deposit ) ){
                    if ( block_to_deposit.deposit_item( this.carrying_item ) ){
                        this.carrying_item = null;
                    } else {
                        // TODO 投入できなかった場合は？
                        this.carrying_item = null;
                        this.game.log('ボットがアイテムの投入に失敗');
                    }
                    return true;
                }
                // 遠ければ、近くまで向かう
                this.set_target_place( block_to_deposit.cell_x, block_to_deposit.cell_y );
                return true;
            }
            // TODO 投入できるブロックが無い場合はその場に落とす
        }
        return false;
    }
    ai_operate_weapon(){
        // 戦闘中の武器を検索し、オペレートに向かう
        let angry_weapon = this.game.world.ship.search_block_in_nearest_in_condition( this.x , this.y,
            function( block ){
                return 0 < block.angry_timer_count;
            }
        );
        if( angry_weapon ){
            if( this.check_block_is_in_range( angry_weapon ) ){
                if ( angry_weapon.on_operate( this ) ){
                } else {
                }
                this.set_cooldown();
                return true;
            }
            this.set_target_place( angry_weapon.cell_x, angry_weapon.cell_y );
            return true;
        }
        return false;
    }
    ai_supply_ammo(){
        // 弾薬が不足している武器がある場合
        let block_out_of_ammo = this.game.world.ship.search_block_in_nearest_in_condition( this.x , this.y,
            function( block ){
                return block.accept_ammo_type && block.saving_data.ammo_amount < 50;
            }
        );
        if( block_out_of_ammo ){
            // １番近い、弾薬を補充できる設備を検索
            let block_that_has_ammo = this.game.world.ship.search_block_in_nearest_in_condition( this.x , this.y,
                function( block ){
                    if( block == this.home_block ){
                        return true;
                    }
                }.bind(this)
            );
            if( block_that_has_ammo ){
                // 補充設備に手が届くなら
                if( this.check_block_is_in_range( block_that_has_ammo ) ){
                    if( block_that_has_ammo == this.home_block){
                        // 補充設備がホームであれば、クラフトを試みる
                        // TODO
                        if( block_out_of_ammo.accept_ammo_type == 'gun' ){
                            this.carrying_item = new AmmoItem( this.game );
                        } else if( block_out_of_ammo.accept_ammo_type == 'cannon' ){
                            this.carrying_item = new CannonAmmoItem( this.game );
                        } else if( block_out_of_ammo.accept_ammo_type == 'fuel' ){
                            this.carrying_item = new SolidFuel( this.game );
                        }
                    }
                    return true;
                }
                // 補給設備に向かう
                this.set_target_place( block_that_has_ammo.cell_x, block_that_has_ammo.cell_y );
                return true;
            }
        }
        return false;
    }
    on_think_ai(){

        if( this.ai_healing_self() ){
            return true;
        }
        if( this.ai_delivery_item() ){
            return true;
        }
        if( this.ai_operate_weapon() ){
            return true;
        }
        if( this.ai_supply_ammo() ){
            return true;
        }
        if( this.set_cooldown() ){
            return true;
        }

        return false;
    }
    set_cooldown(){
        this.cooldown_time_count = this.cooldown_time_max;
    }
    check_block_is_in_range( block ){
        let dist =
        (this.x - block.x) * (this.x - block.x) +
        (this.y - block.y) * (this.y - block.y);
        return ( dist < this.interact_range);
    }
    set_target_place( x1, y1 ){
        // リーディング系のステータスを初期化
        this.path_leading_index = 0;
        this.path_leading_time_limit_count = this.path_leading_time_limit_max;

        // 場所を決める
        let sp = this.game.world.ship;
        this.path_finding.init_finding(
            sp.local_to_cell_x( sp.global_to_local_x( this.x )),
            sp.local_to_cell_y( sp.global_to_local_y( this.y )),
            x1,y1
        );
    }
    // 経路に従って移動する
    on_lead_path(){
        if( this.path_finding.path.length <= this.path_leading_index ){
            // パスの最後まで来た
            this.on_think_ai();
            return;
        }
        if( 0 < this.path_leading_time_limit_count){
            this.path_leading_time_limit_count -= 1;
        } else {
            // 時間内に次のノードに着けなかった
            this.on_think_ai();
            return;
        }
        let next_x = this.game.world.ship.cell_to_global_x( this.path_finding.path[ this.path_leading_index ].x);
        let next_y = this.game.world.ship.cell_to_global_y( this.path_finding.path[ this.path_leading_index ].y);
        let x_dist = next_x - this.x;
        let y_dist = next_y - this.y;
        // x座標の差によって、左右に歩く
        const margin = 10;
        if( margin < x_dist ){
            this.vx += 1;
        }
        if( x_dist < -margin ){
            this.vx -= 1;
        }
        if( margin < y_dist ){
            // 床抜け
            this.is_off_platform = true;
        }
        if( y_dist < -margin ){
            // ジャンプ
            if( this.is_landing ){
                this.vy = -6;
                this.is_landing = false;
            }
        }
        if( Math.abs( x_dist ) <= margin && Math.abs( y_dist ) <= margin ){
            // 次のノードへ向かう
            this.path_leading_index += 1;
            this.path_leading_time_limit_count = this.path_leading_time_limit_max;
        }
    }
    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(200,200,200)'
        //canvas.strokeRect( this.x - 16, this.y - 16, 32, 32)

        canvas.drawImage( this.image ,this.x - 16, this.y - 16, 32 , 32)
        if( this.carrying_item ){
            canvas.drawImage( this.carrying_item.get_image() ,this.x - 16, this.y - 32, 32 , 32)
        }
        this.path_finding.on_draw( canvas );
    }
}
