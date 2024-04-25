(function(){

    
    var place_list = {}
    var checkbox_list = [];
    var place_result_list = {};

    let place_to_assignable_worker_list = {}

    loading_dictionary = function( url ){
    }


    window.onload = function(){
        console.log("onload!");

        // ローカルストレージから読み込み
        let worker_data_json_string = localStorage.getItem("worker_data_json");
        let worker_json;
        console.log( worker_data_json_string );
        if( worker_data_json_string ){
            try {
                worker_json = JSON.parse(worker_data_json_string);
            } catch ( error ) {
                document.getElementById("error_message").textContent = "読み込みエラー: " + error;
                return;
            }
        } else {
            document.getElementById("error_message").textContent = "従業員データがありません。従業員情報の変更の画面から入力またはファイル読み込みしてください。";
            return;
        }

        worker_json.forEach(element => {
            // ワーカーリストUIをつくる
            let worker_list = document.getElementById("worker_list");
            let new_list_item = document.createElement("li");
            let new_check_box = document.createElement("input")
            new_check_box.type = "checkbox";
            new_check_box.id = element.名前;
            let new_label = document.createElement("label");
            new_label.textContent = element.名前;
            new_label.htmlFor = new_check_box.id;
            
            // チェックボックスにワーカー情報を関連づける
            new_check_box.worker = element;
            // チェックボックスをリストに追加
            checkbox_list.push( new_check_box )

            new_list_item.appendChild(new_check_box);
            new_list_item.appendChild(new_label);
            
            worker_list.appendChild(new_list_item);              
        });

        let worker_list = document.getElementById("worker_list");

        // 誤クリック防止の空項目
        worker_list.appendChild(document.createElement("li"));
        // 全チェックボタン
        let new_list_item = document.createElement("li");
        let new_check_box = document.createElement("input")
        new_check_box.type = "checkbox";
        new_check_box.id = "all_check";
        let new_label = document.createElement("label");
        new_label.textContent = "-- 全員 --";
        new_label.htmlFor = new_check_box.id;
        
        // チェックボックスをクリックしたときの動作
        new_check_box.onchange = function(){
            //console.log("onchange!");
            for (const checkbox of checkbox_list) {
                checkbox.checked = new_check_box.checked;
            }
        }

        new_list_item.appendChild(new_check_box);
        new_list_item.appendChild(new_label);
        
        worker_list.appendChild(new_list_item);     

        // 最初のワーカー要素から場所のリストを作る
        place_list =  Object.keys( worker_json[0] ).slice(1);
        place_list.forEach(element => {
             let place_table = document.getElementById("place_table");
             let new_tr = document.createElement("tr");
             let new_th = document.createElement("th");

             let new_span = document.createElement("span");
             new_span.textContent = element + ": ";
             new_th.appendChild(new_span);
             new_tr.appendChild( new_th );

             let new_td = document.createElement("td");
             let result_div = document.createElement("div");
             new_td.appendChild(result_div);
             new_tr.appendChild(new_td);

             // 場所リストを保持しておく
             place_result_list[ element ] = result_div;
             // 場所リストに場所の名前を記録しておく
             result_div.place_name = element;

             place_table.appendChild(new_tr);              
         });

        // 場所名から担当可能な従業員を引ける連想配列をつくる
        place_list.forEach(place => {
            let assigned_worker_list = [];
            worker_json.forEach(worker => {
                for (const key in worker) {
                    if( key == "名前" ){
                        continue;
                    }
                    if( key == place ){
                        assigned_worker_list.push( worker.名前 );
                    }
                }
            });
            place_to_assignable_worker_list[ place ] = assigned_worker_list;
        });
        console.log(place_to_assignable_worker_list);

    }

    clear_results = function(){
        for (const key in place_result_list) {
            place_result_list[key].textContent = "";
        }
        document.getElementById("error_message").textContent = "";
    }

    // 探索中断用の変数
    let call_counter;
    let best_table;
    let best_table_empty_place;
    let best_table_pending;

    recurse_search = function( shift_table, worker_list, pending_worker_list, worker_in_place_limit ){
        if( 10000 < call_counter++ ){
            // 降参する
            console.log("count over!");
            return false;
        }
        
        if( worker_list.length <= 0 ){
            // ワーカーリストを全部読んだ
            // 全場所に1人ずつ以上いるか確認
            let empty_place_count = 0;
            for(const key in shift_table ){
                if( shift_table[ key ].length === 0 ){
                    // 0人の地区を数える
                    empty_place_count += 1;
                }
            }
            // テーブルスコア 未割当の人数、未配置の場所の数から算出
            if( pending_worker_list.length * 1000 + empty_place_count <
                best_table_pending.length * 1000 + best_table_empty_place){
                // 中断時の結果用に最善のシフト表とその追加情報をとっておく
                best_table = shift_table;
                best_table_empty_place = empty_place_count;
                best_table_pending = pending_worker_list;
            }
            // 0人の地区が1つ以上ある場合は却下
            if( 0 < empty_place_count){
                return false;
            }
            // 全地区に担当者が一人以上割り当てられている
            // 未割当のワーカーがもういないなら、完成したシフト表を返す
            if( pending_worker_list.length == 0 ){
                return shift_table;
            }
            // 未割当のワーカーがいれば、上限人数を増やして再帰探索する
            // ワーカーリストを未割当リストをに変え、未割当リストは空にする
            return recurse_search( shift_table, pending_worker_list, [], worker_in_place_limit + 1 );
        }

        //console.log( shift_table );
        
        let copy_worker_list = JSON.parse(JSON.stringify( worker_list ));
        let worker = copy_worker_list.shift();
        // 担当できる地区から探す
        for (const key in worker) {
            if( key === "名前"){
                continue;
            }

            // 担当できる地区が今の上限人数より少なければ、自分をそこに追加して再帰する
            if( worker[key] == 1 && shift_table[key].length < worker_in_place_limit ){

                let copy_shift_table = JSON.parse(JSON.stringify( shift_table ));
                copy_shift_table[key].push( worker );

                let ret = recurse_search( copy_shift_table, copy_worker_list, pending_worker_list, worker_in_place_limit );
                if( ret ){
                    return ret;
                }
            }
        }
        // 自分が配置されなかったパターンを再帰探索する
        let copy_shift_table = JSON.parse(JSON.stringify( shift_table ));
        let copy_pending_worker_list = JSON.parse(JSON.stringify( pending_worker_list ));
        copy_pending_worker_list.push( worker );
        let ret = recurse_search( copy_shift_table, copy_worker_list, copy_pending_worker_list, worker_in_place_limit );
        if( ret ){
            return ret;
        }

        return false;
    }

    let selected_to_swap_worker;
    let assigned_worker_list;
    
    document.getElementById("enter_button").onclick = function(){
        console.log("click!")

        selected_to_swap_worker = null;
        assigned_worker_list = [];
        clear_results();

        let shift_table = {};
        place_list.forEach(element => {
            shift_table[ element ] = [];
        });

        let worker_list = [];
        for (const cbox of checkbox_list) {
            if( cbox.checked ){
                worker_list.push(cbox.worker);
            }
        }

        // ワーカーリストを、担当地区が少ない順にソートする
        worker_list.sort( function( a, b ){
            return Object.keys( a ).length - Object.keys( b ).length;
        });
        //console.log(worker_list);
        
        // 探索中断用の変数
        call_counter = 0;
        best_table = shift_table;
        best_table_empty_place = 999;
        best_table_pending = worker_list;
        
        let pending_worker_list = [];
        let completed_table = recurse_search( shift_table, worker_list, pending_worker_list, 1 );

        console.log( completed_table );
        console.log( call_counter );

        if( completed_table ){
            // 完璧な結果が見つかったとき
            document.getElementById("error_message").innerHTML = "";
        } else {
            // 完璧な結果が見つからなかったとき
            completed_table = best_table;

            let error_html = "";
            error_html += "有効な組み合わせが見つかりませんでした。<br />";
            if( 0 < best_table_pending.length ){
                error_html += "以下の従業員が未割当です: <br />";
            }

            for (const worker of best_table_pending) {
                error_html += "・" + (worker.名前) + "<br />";
            }
            document.getElementById("error_message").innerHTML = error_html;
        }

        make_assigned_worker_div = function( worker , place_name ){


            let new_div = document.createElement("div");
            let new_button = document.createElement("button");
            new_button.textContent = "＠";   
            new_button.onclick = function(){

                if( selected_to_swap_worker ) {
                    if( new_div.classList.contains("highlight_worker") ){
                        // ハイライトされている場合、入替を発生させる
                        let distination_parent = selected_to_swap_worker.parentNode;
                        new_div.parentNode.appendChild( selected_to_swap_worker );
                        distination_parent.appendChild( new_div );
                    }
                    // 選択従業員を解除する処理
                    selected_to_swap_worker = null;
                    for( other_worker of assigned_worker_list){
                        other_worker.classList.remove("highlight_worker");
                    }
                } else {
                    // 従業員を選択し、入替可能な従業員をハイライトする
                    selected_to_swap_worker = new_div;

                    for( other_worker of assigned_worker_list){
                        if( 0 <= place_to_assignable_worker_list[ new_div.parentNode.place_name ]
                            .indexOf(other_worker.worker_name) || other_worker.worker_name == "--"){
                                // 行先にいる人が、選択した場所に来れる
                                // もしくはカラ
                                if( new_div.worker_info[ other_worker.parentNode.place_name ] ){
                                    // 選択した従業員が、行先にいける
                                    if( other_worker.worker_name != new_div.worker_name || other_worker == new_div){
                                        // 名前が違う
                                        other_worker.classList.add("highlight_worker");
                                    }
                                }
                            }
                    }
                }
            };

            new_div.appendChild( new_button );
            let new_span = document.createElement("span");
            new_span.textContent = worker.名前;
            new_div.appendChild( new_span );

            // divに名前を記録しておく
            new_div.worker_name = worker.名前;
            new_div.worker_info = worker;

            assigned_worker_list.push( new_div );
            place_result_list[ place_name ].appendChild( new_div );

        }

        for ( const place_name in completed_table ) {
            if( completed_table[ place_name ].length == 0 ){
                // let new_div = document.createElement("div");
                // let new_button = document.createElement("button");
                // new_button.textContent = "＠";
                // new_div.appendChild( new_button );
                // let new_span = document.createElement("span");
                // new_span.textContent = "--";
                // new_div.appendChild( new_span );
    
                // place_result_list[ place_name ].appendChild( new_div );

                //
                let empty_worker;
                empty_worker = {};
                empty_worker.名前 = "--";
                for (const place_name of place_list) {
                    empty_worker[ place_name ] = 1;
                }

                make_assigned_worker_div( empty_worker , place_name);
            }
            for (const worker of completed_table[ place_name ]) {
                
                make_assigned_worker_div( worker , place_name);
            }

        }

    }

    document.getElementById("checkbox_hide_place_name").onchange = function(){
        let checked = document.getElementById("checkbox_hide_place_name").checked;
        // console.log( checked );
        
        for (let table_header of document.getElementsByTagName("th")) {
            table_header.hidden = checked;
        }
    }
})();
