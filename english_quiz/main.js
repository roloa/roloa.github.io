(function(){

    var quiz_dict = {}

    var answer_display_list = []
    answer_display_list[0] = document.getElementById('answer1')
    answer_display_list[1] = document.getElementById('answer2')
    answer_display_list[2] = document.getElementById('answer3')
    answer_display_list[3] = document.getElementById('answer4')

    var correct_answer_index = 0

    // 辞書ファイルの読み込み
    fetch('https://roloa.github.io/english_quiz/mydata.json')
      .then(response => response.json())
      .then(function(data){ quiz_dict = data; console.log('loaded!') } );

    check_similar_word = function( word1, word2 ){
        if( Math.random() < 0.0001 ){
            // 確率で無条件
            return true
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
        document.getElementById('quiz_description').innerHTML = ''

        correct_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]

        document.getElementById('quiz_en').innerHTML = correct_answer['en']

        if( true ){
            console.log(correct_answer)

            var new_answer = null
            while(true){
                new_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]
                if(check_similar_word( new_answer['en'], correct_answer['en'] )){
                    break;
                }
            }
            answer_display_list[0].innerHTML = new_answer['jp']
            console.log(new_answer)
            while(true){
                new_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]
                if( new_answer['jp'] == answer_display_list[0].innerHTML ){
                    break;
                }
                if(check_similar_word( new_answer['en'], correct_answer['en'] )){
                    break;
                }
            }
            answer_display_list[1].innerHTML = new_answer['jp']
            console.log(new_answer)
            while(true){
                new_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]
                if( new_answer['jp'] == answer_display_list[0].innerHTML ||
                    new_answer['jp'] == answer_display_list[1].innerHTML ){
                    break;
                }
                if(check_similar_word( new_answer['en'], correct_answer['en'] )){
                    break;
                }
            }
            answer_display_list[2].innerHTML = new_answer['jp']
            console.log(new_answer)
            while(true){
                new_answer = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]
                if( new_answer['jp'] == answer_display_list[0].innerHTML ||
                    new_answer['jp'] == answer_display_list[1].innerHTML ||
                    new_answer['jp'] == answer_display_list[2].innerHTML
                ){
                    break;
                }
                if(check_similar_word( new_answer['en'], correct_answer['en'] )){
                    break;
                }
            }
            answer_display_list[3].innerHTML = new_answer['jp']
            console.log(new_answer)

        } else {
            answer_display_list[0].innerHTML = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]['jp']
            answer_display_list[1].innerHTML = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]['jp']
            answer_display_list[2].innerHTML = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]['jp']
            answer_display_list[3].innerHTML = quiz_dict[Math.floor( Math.random() * quiz_dict.length )]['jp']
        }
        var correct_answer_index = Math.floor(Math.random() * 4);
        answer_display_list[correct_answer_index].innerHTML = correct_answer['jp']

    var on_answer_button = function( answer_numbers ){
        answer_display_list[answer_numbers].style["background-color"] = '#FCC'
        answer_display_list[correct_answer_index].style["background-color"] = '#CFC'
        document.getElementById('quiz_description').innerHTML = correct_answer['description']

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
