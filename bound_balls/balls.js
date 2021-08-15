
export class BaseBall {
    constructor(){
        this.name = 'RedBall'

        this.id = 0
        this.x = 100
        this.y = 100
        this.rot = 0
        this.dx = 10
        this.dy = 1
        this.dr = 1
        this.gravity = 1
        this.radius = 30

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

        this.x += this.dx
        this.y += this.dy
        this.dy += this.gravity
        this.rot += 0.1

        if( game.field.height - this.radius < this.y ) {
            this.y = game.field.height - this.radius
            this.dy = this.dy * -0.5
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

}

export class RedBall extends BaseBall{
    constructor(){
        super()
        this.name = 'RedBall'
        this.image_file_name = 'red_ball.png'
        this.image.src = this.image_file_name;

    }


}
