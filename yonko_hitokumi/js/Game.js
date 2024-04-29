

class Template extends Object {
    constructor(game) {
        super(game);
        this.game = game;
    }
}

class Game extends Object {


    constructor() {
        super();
        this.name = 'yonko_hitokumi';
        this.version = '0.1';
        this.game = this;
    }

    init() {

        // ゲーム用の変数
        this.field = [];
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            this.field.push([]);
            for (let x = 0; x < FIELD_WIDTH; x++) {
                this.field[y].push(0);
            }
        }

        //this.field[21][4] = 2;

        this.mino_x = 0;
        this.mino_y = 0;
        this.mino = new Mino(1);

        this.seven_bag = [];

        this.next_queue = [
            this.pop_seven_bag(),
            this.pop_seven_bag(),
            this.pop_seven_bag(),
            this.pop_seven_bag(),
            this.pop_seven_bag()
        ]

        this.hold_mino = null;
        this.is_hold_active = true;

        this.das_charge_right = 0;
        this.das_charge_left = 0;

        this.mino_fall_timer = 0;
        this.mino_fall_timer_max = 20;
        this.mino_rockdown_timer = 0;
        this.mino_rockdown_timer_max = 20;

        this.is_t_spin = false;
        this.is_t_spin_mini = false;
        this.is_b2b = false;
        this.combo_count = -1;

        this.spawn_next_mino();

        this.score = 0;
        this.score_text_span = document.getElementById("score_text");
        this.b2b_text_span = document.getElementById("b2b_text");
        this.clear_text_span = document.getElementById("clear_text");
        this.clear_score_text_span = document.getElementById("clear_score_text");
        this.combo_text_span = document.getElementById("combo_text");
        this.combo_score_text_span = document.getElementById("combo_score_text");

        this.CELL_COLOR_CLASS_LIST = [
            "cell_none",
            , "cell_J", "cell_L", "cell_S", "cell_Z", "cell_T", "cell_I", "cell_O"
            , "cell_shadow_J", "cell_shadow_L", "cell_shadow_S", "cell_shadow_Z", "cell_shadow_T", "cell_shadow_I", "cell_shadow_O"
        ]

        // 表示部分の準備
        // フィールド
        this.field_cell_div = [];
        let field_div = document.getElementById("field");
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            this.field_cell_div.push([]);
            // 行のdiv
            let new_row_div = document.createElement("div");
            new_row_div.classList.add("field_row");
            for (let x = 0; x < FIELD_WIDTH; x++) {
                let new_cell = document.createElement("div");
                new_cell.classList.add("field_cell");
                new_row_div.appendChild(new_cell);
                this.field_cell_div[y].push(new_cell);
            }
            field_div.appendChild(new_row_div);
        }
        // ホールド
        this.hold_cell_div = [];
        let hold_div = document.getElementById("hold_mino");
        for (let y = 0; y < 4; y++) {
            this.hold_cell_div.push([]);
            let new_row_div = document.createElement("div");
            new_row_div.classList.add("field_row");
            for (let x = 0; x < 4; x++) {
                let new_cell = document.createElement("div");
                new_cell.classList.add("non_field_cell");
                new_row_div.appendChild(new_cell);
                this.hold_cell_div[y].push(new_cell);
            }
            hold_div.appendChild(new_row_div);
        }
        // ネクスト
        this.next_cell_div = [];
        let next_div = document.getElementById("next_mino");
        for (let y = 0; y < NEXT_HEIGHT; y++) {
            this.next_cell_div.push([]);
            let new_row_div = document.createElement("div");
            new_row_div.classList.add("field_row");
            for (let x = 0; x < 4; x++) {
                let new_cell = document.createElement("div");
                new_cell.classList.add("non_field_cell");
                new_row_div.appendChild(new_cell);
                this.next_cell_div[y].push(new_cell);
            }
            next_div.appendChild(new_row_div);
        }

        this.input_controller = new InputController(this);

        this.sound_cymbal = new Audio("sound/cymbal.mp3");
        this.sound_kick = new Audio("sound/kick.mp3");
        this.sound_snare = new Audio("sound/snare.mp3");
        this.sound_perc = new Audio("sound/perc.mp3");
        this.sound_perc2 = new Audio("sound/perc2.mp3");

        this.sound_t_rotate = new Audio("sound/t_rotate.mp3");
        this.sound_t_spin = new Audio("sound/t_spin.mp3");


        this.input_controller.setup()
        this.interbal_handle = setInterval(this.on_update.bind(this), 40)
    }
    pop_seven_bag() {
        if (this.seven_bag.length == 0) {
            this.seven_bag = [
                new Mino(1), new Mino(2), new Mino(3), new Mino(4), new Mino(5), new Mino(6), new Mino(7)
            ];
        }
        return this.seven_bag.splice(Math.floor(Math.random() * this.seven_bag.length), 1)[0];
    }
    is_blocked(y, x) {
        // 壁かどうか
        if (x < 0) {
            return true;
        }
        if (FIELD_WIDTH <= x) {
            return true;
        }
        if (y < 0) {
            return true;
        }
        if (FIELD_HEIGHT <= y) {
            return true;
        }
        if (this.field[y][x]) {
            // ブロックがあったら                        
            return true;
        }
    }
    is_mino_can_move_to(move_by_y, move_by_x, rotate) {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.mino.get_cell_with_rotate(y, x, rotate)) {
                    // ミノ内のそれぞれのブロックについて
                    let checking_x = this.mino_x + x + move_by_x;
                    let checking_y = this.mino_y + y + move_by_y;

                    if (this.is_blocked(checking_y, checking_x)) {
                        return false;
                    }
                }
            }
        }
        // 動かせる
        return true;
    }
    check_line_clear() {
        let cleared_line_count = 0;
        for (let y = FIELD_HEIGHT - 1; 0 <= y; y--) {
            let filled = true;
            for (let x = 0; x < FIELD_WIDTH; x++) {
                if (this.field[y][x]) {

                } else {
                    // ブロックがなかったら中断
                    filled = false;
                    break;
                }
            }
            if (filled) {
                // ラインがそろっていたら
                // これより上の段を1段下にずらしてくる
                for (let y2 = y; 1 <= y2; y2--) {
                    for (let x2 = 0; x2 < FIELD_WIDTH; x2++) {
                        this.field[y2][x2] = this.field[y2 - 1][x2]
                    }
                }
                // 一番上の段を消す
                for (let x2 = 0; x2 < FIELD_WIDTH; x2++) {
                    this.field[0][x2] = 0;
                }
                cleared_line_count += 1;
                // ラインが揃ったのでループを1段分巻き戻す
                y++;
            }
        }

        // サウンドを中断する
        this.sound_cymbal.pause();
        this.sound_cymbal.currentTime = 0;
        this.sound_kick.pause();
        this.sound_kick.currentTime = 0;
        this.sound_snare.pause();
        this.sound_snare.currentTime = 0;
        // 消したライン数に応じた処理
        if (0 < cleared_line_count) {
            if (cleared_line_count == 1) {
                if (this.is_t_spin) {
                    if (this.is_t_spin_mini) {
                        this.clear_text_span.innerText = "TS-Mini";
                        this.sound_t_spin.play();
                        if( this.is_b2b ){
                            this.b2b_text_span.innerText = "B2B +1";
                            this.score += 1;
                        }
                        this.is_b2b = true;
                    } else {
                        this.clear_text_span.innerText = "TS-Single";
                        this.sound_t_spin.play();
                        this.clear_score_text_span.innerText = "+2";
                        this.score += 2;
                        this.is_b2b = false;
                    }
                } else {
                    this.clear_text_span.innerText = "Single";
                    this.sound_snare.play();
                    this.is_b2b = false;
                }
            } else if (cleared_line_count == 2) {
                if (this.is_t_spin) {
                    this.clear_text_span.innerText = "TS-Double";
                    this.sound_t_spin.play();
                    this.clear_score_text_span.innerText = "+4";
                    this.score += 4;
                    if( this.is_b2b ){
                        this.b2b_text_span.innerText = "B2B +1";
                        this.score += 1;
                    }
                    this.is_b2b = true;
            } else {
                    this.clear_text_span.innerText = "Double";
                    this.sound_snare.play();
                    this.clear_score_text_span.innerText = "+1";
                    this.score += 1;
                    this.is_b2b = false;
                }
            } else if (cleared_line_count == 3) {
                if (this.is_t_spin) {
                    this.clear_text_span.innerText = "TS-Triple";
                    this.sound_t_spin.play();
                    this.clear_score_text_span.innerText = "+6";
                    this.score += 6;
                    if( this.is_b2b ){
                        this.b2b_text_span.innerText = "B2B +1";
                        this.score += 1;
                    }
                    this.is_b2b = true;
                } else {
                    this.clear_text_span.innerText = "Triple";
                    this.sound_snare.play();
                    this.clear_score_text_span.innerText = "+2";
                    this.score += 2;
                    this.is_b2b = false;
                }
            } else if (cleared_line_count == 4) {
                this.clear_text_span.innerText = "Quad";
                this.sound_cymbal.play();
                this.clear_score_text_span.innerText = "+4";
                this.score += 4;
                if( this.is_b2b ){
                    this.b2b_text_span.innerText = "B2B +1";
                    this.score += 1;
                }
                this.is_b2b = true;
            } else {
                this.clear_text_span.innerText = "Super!?";
                this.sound_cymbal.play();
            }
            this.combo_count += 1;
            if (1 <= this.combo_count) {
                this.combo_text_span.innerText =  this.combo_count + " Combo";
                if( 10 <= this.combo_count ){
                    this.combo_score_text_span.innerText = "+" + 5;
                    this.score += 5;
                } else if( 0 <= COMBO_TABLE[ this.combo_count ] ){
                    this.combo_score_text_span.innerText = "+" + COMBO_TABLE[ this.combo_count ];
                    this.score += COMBO_TABLE[ this.combo_count ];
                }
            }
        } else {
            this.sound_kick.play();
            this.combo_count = -1;
        }




    }
    spawn_next_mino() {
        this.mino_x = 3;
        this.mino_y = 0;
        this.mino_rockdown_timer = 0;
        this.is_t_spin = false;
        this.is_t_spin_mini = false;

        this.mino = this.next_queue[0];
        for (let i = 0; i < this.next_queue.length - 1; i++) {
            this.next_queue[i] = this.next_queue[i + 1];
        }
        if (!this.is_mino_can_move_to(0, 0, 0)) {
            // 窒息
            // とりあえずリセット
            for (let y = 0; y < FIELD_HEIGHT; y++) {
                for (let x = 0; x < FIELD_WIDTH; x++) {
                    this.field[y][x] = 0;
                }
            }
        }
        // TODO 7-bag
        this.next_queue[this.next_queue.length - 1] = this.pop_seven_bag();

    }
    lockdown_mino() {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.mino.get_cell(y, x)) {
                    // ミノ内のそれぞれのブロックについて
                    // 地形に書き込む
                    this.field[this.mino_y + y][this.mino_x + x] = this.mino.mino_id;
                }
            }
        }
        this.is_hold_active = true;

        this.b2b_text_span.innerText = "";
        this.clear_text_span.innerText = "";
        this.clear_score_text_span.innerText = "";
        this.combo_text_span.innerText = "";
        this.combo_score_text_span.innerText = "";

        // ライン消去
        this.check_line_clear();

        // スコアの表示を更新
        this.score_text_span.innerText = this.score;

        // 新しいミノを降らせる
        this.spawn_next_mino();
    }
    calc_y_to_harddrop() {
        // ハードドロップ先を計算
        let harddrop_distance = 0;
        while (this.is_mino_can_move_to(harddrop_distance, 0, 0)) {
            harddrop_distance += 1;
        }
        return this.mino_y + harddrop_distance - 1;
    }
    check_t_spin() {
        if (this.mino.mino_id == 5) {
            let blocked_corner = 0;
            if (this.is_blocked(this.mino_y, this.mino_x)) {
                blocked_corner += 1;
            }
            if (this.is_blocked(this.mino_y, this.mino_x + 2)) {
                blocked_corner += 1;
            }
            if (this.is_blocked(this.mino_y + 2, this.mino_x)) {
                blocked_corner += 1;
            }
            if (this.is_blocked(this.mino_y + 2, this.mino_x + 2)) {
                blocked_corner += 1;
            }
            if (3 <= blocked_corner) {
                this.is_t_spin = true;
                if (this.is_blocked(this.mino_y + 1, this.mino_x) ||
                    this.is_blocked(this.mino_y, this.mino_x + 1) ||
                    this.is_blocked(this.mino_y + 1, this.mino_x + 2) ||
                    this.is_blocked(this.mino_y + 2, this.mino_x + 1)) {
                    this.is_t_spin_mini = true;
                } else {
                    this.is_t_spin_mini = false;
                }
                return true;
            }
        }
        return false;
    }
    mino_rotate_right() {
        if (this.mino.mino_id == 6) {
            // Iミノは特別テーブルを使う
            for (let i = 0; i < 5; i++) {
                if (this.is_mino_can_move_to(
                    SRS_TABLE_I_RIGHT[this.mino.rotation][i].y,
                    SRS_TABLE_I_RIGHT[this.mino.rotation][i].x, 1)) {

                    this.mino_x += SRS_TABLE_I_RIGHT[this.mino.rotation][i].x;
                    this.mino_y += SRS_TABLE_I_RIGHT[this.mino.rotation][i].y;
                    this.mino.rotate(1);
                    this.mino_rockdown_timer = 0;
                    break;
                }
            }
        } else {
            for (let i = 0; i < 5; i++) {
                if (this.is_mino_can_move_to(
                    SRS_TABLE_RIGHT[this.mino.rotation][i].y,
                    SRS_TABLE_RIGHT[this.mino.rotation][i].x, 1)) {

                    this.mino_x += SRS_TABLE_RIGHT[this.mino.rotation][i].x;
                    this.mino_y += SRS_TABLE_RIGHT[this.mino.rotation][i].y;
                    this.mino.rotate(1);
                    this.mino_rockdown_timer = 0;
                    break;
                }
            }
        }
        if (this.check_t_spin()) {
            this.sound_t_rotate.pause();
            this.sound_t_rotate.currentTime = 0;
            this.sound_t_rotate.play();
        } else {
            this.sound_perc.pause();
            this.sound_perc.currentTime = 0;
            this.sound_perc.play();
        }
    }
    mino_rotate_left() {
        if (this.mino.mino_id == 6) {
            for (let i = 0; i < 5; i++) {
                if (this.is_mino_can_move_to(
                    SRS_TABLE_I_LEFT[this.mino.rotation][i].y,
                    SRS_TABLE_I_LEFT[this.mino.rotation][i].x, -1)) {

                    this.mino_x += SRS_TABLE_I_LEFT[this.mino.rotation][i].x;
                    this.mino_y += SRS_TABLE_I_LEFT[this.mino.rotation][i].y;
                    this.mino.rotate(-1);
                    this.mino_rockdown_timer = 0;
                    break;
                }
            }
        } else {
            for (let i = 0; i < 5; i++) {
                if (this.is_mino_can_move_to(
                    SRS_TABLE_LEFT[this.mino.rotation][i].y,
                    SRS_TABLE_LEFT[this.mino.rotation][i].x, -1)) {

                    this.mino_x += SRS_TABLE_LEFT[this.mino.rotation][i].x;
                    this.mino_y += SRS_TABLE_LEFT[this.mino.rotation][i].y;
                    this.mino.rotate(-1);
                    this.mino_rockdown_timer = 0;
                    break;
                }
            }
        }
        if (this.check_t_spin()) {
            this.sound_t_rotate.pause();
            this.sound_t_rotate.currentTime = 0;
            this.sound_t_rotate.play();
        } else {
            this.sound_perc.pause();
            this.sound_perc.currentTime = 0;
            this.sound_perc.play();
        }
    }
    on_update() {
        this.input_controller.on_update(game);

        // ミノの自然落下
        if (this.is_mino_can_move_to(1, 0, 0)) {
            if (this.mino_fall_timer_max <= this.mino_fall_timer) {
                this.mino_fall_timer = 0;

                this.mino_y += 1;

                this.is_t_spin = false;
                this.is_t_spin_mini = false;
            } else {
                this.mino_fall_timer += 1;
            }
        } else {
            // ミノが地面にぶつかったら固定
            if (this.mino_rockdown_timer_max < this.mino_rockdown_timer) {
                this.lockdown_mino();
            } else {
                this.mino_rockdown_timer += 1;
            }
        }
        // ミノの操作
        if (this.input_controller.get_down_right()) {
            if (this.das_charge_right == 0 || 5 <= this.das_charge_right) {
                if (this.is_mino_can_move_to(0, 1, 0)) {
                    this.mino_x += 1;
                    this.mino_rockdown_timer = 0;

                    this.sound_perc2.pause();
                    this.sound_perc2.currentTime = 0;
                    this.sound_perc2.play();
                }
            }
            this.das_charge_right += 1;

        } else {
            this.das_charge_right = 0;
        }
        if (this.input_controller.get_down_left()) {
            if (this.das_charge_left == 0 || 5 <= this.das_charge_left) {
                if (this.is_mino_can_move_to(0, -1, 0)) {
                    this.mino_x -= 1;
                    this.mino_rockdown_timer = 0;

                    this.sound_perc2.pause();
                    this.sound_perc2.currentTime = 0;
                    this.sound_perc2.play();
                }
            }
            this.das_charge_left += 1;
        } else {
            this.das_charge_left = 0;
        }
        if (this.input_controller.get_press_up()) {
            let mino_y_drop_to = this.calc_y_to_harddrop();

            if (mino_y_drop_to != this.mino_y) {
                // ミノが落下したらTスピン判定を消す
                this.is_t_spin = false;
                this.is_t_spin_mini = false;
            }

            this.mino_y = mino_y_drop_to;
            this.lockdown_mino();
        }
        if (this.input_controller.get_down_down()) {
            this.mino_fall_timer = this.mino_fall_timer_max;
        }
        if (this.input_controller.get_press_rotate_right() || this.input_controller.get_press_space() ||
            this.input_controller.get_press_enter()) {
            this.mino_rotate_right();
        }
        if (this.input_controller.get_press_rotate_left()) {
            this.mino_rotate_left();
        }
        if (this.input_controller.get_press_mino_hold() || this.input_controller.get_press_tab()) {
            // ホールド
            if (this.is_hold_active) {
                this.is_hold_active = false;
                this.mino.rotation = 0;
                if (this.hold_mino != null) {
                    let tmp = this.hold_mino;
                    this.hold_mino = this.mino;
                    this.mino = tmp;
                    this.mino_x = 3;
                    this.mino_y = 0;
                    this.mino_rockdown_timer = 0;
                    this.is_t_spin = false;
                    this.is_t_spin_mini = false;
                } else {
                    this.hold_mino = this.mino;
                    this.spawn_next_mino();
                }
                this.sound_perc.pause();
                this.sound_perc.currentTime = 0;
                this.sound_perc.play();
            }
        }

        // 画面の更新
        // すべてのフィールドからミノ色のクラスを取り除く
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            for (let x = 0; x < FIELD_WIDTH; x++) {
                this.field_cell_div[y][x].classList.remove(...this.CELL_COLOR_CLASS_LIST);
            }
        }

        // ミノの影を表示
        let y_to_harddrop = this.calc_y_to_harddrop();
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.mino.get_cell(y, x)) {
                    this.field_cell_div[y_to_harddrop + y][this.mino_x + x].classList.add(
                        MINO_ID_TO_SHADOW_CLASS_NAME[this.mino.mino_id]
                    );
                }
            }
        }

        // 操作中のミノの描画
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.mino.get_cell(y, x)) {
                    this.field_cell_div[this.mino_y + y][this.mino_x + x].classList.add(
                        MINO_ID_TO_CLASS_NAME[this.mino.mino_id]
                    );
                }
            }
        }

        // 地形の描画
        for (let y = 0; y < FIELD_HEIGHT; y++) {
            for (let x = 0; x < FIELD_WIDTH; x++) {
                if (1 <= this.field[y][x]) {
                    this.field_cell_div[y][x].classList.add(MINO_ID_TO_CLASS_NAME[this.field[y][x]]);
                }
            }
        }

        // ネクストの描画
        for (let i = 0; i < this.next_queue.length; i++) {
            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    this.next_cell_div[y + i * 3 + 1][x].classList.remove(...this.CELL_COLOR_CLASS_LIST);
                    if (this.next_queue[i].get_cell(y, x)) {
                        this.next_cell_div[y + i * 3 + 1][x].classList.add(
                            MINO_ID_TO_CLASS_NAME[this.next_queue[i].mino_id]);
                    }
                }
            }
        }
        // ホールドの描画
        if (this.hold_mino != null) {
            for (let y = 0; y < 3; y++) {
                for (let x = 0; x < 4; x++) {
                    this.hold_cell_div[y + 1][x].classList.remove(...this.CELL_COLOR_CLASS_LIST);
                    if (this.hold_mino.get_cell(y, x)) {
                        this.hold_cell_div[y + 1][x].classList.add(
                            MINO_ID_TO_CLASS_NAME[this.hold_mino.mino_id]);
                    }
                }
            }
        }
    }

}
