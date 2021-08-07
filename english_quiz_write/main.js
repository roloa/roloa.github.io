(function(){

    var game = (function(){

        var new_quiz_button = document.getElementById("button_new_quiz")
        var answer_confirm_button = document.getElementById("button_answer_confirm")
        var quiz_display_jp = document.getElementById('quiz_jp')
        var quiz_display_en = document.getElementById('quiz_en')
        var quiz_display_description = document.getElementById('quiz_description')

        var quiz_dictionary = null
        var current_quiz = null

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
            loading_dictionary('https://roloa.github.io/english_quiz/easy.json')
            document.getElementById('difficulty_easy').style["background-color"] = '#FFC'
            document.getElementById('difficulty_normal').style["background-color"] = null
            document.getElementById('difficulty_hard').style["background-color"] = null
        }
        document.getElementById('difficulty_normal').onclick = function(){
            loading_dictionary('https://roloa.github.io/english_quiz/normal.json')
            document.getElementById('difficulty_easy').style["background-color"] = null
            document.getElementById('difficulty_normal').style["background-color"] = '#FFC'
            document.getElementById('difficulty_hard').style["background-color"] = null
        }
        document.getElementById('difficulty_hard').onclick = function(){
            loading_dictionary('https://roloa.github.io/english_quiz/hard.json')
            document.getElementById('difficulty_easy').style["background-color"] = null
            document.getElementById('difficulty_normal').style["background-color"] = null
            document.getElementById('difficulty_hard').style["background-color"] = '#FFC'
        }
        // ノーマルボタンを押しておく
        document.getElementById('difficulty_normal').onclick()

        // 出題ボタン
        document.getElementById('button_new_quiz').onclick = function(){
            current_quiz = quiz_dictionary[Math.floor( Math.random() * quiz_dictionary.length )]

            quiz_display_en.innerHTML = ""
            for(var count = 0 ; count < current_quiz['en'].length ; count++ ){
                quiz_display_en.innerHTML += "<button class='quiz_en'>" +
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
            quiz_display_en.innerHTML = "";

            for(var count = 0 ; count < current_quiz['en'].length ; count++ ){
                quiz_display_en.innerHTML += "<button class='quiz_en'>" +
                current_quiz['en'][count] +
                "</button>"
            }

        }
    })();
})();
