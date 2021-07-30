(function(){

    var quiz_dict = {}

    var answer_display_list = []
    answer_display_list[0] = document.getElementById('answer1')
    answer_display_list[1] = document.getElementById('answer2')
    answer_display_list[2] = document.getElementById('answer3')
    answer_display_list[3] = document.getElementById('answer4')

    // 辞書ファイルの読み込み
    fetch('https://roloa.github.io/english_quiz/mydata.json')
      .then(response => response.json())
      .then(function(data){ quiz_dict = data; console.log('loaded!') } );

    document.getElementById('button_quiz').onclick = function(){
        // ボタンが押された時のイベント

        correct_answer = quiz_dict[Math.floor( Math.random() * 100 )]

        document.getElementById('quiz_en').innerHTML = correct_answer['en']

        answer_display_list[0].innerHTML = quiz_dict[Math.floor( Math.random() * 100 )]['jp']
        answer_display_list[1].innerHTML = quiz_dict[Math.floor( Math.random() * 100 )]['jp']
        answer_display_list[2].innerHTML = quiz_dict[Math.floor( Math.random() * 100 )]['jp']
        answer_display_list[3].innerHTML = quiz_dict[Math.floor( Math.random() * 100 )]['jp']

        var correct_answer_index = Math.floor(Math.random() * 4);
        answer_display_list[correct_answer_index].innerHTML = correct_answer['jp']

}
})();
