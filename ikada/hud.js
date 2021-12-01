

export class Hud {
    constructor( game ){
        this.name = 'hud';
        this.game = game

        this.itemslot_margin_bottom = 40;
        this.itemslot_size = 50;
        this.itemslot_spacing = 10;
        this.itemslot_count = 9;
        this.itemslot_start_x = 99;
        this.itemslot_start_y = 99;
        this.calc_itemslot_coodinate()
    }

    calc_itemslot_coodinate(){
        // アイテムスロットの描画位置を再計算する
        this.itemslot_start_y = this.game.SCREEN_HEIGHT - this.itemslot_margin_bottom - this.itemslot_size;
        this.itemslot_start_x = (this.game.SCREEN_WIDTH / 2) - ((this.itemslot_size + this.itemslot_spacing) * this.itemslot_count / 2);
    }

    on_update(){

    }

    on_draw( canvas ){

        canvas.strokeStyle = 'rgb(222,222,222)'

        // アイテムスロットを描く
        for(let slot_no = 0 ; slot_no <= 8 ; slot_no++ ){
            canvas.strokeRect(
                this.itemslot_start_x + slot_no * (this.itemslot_size + this.itemslot_spacing),
                this.itemslot_start_y,
                this.itemslot_size,
                this.itemslot_size )
        }

    }
}
