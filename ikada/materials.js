

export class Materials {

    constructor( game ){

        this.list = [];

        this.name_list = [];
        this.name_list[ 'wood' ] = '木材';
        this.name_list[ 'metal' ] = '金属';
        this.name_list[ 'cloth' ] = '布切れ';
        this.name_list[ 'mech_parts' ] = '機械部品';
        this.name_list[ '' ] = '';

        for( var i = 0 ; i < this.name_list ; i++ ){
            this.list[ this.name_list[ i ] ] = 0;
        }
    }

    put_material( name , count ){
        this.list[ 'name' ] += count;
    }

}
