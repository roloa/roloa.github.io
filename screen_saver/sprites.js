

export class Sprites {

    constructor(){
        this.isAlive = true
    }
    on_draw(){
    }
    on_update(){
    }
}

export class Sparkle extends Sprites {

    constructor(){
        super()
        this.life = 100
        this.dx = Math.random() * 4 - 2
        this.dy = Math.random() * 4 - 2
    }
    on_update(){

        this.x += this.dx
        this.y += this.dy

        this.life -= 3
        if(this.life <= 0 ){
            this.isAlive = false
        }
    }
    on_draw( canvas ){
        canvas.save()
        canvas.translate( this.x, this.y )
        //canvas.rotate(this.rot)
        canvas.strokeStyle = "rgba(" + [255,255,0, this.life * 0.01] + ")"
        canvas.beginPath()
        canvas.moveTo(0,0)
        canvas.lineTo( this.dx , this.dy)
        canvas.stroke()
        //console.log(this)
        canvas.restore()
    }
}

export class Raindrop extends Sprites {


    constructor(){
        super()
        this.dx = 0
        this.dy = 0

        this.GRAVITY = 1
        this.AIR_FRICTION = 0.9

    }
    on_update( game ){

        this.x += this.dx
        this.y += this.dy
        this.dy += this.GRAVITY
        this.dx += game.wind
        this.dy *= this.AIR_FRICTION
        this.dx *= this.AIR_FRICTION

        let pixel_red = game.canvas2d.getImageData(Math.floor(this.x), Math.floor(this.y), 1, 1).data[0]
        //if(Math.random() < 0.01){ console.log(pixel_red) }
        if( game.canvas.height < this.y ||
            30 < pixel_red ) {
            // 跳ね返り
            if( 5 < this.dy ){
                this.y -= this.dy
                this.dy *= -Math.random()
                this.dx = Math.random()*4-2


            } else {
                this.isAlive = false
            }
        }
    }
    on_draw( canvas ){
        canvas.save()
        canvas.translate( this.x, this.y )
        //canvas.rotate(this.rot)
        canvas.strokeStyle = "rgb(0,0,255)"
        canvas.beginPath()
        canvas.moveTo(0,0)
        canvas.lineTo( this.dx , this.dy)
        canvas.stroke()
        //console.log(this)
        canvas.restore()
    }
}
