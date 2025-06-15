
import {UI} from './UI.js';
import {CalcLogic} from './CalcLogic.js';


export class Template extends Object {
    constructor( app ){
        super( app );
        this.app = app;
    }
}

export class App {

    constructor(){
        this.name = 'KaruQ Solver';
        this.version = '0.1';

        this.ui = new UI( this );
        this.calcLogic = new CalcLogic( this );

    }

    start(){
        this.ui.start();
    }
    test(){
    }
    log( msg ){
        console.log( msg );
    }

}
