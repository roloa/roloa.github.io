(function(){

    
    var place_list = {}
    var checkbox_list = [];
    var place_result_list = {};

    let place_to_assignable_worker_list = {}

    let worker_name_in_sheet_list = [];
    let place_name_in_sheet_list = [];
    let is_display_place_name_mode = false;

    loading_dictionary = function( url ){
    }


    window.onload = function(){
        console.log("onload!");

        // ローカルストレージから読み込み
        let worker_data_json_string = localStorage.getItem("worker_data_json");
        let worker_json;
        try {
            worker_json = JSON.parse(worker_data_json_string);
        } catch ( error ) {
            document.getElementById("error_message").textContent = "読み込みエラー: " + error;
            return;
        }


        // 最初のワーカー要素から場所の見出しを作る
        let place_table = document.getElementById("place_table");
        let new_tr = document.createElement("tr");
        let new_th = document.createElement("th");

        let new_span = document.createElement("span");
        new_span.textContent = "/";
        new_th.appendChild(new_span);
        new_tr.appendChild( new_th );

        place_list = Object.keys( worker_json[0] ).slice(1);
        place_list.forEach(place_name => {
             let new_th = document.createElement("th");

             let new_span = document.createElement("span");
             new_span.textContent = place_name;
             new_th.appendChild(new_span);
             new_tr.appendChild( new_th );

            //  let new_td = document.createElement("td");
            //  let result_div = document.createElement("div");
            //  new_td.appendChild(result_div);
            //  new_tr.appendChild(new_td);



         });
         place_table.appendChild(new_tr);              

         worker_json.forEach(worker => {
            let new_tr = document.createElement("tr");
            let new_th = document.createElement("th");
    
            let new_span = document.createElement("span");
            new_span.textContent = worker.名前;
            new_th.appendChild(new_span);
            new_tr.appendChild( new_th );
    
            place_list.forEach(place_name => {
                let new_th = document.createElement("th");
                
                if( worker[place_name] ){
                    let new_span = document.createElement("span");
                    new_span.textContent = place_name;
                    place_name_in_sheet_list.push(new_span);
                    new_th.appendChild(new_span);

                    new_span = document.createElement("span");
                    new_span.textContent = worker.名前;
                    new_span.hidden = true;
                    worker_name_in_sheet_list.push(new_span);
                    new_th.appendChild(new_span);
                }
                
                new_tr.appendChild( new_th );
    
                //  let new_td = document.createElement("td");
                //  let result_div = document.createElement("div");
                //  new_td.appendChild(result_div);
                //  new_tr.appendChild(new_td);
    
    
    
             });
             place_table.appendChild(new_tr);
         });

    }

    document.getElementById("name_toggle_button").onclick = function(){

        is_display_place_name_mode = !is_display_place_name_mode;

        for (const span of place_name_in_sheet_list) {
            span.hidden = is_display_place_name_mode;
        }
        for (const span of worker_name_in_sheet_list) {
            span.hidden = !is_display_place_name_mode;
        }
    };


})();
