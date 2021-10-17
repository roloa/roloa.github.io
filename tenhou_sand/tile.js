
export class Tile {

    constructor( new_color, new_number , new_is_red){
        this.isAlive = true

        // 萬子=1 筒子=2 索子=3 字牌=4
        this.color = new_color

        // 1-9, 字牌の場合は, 東=1 南=2...
        this.number = new_number

        // 赤ドラ
        this.is_red = new_is_red

        this.text = '?'
        switch( this.color ){
            case 1:
            switch( this.number ){
                case 1: this.text = '一'; break;
                case 2: this.text = '二'; break;
                case 3: this.text = '三'; break;
                case 4: this.text = '四'; break;
                case 5: this.text = '五'; break;
                case 6: this.text = '六'; break;
                case 7: this.text = '七'; break;
                case 8: this.text = '八'; break;
                case 9: this.text = '九'; break;
            }
            break;
            case 2:
            switch( this.number ){
                case 1: this.text = '➀'; break;
                case 2: this.text = '➁'; break;
                case 3: this.text = '➂'; break;
                case 4: this.text = '➃'; break;
                case 5: this.text = '➄'; break;
                case 6: this.text = '➅'; break;
                case 7: this.text = '➆'; break;
                case 8: this.text = '➇'; break;
                case 9: this.text = '➈'; break;
            }
            break;
            case 3:
            switch( this.number ){
                case 1: this.text = '１'; break;
                case 2: this.text = '２'; break;
                case 3: this.text = '３'; break;
                case 4: this.text = '４'; break;
                case 5: this.text = '５'; break;
                case 6: this.text = '６'; break;
                case 7: this.text = '７'; break;
                case 8: this.text = '８'; break;
                case 9: this.text = '９'; break;
            }
            break;
            case 4:
            switch( this.number ){
                case 1: this.text = '東'; break;
                case 2: this.text = '南'; break;
                case 3: this.text = '西'; break;
                case 4: this.text = '北'; break;
                case 5: this.text = '白'; break;
                case 6: this.text = '発'; break;
                case 7: this.text = '中'; break;
            }
            break;
        }

    }
    on_update(){
    }
}
