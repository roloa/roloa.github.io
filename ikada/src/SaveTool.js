
class SaveTool {
    constructor(){

        // イメージの選択時のリスナー
        document.getElementById('button_load_auto').addEventListener("click", this.on_click_load_auto.bind(this), false);
        document.getElementById('button_load_1').addEventListener("click", this.on_click_load_1.bind(this), false);
        document.getElementById('button_load_2').addEventListener("click", this.on_click_load_2.bind(this), false);

        document.getElementById('button_save_auto').addEventListener("click", this.on_click_save_auto.bind(this), false);
        document.getElementById('button_save_1').addEventListener("click", this.on_click_save_1.bind(this), false);
        document.getElementById('button_save_2').addEventListener("click", this.on_click_save_2.bind(this), false);

    }
    on_click_save_auto(){
        if( window.confirm('オートセーブデータにセーブしますか？') ){
            this.save_data( 'save_data_auto' )
        }
    }
    on_click_save_1(){
        if( window.confirm('データ[1]にセーブしますか？') ){
            this.save_data( 'save_data_1' )
        }
    }
    on_click_save_2(){
        if( window.confirm('データ[2]にセーブしますか？') ){
            this.save_data( 'save_data_2' )
        }
    }
    on_click_load_auto(){
        this.load_data( 'save_data_auto' )
    }
    on_click_load_1(){
        this.load_data( 'save_data_1' )
    }
    on_click_load_2(){
        this.load_data( 'save_data_2' )
    }
    load_data( save_name ){
        let data = localStorage.getItem( save_name );
        document.getElementById('data_text').value = data;
    }
    save_data( save_name ){
        let data = document.getElementById('data_text').value;
        localStorage.setItem( save_name, data );
        window.alert('セーブが完了しました。');
    }

}

let save_tool = new SaveTool();
