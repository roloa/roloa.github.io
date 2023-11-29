(function(){

    
    var place_list = [
        "東エリア","西エリア","南エリア","北エリア"
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
            delete_worker_div( new_worker_div );
        };
        new_worker_div.appendChild(worker_delete_button);   

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
    
    document.getElementById("download_button").onclick = function(){

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
        json_string = "window.worker_json = " + json_string;
        console.log( json_string );
        // jsonをダウンロードさせる
        let blob = new Blob([ json_string ], {type: 'text/plain'});
        let link = document.createElement('a');
        link.download = '従業員リスト.js';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
    };

    let import_file = function( result ){
        //console.log(reader.result);

        // 従業員リストをクリアしておく
        let worker_list = document.getElementById("worker_list_container")
        while( worker_list.firstChild ){
            worker_list.removeChild( worker_list.firstChild );
        } 

        let header = "window.worker_json =";
        let startindex = result.indexOf( header ) + header.length;
        let json_string = result.substring(startindex);
        let json_object = null;
        try {
            json_object = JSON.parse(json_string);
        } catch ( error ) {
            document.getElementById("error_message").textContent = "ファイル読み込みエラー: " + error;
            return;
        }

        for (const worker_obj of json_object) {
            add_worker_div( worker_obj );
        }
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

})();
