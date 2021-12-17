
export class HudStatus {


    constructor( game ){
        this.game = game;
        this.player = this.game.world.player;

        this.icon_hp = this.game.image_library.get_image( 'heart_blur' );
        this.icon_sp = this.game.image_library.get_image( 'denryoku_mark' );
        this.icon_happiness = this.game.image_library.get_image( 'mark_face_laugh' );
        this.icon_hunger = this.game.image_library.get_image( 'wasyoku_yakizakana' );
        this.icon_thirst = this.game.image_library.get_image( 'tsuyu_mark09_ame' );

    }
    on_update(){

    }

    static MARGIN_LEFT = 20;
    static MARGIN_TOP = 450;
    static STATUS_HEIGHT = 30;
    static GUAGE_LENGTH = 120;
    static GUAGE_TILT = 20;

    static ICON_X = 125
    static TEXT_X = 145

    draw_guage( canvas, dan , fill_rate){
        // 外枠
        let fill_rate_rev = 1 - fill_rate
        canvas.beginPath(  );
        canvas.moveTo( HudStatus.GUAGE_LENGTH,         dan * HudStatus.STATUS_HEIGHT );
        canvas.lineTo( 0                     ,         dan * HudStatus.STATUS_HEIGHT - HudStatus.GUAGE_TILT );
        canvas.lineTo( 0                     ,    20 + dan * HudStatus.STATUS_HEIGHT - HudStatus.GUAGE_TILT );
        canvas.lineTo( HudStatus.GUAGE_LENGTH,    20 + dan * HudStatus.STATUS_HEIGHT );
        canvas.closePath();
        canvas.stroke();
        // 塗り部分
        canvas.beginPath(  );
        canvas.moveTo( HudStatus.GUAGE_LENGTH,         dan * HudStatus.STATUS_HEIGHT );
        canvas.lineTo( HudStatus.GUAGE_LENGTH * fill_rate_rev  ,         dan * HudStatus.STATUS_HEIGHT - HudStatus.GUAGE_TILT * fill_rate);
        canvas.lineTo( HudStatus.GUAGE_LENGTH * fill_rate_rev  ,    20 + dan * HudStatus.STATUS_HEIGHT - HudStatus.GUAGE_TILT * fill_rate);
        canvas.lineTo( HudStatus.GUAGE_LENGTH,    20 + dan * HudStatus.STATUS_HEIGHT );
        canvas.closePath();
        canvas.fill();
    }
    on_draw( canvas ){
        canvas.save()
        canvas.translate( HudStatus.MARGIN_LEFT, HudStatus.MARGIN_TOP );
        canvas.strokeStyle = 'rgb(200,200,200)';
        //canvas.strokeRect( 0, 0, 100, 50 );

        canvas.fillStyle = 'rgb(200,50,20)';
        canvas.drawImage( this.icon_hp, HudStatus.ICON_X, 0 * HudStatus.STATUS_HEIGHT, 24, 24 );
        this.draw_guage( canvas, 0, this.player.health.hp / this.player.health.max_hp )

        canvas.fillStyle = 'rgb(250,250,20)';
        canvas.drawImage( this.icon_sp, HudStatus.ICON_X, 1 * HudStatus.STATUS_HEIGHT, 24, 24 );
        this.draw_guage( canvas, 1, this.player.health.sp / this.player.health.max_sp )

        canvas.fillStyle = 'rgb(50,250,120)';
        canvas.drawImage( this.icon_happiness, HudStatus.ICON_X, 2 * HudStatus.STATUS_HEIGHT, 24, 24 );
        this.draw_guage( canvas, 2, this.player.health.happiness / this.player.health.max_happiness )

        canvas.fillStyle = 'rgb(200,150,50)';
        canvas.drawImage( this.icon_hunger, HudStatus.ICON_X, 3 * HudStatus.STATUS_HEIGHT, 24, 24 );
        this.draw_guage( canvas, 3, this.player.health.hunger / this.player.health.max_hunger )

        canvas.fillStyle = 'rgb(20,200,200)';
        canvas.drawImage( this.icon_thirst, HudStatus.ICON_X, 4 * HudStatus.STATUS_HEIGHT, 24, 24 );
        this.draw_guage( canvas, 4, this.player.health.thirst / this.player.health.max_thirst )

        canvas.restore();
    }
}
