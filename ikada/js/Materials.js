

export class Materials {

    constructor( game ){

        this.list = {};

        this.name_list = [];
        this.name_list[ 'wood' ] = '木材';
        this.name_list[ 'metal' ] = '金属';
        this.name_list[ 'cloth' ] = '布切れ';
        this.name_list[ 'mech_parts' ] = '機械部品';
        this.name_list[ '' ] = '';

        for( let material_id in this.name_list ){
            this.list[ material_id ] = 20;
        }
    }
    get_material( material_id ){
        return this.list[ material_id ];
    }
    put_material( material_id , count ){
        this.list[ material_id ] += count;
    }
    take_material( material_id , count ){
        this.list[ material_id ] -= count;
    }

    load_data( materials_data ){
        this.list = materials_data.list;
    }
    save_data(){
        let materials_data = {};
        materials_data.list = this.list;

        return materials_data;
    }
}
