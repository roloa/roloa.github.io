
export class UI extends Object {
    constructor( app ){
        super( app );
        this.app = app;
    }

    start(){
       
        this.quiz_input = document.getElementById("quiz_input");

        this.quiz_input.value = "36; ;2:4, 3:2; 2";
        this.quiz_input.value = "29; ;2:7; 0";
        this.quiz_input.value = "49; ;9:5; 0";
        this.quiz_input.value = "77; ;2:10; 1";

        this.output_div = document.getElementById("output_div");
        this.output_div.innerText = "hogehoge!!";

        this.enter_button = document.getElementById("enter_button");
        this.enter_button.onclick = function(){
            this.on_enter_button();
        }.bind( this );
        
    }

    on_enter_button(){
        this.output_div.innerText = "click!";

        let promise = this.app.calcLogic.calculate( this.quiz_input.value );

        promise.then( (result) => {
            this.output_div.innerText = result;
        }, (failure_result) => {
            this.output_div.innerText = "エラー:" + failure_result;
            console.log( failure_result );
        });

    }
}