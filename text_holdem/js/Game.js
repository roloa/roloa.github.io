

export class Template extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
}

export class Game extends Object  {


    constructor(){
        this.name = 'text_holdem';
        this.version = '0.1';

        this.game = this;

    }
}
