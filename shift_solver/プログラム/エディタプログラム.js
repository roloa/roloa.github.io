(function(){

    
    var place_list = [
        "ウォッチ1F",
        "ウォッチ2・3F",
        "シフゾウ",
        "正門",
        "うさぎ",
        "さくら",
        "飛び地",
        "平原",
        "サバンナキッチン",
        "はやし",
        "ライオンバス",
        "ライオンカフェ",
        "チンパンジー",
        "ワラビー・コアラ館",
        "コアラ下",
        "昆虫館",
        "生態園",
    ]
    var checkbox_list = [];
    var place_result_list = {};

    let delete_worker_div = function( worker_div ){
        document.getElementById("worker_list_container").removeChild( worker_div );
    }

    let add_place_selector = function( place_list_container , selected_value ){
        let place_container = document.createElement("div");

        let place_selector = document.createElement("select");
        for( place of place_list ){
            let new_option = document.createElement("option");
            new_option.value = place;
            new_option.textContent = place;
            if( selected_value != null ){
                if( selected_value == place){
                    new_option.selected = true;
                }
            }
            place_selector.appendChild(new_option);
        }
        place_container.place_selector = place_selector;
        place_container.appendChild(place_selector);

        let place_delete_button = document.createElement("button");
        place_delete_button.textContent = "削除";
        place_delete_button.onclick = function(){
            place_list_container.removeChild( place_container );
        }
        place_container.appendChild(place_delete_button);

        place_list_container.appendChild(place_container);
    }

    let add_worker_div = function( worker_obj ){

        let new_worker_div = document.createElement("div");
        new_worker_div.classList.add("worker_div")

        let worker_name = document.createElement("input")
        worker_name.type = "text";
        worker_name.placeholder = "名前";
        if( worker_obj != null){
            worker_name.value = worker_obj.名前;
        }
        new_worker_div.appendChild(worker_name);
        new_worker_div.worker_name = worker_name;

        let worker_delete_button = document.createElement("button");
        worker_delete_button.textContent = "従業員を削除";
        worker_delete_button.onclick = function(){
            if( worker_delete_button.textContent == "本当に消す？" ){
                delete_worker_div( new_worker_div );
            }
            worker_delete_button.textContent = "本当に消す？";
        };
        worker_delete_button.onmouseleave = function(){
            worker_delete_button.textContent = "従業員を削除";
        };       
        new_worker_div.appendChild(worker_delete_button);

        let up_button = document.createElement("button");
        up_button.textContent = "↑";
        up_button.onclick = function(){
            //console.log( new_worker_div.previousElementSibling );
            if( new_worker_div.previousElementSibling ) {
                new_worker_div.previousElementSibling.before( new_worker_div );
            }
        };
        new_worker_div.appendChild(up_button);

        let down_button = document.createElement("button");
        down_button.textContent = "↓";
        down_button.onclick = function(){
            //console.log( new_worker_div.nextElementSibling );
            if( new_worker_div.nextElementSibling ){
                new_worker_div.nextElementSibling.after( new_worker_div );
            }
        };
        new_worker_div.appendChild(down_button);

        let place_list_container = document.createElement("div");
        new_worker_div.appendChild(place_list_container);   
        new_worker_div.place_list_container = place_list_container;

        let place_add_button = document.createElement("button");
        place_add_button.textContent = "エリア追加";
        place_add_button.onclick = function(){
            add_place_selector( place_list_container , null);
        };
        if( worker_obj != null ){
            for (const key in worker_obj) {
                if ( key != "名前" ) {
                    if( worker_obj[key] != 0 ){
                        add_place_selector( place_list_container , key);
                    }
                }
            }
        }

        new_worker_div.appendChild(place_add_button);   

        document.getElementById("worker_list_container").appendChild(new_worker_div);
    }

    window.onload = function(){
        console.log("onload!");
    }



    document.getElementById("add_worker_button").onclick = function(){
        console.log("click!");
        add_worker_div( null );
    };
    
    let gather_data_to_json = function(){
         // DOMからデータを集めてjsonにする
         let json_object = []

         for( worker_div of document.getElementById("worker_list_container").childNodes ){
             let worker_json = {};
             worker_json.名前 = worker_div.worker_name.value;
 
             if( worker_div == document.getElementById("worker_list_container").firstChild){
                 // 最初のノードだけ全場所を0でクリアしておく特殊処理
                 for( place of place_list){
                     worker_json[ place ] = 0;
                 }
             }
             
             
             for( place_container of worker_div.place_list_container.childNodes ){
                 worker_json[ place_container.place_selector.value ] = 1;
             }
             json_object.push(worker_json);
             
         }
 
         let json_string = JSON.stringify(json_object, null,  "  ");
         
         return json_string;
    };

    document.getElementById("save_button").onclick = function(){
        let json_string = gather_data_to_json();

        localStorage.setItem("worker_data_json", json_string );

        document.getElementById("save_message").textContent = "保存しました";
    };
    document.getElementById("save_button").onmouseleave = function(){
        document.getElementById("save_message").textContent = "　";
    };

    document.getElementById("download_button").onclick = function(){

        let json_string = gather_data_to_json();

        json_string = "window.worker_json = " + json_string;
        console.log( json_string );
        // jsonをダウンロードさせる
        let blob = new Blob([ json_string ], {type: 'text/plain'});
        let link = document.createElement('a');
        link.download = '従業員リスト.txt';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    };
    let import_json = function( json_string ){
        // 従業員リストをクリアしておく
        let worker_list = document.getElementById("worker_list_container")
        while( worker_list.firstChild ){
            worker_list.removeChild( worker_list.firstChild );
        } 
        let json_object = null;
        try {
            json_object = JSON.parse(json_string);
        } catch ( error ) {
            document.getElementById("error_message").textContent = "読み込みエラー: " + error;
            return;
        }

        for (const worker_obj of json_object) {
            add_worker_div( worker_obj );
        }
    }
    let import_file = function( result ){
        //console.log(reader.result);
        let header = "window.worker_json =";
        let startindex = result.indexOf( header ) + header.length;
        let json_string = result.substring(startindex);
        import_json( json_string );

        let json_string_regather = gather_data_to_json();
        localStorage.setItem("worker_data_json", json_string_regather );
    }

    // ファイルのドロップ
    document.getElementsByTagName('body')[0].ondrop = function( event ){

        event.preventDefault();

        let reader = new FileReader();
        reader.onload = function(){
            import_file( reader.result );
        };
        reader.readAsText( event.dataTransfer.items[0].getAsFile() );
    }
    document.getElementsByTagName('body')[0].ondragover = function( event ){
        event.preventDefault();
    }

    document.getElementById("file_import").onchange = function( event ){
        console.log("onchange!");
        if( event.target.files.length == 0 ){
            console.log("no file selected");
            return;
        }
        let reader = new FileReader();
        reader.onload = function(){
            import_file( reader.result );
        };
        reader.readAsText( event.target.files[0] );
    }

    // ローカルストレージから読み込み
    let localStorage_json = localStorage.getItem("worker_data_json");
    import_json( localStorage_json);
})();
