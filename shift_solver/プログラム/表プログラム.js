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




})();
