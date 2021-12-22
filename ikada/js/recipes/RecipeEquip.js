
import {EquipmentItem} from '../tool_item/EquipmentItem.js';

// import {} from '../tool_item/.js';

export class RecipeEquip extends Object {
    constructor( game ){
        super( game );
        this.game = game;
    }
    setup_recipe( c_r, category ){


        c_r.add_recipe( category,
            ['風を受けて空に舞い上がるための傘です。'],
            ['plastic','feather'],
            [5, 5],
            function( game ){
                let new_item = new EquipmentItem( game );
                new_item.set_image( './img/illustya/rain_kasa_red.png' );
                new_item.equip_part = EquipmentItem.EQUIP_GLIDER;
                new_item.riseup_power = 10;
                return new_item; },
            'Lv1'
        );

        c_r.add_recipe( category,
            ['空中で素早く移動するための翼です。'],
            ['feather'],
            [5],
            function( game ){
                let new_item = new EquipmentItem( game );
                new_item.set_image( './img/illustya/feather_red.png' );
                new_item.equip_part = EquipmentItem.EQUIP_WING;
                new_item.midair_speed = 2;
                new_item.fall_speed = 0.8;
                return new_item; },
            'Lv1'
        );

        c_r.add_recipe( category,
            ['海に潜るためのゴーグルです。'],
            ['plastic', 'fin'],
            [5, 5],
            function( game ){
                let new_item = new EquipmentItem( game );
                new_item.set_image( './img/illustya/snorkel_goggle.png' );
                new_item.equip_part = EquipmentItem.EQUIP_GOGGLE;
                new_item.underwater_speed = 1;
                return new_item; },
            'Lv1'
        );

        c_r.add_recipe( category,
            ['水中で素早く移動するためのヒレです。'],
            ['fin'],
            [5],
            function( game ){
                let new_item = new EquipmentItem( game );
                new_item.set_image( './img/illustya/snorkel_fin.png' );
                new_item.equip_part = EquipmentItem.EQUIP_FIN;
                new_item.underwater_speed = 1;
                return new_item; },
            'Lv1'
        );

    }
}
