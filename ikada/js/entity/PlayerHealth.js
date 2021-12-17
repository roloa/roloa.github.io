

export class PlayerHealth {



    constructor( game ){
        this.game = game;

        this.hp = 80;
        this.max_hp = 100;
        this.sp = 50;
        this.max_sp = 100;
        this.happiness = 70;
        this.max_happiness = 100;
        this.hunger = 30;
        this.max_hunger = 100;
        this.thirst = 50;
        this.max_thirst = 100;
    }

    mod_hp( d ){
        this.hp += d;
        if( this.hp < 0 ){
            this.hp = 0;
        }
        if( this.max_hp < this.hp ){
            this.hp = this.max_hp;
        }
    }
    mod_sp( d , is_hurt ){
        this.sp += d;
        if( this.sp < 0 ){
            this.sp = 0;
            if( is_hurt ){
                this.mod_hp( d );
            }
        }
        if( this.max_sp < this.sp ){
            this.sp = this.max_sp;
        }
    }
    mod_happiness( d ){
        this.happiness += d;
        if( this.happiness < 0 ){
            this.happiness = 0;
        }
        if( this.max_happiness < this.happiness ){
            this.happiness = this.max_happiness;
        }
    }
    mod_hunger( d ){
        this.hunger += d;
        if( this.hunger < 0 ){
            this.hunger = 0;
        }
        if( this.max_hunger < this.hunger ){
            this.hunger = this.max_hunger;
        }
    }
    mod_thirst( d ){
        this.thirst += d;
        if( this.thirst < 0 ){
            this.thirst = 0;
        }
        if( this.max_thirst < this.thirst ){
            this.thirst = this.max_thirst;
        }
    }

}
