

export class Control {

    constructor(){

        this.game = null
    }

    init( new_game ){
        this.game = new_game

        document.getElementById('button_pause').onclick = function(){
            this.game.is_paused = !this.game.is_paused;
        }.bind(this)

        document.getElementById('button_lock').onclick = function(){
            if( this.game.hand_lock ){
                this.game.hand_lock = false
                this.game.release_time = 15
                this.game.shanten_text = ''
            } else {
                this.game.hand_lock = true
                this.game.shanten_text = '[手牌ロック中]'
                this.game.hand_hold_time = 15
            }
        }.bind(this)

        document.getElementById('button_put_136').onclick = function(){
            this.game.place_136()
        }.bind(this)

        document.getElementById('button_put_man').onclick = function(){
            this.game.place_manzu()
        }.bind(this)
        document.getElementById('button_put_red_five').onclick = function(){
            this.game.place_red_five_pin()
        }.bind(this)
        document.getElementById('button_put_ton').onclick = function(){
            this.game.place_ton()
        }.bind(this)

        document.getElementById('button_put_pei10').onclick = function(){
            this.game.place_pei10()
        }.bind(this)

        document.getElementById('button_pai_shuffle').onclick = function(){
            this.game.shuffle_field()
        }.bind(this)

        document.getElementById('button_pai_clear').onclick = function(){
            this.game.clear_pai()
        }.bind(this)

        document.getElementById('button_wall_reset').onclick = function(){
            this.game.reset_wall()
        }.bind(this)

        document.getElementById('button_wall_clear').onclick = function(){
            this.game.clear_wall()
        }.bind(this)

        // デフォルトチェックボックス設定の読み込み
        this.game.setting_lock_on_richi = document.getElementById('check_lock_on_richi').checked
        this.game.setting_lock_on_tenhou = document.getElementById('check_lock_on_tenhou').checked
        this.game.setting_lock_not_allow_seven_pairs =  document.getElementById('check_lock_not_allow_seven_pairs').checked
        this.game.setting_slow_mode = document.getElementById('check_slow_mode').checked
        this.game.setting_sort_hand = document.getElementById('check_sort_hand').checked

        document.getElementById('check_lock_on_richi').onclick = function(e){
            this.game.setting_lock_on_richi = document.getElementById('check_lock_on_richi').checked
        }.bind(this)

        document.getElementById('check_lock_on_tenhou').onclick = function(e){
            this.game.setting_lock_on_tenhou = document.getElementById('check_lock_on_tenhou').checked
        }.bind(this)

        document.getElementById('check_lock_not_allow_seven_pairs').onclick = function(e){
            this.game.setting_lock_not_allow_seven_pairs =  document.getElementById('check_lock_not_allow_seven_pairs').checked
        }.bind(this)

        document.getElementById('check_slow_mode').onclick = function(e){
            this.game.setting_slow_mode = document.getElementById('check_slow_mode').checked
        }.bind(this)

        document.getElementById('check_sort_hand').onclick = function(e){
            this.game.setting_sort_hand = document.getElementById('check_sort_hand').checked
        }.bind(this)



    }




}
