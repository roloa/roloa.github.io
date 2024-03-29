
export class Tile {

    constructor( new_color, new_number ){
        this.isAlive = true

        // 萬子=1 筒子=2 索子=3 字牌=4
        this.color = new_color

        // 1-9, 字牌の場合は, 東=1 南=2...
        this.number = new_number

        // 赤ドラ
        this.is_green = false

        this.text = '?'
        switch( this.color ){
            case 1:
            switch( this.number ){
                case 1: this.text = '一'; this.is_red = true; break;
                case 2: this.text = '二'; this.is_red = true;  break;
                case 3: this.text = '三'; this.is_red = true;  break;
                case 4: this.text = '四'; this.is_red = true;  break;
                case 5: this.text = '五'; this.is_red = true;  break;
                case 6: this.text = '六'; this.is_red = true;  break;
                case 7: this.text = '七'; this.is_red = true;  break;
                case 8: this.text = '八'; this.is_red = true;  break;
                case 9: this.text = '九'; this.is_red = true;  break;
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
                case 1: this.text = '１'; this.is_green = true; break;
                case 2: this.text = '２'; this.is_green = true; break;
                case 3: this.text = '３'; this.is_green = true; break;
                case 4: this.text = '４'; this.is_green = true; break;
                case 5: this.text = '５'; this.is_green = true; break;
                case 6: this.text = '６'; this.is_green = true; break;
                case 7: this.text = '７'; this.is_green = true; break;
                case 8: this.text = '８'; this.is_green = true; break;
                case 9: this.text = '９'; this.is_green = true; break;
            }
            break;
            case 4:
            switch( this.number ){
                case 1: this.text = '東'; break;
                case 2: this.text = '南'; break;
                case 3: this.text = '西'; break;
                case 4: this.text = '北'; break;
                case 5: this.text = ''; break;
                case 6: this.text = '発'; this.is_green = true;  break;
                case 7: this.text = '中'; this.is_red = true;  break;
            }
            break;
        }

    }
    is_greater_than( another_tile ){
        if( another_tile.color == this.color ){
            return another_tile.number < this.number
        } else {
            return another_tile.color < this.color
        }
    }
    equals( another_tile ){
        return another_tile.color == this.color && another_tile.number == this.number
    }
}
