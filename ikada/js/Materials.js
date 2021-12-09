

export class Materials {

    constructor( game ){

        this.list = [];

        this.name_list = [];
        this.name_list[ 'wood' ] = '木材';
        this.name_list[ 'metal' ] = '金属';
        this.name_list[ 'cloth' ] = '布切れ';
        this.name_list[ 'mech_parts' ] = '機械部品';
        this.name_list[ '' ] = '';

        for( let material_id in this.name_list ){
            this.list[ material_id ] = 100;
        }
    }

    put_material( material_id , count ){
        this.list[ material_id ] += count;
    }

}
