

export class PlayerHealth {



    constructor( game ){
        this.game = game;

        this.hp = 80;
        this.max_hp = 100;
        this.sp = 90;
        this.max_sp = 100;
        this.happiness = 70;
        this.max_happiness = 100;
        this.hunger = 30;
        this.max_hunger = 100;
        this.thirst = 70;
        this.max_thirst = 100;
    }

    always_process(){
        // どこにいても行われる処理
        // スタミナの自然回復
        // スタミナを回復した分空腹や口渇が進む
        let stamina_regen = 0.1
        let regened = stamina_regen - this.mod_sp( stamina_regen );
        if( 0 < regened ){
            this.mod_hunger( -regened );
            this.mod_thirst( -regened );
        }
        // 常時、ごくわずかに空腹と口渇が進む
        // 空腹か口渇がゼロの場合、SPにダメージを受け、
        // それもなくなったら、HPにダメージを受け続ける
        if( this.mod_hunger( -0.0001 ) < 0 ){
            if( this.mod_sp( -0.1 ) < 0 ){
                this.mod_hp( -0.1 )
            }
        }
        if( this.mod_thirst( -0.0001 ) < 0 ){
            if( this.mod_sp( -0.1 ) < 0 ){
                this.mod_hp( -0.1 )
            }
        }

    }

    // 超過したら超過分を返す
    // 超過しない場合は0を返す
    mod_hp( d ){
        let ret = 0;
        this.hp += d;
        if( this.hp < 0 ){
            ret = this.hp;
            this.hp = 0;
        }
        if( this.max_hp < this.hp ){
            ret = this.hp - this.max_hp;
            this.hp = this.max_hp;
        }
        return ret;
    }
    mod_sp( d ){
        let ret = 0;
        this.sp += d;
        if( this.sp < 0 ){
            ret = this.sp;
            this.sp = 0;
        }
        if( this.max_sp < this.sp ){
            ret = this.sp - this.max_sp;
            this.sp = this.max_sp;
        }
        return ret;
    }
    mod_happiness( d ){
        let ret = 0;
        this.happiness += d;
        if( this.happiness < 0 ){
            ret = this.happiness;
            this.happiness = 0;
        }
        if( this.max_happiness < this.happiness ){
            ret = this.happiness - this.max_happiness;
            this.happiness = this.max_happiness;
        }
    }
    mod_hunger( d ){
        let ret = 0;
        this.hunger += d;
        if( this.hunger < 0 ){
            ret = this.hunger;
            this.hunger = 0;
        }
        if( this.max_hunger < this.hunger ){
            ret = this.hunger - this.max_hunger;
            this.hunger = this.max_hunger;
        }
        return ret;
    }
    mod_thirst( d ){
        let ret = 0;
        this.thirst += d;
        if( this.thirst < 0 ){
            ret = this.thirst;
            this.thirst = 0;
        }
        if( this.max_thirst < this.thirst ){
            ret = this.thirst - this.max_thirst;
            this.thirst = this.max_thirst;
        }
        return ret;
    }

}
