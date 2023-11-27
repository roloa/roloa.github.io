(function(){

    var worker_json = {};
    var place_list = {}
    var checkbox_list = [];
    var place_result_list = {};

    loading_dictionary = function( url ){
    }


    window.onload = function(){
        console.log("onload!");

        // 辞書ファイルの読み込み
        fetch('normal.json')
        .then(response => response.json())
        .then(function(data){
            worker_json = data
            console.log('loaded!')

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
        
        // 最初のワーカー要素から場所のリストを作る
       place_list =  Object.keys( worker_json[0] ).slice(1);
       place_list.forEach(element => {
            let place_ul = document.getElementById("place_list");
            let new_list_item = document.createElement("li");
            let new_span = document.createElement("span");
            new_span.textContent = element + ": ";
            let new_span_result = document.createElement("span");
            new_span_result.textContent = "";

            //　場所リストを保持しておく
            place_result_list[ element ] = new_span_result ;

            new_list_item.appendChild(new_span);
            new_list_item.appendChild(new_span_result);
            
            place_ul.appendChild(new_list_item);              
        });
    

        });
    }

    clear_results = function(){
        for (const key in place_result_list) {
            place_result_list[key].textContent = "";
        }
        document.getElementById("error_message").textContent = "";
    }

    recurse_search = function( shift_table, worker_list, worker_index ){

        if( worker_list.length <= worker_index ){
            // ワーカーリストを全部読んだ
            // 全場所に1人ずつ以上いるか確認

            for(const key in shift_table ){
                if( shift_table[ key ].length === 0 ){
                    // 0人の場所があったらダメ
                    return false;
                }
            }
            // シフト表が完成していたらそれを返す
            return shift_table;
        }

        //console.log( shift_table );

        for (const key in worker_list[worker_index]) {
            if( key === "名前"){
                continue;
            }

            if( worker_list[worker_index][key] == 1 ){

                let copy_shift_table = JSON.parse(JSON.stringify( shift_table ));
                copy_shift_table[key].push( worker_list[worker_index] );

                let ret = recurse_search( copy_shift_table, worker_list, worker_index + 1 );
                if( ret == false ){
                    continue;
                } else {
                    return ret;
                }
            }

        }
        return false;
    }

    document.getElementById("enter_button").onclick = function(){
        console.log("click!")

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
        let ret_val = recurse_search( shift_table, worker_list, 0 );

        console.log(ret_val);

        if( ret_val == false ){
            document.getElementById("error_message").textContent = "有効な組み合わせが見つかりませんでした。";
        } else {

            for (const key in ret_val) {
                for (const worker of ret_val[ key ]) {
                    place_result_list[ key ].textContent += (worker.名前) + ", ";
                }
                
            }
        }
    }

})();
