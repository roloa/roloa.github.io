(function(){

    var game = (function(){

        var new_quiz_button = document.getElementById("button_new_quiz")
        var answer_confirm_button = document.getElementById("button_answer_confirm")
        var quiz_display_jp = document.getElementById('quiz_jp')
        var quiz_display_en = document.getElementById('quiz_en')
        var quiz_display_description = document.getElementById('quiz_description')

        var quiz_dictionary = null
        var current_quiz = null
        var is_in_quiz = false;
        var quiz_correct_count = 0
        var quiz_count = 0

        var loading_dictionary = function( url ){
            // 辞書ファイルの読み込み
            fetch(url)
              .then(response => response.json())
              .then(function(data){
                  quiz_dictionary = data
                  console.log('loaded!')
                  document.getElementById("button_new_quiz").onclick()
            });
        }
        document.getElementById('difficulty_easy').onclick = function(){
            loading_dictionary('https://roloa.github.io/english_quiz_write/easy.json')
            document.getElementById('difficulty_easy').style["background-color"] = '#FFC'
            document.getElementById('difficulty_normal').style["background-color"] = null
            document.getElementById('difficulty_hard').style["background-color"] = null
        }
        document.getElementById('difficulty_normal').onclick = function(){
            loading_dictionary('https://roloa.github.io/english_quiz_write/normal.json')
            document.getElementById('difficulty_easy').style["background-color"] = null
            document.getElementById('difficulty_normal').style["background-color"] = '#FFC'
            document.getElementById('difficulty_hard').style["background-color"] = null
        }
        document.getElementById('difficulty_hard').onclick = function(){
            loading_dictionary('https://roloa.github.io/english_quiz_write/hard.json')
            document.getElementById('difficulty_easy').style["background-color"] = null
            document.getElementById('difficulty_normal').style["background-color"] = null
            document.getElementById('difficulty_hard').style["background-color"] = '#FFC'
        }
        // イージーボタンを押しておく
        document.getElementById('difficulty_easy').onclick()

        // 出題ボタン
        document.getElementById('button_new_quiz').onclick = function(){

            is_in_quiz = true
            input_answer = document.getElementById('answer').value = ''

            current_quiz = quiz_dictionary[Math.floor( Math.random() * quiz_dictionary.length )]

            quiz_display_en.innerHTML = ""
            for(var count = 0 ; count < current_quiz['en'].length ; count++ ){
                quiz_display_en.innerHTML += "<button id='quiz_en_button_"+ count +"' class='quiz_en'>" +
                "?" +
                "</button>"
            }
            quiz_display_en.innerHTML += "<span class='quiz_en'>" +
            " ("+ current_quiz['en'].length +")" +
            "</span>"

            quiz_display_jp.innerHTML = current_quiz['jp']
            quiz_display_description.innerHTML = current_quiz['description']
        }

        // 確定ボタン
        document.getElementById("button_confirm_answer").onclick = function(){


            var is_correct_answer = false

            var input_answer = document.getElementById('answer').value

            quiz_display_en.innerHTML = "";

            // 正答を比較する
            // 最初に正解に設定する
            is_correct_answer = true
            for(var count = 0 ; count < current_quiz['en'].length ; count++ ){
                if( current_quiz['en'].charAt( count ) == input_answer.charAt( count ) ){
                    quiz_display_en.innerHTML += "<button class='quiz_en quiz_en_correct'>" +
                    current_quiz['en'][count] +
                    "</button>"
                } else {
                    // 1文字でも違ったらアウトにする
                    is_correct_answer = false
                    quiz_display_en.innerHTML += "<button class='quiz_en quiz_en_incorrect'>" +
                    current_quiz['en'][count] +
                    "</button>"
                }
            }

            // 別解の一覧を出す
            quiz_display_description.innerHTML = "別解: "
            if( current_quiz['synonyms'].length == 0 ){
                quiz_display_description.innerHTML += "なし"
            } else {

                // 別解を探す
                for(var count = 0 ; count < current_quiz['synonyms'].length ; count++ ){
                    if( current_quiz['synonyms'][ count ] == input_answer ){
                        // 別解正解
                        is_correct_answer = true
                        quiz_display_description.innerHTML += "<span class='synonyms_item synonyms_item_correct'>" +
                        current_quiz['synonyms'][count] + ", " +
                        "</span>"
                        break;
                    }
                }


                for(var count = 0 ; count < current_quiz['synonyms'].length && count < 10; count++ ){
                    quiz_display_description.innerHTML += "<span class='synonyms_item'>" +
                    current_quiz['synonyms'][count] + ", " +
                    "</span>"
                }
                if( 10 < current_quiz['synonyms'].length ) {
                    quiz_display_description.innerHTML += "... 他 " +
                    (current_quiz['synonyms'].length - 10) +
                    " ."
                }
            }

            quiz_count += 1
            if( is_in_quiz ) {
                if( is_correct_answer ) {
                    quiz_correct_count += 1
                }
                var correct_rate = Math.round((quiz_correct_count / quiz_count) * 100 )
                document.getElementById('status_text').innerHTML = quiz_count + '問中' + quiz_correct_count + "問正解("+ correct_rate +"%)"
            }

            is_in_quiz = false

        }

        // エンターキー制御
        document.onkeypress = function(){
            if( window.event.keyCode == 13 ){
                if( is_in_quiz ) {
                    document.getElementById("button_confirm_answer").onclick()
                } else {
                    document.getElementById("button_new_quiz").onclick()
                }
            }
        }
    })();
})();
