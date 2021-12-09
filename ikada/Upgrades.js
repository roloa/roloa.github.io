


/*
    アップグレードの種類

    道具の性能アップ系

*/

export class Upgrades extends Object {


    constructor( game ){
        super( game );
        this.game = game;

        this.upgrades_list = [];
        this,setup();
    }

    setup(){

        this.upgrades_list = [];

        this.upgrades_list[ 'id' ] = null;


    }

}
