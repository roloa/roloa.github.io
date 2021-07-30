(function(){

    var quiz_dict = {}


    var answer_list = []
    answer_list[0] = null
    answer_list[1] = null
    answer_list[2] = null
    answer_list[3] = null

    var answer_display_list = []
    answer_display_list[0] = document.getElementById('answer1')
    answer_display_list[1] = document.getElementById('answer2')
    answer_display_list[2] = document.getElementById('answer3')
    answer_display_list[3] = document.getElementById('answer4')

    var explain_jp_list = []
    explain_jp_list[0] = document.getElementById('explain_jp_1')
    explain_jp_list[1] = document.getElementById('explain_jp_2')
    explain_jp_list[2] = document.getElementById('explain_jp_3')
    explain_jp_list[3] = document.getElementById('explain_jp_4')

    var explain_en_list = []
    explain_en_list[0] = document.getElementById('explain_en_1')
    explain_en_list[1] = document.getElementById('explain_en_2')
    explain_en_list[2] = document.getElementById('explain_en_3')
    explain_en_list[3] = document.getElementById('explain_en_4')

    var explain_description_list = []
    explain_description_list[0] = document.getElementById('explain_description_1')
    explain_description_list[1] = document.getElementById('explain_description_2')
    explain_description_list[2] = document.getElementById('explain_description_3')
    explain_description_list[3] = document.getElementById('explain_description_4')

    var correct_answer_index = 0


    loading_dictionary = function( url ){
        // 辞書ファイルの読み込み
        fetch(url)
          .then(response => response.json())
          .then(function(data){
              quiz_dict = data
              console.log('loaded!')
              document.getElementById('button_quiz').onclick()
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

    check_similar_word = function( word1, word2 ){
        if( Math.random() < 0.000001 ){
            // 確率で無条件
            return true
        }
        if( word1.substr(2) == word2.substr(2) ){
            return true
        }
        if( word1.substr(-2) == word2.substr(-2) ){
            return true
        }
        if( Math.random() < 0.99 ){
            return false
        }
        if( word1.substr(-1) == word2.substr(-1) ){
            return true
        }
        if( Math.random() < 0.9999 ){
            return false
        }
        if( word1.charAt(0) == word2.charAt(0) ){
            return true
        }
        return false
    }

    document.getElementById('button_quiz').onclick = function(){
        // ボタンが押された時のイベント

        answer_display_list[0].style["background-color"] = null
        answer_display_list[1].style["background-color"] = null
        answer_display_list[2].style["background-color"] = null
        answer_display_list[3].style["background-color"] = null
        explain_description_list[0].innerHTML = ''
        explain_description_list[1].innerHTML = ''
        explain_description_list[2].innerHTML = ''
        explain_description_list[3].innerHTML = ''
        explain_en_list[0].innerHTML = ''
        explain_en_list[1].innerHTML = ''
        explain_en_list[2].innerHTML = ''
        explain_en_list[3].innerHTML = ''
        explain_jp_list[0].innerHTML = ''
        explain_jp_list[1].innerHTML = ''
        explain_jp_list[2].innerHTML = ''
        explain_jp_list[3].innerHTML = ''
        document.getElementById('quiz_description').innerHTML = ''

        correct_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]

        document.getElementById('quiz_en').innerHTML = correct_answer['en']

        if( true ){
            console.log(correct_answer)

            var new_answer = null
            while(true){
                new_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]
                if( new_answer['en'] == correct_answer['en'] ){
                    continue;
                }
                if(check_similar_word( new_answer['en'], correct_answer['en'] )){
                    break;
                }
            }
            answer_display_list[0].innerHTML = new_answer['jp']
            answer_list[0] = new_answer
            console.log(new_answer)
            while(true){
                new_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]
                if( new_answer['en'] == correct_answer['en'] ||
                    new_answer['jp'] == answer_display_list[0].innerHTML ){
                    continue;
                }
                if(check_similar_word( new_answer['en'], correct_answer['en'] )){
                    break;
                }
            }
            answer_display_list[1].innerHTML = new_answer['jp']
            answer_list[1] = new_answer
            console.log(new_answer)
            while(true){
                new_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]
                if( new_answer['en'] == correct_answer['en'] ||
                    new_answer['jp'] == answer_display_list[0].innerHTML ||
                    new_answer['jp'] == answer_display_list[1].innerHTML ){
                    continue;
                }
                if(check_similar_word( new_answer['en'], correct_answer['en'] )){
                    break;
                }
            }
            answer_display_list[2].innerHTML = new_answer['jp']
            answer_list[2] = new_answer
            console.log(new_answer)
            while(true){
                new_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]
                if( new_answer['en'] == correct_answer['en'] ||
                    new_answer['jp'] == answer_display_list[0].innerHTML ||
                    new_answer['jp'] == answer_display_list[1].innerHTML ||
                    new_answer['jp'] == answer_display_list[2].innerHTML
                ){
                    continue;
                }
                if(check_similar_word( new_answer['en'], correct_answer['en'] )){
                    break;
                }
            }
            answer_display_list[3].innerHTML = new_answer['jp']
            answer_list[3] = new_answer
            console.log(new_answer)

        } else {
            answer_display_list[0].innerHTML = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]['jp']
            answer_display_list[1].innerHTML = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]['jp']
            answer_display_list[2].innerHTML = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]['jp']
            answer_display_list[3].innerHTML = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]['jp']
        }
        var correct_answer_index = Math.floor(Math.random() * 4);
        answer_display_list[correct_answer_index].innerHTML = correct_answer['jp']
        answer_list[correct_answer_index] = correct_answer

    var on_answer_button = function( answer_numbers ){
        answer_display_list[answer_numbers].style["background-color"] = '#FCC'
        answer_display_list[correct_answer_index].style["background-color"] = '#CFC'
        document.getElementById('quiz_description').innerHTML = correct_answer['description']

        explain_description_list[0].innerHTML = answer_list[0]['description']
        explain_description_list[1].innerHTML = answer_list[1]['description']
        explain_description_list[2].innerHTML = answer_list[2]['description']
        explain_description_list[3].innerHTML = answer_list[3]['description']
        explain_jp_list[0].innerHTML = answer_list[0]['jp']
        explain_jp_list[1].innerHTML = answer_list[1]['jp']
        explain_jp_list[2].innerHTML = answer_list[2]['jp']
        explain_jp_list[3].innerHTML = answer_list[3]['jp']
        explain_en_list[0].innerHTML = answer_list[0]['en']
        explain_en_list[1].innerHTML = answer_list[1]['en']
        explain_en_list[2].innerHTML = answer_list[2]['en']
        explain_en_list[3].innerHTML = answer_list[3]['en']
    }

    document.getElementById('answer1').onclick = function(){
        on_answer_button(0)
    }
    document.getElementById('answer2').onclick = function(){
        on_answer_button(1)
    }
    document.getElementById('answer3').onclick = function(){
        on_answer_button(2)
    }
    document.getElementById('answer4').onclick = function(){
        on_answer_button(3)
    }



}
})();
