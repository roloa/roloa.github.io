
export class BaseBall {
    constructor(){
        this.name = 'BaseBall'

        this.id = 0
        this.x = 100
        this.y = 100
        this.pre_x = this.x
        this.pre_y = this.y

        this.rot = 0
        this.dx = 10
        this.dy = 1
        this.dr = 1
        this.gravity = 1
        this.radius = 30
        this.radius_pow2 = this.radius * this.radius
        this.radius_double_pow2 = (this.radius * 2) * (this.radius * 2)
        this.is_grabbed = false

        this.mass = 100

        this.image_file_name = 'base_ball.png'
        this.image = new Image()
        this.image.src = this.image_file_name;

        this.dom = null
    }

    reset(){
        console.log(this.name, this.version)
    }

    on_update( game ){

        // ボールの動作
        if( this.is_grabbed ) {
            // 掴まれてるとき
            this.on_update_grabbing( game )
        } else {
            // 自由なとき
            this.on_update_ball_phisical( game )
        }

        // ボール同士の衝突
        for( let ballindex in game.ball_list ){
            let target_ball = game.ball_list[ ballindex ]
            if( this.id <= target_ball.id ){
                // idの大きい方だけが衝突処理を行うため
                // idが同じか自分のほうが小さい場合はスキップする
                continue;
            }
            // 当たり判定
            if( this.hit_ball_test( target_ball ) ){
                console.log(this.name, target_ball.name)
                this.crash_bound( target_ball )
            }
        }
    }
    hit_ball_test( target_ball ){
        // TODO 高速化
        // ボールの大きさ考慮
        return (
            (this.x - target_ball.x) * (this.x - target_ball.x) +
            (this.y - target_ball.y) * (this.y - target_ball.y)
            < this.radius_double_pow2
        )
    }
    crash_bound( tgt ){

        // ターゲットから自分へ来るベクトル
        let vx = tgt.x - this.x
        let vy = tgt.y - this.y
        let vec_len = Math.sqrt( vx * vx + vy * vy )
        let overlap_distance = this.radius + tgt.radius - vec_len
        if( vec_len <= 0 ){
            console.log('divide zero error: overlapping_resolve')
            return;
        }
        vx /= vec_len
        vy /= vec_len
        this.x -= vx * overlap_distance * 0.5
        this.y -= vy * overlap_distance * 0.5
        tgt.x += vx * overlap_distance * 0.5
        tgt.y += vy * overlap_distance * 0.5

        // 運動エネルギーの和
        let my_speed_p2 = Math.sqrt(this.dx * this.dx + this.dy * this.dy)
        let tgt_speed_p2 = Math.sqrt(tgt.dx * tgt.dx + tgt.dy * tgt.dy)
        let kinetic_energy_sum =(my_speed_p2 * this.mass + my_speed_p2 * tgt.mass)
        //kinetic_energy_sum = 1000
        console.log(my_speed_p2)
        // ターゲットからの単位ベクトル x 運動エネルギーの和 * 重さの割合
        this.dx = -vx * kinetic_energy_sum  / this.mass * 0.5
        this.dy = -vy * kinetic_energy_sum  / this.mass * 0.5
        tgt.dx = vx * kinetic_energy_sum  / tgt.mass * 0.5
        tgt.dy = vy * kinetic_energy_sum  / tgt.mass * 0.5
    }



    on_update_grabbing( game ){
        this.x = game.mouse_x
        this.y = game.mouse_y

        this.dx = this.x - this.pre_x
        this.dy = this.y - this.pre_y

        this.pre_x = this.x
        this.pre_y = this.y
    }
    on_update_ball_phisical( game ){
        this.x += this.dx
        this.y += this.dy
        this.dy += this.gravity
        this.rot += 0.1

        this.pre_x = this.x
        this.pre_y = this.y


        if( game.field.height - this.radius < this.y ) {
            this.y = game.field.height - this.radius
            this.dy = this.dy * -0.9
        }
        if( game.field.width - this.radius < this.x ) {
            this.x = game.field.width - this.radius
            this.dx = this.dx * -0.5
        }
        if( this.x < this.radius ) {
            this.x =  this.radius
            this.dx = this.dx * -0.5
        }
        if( this.y < this.radius ) {
            this.y =  this.radius
            this.dy = this.dy * -0.5
        }

    }


    draw_dom(){
        this.dom.style['left'] = this.x + 'px'
        this.dom.style['top'] = this.y + 'px'
    }
    draw_canvas( canvas ){
        canvas.save()
        canvas.translate( this.x, this.y )
        canvas.rotate(this.rot)
        canvas.drawImage( this.image, -this.radius, -this.radius)

        canvas.restore()

    }

    // 点との当たり判定
    hit_point_test( px, py ){
        return (px - this.x) * (px - this.x) + (py - this.y) * (py - this.y) < this.radius_pow2;
    }
    on_grab( game ){
        console.log(this.name,'grab')
        this.is_grabbed = true
    }
    on_release( game ){
        console.log(this.name,'release')
        this.is_grabbed = false
    }
}

export class RedBall extends BaseBall{
    constructor(){
        super()
        this.name = 'RedBall'
        this.image_file_name = 'red_ball.png'
        this.image.src = this.image_file_name;

    }
    on_release( game ){
        super.on_release( game )
        this.dx = 10
        this.dy = -5
    }

}
