
export class QuizState extends Object {
    constructor() {
        super();
        this.ghost_ary = [];
        this.fire_ary = [];
        this.candle_ary = [];
        for (let i = 0; i <= 99; i++) {
            this.fire_ary[i] = 0;
            this.candle_ary[i] = 0;
        }
        this.match_count = 0;
        this.solve_log = "solve log:\n";
    }

    set_ghost_ary(ghost_ary) {
        this.ghost_ary = ghost_ary;
    }

    set_fire_at(fire_number, fire_count) {
        this.fire_ary[fire_number] = fire_count;
    }
    set_candle_at(candle_number, candle_count) {
        this.candle_ary[candle_number] = candle_count;
    }
    set_match_count(match_count) {
        this.match_count = match_count;
    }

    load_from_string(input_string) {
        // 入力の例
        // 30; ;2:4, 3:2, 2 
        // おばけ; 炎の数字; ろうそくの数字:ろうそくの使用回数; マッチの本数
        let quiz_ary = input_string.replace(" ", "").split(";");
        let ghost_string = quiz_ary[0];
        let fire_string = quiz_ary[1];
        let candle_string = quiz_ary[2];
        let match_string = quiz_ary[3];

        this.ghost_ary = ghost_string.split(",");
        for (let i = 0; i < this.ghost_ary.length; i++) {
            this.ghost_ary[i] = Number(this.ghost_ary[i]);
        }

        if (fire_string != "") {
            let fire_input_ary = fire_string.split(",");
            for (let i = 0; i < fire_input_ary.length; i++) {
                let fire_input_ary_split = fire_input_ary[i].split(":");
                let fire_number = Number(fire_input_ary_split[0]);
                let fire_count = Number(fire_input_ary_split[1]);
                this.fire_ary[fire_number] = fire_count;
            }
        }

        if (candle_string != "") {
            let candle_input_ary = candle_string.split(",");
            for (let i = 0; i < candle_input_ary.length; i++) {
                let candle_input_ary_split = candle_input_ary[i].split(":");
                let candle_number = Number(candle_input_ary_split[0]);
                let candle_count = Number(candle_input_ary_split[1]);
                this.candle_ary[candle_number] = candle_count;
            }
        }
        this.match_count = Number(match_string);

    }

    convert_to_string() {
        // TODO
        let result_string = "";

    }

    // deepcopy(){
    //     return JSON.parse(JSON.stringify(this));
    // }
}