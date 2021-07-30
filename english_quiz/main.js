(function(){

    var quiz_dict = {}

    // 辞書ファイルの読み込み
    fetch('https://raw.githubusercontent.com/roloa/english_quiz/main/mydata.json')
      .then(response => response.json())
      .then(function(data){ quiz_dict = data; console.log('loaded!') } );

    document.getElementById('button_quiz').onclick = function(){
        // ボタンが押された時のイベント
        document.getElementById('en').innerHTML =
            quiz_dict[Math.floor( Math.random() * 100 )]['en']
            // デバッグ

}
})();
