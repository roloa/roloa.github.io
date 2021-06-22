
(function(){


    function drawCube(disp, oku, dan, haba, quiz_size){
        // 0,0,0が一番左奥下
        // キャンバスは300
        // 問題サイズが5なら
        // キューブサイズ x 5 + キューブサイズ / 4 x 5 = 300
        cube_quoter = 0.33
        cube_size = (CANVAS_SIZE / quiz_size) * ( 1 - cube_quoter )

        // キューブの右、手前、下端の座標を計算する
        edge_x = (
            CANVAS_SIZE -
            (quiz_size - oku) * cube_size * cube_quoter -
            (haba) * cube_size
        )
        edge_y = (
            CANVAS_SIZE -
            (quiz_size - oku) * cube_size * cube_quoter -
            (dan) * cube_size
        )
        //
        disp.fillStyle = 'rgb(199,199,199)'; //塗りつぶしの色は赤
        //
        // disp2.beginPath();

        // 側面
        disp.beginPath()
        disp.lineWidth = 2
        disp.moveTo(edge_x - cube_size , edge_y );
        disp.lineTo(edge_x - cube_size * (1 + cube_quoter) , edge_y - cube_size * ( cube_quoter));
        disp.lineTo(edge_x - cube_size * (1 + cube_quoter) , edge_y - cube_size * (1+cube_quoter));
        disp.lineTo(edge_x - cube_size , edge_y - cube_size);
        disp.lineTo(edge_x - cube_size , edge_y );
        disp.fill();
        disp.stroke();
        // 天面
        disp.fillStyle = 'rgb(244,244,244)'; //塗りつぶしの色は赤
        disp.beginPath()
        disp.moveTo(edge_x , edge_y - cube_size );
        disp.lineTo(edge_x - cube_size , edge_y - cube_size);
        disp.lineTo(edge_x - cube_size * (1 + cube_quoter), edge_y - cube_size * (1 + cube_quoter));
        disp.lineTo(edge_x - cube_size * ( cube_quoter), edge_y - cube_size * (1 + cube_quoter));
        disp.lineTo(edge_x  , edge_y - cube_size);
        disp.fill();
        disp.stroke();
        // 手前面
        disp.fillStyle = 'rgb(222,222,222)'; //塗りつぶしの色は赤
        disp.beginPath()
        disp.moveTo(edge_x  , edge_y);
        disp.lineTo(edge_x - cube_size , edge_y);
        disp.lineTo(edge_x - cube_size , edge_y - cube_size);
        disp.lineTo(edge_x , edge_y - cube_size);
        disp.lineTo(edge_x  , edge_y);
        disp.fill();
        disp.stroke();


    }


    function canBeStack(stack, oku, dan, haba, size){

        // 高さ制限を超えていたら積めない
        if( size <= dan ){
            return false;
        }
        // 無限ループ防止用
        if( Math.random() < 0.001 ){
            console.log("fallback!!")
            return true;
        }

        // 既に積んであるなら積めない？
        //console.log(stack[oku][dan][haba])



        //後ろにブロックがないと積めない
        if(0 < oku && stack[oku-1][dan][haba] == false){
             return false;
        }
        // 横にブロックがないと積めない
        if(0 < haba && stack[oku][dan][haba-1] == false){
             return false;
        }
        return true;
    }

    function make_quiz(stack, sum, size){

        // 初期化
        for(oku = 0 ; oku < size ; oku++ ){
            stack[oku] = []
            for(dan = 0 ; dan < size ; dan++ ){
                stack[oku][dan] = []
                for(haba = 0 ; haba < size ; haba++ ){
                    stack[oku][dan][haba] = false
                }
            }
        }

        // 奥側2x2には必ず初期配置される
        stack[0][0][0] = true;
        stack[1][0][0] = true;
        stack[0][1][0] = true;
        stack[1][1][0] = true;
        stack[0][0][1] = true;
        stack[1][0][1] = true;
        stack[0][1][1] = true;
        stack[1][1][1] = true;

        // ランダムな奥と幅に、1段ずつ重ねていく
        for(let cnt=0 ; cnt < sum ; ){
            let oku = Math.floor( Math.random()  * quiz_size)
            let haba = Math.floor( Math.random()  * quiz_size)
            let dan = 0;
            while( dan < size && stack[oku][dan][haba] ){
                dan += 1
            }

            if(canBeStack(stack, oku, dan, haba, quiz_size)){
                stack[oku][dan][haba] = true;
                cnt += 1
                continue;
            }
        }

    }


    function redraw_cube(){
        // 画面クリア
        disp1.fillStyle = 'rgb(244,244,244)';
        disp1.beginPath();
        disp1.moveTo(1, 1);
        disp1.lineTo(1, CANVAS_SIZE-1);
        disp1.lineTo(CANVAS_SIZE-1, CANVAS_SIZE-1);
        disp1.lineTo(CANVAS_SIZE-1, 1);
        disp1.lineTo(1, 1);
        disp1.fill();
        disp1.stroke();

        disp2.fillStyle = 'rgb(244,244,244)';
        disp2.beginPath();
        disp2.moveTo(1, 1);
        disp2.lineTo(1, CANVAS_SIZE-1);
        disp2.lineTo(CANVAS_SIZE-1, CANVAS_SIZE-1);
        disp2.lineTo(CANVAS_SIZE-1, 1);
        disp2.lineTo(1, 1);
        disp2.fill();
        disp2.stroke();

        // キューブを描画順になめて
        for(oku = 0 ; oku < quiz_size ; oku++ ){
            for(dan = 0 ; dan < quiz_size ; dan++ ){
                for(haba = 0 ; haba < quiz_size ; haba++ ){
                    // キューブがあったら
                    if( stack1[oku][dan][haba] ){
                        // キューブを描画する
                        disp1.strokeStyle = 'rgb(200,0,0)'; //枠線の色は青

                        drawCube(disp1, oku, dan, haba, quiz_size)
                    }
                    if( stack2[oku][dan][haba] ){
                        // キューブを描画する
                        disp2.strokeStyle = 'rgb(0,0,200)'; //枠線の色は青
                        drawCube(disp2, oku, dan, haba, quiz_size)
                    }
                }
            }
        }
    }



    function pick_cube(stack){
        for(oku = quiz_size-1 ; 0 <= oku ; oku-- ){
            for(dan = quiz_size-1 ; 0 <= dan ; dan-- ){
                for(haba = quiz_size-1 ; 0 <= haba ; haba-- ){
                    if( stack[oku][dan][haba] ){
                        stack[oku][dan][haba] = false
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function counting_cube(){
        // キューブを逆順に消していく
        let picked1 = pick_cube(stack1)
        if( picked1 ){
            count_stack1 += 1;
            document.getElementById('count1').innerHTML = count_stack1
        }
        let picked2 = pick_cube(stack2)
        if( picked2 ){
            count_stack2 += 1;
            document.getElementById('count2').innerHTML = count_stack2
        }
        redraw_cube();
        count_speed *= 0.9
        if( picked1 || picked2){
            setTimeout( counting_cube, count_speed )
        } else {
            if(count_stack1 < count_stack2){
                document.getElementById('count2').innerHTML += " !!"
            } else {
                document.getElementById('count1').innerHTML += " !!"
            }
        }

    }

    function reset(){
        quiz_size = document.getElementById('size_input').value;
        document.getElementById('count1').innerHTML = "?"
        document.getElementById('count2').innerHTML = "?"
        //
        quiz_size = Number(quiz_size)
        stack1_sum = (quiz_size) * (quiz_size-1) * (quiz_size-2) + quiz_size
        stack1_sum = Math.floor( stack1_sum * (Math.random() * 0.1 + 0.3 ) )
        diff_num = Math.floor(2 + (quiz_size) * (Math.random()))
        stack2_sum = stack1_sum
        if(Math.random() < 0.5){
            stack2_sum += diff_num
        } else {
            stack2_sum -= diff_num
        }
        make_quiz( stack1, stack1_sum, quiz_size )
        initial_stack1 = stack1
        make_quiz( stack2, stack2_sum, quiz_size )
        //
        redraw_cube();
        count_stack1 = 0
        count_stack2 = 0

    }
    function judge(){
        count_speed = 200;
        setTimeout( counting_cube, count_speed )
    }
    //document.getElementById('hoge').innerHTML = 'hogehoges'

    // キャンバスは正方形
    CANVAS_SIZE = 300

    disp1 = document.getElementById('disp1').getContext('2d');
    disp2 = document.getElementById('disp2').getContext('2d');


    disp1.scale(-1,1);
    disp1.translate( -CANVAS_SIZE, 0);
    // stack[dan][oku][haba_from_left]

    stack1 = []
    stack2 = []
    initial_stack1 = null
    initial_stack2 = null

    quiz_size = 5
    // 問題作成

    // まず双方の個数を決める
    // 個数の差が少ないほど難しい問題
    // stack1_sum = (quiz_size) * (quiz_size-1) * (quiz_size-2) + quiz_size
    // stack1_sum = Math.floor( stack1_sum * (Math.random() * 0.1 + 0.3 ) )
    // stack2_sum = Math.floor(stack1_sum + quiz_size * Math.random() - 0.5)
    // if(stack1_sum == stack2_sum){
    //     stack2_sum += 1
    // }
    var stack1_sum = 10;
    var stack2_sum = 10;
    var count_stack1 = 0
    var count_stack2 = 0
    var count_speed = 1000;

    reset();



    document.getElementById('reset_button').onclick = reset;
    document.getElementById('judge_button').onclick = judge;
})();
