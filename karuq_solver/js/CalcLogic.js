
import { QuizState } from './QuizState.js';
import { PrimeFactory } from './PrimeFactory.js';

export class CalcLogic extends Object {
    constructor(app) {
        super(app);
        this.app = app;
        this.primeFactory = new PrimeFactory();
    }

    calculate(quiz_input) {
        return new Promise((resolve) => {

            let result = this.calculate_main(quiz_input);

            resolve(result);
        })
    }

    calculate_main(quiz_input) {

        // 入力の例
        // 30; ;2:4, 3:2, 2 
        // おばけ; 炎の数字; ろうそくの数字:ろうそくの使用回数; マッチの本数

        // 入力の解釈
        let quiz_state_master = new QuizState(this.app);
        quiz_state_master.load_from_string(quiz_input);

        console.log(quiz_state_master);

        let quiz_state = structuredClone(quiz_state_master);

        let solved = this.search_for_candle_mash(quiz_state);
        console.log(solved);
        if (solved) {
            return "solved!!" + solved.solve_log;
        }
        return "can't solve..";
    }

    search_for_candle_mash(quiz_state) {
        // ろうそく連打による100を超える炎の合成について総当たりする。
        // ろうそく連打をした結果に対して、再帰する。
        // TODO

        // ろうそく連打の処理が終わったので、ろうそくのストックをすべて炎に変える。
        for (let candle_index = 1; candle_index <= 99; candle_index++) {
            quiz_state.fire_ary[candle_index] += quiz_state.candle_ary[candle_index];
            quiz_state.candle_ary[candle_index] = 0;
        }

        let solved = this.search_for_irreversible(quiz_state);
        if (solved) {
            return solved;
        }

        return false;
    }
    search_for_irreversible(quiz_state) {
        // 不可逆的な変更を加えた際の再帰する関数。

        quiz_state.solve_log += "Prime Factrization All. (全部素因数分解)\n"

        // 問題状態の可逆的な変更について総当たりする。
        // まず炎をすべて素因数分解する。
        this.primeFactory.fire_list_prime_factorization(quiz_state.fire_ary);

        // 問題が解けているかチェックする。
        let solved2 = this.check_quiz_solved(quiz_state);
        if (solved2) {
            return solved2;
        }

        // マッチの使用。
        if (1 <= quiz_state.match_count) {
            for (let i = 0; i <= 99; i++) {
                if (1 <= quiz_state.fire_ary[i]) {
                    let solved = this.use_match(quiz_state, i);
                    if (solved) {
                        return solved;
                    }
                }
            }
        }

        // 炎の合成について総当たりする。
        // 炎合成総当たり関数にいれる。
        let seen_number_list = this.new_seen_number_list();

        // 既知の数字リストの初期化。でも素数だけだからいらないかも？
        for (let i = 0; i <= 99; i++) {
            if (1 <= quiz_state.fire_ary[i]) {
                seen_number_list[i] = true;
            }
        }

        let solved = this.search_for_fire_combo(quiz_state, seen_number_list);
        if (solved) {
            return solved;
        }



        return false;
    }

    search_for_fire_combo(quiz_state, seen_number_list) {

        console.log(quiz_state);

        // 解けているかチェック
        let solved = this.check_quiz_solved(quiz_state);
        if (solved) {
             return solved;
        }

        // 一番小さい数字から順に掛けてみる
        for (let i = 2; i <= 99; i++) {
            if (2 <= quiz_state.fire_ary[i]) {
                // iの数字2つ
                let solved = this.next_search_fire_combo(quiz_state, i, i, seen_number_list);
                if (solved) {
                    return solved;
                }
            }
            if (1 <= quiz_state.fire_ary[i]) {
                for (let j = i + 1; j <= 99; j++) {
                    // 2つめの数字を探す
                    if (1 <= quiz_state.fire_ary[j]) {
                        // iとj
                        let solved = this.next_search_fire_combo(quiz_state, i, j, seen_number_list);
                        if (solved) {
                            return solved;
                        }
                    }
                }
            }
        }

        return false;
    }

    check_quiz_solved(quiz_state) {
        // 問題が解けているかをチェックする。

        if ( true || 100 <= quiz_state.ghost_ary[0]) {
            // 100以上のおばけ
            // 持っている数字の掛け算を全組み合わせ試してみる
            let solved = this.search_for_destroy_ghost(quiz_state, 1);
            if (solved) {
                return solved;
            }
        }
        else if (1 <= quiz_state.fire_ary[quiz_state.ghost_ary[0]]) {
            // 99以下の単体のおばけのみ対応
            // おばけと同じ数字の炎が1つ以上あれば解決
            return quiz_state;
        }
        return false;
    }

    search_for_destroy_ghost(quiz_state, current_multi) {
        // 持っている数字の掛け算を全組み合わせ試してみる
        for (let number = 0; number <= 99; number++) {
            for (let count = 1; count <= quiz_state.fire_ary[number]; count++) {

                let clone_qs = structuredClone(quiz_state);
                clone_qs.fire_ary[number] -= count;

                let multi = 1;
                for (let pow = 0; pow < count; pow++) {
                    multi *= number;
                    clone_qs.solve_log += number;
                    clone_qs.solve_log += "*";
                }

                if (current_multi * multi == quiz_state.ghost_ary[0]) {
                    clone_qs.solve_log += "=" + current_multi * multi;
                    return clone_qs;
                }

                let solved = this.search_for_destroy_ghost(clone_qs, current_multi * multi);
                if (solved) {
                    return solved;
                }

            }
        }
    }

    next_search_fire_combo(quiz_state, i, j, seen_number_list) {
        let new_number = i * j;
        if (100 <= new_number) {
            // 100を超えた場合

            let clone_qs = structuredClone(quiz_state);

            // 何をやったかログに書く
            clone_qs.solve_log += i + "*" + j + "=" + new_number + " -> " + (new_number % 100) + "\n";

            // 100以上をあまりで切り捨て
            new_number = new_number % 100;

            // 使った数字を減らして、新しい数字を増やす
            clone_qs.fire_ary[i] -= 1;
            clone_qs.fire_ary[j] -= 1;
            clone_qs.fire_ary[new_number] += 1;

            // 不可逆変更を行ったので不可逆変更再帰に行く
            let solved = this.search_for_irreversible(clone_qs, seen_number_list);
            if (solved) {
                return solved;
            }
        } else if (this.check_new_discover_number(new_number, seen_number_list)) {
            // 新しい数字を見つけたので、深い探索にかける
            let clone_qs = structuredClone(quiz_state);

            clone_qs.solve_log += i + "*" + j + "=" + new_number + "\n";

            // 使った数字を減らして、新しい数字を増やす
            clone_qs.fire_ary[i] -= 1;
            clone_qs.fire_ary[j] -= 1;
            clone_qs.fire_ary[new_number] += 1;
            let solved = this.search_for_fire_combo(clone_qs, seen_number_list);
            if (solved) {
                return solved;
            }

            if (1 <= quiz_state.match_count) {
                // 新しい数字に対してマッチの使用を試してみる
                let solved = this.use_match(clone_qs, new_number);
                if (solved) {
                    return solved;
                }
            }
        }

        return false;
    }
    use_match(quiz_state, target_number) {
        // マッチの使用
        let clone_qs = structuredClone(quiz_state);
        clone_qs.fire_ary[target_number] -= 1;
        if (target_number == 99) {
            // 100になった場合
            clone_qs.fire_ary[0] += 1;
        } else {
            clone_qs.fire_ary[target_number + 1] += 1;
        }
        clone_qs.match_count -= 1;
        clone_qs.solve_log += target_number + "->" + (target_number + 1) + "(Use Match マッチ使用) \n";
        let solved = this.search_for_irreversible(clone_qs);
        if (solved) {
            return solved;
        }
    }
    check_new_discover_number(new_number, seen_number_list) {
        if (seen_number_list[new_number]) {
            // 見たことのある数字
            return false;
        } else {
            // 見たことのない数字
            seen_number_list[new_number] = true;
            return true;
        }
    }
    new_seen_number_list() {
        return [
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false, false, false, false, false, false, false, false, false, false,
            false
        ]
    }
}