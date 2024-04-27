

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

        this.spawn_next_mino();

        this.score = 0;
        this.score_div = document.getElementById("score_text");
        this.clear_text_div = document.getElementById("clear_text");

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
    is_mino_can_move_to(move_by_y, move_by_x, rotate) {
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                if (this.mino.get_cell_with_rotate(y, x, rotate)) {
                    // ミノ内のそれぞれのブロックについて
                    let checking_x = this.mino_x + x + move_by_x;
                    let checking_y = this.mino_y + y + move_by_y;

                    if (checking_x < 0) {
                        return false;
                    }
                    if (FIELD_WIDTH <= checking_x) {
                        return false;
                    }
                    if (checking_y < 0) {
                        return false;
                    }
                    if (FIELD_HEIGHT <= checking_y) {
                        return false;
                    }
                    if (this.field[checking_y][checking_x]) {
                        // ブロックがあったら                        
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
        if (0 < cleared_line_count) {
            if (cleared_line_count == 1) {
                this.clear_text_div.innerText = "Single";
            } else if (cleared_line_count == 2) {
                this.clear_text_div.innerText = "Double";
            } else if (cleared_line_count == 3) {
                this.clear_text_div.innerText = "Triple";
            } else if (cleared_line_count == 4) {
                this.clear_text_div.innerText = "Quad";
            } else {
                this.clear_text_div.innerText = "Super!?";
            }
        }
    }
    spawn_next_mino() {
        this.mino_x = 3;
        this.mino_y = 0;
        this.mino_rockdown_timer = 0;

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

        this.clear_text_div.innerText = "";
        // ライン消去
        this.check_line_clear();
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
    }
    on_update() {
        this.input_controller.on_update(game);

        // ミノの自然落下
        if (this.is_mino_can_move_to(1, 0, 0)) {
            if (this.mino_fall_timer_max <= this.mino_fall_timer) {
                this.mino_fall_timer = 0;

                this.mino_y += 1;

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
                }
            }
            this.das_charge_left += 1;
        } else {
            this.das_charge_left = 0;
        }
        if (this.input_controller.get_press_up()) {
            this.mino_y = this.calc_y_to_harddrop();
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
                } else {
                    this.hold_mino = this.mino;
                    this.spawn_next_mino();
                }
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
