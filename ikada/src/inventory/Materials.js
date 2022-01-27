
import {MaterialBalance} from './MaterialBalance.js';


export class Materials {

    constructor( game ){

        this.game = game;

        this.balance = new MaterialBalance( this.game );

        this.list = {};

        this.name_list = [];

        // 汎用素材
        this.name_list[ 'fuel' ] = '燃料';
        this.name_list[ 'leftover' ] = '残飯';

        // レベル0素材
        this.name_list[ 'wood' ] = '木';
        this.name_list[ 'stone' ] = '石';
        this.name_list[ 'cloth' ] = '布切れ';
        this.name_list[ 'iron' ] = '鉄クズ';
        this.name_list[ 'feather' ] = '鳥の羽根';
        this.name_list[ 'seed' ] = '種';
        this.name_list[ 'jar' ] = 'ビン';

        // レベル1素材
        this.name_list[ 'parts' ] = '機械部品';
        this.name_list[ 'circuit' ] = '電子回路';
        this.name_list[ 'lead' ] = '鉛';
        this.name_list[ 'plastic' ] = 'プラスチック';

        // レベル2素材
        this.name_list[ 'silver' ] = '銀の欠片';
        this.name_list[ 'fur' ] = '毛皮';

        // 暫定未使用
        this.name_list[ 'metal' ] = '金属';
        this.name_list[ 'bone' ] = '骨';
        this.name_list[ 'fin' ] = '魚のヒレ';
        // this.name_list[ '' ] = '';

        for( let material_id in this.name_list ){
            this.list[ material_id ] = 0;
        }
    }
    get_material( material_id ){
        return this.list[ material_id ];
    }
    get_material_name( material_id ){
        return this.name_list[ material_id ];
    }
    put_material( material_id , count ){
        this.list[ material_id ] += count;
        // this.game.log('マテリアルを入手:')
        this.game.log( this.get_material_name( material_id ) + ": +" +
        count + " (" + this.get_material( material_id ) + ")");
    }
    take_material( material_id , count ){
        this.list[ material_id ] -= count;
        // this.game.log('マテリアルを消費:')
        this.game.log( this.get_material_name( material_id ) + ": -" +
        count + " (" + this.get_material( material_id ) + ")");
    }

    load_data( materials_data ){
        this.list = materials_data.list;
    }
    save_data(){
        let materials_data = {};
        materials_data.list = this.list;

        return materials_data;
    }
    cheat(){
        for( let material_id in this.name_list ){
            this.list[ material_id ] = 999;
        }
    }
}
