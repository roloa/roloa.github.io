


export class DebugCommands extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    test_log(){
        this.game.log('debug command test!!')
    }
}
