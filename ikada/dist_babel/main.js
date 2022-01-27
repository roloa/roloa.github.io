"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(() => {
  "use strict";

  class t {
    constructor(i) {
      this.name = "noname_entity", this.game = i, this.x = 0, this.y = 0, this.is_facing_right = !0, this.is_alive = !0, this.is_in_ship_inertial = !1, this.despawn_distance = t.DESPAWN_DISTANCE, this.despawn_distance_ship = 500;
    }

    on_update() {
      this.is_in_ship_inertial || (this.x -= this.game.world.ship.velocity), 1 < this.vx ? this.is_facing_right = !0 : this.vx < -1 && (this.is_facing_right = !1), (this.x < -this.despawn_distance_ship || this.despawn_distance_ship < this.x || this.y < -this.despawn_distance_ship || this.despawn_distance_ship < this.y) && (this.x < this.game.world.camera.x - this.despawn_distance || this.game.world.camera.x + this.despawn_distance < this.x || this.y < this.game.world.camera.y - this.despawn_distance || this.game.world.camera.y + this.despawn_distance < this.y) && (this.is_alive = !1);
    }

    on_draw(t) {
      t.strokeStyle = "rgb(200,0,0)", t.strokeRect(this.x - 16, this.y - 32, 32, 32);
    }

  }

  _defineProperty(t, "DESPAWN_DISTANCE", 1500);

  class i {
    constructor(t) {
      this.game = t, this.image = this.game.image_library.get_image("./img/illustya/text_mu.png"), this.saving_data = {}, this.saving_data.item_name = "noname item", this.saving_data.item_subtitle = "", this.cooking_finish_time = 500, this.is_consumed = !1, this.saving_data.durability_max = 100, this.saving_data.durability = this.saving_data.durability_max, this.set_durability(100);
    }

    set_durability(t) {
      this.saving_data.durability_max = t, this.saving_data.durability = this.saving_data.durability_max;
    }

    get_durability_rate() {
      return this.saving_data.durability / this.saving_data.durability_max;
    }

    consume_durability(t) {
      this.saving_data.durability -= t || 1, this.saving_data.durability <= 0 && (this.is_consumed = !0);
    }

    get_subtitle() {
      return this.saving_data.item_subtitle;
    }

    set_image(t) {
      this.image = this.game.image_library.get_image(t), this.saving_data.image_name = t;
    }

    get_image() {
      return this.image;
    }

    set_name(t) {
      this.saving_data.item_name = t;
    }

    get_name() {
      return this.saving_data.item_name;
    }

    on_update() {}

    on_click(t, i, e, s) {
      console.log("default ToolItem onclick!");
    }

    on_keep_click(t, i, e, s) {}

    dump_information_to_log() {
      this.game.log(this.saving_data.item_name);
    }

    save_data() {
      let t = {};
      return t.class_name = this.constructor.name, t.saving_data_serial = JSON.stringify(this.saving_data), t;
    }

    load_data(t) {
      this.saving_data = JSON.parse(t.saving_data_serial), this.saving_data.image_name && this.set_image(this.saving_data.image_name);
    }

  }

  class e extends i {
    constructor(t) {
      super(t), this.ship_block = null, this.saving_data.item_name = "船の建材";
    }

    set_ship_block(t) {
      return this.ship_block = t, this.image = this.ship_block.image, this;
    }

    on_click(t, i, e, s) {
      this.game.world.ship.put_ship_block_coodinate(this.ship_block, t, i) && (this.is_consumed = !0);
    }

    get_name() {
      return null != this.ship_block ? this.ship_block.get_name() : super.get_name();
    }

    save_data() {
      let t = super.save_data();
      return t.ship_block = this.ship_block.save_data(), t;
    }

    load_data(t) {
      this.set_ship_block(this.game.save_data_manager.deserialize_block(t.ship_block));
    }

  }

  class s extends t {
    constructor(t) {
      super(t), this.game = t, this.vx = 6 * Math.random() - 3, this.vy = -3 * Math.random() - 3, this.gravity = .2, this.number = 0, this.color = "rgb(250,250,250)", this.font = "bold 20px monospace", this.life_time = 50, this.is_in_ship_inertial = !0;
    }

    on_update() {
      super.on_update(), this.x += this.vx, this.y += this.vy, this.vy += this.gravity, 0 < this.life_time ? this.life_time -= 1 : this.is_alive = !1;
    }

    on_draw(t) {
      t.fillStyle = this.color, t.font = this.font, t.fillText(this.number, this.x, this.y);
    }

  }

  class _ {
    constructor(t) {
      this.game = t, this.saving_data = {}, this.name = "木製ブロック", this.is_floor = !1, this.image = null, this.is_removed = !1, this.x = 0, this.y = 0, this.cell_x = 0, this.cell_y = 0, this.kickback_damage = 3, this.max_hp = 100, this.saving_data.hp = this.max_hp, this.saving_data.is_broken = !1, this.newest_heartbeat_id = 0, this.heartbeat_time_limit_max = 150, this.heartbeat_time_limit_count = this.heartbeat_time_limit_max, this.heartbeat_update_span_max = 10, this.heartbeat_update_span_count = this.heartbeat_update_span_max, this.is_healthy_heartbeat = !0, this.is_core = !1, this.accept_ammo_type = null;
    }

    is_need_operate() {}

    on_click() {
      let t = this.game.hud.item_slot.get_active_item();
      if (t && t.is_wrench) return this.saving_data.hp = this.max_hp, this.saving_data.is_broken = !1, !0;
      if (this.saving_data.is_broken) return this.game.log("その設備は壊れています。"), this.game.log("修復を待つか、レンチで修理できます。"), !1;

      if (t && t.is_hammer && !this.is_core) {
        this.saving_data.hp = this.max_hp, this.saving_data.is_broken = !1, this.is_removed = !0;
        let t = new e(this.game);
        return t.set_ship_block(this), this.game.world.give_tool_item_player(t), !0;
      }

      return t && this.deposit_item(t) ? (this.game.hud.item_slot.delete_active_item(), this.game.log(this.name + " に " + t.get_name() + " を入れました。"), !0) : this.on_interact();
    }

    deposit_item(t) {
      return !!this.deposit_fuel(t);
    }

    deposit_fuel(t) {
      return !(!this.accept_ammo_type || !t.ammo_type || this.accept_ammo_type != t.ammo_type || (this.saving_data.ammo_amount += t.ammo_value, 0));
    }

    on_interact() {
      return !1;
    }

    on_hit_bullet(t) {
      if (this.take_damage(t.damage)) {
        let i = new s(this.game);
        return i.x = this.x, i.y = this.y, i.number = t.damage, i.color = "rgb(200, 150, 50)", i.font = "bold 16px monospace", this.game.world.push_entity(i), !0;
      }

      return !1;
    }

    take_damage(t) {
      if (this.is_core) {
        if (this.game.world.ship.get_ship_block_by_index(this.cell_x - 1, this.cell_y) && this.game.world.ship.get_ship_block_by_index(this.cell_x + 1, this.cell_y)) return !1;
      } else if (this.game.world.ship.ship_offset_y <= this.cell_y) {
        if (this.game.world.ship.core_x < this.cell_x && this.game.world.ship.get_ship_block_by_index(this.cell_x + 1, this.cell_y)) return !1;
        if (this.cell_x < this.game.world.ship.core_x && this.game.world.ship.get_ship_block_by_index(this.cell_x - 1, this.cell_y)) return !1;
      }

      return this.saving_data.hp -= t, this.saving_data.hp <= 0 && (this.saving_data.is_broken = !0, this.saving_data.hp = 0), !0;
    }

    give_heartbeat(t) {
      this.newest_heartbeat_id < t && (this.newest_heartbeat_id = t, this.heartbeat_time_limit_count = this.heartbeat_time_limit_max, this.is_healthy_heartbeat = !0);
    }

    update_heartbeat() {
      let t = null;
      t = this.game.world.ship.get_ship_block_by_index(this.cell_x - 1, this.cell_y, !0), t && t.give_heartbeat(this.newest_heartbeat_id), t = this.game.world.ship.get_ship_block_by_index(this.cell_x + 1, this.cell_y, !0), t && t.give_heartbeat(this.newest_heartbeat_id), t = this.game.world.ship.get_ship_block_by_index(this.cell_x, this.cell_y - 1, !0), t && t.give_heartbeat(this.newest_heartbeat_id), t = this.game.world.ship.get_ship_block_by_index(this.cell_x, this.cell_y + 1, !0), t && t.give_heartbeat(this.newest_heartbeat_id);
    }

    on_update() {
      this.is_healthy_heartbeat ? this.saving_data.hp < this.max_hp ? this.saving_data.hp += .05 : this.saving_data.is_broken ? this.saving_data.is_broken = !1 : this.saving_data.hp = this.max_hp : this.take_damage(1), this.is_core || (this.saving_data.is_broken || (0 < this.heartbeat_update_span_count ? this.heartbeat_update_span_count -= 1 : (this.heartbeat_update_span_count = Math.floor(this.heartbeat_update_span_max * (.2 * Math.random() + .8)), this.update_heartbeat())), 0 < this.heartbeat_time_limit_count ? this.heartbeat_time_limit_count -= 1 : this.is_healthy_heartbeat = !1);
    }

    get_image() {
      return this.image;
    }

    get_name() {
      return this.name;
    }

    on_draw(t) {
      if (this.saving_data.is_broken ? (t.globalAlpha = .2, null != this.image && t.drawImage(this.get_image(), -_.BLOCK_RADIUS, -_.BLOCK_RADIUS, _.BLOCK_SIZE, _.BLOCK_SIZE)) : null != this.image && t.drawImage(this.get_image(), -_.BLOCK_RADIUS, -_.BLOCK_RADIUS, _.BLOCK_SIZE, _.BLOCK_SIZE), this.saving_data.hp < this.max_hp) {
        t.strokeStyle = "rgb(0,0,0)", t.beginPath(), t.moveTo(0, 0);
        let i = _.BLOCK_RADIUS * (this.max_hp - this.saving_data.hp) / this.max_hp;
        t.lineTo(i, i), t.stroke(), t.strokeStyle = "rgb(200,200,200)", t.beginPath(), t.moveTo(0, 0), t.lineTo(-i, -i), t.stroke();
      }
    }

    save_data() {
      let t = {};
      return t.class_name = this.constructor.name, t.saving_data_serial = JSON.stringify(this.saving_data), t;
    }

    load_data(t) {
      this.saving_data = JSON.parse(t.saving_data_serial);
    }

  }

  _defineProperty(_, "BLOCK_RADIUS", 16);

  _defineProperty(_, "BLOCK_SIZE", _.BLOCK_RADIUS + _.BLOCK_RADIUS);

  class a extends i {
    constructor(t) {
      super(t), this.saving_data.item_name = "noname equip", this.saving_data.equip_part = 0, this.saving_data.riseup_power = 0, this.saving_data.midair_speed = 0, this.saving_data.fall_speed_reduce = 0, this.saving_data.underwater_speed = 0, this.saving_data.stamina_reduce = 0, this.saving_data.damage_reduce = 0;
    }

    on_click(t, i, e, s) {
      this.game.log(this.saving_data.item_name), 0 < this.saving_data.damage_reduce && this.game.log("ダメージ軽減: " + this.saving_data.damage_reduce), 0 < this.saving_data.riseup_power && this.game.log("上昇力: " + this.saving_data.riseup_power), 0 < this.saving_data.midair_speed && this.game.log("空中速度: " + this.saving_data.midair_speed), 0 < this.saving_data.fall_speed_reduce && this.game.log("落下速度: " + this.saving_data.fall_speed_reduce), 0 < this.saving_data.underwater_speed && this.game.log("水中速度: " + this.saving_data.underwater_speed), 0 < this.saving_data.stamina_reduce && this.game.log("スタミナ減少軽減: " + this.saving_data.stamina_reduce);
    }

  }

  _defineProperty(a, "EQUIP_GLIDER", 1);

  _defineProperty(a, "EQUIP_WING", 2);

  _defineProperty(a, "EQUIP_GOGGLE", 3);

  _defineProperty(a, "EQUIP_FIN", 4);

  _defineProperty(a, "EQUIP_MAX", 5);

  class h extends t {
    constructor(t) {
      super(t), this.name = "unknown item", this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.is_landing = !1, this.is_in_sea = !1, this.item_to_pickup = null, this.is_in_ship_inertial = !0;
    }

    set_tool_item(t) {
      this.item_to_pickup = t, this.image = t.image;
    }

    on_update() {
      super.on_update(), this.vy += .5, this.x += this.vx, this.y += this.vy, 1 < this.vy && (this.is_landing = !1);
      let t = this.game.world.player;
      t.x - t.width_half - 16 < this.x && this.x < t.x + t.width_half + 16 && t.y - t.height_half - 16 < this.y && this.y < t.y + t.height_half + 4 && t.hit_drop_item(this) && (this.is_alive = !1);
      let i = this.x + this.game.world.ship.ship_offset_x * _.BLOCK_SIZE + _.BLOCK_RADIUS,
          e = this.y + this.game.world.ship.ship_offset_y * _.BLOCK_SIZE + _.BLOCK_RADIUS,
          s = Math.floor(i / _.BLOCK_SIZE),
          a = Math.floor(e / _.BLOCK_SIZE);
      0 <= s && s < this.game.world.ship.block_array.length && 0 <= a && a < this.game.world.ship.block_array[0].length && e % _.BLOCK_SIZE < 8 && null != this.game.world.ship.block_array[s][a] && this.game.world.ship.block_array[s][a].is_floor && (this.y = (a - this.game.world.ship.ship_offset_y) * _.BLOCK_SIZE - _.BLOCK_RADIUS, this.vy = 0, this.is_landing = !0, this.is_in_ship_inertial = !0), 0 <= this.y ? (this.vy -= 1, this.vy *= .8, this.is_landing = !1, this.is_in_sea = !0, this.is_in_ship_inertial = !1) : this.is_in_sea = !1, this.is_in_sea && (this.vx = 1);
    }

    on_draw(t) {
      t.strokeStyle = "rgb(200,200,200)", t.drawImage(this.image, this.x - 16, this.y - 16, 32, 32);
    }

  }

  _defineProperty(h, "IMAGE_LIST", ["./img/illustya/tree_ryuuboku.png", "./img/illustya/alohashirt_gray.png", "./img/illustya/junk_kikai.png"]);

  class o {
    constructor(t) {
      this.game = t, this.hp = 80, this.max_hp = 100, this.sp = 90, this.max_sp = 100, this.happiness = 70, this.max_happiness = 100, this.hunger = 50, this.max_hunger = 100, this.thirst = 50, this.max_thirst = 100;
    }

    always_process() {
      let t = this.mod_sp(.1);
      this.mod_hunger(.1 * -(.1 - t)), this.mod_thirst(.2 * -(.1 - t));
      let i = this.mod_hp(.1 * t);
      this.mod_happiness(i), this.mod_hunger(-1e-4) < 0 && this.mod_sp(-.1) < 0 && this.mod_hp(-.1), this.mod_thirst(-1e-4) < 0 && this.mod_sp(-.1) < 0 && this.mod_hp(-.1);
    }

    mod_hp(t) {
      let i = 0;
      return this.hp += t, this.hp < 0 && (i = this.hp, this.hp = 0), this.max_hp < this.hp && (i = this.hp - this.max_hp, this.hp = this.max_hp), i;
    }

    mod_sp(t) {
      let i = 0;
      return this.sp += t, this.sp < 0 && (i = this.sp, this.sp = 0), this.max_sp < this.sp && (i = this.sp - this.max_sp, this.sp = this.max_sp), i;
    }

    consume_sp(t) {
      return t <= this.sp && (this.sp -= t, !0);
    }

    mod_happiness(t) {
      let i = 0;
      this.happiness += t, this.happiness < 0 && (i = this.happiness, this.happiness = 0), this.max_happiness < this.happiness && (i = this.happiness - this.max_happiness, this.happiness = this.max_happiness);
    }

    mod_hunger(t) {
      let i = 0;
      return this.hunger += t, this.hunger < 0 && (i = this.hunger, this.hunger = 0), this.max_hunger < this.hunger && (i = this.hunger - this.max_hunger, this.hunger = this.max_hunger), i;
    }

    mod_thirst(t) {
      let i = 0;
      return this.thirst += t, this.thirst < 0 && (i = this.thirst, this.thirst = 0), this.max_thirst < this.thirst && (i = this.thirst - this.max_thirst, this.thirst = this.max_thirst), i;
    }

    load_data(t) {
      this.hp = t.hp, this.max_hp = t.max_hp, this.sp = t.sp, this.max_sp = t.max_sp, this.happiness = t.happiness, this.max_happiness = t.max_happiness, this.hunger = t.hunger, this.max_hunger = t.max_hunger, this.thirst = t.thirst, this.max_thirst = t.max_thirst;
    }

    save_data() {
      let t = {};
      return t.hp = this.hp, t.max_hp = this.max_hp, t.sp = this.sp, t.max_sp = this.max_sp, t.happiness = this.happiness, t.max_happiness = this.max_happiness, t.hunger = this.hunger, t.max_hunger = this.max_hunger, t.thirst = this.thirst, t.max_thirst = this.max_thirst, t;
    }

  }

  class l extends t {
    constructor(t) {
      super(t), this.name = "player", this.image = this.game.image_library.get_player_image(), this.image_ghost = this.game.image_library.get_image("yurei_youngwoman3_sad"), this.x = 0, this.y = -60, this.vx = 0, this.vy = 0, this.riseup_charge = 0, this.health = new o(this.game), this.hit_invincible_timer = 0, this.hit_invincible_timer_max = 10, this.is_ghost = 0, this.ghost_timer_max = 500, this.ghost_timer = 0, this.width = 32, this.width_half = this.width / 2, this.height = 44, this.height_half = this.height / 2, this.is_landing = !1, this.is_in_sea = !1, this.kickback_damage = 2, this.walk_speed = 3, this.walk_speed_down_rate = .5, this.splint_speed = 5, this.is_splinting = !1, this.splint_double_hit_timer = [0, 0], this.splint_double_hit_timer_max = 5, this.equip_list = [], this.clear_equip_status();
    }

    get_vector_to_cursor() {
      let t = this.game.world.cursor_x - this.x,
          i = this.game.world.cursor_y - this.y,
          e = Math.sqrt(t * t + i * i);
      return t /= e, i /= e, {
        x: t,
        y: i
      };
    }

    get_radian_to_cursor() {
      return Math.atan2(this.game.world.cursor_y - this.y, this.game.world.cursor_x - this.x);
    }

    clear_equip_status() {
      for (var t = 0; t < a.EQUIP_MAX; t++) this.equip_list[t] = null;

      this.riseup_power = 0, this.midair_speed = 0, this.fall_speed_reduce = 1, this.underwater_speed = 0, this.stamina_reduce = 1, this.damage_reduce = 1;
    }

    equip_item(t) {
      return null == this.equip_list[t.saving_data.equip_part] && (this.equip_list[t.saving_data.equip_part] = t, this.riseup_power += t.saving_data.riseup_power, this.midair_speed += t.saving_data.midair_speed, this.fall_speed_reduce *= .01 * (100 - t.saving_data.fall_speed_reduce), this.underwater_speed += t.saving_data.underwater_speed, this.stamina_reduce *= 1 - t.saving_data.stamina_reduce, this.damage_reduce *= 1 - t.saving_data.damage_reduce, !0);
    }

    hit_wind(t) {
      if (this.game.hud.hud_menu.is_menu_open) return !1;
      this.is_falling || (this.riseup_power <= 0 ? this.vx = .5 * t.vx : (this.riseup_charge = this.riseup_power, this.is_flying = !0));
    }

    hit_drop_item(t) {
      return this.game.hud.item_slot.put_pickup_item(t.item_to_pickup, !0);
    }

    test_hit_enemy(t) {
      if (1 == this.game.world.player.is_ghost) return !1;
      if (0 < this.hit_invincible_timer) return !1;
      if (this.game.hud.hud_menu.is_menu_open) return !1;

      if (this.test_hit(t.x, t.y)) {
        let i = Math.atan2(this.y - t.y, this.x - t.x);
        return this.hit_damage(t.direct_damage, t.vx * t.knock_back_rate + 2 * Math.cos(i), t.vy * t.knock_back_rate + 2 * Math.sin(i), t), !0;
      }

      return !1;
    }

    test_hit_bullet(t) {
      return !(1 == this.game.world.player.is_ghost || 0 < this.hit_invincible_timer || !this.test_hit(t.x, t.y) || (this.hit_damage(t.damage, t.vx * t.knock_back_rate, t.vy * t.knock_back_rate, t.owner_enemy), 0));
    }

    test_hit(t, i) {
      return this.x - this.width_half < t && t < this.x + this.width_half && this.y - this.height_half < i && i < this.y + this.height_half;
    }

    hit_damage(t, i, e, _) {
      if (0 < this.hit_invincible_timer) return !1;
      if (this.game.hud.hud_menu.is_menu_open) return !1;
      this.health.mod_hp(-t), this.vx += i, this.vx = Math.max(-20, Math.min(this.vx, 20)), this.vy += e, this.vy = Math.max(-20, Math.min(this.vy, 20)), this.hit_invincible_timer = this.hit_invincible_timer_max;
      let a = new s(this.game);
      return a.x = this.x, a.y = this.y, a.number = t, a.color = "rgb(250, 30, 30)", a.font = "bold 30px monospace", this.game.world.push_entity(a), !0;
    }

    on_update() {
      if (super.on_update(), this.x += this.vx, this.y += this.vy, this.is_ghost ? (this.ghost_timer -= 1, this.x = 0, this.y = -40, this.vx = 0, this.vy = 0, this.health.hp = (1 - this.ghost_timer / this.ghost_timer_max) * this.health.max_hp, this.ghost_timer <= 0 && (this.is_ghost = !1)) : this.is_flying ? this.control_midair() : this.is_diving ? (this.vx *= .8, this.vy *= .8, this.control_diving()) : this.is_falling ? (this.vy += .5, this.vy *= .99, this.control_falling()) : (this.vy += .5, this.vy *= .99, this.update_land(), this.hittest_ship(), this.game.hud.hud_menu.is_menu_open || this.control_land(), this.vx *= this.walk_speed_down_rate), 1 < this.vy && (this.is_landing = !1), -this.height_half <= this.y ? (!this.is_diving && 0 <= this.y && (this.vy -= 1, this.vy *= .8, this.health.consume_sp(.3 * this.stamina_reduce) || this.health.mod_hp(-.1)), this.is_landing = !1, this.is_in_sea = !0, this.is_flying = !1, this.is_falling = !1, this.is_in_ship_inertial = !1) : (this.is_in_sea = !1, this.is_diving = !1), 0 < this.hit_invincible_timer && (this.hit_invincible_timer -= 1), this.health.hp <= 0 && (this.health.hp = 1, this.health.hunger = 20, this.health.thirst = 20, this.is_ghost = !0, this.ghost_timer = this.ghost_timer_max, this.x = this.game.world.ship.core_x, this.y = -40, this.vx = 0, this.vy = 0), this.health.always_process(), !this.game.hud.hud_menu.is_menu_open && !this.is_ghost && (this.game.input_controller.get_mouse_press() ? this.on_click(this.game.world.cursor_x, this.game.world.cursor_y) : this.game.input_controller.get_mouse_down() && this.on_keep_click(this.game.world.cursor_x, this.game.world.cursor_y), this.game.input_controller.is_down_key.KeyT)) {
        let t = this.game.hud.item_slot.get_active_item();

        if (null != t) {
          let i = new h(this.game);
          i.set_tool_item(t), i.x = this.x + 32, i.y = this.y, this.game.world.push_entity(i), this.game.hud.item_slot.delete_active_item();
        }
      }
    }

    on_click(t, i) {
      let e = this.game.world.ship.get_ship_block(t, i, !0);
      e && e.on_click() || this.game.hud.item_slot.activate_item(t, i, this.x, this.y);
    }

    on_keep_click(t, i) {
      this.game.hud.item_slot.keep_activate_item(t, i, this.x, this.y);
    }

    update_land() {}

    splint_check(t) {
      0 == this.splint_double_hit_timer[t] ? this.is_splinting = !1 : this.splint_double_hit_timer_max <= this.splint_double_hit_timer[t] || (0 < this.splint_double_hit_timer[t] ? this.is_splinting = !0 : this.is_splinting = !1), this.splint_double_hit_timer[t] = this.splint_double_hit_timer_max + 1;
    }

    control_land() {
      this.game.input_controller.get_down_right() && (this.splint_check(1), this.is_splinting && this.health.consume_sp(.2) ? this.vx += this.splint_speed : this.health.consume_sp(.1) ? this.vx += this.walk_speed : this.vx += .5 * this.walk_speed), this.game.input_controller.get_down_left() && (this.splint_check(0), this.is_splinting && this.health.consume_sp(.2) ? this.vx -= this.splint_speed : this.health.consume_sp(.1) ? this.vx -= this.walk_speed : this.vx -= .5 * this.walk_speed), 0 < this.splint_double_hit_timer[0] && (this.splint_double_hit_timer[0] -= 1), 0 < this.splint_double_hit_timer[1] && (this.splint_double_hit_timer[1] -= 1), (this.game.input_controller.get_down_up() || this.game.input_controller.get_down_space()) && -1 < this.vy && (this.is_landing ? this.health.consume_sp(3) && (this.vy = -8, this.is_landing = !1) : this.is_in_sea && (this.health.consume_sp(10) ? (this.vy = -8, this.is_in_sea = !1) : (this.health.mod_hp(-3), this.vy = -8, this.is_in_sea = !1))), this.game.input_controller.get_down_down() ? this.is_in_sea ? (0 < this.underwater_speed || this.stamina_reduce < 1) && (this.is_diving = !0, this.vy += 3, this.y += 3) : this.is_off_platform = !0 : this.is_off_platform = !1;
    }

    control_midair() {
      if (0 < this.riseup_charge) {
        this.riseup_charge -= Math.abs(.1 * this.vy), this.riseup_charge -= .1, this.vy -= 2;
        let t = .1 * this.riseup_charge;
        this.vy < -t && (this.vy *= .7);
      } else this.vy += .5, -20 < this.y && (this.is_flying = !1);

      0 < this.vy && (this.vy *= .8), this.vy *= .99, this.game.input_controller.get_down_right() && (this.vx += 1 + this.midair_speed), this.game.input_controller.get_down_left() && (this.vx -= 1 + this.midair_speed), this.vx *= .5, this.game.input_controller.get_down_down() && (this.is_flying = !1, this.is_falling = !0, this.riseup_charge = 0);
    }

    control_falling() {
      this.game.input_controller.get_down_right() && (this.vx += 1 + this.midair_speed), this.game.input_controller.get_down_left() && (this.vx -= 1 + this.midair_speed), this.vx *= .5, this.game.input_controller.get_down_up() && (this.is_flying = !0, this.is_falling = !1);
    }

    control_diving() {
      this.vx *= .99, this.vy *= .99;
      let t = .3;
      this.game.input_controller.get_down_right() && (this.vx += (1 + this.underwater_speed) * t), this.game.input_controller.get_down_left() && (this.vx -= (1 + this.underwater_speed) * t), this.game.input_controller.get_down_up() && (this.vy -= (1 + this.underwater_speed) * t), this.game.input_controller.get_down_down() && (this.vy += (1 + this.underwater_speed) * t), this.health.consume_sp(1 * this.stamina_reduce) || this.health.mod_hp(-.1);
    }

    is_in_ship() {
      let t = this.x + this.game.world.ship.ship_offset_x * _.BLOCK_SIZE + _.BLOCK_RADIUS,
          i = this.y + this.game.world.ship.ship_offset_y * _.BLOCK_SIZE + _.BLOCK_RADIUS + this.height_half,
          e = Math.floor(t / _.BLOCK_SIZE),
          s = Math.floor(i / _.BLOCK_SIZE);
      return 0 <= e && e < this.game.world.ship.block_array.length && 0 <= s && s < this.game.world.ship.block_array[0].length;
    }

    hittest_ship() {
      this.x, this.game.world.ship.ship_offset_x;
      let t = this.y + this.game.world.ship.ship_offset_y * _.BLOCK_SIZE + _.BLOCK_RADIUS + this.height_half,
          i = this.game.world.ship.get_ship_block(this.x, this.y + this.height_half);
      if (t % _.BLOCK_SIZE < 8 && null != i && i.is_floor) if (this.is_off_platform || this.vy < -1) ;else {
        let i = Math.floor(t / _.BLOCK_SIZE);
        this.y = (i - this.game.world.ship.ship_offset_y) * _.BLOCK_SIZE - _.BLOCK_RADIUS - this.height_half, this.vy = 0, this.is_landing = !0, this.is_in_ship_inertial = !0;
      }
    }

    on_draw(t) {
      t.save(), t.translate(this.x, this.y), this.is_facing_right || t.scale(-1, 1), t.strokeStyle = "rgb(200,0,200)", t.strokeRect(-this.width_half, -this.height_half, this.width, this.height), this.is_ghost ? t.drawImage(this.image_ghost, -this.width_half, -this.height_half, this.width, this.height) : t.drawImage(this.image, -this.width_half, -this.height_half, this.width, this.height), t.restore();
    }

  }

  class n extends _ {
    constructor(t) {
      super(t), this.name = "木製ブロック", this.is_floor = !0, this.image = this.game.image_library.get_image("ship_floor");
    }

    on_update() {
      super.on_update();
    }

  }

  class r extends _ {
    constructor(t) {
      super(t), this.name = "木製支柱", this.is_floor = !1, this.image = this.game.image_library.get_image("ship_frame");
    }

    on_update() {
      super.on_update();
    }

  }

  class m extends _ {
    constructor(t) {
      super(t), this.name = "舟のコア", this.is_floor = !0, this.image = this.game.image_library.get_image("ship_core"), this.heartbeat_span_max = 50, this.heartbeat_span_count = this.heartbeat_span_max, this.is_core = !0, this.current_heartbeat_id = 1;
    }

    on_update() {
      if (super.on_update(), 0 < this.heartbeat_span_count) this.heartbeat_span_count -= 1;else {
        this.heartbeat_span_count = this.heartbeat_span_max, this.current_heartbeat_id += 1, this.newest_heartbeat_id = this.current_heartbeat_id;
        let t = null;
        t = this.game.world.ship.get_ship_block_by_index(this.cell_x - 1, this.cell_y, !0), t && t.give_heartbeat(this.current_heartbeat_id), t = this.game.world.ship.get_ship_block_by_index(this.cell_x + 1, this.cell_y, !0), t && t.give_heartbeat(this.current_heartbeat_id), t = this.game.world.ship.get_ship_block_by_index(this.cell_x, this.cell_y - 1, !0), t && t.give_heartbeat(this.current_heartbeat_id), t = this.game.world.ship.get_ship_block_by_index(this.cell_x, this.cell_y + 1, !0), t && t.give_heartbeat(this.current_heartbeat_id);
      }
    }

  }

  class g {
    constructor(t) {
      this.game = t, this.block_array = [], this.init_block_array(), this.velocity = 0, this.oar_impulse = 0, this.ship_level = 0;
    }

    init_block_array() {
      for (let t = 0; t < 7; t++) {
        this.block_array[t] = [];

        for (let i = 0; i < 4; i++) this.block_array[t][i] = null;
      }

      this.ship_offset_x = 4, this.ship_offset_y = 3, this.put_ship_block(new n(this.game), 5, 0), this.put_ship_block(new r(this.game), 5, 1), this.put_ship_block(new r(this.game), 5, 2), this.put_ship_block(new n(this.game), 3, 1), this.put_ship_block(new r(this.game), 3, 2), this.put_ship_block(new n(this.game), 1, 2), this.put_ship_block(new n(this.game), 0, 3), this.put_ship_block(new n(this.game), 1, 3), this.put_ship_block(new m(this.game), 2, 3), this.core_x = 3, this.core_y = 3, this.put_ship_block(new n(this.game), 3, 3), this.put_ship_block(new n(this.game), 4, 3), this.put_ship_block(new n(this.game), 5, 3), this.put_ship_block(new n(this.game), 6, 3);
    }

    get_ship_block(t, i, e) {
      let s = t + this.ship_offset_x * _.BLOCK_SIZE + _.BLOCK_RADIUS,
          a = i + this.ship_offset_y * _.BLOCK_SIZE + _.BLOCK_RADIUS,
          h = Math.floor(s / _.BLOCK_SIZE),
          o = Math.floor(a / _.BLOCK_SIZE);
      return 0 <= h && h < this.block_array.length && 0 <= o && o < this.block_array[0].length ? null != this.block_array[h][o] && !e && this.block_array[h][o].saving_data.is_broken ? null : this.block_array[h][o] : null;
    }

    get_ship_block_by_index(t, i, e) {
      return 0 <= t && t < this.block_array.length && 0 <= i && i < this.block_array[0].length ? null != this.block_array[t][i] && !e && this.block_array[t][i].saving_data.is_broken ? null : this.block_array[t][i] : null;
    }

    put_ship_block_coodinate(t, i, e) {
      let s = i + this.ship_offset_x * _.BLOCK_SIZE + _.BLOCK_RADIUS,
          a = e + this.ship_offset_y * _.BLOCK_SIZE + _.BLOCK_RADIUS,
          h = Math.floor(s / _.BLOCK_SIZE),
          o = Math.floor(a / _.BLOCK_SIZE),
          l = this.get_ship_block_by_index(h - 1, o, !0),
          n = this.get_ship_block_by_index(h + 1, o, !0),
          r = this.get_ship_block_by_index(h, o - 1, !0),
          m = this.get_ship_block_by_index(h, o + 1, !0);
      if (0 == (null != l || null != n || null != r || null != m)) return this.game.log("隣接するブロックが無いと置けません。"), !1;

      if (h < 0) {
        let t = [];

        for (let i = 0; i < this.block_array[0].length; i++) t.push(null);

        this.block_array.unshift(t), h += 1, this.ship_offset_x += 1, this.calc_ship_block_cell_xy();
      } else if (this.block_array.length <= h) {
        let t = [];

        for (let i = 0; i < this.block_array[0].length; i++) t.push(null);

        this.block_array.push(t), this.calc_ship_block_cell_xy();
      }

      if (o < 0) {
        for (let t = 0; t < this.block_array.length; t++) this.block_array[t].unshift(null);

        o += 1, this.ship_offset_y += 1, this.calc_ship_block_cell_xy();
      }

      return 0 <= h && h < this.block_array.length && 0 <= o && o < this.block_array[0].length ? null != this.block_array[h][o] ? (this.game.log("既にブロックがあります。"), !1) : (this.put_ship_block(t, h, o), !0) : (this.game.log("ブロックを置ける範囲外です。"), !1);
    }

    put_ship_block(t, i, e, s) {
      null != t ? (t.is_removed = !1, this.block_array[i][e] = t, t.x = i * _.BLOCK_SIZE - this.ship_offset_x * _.BLOCK_SIZE + _.BLOCK_RADIUS, t.y = e * _.BLOCK_SIZE - this.ship_offset_y * _.BLOCK_SIZE + _.BLOCK_RADIUS, t.cell_x = i, t.cell_y = e) : this.block_array[i][e] = null, 1 != s && this.calc_ship_status();
    }

    global_to_local_x(t) {
      return t + this.ship_offset_x * _.BLOCK_SIZE;
    }

    global_to_local_y(t) {
      return t + this.ship_offset_y * _.BLOCK_SIZE;
    }

    local_to_cell_x(t) {
      return Math.floor(t / _.BLOCK_SIZE);
    }

    local_to_cell_y(t) {
      return Math.floor(t / _.BLOCK_SIZE);
    }

    cell_to_global_x(t) {
      return t * _.BLOCK_SIZE - this.ship_offset_x * _.BLOCK_SIZE;
    }

    cell_to_global_y(t) {
      return t * _.BLOCK_SIZE - this.ship_offset_y * _.BLOCK_SIZE;
    }

    global_to_cell_x(t) {
      return this.local_to_cell_x(this.global_to_local_x(t));
    }

    global_to_cell_y(t) {
      return this.local_to_cell_y(this.global_to_local_y(t));
    }

    search_block_in_nearest_in_condition(t, i, e) {
      let s = this.global_to_cell_x(t),
          _ = this.global_to_cell_x(i),
          a = null,
          h = 1e6;

      for (let t = 0; t < this.block_array.length; t++) for (let i = 0; i < this.block_array[t].length; i++) {
        let o = this.block_array[t][i];

        if (null != o && e(o)) {
          let e = (t - s) * (t - s) + (i - _) * (i - _);
          e < h && (h = e, a = o);
        }
      }

      return a;
    }

    has_block_instanceof(t) {
      for (let i = 0; i < this.block_array.length; i++) for (let e = 0; e < this.block_array[i].length; e++) {
        let s = this.block_array[i][e];
        if (null != s && s instanceof t) return !0;
      }

      return !1;
    }

    get_left_side_x() {
      return -_.BLOCK_SIZE * this.ship_offset_x;
    }

    get_right_side_x() {
      return _.BLOCK_SIZE * (-this.ship_offset_x + this.block_array.length - 1);
    }

    get_top_y() {
      return -_.BLOCK_SIZE * this.ship_offset_y;
    }

    calc_ship_status() {
      let t = 0;

      for (let i = 0; i < this.block_array.length; i++) for (let e = 0; e < this.block_array[i].length; e++) {
        let s = this.block_array[i][e];
        null != s && t < s.ship_level_value && (t = s.ship_level_value);
      }

      this.ship_level < t ? (this.game.log("舟レベルアップ: "), this.game.log("Lv" + this.ship_level + " -> Lv" + t), this.ship_level = t, this.game.tutorial_data.update_tutorial_is_open()) : t < this.ship_level && (this.game.log("舟レベルダウン: "), this.game.log("Lv" + this.ship_level + " -> Lv" + t), this.ship_level = t);
    }

    calc_ship_block_cell_xy() {
      for (let t = 0; t < this.block_array.length; t++) for (let i = 0; i < this.block_array[t].length; i++) {
        let e = this.block_array[t][i];
        null != e && (e.cell_x = t, e.cell_y = i, e.is_core && (this.core_x = t, this.core_y = i));
      }
    }

    on_oar(t) {
      this.oar_impulse += t, 300 < this.oar_impulse && (this.oar_impulse = 300);
    }

    impulse_velocity(t) {
      this.velocity += t;
    }

    on_update() {
      0 < this.oar_impulse && (this.oar_impulse -= 1, this.impulse_velocity(.1)), this.velocity *= .95;

      for (let t = 0; t < this.block_array.length; t++) for (let i = 0; i < this.block_array[t].length; i++) null != this.block_array[t][i] && (this.block_array[t][i].is_removed ? (this.block_array[t][i] = null, this.calc_ship_status()) : this.block_array[t][i].on_update());
    }

    on_draw(t) {
      for (let i = 0; i < this.block_array.length; i++) for (let e = 0; e < this.block_array[i].length; e++) null != this.block_array[i][e] && (t.save(), t.translate((-this.ship_offset_x + i) * _.BLOCK_SIZE, (-this.ship_offset_y + e) * _.BLOCK_SIZE), this.block_array[i][e].on_draw(t), t.restore());

      t.fillStyle = "rgb(255,0,0)", t.fillRect(this.get_left_side_x(), this.get_top_y(), 10, 10), t.fillStyle = "rgb(0,255,0)", t.fillRect(this.get_right_side_x(), this.get_top_y(), 10, 10);
    }

    load_data(t) {
      this.ship_offset_x = t.ship_offset_x, this.ship_offset_y = t.ship_offset_y, this.block_array = [];

      for (let i = 0; i < t.block_array.length; i++) {
        this.block_array[i] = [];

        for (let e = 0; e < t.block_array[i].length; e++) {
          let s = this.game.save_data_manager.deserialize_block(t.block_array[i][e]);
          this.put_ship_block(s, i, e, !0);
        }
      }

      this.calc_ship_status();
    }

    save_data() {
      let t = {};
      t.ship_offset_x = this.ship_offset_x, t.ship_offset_y = this.ship_offset_y, t.block_array = [];

      for (let i = 0; i < this.block_array.length; i++) {
        t.block_array[i] = [];

        for (let e = 0; e < this.block_array[i].length; e++) null != this.block_array[i][e] ? t.block_array[i][e] = this.block_array[i][e].save_data() : t.block_array[i][e] = null;
      }

      return t;
    }

  }

  class c {
    constructor(t) {
      this.game = t, this.wave_list = [], this.world_zero_y = 0, this.horizon_line_y = 250;

      for (let t = 0; t < 50; t++) {
        let t = {};
        t.x = Math.random() * this.game.SCREEN_WIDTH - this.game.SCREEN_WIDTH_HALF, t.y = Math.random() * this.horizon_line_y * .9, this.wave_list.push(t);
      }

      this.star_list = [];

      for (let t = 0; t < 50; t++) {
        let t = {};
        this.reset_star(t), t.coodinate_rotate = Math.random() * Math.PI + Math.PI, this.calc_star_xy(t), this.star_list.push(t);
      }

      this.star_rotate_proc_index = 0, this.cloud_list = [];

      for (let t = 0; t < 80; t++) {
        let i = {};
        i.x = Math.random() * this.game.SCREEN_WIDTH - this.game.SCREEN_WIDTH_HALF, i.y = this.horizon_line_y - 3 * t - 100, i.visible = Math.random() < .3, this.cloud_list.push(i);
      }

      this.cloud_image = this.game.image_library.get_image("cloud_border"), this.cloud_width = 120, this.cloud_height = 80, this.moon = {}, this.moon.coodinate_rotate = 1.25 * Math.PI, this.moon.coodinate_radius = 300, this.moon.size = 50, this.moon.age = 1, this.moon.color_fill = "rgb(250, 200, 150)", this.moon.color_stroke = "rgb(200, 150, 100)";
    }

    reset_cloud(t) {}

    reset_star(t) {
      t.coodinate_radius = Math.random() * this.game.SCREEN_WIDTH_HALF * .9 + .1 * this.game.SCREEN_WIDTH_HALF, t.coodinate_rotate = Math.PI, t.size = 3 * Math.random() + 1;
      let i = Math.floor(150 * Math.random() + 100),
          e = Math.floor(150 * Math.random() + 100);
      t.color = "rgb(" + i + ", 200, " + e + ")";
    }

    calc_star_xy(t) {
      t.coodinate_rotate += .001, 2 * Math.PI <= t.coodinate_rotate && this.reset_star(t), t.x = Math.cos(t.coodinate_rotate) * t.coodinate_radius + this.game.SCREEN_WIDTH_HALF, t.y = Math.sin(t.coodinate_rotate) * t.coodinate_radius + this.game.SCREEN_HEIGHT_HALF;
    }

    on_update() {
      this.world_zero_y = this.game.SCREEN_HEIGHT_HALF - this.game.world.camera.zoom * this.game.world.camera.y;

      for (let t of this.wave_list) {
        let i = t.y / this.horizon_line_y * .9 + .1;
        t.x += i, t.x -= this.game.world.ship.velocity * i, this.game.SCREEN_WIDTH_HALF < t.x ? (t.x = -this.game.SCREEN_WIDTH_HALF, t.y = Math.random() * this.horizon_line_y * .9) : t.x < -this.game.SCREEN_WIDTH_HALF && (t.x = this.game.SCREEN_WIDTH_HALF, t.y = Math.random() * this.horizon_line_y * .9);
      }

      this.star_rotate_proc_index += 1, this.star_list.length <= this.star_rotate_proc_index && (this.star_rotate_proc_index = 0), this.calc_star_xy(this.star_list[this.star_rotate_proc_index]);

      for (let t of this.cloud_list) {
        let i = 1.1 - t.y / this.horizon_line_y;
        t.x += .1 * i, t.x -= .1 * this.game.world.ship.velocity * i, this.game.SCREEN_WIDTH_HALF < t.x ? t.x = -this.game.SCREEN_WIDTH_HALF : t.x < -this.game.SCREEN_WIDTH_HALF && (t.x = this.game.SCREEN_WIDTH_HALF);
      }

      this.moon.coodinate_rotate += 1e-4, 2.25 * Math.PI < this.moon.coodinate_rotate && (this.moon.coodinate_rotate = .75 * Math.PI, this.moon.age += 1, 8 <= this.moon.age && (this.moon.age = 0));
    }

    draw_wave(t, i) {
      let e = i.x + this.game.SCREEN_WIDTH_HALF,
          s = i.y * (this.world_zero_y - this.horizon_line_y) / this.horizon_line_y,
          _ = i.y / this.horizon_line_y * this.game.world.camera.zoom,
          a = s + 20 * _,
          h = 40 * _;

      t.strokeStyle = "rgb(50, 100, 250)", t.beginPath(), t.moveTo(e - h, a + this.horizon_line_y), t.lineTo(e, s + this.horizon_line_y), t.lineTo(e + h, a + this.horizon_line_y), t.stroke();
    }

    draw_star(t, i) {
      t.lineWidth = 2, t.strokeStyle = i.color;
      let e = i.size;
      t.beginPath(), t.moveTo(i.x - e, i.y - e), t.lineTo(i.x + e, i.y + e), t.stroke(), t.beginPath(), t.moveTo(i.x - e, i.y + e), t.lineTo(i.x + e, i.y - e), t.stroke(), e *= .5, t.lineWidth = 3, t.strokeStyle = "rgb(250,250,250)", t.beginPath(), t.moveTo(i.x - e, i.y - e), t.lineTo(i.x + e, i.y + e), t.stroke(), t.beginPath(), t.moveTo(i.x - e, i.y + e), t.lineTo(i.x + e, i.y - e), t.stroke();
    }

    draw_cloud(t, i) {
      if (i.visible) {
        let e = 1 - i.y / this.horizon_line_y;
        t.drawImage(this.cloud_image, i.x + this.game.SCREEN_WIDTH_HALF, i.y, this.cloud_width * e, this.cloud_height * e);
      }
    }

    draw_moon(t) {
      let i = Math.cos(this.moon.coodinate_rotate) * this.moon.coodinate_radius * 1.2 + this.game.SCREEN_WIDTH_HALF,
          e = Math.sin(this.moon.coodinate_rotate) * this.moon.coodinate_radius + this.horizon_line_y;
      t.lineWidth = 3, t.save(), t.translate(i, e), t.rotate(this.moon.coodinate_rotate), t.beginPath(), t.strokeStyle = this.moon.color_stroke, t.fillStyle = "rgb(0,0,20)", t.strokeStyle = "rgb(50,50,50)", t.arc(0, 0, this.moon.size, 0, 2 * Math.PI, !1), t.fill(), t.stroke(), t.fillStyle = this.moon.color_fill, t.strokeStyle = this.moon.color_stroke, t.beginPath();
      const s = 1.15;
      this.moon.size, this.moon.size, Math.PI, Math.PI, 0 == this.moon.age || (1 == this.moon.age ? (t.arc(0, 0, this.moon.size, 0, 1 * Math.PI, !1), t.arc(0, .5 * -this.moon.size, 1.1 * this.moon.size, .5 * Math.PI + s, .5 * Math.PI - s, !0)) : 2 == this.moon.age ? t.arc(0, 0, this.moon.size, 0, 1 * Math.PI, !1) : 3 == this.moon.age ? (t.arc(0, 0, this.moon.size, 0, 1 * Math.PI, !1), t.arc(0, .5 * this.moon.size, 1.1 * this.moon.size, 1.5 * Math.PI - s, 1.5 * Math.PI + s, !1)) : 4 == this.moon.age ? t.arc(0, 0, this.moon.size, 0, 2 * Math.PI, !1) : 5 == this.moon.age ? (t.arc(0, 0, this.moon.size, 1 * Math.PI, 2 * Math.PI, !1), t.arc(0, .5 * -this.moon.size, 1.1 * this.moon.size, .5 * Math.PI - s, .5 * Math.PI + s, !1)) : 6 == this.moon.age ? t.arc(0, 0, this.moon.size, 1 * Math.PI, 2 * Math.PI, !1) : 7 == this.moon.age && (t.arc(0, 0, this.moon.size, 1 * Math.PI, 2 * Math.PI, !1), t.arc(0, .5 * this.moon.size, 1.1 * this.moon.size, 1.5 * Math.PI + s, 1.5 * Math.PI - s, !0))), t.closePath(), t.fill(), t.stroke(), t.restore();
    }

    on_draw(t) {
      t.fillStyle = "rgb(255,0,0)", t.strokeStyle = "rgb(50, 100, 250)", this.horizon_line_y < this.world_zero_y && (t.beginPath(), t.moveTo(0, this.horizon_line_y), t.lineTo(960, this.horizon_line_y), t.stroke());

      for (let i of this.wave_list) this.draw_wave(t, i);

      t.save(), t.beginPath(), t.moveTo(0, 0), t.lineTo(this.game.SCREEN_WIDTH, 0), t.lineTo(this.game.SCREEN_WIDTH, this.horizon_line_y), t.lineTo(0, this.horizon_line_y), t.closePath(), t.clip();

      for (let i of this.star_list) this.draw_star(t, i);

      this.draw_moon(t);

      for (let i of this.cloud_list) this.draw_cloud(t, i);

      t.restore();
    }

  }

  class u extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("wasyoku_yakizakana"), this.saving_data.item_name = "名もなき食べ物", this.saving_data.hunger_value = 5, this.saving_data.thirst_value = 5, this.saving_data.is_be_leftover = !0;
    }

    on_click(t, i, e, s) {
      this.saving_data.hunger_value < this.saving_data.thirst_value ? this.game.log(this.saving_data.item_name + "を飲みました。") : this.game.log(this.saving_data.item_name + "を食べました。"), this.game.log("養分: +" + this.saving_data.hunger_value + "%"), this.game.log("水分: +" + this.saving_data.thirst_value + "%");

      let _ = this.game.world.player.health.mod_hunger(this.saving_data.hunger_value);

      this.game.world.player.health.mod_thirst(this.saving_data.thirst_value), this.saving_data.is_be_leftover && 10 < _ && this.game.materials.put_material("leftover", Math.floor(_ / 9)), this.is_consumed = !0;
    }

    dump_information_to_log() {
      this.game.log(this.saving_data.item_name), this.game.log("養分: +" + this.saving_data.hunger_value + "%"), this.game.log("水分: +" + this.saving_data.thirst_value + "%"), this.game.log("何もない場所をクリックする事でこれを食べます。");
    }

  }

  class d extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("food_yakisake"), this.saving_data.item_name = "焼き魚";
    }

    on_click(t, i, e, s) {
      this.game.world.player.health.mod_hunger(50), this.is_consumed = !0;
    }

  }

  class p extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("wasyoku_himono"), this.saving_data.item_name = "干し魚";
    }

    on_click(t, i, e, s) {
      this.game.world.player.health.mod_hunger(30), this.is_consumed = !0;
    }

  }

  class y extends u {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("./img/illustya/food_fish_kirimi_red.png"), this.saving_data.item_name = "生魚", this.saving_data.hunger_value = 25, this.saving_data.thirst_value = 5;
    }

    get_cooked_item() {
      return new d(this.game);
    }

    get_dried_item() {
      return new p(this.game);
    }

  }

  class f extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("kaizoku_takarabako"), this.saving_data.item_name = "名もなき箱", this.content_item = null;
    }

    set_content(t) {
      this.content_item = t;
    }

    on_click(t, i, e, s) {
      null != this.content_item ? this.game.world.give_tool_item_player(this.content_item) : this.game.log("箱は空っぽでした..."), this.is_consumed = !0;
    }

  }

  class T extends t {
    constructor(t) {
      super(t), this.game = t, this.name = "unknown item", this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.is_landing = !1, this.is_in_sea = !1, this.is_working = !1, this.is_first_fishing = !0, this.is_rewinding = !1, this.is_fish_hitting = !1, this.fish_hit_timer = 0, this.hit_item = null, this.waiting_hit_timer_base = 100, this.waiting_hit_timer = this.waiting_hit_timer_base, this.image = this.game.image_library.get_image("fishing_lure");
    }

    generate_hit_item() {
      if (this.is_first_fishing) {
        this.is_first_fishing = !1;
        let t = new f(this.game);
        return t.set_image("fish_sakana_iwashi"), t.set_content(new y(this.game)), t;
      }

      return this.game.materials.balance.get_fishing_result();
    }

    catch_drop_item() {
      for (let t of this.game.world.entity_list) if (t && t instanceof h && t.x - 32 < this.x && this.x < t.x + 32 && t.y - 32 < this.y && this.y < t.y + 32) {
        this.hit_item = t.item_to_pickup, t.is_alive = !1;
        break;
      }
    }

    on_click_rod(t, i, e, s) {
      if (this.is_working) this.is_rewinding || (this.is_fish_hitting ? this.hit_item = this.generate_hit_item() : this.catch_drop_item(), this.is_rewinding = !0);else {
        this.is_working = !0, this.is_fish_hitting = !1;
        let t = this.game.world.player.get_vector_to_cursor();
        this.vx = 7 * t.x, this.vy = 7 * t.y, this.x = e + 10 * t.x, this.y = s - 16 + 10 * t.y;
      }
    }

    on_update() {
      super.on_update(), this.is_working && (this.is_rewinding ? (this.x = .3 * this.game.world.player.x + .7 * this.x, this.y = .3 * this.game.world.player.y + .7 * this.y, Math.abs(this.game.world.player.x - this.x) < 32 && (this.x = this.game.world.player.x, this.y = this.game.world.player.y, this.is_rewinding = !1, this.is_working = !1, this.is_fish_hitting = !1, null != this.hit_item && this.game.world.drop_tool_item_at_player(this.hit_item), this.hit_item = null)) : (this.vy += .5, this.x += this.vx, this.y += this.vy, 0 <= this.y && (this.vy -= 1, this.vy *= .8, this.vx *= .9, this.is_fish_hitting ? (this.y <= 20 && this.vy <= 1 && (this.vy += 6), this.fish_hit_timer -= 1, this.fish_hit_timer <= 0 && (this.is_fish_hitting = !1)) : 0 < this.waiting_hit_timer ? this.waiting_hit_timer -= 1 : (this.waiting_hit_timer = this.waiting_hit_timer_base * (Math.random() + .2), this.is_fish_hitting = !0, this.vy += 6, this.fish_hit_timer = 200))));
    }

    on_draw(t) {
      t.strokeStyle = "rgb(200,200,200)", null != this.hit_item && t.drawImage(this.hit_item.get_image(), this.x - 16, this.y - 16, 32, 32), this.is_working && t.drawImage(this.image, this.x - 16, this.y - 16, 32, 32);
    }

  }

  class w extends t {
    constructor(t) {
      super(t), this.game = t, this.vx = 3, this.image = this.game.image_library.get_image("./img/wind_effect.png");
    }

    on_update() {
      super.on_update(), this.x += this.vx;
      let t = this.game.world.ship.get_ship_block(this.x, this.y);
      t && (t.saving_data.is_mast_open && (this.game.world.ship.on_oar(150), this.is_alive = !1), t.is_floor && (this.is_alive = !1));
      let i = this.game.world.player;
      i.x - 30 < this.x && this.x < i.x + 30 && i.y - 50 < this.y && this.y < i.y + 10 && (i.hit_wind(this), this.is_alive = !1);
    }

    on_draw(t) {
      t.strokeStyle = "rgb(200,0,0)", t.drawImage(this.image, this.x - 16, this.y - 16, 32, 32);
    }

  }

  class v extends t {
    constructor(t) {
      super(t), this.game = t, this.vx = -.1, this.image = this.game.image_library.get_image("cloud");
    }

    on_update() {
      super.on_update(), this.x += this.vx;
      let t = this.game.world.player;
      t.x - 64 < this.x && this.x < t.x + 64 && t.y - 48 < this.y && this.y < t.y + 48 && (this.is_alive = !1);
    }

    on_draw(t) {
      t.strokeStyle = "rgb(200,0,0)", t.drawImage(this.image, this.x - 64, this.y - 48, 128, 96);
    }

  }

  class b extends t {
    constructor(t) {
      super(t), this.game = t, this.vx = 6 * Math.random() - 3, this.vy = -3 * Math.random() - 3, this.gravity = .2, this.number = 0, this.image = this.game.image_library.get_image("yurei_youngwoman3_sad"), this.height = 100, this.width = 100, this.life_time = 100;
    }

    on_update() {
      super.on_update(), this.x += this.vx, this.y += this.vy, this.vy += this.gravity, 0 < this.life_time ? this.life_time -= 1 : this.is_alive = !1;
    }

    on_draw(t) {
      t.save(), t.translate(this.x, this.y), t.scale(-1, -1), t.drawImage(this.image, .5 * -this.width, .5 * -this.height, this.width, this.height), t.restore();
    }

  }

  class k extends t {
    constructor(t) {
      super(t), this.game = t, this.image = null, this.vx = 0, this.vy = 0, this.gravity = 0, this.line_x = 10, this.line_y = 10, this.rotation = 0, this.life_time = 100, this.knock_back_rate = 1, this.weight = 50, this.is_blaster_bullet = !1, this.damage = 11;
    }

    on_update() {
      super.on_update(), this.x += this.vx, this.y += this.vy;
      let t = this.game.world.ship.get_ship_block(this.x, this.y);
      if (t && (t.on_hit_bullet(this), this.is_alive = !1), this.game.world.player.test_hit_bullet(this) && (this.is_alive = !1), 0 < this.life_time) this.life_time -= 1;else if (this.is_alive = !1, this.is_blaster_bullet) for (let t = 0; t < 8; t++) {
        let i = Math.PI * t * .25 + .125,
            e = new k(this.game);
        e.owner_enemy = this.owner_enemy, e.damage = .25 * this.damage, e.knock_back_rate = this.knock_back_rate, e.x = this.x, e.y = this.y, e.vx = 5 * Math.cos(i), e.vy = 5 * Math.sin(i), e.life_time = 25, e.weight = this.weight, e.rotation = i, e.image = this.image, e.is_in_ship_inertial = this.is_in_ship_inertial, this.game.world.push_entity(e);
      }
    }

    on_draw(t) {
      t.save(), null != this.image ? (t.translate(this.x, this.y), t.rotate(this.rotation), t.drawImage(this.image, -16, -16, 32, 32)) : (t.strokeStyle = "rgb(250,250,20)", t.lineWidth = 5, t.beginPath(), t.moveTo(this.x, this.y), t.lineTo(this.x + this.line_x, this.y + this.line_y), t.stroke()), t.restore();
    }

  }

  class I extends t {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("fish_sakana_iwashi"), this.name = "noname enemy", this.strength_lv = 1, this.is_scouted = !1, this.width = 128, this.height = 128, this.width_half = .5 * this.width, this.height_half = .5 * this.height, this.vx = 0, this.vy = 0, this.dash_speed = 2, this.target_vy = 2 * Math.random() - 1, this.target_vx = 2 * Math.random() - 1, this.is_angry = !1, this.angry_timer_max = 500, this.angry_timer_count = 0, this.gosya_forgive_count = 1, this.is_preparing_jump = !1, this.preparing_jump_minimum_time = 50, this.preparing_jump_timer = 0, this.max_hp = 100, this.hp = 100, this.direct_damage = 7, this.knock_back_rate = 1, this.bullet_damage = 5, this.bullet_knock_back_rate = 1, this.fire_spread = 3, this.fire_spread_angle = .1, this.is_blaster_bullet = !1, this.bullet_velocity = 10, this.bullet_lifetime = 100, this.fire_cool_time = 100, this.fire_cool_time_count = 0, this.burst_fire = 1, this.burst_fire_count = this.burst_fire, this.bullet_image = null, this.poison_count = 0, this.poison_damage = 0, this.slow_count = 0, this.slow_rate = 1, this.showing_hp_timer = 0;
    }

    enemy_move_ai() {}

    test_hit(t, i) {
      return this.x - this.width_half < t && t < this.x + this.width_half && this.y - this.height_half < i && i < this.y + this.height_half;
    }

    test_hit_bullet(t) {
      if (this.test_hit(t.x, t.y)) {
        let i = t.calc_damage();

        if (this.take_damage(i), this.vx += t.vx * t.gun_data.knockback_rate, this.vy += t.vy * t.gun_data.knockback_rate, 0 < this.gosya_forgive_count) {
          this.gosya_forgive_count -= 1;
          let t = this.get_vector_to_player_with_bias(0, 0);
          this.target_vx = 2 * t.x, this.target_vy = 2 * t.y;
        } else this.hp < .9 * this.max_hp && (this.is_angry = !0, this.angry_timer_count = this.angry_timer_max);

        return 0 < t.gun_data.poison_damage && (this.poison_damage = t.gun_data.poison_damage, this.poison_count = 255), 0 < t.gun_data.slow_rate && (this.slow_rate = 1 - t.gun_data.slow_rate, this.slow_count = 255), 0 < t.gun_data.life_leech && this.game.world.player.health.mod_hp(t.gun_data.life_leech), !0;
      }

      return !1;
    }

    take_damage(t) {
      this.hp -= t;
      let i = new s(this.game);
      i.x = this.x, i.y = this.y, i.number = t, this.game.world.push_entity(i), this.hp <= 0 && this.on_die(), this.showing_hp_timer = 250;
    }

    test_hit_ship() {
      let t = this.game.world.ship,
          i = t.get_ship_block(this.x, this.y);
      null != i && (i.take_damage(this.direct_damage), this.take_damage(i.kickback_damage), this.vx < t.velocity ? (this.vx *= -1.1, this.vx += 2 * t.velocity, this.x += t.velocity) : (this.vx *= -1.1, this.x -= 16), this.vy < 0 ? (this.vy *= -1.1, this.y += 16) : (this.vy *= -1.1, this.y -= 16), this.on_hit_ship());
    }

    on_hit_ship() {}

    on_hit_player() {}

    on_die() {
      this.is_alive = !1, this.game.world.push_entity(this.get_dead_body()), this.game.world.push_entity(this.get_drop_item());
    }

    get_dead_body() {
      let t = new b(this.game);
      return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t.image = this.image, t;
    }

    get_drop_item() {
      let t = new h(this.game);
      return t.x = this.x, t.y = this.y, t.set_tool_item(this.get_drop_tool_item()), t;
    }

    get_drop_tool_item() {
      return new y(this.game);
    }

    get_distance_p2_to_player() {
      let t = this.game.world.player.x - this.x,
          i = this.game.world.player.y - this.y;
      return t * t + i * i;
    }

    get_distance_to_player() {
      let t = this.game.world.player.x - this.x,
          i = this.game.world.player.y - this.y;
      Math.sqrt(t * t + i * i);
    }

    get_vector_to_point(t, i) {
      let e = t - this.x,
          s = i - this.y,
          _ = Math.sqrt(e * e + s * s);

      return e /= _, s /= _, {
        x: e,
        y: s
      };
    }

    get_vector_to_player() {
      let t = this.game.world.player.x - this.x,
          i = this.game.world.player.y - this.y,
          e = Math.sqrt(t * t + i * i);
      return t /= e, i /= e, {
        x: t,
        y: i
      };
    }

    get_vector_to_player_with_bias(t, i) {
      let e = this.game.world.player.x - this.x + t,
          s = this.game.world.player.y - this.y + i,
          _ = Math.sqrt(e * e + s * s);

      return e /= _, s /= _, {
        x: e,
        y: s
      };
    }

    fire_bullet() {
      let t = Math.atan2(this.game.world.player.y - this.y, this.game.world.player.x - this.x);

      for (let i = 0; i < this.fire_spread; i++) {
        let e = new k(this.game);
        e.owner_enemy = this, e.damage = this.bullet_damage, e.knock_back_rate = this.bullet_knock_back_rate;
        let s = t;

        if (0 < i) {
          let t = this.fire_spread_angle;

          for (let e = 1; e <= i; e++) t *= -e, s += t;
        }

        e.vx = Math.cos(s) * this.bullet_velocity, e.vy = Math.sin(s) * this.bullet_velocity, e.x = this.x + e.vx, e.y = this.y + e.vy, e.life_time = this.bullet_lifetime, 0 < this.is_blaster_bullet && (e.is_blaster_bullet = !0), e.rotation = s, e.image = this.bullet_image, e.is_in_ship_inertial = this.is_in_ship_inertial, this.game.world.push_entity(e);
      }
    }

    on_update() {
      super.on_update(), this.enemy_move_ai(), 0 < this.poison_count && (this.poison_count -= 1, this.poison_count % 50 == 0 && this.take_damage(this.poison_damage)), 0 < this.slow_count && (this.slow_count -= 1), 0 < this.angry_timer_count && !this.game.world.player.is_ghost ? this.angry_timer_count -= 1 : this.is_angry = !1, this.game.world.player.test_hit_enemy(this) && (this.vx = -this.vx, this.vy = -this.vy, this.on_hit_player(), this.take_damage(this.game.world.player.kickback_damage)), this.test_hit_ship(), 0 < this.showing_hp_timer && (this.showing_hp_timer -= 1);
    }

    on_draw(t) {
      if (t.drawImage(this.image, this.x - .5 * this.width, this.y - .5 * this.height, this.width, this.height), 0 < this.showing_hp_timer) {
        const i = 16,
              e = this.x,
              s = this.y;
        t.strokeStyle = "rgb(200,200,200)", t.fillStyle = "rgb(40,30,20)", t.beginPath(), t.arc(e, s, i, 0, 2 * Math.PI, !0), t.fill(), t.fillStyle = "rgb(20,200,20)", t.beginPath(), t.moveTo(e, s), t.arc(e, s, i, -.5 * Math.PI, -.5 * Math.PI - 2 * Math.PI * (this.hp / this.max_hp), !0), t.fill();
      }
    }

  }

  class E extends I {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("bird_kamome"), this.width = 64, this.height = 64, this.width_half = .5 * this.width, this.height_half = .5 * this.height, this.max_hp = 100, this.hp = 100, this.is_in_ship_inertial = !0, this.is_angry = !0, this.angry_timer_max = 500, this.angry_timer_count = this.angry_timer_max, this.showing_hp_timer = 0, this.vx = 0, this.vy = 0, this.dash_speed = .2, this.position_x = 0, this.position_y = 0, this.do_fire_attack = !1, this.fire_spread = 1, this.fire_spread_angle = .1, this.bullet_lifetime = 100, this.bullet_velocity = 5, this.do_tackle_attack = !1, this.tackle_timer_max = 200, this.tackle_timer_count = 0, this.is_in_tackle = !1, this.distance_from_ship = 100, this.is_fly_above = !1, this.is_back_attack = !1, this.drop_tool_item = new y(this.game), this.bullet_image = null, this.reset_position();
    }

    reset_position() {
      return this.is_fly_above ? (this.position_x = this.game.world.ship.get_left_side_x() + (this.game.world.ship.get_right_side_x() - this.game.world.ship.get_left_side_x()) * Math.random(), void (this.position_y = this.game.world.ship.get_top_y() - .5 * this.distance_from_ship - this.distance_from_ship * Math.random())) : this.is_back_attack ? (this.position_x = this.game.world.ship.get_left_side_x() - .5 * this.distance_from_ship - this.distance_from_ship * Math.random(), void (this.position_y = Math.random() * this.game.world.ship.get_top_y() - 10)) : (this.position_x = this.game.world.ship.get_right_side_x() + .5 * this.distance_from_ship + this.distance_from_ship * Math.random(), void (this.position_y = Math.random() * this.game.world.ship.get_top_y() - 10));
    }

    get_drop_tool_item() {
      return this.drop_tool_item;
    }

    set_max_hp(t) {
      this.max_hp = t, this.hp = t;
    }

    enemy_move_ai() {
      if (this.game.world.player.is_ghost) return void (0 < this.x ? (this.vx += this.dash_speed, this.vy -= this.dash_speed) : (this.vx -= this.dash_speed, this.vy -= this.dash_speed));
      let t = this.get_vector_to_point(this.position_x, this.position_y);
      this.vx += t.x * this.dash_speed, this.vy += t.y * this.dash_speed, this.is_in_tackle ? Math.abs(this.position_x - this.x) + Math.abs(this.position_y - this.y) < 50 && (this.reset_position(), this.is_in_tackle = !1) : Math.random() < .01 && this.reset_position(), this.do_tackle_attack && (0 < this.tackle_timer_count ? this.tackle_timer_count -= 1 : (this.tackle_timer_count = this.tackle_timer_max, this.position_x = 0, this.position_y = -50, this.is_in_tackle = !0)), this.do_fire_attack && (0 < this.fire_cool_time_count ? this.fire_cool_time_count -= 1 : (this.fire_bullet(), this.fire_cool_time_count = this.fire_cool_time, 1 < this.burst_fire_count ? (this.burst_fire_count -= 1, this.fire_cool_time_count = 10) : this.burst_fire_count = this.burst_fire));
    }

    on_hit_ship() {
      this.reset_position(), this.is_in_tackle = !1;
    }

    on_hit_player() {
      this.reset_position(), this.is_in_tackle = !1;
    }

    on_update() {
      super.on_update(), this.x += this.vx, this.y += this.vy, this.vx *= .95, this.vy *= .95, this.vx, this.game.world.ship.velocity;
    }

    on_draw(t) {
      super.on_draw(t);
    }

  }

  class x extends i {
    constructor(t) {
      super(t), this.saving_data.materials_id = [], this.saving_data.materials_count = [], this.saving_data.item_name = "noname resource";
    }

    add_material(t, i) {
      this.saving_data.materials_id.push(t), this.saving_data.materials_count.push(i);
    }

    on_click(t, i, e, s) {
      for (let t = 0; t < this.saving_data.materials_id.length; t++) this.game.materials.put_material(this.saving_data.materials_id[t], this.saving_data.materials_count[t]);

      this.is_consumed = !0;
    }

  }

  class S extends u {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("food_tebasaki"), this.saving_data.item_name = "焼き鳥", this.saving_data.hunger_value = 40, this.saving_data.thirst_value = 0, this.saving_data.is_be_leftover = !0;
    }

  }

  class O extends u {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("yakitori_kawa"), this.saving_data.item_name = "鳥の干し肉", this.saving_data.hunger_value = 30, this.saving_data.thirst_value = 0, this.saving_data.is_be_leftover = !0;
    }

  }

  class C extends u {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("food_chicken_tebasaki_nama"), this.saving_data.item_name = "鳥肉", this.saving_data.hunger_value = 20, this.saving_data.thirst_value = 5, this.saving_data.is_be_leftover = !0;
    }

    get_cooked_item() {
      return new S(this.game);
    }

    get_dried_item() {
      return new O(this.game);
    }

  }

  class N extends S {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("food_chicken_tebamoto");
    }

  }

  class L extends C {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("food_chicken_tebamoto_nama");
    }

    get_cooked_item() {
      return new N(this.game);
    }

  }

  class M {
    constructor(t) {
      this.game = t;
    }

    generate_by_ship_level(t) {
      let i = new E(this.game);
      i.strength_lv = 10 * (t + 1), i.max_hp = i.strength_lv * (10 - Math.random()), i.hp = i.max_hp, i.power = i.strength_lv;
      let e = 10;
      return e = 3 <= t || 2 <= t ? 100 : 1 <= t ? 50 : 10, e *= Math.random(), e < 6 ? (i.image = this.game.image_library.get_image("bird_hachidori"), i.name = "ハチドリ", i.do_tackle_attack = !0, i.set_max_hp(15), i.direct_damage = 8, Math.random() < .5 ? i.drop_tool_item = this.drop_material("hachidori_wing", ["feather", "cloth"], [10, 3]) : i.drop_tool_item = this.random_chicken()) : e < 11 ? (i.image = this.game.image_library.get_image("bird_toki_fly"), i.name = "トキ", i.do_fire_attack = !0, i.do_tackle_attack = !0, i.set_max_hp(15), i.direct_damage = 4, i.bullet_damage = 4, i.bullet_image = this.game.image_library.get_image("bullet_feather_white"), Math.random() < .5 ? i.drop_tool_item = this.drop_material("toki_wing", ["feather", "stone"], [10, 3]) : i.drop_tool_item = this.random_chicken()) : e < 21 ? (i.image = this.game.image_library.get_image("bird_tonbi"), i.name = "トビ", i.is_fly_above = !0, i.do_fire_attack = !0, i.do_tackle_attack = !0, i.distance_from_ship = 250, i.set_max_hp(30), i.direct_damage = 12, i.bullet_damage = 12, i.bullet_image = this.game.image_library.get_image("bullet_feather_white"), Math.random() < .8 ? i.drop_tool_item = this.drop_material("tonbi_wing", ["feather", "stone"], [20, 10]) : i.drop_tool_item = this.random_chicken()) : e < 31 ? (i.image = this.game.image_library.get_image("animal_washi"), i.name = "ワシ", i.bullet_image = this.game.image_library.get_image("bullet_feather_white"), i.is_back_attack = !0, i.do_fire_attack = !0, i.set_max_hp(30), i.direct_damage = 12, i.bullet_damage = 12, Math.random() < .8 ? i.drop_tool_item = this.drop_material("washi_wing", ["feather", "cloth"], [20, 10]) : i.drop_tool_item = this.random_chicken()) : e < 41 ? (i.image = this.game.image_library.get_image("dinosaur_quetzalcoatlus"), i.name = "ケツァルコアトル", i.do_fire_attack = !0, i.bullet_image = this.game.image_library.get_image("bullet_thunder"), i.set_max_hp(40), i.direct_damage = 12, i.bullet_damage = 12, Math.random() < .99 ? i.drop_tool_item = this.drop_material("quetzalcoatlus_beak", ["parts", "iron", "lead"], [3, 10, 10]) : i.drop_tool_item = this.random_chicken()) : e < 51 ? (i.image = this.game.image_library.get_image("kodai_microraptor"), i.name = "ミクロラプトル", i.do_fire_attack = !0, i.do_tackle_attack = !0, i.set_max_hp(40), i.direct_damage = 18, i.bullet_damage = 7, i.bullet_image = this.game.image_library.get_image("bullet_thunder"), Math.random() < .99 ? i.drop_tool_item = this.drop_material("microraptor_wing", ["parts", "iron", "plastic"], [3, 10, 10]) : i.drop_tool_item = this.random_chicken()) : e < 67 ? (i.image = this.game.image_library.get_image("fantasy_griffon"), i.name = "グリフォン", i.set_max_hp(90), i.is_fly_above = !0, i.do_fire_attack = !0, i.direct_damage = 25, i.bullet_damage = 7, i.fire_spread = 3, i.fire_spread_angle = .2, i.bullet_image = this.game.image_library.get_image("bullet_feather_white"), Math.random() < .8 ? i.drop_tool_item = this.drop_material("griffon_wing", ["circuit", "silver"], [10, 10]) : i.drop_tool_item = this.random_chicken()) : e < 83 ? (i.image = this.game.image_library.get_image("fantasy_peryton"), i.name = "ペガシカ", i.set_max_hp(100), i.do_fire_attack = !0, i.distance_from_ship = 250, i.direct_damage = 25, i.bullet_damage = 7, i.burst_fire = 5, i.bullet_image = this.game.image_library.get_image("bullet_thunder"), Math.random() < .9 ? i.drop_tool_item = this.drop_material("peryton_wing", ["circuit", "silver"], [10, 10]) : i.drop_tool_item = this.random_chicken()) : e < 101 ? (i.image = this.game.image_library.get_image("youkai_suzaku"), i.name = "火の鳥", i.set_max_hp(80), i.do_fire_attack = !0, i.do_tackle_attack = !0, i.direct_damage = 25, i.bullet_damage = 20, i.bullet_lifetime = 20, i.is_blaster_bullet = !0, i.bullet_image = this.game.image_library.get_image("bullet_fire"), Math.random() < .9 ? i.drop_tool_item = this.drop_material("suzaku_wing", ["circuit", "silver"], [10, 10]) : i.drop_tool_item = this.random_chicken()) : e < 999 ? (i.image = this.game.image_library.get_image("fantasy_dragon_wyvern"), i.name = "ワイバーン") : (enemy_type, i.image = this.game.image_library.get_image("fantasy_dragon"), i.name = "ドラゴン"), i;
    }

    drop_material(t, i, e) {
      let s = new x(this.game);
      s.set_image(t);

      for (let t = 0; t < i.length; t++) {
        let _ = Math.floor(Math.max(e[t] * (1.5 * Math.random() + .5), 1));

        s.add_material(i[t], _);
      }

      return s;
    }

    random_chicken() {
      return Math.random() < .5 ? new L(this.game) : new C(this.game);
    }

  }

  class R extends I {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("bird_kamome"), this.name = "カモメ", this.strength_lv = 3, this.width = 64, this.height = 40, this.width_half = .5 * this.width, this.height_half = .5 * this.height, this.max_hp = 10, this.hp = 10, this.vx = 0, this.vy = 0, this.dash_speed = .1, this.direct_damage = 9, this.knock_back_rate = 1, this.target_vx = -3, this.target_vy = 0, this.target_height = -200, this.gosya_forgive_count = 0;
    }

    get_drop_tool_item() {
      if (2 * Math.random() < 1) {
        let t = new x(this.game);
        return t.set_image("feather_white"), t.add_material("feather", Math.floor(2 * Math.random()) + 1), t;
      }

      return Math.random() < .5 ? new L(this.game) : new C(this.game);
    }

    enemy_move_ai() {
      if (this.is_angry) {
        if (this.is_preparing_jump) {
          let t = this.get_vector_to_player_with_bias(0, 64);
          this.vx += -t.x * this.dash_speed, this.vy += -(t.y - .1) * this.dash_speed, Math.random() < .1 && 4e4 < this.get_distance_p2_to_player() && (this.is_preparing_jump = !1);
        } else {
          let t = this.get_vector_to_player_with_bias(0, 0);
          this.vx += t.x * this.dash_speed, this.vy += t.y * this.dash_speed, Math.random() < .01 && (this.is_preparing_jump = !0);
        }

        0 < this.y && (this.is_preparing_jump = !0);
      } else this.vx < this.target_vx ? this.vx += this.dash_speed : this.vx -= this.dash_speed, this.y < this.target_height ? this.vy += this.dash_speed : this.vy -= this.dash_speed, Math.random() < .3 && (this.target_vy += this.dash_speed), Math.random() < .3 && (this.target_vy -= this.dash_speed);
    }

    on_update() {
      super.on_update(), this.x += this.vx, this.y += this.vy, this.vx *= .99, this.vy *= .99, 0 < this.y && (this.vy -= 2, this.target_vy = -2);
    }

    on_draw(t) {
      super.on_draw(t);
    }

  }

  class A extends I {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("fish_tobiuo2"), this.width = 64, this.height = 40, this.width_half = .5 * this.width, this.height_half = .5 * this.height, this.max_hp = 30, this.hp = 30, this.vx = 0, this.vy = 0, this.dash_speed = .2, this.is_angry = !1, this.showing_hp_timer = 0, this.is_angry = !1, this.is_preparing_jump = !1, this.preparing_jump_minimum_time = 50, this.preparing_jump_timer = 0, this.direct_damage = 9, this.knock_back_rate = 1, this.target_vy = 0, this.target_vx = -99, this.reset_target_coodinate();
    }

    reset_target_coodinate() {
      this.target_x = 50 * Math.random() + 200 + this.game.world.ship.get_right_side_x(), this.target_y = 50 * Math.random() + 100, this.x < 0 && (this.target_x = -50 * Math.random() - 200 + this.game.world.ship.get_left_side_x());
    }

    get_drop_tool_item() {
      if (2 * Math.random() < 1) {
        let t = new x(this.game);
        return t.set_image("fish_fin"), t.add_material("fin", Math.floor(3 * Math.random()) + 3), t;
      }

      return new y(this.game);
    }

    enemy_move_ai() {
      if (this.is_angry) {
        if (this.is_in_sea) {
          if (this.is_preparing_jump) {
            let t = this.target_x - this.x,
                i = this.target_y - this.y;
            Math.abs(t) < 10 && Math.abs(i) < 10 ? (this.is_preparing_jump = !1, this.target_vy = -99, this.target_vx = -99, this.x < 0 && (this.target_vx = 99)) : (this.target_vx = t, this.target_vy = i);
          }
        } else this.is_preparing_jump = !0;
      } else this.target_vy < 10 && this.y < 300 && Math.random() < .1 && (this.target_vy += 2), -10 < this.target_vy && Math.random() < .1 && (this.target_vy -= 2), this.target_vx = -10;
      this.is_in_sea && (this.vx < this.target_vx ? this.vx += this.dash_speed : this.vx -= this.dash_speed, this.vy < this.target_vy ? this.vy += this.dash_speed : this.vy -= this.dash_speed);
    }

    take_damage(t) {
      super.take_damage(t), this.reset_target_coodinate();
    }

    on_hit_ship() {
      this.is_preparing_jump = !0, this.target_vx = -this.target_vx, this.target_vy = 10;
    }

    on_update() {
      if (super.on_update(), this.x += this.vx, this.y += this.vy, 0 < this.y) this.is_in_sea = !0, this.vx *= .95, this.vy *= .95;else {
        this.is_in_sea = !1;
        let t = .1;
        t = Math.max(.01, t), this.vy += t, this.target_vy = 5;
      }
    }

    on_draw(t) {
      super.on_draw(t);
    }

  }

  class X extends t {
    constructor(t) {
      super(t), this.game = t, this.name = "名もなき弾丸", this.image = null, this.rotation = 0, this.image_size = 32, this.vx = 0, this.vy = 0, this.gravity = 0, this.line_x = 10, this.line_y = 10, this.life_time = 200, this.knock_back_rate = .2, this.weight = 50, this.is_blaster_bullet = !1, this.gun_data = {};
    }

    on_update() {
      super.on_update(), this.x += this.vx, this.y += this.vy, 0 < this.y ? this.vy -= .001 * (100 - this.weight) : this.vy += .001 * this.weight;

      for (let t of this.game.world.enemy_list) if (null != t && 0 != t.is_alive && t.test_hit_bullet(this)) {
        this.is_alive = !1;
        break;
      }

      if (0 < this.life_time) this.life_time -= 1;else if (this.is_alive = !1, this.is_blaster_bullet) for (let t = 0; t < 8; t++) {
        let i = Math.PI * t * .25 + .125,
            e = new X(this.game);
        e.x = this.x, e.y = this.y, e.vx = Math.cos(i) * this.gun_data.blast_velocity, e.vy = Math.sin(i) * this.gun_data.blast_velocity, e.life_time = this.gun_data.blast_lifetime, e.weight = this.weight, e.rotation = i, e.gun_data = this.gun_data, this.game.world.push_entity(e);
      }
    }

    calc_damage() {
      let t = this.gun_data.basic_power;
      return Math.random() <= this.gun_data.critical_chance && (t *= this.gun_data.critical_chance_damage), Math.abs(this.life_time - this.gun_data.critical_range_lifetime) < this.gun_data.critical_range_lifetime_window && (t *= this.gun_data.critical_range_damage), t;
    }

    on_draw(t) {
      t.save(), t.translate(this.x, this.y), t.rotate(this.rotation), null != this.image ? t.drawImage(this.image, -.5 * this.image_size, -.5 * this.image_size, this.image_size, this.image_size) : (t.strokeStyle = "rgb(250,250,20)", t.lineWidth = 5, t.beginPath(), t.moveTo(0, 0), t.lineTo(this.x, this.y), t.stroke()), t.restore();
    }

  }

  class G extends i {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("text_mu"), this.saving_data.item_name = "無名の武器", this.bullet_image = this.game.image_library.get_image("bullet_arrow"), this.saving_data.basic_power = 10, this.saving_data.cool_time = 50, this.saving_data.fire_spread = 1, this.saving_data.fire_spread_angle = .1, this.saving_data.bullet_lifetime = 50, this.saving_data.bullet_velocity = 10, this.saving_data.bullet_weight = 50, this.saving_data.blast_lifetime = 0, this.saving_data.blast_velocity = 0, this.saving_data.critical_range_lifetime = 0, this.saving_data.critical_range_lifetime_window = 0, this.saving_data.critical_range_damage = 0, this.saving_data.critical_chance = 0, this.saving_data.critical_chance_damage = 1, this.saving_data.knockback_rate = .1, this.saving_data.poison_damage = 0, this.saving_data.slow_rate = 0, this.saving_data.life_leech = 0, this.saving_data.bullet_color = "rgb(250,0,250)", this.cool_time_count = 0;
    }

    set_bullet_image(t) {
      this.bullet_image = this.game.image_library.get_image(t), this.saving_data.bullet_image_name = t;
    }

    calc_damage() {
      return this.saving_data.basic_power;
    }

    on_update() {
      0 < this.cool_time_count && (this.cool_time_count -= 1);
    }

    on_attack(t, i, e, s) {
      let _ = this.game.world.player.get_vector_to_cursor(),
          a = this.game.world.player.get_radian_to_cursor();

      for (let t = 0; t < this.saving_data.fire_spread; t++) {
        let i = new X(this.game);
        i.x = this.game.world.player.x + 30 * _.x, i.y = this.game.world.player.y + 30 * _.y;
        let e = a;

        if (0 < t) {
          let i = 1;
          t % 2 == 0 && (i = -1), e += this.saving_data.fire_spread_angle * Math.ceil(.5 * t) * i;
        }

        i.vx = Math.cos(e) * this.saving_data.bullet_velocity, i.vy = Math.sin(e) * this.saving_data.bullet_velocity, i.vx += this.game.world.player.vx, i.vy += this.game.world.player.vy, this.game.world.player.is_in_ship_inertial && (i.vx += this.game.world.ship.velocity), i.life_time = this.saving_data.bullet_lifetime, i.weight = this.saving_data.bullet_weight, 0 < this.saving_data.blast_lifetime && (i.is_blaster_bullet = !0), i.rotation = e, i.image = this.bullet_image, i.gun_data = this.saving_data, this.game.world.push_entity(i);
      }
    }

    on_click(t, i, e, s) {
      0 < this.cool_time_count ? Math.random() < .01 && this.game.log("[Tips] 押しっぱなしでも連射できます。") : (this.on_attack(t, i, e, s), this.cool_time_count = this.saving_data.cool_time);
    }

    on_keep_click(t, i, e, s) {
      0 < this.cool_time_count || (this.on_attack(t, i, e, s), this.cool_time_count = this.saving_data.cool_time);
    }

    dump_information_to_log() {
      this.game.log("名前 : " + this.saving_data.item_name), this.game.log("攻撃力  : " + this.saving_data.basic_power);
      let t = Math.floor(this.saving_data.cool_time / 50 * 1e3);
      this.game.log("クールタイム: " + t + "ms");
      let i = Math.floor(this.saving_data.bullet_lifetime / 50 * 1e3),
          e = Math.floor(50 * this.saving_data.bullet_velocity / 32);
      this.game.log("飛翔速度,時間: " + e + "m/s, " + i + "ms"), this.game.log("弾の重さ: " + this.saving_data.bullet_weight + "%");
      let s = Math.floor(100 * this.saving_data.knockback_rate);

      if (this.game.log("ノックバック: " + s + "%"), 1 < this.saving_data.fire_spread) {
        let t = Math.floor(this.saving_data.fire_spread_angle / Math.PI * 180 * this.saving_data.fire_spread);
        this.game.log("散弾数, 角度: " + this.saving_data.fire_spread + ", " + t + "度");
      }

      if (0 < this.saving_data.blast_lifetime) {
        let t = 50 * this.saving_data.blast_velocity / 32,
            i = Math.floor(this.saving_data.blast_lifetime / 50 * 1e3);
        this.game.log("爆発速度,時間: " + t + "m/s, " + i + "ms");
      }

      if (0 < this.saving_data.critical_chance) {
        let t = Math.floor(100 * this.saving_data.critical_chance),
            i = Math.floor(100 * this.saving_data.critical_chance_damage);
        this.game.log("クリティカル確率,倍率: " + t + "%, " + i + "%");
      }

      if (0 < this.saving_data.critical_range_lifetime) {
        let t = Math.floor(this.saving_data.critical_range_lifetime / 50 * 1e3),
            i = Math.floor(this.saving_data.critical_range_lifetime_window / 50 * 1e3),
            e = Math.floor(100 * this.saving_data.critical_range_damage);
        this.game.log("クリティカル距離,猶予,倍率: " + t + "ms, " + i + "ms, " + e + "%");
      }

      if (0 < this.saving_data.poison_damage && this.game.log("毒ダメージ: " + this.saving_data.poison_damage), 0 < this.saving_data.slow_rate) {
        let t = Math.floor(100 * this.saving_data.slow_rate);
        this.game.log("減速効果: -" + t + "%");
      }

      0 < this.saving_data.life_leech && this.game.log("自己回復効果: " + this.saving_data.life_leech);
    }

    load_data(t) {
      super.load_data(t), this.saving_data.bullet_image_name && this.set_bullet_image(this.saving_data.bullet_image_name);
    }

  }

  class H extends t {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("small_star6_orange"), this.name = "noname breakobj", this.strength_lv = 1, this.is_scouted = !1, this.width = 128, this.height = 128, this.width_half = .5 * this.width, this.height_half = .5 * this.height, this.vx = 0, this.vy = 0, this.max_hp = 100, this.hp = 100;
    }

    generate_object() {
      let t = this.y / 32;
      this.max_hp = 100, this.hp = this.max_hp, t < -8 ? (this.image = this.game.image_library.get_image("cloud"), this.name = "雲") : 2 < t ? (this.image = this.game.image_library.get_image("kaisou_wakame"), this.name = "海藻") : this.is_alive = !1;
    }

    take_damage(t) {
      this.hp -= t;
      let i = new s(this.game);
      i.x = this.x, i.y = this.y, i.number = t, this.game.world.push_entity(i), this.hp <= 0 && this.on_die(), this.showing_hp_timer = 250;
    }

    test_hit(t, i) {
      return this.x - this.width_half < t && t < this.x + this.width_half && this.y - this.height_half < i && i < this.y + this.height_half;
    }

    test_hit_bullet(t) {
      if (this.test_hit(t.x, t.y)) {
        let i = t.calc_damage();
        return this.take_damage(i), this.vx += t.vx * t.gun_data.knockback_rate, this.vy += t.vy * t.gun_data.knockback_rate, !0;
      }

      return !1;
    }

    on_die() {
      this.is_alive = !1, this.game.world.push_entity(this.get_dead_body());
    }

    get_dead_body() {
      let t = new b(this.game);
      return t.x = this.x, t.y = this.y, t.width = this.width, t.height = this.height, t.image = this.image, t;
    }

    get_drop_item() {
      let t = new h(this.game);
      return t.x = this.x, t.y = this.y, t.set_tool_item(this.get_drop_tool_item()), t;
    }

    get_drop_tool_item() {
      let t = new G(this.game);
      return t.generate_random_weapon(this.strength_lv, null), t;
    }

    on_update() {
      super.on_update();
    }

    on_draw(t) {
      if (t.drawImage(this.image, this.x - .5 * this.width, this.y - .5 * this.height, this.width, this.height), 0 < this.showing_hp_timer) {
        const i = 16,
              e = this.x,
              s = this.y;
        t.strokeStyle = "rgb(200,200,200)", t.fillStyle = "rgb(40,30,20)", t.beginPath(), t.arc(e, s, i, 0, 2 * Math.PI, !0), t.fill(), t.fillStyle = "rgb(20,200,20)", t.beginPath(), t.moveTo(e, s), t.arc(e, s, i, -.5 * Math.PI, -.5 * Math.PI - 2 * Math.PI * (this.hp / this.max_hp), !0), t.fill();
      }
    }

  }

  class U {
    constructor(i, e) {
      this.game = i, this.world = e, this.drifting_spawn_interval = 400, this.drifting_spawn_timer = 0, this.sight_distance = 1100, this.despawn_distance = t.DESPAWN_DISTANCE, this.ship_progress = 0, this.surface_generator = new M(this.game);

      for (let t = 0; t < 10; t++) this.spawn_wind();
    }

    on_update() {
      if (0 < this.drifting_spawn_timer) this.drifting_spawn_timer -= 1 + Math.floor(3 * this.world.ship.velocity);else {
        this.drifting_spawn_timer = this.drifting_spawn_interval + this.drifting_spawn_interval * Math.random();
        let t = new h(this.game);
        t.x = this.sight_distance;
        let i = this.game.materials.balance.get_drifting_item();
        t.set_tool_item(i), this.world.entity_list.push(t), t = new h(this.game), t.x = -this.sight_distance, i = this.game.materials.balance.get_drifting_item(), t.set_tool_item(i), this.world.entity_list.push(t);
      }

      if (Math.random() < .1 && this.spawn_wind(), this.ship_progress += this.game.world.ship.velocity, 1 < this.ship_progress && (this.ship_progress -= 500, this.spawn_surface()), Math.random() < .1 && this.world.enemy_list.filter(function (t) {
        return t instanceof H;
      }).length < 20) {
        let t = new H(this.game);
        this.set_coodinate_randomly(t), this.game.world.player.is_in_ship ? this.move_outsight_right(t) : this.move_outsight_random(t), t.generate_object(), this.world.push_enemy(t);
      }

      if (Math.random() < .01 && this.world.enemy_list.filter(function (t) {
        return t instanceof A;
      }).length < 3) {
        let t = new A(this.game);
        t.x = this.world.camera.x + this.sight_distance + 100 * Math.random(), t.y = 200 - 100 * Math.random(), this.world.push_enemy(t);
      }

      if (Math.random() < .01 && this.world.enemy_list.filter(function (t) {
        return t instanceof R;
      }).length < 3) {
        let t = new R(this.game);
        t.x = this.world.camera.x + this.sight_distance + 100 * Math.random(), t.y = this.game.world.ship.get_top_y() - 100 - 100 * Math.random(), t.target_height = t.y, this.world.push_enemy(t);
      }
    }

    spawn_surface() {
      let t = this.surface_generator.generate_by_ship_level(this.game.world.ship.ship_level);
      t.x = 1e3, t.y = -100, this.move_outsight_right(t), this.world.push_enemy(t);
    }

    spawn_wind() {
      if (this.world.entity_list.filter(function (t) {
        return t instanceof w;
      }).length < 100) {
        let t = new w(this.game);
        this.set_coodinate_randomly(t), this.move_outsight_random(t), -100 < t.y && (t.y = -200 * Math.random(), Math.random() < .3 ? this.move_outsight_left(t) : this.move_outsight_right(t)), this.world.entity_list.push(t);
      }
    }

    spawn_cloud() {
      if (this.world.entity_list.filter(function (t) {
        return t instanceof v;
      }).length < 10) {
        let t = new v(this.game);
        if (this.set_coodinate_randomly(t), this.move_outsight_right(t), -100 < t.y) return;
        this.world.entity_list.push(t);
      }
    }

    set_coodinate_randomly(t) {
      t.x = this.world.camera.x + Math.random() * this.despawn_distance * 2 - this.despawn_distance, t.y = this.world.camera.y + Math.random() * this.despawn_distance * 2 - this.despawn_distance;
    }

    move_outsight_random(t) {
      let i = 4 * Math.random();
      i < 1 ? this.move_outsight_up(t) : i < 2 ? this.move_outsight_down(t) : i < 3 ? this.move_outsight_left(t) : this.move_outsight_right(t);
    }

    move_outsight_right(t) {
      this.check_is_in_sight(t.x, t.y) && (t.x = this.world.camera.x + this.sight_distance + 200 * Math.random());
    }

    move_outsight_left(t) {
      this.check_is_in_sight(t.x, t.y) && (t.x = this.world.camera.x - this.sight_distance - 200 * Math.random());
    }

    move_outsight_up(t) {
      this.check_is_in_sight(t.x, t.y) && (t.y = this.world.camera.y - this.sight_distance - 200 * Math.random());
    }

    move_outsight_down(t) {
      this.check_is_in_sight(t.x, t.y) && (t.y = this.world.camera.y + this.sight_distance + 200 * Math.random());
    }

    check_is_in_sight(t, i) {
      return this.world.camera.x - this.sight_distance < t && t < this.world.camera.x + this.sight_distance && this.world.camera.y - this.sight_distance < i && i < this.world.camera.y + this.sight_distance;
    }

    initial_placed_object() {
      for (let t = -5; t <= 10; t++) {
        let i = null;
        i = new H(this.game), i.x = 200 * t + 200 * Math.random(), i.y = 100 + 600 * Math.random(), i.generate_object(), this.world.push_enemy(i), i = new H(this.game), i.x = 200 * t + 200 * Math.random(), i.y = -280 - 600 * Math.random(), i.generate_object(), this.world.push_enemy(i);
      }
    }

  }

  class D {
    constructor(t) {
      this.name = "world", this.game = t, this.camera = {}, this.camera.x = 1e3, this.camera.y = 0, this.camera.zoom = 1, this.cursor_x = 0, this.cursor_y = 0, this.entity_list = [], this.enemy_list = [], this.player = new l(this.game), this.ship = new g(this.game), this.lure = new T(this.game), this.back_ground = new c(this.game), this.world_spawner = new U(this.game, this), this.auto_save_timer_max = 9e3, this.auto_save_timer = this.auto_save_timer_max, this.sea_offset_x = 0, this.sea_waving = 0;
      let i = new w(this.game);
      i.x = 500, i.y = -100, this.push_entity(i), this.world_spawner.initial_placed_object();
    }

    newgame_gift() {
      let t = new h(this.game);
      t.x = -32, t.y = -100;
      let i = new x(this.game);
      i.saving_data.item_name = "流木", i.set_image("tree_ryuuboku"), i.add_material("wood", 5), t.set_tool_item(i), this.entity_list.push(t), t = new h(this.game), t.x = 32, t.y = -150, i = new x(this.game), i.saving_data.item_name = "古着", i.set_image("alohashirt_gray"), i.add_material("cloth", 3), t.set_tool_item(i), this.entity_list.push(t);
    }

    count_enemy() {
      let t = 0;

      for (let i of this.enemy_list) null != i && t++;

      return t;
    }

    push_enemy(t) {
      this.enemy_list.push(t);
    }

    push_entity(t) {
      this.entity_list.push(t);
    }

    search_nearest_enemy(t, i) {
      let e = 1e6,
          s = null;

      for (let _ of this.enemy_list) if (null != _ && 1 == _.is_angry) {
        let a = (_.x - t) * (_.x - t) + (_.y - i) * (_.y - i);
        a < e && (s = _, e = a);
      }

      return s;
    }

    give_tool_item_player(t) {
      let i = new h(this.game);
      i.set_tool_item(t), i.x = this.game.world.player.x, i.y = this.game.world.player.y, this.entity_list.push(i);
    }

    drop_tool_item_at_player(t) {
      let i = new h(this.game);
      i.set_tool_item(t), i.x = this.game.world.player.x, this.game.world.player.is_facing_right ? i.x += 32 : i.x -= 32, i.y = this.game.world.player.y, this.entity_list.push(i);
    }

    on_update() {
      0 < this.auto_save_timer ? this.auto_save_timer -= 1 : (this.auto_save_timer = this.auto_save_timer_max, this.game.save_data_manager.save_game("save_data_auto"), this.game.log("オートセーブしました。"), this.entity_list = this.entity_list.filter(t => t), this.enemy_list = this.enemy_list.filter(t => t)), this.game.input_controller.is_down_key.ShiftLeft && (this.game.input_controller.is_wheel_up ? this.zoom_in(!0) : this.game.input_controller.is_wheel_down && this.zoom_out(!0)), this.camera.x + 50 < this.player.x && (this.camera.x += .05 * (this.player.x - this.camera.x)), this.player.x < this.camera.x - 50 && (this.camera.x += .05 * (this.player.x - this.camera.x)), this.camera.y < this.player.y - 50 && (this.camera.y += .05 * (this.player.y - this.camera.y)), this.player.y + 50 < this.camera.y && (this.camera.y += .05 * (this.player.y - this.camera.y)), this.world_spawner.on_update();

      for (let t = 0; t < this.entity_list.length; t++) this.entity_list[t] && (this.entity_list[t].on_update(), this.entity_list[t].is_alive || (this.entity_list[t] = null));

      for (let t = 0; t < this.enemy_list.length; t++) this.enemy_list[t] && (this.enemy_list[t].on_update(), this.enemy_list[t].is_alive || (this.enemy_list[t] = null));

      this.cursor_x = (this.game.input_controller.mouse_x - this.game.SCREEN_WIDTH_HALF) / this.camera.zoom + this.camera.x, this.cursor_y = (this.game.input_controller.mouse_y - this.game.SCREEN_HEIGHT_HALF) / this.camera.zoom + this.camera.y, this.ship.on_update(), this.player.on_update(), this.lure.on_update(), this.sea_offset_x -= this.ship.velocity, this.sea_offset_x < -D.SEA_WAVE_SPACE_2 && (this.sea_offset_x += D.SEA_WAVE_SPACE_2), this.sea_waving += .01, 2 * Math.PI < this.sea_waving && (this.sea_waving -= 2 * Math.PI), this.back_ground.on_update();
    }

    zoom_in(t) {
      this.camera.zoom *= 1.4, t ? this.game.log("カメラ倍率:" + this.camera.zoom) : 2 <= this.camera.zoom && (this.camera.zoom = 2);
    }

    zoom_out(t) {
      this.camera.zoom *= .7, t ? this.game.log("カメラ倍率:" + this.camera.zoom) : this.camera.zoom <= .5 && (this.camera.zoom = .5);
    }

    draw_sea(t) {
      t.strokeStyle = "rgb(0,100,200)", t.beginPath();
      let i = Math.floor(this.camera.x / D.SEA_WAVE_SPACE_2) * D.SEA_WAVE_SPACE_2 - 1e3;
      t.moveTo(i + this.sea_offset_x, 0);

      for (let e = 0; e < D.SEA_WAVE_COUNT; e++) {
        let s = 1;
        e % 2 == 0 && (s = -1), t.lineTo(D.SEA_WAVE_SPACE * e + i + this.sea_offset_x, 5 * s * Math.max(-1, Math.min(1, 2 * Math.sin(this.sea_waving))));
      }

      t.lineTo(2e3 + i + this.sea_offset_x, 0), t.stroke();
    }

    on_draw(t) {
      this.back_ground.on_draw(t), t.save(), t.translate(this.game.SCREEN_WIDTH_HALF, this.game.SCREEN_HEIGHT_HALF), t.scale(this.camera.zoom, this.camera.zoom), t.translate(-this.camera.x, -this.camera.y), this.ship.on_draw(t), this.player.on_draw(t), this.lure.on_draw(t);

      for (let i = 0; i < this.entity_list.length; i++) this.entity_list[i] && this.entity_list[i].on_draw(t);

      for (let i = 0; i < this.enemy_list.length; i++) this.enemy_list[i] && this.enemy_list[i].on_draw(t);

      this.draw_sea(t), t.strokeStyle = "rgb(250,20,20)", t.strokeRect(this.cursor_x - 10, this.cursor_y - 10, 20, 20), t.restore();
    }

  }

  _defineProperty(D, "SEA_WAVE_COUNT", 40);

  _defineProperty(D, "SEA_WAVE_SPACE", 2e3 / D.SEA_WAVE_COUNT);

  _defineProperty(D, "SEA_WAVE_SPACE_2", 2 * D.SEA_WAVE_SPACE);

  class P {
    constructor(t) {
      this.game = t, this.cursor_index = 0, this.menu_icon = this.game.image_library.get_image("kaizoku_takarabako"), this.mouse_holding_index = -1, this.trashed_item = null, this.trash_icon = this.game.image_library.get_image("gomi_poribaketsu_close");
    }

    get_menu_icon() {
      return this.menu_icon;
    }

    on_update() {
      if (this.game.input_controller.get_press_right() && (this.cursor_index += 1), this.game.input_controller.get_press_left() && (this.cursor_index -= 1), this.game.input_controller.get_press_up() && P.LIST_X_COUNT < this.cursor_index && (this.cursor_index -= P.LIST_X_COUNT), this.game.input_controller.get_press_down() && P.LIST_X_COUNT + this.cursor_index < 25 && (this.cursor_index += P.LIST_X_COUNT), this.game.input_controller.is_pressed_key.Digit1 && (this.mouse_holding_index = -1, this.swap_item_slot(0)), this.game.input_controller.is_pressed_key.Digit2 && (this.mouse_holding_index = -1, this.swap_item_slot(1)), this.game.input_controller.is_pressed_key.Digit3 && (this.mouse_holding_index = -1, this.swap_item_slot(2)), this.game.input_controller.is_pressed_key.Digit4 && (this.mouse_holding_index = -1, this.swap_item_slot(3)), this.game.input_controller.is_pressed_key.Digit5 && (this.mouse_holding_index = -1, this.swap_item_slot(4)), this.game.input_controller.is_pressed_key.Digit6 && (this.mouse_holding_index = -1, this.swap_item_slot(5)), this.game.input_controller.is_pressed_key.Digit7 && (this.mouse_holding_index = -1, this.swap_item_slot(6)), this.game.input_controller.is_pressed_key.Digit8 && (this.mouse_holding_index = -1, this.swap_item_slot(7)), this.game.input_controller.is_pressed_key.Digit9 && (this.mouse_holding_index = -1, this.swap_item_slot(8)), (this.game.input_controller.get_press_enter() || this.game.input_controller.get_press_space()) && (this.mouse_holding_index = -1, this.swap_item_slot(this.game.hud.item_slot.item_slot_cursor)), this.game.input_controller.get_mouse_press()) {
        let t = this.game.input_controller.mouse_x - Ut.MENU_MARGIN_LEFT,
            i = this.game.input_controller.mouse_y - Ut.MENU_MARGIN_TOP;

        for (let e = 0; e < this.game.inventory.item_inventory_size; e++) {
          let s = e % P.LIST_X_COUNT,
              _ = Math.floor(e / P.LIST_X_COUNT),
              a = P.LIST_X + s * (P.LIST_ICON_SIZE + P.LIST_SPACING),
              h = P.LIST_Y + _ * (P.LIST_ICON_SIZE + P.LIST_SPACING);

          if (a < t && t < a + P.LIST_ICON_SIZE && h < i && i < h + P.LIST_ICON_SIZE) {
            this.click_inventory(e);
            break;
          }
        }

        P.TRASH_X < t && t < P.TRASH_X + P.LIST_ICON_SIZE && P.TRASH_Y < i && i < P.TRASH_Y + P.LIST_ICON_SIZE && (this.mouse_holding_index < 0 ? this.game.hud.item_slot.is_mouse_holding ? (this.trashed_item = this.game.hud.item_slot.item_slot[this.game.hud.item_slot.item_slot_cursor], this.game.hud.item_slot.item_slot[this.game.hud.item_slot.item_slot_cursor] = null, this.game.hud.item_slot.is_mouse_holding = !1) : null != this.trashed_item ? this.game.hud.item_slot.put_pickup_item(this.trashed_item, !0) ? this.trashed_item = null : this.game.log("アイテムスロットに空きを作ってください。") : (this.game.log("それはゴミ箱スロットです。"), this.game.log("いらないアイテムを置いて消去できます。"), this.game.log("間違ったものを捨てた場合、次のゴミを捨てるまでは、"), this.game.log("クリックすることで取り戻せます。")) : (this.trashed_item = this.game.inventory.tool_item_inventory[this.mouse_holding_index], this.game.inventory.tool_item_inventory[this.mouse_holding_index] = null, this.mouse_holding_index = -1));
      }
    }

    click_inventory(t) {
      if (this.mouse_holding_index < 0) {
        if (this.game.hud.item_slot.is_mouse_holding) {
          let i = this.game.hud.item_slot.item_slot[this.game.hud.item_slot.item_slot_cursor];
          this.game.hud.item_slot.item_slot[this.game.hud.item_slot.item_slot_cursor] = this.game.inventory.tool_item_inventory[t], this.game.inventory.tool_item_inventory[t] = i, this.game.hud.item_slot.is_mouse_holding = !1;
        } else null != this.game.inventory.tool_item_inventory[t] && (this.mouse_holding_index = t);
      } else {
        let i = this.game.inventory.tool_item_inventory[t];
        this.game.inventory.tool_item_inventory[t] = this.game.inventory.tool_item_inventory[this.mouse_holding_index], this.game.inventory.tool_item_inventory[this.mouse_holding_index] = i, this.mouse_holding_index = -1;
      }
    }

    swap_item_slot(t) {
      let i = this.game.hud.item_slot.item_slot[t];
      this.game.hud.item_slot.item_slot[t] = this.game.inventory.tool_item_inventory[this.cursor_index], this.game.inventory.tool_item_inventory[this.cursor_index] = i, this.game.hud.item_slot.refresh();
    }

    on_draw(t) {
      t.fillStyle = P.TITLE_COLOR, t.font = P.TITLE_FONT, t.fillText("インベントリ Inventory", P.TITLE_X, P.TITLE_Y);

      for (let i = 0; i < this.game.inventory.item_inventory_size; i++) {
        this.cursor_index == i ? t.strokeStyle = P.LIST_ICON_FRAME_COLOR_SELECTED : t.strokeStyle = P.LIST_ICON_FRAME_COLOR;

        let e = i % P.LIST_X_COUNT,
            s = Math.floor(i / P.LIST_X_COUNT),
            _ = P.LIST_X + e * (P.LIST_ICON_SIZE + P.LIST_SPACING),
            a = P.LIST_Y + s * (P.LIST_ICON_SIZE + P.LIST_SPACING);

        null != this.game.inventory.tool_item_inventory[i] && this.game.inventory.tool_item_inventory[i].image && i != this.mouse_holding_index && (t.drawImage(this.game.inventory.tool_item_inventory[i].image, _, a, P.LIST_ICON_SIZE, P.LIST_ICON_SIZE), t.font = "bold 16px monospace", t.fillStyle = "rgb(100,100,100)", t.fillText(this.game.inventory.tool_item_inventory[i].get_subtitle(), _ + 3, a + P.LIST_ICON_SIZE - 3)), t.strokeRect(_, a, P.LIST_ICON_SIZE, P.LIST_ICON_SIZE);
      }

      null != this.trashed_item ? (t.drawImage(this.trashed_item.image, P.TRASH_X, P.TRASH_Y, P.LIST_ICON_SIZE, P.LIST_ICON_SIZE), t.font = "bold 16px monospace", t.fillStyle = "rgb(100,100,100)", t.fillText(this.trashed_item.get_subtitle(), P.TRASH_X + 3, P.TRASH_Y + P.LIST_ICON_SIZE - 3)) : t.drawImage(this.trash_icon, P.TRASH_X, P.TRASH_Y, P.LIST_ICON_SIZE, P.LIST_ICON_SIZE), t.strokeRect(P.TRASH_X, P.TRASH_Y, P.LIST_ICON_SIZE, P.LIST_ICON_SIZE), 0 <= this.mouse_holding_index && t.drawImage(this.game.inventory.tool_item_inventory[this.mouse_holding_index].image, this.game.input_controller.mouse_x - Ut.MENU_MARGIN_LEFT, this.game.input_controller.mouse_y - Ut.MENU_MARGIN_TOP, P.LIST_ICON_SIZE, P.LIST_ICON_SIZE);
    }

  }

  _defineProperty(P, "TITLE_X", 100);

  _defineProperty(P, "TITLE_Y", 40);

  _defineProperty(P, "TITLE_COLOR", "rgb(40,30,20)");

  _defineProperty(P, "TITLE_FONT", "bold 32px monospace");

  _defineProperty(P, "LIST_X", 20);

  _defineProperty(P, "LIST_Y", 80);

  _defineProperty(P, "LIST_ICON_SIZE", 50);

  _defineProperty(P, "LIST_SPACING", 10);

  _defineProperty(P, "LIST_X_COUNT", 5);

  _defineProperty(P, "LIST_Y_COUNT", 4);

  _defineProperty(P, "LIST_ICON_FRAME_COLOR", "rgb(40,30,20)");

  _defineProperty(P, "LIST_ICON_FRAME_COLOR_SELECTED", "rgb(200,20,20)");

  _defineProperty(P, "TRASH_X", 560);

  _defineProperty(P, "TRASH_Y", 20);

  class F extends Object {
    constructor(t) {
      super(t), this.game = t;
    }

    setup_recipe(t, i) {
      t.add_recipe(i, ["風を受けて空に舞い上がるための傘です。"], ["plastic", "feather"], [5, 5], function (t) {
        let i = new a(t);
        return i.set_image("./img/illustya/rain_kasa_red.png"), i.saving_data.equip_part = a.EQUIP_GLIDER, i.saving_data.riseup_power = 100, i.saving_data.fall_speed_reduce = .3, i.saving_data.item_subtitle = "Lv1", i;
      }, "Lv1"), t.add_recipe(i, ["風を受けて空に舞い上がるための傘です。", "Lv3"], ["plastic", "feather"], [5, 5], function (t) {
        let i = new a(t);
        return i.set_image("tenshi_wing2"), i.saving_data.equip_part = a.EQUIP_GLIDER, i.saving_data.riseup_power = 200, i.saving_data.fall_speed_reduce = .7, i.saving_data.damage_reduce = .5, i.saving_data.item_subtitle = "Lv3", i;
      }, "Lv3"), t.add_recipe(i, ["風を受けて空に舞い上がるための傘です。", "Lv5"], ["plastic", "feather"], [5, 5], function (t) {
        let i = new a(t);
        return i.set_image("airplane_ornithopter"), i.saving_data.equip_part = a.EQUIP_GLIDER, i.saving_data.riseup_power = 1e4, i.saving_data.fall_speed_reduce = .7, i.saving_data.item_subtitle = "Lv5", i;
      }, "Lv5"), t.add_recipe(i, ["空中で素早く移動するための翼です。"], ["feather"], [5], function (t) {
        let i = new a(t);
        return i.set_image("./img/illustya/feather_red.png"), i.saving_data.equip_part = a.EQUIP_WING, i.saving_data.midair_speed = 2, i.saving_data.damage_reduce = .2, i.saving_data.item_subtitle = "Lv1", i;
      }, "Lv1"), t.add_recipe(i, ["海に潜るためのゴーグルです。"], ["plastic", "fin"], [5, 5], function (t) {
        let i = new a(t);
        return i.set_image("./img/illustya/snorkel_goggle.png"), i.saving_data.equip_part = a.EQUIP_GOGGLE, i.saving_data.underwater_speed = 0, i.saving_data.stamina_reduce = .8, i.saving_data.damage_reduce = 0, i.saving_data.item_subtitle = "Lv1", i;
      }, "Lv1"), t.add_recipe(i, ["海に潜るためのゴーグルです。"], ["plastic", "fin"], [5, 5], function (t) {
        let i = new a(t);
        return i.set_image("./img/illustya/snorkel_goggle.png"), i.saving_data.equip_part = a.EQUIP_GOGGLE, i.saving_data.underwater_speed = 0, i.saving_data.stamina_reduce = .9, i.saving_data.damage_reduce = .5, i.saving_data.item_subtitle = "Lv2", i;
      }, "Lv2"), t.add_recipe(i, ["海に潜るためのゴーグルです。"], ["plastic", "fin"], [5, 5], function (t) {
        let i = new a(t);
        return i.set_image("./img/illustya/snorkel_goggle.png"), i.saving_data.equip_part = a.EQUIP_GOGGLE, i.saving_data.underwater_speed = 0, i.saving_data.stamina_reduce = .99, i.saving_data.damage_reduce = .9, i.saving_data.item_subtitle = "Lv5", i;
      }, "Lv5"), t.add_recipe(i, ["水中で素早く移動するためのヒレです。"], ["fin"], [5], function (t) {
        let i = new a(t);
        return i.set_image("./img/illustya/snorkel_fin.png"), i.saving_data.equip_part = a.EQUIP_FIN, i.saving_data.underwater_speed = 1, i.saving_data.damage_reduce = 0, i.saving_data.item_subtitle = "Lv1", i;
      }, "Lv1"), t.add_recipe(i, ["水中で素早く移動するためのヒレです。"], ["fin"], [5], function (t) {
        let i = new a(t);
        return i.set_image("./img/illustya/snorkel_fin.png"), i.saving_data.equip_part = a.EQUIP_FIN, i.saving_data.underwater_speed = 2, i.saving_data.damage_reduce = .2, i.saving_data.item_subtitle = "Lv2", i;
      }, "Lv2"), t.add_recipe(i, ["水中で素早く移動するためのヒレです。"], ["fin"], [5], function (t) {
        let i = new a(t);
        return i.set_image("./img/illustya/snorkel_fin.png"), i.saving_data.equip_part = a.EQUIP_FIN, i.saving_data.underwater_speed = 5, i.saving_data.damage_reduce = .9, i.saving_data.item_subtitle = "Lv5", i;
      }, "Lv5");
    }

  }

  class B extends _ {
    constructor(t) {
      super(t), this.name = "名もなきブロック", this.is_floor = !0, this.set_image("ship_floor");
    }

    set_image(t) {
      this.saving_data.image_name = t, this.image = this.game.image_library.get_image(t);
    }

    save_data() {
      return this.saving_data.max_hp = this.max_hp, this.saving_data.is_floor = this.is_floor, super.save_data();
    }

    load_data(t) {
      super.load_data(t), this.set_image(this.saving_data.image_name), this.max_hp = this.saving_data.max_hp, this.is_floor = this.saving_data.is_floor;
    }

  }

  class z extends Object {
    constructor(t) {
      super(t), this.game = t, this.ship = this.game.world.ship, this.image_star = this.game.image_library.get_image("small_star7_yellow"), this.star_x = [], this.star_y = [], this.star_num = 10;

      for (let t = 0; t < this.star_num; t++) this.star_x[t] = Math.random() * this.game.SCREEN_WIDTH, this.star_y[t] = Math.random() * this.game.SCREEN_HEIGHT;
    }

    on_update() {
      this.game.input_controller.is_down_key.KeyX;

      for (let t = 0; t < this.star_num; t++) this.star_y[t] += 5 * Math.random() + 10, this.game.SCREEN_HEIGHT < this.star_y[t] && (this.star_x[t] = Math.random() * this.game.SCREEN_WIDTH, this.star_y[t] = -100 * Math.random());
    }

    on_draw(t) {
      for (let i = 0; i < this.star_num; i++) t.drawImage(this.image_star, this.star_x[i], this.star_y[i]);

      t.font = "bold 64px monospace", t.strokeStyle = "rgb(250,250,250)", t.fillStyle = "rgb(250,250,250)", t.strokeText("Victory!!", 100, 150), t.save(), t.translate(this.game.SCREEN_WIDTH_HALF, this.game.SCREEN_HEIGHT_HALF), t.translate(5 * Math.random(), 5 * Math.random()), this.ship.on_draw(t), t.restore();
    }

  }

  class W extends _ {
    constructor(t) {
      super(t), this.name = "ヴィクトリーロケット", this.is_floor = !0, this.image = this.game.image_library.get_image("hanabi_rocket");
    }

    on_update() {
      super.on_update();
    }

    on_interact() {
      this.game.movie_playing = new z(this.game);
    }

  }

  class Y extends _ {
    constructor(t) {
      super(t), this.name = "レベルフラッグ[1]", this.image = this.game.image_library.get_image("undoukai_flag1_i"), this.is_active = !1, this.ship_level_value = 1;
    }

    on_interact() {}

  }

  class Z extends Y {
    constructor(t) {
      super(t), this.name = "レベルフラッグ[2]", this.image = this.game.image_library.get_image("undoukai_flag2_i"), this.ship_level_value = 2;
    }

  }

  class K extends Y {
    constructor(t) {
      super(t), this.name = "レベルフラッグ[3]", this.image = this.game.image_library.get_image("undoukai_flag3_i"), this.ship_level_value = 3;
    }

  }

  class j extends Object {
    constructor(t) {
      super(t), this.game = t;
    }

    setup_recipe(t, i) {
      t.add_recipe(i, ["船の床ブロックです。", "使用して配置できます。"], ["wood"], [10], function (t) {
        return new e(t).set_ship_block(new n(t));
      }, ""), t.add_recipe(i, ["船の床ブロックです。", "使用して配置できます。"], ["stone"], [10], function (t) {
        let i = new B(t);
        return i.set_image("ship_floor_stone"), new e(t).set_ship_block(i);
      }, ""), t.add_recipe(i, ["船の床ブロックです。", "使用して配置できます。"], ["jar"], [10], function (t) {
        let i = new B(t);
        return i.set_image("ship_floor_glass"), new e(t).set_ship_block(i);
      }, ""), t.add_recipe(i, ["船の床ブロックです。", "使用して配置できます。"], ["iron"], [10], function (t) {
        let i = new B(t);
        return i.set_image("ship_floor_iron"), new e(t).set_ship_block(i);
      }, ""), t.add_recipe(i, ["船の床ブロックです。", "使用して配置できます。"], ["plastic"], [10], function (t) {
        let i = new B(t);
        return i.set_image("ship_floor_plastic"), new e(t).set_ship_block(i);
      }, ""), t.add_recipe(i, ["船の床ブロックです。", "使用して配置できます。"], ["silver"], [10], function (t) {
        let i = new B(t);
        return i.set_image("ship_floor_silver"), new e(t).set_ship_block(i);
      }, ""), t.add_recipe(i, ["ヴィクトリーロケット。", "これを設置して作動させたら*勝利*です。"], ["fuel"], [99], function (t) {
        return new e(t).set_ship_block(new W(t));
      }, ""), t.add_recipe(i, ["舟の骨組みです。", "床と違って上に乗れません。"], ["wood"], [1], function (t) {
        return new e(t).set_ship_block(new r(t));
      }, ""), t.add_recipe(i, ["設置すると舟レベルを[1]に上げます。", "上位の敵が出現します。"], ["wood", "cloth", "feather"], [20, 15, 10], function (t) {
        return new e(t).set_ship_block(new Y(t));
      }, ""), t.add_recipe(i, ["設置すると舟レベルを[2]に上げます。", "上位の敵が出現します。"], ["plastic", "lead"], [30, 15], function (t) {
        return new e(t).set_ship_block(new Z(t));
      }, ""), t.add_recipe(i, ["設置すると舟レベルを[3]に上げます。", "上位の敵が出現します。"], ["silver", "fur", "feather"], [50, 30, 100], function (t) {
        return new e(t).set_ship_block(new K(t));
      }, "");
    }

  }

  class q {
    constructor(t) {
      this.game = t, this.start = {}, this.goal = {}, this.start.x = 0, this.start.y = 0, this.goal.x = 0, this.goal.y = 0, this.path = [], this.ship_map = [], this.is_processing = !1, this.is_finding_success = !1, this.delay = 0, this.delay_count = this.delay;
    }

    make_path_node(t, i) {
      return {
        x: t,
        y: i,
        go_up: !0,
        go_down: !0,
        go_left: !0,
        go_right: !0
      };
    }

    init_finding(t, i, e, s) {
      this.start.x = t, this.start.y = i, this.goal.x = e, this.goal.y = s, this.path = [], this.is_processing = !0, this.is_finding_success = !1, this.ship_map = [];

      for (let t = 0; t < this.game.world.ship.block_array.length; t++) {
        this.ship_map[t] = [];

        for (let i = 0; i < this.game.world.ship.block_array[t].length; i++) {
          this.ship_map[t][i] = 0;
          let e = this.game.world.ship.get_ship_block_by_index(t, i + 1);
          null != e && e.is_floor && (this.ship_map[t][i] = 1);
        }
      }

      this.path.push(this.make_path_node(t, i));
    }

    process_finding() {
      if (0 < this.delay_count) return this.delay_count -= 1, null;
      this.delay_count = this.delay;
      let t = this.path[this.path.length - 1];
      if (0 != this.path.length) {
        if (t.x < 0 || this.ship_map.length <= t.x || t.y < 0 || this.ship_map[t.x].length <= t.y) this.path.pop();else {
          if (t.x == this.goal.x && t.y == this.goal.y) return this.is_processing = !1, void (this.is_finding_success = !0);
          if (0 != this.ship_map[t.x][t.y]) return t.x, this.goal.x, t.y, this.goal.y, t.go_right ? (t.go_right = !1, void (this.check_path_overrapping(t.x + 1, t.y) && this.path.push(this.make_path_node(t.x + 1, t.y)))) : t.go_left ? (t.go_left = !1, void (this.check_path_overrapping(t.x - 1, t.y) && this.path.push(this.make_path_node(t.x - 1, t.y)))) : t.go_up ? (t.go_up = !1, void (this.check_path_overrapping(t.x, t.y - 1) && this.path.push(this.make_path_node(t.x, t.y - 1)))) : t.go_down ? (t.go_down = !1, void (this.check_path_overrapping(t.x, t.y + 1) && this.path.push(this.make_path_node(t.x, t.y + 1)))) : (this.ship_map[t.x][t.y] = 0, void this.path.pop());
          this.path.pop();
        }
      } else this.is_processing = !1;
    }

    check_path_overrapping(t, i) {
      for (let e of this.path) if (e.x == t && e.y == i) return !1;

      return !0;
    }

    on_draw(t) {
      t.strokeStyle = "rgb(200,200,200)", t.beginPath(), t.moveTo((-this.game.world.ship.ship_offset_x + this.start.x) * _.BLOCK_SIZE, (-this.game.world.ship.ship_offset_y + this.start.y) * _.BLOCK_SIZE);

      for (let i of this.path) t.lineTo((-this.game.world.ship.ship_offset_x + i.x) * _.BLOCK_SIZE, (-this.game.world.ship.ship_offset_y + i.y) * _.BLOCK_SIZE);

      t.stroke();
    }

  }

  class Q extends i {
    constructor(t) {
      super(t), this.saving_data.item_name = "固形燃料", this.image = this.game.image_library.get_image("cooking_kokei_nenryou"), this.ammo_type = "fuel", this.ammo_value = 100, this.fuel_value = 100;
    }

    on_click(t, i, e, s) {
      this.game.log("これは燃料固形です。"), this.game.log("燃料を必要とする設備に補充できます。");
    }

  }

  class V extends i {
    constructor(t) {
      super(t), this.saving_data.item_name = "弾薬", this.image = this.game.image_library.get_image("bullet_item"), this.ammo_type = "gun", this.ammo_value = 100;
    }

    on_click(t, i, e, s) {
      this.game.log("これは弾薬です。"), this.game.log("弾薬を必要とする設備に補充できます。");
    }

  }

  class J extends i {
    constructor(t) {
      super(t), this.saving_data.item_name = "砲弾", this.image = this.game.image_library.get_image("cannonball_item"), this.ammo_type = "cannon", this.ammo_value = 100;
    }

    on_click(t, i, e, s) {
      this.game.log("これは砲弾です。"), this.game.log("砲弾を必要とする設備に補充できます。");
    }

  }

  class $ extends t {
    constructor(t) {
      super(t), this.name = "イヌ型ロボット", this.x = 0, this.y = 0, this.vx = 0, this.vy = 0, this.is_landing = !1, this.height = 32, this.height_half = .5 * this.height, this.image = this.game.image_library.get_image("pet_robot_dog"), this.home_cell_x = 1, this.home_cell_y = 1, this.home_block = null, this.current_work = 0, this.carrying_item = null, this.path_finding = new q(this.game), this.path_leading_index = 0, this.path_leading_time_limit_max = 50, this.path_leading_time_limit_count = this.path_leading_time_limit_max, this.cooldown_time_count = 0, this.cooldown_time_max = 50, this.dash_speed = 3, this.interact_range = 900, this.hp_max = 100, this.hp = this.hp_max;
    }

    on_update() {
      super.on_update(), this.vy += .5, this.x += this.vx, this.y += this.vy, this.vx *= .5, this.vy *= .99, 1 < this.vy && (this.is_landing = !1), this.x, this.game.world.ship.ship_offset_x;
      let t = this.y + this.game.world.ship.ship_offset_y * _.BLOCK_SIZE + _.BLOCK_RADIUS + this.height_half,
          i = this.game.world.ship.get_ship_block(this.x, this.y + this.height_half);
      if (t % _.BLOCK_SIZE < 8 && null != i && i.is_floor) if (this.is_off_platform) ;else {
        let i = Math.floor(t / _.BLOCK_SIZE);
        this.y = (i - this.game.world.ship.ship_offset_y) * _.BLOCK_SIZE - _.BLOCK_RADIUS - this.height_half, this.vy = 0, this.is_landing = !0, this.is_in_ship_inertial = !0;
      }
      this.is_off_platform = !1, 0 <= this.y && (this.is_alive = !1), 0 < this.cooldown_time_count ? this.cooldown_time_count -= 1 : this.path_finding.is_processing ? this.path_finding.process_finding() : this.path_finding.is_finding_success ? this.on_lead_path() : this.on_think_ai();
    }

    ai_healing_self() {
      return this.hp < .3 * this.hp_max && (this.set_target_place(this.home_cell_x, this.home_cell_y), !0);
    }

    ai_delivery_item() {
      if (null != this.carrying_item) {
        let t = this.game.world.ship.search_block_in_nearest_in_condition(this.x, this.y, function (t) {
          return t.accept_ammo_type && this.carrying_item.ammo_type == t.accept_ammo_type && t.saving_data.ammo_amount < 50;
        }.bind(this));
        if (t) return this.check_block_is_in_range(t) ? (t.deposit_item(this.carrying_item) ? this.carrying_item = null : (this.carrying_item = null, this.game.log("ボットがアイテムの投入に失敗")), !0) : (this.set_target_place(t.cell_x, t.cell_y), !0);
      }

      return !1;
    }

    ai_operate_weapon() {
      let t = this.game.world.ship.search_block_in_nearest_in_condition(this.x, this.y, function (t) {
        return 0 < t.angry_timer_count;
      });
      return !!t && (this.check_block_is_in_range(t) ? (t.on_operate(this), this.set_cooldown(), !0) : (this.set_target_place(t.cell_x, t.cell_y), !0));
    }

    ai_supply_ammo() {
      let t = this.game.world.ship.search_block_in_nearest_in_condition(this.x, this.y, function (t) {
        return t.accept_ammo_type && t.saving_data.ammo_amount < 50;
      });

      if (t) {
        let i = this.game.world.ship.search_block_in_nearest_in_condition(this.x, this.y, function (t) {
          if (t == this.home_block) return !0;
        }.bind(this));
        if (i) return this.check_block_is_in_range(i) ? (i == this.home_block && ("gun" == t.accept_ammo_type ? this.carrying_item = new V(this.game) : "cannon" == t.accept_ammo_type ? this.carrying_item = new J(this.game) : "fuel" == t.accept_ammo_type && (this.carrying_item = new Q(this.game))), !0) : (this.set_target_place(i.cell_x, i.cell_y), !0);
      }

      return !1;
    }

    on_think_ai() {
      return !!(this.ai_healing_self() || this.ai_delivery_item() || this.ai_operate_weapon() || this.ai_supply_ammo() || this.set_cooldown());
    }

    set_cooldown() {
      this.cooldown_time_count = this.cooldown_time_max;
    }

    check_block_is_in_range(t) {
      return (this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y) < this.interact_range;
    }

    set_target_place(t, i) {
      this.path_leading_index = 0, this.path_leading_time_limit_count = this.path_leading_time_limit_max;
      let e = this.game.world.ship;
      this.path_finding.init_finding(e.local_to_cell_x(e.global_to_local_x(this.x)), e.local_to_cell_y(e.global_to_local_y(this.y)), t, i);
    }

    on_lead_path() {
      if (this.path_finding.path.length <= this.path_leading_index) return void this.on_think_ai();
      if (!(0 < this.path_leading_time_limit_count)) return void this.on_think_ai();
      this.path_leading_time_limit_count -= 1;
      let t = this.game.world.ship.cell_to_global_x(this.path_finding.path[this.path_leading_index].x),
          i = this.game.world.ship.cell_to_global_y(this.path_finding.path[this.path_leading_index].y),
          e = t - this.x,
          s = i - this.y;
      10 < e && (this.vx += 1), e < -10 && (this.vx -= 1), 10 < s && (this.is_off_platform = !0), s < -10 && this.is_landing && (this.vy = -6, this.is_landing = !1), Math.abs(e) <= 10 && Math.abs(s) <= 10 && (this.path_leading_index += 1, this.path_leading_time_limit_count = this.path_leading_time_limit_max);
    }

    on_draw(t) {
      t.strokeStyle = "rgb(200,200,200)", t.drawImage(this.image, this.x - 16, this.y - 16, 32, 32), this.carrying_item && t.drawImage(this.carrying_item.get_image(), this.x - 16, this.y - 32, 32, 32), this.path_finding.on_draw(t);
    }

  }

  _defineProperty($, "WORK_HEAL", 10);

  _defineProperty($, "WORK_SUECIDE", 15);

  _defineProperty($, "WORK_OPERATE", 20);

  _defineProperty($, "WORK_CRAFT", 40);

  _defineProperty($, "WORK_REPAIR", 50);

  _defineProperty($, "WORK_CARRY", 60);

  _defineProperty($, "WORK_PICKUP", 70);

  _defineProperty($, "WORK_DROP_CHEST", 80);

  _defineProperty($, "WORK_FISHING", 90);

  class tt extends _ {
    constructor(t) {
      super(t), this.name = "イヌハウス", this.image = this.game.image_library.get_image("inugoya_blue"), this.respawn_timer_max = 50, this.respawn_timer_count = this.respawn_timer_max, this.active_bot = null, this.spawn_new_bot();
    }

    create_new_bot() {
      return new $(this.game);
    }

    spawn_new_bot() {
      this.active_bot = this.create_new_bot(), this.active_bot.x = this.x, this.active_bot.y = this.y, this.active_bot.home_block = this, this.active_bot.home_cell_x = this.cell_x, this.active_bot.home_cell_y = this.cell_y, this.game.world.push_entity(this.active_bot);
    }

    on_update() {
      0 == this.active_bot.is_alive && (0 < this.respawn_timer_count ? this.respawn_timer_count -= 1 : (this.respawn_timer_count = this.respawn_timer_max, this.spawn_new_bot()));
    }

  }

  class it extends $ {
    constructor(t) {
      super(t), this.name = "ネコ型ロボット", this.image = this.game.image_library.get_image("pet_robot_cat");
    }

    on_think_ai() {
      return !!(this.ai_healing_self() || this.ai_delivery_item() || this.ai_supply_ammo() || this.ai_operate_weapon() || this.set_cooldown());
    }

  }

  class et extends tt {
    constructor(t) {
      super(t), this.name = "ネコハウス", this.image = this.game.image_library.get_image("inugoya");
    }

    create_new_bot() {
      return new it(this.game);
    }

  }

  class st extends _ {
    constructor(t) {
      super(t), this.name = "燃料式エンジン", this.image = this.game.image_library.get_image("car_engine"), this.saving_data.ammo_amount = 0, this.accept_ammo_type = "fuel";
    }

    on_interact() {
      return this.game.log("燃料の量: " + this.saving_data.ammo_amount), !0;
    }

    on_update() {
      super.on_update(), 0 < this.saving_data.ammo_amount && (this.saving_data.ammo_amount -= .02, this.game.world.ship.impulse_velocity(.1));
    }

    on_draw(t) {
      t.save(), 0 < this.saving_data.ammo_amount && t.translate(2 * Math.random() - 1, -4 * Math.random()), super.on_draw(t), t.restore();
    }

  }

  class _t extends _ {
    constructor(t) {
      super(t), this.name = "燃料式空気砲", this.image = this.game.image_library.get_image("air_cannon"), this.bullet_image = this.game.image_library.get_image("air_ball"), this.accept_ammo_type = "fuel", this.angry_timer_max = 300, this.angry_timer_count = 0, this.saving_data.ammo_amount = 0, this.cool_time_count = 0, this.cool_time_max = 60, this.target_enemy = null, this.target_range = 320, this.target_range_p2 = this.target_range * this.target_range, this.setup_gun_data();
    }

    setup_gun_data() {
      this.gun_data = {}, this.gun_data.basic_power = 100, this.gun_data.cool_time = 50, this.gun_data.fire_spread = 1, this.gun_data.fire_spread_angle = .1, this.gun_data.bullet_lifetime = 50, this.gun_data.bullet_velocity = 10, this.gun_data.bullet_weight = 1, this.gun_data.blast_lifetime = 0, this.gun_data.blast_velocity = 0, this.gun_data.critical_range_lifetime = 0, this.gun_data.critical_range_lifetime_window = 0, this.gun_data.critical_range_damage = 0, this.gun_data.critical_chance = 0, this.gun_data.critical_chance_damage = 1, this.gun_data.knockback_rate = 1, this.gun_data.poison_damage = 0, this.gun_data.slow_rate = 0, this.gun_data.life_leech = 0, this.gun_data.bullet_color = "rgb(250,0,250)";
    }

    on_interact() {
      return this.game.log("燃料の量: " + this.saving_data.ammo_amount), this.on_operate(), !0;
    }

    on_operate() {
      this.game.log("武器をオペレート。");
    }

    on_update() {
      super.on_update(), 0 < this.angry_timer_count && (this.angry_timer_count -= 1), 0 < this.cool_time_count ? this.cool_time_count -= 1 : 0 < this.saving_data.ammo_amount && (this.cool_time_count = this.cool_time_max, this.saving_data.ammo_amount -= 1, this.search_target(), null != this.target_enemy && (this.on_fire(), this.angry_timer_count = this.angry_timer_max));
    }

    get_radian_to_target() {
      return Math.atan2(this.target_enemy.y - this.y, this.target_enemy.x - this.x);
    }

    search_target() {
      this.target_enemy = this.game.world.search_nearest_enemy(this.x, this.y);
    }

    on_fire() {
      let t = this.get_radian_to_target(),
          i = Math.cos(t),
          e = Math.sin(t),
          s = new X(this.game);
      s.x = this.x + 30 * i, s.y = this.y + 30 * e, s.vx = i * this.gun_data.bullet_velocity, s.vy = e * this.gun_data.bullet_velocity, s.rotation = t, s.image = this.bullet_image, s.life_time = this.gun_data.bullet_lifetime, s.weight = this.gun_data.bullet_weight, s.gun_data = this.gun_data, this.game.world.push_entity(s);
    }

  }

  class at extends _t {
    constructor(t) {
      super(t), this.name = "カタパルト", this.image = this.game.image_library.get_image("catapult"), this.bullet_image = this.game.image_library.get_image("catapult_bullet"), this.accept_ammo_type = "stone", this.saving_data.fuel_amount = 0, this.cool_time_count = 0, this.cool_time_max = 50, this.target_enemy = null, this.target_range = 320, this.target_range_p2 = this.target_range * this.target_range, this.setup_gun_data();
    }

    setup_gun_data() {
      this.gun_data = {}, this.gun_data.basic_power = 30, this.gun_data.cool_time = 50, this.gun_data.fire_spread = 1, this.gun_data.fire_spread_angle = .1, this.gun_data.bullet_lifetime = 50, this.gun_data.bullet_velocity = 10, this.gun_data.bullet_weight = 1, this.gun_data.blast_lifetime = 0, this.gun_data.blast_velocity = 0, this.gun_data.critical_range_lifetime = 0, this.gun_data.critical_range_lifetime_window = 0, this.gun_data.critical_range_damage = 0, this.gun_data.critical_chance = 0, this.gun_data.critical_chance_damage = 1, this.gun_data.knockback_rate = 1, this.gun_data.poison_damage = 0, this.gun_data.slow_rate = 0, this.gun_data.life_leech = 0, this.gun_data.bullet_color = "rgb(250,0,250)";
    }

  }

  class ht extends _t {
    constructor(t) {
      super(t), this.name = "オート機関銃", this.image = this.game.image_library.get_image("machine_gun"), this.bullet_image = this.game.image_library.get_image("bullet_right"), this.accept_ammo_type = "gun", this.saving_data.fuel_amount = 0, this.cool_time_count = 0, this.cool_time_max = 10, this.target_enemy = null, this.target_range = 320, this.target_range_p2 = this.target_range * this.target_range, this.setup_gun_data();
    }

    setup_gun_data() {
      this.gun_data = {}, this.gun_data.basic_power = 100, this.gun_data.cool_time = 50, this.gun_data.fire_spread = 1, this.gun_data.fire_spread_angle = .1, this.gun_data.bullet_lifetime = 50, this.gun_data.bullet_velocity = 10, this.gun_data.bullet_weight = 1, this.gun_data.blast_lifetime = 0, this.gun_data.blast_velocity = 0, this.gun_data.critical_range_lifetime = 0, this.gun_data.critical_range_lifetime_window = 0, this.gun_data.critical_range_damage = 0, this.gun_data.critical_chance = 0, this.gun_data.critical_chance_damage = 1, this.gun_data.knockback_rate = 1, this.gun_data.poison_damage = 0, this.gun_data.slow_rate = 0, this.gun_data.life_leech = 0, this.gun_data.bullet_color = "rgb(250,0,250)";
    }

  }

  class ot extends _t {
    constructor(t) {
      super(t), this.name = "大砲", this.image = this.game.image_library.get_image("mortor"), this.bullet_image = this.game.image_library.get_image("cannonball_right"), this.accept_ammo_type = "cannon", this.saving_data.fuel_amount = 0, this.cool_time_count = 0, this.cool_time_max = 60, this.target_enemy = null, this.target_range = 320, this.target_range_p2 = this.target_range * this.target_range, this.setup_gun_data();
    }

    setup_gun_data() {
      this.gun_data = {}, this.gun_data.basic_power = 100, this.gun_data.cool_time = 50, this.gun_data.fire_spread = 1, this.gun_data.fire_spread_angle = .1, this.gun_data.bullet_lifetime = 50, this.gun_data.bullet_velocity = 10, this.gun_data.bullet_weight = 1, this.gun_data.blast_lifetime = 0, this.gun_data.blast_velocity = 0, this.gun_data.critical_range_lifetime = 0, this.gun_data.critical_range_lifetime_window = 0, this.gun_data.critical_range_damage = 0, this.gun_data.critical_chance = 0, this.gun_data.critical_chance_damage = 1, this.gun_data.knockback_rate = 1, this.gun_data.poison_damage = 0, this.gun_data.slow_rate = 0, this.gun_data.life_leech = 0, this.gun_data.bullet_color = "rgb(250,0,250)";
    }

  }

  class lt extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("science_senjoubin_empty"), this.image_filled = this.game.image_library.get_image("science_senjoubin"), this.saving_data.item_name = "蒸留ボトル", this.saving_data.is_filled = !0;
    }

    get_cooked_item() {
      return this.saving_data.is_filled = !0, this;
    }

    get_image() {
      return this.saving_data.is_filled ? this.image_filled : this.image;
    }

    on_click(t, i, e, s) {
      this.saving_data.is_filled ? (this.game.log("ボトルの水を飲みました。"), this.game.log("水分: +50%"), this.game.world.player.health.mod_thirst(50), this.saving_data.is_filled = !1) : (this.game.log("ボトルは空です。"), this.game.log("焚き火にかけて飲み水を蒸留しましょう。"));
    }

  }

  class nt extends _ {
    constructor(t) {
      super(t), this.name = "水飲み場", this.is_floor = !1, this.image = this.game.image_library.get_image("fantasy_gargoyle_water"), this.image_empty = this.game.image_library.get_image("fantasy_gargoyle"), this.saving_data.is_water_filled = !0, this.saving_data.water_fill_timer = 0, this.water_fill_timer_max = 500;
    }

    get_image() {
      return this.saving_data.is_water_filled ? this.image : this.image_empty;
    }

    on_update() {
      super.on_update(), 0 < this.saving_data.water_fill_timer ? this.saving_data.water_fill_timer -= 1 : this.saving_data.is_water_filled || (this.saving_data.water_fill_timer = this.water_fill_timer_max, this.saving_data.is_water_filled = !0);
    }

    on_interact() {
      if (this.saving_data.is_water_filled) {
        let t = this.game.hud.item_slot.get_active_item();
        t && t instanceof lt ? t.saving_data.is_filled ? this.game.log("そのボトルにはもう水が入っています。") : (t.saving_data.is_filled = !0, this.saving_data.is_water_filled = !1, this.game.log("ボトルに水を入れました。")) : .95 * this.game.world.player.health.max_thirst < this.game.world.player.health.thirst ? this.game.log("今はこれ以上飲めません。") : (this.game.log(this.get_name() + "の水を飲みました。"), this.game.log("水分: +50%"), this.game.world.player.health.mod_thirst(50), this.saving_data.is_water_filled = !1);
      } else this.game.log("飲み水がまだ足りません。"), this.game.log("充填まで約" + Math.floor(this.saving_data.water_fill_timer / 50) + "秒かかります。");

      return !0;
    }

  }

  class rt extends nt {
    constructor(t) {
      super(t), this.name = "給水バケツ", this.is_floor = !1, this.image = this.game.image_library.get_image("bucket_iron_water_up"), this.image_empty = this.game.image_library.get_image("bucket_iron_empty_up"), this.saving_data.is_water_filled = !0, this.saving_data.water_fill_timer = 0, this.water_fill_timer_max = 5e3;
    }

  }

  class mt extends u {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("tomato_red"), this.saving_data.item_name = "トマト", this.saving_data.hunger_value = 20, this.saving_data.thirst_value = 20, this.saving_data.is_be_leftover = !0;
    }

  }

  class gt extends _ {
    constructor(t) {
      super(t), this.name = "名もなきプランター", this.is_floor = !1, this.image = this.game.image_library.get_image("dougu_torobune_tsuchi"), this.image_dark = this.game.image_library.get_image("dougu_torobune_tsuchi"), this.food = null, this.saving_data.growing_timer = 0, this.growing_timer_max = 15e3, this.saving_data.water_timer = 0, this.water_timer_max = 3e3, this.water_grow_multiplyer = 3;
    }

    get_image() {
      return 0 < this.saving_data.water_timer ? this.image_dark : this.image;
    }

    on_interact() {
      if (this.food) return this.game.world.give_tool_item_player(this.food), this.food = null, this.saving_data.growing_timer = this.growing_timer_max, !0;
      {
        let t = this.game.hud.item_slot.get_active_item();

        if (t && t instanceof lt) {
          let i = !0;
          return t.saving_data.is_filled || (this.game.log("そのボトルは空っぽです。"), i = !1), 0 < this.saving_data.water_timer && (this.game.log("まだ水をやる必要はありません。"), this.game.log("約" + Math.floor(this.saving_data.water_timer / 50) + "秒後にもう一度試してください。"), i = !1), i && (t.saving_data.is_filled = !1, this.saving_data.water_timer = this.water_timer_max, this.game.log(this.name + "に水をやりました。")), !0;
        }

        this.game.log("まだ野菜がなっていません。"), this.game.log("次の収穫まで約" + Math.floor(this.saving_data.growing_timer / 50) + "秒かかります"), 0 < this.saving_data.water_timer && (this.game.log("水の効果時間: 約" + Math.floor(this.saving_data.water_timer / 50) + "秒"), this.game.log("収穫カウントが " + this.water_grow_multiplyer + " 倍の早さで進みます"));
      }
      return !1;
    }

    generate_veggie() {
      return new mt(this.game);
    }

    on_update() {
      super.on_update(), null == this.food && (0 < this.saving_data.growing_timer ? 0 < this.saving_data.water_timer ? (this.saving_data.water_timer -= 1, this.saving_data.growing_timer -= 1 * this.water_grow_multiplyer) : this.saving_data.growing_timer -= 1 : this.food = this.generate_veggie());
    }

    on_draw(t) {
      super.on_draw(t), null != this.food && t.drawImage(this.food.get_image(), .5 * -_.BLOCK_RADIUS, -_.BLOCK_RADIUS, _.BLOCK_RADIUS, _.BLOCK_RADIUS);
    }

    save_data() {
      let t = super.save_data();
      return null != this.food && (t.food = this.food.save_data()), t;
    }

    load_data(t) {
      super.save_data(t), t.food && (this.food = this.game.save_data_manager.deserialize_item(t.food));
    }

  }

  class ct extends gt {
    constructor(t) {
      super(t), this.name = "食料プランター", this.image = this.game.image_library.get_image("dougu_torobune_tsuchi_red"), this.image_dark = this.game.image_library.get_image("dougu_torobune_tsuchi_red_dark");
    }

    generate_veggie() {
      return new mt(this.game);
    }

  }

  class ut extends gt {
    constructor(t) {
      super(t), this.name = "木材プランター", this.image = this.game.image_library.get_image("dougu_torobune_tsuchi_yellow"), this.image_dark = this.game.image_library.get_image("dougu_torobune_tsuchi_yellow_dark");
    }

    generate_veggie() {
      let t = new x(game);
      return t.set_name("木材マテリアル"), t.set_image("wood_maruta_single"), t.add_material("wood", 30), t;
    }

  }

  class dt extends _ {
    constructor(t) {
      super(t), this.name = "焚き火", this.is_floor = !1, this.image = this.game.image_library.get_image("takibi_dai_fire"), this.image_no_fire = this.game.image_library.get_image("takibi_dai"), this.food = null, this.saving_data.ammo_amount = 100, this.cooking_count = 0, this.accept_ammo_type = "fuel";
    }

    deposit_item(t) {
      return !!super.deposit_item(t) || (null == this.food && t && t.get_cooked_item ? (this.food = t, this.cooking_count = 0, !0) : void 0);
    }

    on_interact() {
      return !!this.food && (this.game.world.give_tool_item_player(this.food), this.food = null, !0);
    }

    on_update() {
      super.on_update(), 0 < this.saving_data.ammo_amount && null != this.food && this.food.get_cooked_item && (this.cooking_count += 1, this.food.cooking_finish_time < this.cooking_count && (this.food = this.food.get_cooked_item(), this.saving_data.ammo_amount = 0, this.cooking_count = 0));
    }

    get_image() {
      return this.saving_data.ammo_amount <= 0 ? this.image_no_fire : super.get_image();
    }

    on_draw(t) {
      super.on_draw(t), null != this.food && t.drawImage(this.food.get_image(), .5 * -_.BLOCK_RADIUS, -_.BLOCK_RADIUS, _.BLOCK_RADIUS, _.BLOCK_RADIUS);
    }

    save_data() {
      let t = super.save_data();
      return null != this.food && (t.food = this.food.save_data()), t;
    }

    load_data(t) {
      super.save_data(t), t.food && (this.food = this.game.save_data_manager.deserialize_item(t.food));
    }

  }

  class pt extends _ {
    constructor(t) {
      super(t), this.name = "乾燥ラック", this.is_floor = !1, this.image = this.game.image_library.get_image("dry_lack"), this.food = null, this.cooking_count = 0;
    }

    on_interact() {
      if (this.food) return this.game.world.give_tool_item_player(this.food), this.food = null, !0;
      {
        let t = this.game.hud.item_slot.get_active_item();
        if (t && t.get_dried_item) return this.food = t, this.game.hud.item_slot.delete_active_item(), this.cooking_count = 0, !0;
      }
      return !1;
    }

    on_update() {
      super.on_update(), null != this.food && this.food.get_cooked_item && (this.cooking_count += 1, this.food.cooking_finish_time < this.cooking_count && (this.food = this.food.get_dried_item(), this.cooking_count = 0));
    }

    on_draw(t) {
      super.on_draw(t), null != this.food && t.drawImage(this.food.get_image(), .5 * -_.BLOCK_RADIUS, -_.BLOCK_RADIUS, _.BLOCK_RADIUS, _.BLOCK_RADIUS);
    }

    save_data() {
      let t = super.save_data();
      return null != this.food && (t.food = this.food.save_data()), t;
    }

    load_data(t) {
      t.food && (this.food = this.game.save_data_manager.deserialize_item(t.food));
    }

  }

  class yt extends _ {
    constructor(t) {
      super(t), this.name = "舟の帆", this.is_floor = !1, this.image = this.game.image_library.get_image("mast_open"), this.image_close = this.game.image_library.get_image("mast_close"), this.saving_data.is_mast_open = !0;
    }

    get_image() {
      return this.saving_data.is_mast_open ? this.image : this.image_close;
    }

    on_update() {
      super.on_update();
    }

    change_state_chainly() {
      this.saving_data.is_mast_open ? this.saving_data.is_mast_open = !1 : this.saving_data.is_mast_open = !0;
      let t = null;
      t = this.game.world.ship.get_ship_block_by_index(this.cell_x - 1, this.cell_y), t && t instanceof yt && t.saving_data.is_mast_open != this.saving_data.is_mast_open && t.change_state_chainly(), t = this.game.world.ship.get_ship_block_by_index(this.cell_x + 1, this.cell_y), t && t instanceof yt && t.saving_data.is_mast_open != this.saving_data.is_mast_open && t.change_state_chainly(), t = this.game.world.ship.get_ship_block_by_index(this.cell_x, this.cell_y - 1), t && t instanceof yt && t.saving_data.is_mast_open != this.saving_data.is_mast_open && t.change_state_chainly(), t = this.game.world.ship.get_ship_block_by_index(this.cell_x, this.cell_y + 1), t && t instanceof yt && t.saving_data.is_mast_open != this.saving_data.is_mast_open && t.change_state_chainly();
    }

    on_interact() {
      return this.change_state_chainly(), this.saving_data.is_mast_open ? this.game.log("帆を開きました。") : this.game.log("帆を閉じました。"), !0;
    }

  }

  class ft extends Object {
    constructor(t) {
      super(t), this.game = t;
    }

    setup_recipe(t, i) {
      t.add_recipe(i, ["船に設置する焚き火です。", "配置して、生の食材を調理できます。"], ["wood", "iron", "stone"], [20, 10, 10], function (t) {
        return new e(t).set_ship_block(new dt(t));
      }, ""), t.add_recipe(i, ["舟の帆です。", "風が当たると舟が前進します。"], ["wood", "cloth", "feather"], [10, 20, 3], function (t) {
        return new e(t).set_ship_block(new yt(t));
      }, ""), t.add_recipe(i, ["食材を乾燥させます。"], ["wood", "cloth"], [20, 10], function (t) {
        return new e(t).set_ship_block(new pt(t));
      }, ""), t.add_recipe(i, ["自動で敵を撃つ空気砲です。", "燃料を投入すると、自動で敵を攻撃します。"], ["parts", "iron"], [3, 10], function (t) {
        return new e(t).set_ship_block(new _t(t));
      }, ""), t.add_recipe(i, ["自動で敵を撃つ投石機です。", "カタパルト弾を投入すると、自動で敵を攻撃します。"], ["parts", "wood"], [3, 10], function (t) {
        return new e(t).set_ship_block(new at(t));
      }, ""), t.add_recipe(i, ["自動で敵を撃つ機銃です。", "弾薬を投入すると、自動で敵を攻撃します。"], ["circuit", "parts", "iron"], [3, 3, 10], function (t) {
        return new e(t).set_ship_block(new ht(t));
      }, ""), t.add_recipe(i, ["自動で敵を撃つ大砲です。", "砲弾を投入すると、自動で敵を攻撃します。"], ["parts", "lead", "silver"], [5, 10, 5], function (t) {
        return new e(t).set_ship_block(new ot(t));
      }, ""), t.add_recipe(i, ["燃料式のエンジンです。", "燃料を投入すると、舟を前に進めます。"], ["iron", "parts"], [10, 2], function (t) {
        return new e(t).set_ship_block(new st(t));
      }, ""), t.add_recipe(i, ["水飲み場です。", "より短い時間経過で飲み水がたまります。"], ["parts", "stone", "jar"], [3, 50, 3], function (t) {
        return new e(t).set_ship_block(new nt(t));
      }, ""), t.add_recipe(i, ["水が自然にたまるバケツです。", "時間経過で飲み水がたまります。"], ["iron", "stone"], [10, 10], function (t) {
        return new e(t).set_ship_block(new rt(t));
      }, ""), t.add_recipe(i, ["食用の作物を育てます。"], ["leftover", "plastic"], [10, 5], function (t) {
        return new e(t).set_ship_block(new ct(t));
      }, "Food"), t.add_recipe(i, ["木材を育てます。"], ["leftover", "iron", "stone"], [30, 10, 10], function (t) {
        return new e(t).set_ship_block(new ut(t));
      }, "Wood"), t.add_recipe(i, ["イヌ型ロボットです。", "砲撃を優先して手伝ってくれます。"], ["parts", "circuit", "plastic", "silver"], [10, 5, 10, 3], function (t) {
        return new e(t).set_ship_block(new tt(t));
      }, ""), t.add_recipe(i, ["ネコ型ロボットです。", "弾薬や燃料の補給を優先して手伝ってくれます。"], ["parts", "circuit", "plastic", "silver"], [10, 5, 10, 3], function (t) {
        return new e(t).set_ship_block(new et(t));
      }, "");
    }

  }

  class Tt extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("megane_3d_blue_red"), this.saving_data.item_name = "スカウター";
    }

    on_click(t, i, e, s) {
      for (let e of this.game.world.enemy_list) null != e && (e.is_scouted = !0, e.test_hit(t, i) && (this.game.log("    名前 : " + e.name), this.game.log("     Lv : " + e.strength_lv), this.game.log("     HP : " + Math.ceil(e.hp) + "/" + Math.ceil(e.max_hp)), this.game.log("攻撃(弾) : " + e.bullet_damage), this.game.log("  (接触) : " + e.direct_damage)));
    }

  }

  class wt extends Object {
    constructor(t) {
      super(t), this.game = t;
    }

    setup_recipe(t, i) {
      t.add_recipe(i, ["クリックした敵の情報を調べることが出来ます。"], ["mech_parts"], [3], function (t) {
        return new Tt(t);
      }, "");
    }

  }

  class vt extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("tonkachi"), this.is_hammer = !0, this.saving_data.item_name = "撤去ハンマー";
    }

    on_click(t, i, e, s) {}

  }

  class bt extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("fishing_tsurizao_nobezao"), this.saving_data.item_name = "釣り竿";
    }

    on_click(t, i, e, s) {
      this.game.world.player.health.mod_sp(-10), this.game.world.lure.on_click_rod(t, i, e, s), this.consume_durability();
    }

  }

  class kt extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("syamoji_mokusei"), this.saving_data.item_name = "オール", this.cool_time_count = 30, this.cool_time_max = 30;
    }

    on_click(t, i, e, s) {
      0 < this.cool_time_count || (this.cool_time_count = this.cool_time_max, 0 != this.game.world.player.is_in_ship_inertial ? s < -100 ? this.game.log("舟を漕ぐには海面から遠すぎます。") : this.game.world.player.health.consume_sp(5) && this.game.world.ship.on_oar(30) : this.game.log("舟の外では漕げません。"));
    }

    on_update() {
      0 < this.cool_time_count && (this.cool_time_count -= 1);
    }

    on_keep_click(t, i, e, s) {
      0 < this.cool_time_count || this.on_click(t, i, e, s);
    }

  }

  class It extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("monkey_wrench"), this.is_wrench = !0, this.saving_data.item_name = "修理レンチ";
    }

    on_click(t, i, e, s) {}

  }

  class Et extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("tora_rope"), this.saving_data.item_name = "命綱", this.cool_time_count = 30, this.cool_time_max = 30;
    }

    on_click(t, i, e, s) {
      this.game.log("海を泳いでいる時に命綱を構えると、"), this.game.log("自動的に舟の方向に引っ張られます。"), this.game.log("マウスボタンを押し続けるとより速く引っ張られます。");
    }

    on_update() {
      this.game.hud.item_slot.get_active_item() === this && (this.game.world.player.is_in_ship_inertial || (this.game.world.player.x += this.game.world.ship.velocity, 0 < this.game.world.player.x ? this.game.world.player.x -= 1 : this.game.world.player.x += 1));
    }

    on_keep_click(t, i, e, s) {
      this.game.world.player.is_in_ship_inertial || (0 < this.game.world.player.x ? this.game.world.player.x -= 2 : this.game.world.player.x += 2);
    }

  }

  class xt extends Object {
    constructor(t) {
      super(t), this.game = t;
    }

    setup_recipe(t, i) {
      t.add_recipe(i, ["魚釣りができます。", "海に浮いているものを引き揚げることも出来ます。"], ["wood", "cloth"], [3, 1], function (t) {
        return new bt(t);
      }, "Lv1"), t.add_recipe(i, ["魚釣りができます。", "海に浮いているものを引き揚げることも出来ます。"], ["wood", "cloth", "feather"], [30, 10, 10], function (t) {
        return new bt(t);
      }, "Lv2"), t.add_recipe(i, ["蒸留ボトル", "焚き火にかけることで飲み水を得られます。"], ["jar"], [1], function (t) {
        return new lt(t);
      }, ""), t.add_recipe(i, ["舟を漕ぐと、より多くの素材を持った敵が現れます。"], ["wood", "feather"], [10, 2], function (t) {
        return new kt(t);
      }, ""), t.add_recipe(i, ["撤去ハンマー", "船のブロックを撤去できます。"], ["wood", "iron"], [10, 5], function (t) {
        return new vt(t);
      }, ""), t.add_recipe(i, ["修理レンチ", "船のブロックを修理できます。"], ["iron"], [7], function (t) {
        return new It(t);
      }, ""), t.add_recipe(i, ["クリックした敵の情報を調べることが出来ます。"], ["parts"], [1], function (t) {
        return new Tt(t);
      }, ""), t.add_recipe(i, ["海に落ちた時にこれを構えると、", "自動的に舟の方向に引っ張られます。"], ["cloth"], [10], function (t) {
        return new Et(t);
      }, "");
    }

  }

  class St extends Object {
    constructor(t) {
      super(t), this.game = t;
    }

    setup_recipe(t, i) {
      t.add_recipe(i, ["最も弱い遠距離武器です。", "Lv1"], ["wood", "cloth"], [10, 5], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "弓矢", i.set_image("yumiya"), i.saving_data.basic_power = 4, i.saving_data.cool_time = 25, i;
      }, ""), t.add_recipe(i, ["基本的な遠距離武器です。", "Lv2"], ["wood", "cloth", "feather"], [20, 10, 1], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "クロスボウ", i.set_image("yumiya_bowgun"), i.saving_data.basic_power = 10, i.saving_data.cool_time = 20, i;
      }, ""), t.add_recipe(i, ["遠距離武器です。", "連射が早いです。"], ["parts", "cloth", "plastic"], [20, 20, 30], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "空気銃", i.set_image("hair_drier"), i.set_bullet_image("air_ball"), i.saving_data.basic_power = 5, i.saving_data.cool_time = 7, i;
      }, ""), t.add_recipe(i, ["遠距離武器です。", "連射が早いです。"], ["circuit", "silver"], [20, 20], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "エアブラシ", i.set_image("tosou_airbrush"), i.set_bullet_image("air_ball"), i.saving_data.basic_power = 9, i.saving_data.cool_time = 3, i;
      }, ""), t.add_recipe(i, ["遠距離武器です。", "バランスの取れた性能です。"], ["parts", "lead", "plastic"], [17, 17, 17], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "ピストル", i.set_image("starter_starting_pistol"), i.set_bullet_image("bullet_right"), i.saving_data.basic_power = 16, i.saving_data.cool_time = 20, i;
      }, ""), t.add_recipe(i, ["遠距離武器です。", "バランスの取れた性能です。"], ["circuit", "lead", "plastic"], [17, 17, 17], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "光線銃", i.set_image("kousenju"), i.set_bullet_image("bullet_thunder"), i.saving_data.basic_power = 32, i.saving_data.cool_time = 20, i;
      }, ""), t.add_recipe(i, ["遠距離武器です。", "大量の弾をばらまきます。"], ["plastic", "iron", "feather"], [30, 30, 100], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "ラッパ銃", i.set_image("soccer_vuvuzela_music"), i.set_bullet_image("bullet_feather_white"), i.saving_data.basic_power = 5, i.saving_data.cool_time = 20, i.saving_data.fire_spread = 5, i.saving_data.fire_spread_angle = .2, i.saving_data.bullet_lifetime = 25, i;
      }, ""), t.add_recipe(i, ["遠距離武器です。", "大量の弾をばらまきます。"], ["silver", "iron", "feather"], [30, 30, 100], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "3連ラッパ銃", i.set_image("soccer_cheer_horn_music"), i.set_bullet_image("bullet_feather_white"), i.saving_data.basic_power = 5, i.saving_data.cool_time = 20, i.saving_data.fire_spread = 15, i.saving_data.fire_spread_angle = .1, i.saving_data.bullet_lifetime = 25, i;
      }, ""), t.add_recipe(i, ["遠距離武器です。", "高威力ですが、連射が遅いです。"], ["parts", "wood", "iron"], [15, 50, 50], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "ライフル", i.set_image("hinawaju"), i.set_bullet_image("bullet_right"), i.saving_data.basic_power = 110, i.saving_data.cool_time = 100, i.saving_data.bullet_velocity = 30, i;
      }, ""), t.add_recipe(i, ["近距離武器です。", ""], ["parts", "iron", "fuel"], [1, 20, 150], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "バーナー缶", i.set_image("gas_burner"), i.set_bullet_image("bullet_fire"), i.saving_data.basic_power = 8, i.saving_data.cool_time = 5, i.saving_data.fire_spread = 2, i.saving_data.fire_spread_angle = .1, i.saving_data.bullet_velocity = 2, i.saving_data.bullet_lifetime = 50, i;
      }, ""), t.add_recipe(i, ["近距離武器です。", ""], ["circuit", "parts", "iron"], [10, 10, 50], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "チェーンソー", i.set_image("chain_saw"), i.set_bullet_image("attack_effect"), i.saving_data.basic_power = 20, i.saving_data.cool_time = 5, i.saving_data.fire_spread = 8, i.saving_data.fire_spread_angle = .5, i.saving_data.bullet_velocity = 20, i.saving_data.bullet_lifetime = 5, i;
      }, ""), t.add_recipe(i, ["近距離武器です。", ""], ["wood", "iron"], [10, 10], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "槍", i.set_image("buki_yari"), i.set_bullet_image("attack_effect"), i.saving_data.basic_power = 8, i.saving_data.cool_time = 20, i.saving_data.bullet_lifetime = 10, i;
      }, ""), t.add_recipe(i, ["近距離武器です。", "3方向に一度に攻撃できます。"], ["wood", "iron", "feather"], [30, 30, 3], function (t) {
        let i = new G(t);
        return i.saving_data.item_name = "トライデント", i.set_image("war_trident"), i.set_bullet_image("attack_effect"), i.saving_data.basic_power = 8, i.saving_data.fire_spread = 3, i.saving_data.fire_spread_angle = .3, i.saving_data.cool_time = 20, i.saving_data.bullet_lifetime = 10, i;
      }, "");
    }

  }

  class Ot extends i {
    constructor(t) {
      super(t), this.saving_data.item_name = "カタパルト用小石", this.image = this.game.image_library.get_image("catapult_ammo"), this.ammo_type = "stone", this.ammo_value = 100;
    }

    on_click(t, i, e, s) {
      this.game.log("これはカタパルト用の石です。"), this.game.log("カタパルトをクリックすると補充できます。");
    }

  }

  class Ct extends Object {
    constructor(t) {
      super(t), this.game = t;
    }

    setup_recipe(t, i) {
      t.add_recipe(i, ["さまざまな設備に補充するための燃料です。"], ["fuel"], [10], function (t) {
        return new Q(t);
      }, ""), t.add_recipe(i, ["カタパルトから撃ち出すための小石です。"], ["stone"], [3], function (t) {
        return new Ot(t);
      }, ""), t.add_recipe(i, ["機銃に補充するための弾薬です。"], ["metal", "fuel"], [2, 10], function (t) {
        return new V(t);
      }, ""), t.add_recipe(i, ["大砲に補充するための砲弾です。"], ["metal", "fuel"], [10, 2], function (t) {
        return new J(t);
      }, ""), t.add_recipe(i, ["木材を燃料マテリアルに変換します。"], ["wood"], [10], function (t) {
        let i = new x(t);
        return i.set_name("燃料マテリアル (木材)"), i.set_image("fuel_wood"), i.add_material("fuel", 10), i;
      }, "wood"), t.add_recipe(i, ["残飯を燃料マテリアルに変換します。"], ["leftover"], [10], function (t) {
        let i = new x(t);
        return i.set_name("燃料マテリアル (残飯)"), i.set_image("fuel_leftover"), i.add_material("fuel", 10), i;
      }, "lo"), t.add_recipe(i, ["羽根を燃料マテリアルに変換します。"], ["feather"], [10], function (t) {
        let i = new x(t);
        return i.set_name("燃料マテリアル (羽根)"), i.set_image("fuel_feather"), i.add_material("fuel", 10), i;
      }, "fea"), t.add_recipe(i, ["布切れを燃料マテリアルに変換します。"], ["cloth"], [10], function (t) {
        let i = new x(t);
        return i.set_name("燃料マテリアル (布)"), i.set_image("fuel_cloth"), i.add_material("fuel", 10), i;
      }, "cloth");
    }

  }

  class Nt extends Object {
    constructor(t) {
      super(t), this.game = t, this.recipe_list = [], this.recipe_list[Nt.CATEGORY_TOOL] = [], this.recipe_list[Nt.CATEGORY_SHIP] = [], this.recipe_list[Nt.CATEGORY_SHIP2] = [], this.recipe_list[Nt.CATEGORY_SHIP3] = [], this.recipe_list[Nt.CATEGORY_WEAPON] = [], this.recipe_list[Nt.CATEGORY_EQUIP] = [], this.recipe_list[Nt.CATEGORY_SUPPLY] = [], this.category_icon_list = [], this.category_icon_list[Nt.CATEGORY_TOOL] = this.game.image_library.get_image("fishing_tsurizao_nobezao"), this.category_icon_list[Nt.CATEGORY_SHIP] = this.game.image_library.get_image("fune_ikada"), this.category_icon_list[Nt.CATEGORY_SHIP2] = this.game.image_library.get_image("fune_ikada"), this.category_icon_list[Nt.CATEGORY_SHIP3] = this.game.image_library.get_image("fune_ikada"), this.category_icon_list[Nt.CATEGORY_WEAPON] = this.game.image_library.get_image("yumiya_bowgun"), this.category_icon_list[Nt.CATEGORY_EQUIP] = this.game.image_library.get_image("snorkel_goods"), this.category_icon_list[Nt.CATEGORY_SUPPLY] = this.game.image_library.get_image("cooking_kokei_nenryou_fire"), this.category_name_list = [], this.category_name_list[Nt.CATEGORY_TOOL] = "道具", this.category_name_list[Nt.CATEGORY_SHIP] = "舟", this.category_name_list[Nt.CATEGORY_SHIP2] = "舟2", this.category_name_list[Nt.CATEGORY_SHIP3] = "舟3", this.category_name_list[Nt.CATEGORY_WEAPON] = "武器", this.category_name_list[Nt.CATEGORY_EQUIP] = "装備", this.category_name_list[Nt.CATEGORY_SUPPLY] = "補給品", this.setup();
    }

    setup() {
      let t = null;
      t = new xt(this.game), t.setup_recipe(this, Nt.CATEGORY_TOOL), t = new j(this.game), t.setup_recipe(this, Nt.CATEGORY_SHIP), t = new ft(this.game), t.setup_recipe(this, Nt.CATEGORY_SHIP2), t = new wt(this.game), t.setup_recipe(this, Nt.CATEGORY_SHIP3), t = new St(this.game), t.setup_recipe(this, Nt.CATEGORY_WEAPON), t = new F(this.game), t.setup_recipe(this, Nt.CATEGORY_EQUIP), t = new Ct(this.game), t.setup_recipe(this, Nt.CATEGORY_SUPPLY);
    }

    get_recipe(t, i) {
      return t < this.recipe_list.length && i < this.recipe_list[t].length ? this.recipe_list[t][i] : null;
    }

    get_category_index_with_looping(t) {
      return t < 0 ? Nt.CATEGORY_COUNT - 1 : Nt.CATEGORY_COUNT <= t ? 0 : t;
    }

    get_category_name(t) {
      return this.category_name_list[this.get_category_index_with_looping(t)];
    }

    get_category_icon(t) {
      return this.category_icon_list[this.get_category_index_with_looping(t)];
    }

    add_recipe(t, i, e, s, _, a) {
      let h = {};
      h.description_list = i, h.material_list = e, h.material_count_list = s, h.result_func = _, h.sample_item = h.result_func(this.game), h.image = h.sample_item.image, h.recipe_subtitle = a, this.recipe_list[t].push(h);
    }

  }

  _defineProperty(Nt, "CATEGORY_TOOL", 0);

  _defineProperty(Nt, "CATEGORY_SHIP", 1);

  _defineProperty(Nt, "CATEGORY_SHIP2", 2);

  _defineProperty(Nt, "CATEGORY_SHIP3", 3);

  _defineProperty(Nt, "CATEGORY_WEAPON", 4);

  _defineProperty(Nt, "CATEGORY_EQUIP", 5);

  _defineProperty(Nt, "CATEGORY_SUPPLY", 6);

  _defineProperty(Nt, "CATEGORY_COUNT", 7);

  class Lt {
    constructor(t) {
      this.game = t, this.craft_recipe = new Nt(this.game), this.cursor_index = 0, this.category_index = 0, this.menu_icon = this.game.image_library.get_image("kids_mokkou_kyoushitsu_boy"), this.batsu_icon = this.game.image_library.get_image("batsu"), this.icon_next_category = this.game.image_library.get_image("arrow_color12_play_flip"), this.icon_prev_category = this.game.image_library.get_image("arrow_color12_play");
    }

    get_menu_icon() {
      return this.menu_icon;
    }

    on_update() {
      this.game.input_controller.get_press_right() && this.cursor_index < Lt.LIST_COUNT - 1 && (this.cursor_index += 1), this.game.input_controller.get_press_left() && 0 < this.cursor_index && (this.cursor_index -= 1), this.game.input_controller.get_press_up() && Lt.LIST_X_COUNT <= this.cursor_index && (this.cursor_index -= Lt.LIST_X_COUNT), this.game.input_controller.get_press_down() && Lt.LIST_X_COUNT + this.cursor_index < Lt.LIST_COUNT && (this.cursor_index += Lt.LIST_X_COUNT), this.game.input_controller.get_mouse_press() && this.on_click(this.game.input_controller.mouse_x - Ut.MENU_MARGIN_LEFT, this.game.input_controller.mouse_y - Ut.MENU_MARGIN_TOP), (this.game.input_controller.get_press_enter() || this.game.input_controller.get_press_space()) && (0 == this.cursor_index || 1 == this.cursor_index ? 0 < this.category_index ? this.category_index -= 1 : this.category_index = Nt.CATEGORY_COUNT - 1 : 4 == this.cursor_index || 3 == this.cursor_index ? this.category_index < Nt.CATEGORY_COUNT - 1 ? this.category_index += 1 : this.category_index = 0 : this.execute_craft());
    }

    execute_craft() {
      let t = this.craft_recipe.get_recipe(this.category_index, this.cursor_index - Lt.LIST_X_COUNT);
      t && (this.game.hud.item_slot.has_empty_space(!0) ? this.take_recipe_materials(t) ? (this.game.hud.item_slot.put_pickup_item(t.result_func(this.game), !0), this.game.log("クラフトしました。")) : this.game.log("マテリアルが足りません。") : this.game.log("アイテムスロットがいっぱいです。"));
    }

    take_recipe_materials(t) {
      if (!this.check_recipe_materials(t)) return !1;

      for (let i = 0; i < t.material_list.length; i++) this.game.materials.take_material(t.material_list[i], t.material_count_list[i]);

      return !0;
    }

    check_recipe_materials(t) {
      for (let i = 0; i < t.material_list.length; i++) if (this.game.materials.get_material(t.material_list[i]) < t.material_count_list[i]) return !1;

      return !0;
    }

    check_recipe_unlocked(t) {
      return 0 < this.game.materials.get_material(t.material_list[0]);
    }

    on_click(t, i) {
      for (let e = 0; e < Lt.LIST_COUNT; e++) {
        let s = e % Lt.LIST_X_COUNT,
            _ = Math.floor(e / Lt.LIST_X_COUNT),
            a = Lt.LIST_X + s * (Lt.LIST_ICON_SIZE + Lt.LIST_SPACING),
            h = Lt.LIST_Y + _ * (Lt.LIST_ICON_SIZE + Lt.LIST_SPACING);

        if (a < t && t < a + Lt.LIST_ICON_SIZE && h < i && i < h + Lt.LIST_ICON_SIZE) {
          this.cursor_index = e, 0 == this.cursor_index || 1 == this.cursor_index ? 0 < this.category_index ? this.category_index -= 1 : this.category_index = Nt.CATEGORY_COUNT - 1 : 4 != this.cursor_index && 3 != this.cursor_index || (this.category_index < Nt.CATEGORY_COUNT - 1 ? this.category_index += 1 : this.category_index = 0);
          break;
        }
      }

      Lt.CRAFT_BUTTON_X < t && t < Lt.CRAFT_BUTTON_X + Lt.CRAFT_BUTTON_WIDTH && Lt.CRAFT_BUTTON_Y < i && i < Lt.CRAFT_BUTTON_Y + Lt.CRAFT_BUTTON_HEIGHT && this.execute_craft();
    }

    on_draw(t) {
      t.fillStyle = Lt.TITLE_COLOR, t.font = Lt.TITLE_FONT, t.fillText("クラフト Craft", Lt.TITLE_X, Lt.TITLE_Y), t.fillStyle = "rgb(40,30,20)";

      for (let i = 0; i < Lt.LIST_COUNT; i++) {
        this.cursor_index == i ? t.strokeStyle = Lt.LIST_ICON_FRAME_COLOR_SELECTED : t.strokeStyle = Lt.LIST_ICON_FRAME_COLOR;

        let e = i % Lt.LIST_X_COUNT,
            s = Math.floor(i / Lt.LIST_X_COUNT),
            _ = Lt.LIST_X + e * (Lt.LIST_ICON_SIZE + Lt.LIST_SPACING),
            a = Lt.LIST_Y + s * (Lt.LIST_ICON_SIZE + Lt.LIST_SPACING),
            h = this.craft_recipe.get_recipe(this.category_index, i - Lt.LIST_X_COUNT);

        t.font = "bold 16px monospace", t.fillStyle = "rgb(50,50,50)", t.strokeRect(_, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE), 0 == i ? t.drawImage(this.icon_prev_category, _, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE) : 1 == i ? t.drawImage(this.craft_recipe.get_category_icon(this.category_index - 1), _, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE) : 2 == i ? (t.drawImage(this.craft_recipe.get_category_icon(this.category_index), _, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE), t.strokeStyle = Lt.LIST_ICON_FRAME_COLOR_ACTIVE_CATEGORY, t.strokeRect(_, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE)) : 3 == i ? t.drawImage(this.craft_recipe.get_category_icon(this.category_index + 1), _, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE) : 4 == i ? t.drawImage(this.icon_next_category, _, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE) : h && this.check_recipe_unlocked(h) && (h.image && (t.drawImage(h.image, _, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE), t.fillText(h.recipe_subtitle, _, a + Lt.LIST_ICON_SIZE - 3)), this.check_recipe_materials(h) || (t.drawImage(this.batsu_icon, _, a, Lt.LIST_ICON_SIZE, Lt.LIST_ICON_SIZE), t.fillText(h.recipe_subtitle, _, a + Lt.LIST_ICON_SIZE - 3)));
      }

      if (t.font = Lt.DESC_TEXT_FONT, t.fillStyle = Lt.DESC_TEXT_COLOR, 0 == this.cursor_index) t.fillText("前のカテゴリ", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 1 * Lt.DESC_TEXT_HEIGHT);else if (1 == this.cursor_index) t.fillText("現在のカテゴリ", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 1 * Lt.DESC_TEXT_HEIGHT), t.fillText(this.craft_recipe.get_category_name(this.category_index), Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 2 * Lt.DESC_TEXT_HEIGHT);else if (2 == this.cursor_index) t.fillText("現在のカテゴリ", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 1 * Lt.DESC_TEXT_HEIGHT), t.fillText(this.craft_recipe.get_category_name(this.category_index), Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 2 * Lt.DESC_TEXT_HEIGHT);else if (3 == this.cursor_index) t.fillText("現在のカテゴリ", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 1 * Lt.DESC_TEXT_HEIGHT), t.fillText(this.craft_recipe.get_category_name(this.category_index), Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 2 * Lt.DESC_TEXT_HEIGHT);else if (4 == this.cursor_index) t.fillText("次のカテゴリ", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 1 * Lt.DESC_TEXT_HEIGHT);else {
        let i = this.craft_recipe.get_recipe(this.category_index, this.cursor_index - Lt.LIST_X_COUNT);

        if (i && this.check_recipe_unlocked(i)) {
          t.fillText(i.sample_item.get_name(), Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 1 * Lt.DESC_TEXT_HEIGHT), t.fillStyle = Lt.DESC_TEXT_COLOR, t.fillText(i.description_list[0], Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 2 * Lt.DESC_TEXT_HEIGHT), i.description_list[1] && (t.fillStyle = Lt.DESC_TEXT_COLOR, t.fillText(i.description_list[1], Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 3 * Lt.DESC_TEXT_HEIGHT)), t.fillStyle = Lt.DESC_TEXT_COLOR, t.fillText("・必要資材", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 4 * Lt.DESC_TEXT_HEIGHT);

          for (let e = 0; e < i.material_list.length; e++) {
            let s = i.material_list[e];
            t.fillStyle = Lt.DESC_TEXT_COLOR, t.fillText(this.game.materials.name_list[s], Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + Lt.DESC_TEXT_HEIGHT * (5 + e)), t.fillText(i.material_count_list[e], Lt.DESC_TEXT_X + 150, Lt.DESC_TEXT_Y + Lt.DESC_TEXT_HEIGHT * (5 + e)), t.fillText(this.game.materials.list[s], Lt.DESC_TEXT_X + 250, Lt.DESC_TEXT_Y + Lt.DESC_TEXT_HEIGHT * (5 + e));
          }
        } else t.fillText("レシピに必要なマテリアルのうち", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 1 * Lt.DESC_TEXT_HEIGHT), t.fillText("一番上の材料がキー素材になっています。", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 2 * Lt.DESC_TEXT_HEIGHT), t.fillText("キー素材を1個でも所持することで", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 4 * Lt.DESC_TEXT_HEIGHT), t.fillText("レシピが開放されます。", Lt.DESC_TEXT_X, Lt.DESC_TEXT_Y + 5 * Lt.DESC_TEXT_HEIGHT);
      }
      t.fillStyle = Lt.CRAFT_BUTTON_COLOR, t.fillRect(Lt.CRAFT_BUTTON_X, Lt.CRAFT_BUTTON_Y, Lt.CRAFT_BUTTON_WIDTH, Lt.CRAFT_BUTTON_HEIGHT), t.fillStyle = Lt.CRAFT_BUTTON_TEXT_COLOR, t.font = Lt.CRAFT_BUTTON_FONT, t.fillText("実行! (Enter)", Lt.CRAFT_BUTTON_X + Lt.CRAFT_BUTTON_TEXT_X, Lt.CRAFT_BUTTON_Y + Lt.CRAFT_BUTTON_TEXT_Y);
    }

  }

  _defineProperty(Lt, "TITLE_X", 100);

  _defineProperty(Lt, "TITLE_Y", 40);

  _defineProperty(Lt, "TITLE_COLOR", "rgb(40,30,20)");

  _defineProperty(Lt, "TITLE_FONT", "bold 32px monospace");

  _defineProperty(Lt, "LIST_CURSOR_COLOR", "rgb(20,150,20)");

  _defineProperty(Lt, "LIST_CURSOR_ADJUST", 6);

  _defineProperty(Lt, "DESC_TEXT_X", 340);

  _defineProperty(Lt, "DESC_TEXT_Y", 60);

  _defineProperty(Lt, "DESC_TEXT_FONT", "bold 18px monospace");

  _defineProperty(Lt, "DESC_TEXT_COLOR", "rgb(40,30,20)");

  _defineProperty(Lt, "DESC_TEXT_COLOR_GREEN", "rgb(20,200,20)");

  _defineProperty(Lt, "DESC_TEXT_COLOR_RED", "rgb(200,20,20)");

  _defineProperty(Lt, "DESC_TEXT_HEIGHT", 28);

  _defineProperty(Lt, "CRAFT_BUTTON_X", 400);

  _defineProperty(Lt, "CRAFT_BUTTON_Y", 330);

  _defineProperty(Lt, "CRAFT_BUTTON_HEIGHT", 50);

  _defineProperty(Lt, "CRAFT_BUTTON_WIDTH", 200);

  _defineProperty(Lt, "CRAFT_BUTTON_COLOR", "rgb(160,160,160)");

  _defineProperty(Lt, "CRAFT_BUTTON_TEXT_COLOR", "rgb(40,30,20)");

  _defineProperty(Lt, "CRAFT_BUTTON_FONT", "bold 24px monospace");

  _defineProperty(Lt, "CRAFT_BUTTON_TEXT_Y", 32);

  _defineProperty(Lt, "CRAFT_BUTTON_TEXT_X", 15);

  _defineProperty(Lt, "LIST_X", 20);

  _defineProperty(Lt, "LIST_Y", 60);

  _defineProperty(Lt, "LIST_ICON_SIZE", 50);

  _defineProperty(Lt, "LIST_SPACING", 10);

  _defineProperty(Lt, "LIST_X_COUNT", 5);

  _defineProperty(Lt, "LIST_Y_COUNT", 5);

  _defineProperty(Lt, "LIST_COUNT", Lt.LIST_X_COUNT * Lt.LIST_Y_COUNT);

  _defineProperty(Lt, "LIST_ICON_FRAME_COLOR", "rgb(40,30,20)");

  _defineProperty(Lt, "LIST_ICON_FRAME_COLOR_SELECTED", "rgb(200,20,20)");

  _defineProperty(Lt, "LIST_ICON_FRAME_COLOR_ACTIVE_CATEGORY", "rgb(20,200,20)");

  class Mt {
    constructor(t) {
      this.game = t, this.cursor_index = 0, this.menu_icon = this.game.image_library.get_image("kouji_shizai_okiba");
    }

    get_menu_icon() {
      return this.menu_icon;
    }

    on_update() {
      this.game.input_controller.get_press_down() && (this.cursor_index += 1), this.game.input_controller.get_press_up() && (this.cursor_index -= 1);
    }

    on_draw(t) {
      t.fillStyle = Mt.TITLE_COLOR, t.font = Mt.TITLE_FONT, t.fillText("マテリアル Material", Mt.TITLE_X, Mt.TITLE_Y), t.font = Mt.TEXT_FONT, t.fillStyle = Mt.TEXT_COLOR;
      let i = 0,
          e = 0;

      for (let s in this.game.materials.name_list) 0 < this.game.materials.list[s] && (t.fillText(this.game.materials.name_list[s], Mt.TEXT_X + Mt.COLUMN_WIDTH * e, Mt.TEXT_Y + Mt.TEXT_HEIGHT * i), t.fillText(this.game.materials.list[s], Mt.TEXT_X_COUNT + Mt.COLUMN_WIDTH * e, Mt.TEXT_Y + Mt.TEXT_HEIGHT * i)), i += 1, Mt.ROW_IN_COLUMN <= i && (i = 0, e += 1);
    }

  }

  _defineProperty(Mt, "TITLE_X", 100);

  _defineProperty(Mt, "TITLE_Y", 40);

  _defineProperty(Mt, "TITLE_COLOR", "rgb(40,30,20)");

  _defineProperty(Mt, "TITLE_FONT", "bold 32px monospace");

  _defineProperty(Mt, "TEXT_X", 60);

  _defineProperty(Mt, "TEXT_Y", 100);

  _defineProperty(Mt, "TEXT_FONT", "bold 18px monospace");

  _defineProperty(Mt, "TEXT_COLOR", "rgb(40,30,20)");

  _defineProperty(Mt, "TEXT_HEIGHT", 28);

  _defineProperty(Mt, "TEXT_X_COUNT", 180);

  _defineProperty(Mt, "COLUMN_WIDTH", 210);

  _defineProperty(Mt, "ROW_IN_COLUMN", 10);

  class Rt {
    constructor(t) {
      this.game = t, this.config_list = [], this.config_list[0] = "---", this.config_list[1] = "オートセーブデータにセーブする", this.config_list[2] = "データ[1]にセーブする", this.config_list[3] = "データ[2]にセーブする", this.config_list[4] = "---", this.config_list[5] = "仮想キーボード(試作)", this.config_list[6] = "マテリアルの自動解体", this.config_list[7] = "---", this.function_list = [], this.function_list[0] = function () {}.bind(this), this.function_list[1] = this.save_game_auto.bind(this), this.function_list[2] = this.save_game_1.bind(this), this.function_list[3] = this.save_game_2.bind(this), this.function_list[4] = function () {}.bind(this), this.function_list[5] = this.toggle_virtual_key.bind(this), this.function_list[6] = this.toggle_material_auto_destruct.bind(this), this.function_list[7] = function () {}.bind(this), this.config_cursor = 0, this.config_scroll = 0, this.menu_icon = this.game.image_library.get_image("haguruma");
    }

    toggle_virtual_key() {
      this.game.hud_virtual_input.toggle_enable();
    }

    toggle_material_auto_destruct() {
      this.game.hud.item_slot.is_config_auto_material_deconstruct ? (this.game.hud.item_slot.is_config_auto_material_deconstruct = !1, this.game.log("マテリアル自動解体をオフにしました。")) : (this.game.hud.item_slot.is_config_auto_material_deconstruct = !0, this.game.log("マテリアル自動解体をオンにしました。"));
    }

    save_game_auto() {
      this.game.save_data_manager.save_game("save_data_auto"), this.game.log("オートセーブにセーブしました。");
    }

    save_game_1() {
      this.game.save_data_manager.save_game("save_data_1"), this.game.log("データ[1]にセーブしました。"), this.game.tutorial_data.complete("データ[1]にセーブする");
    }

    save_game_2() {
      this.game.save_data_manager.save_game("save_data_2"), this.game.log("データ[2]にセーブしました。");
    }

    get_menu_icon() {
      return this.menu_icon;
    }

    on_update() {
      this.game.input_controller.get_press_up() && 0 < this.config_cursor && (this.config_cursor -= 1), this.game.input_controller.get_press_down() && this.config_cursor < this.config_list.length - 1 && (this.config_cursor += 1), (this.game.input_controller.get_press_enter() || this.game.input_controller.get_press_space()) && this.function_list[this.config_cursor](), this.game.input_controller.get_mouse_press() && this.on_click(this.game.input_controller.mouse_x - Ut.MENU_MARGIN_LEFT, this.game.input_controller.mouse_y - Ut.MENU_MARGIN_TOP);
    }

    on_click(t, i) {
      for (let e = 0; e < 10; e++) {
        let s = Rt.LIST_Y + Rt.LIST_TEXT_MARGIN_TOP + Rt.LIST_CURSOR_ADJUST + Rt.LIST_TEXT_HEIGHT * e;
        Rt.LIST_X < t && t < Rt.LIST_X + Rt.LIST_WIDTH && s - Rt.LIST_TEXT_HEIGHT < i && i < s && (e == this.config_cursor ? this.function_list[this.config_cursor]() : this.config_cursor = e);
      }
    }

    on_draw(t) {
      t.fillStyle = Rt.TITLE_COLOR, t.font = Rt.TITLE_FONT, t.fillText("コンフィグ Config", Rt.TITLE_X, Rt.TITLE_Y), t.fillStyle = "rgb(20,15,10)", t.fillRect(Rt.LIST_X, Rt.LIST_Y, Rt.LIST_WIDTH, Rt.LIST_HEIGHT);

      for (let i = 0; i < 10; i++) i == this.config_cursor && (t.fillStyle = Rt.LIST_CURSOR_COLOR, t.fillRect(Rt.LIST_X, Rt.LIST_Y + Rt.LIST_TEXT_MARGIN_TOP + Rt.LIST_CURSOR_ADJUST + Rt.LIST_TEXT_HEIGHT * i, Rt.LIST_WIDTH, -Rt.LIST_TEXT_HEIGHT)), this.config_list[i] && (t.fillStyle = Rt.LIST_TEXT_COLOR, t.font = Rt.LIST_TEXT_FONT, t.fillText(this.config_list[i], Rt.LIST_X + Rt.LIST_TEXT_MARGIN_LEFT, Rt.LIST_Y + Rt.LIST_TEXT_MARGIN_TOP + Rt.LIST_TEXT_HEIGHT * i));

      t.font = Rt.DESC_TEXT_FONT;
    }

  }

  _defineProperty(Rt, "TITLE_X", 100);

  _defineProperty(Rt, "TITLE_Y", 40);

  _defineProperty(Rt, "TITLE_COLOR", "rgb(40,30,20)");

  _defineProperty(Rt, "TITLE_FONT", "bold 32px monospace");

  _defineProperty(Rt, "LIST_X", 20);

  _defineProperty(Rt, "LIST_Y", 60);

  _defineProperty(Rt, "LIST_WIDTH", 400);

  _defineProperty(Rt, "LIST_HEIGHT", 320);

  _defineProperty(Rt, "LIST_TEXT_MARGIN_LEFT", 24);

  _defineProperty(Rt, "LIST_TEXT_MARGIN_TOP", 30);

  _defineProperty(Rt, "LIST_TEXT_FONT", "bold 20px monospace");

  _defineProperty(Rt, "LIST_TEXT_COLOR", "rgb(240,240,240)");

  _defineProperty(Rt, "LIST_TEXT_COLOR_DISABLE", "rgb(100,100,100)");

  _defineProperty(Rt, "LIST_TEXT_HEIGHT", 30);

  _defineProperty(Rt, "LIST_CURSOR_COLOR", "rgb(20,150,20)");

  _defineProperty(Rt, "LIST_CURSOR_ADJUST", 6);

  _defineProperty(Rt, "DESC_TEXT_X", 340);

  _defineProperty(Rt, "DESC_TEXT_Y", 60);

  _defineProperty(Rt, "DESC_TEXT_FONT", "bold 18px monospace");

  _defineProperty(Rt, "DESC_TEXT_COLOR", "rgb(40,30,20)");

  _defineProperty(Rt, "DESC_TEXT_COLOR_GREEN", "rgb(20,200,20)");

  _defineProperty(Rt, "DESC_TEXT_COLOR_RED", "rgb(200,20,20)");

  _defineProperty(Rt, "DESC_TEXT_HEIGHT", 28);

  _defineProperty(Rt, "CONFIG_BUTTON_X", 400);

  _defineProperty(Rt, "CONFIG_BUTTON_Y", 330);

  _defineProperty(Rt, "CONFIG_BUTTON_HEIGHT", 50);

  _defineProperty(Rt, "CONFIG_BUTTON_WIDTH", 200);

  _defineProperty(Rt, "CONFIG_BUTTON_COLOR", "rgb(160,160,160)");

  _defineProperty(Rt, "CONFIG_BUTTON_TEXT_COLOR", "rgb(40,30,20)");

  _defineProperty(Rt, "CONFIG_BUTTON_FONT", "bold 24px monospace");

  _defineProperty(Rt, "CONFIG_BUTTON_TEXT_Y", 32);

  _defineProperty(Rt, "CONFIG_BUTTON_TEXT_X", 45);

  class At {
    constructor(t) {
      this.game = t, this.tutorial_level = 0;
    }

    desc_only(t) {
      return {
        description: t,
        is_need_check: !1,
        checked: !1,
        level: this.tutorial_level,
        is_open: !0,
        condition_func: function condition_func(t) {
          return !0;
        }
      };
    }

    need_cond(t, i) {
      return {
        description: t,
        is_need_check: !0,
        checked: !1,
        level: this.tutorial_level,
        is_open: !0,
        condition_func: i
      };
    }

    setup_tutorial(t) {
      let i = null;
      i = {}, i.level = this.tutorial_level, i.title = "チュートリアルの使い方", i.check_list = [], i.check_list.push(this.desc_only("チュートリアルの項目を達成すると、")), i.check_list.push(this.need_cond("<-のアイコンがチェックになります。", function (t) {
        return !0;
      })), i.check_list.push(this.desc_only("全項目を達成したら")), i.check_list.push(this.desc_only("下の完了ボタンを押して")), i.check_list.push(this.desc_only("報酬を受け取れます。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("tree_ryuuboku"), i.reword_tool_item.set_name("マテリアル: 木材 x 9"), i.reword_tool_item.add_material("wood", 10), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "基本操作 1", i.check_list = [], i.check_list.push(this.need_cond("左右移動: 矢印キー左右 or A,D", function (t) {
        return 1 < Math.abs(t.world.player.vx);
      })), i.check_list.push(this.need_cond("ジャンプ: 矢印キー上, Space or W", function (t) {
        return t.world.player.vy < -2;
      })), i.check_list.push(this.need_cond("床を降りる: 矢印キー下 or S", function (t) {
        return !0;
      })), i.check_list.push(this.need_cond("メニュー開閉: Tabキー", function (t) {
        return !0;
      })), i.check_list.push(this.desc_only(" 　　or 画面左上のメニューボタン")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("glass_bin6_clear"), i.reword_tool_item.set_name("マテリアル: ビン x 1"), i.reword_tool_item.add_material("jar", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "基本操作 2", i.check_list = [], i.check_list.push(this.need_cond("アイテム使用: マウスクリック", function (t) {
        return !0;
      })), i.check_list.push(this.need_cond("アイテム選択: マウスホイール", function (t) {
        return 0 != t.hud.item_slot.item_slot_cursor;
      })), i.check_list.push(this.desc_only("　　 or 画面下のアイテム欄クリック")), i.check_list.push(this.need_cond("カメラ操作: 画面左のカメラボタン", function (t) {
        return 1 != t.world.camera.zoom;
      })), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("glass_bin6_clear"), i.reword_tool_item.set_name("マテリアル: ビン x 1"), i.reword_tool_item.add_material("jar", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "インベントリ メニュー", i.check_list = [], i.check_list.push(this.desc_only("持っているアイテムを管理する画面です。")), i.check_list.push(this.desc_only("クリックでアイテムを移動できます。")), i.check_list.push(this.desc_only("1-9キーでアイテムを枠に移動させます。")), i.check_list.push(this.desc_only("ゴミ箱にアイテムを置くと消去できます。")), i.check_list.push(this.need_cond("インベントリ メニューを開く", function (t) {
        return 1 == t.hud.hud_menu.menu_list_cursor;
      })), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("alohashirt_gray"), i.reword_tool_item.set_name("マテリアル: 布切れ x 9"), i.reword_tool_item.add_material("cloth", 9), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "クラフト メニュー", i.check_list = [], i.check_list.push(this.desc_only("マテリアルからアイテムを製作する画面です。")), i.check_list.push(this.desc_only("作りたいアイテムを選び、")), i.check_list.push(this.desc_only("右下の製作ボタンで、")), i.check_list.push(this.desc_only("マテリアルを消費してアイテムを作ります。")), i.check_list.push(this.need_cond("クラフト メニューを開く", function (t) {
        return 2 == t.hud.hud_menu.menu_list_cursor;
      })), i.check_list.push(this.need_cond("釣り竿 Lv1を製作する", function (t) {
        return t.hud.item_slot.has_item_instanceof(bt);
      })), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("gomi_can"), i.reword_tool_item.set_name("マテリアル: 鉄クズ x 9"), i.reword_tool_item.add_material("iron", 9), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "マテリアル メニュー", i.check_list = [], i.check_list.push(this.desc_only("持っているマテリアルを確認する画面です。")), i.check_list.push(this.desc_only("マテリアルとは、")), i.check_list.push(this.desc_only("アイテムを作るための素材です。")), i.check_list.push(this.desc_only("所持上限は基本的にありません。")), i.check_list.push(this.need_cond("マテリアル メニューを開く", function (t) {
        return 3 == t.hud.hud_menu.menu_list_cursor;
      })), i.check_list.push(this.need_cond("鉄クズを30個以上集める", function (t) {
        return 30 <= t.materials.get_material("iron");
      })), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("tree_ryuuboku"), i.reword_tool_item.set_name("マテリアル: 木材 x 30"), i.reword_tool_item.add_material("wood", 30), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "コンフィグ メニュー", i.check_list = [], i.check_list.push(this.desc_only("ゲームの保存や設定変更をする画面です。")), i.check_list.push(this.need_cond("コンフィグ メニューを開く", function (t) {
        return 4 == t.hud.hud_menu.menu_list_cursor;
      })), i.check_list.push(this.need_cond("データ[1]にセーブする", function (t) {
        return 1 == t.tutorial_data.complete_flag_list[this.description];
      })), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("present_box"), i.reword_tool_item.set_name("マテリアル: ビン x 1"), i.reword_tool_item.add_material("jar", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "ステータス", i.check_list = [], i.check_list.push(this.desc_only("画面左下に並んだゲージは、")), i.check_list.push(this.desc_only("プレイヤーのステータスです。")), i.reword_tool_item = new N(this.game), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "ステータス: 体力", i.check_list = [], i.check_list.push(this.desc_only("左下の赤いゲージは体力で、")), i.check_list.push(this.desc_only("なくなると死んでしまいます。")), i.check_list.push(this.desc_only("鳥の攻撃に当たったり、")), i.check_list.push(this.desc_only("食事を取らずに行動し続けると")), i.check_list.push(this.desc_only("減ってしまいます。")), i.check_list.push(this.desc_only("体力は少しずつ自然に回復します。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("tree_ryuuboku"), i.reword_tool_item.set_name("マテリアル: 木材 x 1"), i.reword_tool_item.add_material("wood", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "ステータス: スタミナ", i.check_list = [], i.check_list.push(this.desc_only("左下の黄色のゲージはスタミナで、")), i.check_list.push(this.desc_only("ジャンプやアイテム使用などの")), i.check_list.push(this.desc_only("行動によって減少します。")), i.check_list.push(this.desc_only("なくなるとスタミナを使う行動ができません。")), i.check_list.push(this.desc_only("スタミナは自然に回復しますが、")), i.check_list.push(this.desc_only("回復には食料と水分を消費します。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("tree_ryuuboku"), i.reword_tool_item.set_name("マテリアル: 木材 x 1"), i.reword_tool_item.add_material("wood", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "ステータス: 食料と水分", i.check_list = [], i.check_list.push(this.desc_only("左下の橙と青のゲージは食料と水分で、")), i.check_list.push(this.desc_only("スタミナを回復するために消費します。")), i.check_list.push(this.desc_only("なくなるとスタミナが徐々に減少し、")), i.check_list.push(this.desc_only("次に体力が減少し、最後には死んでしまいます。")), i.check_list.push(this.desc_only("食料や水を摂ることで回復できます。")), i.reword_tool_item = new u(this.game), i.reword_tool_item.set_image("petbottle_juice"), i.reword_tool_item.set_name("フルーツジュース"), i.reword_tool_item.saving_data.hunger_value = 5, i.reword_tool_item.saving_data.thirst_value = 35, t.push(i), i = {}, i.level = this.tutorial_level, i.title = "海について", i.check_list = [], i.check_list.push(this.desc_only("海に落ちても水面を泳ぐことはできます。")), i.check_list.push(this.desc_only("泳いでいる間、スタミナを消費します。")), i.check_list.push(this.desc_only("なくなると体力を消費し、")), i.check_list.push(this.desc_only("最後には死んでしまいます。")), i.check_list.push(this.need_cond("海に飛び込んでみる", function (t) {
        return 1 == t.world.player.is_in_sea;
      })), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("tree_ryuuboku"), i.reword_tool_item.set_name("マテリアル: 木材 x 3"), i.reword_tool_item.add_material("wood", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "デスペナルティ", i.check_list = [], i.check_list.push(this.desc_only("敵の攻撃や溺れたりして死んでしまうと")), i.check_list.push(this.desc_only("幽霊になってしばらく動けません。")), i.check_list.push(this.desc_only("また、食料と水分が残り1割になります。")), i.check_list.push(this.desc_only("幽霊の間は体力が徐々に回復し、")), i.check_list.push(this.desc_only("満タンになると元の状態に戻ります。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("alohashirt_gray"), i.reword_tool_item.set_name("マテリアル: 布切れ x 3"), i.reword_tool_item.add_material("cloth", 3), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "舟ブロックの設置", i.check_list = [], i.check_list.push(this.desc_only("舟ブロックを持ってクリックすることで")), i.check_list.push(this.desc_only("ブロックを設置して舟を拡張できます。")), i.check_list.push(this.desc_only("隣にブロックがないと置けません。")), i.check_list.push(this.need_cond("舟に設置できるブロックを製作する", function (t) {
        return t.hud.item_slot.has_item_instanceof(e);
      })), i.reword_tool_item = new e(this.game).set_ship_block(new n(this.game)), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "食料の確保", i.check_list = [], i.check_list.push(this.desc_only("釣り竿の作成")), i.check_list.push(this.need_cond("釣り竿を使用して釣り針を投げる", function (t) {
        return 1 == t.world.lure.is_working;
      })), i.check_list.push(this.desc_only("釣り針が沈んだらクリックで引き上げます。")), i.check_list.push(this.desc_only("おもに魚が釣れます。")), i.check_list.push(this.desc_only("魚を使用して、魚を食べます。")), i.check_list.push(this.desc_only("魚以外の便利なものもよく釣れます。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("present_box"), i.reword_tool_item.set_name("マテリアル: ビン x 1"), i.reword_tool_item.add_material("jar", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "飲み水の確保(蒸留)", i.check_list = [], i.check_list.push(this.need_cond("クラフトで蒸留ボトルを作成する", function (t) {
        return t.hud.item_slot.has_item_instanceof(lt);
      })), i.check_list.push(this.desc_only("蒸留ボトルを使用すると、水を飲めます。")), i.check_list.push(this.need_cond("焚き火を作成し、設置する", function (t) {
        return t.world.ship.has_block_instanceof(dt);
      })), i.check_list.push(this.desc_only("蒸留ボトルで焚き火をクリックすると")), i.check_list.push(this.desc_only("ボトルを焚き火にかけます。しばらく待てば、")), i.check_list.push(this.desc_only("蒸留ボトルに再度、水が満たされます。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("present_box"), i.reword_tool_item.set_name("マテリアル: ビン x 1"), i.reword_tool_item.add_material("jar", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "飲み水の確保(バケツ)", i.check_list = [], i.check_list.push(this.need_cond("クラフトで給水バケツを製作・設置", function (t) {
        return t.world.ship.has_block_instanceof(rt);
      })), i.check_list.push(this.desc_only("給水バケツをクリックすれば、")), i.check_list.push(this.desc_only("水を飲むことができます。")), i.check_list.push(this.desc_only("(かなり) 長時間待てば、")), i.check_list.push(this.desc_only("給水バケツに再度、水が満たされます。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("present_box"), i.reword_tool_item.set_name("マテリアル: ビン x 1"), i.reword_tool_item.add_material("jar", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "燃料: 焚き火の補充", i.check_list = [], i.check_list.push(this.desc_only("焚き火1回につき固形燃料が1つ必要です。")), i.check_list.push(this.desc_only("固形燃料の材料は燃料マテリアルです。")), i.check_list.push(this.desc_only("燃料マテリアルはクラフトで、")), i.check_list.push(this.desc_only("木材や残飯などから製作できます。")), i.check_list.push(this.need_cond("クラフトで燃料マテリアルを製作する", function (t) {
        return 1 <= t.materials.get_material("fuel");
      })), i.check_list.push(this.need_cond("クラフトで固形燃料を製作する", function (t) {
        return t.hud.item_slot.has_item_instanceof(Q);
      })), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("cooking_kokei_nenryou_fire"), i.reword_tool_item.set_name("マテリアル: 燃料 x 30"), i.reword_tool_item.add_material("fuel", 30), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "鳥の狩猟", i.check_list = [], i.check_list.push(this.need_cond("クラフトで弓を製作する", function (t) {
        return t.hud.item_slot.has_item_instanceof(G);
      })), i.check_list.push(this.desc_only("弓を使用すると、敵にダメージを与える")), i.check_list.push(this.desc_only("矢を発射することができます。")), i.check_list.push(this.desc_only("カモメ等を攻撃して狩りましょう。")), i.check_list.push(this.need_cond("羽根マテリアルを入手する", function (t) {
        return 1 <= t.materials.get_material("feather");
      })), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("feather_white"), i.reword_tool_item.set_name("マテリアル: 羽根 x 3"), i.reword_tool_item.add_material("feather", 3), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "舟の前進", i.check_list = [], i.check_list.push(this.need_cond("クラフトでオールを製作する", function (t) {
        return t.hud.item_slot.has_item_instanceof(kt);
      })), i.check_list.push(this.need_cond("水面近くでオールを使って舟を進める", function (t) {
        return 1 < t.world.ship.velocity;
      })), i.check_list.push(this.desc_only("舟を前に進めていると、")), i.check_list.push(this.desc_only("多くの素材を持った敵対的な鳥が来ます。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("present_box"), i.reword_tool_item.set_name("マテリアル: ビン x 1"), i.reword_tool_item.add_material("jar", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "舟ブロックの撤去と修理", i.check_list = [], i.check_list.push(this.need_cond("クラフトで撤去ハンマーを製作する", function (t) {
        return t.hud.item_slot.has_item_instanceof(vt);
      })), i.check_list.push(this.desc_only("ハンマーで舟ブロックをクリックすると")), i.check_list.push(this.desc_only("そのブロックをアイテムに還元できます。")), i.check_list.push(this.need_cond("クラフトで修理レンチを製作する", function (t) {
        return t.hud.item_slot.has_item_instanceof(It);
      })), i.check_list.push(this.desc_only("レンチで舟ブロックをクリックすると")), i.check_list.push(this.desc_only("敵の攻撃で減った耐久力を回復できます。")), i.reword_tool_item = new e(this.game).set_ship_block(new n(this.game)), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "栽培プランター", i.check_list = [], i.check_list.push(this.need_cond("クラフトでプランターを製作・設置", function (t) {
        return t.world.ship.has_block_instanceof(gt);
      })), i.check_list.push(this.desc_only("プランターを設置すれば、")), i.check_list.push(this.desc_only("いくつかの作物を栽培できます。")), i.check_list.push(this.desc_only("定期的に蒸留ボトルで水をかけると")), i.check_list.push(this.desc_only("成長を早めることができます。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("present_box"), i.reword_tool_item.set_name("マテリアル: ビン x 1"), i.reword_tool_item.add_material("jar", 1), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "レベルフラッグ[1]", i.check_list = [], i.check_list.push(this.need_cond("レベルフラッグ[1]を作成して設置する", function (t) {
        return 1 <= t.world.ship.ship_level;
      })), i.check_list.push(this.desc_only("レベルフラッグを舟に設置すると、")), i.check_list.push(this.desc_only("より強い鳥が現れるようになります。")), i.check_list.push(this.desc_only("強い鳥を倒せば、")), i.check_list.push(this.desc_only("新しいマテリアルが入手できます。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("present_box"), i.reword_tool_item.set_name("マテリアル: 機械部品 x 1"), i.reword_tool_item.add_material("parts", 1), t.push(i);
    }

  }

  class Xt extends At {
    constructor(t) {
      super(t), this.game = t, this.tutorial_level = 1;
    }

    desc_only(t) {
      return {
        description: t,
        is_need_check: !1,
        checked: !1,
        condition_func: function condition_func(t) {
          return !0;
        }
      };
    }

    need_cond(t, i) {
      return {
        description: t,
        is_need_check: !0,
        checked: !1,
        condition_func: i
      };
    }

    setup_tutorial(t) {
      let i = null;
      i = {}, i.level = this.tutorial_level, i.title = "舟を自動で進める", i.check_list = [], i.check_list.push(this.desc_only("帆とエンジン")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("tree_ryuuboku"), i.reword_tool_item.set_name("マテリアル: 木材 x 10"), i.reword_tool_item.add_material("wood", 10), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "舟の自動砲台", i.check_list = [], i.check_list.push(this.desc_only("カタパルト")), i.check_list.push(this.desc_only("オペレート")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("tree_ryuuboku"), i.reword_tool_item.set_name("マテリアル: 木材 x 10"), i.reword_tool_item.add_material("wood", 10), t.push(i), i = {}, i.level = this.tutorial_level, i.title = "レベルフラッグ[2]", i.check_list = [], i.check_list.push(this.need_cond("レベルフラッグ[2]を作成して設置する", function (t) {
        return 2 <= t.world.ship.ship_level;
      })), i.check_list.push(this.desc_only("材料を効率よく集めて、")), i.check_list.push(this.desc_only("次のレベルフラッグを立てましょう。")), i.reword_tool_item = new x(this.game), i.reword_tool_item.set_image("present_box"), i.reword_tool_item.set_name("マテリアル: 電子回路 x 1"), i.reword_tool_item.add_material("circuit", 1), t.push(i);
    }

  }

  class Gt {
    constructor(t) {
      this.game = t, this.tutorial_list = [], this.condition_check_timer_max = 10, this.condition_check_timer_count = this.condition_check_timer_max, this.complete_flag_list = [], this.setup_tutorial();
    }

    get_list() {
      return this.tutorial_list;
    }

    complete(t) {
      this.complete_flag_list[t] = !0;
    }

    setup_tutorial() {
      new At(this.game).setup_tutorial(this.tutorial_list), new Xt(this.game).setup_tutorial(this.tutorial_list);

      for (let t of this.tutorial_list) t.cleared = !1, 0 == t.level ? t.is_open = !0 : t.is_open = !1;
    }

    update_tutorial_is_open() {
      for (let t of this.tutorial_list) 0 == t.is_open && t.level <= this.game.world.ship.ship_level && (t.is_open = !0);
    }

    on_update() {
      if (this.condition_check_timer_count) this.condition_check_timer_count -= 1;else {
        this.condition_check_timer_count = this.condition_check_timer_max;

        for (let t of this.tutorial_list) if (t.is_open && !t.cleared) for (let i of t.check_list) i.is_need_check && !i.checked && i.condition_func(this.game) && (i.checked = !0, this.game.log("次のチュートリアル項目を達成しました:"), this.game.log(t.title + ": " + i.description));
      }
    }

    save_data() {
      let t = {
        tutorial_list: []
      };

      for (let i = 0; i < this.tutorial_list.length; i++) {
        t.tutorial_list[i] = {}, t.tutorial_list[i].cleared = this.tutorial_list[i].cleared, t.tutorial_list[i].is_open = this.tutorial_list[i].is_open, t.tutorial_list[i].check_list = [];

        for (let e = 0; e < this.tutorial_list[i].check_list.length; e++) t.tutorial_list[i].check_list[e] = {}, t.tutorial_list[i].check_list[e].checked = this.tutorial_list[i].check_list[e].checked;
      }

      return t;
    }

    load_data(t) {
      for (let i = 0; i < t.tutorial_list.length; i++) {
        this.tutorial_list[i].cleared = t.tutorial_list[i].cleared, this.tutorial_list[i].is_open = t.tutorial_list[i].is_open;

        for (let e = 0; e < t.tutorial_list[i].check_list.length; e++) this.tutorial_list[i].check_list[e].checked = t.tutorial_list[i].check_list[e].checked;
      }
    }

  }

  class Ht {
    constructor(t) {
      this.game = t, this.tutorial_data = new Gt(this.game), this.tutorial_list = this.game.tutorial_data.get_list(), this.config_cursor = 1, this.scroll_amount = -1, this.menu_icon = this.game.image_library.get_image("setsumeisyo_manual"), this.batsu_icon = this.game.image_library.get_image("batsu"), this.check_icon = this.game.image_library.get_image("check"), this.arrow_up_icon = this.game.image_library.get_image("arrow_up"), this.arrow_down_icon = this.game.image_library.get_image("arrow_down");
    }

    get_menu_icon() {
      return this.menu_icon;
    }

    on_update() {
      this.game.input_controller.get_press_up() && (2 < this.config_cursor ? this.config_cursor -= 1 : 0 <= this.scroll_amount ? this.scroll_amount -= 1 : 0 < this.config_cursor && (this.config_cursor -= 1)), this.game.input_controller.get_press_down() && (this.config_cursor < Ht.DOWN_ARROW_INDEX - 2 ? this.config_cursor += 1 : this.scroll_amount + Ht.DOWN_ARROW_INDEX < this.tutorial_list.length ? this.scroll_amount += 1 : this.config_cursor < Ht.DOWN_ARROW_INDEX - 1 && (this.config_cursor += 1)), this.game.input_controller.get_wheel_up() && (0 <= this.scroll_amount ? this.scroll_amount -= 1 : 1 < this.config_cursor && (this.config_cursor -= 1)), this.game.input_controller.get_wheel_down() && (this.scroll_amount + Ht.DOWN_ARROW_INDEX < this.tutorial_list.length ? this.scroll_amount += 1 : this.config_cursor < Ht.DOWN_ARROW_INDEX - 1 && (this.config_cursor += 1)), this.game.input_controller.get_mouse_press() && this.on_click(this.game.input_controller.mouse_x - Ut.MENU_MARGIN_LEFT, this.game.input_controller.mouse_y - Ut.MENU_MARGIN_TOP);
    }

    on_click(t, i) {
      for (let e = 0; e <= Ht.DOWN_ARROW_INDEX; e++) {
        let s = Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + Ht.LIST_CURSOR_ADJUST + Ht.LIST_TEXT_HEIGHT * e;
        Ht.LIST_X < t && t < Ht.LIST_X + Ht.LIST_WIDTH && s < i && i < s + Ht.LIST_TEXT_HEIGHT && (0 == e ? 0 <= this.scroll_amount ? this.scroll_amount -= 1 : 1 < this.config_cursor && (this.config_cursor -= 1) : e == Ht.DOWN_ARROW_INDEX ? this.scroll_amount + Ht.DOWN_ARROW_INDEX < this.tutorial_list.length ? this.scroll_amount += 1 : this.config_cursor < Ht.DOWN_ARROW_INDEX - 1 && (this.config_cursor += 1) : e == this.config_cursor || (this.config_cursor = e));
      }

      Ht.CONFIG_BUTTON_X < t && t < Ht.CONFIG_BUTTON_X + Ht.CONFIG_BUTTON_WIDTH && Ht.CONFIG_BUTTON_Y < i && i < Ht.CONFIG_BUTTON_Y + Ht.CONFIG_BUTTON_HEIGHT && this.check_can_get_reword(this.tutorial_list[this.calc_cursor_in_scroll()]) && (this.tutorial_list[this.calc_cursor_in_scroll()].cleared = !0, this.game.world.give_tool_item_player(this.tutorial_list[this.calc_cursor_in_scroll()].reword_tool_item));
    }

    check_can_get_reword(t) {
      if (this.config_cursor <= 0 || Ht.DOWN_ARROW_INDEX <= this.config_cursor) return !1;
      if (t.cleared) return !1;

      for (let i of t.check_list) if (i.is_need_check && !i.checked) return !1;

      return !0;
    }

    calc_cursor_in_scroll() {
      return this.config_cursor + this.scroll_amount;
    }

    on_draw(t) {
      t.fillStyle = Ht.TITLE_COLOR, t.font = Ht.TITLE_FONT, t.fillText("チュートリアル Tutorial", Ht.TITLE_X, Ht.TITLE_Y), t.textBaseline = "top", t.fillStyle = "rgb(20,15,10)", t.fillRect(Ht.LIST_X, Ht.LIST_Y, Ht.LIST_WIDTH, Ht.LIST_HEIGHT);

      for (let i = 0; i <= Ht.DOWN_ARROW_INDEX; i++) i == this.config_cursor && (t.fillStyle = Ht.LIST_CURSOR_COLOR, t.fillRect(Ht.LIST_X, Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + Ht.LIST_CURSOR_ADJUST + Ht.LIST_TEXT_HEIGHT * i, Ht.LIST_WIDTH, Ht.LIST_TEXT_HEIGHT)), this.tutorial_list[i + this.scroll_amount] && 0 < i && i < Ht.DOWN_ARROW_INDEX && (t.fillStyle = Ht.LIST_TEXT_COLOR, t.font = Ht.LIST_TEXT_FONT, this.tutorial_list[i + this.scroll_amount].is_open ? (t.fillText(this.tutorial_list[i + this.scroll_amount].title, Ht.LIST_X + Ht.LIST_TEXT_MARGIN_LEFT, Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + Ht.LIST_TEXT_HEIGHT * i), this.tutorial_list[i + this.scroll_amount].cleared && t.drawImage(this.check_icon, Ht.LIST_X, Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + Ht.LIST_TEXT_HEIGHT * i - .25 * Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT)) : t.fillText("--- レベル[" + this.tutorial_list[i + this.scroll_amount].level + "]で開放 ---", Ht.LIST_X + Ht.LIST_TEXT_MARGIN_LEFT, Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + Ht.LIST_TEXT_HEIGHT * i));

      if (t.font = Ht.DESC_TEXT_FONT, t.fillStyle = Ht.DESC_TEXT_COLOR, 0 == this.config_cursor) t.fillText("リストを上にスクロールします。", Ht.DESC_TEXT_X, Ht.DESC_TEXT_Y + 1 * Ht.LIST_TEXT_HEIGHT);else if (this.config_cursor == Ht.DOWN_ARROW_INDEX) t.fillText("リストを下にスクロールします。", Ht.DESC_TEXT_X, Ht.DESC_TEXT_Y + 1 * Ht.LIST_TEXT_HEIGHT);else if (0 == this.tutorial_list[this.calc_cursor_in_scroll()].is_open) t.fillText("未開放のチュートリアルです。", Ht.DESC_TEXT_X, Ht.DESC_TEXT_Y + 1 * Ht.LIST_TEXT_HEIGHT);else {
        t.fillStyle = Ht.DESC_TEXT_COLOR, t.fillText(this.tutorial_list[this.calc_cursor_in_scroll()].title, Ht.DESC_TEXT_X, Ht.DESC_TEXT_Y - 10);

        for (let i = 0; i < this.tutorial_list[this.calc_cursor_in_scroll()].check_list.length; i++) t.fillText(this.tutorial_list[this.calc_cursor_in_scroll()].check_list[i].description, Ht.DESC_TEXT_X, Ht.DESC_TEXT_Y + Ht.LIST_TEXT_HEIGHT * (i + 1)), this.tutorial_list[this.calc_cursor_in_scroll()].check_list[i].is_need_check && (this.tutorial_list[this.calc_cursor_in_scroll()].check_list[i].checked ? t.drawImage(this.check_icon, Ht.DESC_TEXT_X - Ht.LIST_TEXT_HEIGHT, Ht.DESC_TEXT_Y + Ht.LIST_TEXT_HEIGHT * (i + 1) - .25 * Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT) : t.drawImage(this.batsu_icon, Ht.DESC_TEXT_X - Ht.LIST_TEXT_HEIGHT, Ht.DESC_TEXT_Y + Ht.LIST_TEXT_HEIGHT * (i + 1) - .25 * Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT));

        t.fillText("完了報酬: ", Ht.REWORD_TEXT_X, Ht.REWORD_TEXT_Y), t.drawImage(this.tutorial_list[this.calc_cursor_in_scroll()].reword_tool_item.get_image(), Ht.REWORD_ICON_X, Ht.REWORD_TEXT_Y - 16, 32, 32), t.fillText(this.tutorial_list[this.calc_cursor_in_scroll()].reword_tool_item.get_name(), Ht.REWORD_NAME_X, Ht.REWORD_TEXT_Y);
      }
      t.drawImage(this.arrow_up_icon, Ht.LIST_X + Ht.ARROW_1_X, Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + 0 * Ht.LIST_TEXT_HEIGHT - .25 * Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT), t.drawImage(this.arrow_up_icon, Ht.LIST_X + Ht.ARROW_2_X, Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + 0 * Ht.LIST_TEXT_HEIGHT - .25 * Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT), t.drawImage(this.arrow_down_icon, Ht.LIST_X + Ht.ARROW_1_X, Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + Ht.LIST_TEXT_HEIGHT * Ht.DOWN_ARROW_INDEX - .25 * Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT), t.drawImage(this.arrow_down_icon, Ht.LIST_X + Ht.ARROW_2_X, Ht.LIST_Y + Ht.LIST_TEXT_MARGIN_TOP + Ht.LIST_TEXT_HEIGHT * Ht.DOWN_ARROW_INDEX - .25 * Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT, Ht.LIST_TEXT_HEIGHT), t.fillStyle = Ht.CONFIG_BUTTON_COLOR, t.fillRect(Ht.CONFIG_BUTTON_X, Ht.CONFIG_BUTTON_Y, Ht.CONFIG_BUTTON_WIDTH, Ht.CONFIG_BUTTON_HEIGHT), t.fillStyle = Ht.CONFIG_BUTTON_TEXT_COLOR, t.font = Ht.CONFIG_BUTTON_FONT, t.textAlign = "center", this.check_can_get_reword(this.tutorial_list[this.calc_cursor_in_scroll()]) || (t.fillStyle = Ht.CONFIG_BUTTON_TEXT_COLOR_DISABLE), t.fillText("完了! (Enter)", Ht.CONFIG_BUTTON_X + Ht.CONFIG_BUTTON_TEXT_X, Ht.CONFIG_BUTTON_Y + Ht.CONFIG_BUTTON_TEXT_Y);
    }

  }

  _defineProperty(Ht, "TITLE_X", 100);

  _defineProperty(Ht, "TITLE_Y", 40);

  _defineProperty(Ht, "TITLE_COLOR", "rgb(40,30,20)");

  _defineProperty(Ht, "TITLE_FONT", "bold 32px monospace");

  _defineProperty(Ht, "LIST_X", 20);

  _defineProperty(Ht, "LIST_Y", 60);

  _defineProperty(Ht, "LIST_WIDTH", 300);

  _defineProperty(Ht, "LIST_HEIGHT", 320);

  _defineProperty(Ht, "LIST_TEXT_MARGIN_LEFT", 32);

  _defineProperty(Ht, "LIST_TEXT_MARGIN_TOP", 12);

  _defineProperty(Ht, "LIST_TEXT_FONT", "bold 20px monospace");

  _defineProperty(Ht, "LIST_TEXT_COLOR", "rgb(240,240,240)");

  _defineProperty(Ht, "LIST_TEXT_COLOR_DISABLE", "rgb(100,100,100)");

  _defineProperty(Ht, "LIST_TEXT_HEIGHT", 30);

  _defineProperty(Ht, "LIST_CURSOR_COLOR", "rgb(50,50,150)");

  _defineProperty(Ht, "LIST_CURSOR_ADJUST", -6);

  _defineProperty(Ht, "DESC_TEXT_X", 360);

  _defineProperty(Ht, "DESC_TEXT_Y", 80);

  _defineProperty(Ht, "DESC_TEXT_FONT", "bold 18px monospace");

  _defineProperty(Ht, "DESC_TEXT_COLOR", "rgb(40,30,20)");

  _defineProperty(Ht, "DESC_TEXT_COLOR_GREEN", "rgb(20,200,20)");

  _defineProperty(Ht, "DESC_TEXT_COLOR_RED", "rgb(200,20,20)");

  _defineProperty(Ht, "DESC_TEXT_HEIGHT", 28);

  _defineProperty(Ht, "REWORD_TEXT_X", 330);

  _defineProperty(Ht, "REWORD_TEXT_Y", 300);

  _defineProperty(Ht, "REWORD_ICON_X", 420);

  _defineProperty(Ht, "REWORD_NAME_X", 470);

  _defineProperty(Ht, "CONFIG_BUTTON_X", 400);

  _defineProperty(Ht, "CONFIG_BUTTON_Y", 330);

  _defineProperty(Ht, "CONFIG_BUTTON_HEIGHT", 50);

  _defineProperty(Ht, "CONFIG_BUTTON_WIDTH", 200);

  _defineProperty(Ht, "CONFIG_BUTTON_COLOR", "rgb(160,160,160)");

  _defineProperty(Ht, "CONFIG_BUTTON_TEXT_COLOR", "rgb(40,30,20)");

  _defineProperty(Ht, "CONFIG_BUTTON_TEXT_COLOR_DISABLE", "rgb(120,120,120)");

  _defineProperty(Ht, "CONFIG_BUTTON_FONT", "bold 24px monospace");

  _defineProperty(Ht, "CONFIG_BUTTON_TEXT_Y", 12);

  _defineProperty(Ht, "CONFIG_BUTTON_TEXT_X", 100);

  _defineProperty(Ht, "ARROW_1_X", 30);

  _defineProperty(Ht, "ARROW_2_X", 230);

  _defineProperty(Ht, "DOWN_ARROW_INDEX", 9);

  class Ut {
    constructor(t) {
      this.game = t, this.is_menu_open = !1, this.is_menu_open_keep_press = !1, this.menu_list = [], this.menu_inventory = new P(t), this.menu_list[0] = new Ht(t), this.menu_list[1] = this.menu_inventory, this.menu_list[2] = new Lt(t), this.menu_list[3] = new Mt(t), this.menu_list[4] = new Rt(t), this.menu_count = 5, this.menu_list_cursor = 0, this.menu_open_icon = this.game.image_library.get_image("menu"), this.menu_close_icon = this.game.image_library.get_image("batsu");
    }

    on_update() {
      if (this.is_menu_open) {
        if ((this.game.input_controller.get_press_tab() || this.game.input_controller.get_press_esc()) && (this.is_menu_open = !1), this.game.input_controller.is_pressed_key.KeyQ && -1 < this.menu_list_cursor && (this.menu_list_cursor -= 1), this.game.input_controller.is_pressed_key.KeyE && this.menu_list_cursor < this.menu_list.length - 1 && (this.menu_list_cursor += 1), this.menu_list[this.menu_list_cursor] && this.menu_list[this.menu_list_cursor].on_update(), this.game.input_controller.get_mouse_press() && this.game.input_controller.get_mouse_press()) {
          this.hittest_menu_open_button(this.game.input_controller.mouse_x, this.game.input_controller.mouse_y) && (this.is_menu_open = !1, this.game.sound_library.play_sound("513/kick/C5"));

          for (let t = 0; t < this.menu_list.length; t++) if (this.hittest_menu_tabs(t, this.game.input_controller.mouse_x, this.game.input_controller.mouse_y)) {
            this.menu_list_cursor = t;
            break;
          }
        }
      } else this.game.input_controller.get_press_tab() && (this.open_menu(), this.game.sound_library.play_sound("513/tom/G3")), this.game.input_controller.get_mouse_press() && this.hittest_menu_open_button(this.game.input_controller.mouse_x, this.game.input_controller.mouse_y) && (this.open_menu(), this.game.sound_library.play_sound("513/tom/G3"));

      0 == this.game.world.player.is_in_ship() && (this.is_menu_open = !1);
    }

    open_menu() {
      this.game.world.player.is_in_ship() || this.game.input_controller.is_down_key.KeyG ? this.is_menu_open = !0 : this.game.log("メニューは舟の上でのみ開けます。");
    }

    hittest_menu_open_button(t, i) {
      let e = Ut.MENU_ICON_MARGIN_LEFT - (Ut.MENU_ICON_SIZE + Ut.MENU_ICON_SPACING);
      return e < t && t < e + Ut.MENU_ICON_SIZE && Ut.MENU_ICON_MARGIN_TOP < i && i < Ut.MENU_ICON_MARGIN_TOP + Ut.MENU_ICON_SIZE;
    }

    hittest_menu_tabs(t, i, e) {
      let s = Ut.MENU_ICON_MARGIN_LEFT + t * (Ut.MENU_ICON_SIZE + Ut.MENU_ICON_SPACING);
      return s < i && i < s + Ut.MENU_ICON_SIZE && Ut.MENU_ICON_MARGIN_TOP < e && e < Ut.MENU_ICON_MARGIN_TOP + Ut.MENU_ICON_SIZE;
    }

    on_draw(t) {
      if (-1 == this.menu_list_cursor ? t.strokeStyle = "rgb(250,0,0)" : t.strokeStyle = "rgb(200,200,200)", t.strokeRect(Ut.MENU_ICON_MARGIN_LEFT - (Ut.MENU_ICON_SIZE + Ut.MENU_ICON_SPACING), Ut.MENU_ICON_MARGIN_TOP, Ut.MENU_ICON_SIZE, Ut.MENU_ICON_SIZE), t.drawImage(this.menu_open_icon, Ut.MENU_ICON_MARGIN_LEFT - (Ut.MENU_ICON_SIZE + Ut.MENU_ICON_SPACING), Ut.MENU_ICON_MARGIN_TOP, Ut.MENU_ICON_SIZE, Ut.MENU_ICON_SIZE), t.fillText("[Tab]: メニュー", Ut.MENU_ICON_MARGIN_LEFT - (Ut.MENU_ICON_SIZE + Ut.MENU_ICON_SPACING), Ut.MENU_ICON_MARGIN_TOP + Ut.MENU_ICON_SIZE + 20), this.is_menu_open) {
        t.save(), t.translate(Ut.MENU_MARGIN_LEFT, Ut.MENU_MARGIN_TOP), t.fillStyle = "rgb(210,205,200)", t.fillRect(0, 0, Ut.MENU_WIDTH, Ut.MENU_HEIGHT), t.strokeStyle = "rgb(100,90,70)", t.lineWidth = 2, t.strokeRect(0, 0, Ut.MENU_WIDTH, Ut.MENU_HEIGHT), this.menu_list[this.menu_list_cursor] && this.menu_list[this.menu_list_cursor].on_draw(t), t.restore(), t.drawImage(this.menu_close_icon, Ut.MENU_ICON_MARGIN_LEFT - (Ut.MENU_ICON_SIZE + Ut.MENU_ICON_SPACING), Ut.MENU_ICON_MARGIN_TOP, Ut.MENU_ICON_SIZE, Ut.MENU_ICON_SIZE);

        for (let i = 0; i < this.menu_list.length; i++) i == this.menu_list_cursor ? t.strokeStyle = "rgb(250,0,0)" : t.strokeStyle = "rgb(200,200,200)", t.strokeRect(Ut.MENU_ICON_MARGIN_LEFT + i * (Ut.MENU_ICON_SIZE + Ut.MENU_ICON_SPACING), Ut.MENU_ICON_MARGIN_TOP, Ut.MENU_ICON_SIZE, Ut.MENU_ICON_SIZE), null != this.menu_list[i] && t.drawImage(this.menu_list[i].get_menu_icon(), Ut.MENU_ICON_MARGIN_LEFT + i * (Ut.MENU_ICON_SIZE + Ut.MENU_ICON_SPACING), Ut.MENU_ICON_MARGIN_TOP, Ut.MENU_ICON_SIZE, Ut.MENU_ICON_SIZE);
      }
    }

  }

  _defineProperty(Ut, "MENU_WIDTH", 700);

  _defineProperty(Ut, "MENU_HEIGHT", 400);

  _defineProperty(Ut, "MENU_MARGIN_TOP", 100);

  _defineProperty(Ut, "MENU_MARGIN_LEFT", 130);

  _defineProperty(Ut, "MENU_ICON_SIZE", 70);

  _defineProperty(Ut, "MENU_ICON_MARGIN_LEFT", 100);

  _defineProperty(Ut, "MENU_ICON_MARGIN_TOP", 20);

  _defineProperty(Ut, "MENU_ICON_SPACING", 10);

  class Dt {
    constructor(t) {
      this.game = t, this.message_log = [];

      for (let t = 0; t < Dt.LOG_ROWS; t++) this.message_log[t] = "~";
    }

    push_log(t) {
      this.message_log.shift(), this.message_log.push(t);
    }

    on_update() {}

    on_draw(t) {
      t.fillStyle = Dt.TEXT_COLOR, t.strokeStyle = Dt.TEXT_COLOR_STROKE, t.lineWidth = 2, t.textAlign = "start", t.font = Dt.FONT;

      for (let i = 0; i < Dt.LOG_ROWS; i++) t.fillText(this.message_log[i], Dt.MARGIN_LEFT, Dt.MARGIN_TOP + i * Dt.TEXT_HEIGHT);

      t.textAlign = "start";
    }

  }

  _defineProperty(Dt, "MARGIN_TOP", 270);

  _defineProperty(Dt, "MARGIN_LEFT", 10);

  _defineProperty(Dt, "FONT", "bold 16px monospace");

  _defineProperty(Dt, "TEXT_COLOR", "rgb(200,200,200)");

  _defineProperty(Dt, "TEXT_COLOR_STROKE", "rgb(50,50,50)");

  _defineProperty(Dt, "TEXT_HEIGHT", 20);

  _defineProperty(Dt, "LOG_ROWS", 12);

  class Pt {
    constructor(t) {
      this.game = t, this.itemslot_margin_bottom = 40, this.itemslot_size = 50, this.itemslot_spacing = 10, this.itemslot_count = 9, this.itemslot_start_x = 99, this.itemslot_start_y = 99, this.calc_itemslot_coodinate(), this.item_slot = [], this.is_equipped_slot = [];

      for (let t = 0; t < Pt.ITEM_SLOT_COUNT; t++) this.item_slot[t] = null, this.is_equipped_slot[t] = !1;

      this.item_slot_cursor = 0, this.is_mouse_holding = !1, this.is_config_auto_material_deconstruct = !0;
    }

    refresh() {
      this.game.world.player.clear_equip_status();

      for (let t = 0; t < Pt.ITEM_SLOT_COUNT; t++) if (this.item_slot[t] instanceof a) {
        let i = this.game.world.player.equip_item(this.item_slot[t]);
        this.is_equipped_slot[t] = i;
      } else this.is_equipped_slot[t] = !1;
    }

    activate_item(t, i, e, s) {
      this.item_slot[this.item_slot_cursor] && (this.item_slot[this.item_slot_cursor].on_click(t, i, e, s), this.item_slot[this.item_slot_cursor].is_consumed && (this.item_slot[this.item_slot_cursor] = null));
    }

    keep_activate_item(t, i, e, s) {
      this.item_slot[this.item_slot_cursor] && (this.item_slot[this.item_slot_cursor].on_keep_click(t, i, e, s), this.item_slot[this.item_slot_cursor].is_consumed && (this.item_slot[this.item_slot_cursor] = null));
    }

    get_active_item() {
      return this.item_slot[this.item_slot_cursor];
    }

    delete_active_item() {
      this.item_slot[this.item_slot_cursor] = null;
    }

    put_pickup_item(t, i, e) {
      if (this.is_config_auto_material_deconstruct && t instanceof x) return t.on_click(0, 0, 0, 0), !0;

      if (e) {
        for (let i = Pt.ITEM_SLOT_COUNT - 1; 0 <= i; i--) if (null == this.item_slot[i]) return this.item_slot[i] = t, this.refresh(), !0;
      } else for (let i = 0; i < Pt.ITEM_SLOT_COUNT; i++) if (null == this.item_slot[i]) return this.item_slot[i] = t, this.refresh(), !0;

      return !!i && this.game.inventory.put_pickup_item(t, e);
    }

    has_empty_space(t) {
      for (let t = Pt.ITEM_SLOT_COUNT - 1; 0 <= t; t--) if (null == this.item_slot[t]) return !0;

      return !!t && this.game.inventory.has_empty_space();
    }

    has_item_instanceof(t) {
      for (let i = 0; i < Pt.ITEM_SLOT_COUNT; i++) if (null != this.item_slot[i] && this.item_slot[i] instanceof t) return !0;

      return !1;
    }

    calc_itemslot_coodinate() {
      this.itemslot_start_y = this.game.SCREEN_HEIGHT - this.itemslot_margin_bottom - this.itemslot_size, this.itemslot_start_x = this.game.SCREEN_WIDTH / 2 - (this.itemslot_size + this.itemslot_spacing) * this.itemslot_count / 2;
    }

    is_menu_open() {
      return this.game.hud.hud_menu.is_menu_open;
    }

    on_update() {
      for (let t = Pt.ITEM_SLOT_COUNT - 1; 0 <= t; t--) null != this.item_slot[t] && this.item_slot[t].on_update();

      if (this.game.input_controller.is_wheel_up && (this.is_mouse_holding = !1, this.item_slot_cursor -= 1, this.item_slot_cursor < 0 && (this.item_slot_cursor = Pt.ITEM_SLOT_COUNT - 1)), this.game.input_controller.is_wheel_down && (this.is_mouse_holding = !1, this.item_slot_cursor += 1, Pt.ITEM_SLOT_COUNT <= this.item_slot_cursor && (this.item_slot_cursor = 0)), this.game.input_controller.is_pressed_key.Digit1 && (this.is_mouse_holding = !1, this.item_slot_cursor = 0), this.game.input_controller.is_pressed_key.Digit2 && (this.is_mouse_holding = !1, this.item_slot_cursor = 1), this.game.input_controller.is_pressed_key.Digit3 && (this.is_mouse_holding = !1, this.item_slot_cursor = 2), this.game.input_controller.is_pressed_key.Digit4 && (this.is_mouse_holding = !1, this.item_slot_cursor = 3), this.game.input_controller.is_pressed_key.Digit5 && (this.is_mouse_holding = !1, this.item_slot_cursor = 4), this.game.input_controller.is_pressed_key.Digit6 && (this.is_mouse_holding = !1, this.item_slot_cursor = 5), this.game.input_controller.is_pressed_key.Digit7 && (this.is_mouse_holding = !1, this.item_slot_cursor = 6), this.game.input_controller.is_pressed_key.Digit8 && (this.is_mouse_holding = !1, this.item_slot_cursor = 7), this.game.input_controller.is_pressed_key.Digit9 && (this.is_mouse_holding = !1, this.item_slot_cursor = 8), this.game.input_controller.get_mouse_press()) {
        let t = this.game.input_controller.mouse_y,
            i = this.game.input_controller.mouse_x;
        if (this.itemslot_start_y < t && t < this.itemslot_start_y + this.itemslot_size) for (let t = 0; t <= 8; t++) {
          let e = this.itemslot_start_x + t * (this.itemslot_size + this.itemslot_spacing);

          if (e < i && i < e + this.itemslot_size) {
            if (this.game.input_controller.is_mouse_press_consumed = !0, this.is_menu_open()) {
              if (this.is_mouse_holding) {
                let i = this.item_slot[t];
                this.item_slot[t] = this.item_slot[this.item_slot_cursor], this.item_slot[this.item_slot_cursor] = i, this.is_mouse_holding = !1;
              } else if (0 <= this.game.hud.hud_menu.menu_inventory.mouse_holding_index) {
                let i = this.game.inventory.tool_item_inventory[this.game.hud.hud_menu.menu_inventory.mouse_holding_index];
                this.game.inventory.tool_item_inventory[this.game.hud.hud_menu.menu_inventory.mouse_holding_index] = this.item_slot[t], this.item_slot[t] = i, this.game.hud.hud_menu.menu_inventory.mouse_holding_index = -1;
              } else null != this.item_slot[t] && (this.is_mouse_holding = !0);
            } else this.is_mouse_holding = !1, this.item_slot_cursor == t && null != this.item_slot[this.item_slot_cursor] && this.item_slot[this.item_slot_cursor].dump_information_to_log();
            this.item_slot_cursor = t, this.refresh();
          }
        }
      }
    }

    on_draw(t) {
      for (let i = 0; i <= 8; i++) {
        if (t.save(), t.font = "bold 16px monospace", t.textBaseline = "top", t.strokeStyle = "rgb(188,188,188)", t.fillStyle = "rgb(200,200,200)", t.fillText(i + 1, this.itemslot_start_x + i * (this.itemslot_size + this.itemslot_spacing) + 3, this.itemslot_start_y + 3), t.restore(), (i != this.item_slot_cursor || !this.is_mouse_holding) && this.item_slot[i]) {
          let e = this.itemslot_start_x + i * (this.itemslot_size + this.itemslot_spacing);
          t.drawImage(this.item_slot[i].get_image(), e, this.itemslot_start_y, this.itemslot_size, this.itemslot_size), t.font = "bold 16px monospace", t.fillStyle = "rgb(200,200,200)", t.fillText(this.item_slot[i].get_subtitle(), this.itemslot_start_x + i * (this.itemslot_size + this.itemslot_spacing) + 3, this.itemslot_start_y + this.itemslot_size - 3);
          let s = this.item_slot[i].get_durability_rate();

          if (1 != s) {
            let i = e + 5,
                _ = this.itemslot_size - 10,
                a = 6,
                h = this.itemslot_start_y + this.itemslot_size - a - 4,
                o = Math.min(250, Math.max(1, 500 - 500 * s)),
                l = Math.min(250, Math.max(1, 500 * s));

            t.fillStyle = "rgb(" + o + "," + l + ",30)", t.fillRect(i, h, _ * s, a), t.strokeRect(i, h, _, a);
          }
        }

        i == this.item_slot_cursor ? (t.strokeStyle = "rgb(222,30,30)", t.strokeRect(this.itemslot_start_x + i * (this.itemslot_size + this.itemslot_spacing), this.itemslot_start_y, this.itemslot_size, this.itemslot_size)) : this.is_equipped_slot[i] ? (t.strokeStyle = "rgb(20,250,20)", t.strokeRect(this.itemslot_start_x + i * (this.itemslot_size + this.itemslot_spacing), this.itemslot_start_y, this.itemslot_size, this.itemslot_size)) : (t.strokeStyle = "rgb(222,222,222)", t.strokeRect(this.itemslot_start_x + i * (this.itemslot_size + this.itemslot_spacing), this.itemslot_start_y, this.itemslot_size, this.itemslot_size));
      }

      this.is_mouse_holding && null != this.item_slot[this.item_slot_cursor] && t.drawImage(this.item_slot[this.item_slot_cursor].get_image(), this.game.input_controller.mouse_x, this.game.input_controller.mouse_y, this.itemslot_size, this.itemslot_size);
    }

    load_data(t) {
      for (let i = 0; i < this.itemslot_count; i++) this.item_slot[i] = this.game.save_data_manager.deserialize_item(t[i]);

      this.refresh();
    }

    save_data() {
      let t = [];

      for (let i = 0; i < this.itemslot_count; i++) this.item_slot[i] ? t.push(this.item_slot[i].save_data()) : t.push(null);

      return t;
    }

    cheat() {
      this.item_slot[1] = new bt(this.game), this.item_slot[2] = new y(this.game), this.refresh();
    }

  }

  _defineProperty(Pt, "ITEM_SLOT_COUNT", 9);

  class Ft {
    constructor(t) {
      this.game = t, this.player = this.game.world.player, this.icon_hp = this.game.image_library.get_image("heart_blur"), this.icon_sp = this.game.image_library.get_image("denryoku_mark"), this.icon_happiness = this.game.image_library.get_image("mark_face_laugh"), this.icon_hunger = this.game.image_library.get_image("wasyoku_yakizakana"), this.icon_thirst = this.game.image_library.get_image("tsuyu_mark09_ame");
    }

    on_update() {}

    draw_guage(t, i, e) {
      t.beginPath(), t.moveTo(0, i * Ft.STATUS_HEIGHT), t.lineTo(Ft.GUAGE_LENGTH * e, i * Ft.STATUS_HEIGHT - Ft.GUAGE_TILT * e), t.lineTo(Ft.GUAGE_LENGTH * e, 20 + i * Ft.STATUS_HEIGHT - Ft.GUAGE_TILT * e), t.lineTo(0, 20 + i * Ft.STATUS_HEIGHT), t.closePath(), t.fill(), t.beginPath(), t.moveTo(0, i * Ft.STATUS_HEIGHT), t.lineTo(Ft.GUAGE_LENGTH, i * Ft.STATUS_HEIGHT - Ft.GUAGE_TILT), t.lineTo(Ft.GUAGE_LENGTH, 20 + i * Ft.STATUS_HEIGHT - Ft.GUAGE_TILT), t.lineTo(0, 20 + i * Ft.STATUS_HEIGHT), t.closePath(), t.stroke();
    }

    on_draw(t) {
      t.save(), t.translate(Ft.MARGIN_LEFT, Ft.MARGIN_TOP), t.strokeStyle = "rgb(200,200,200)", t.fillStyle = "rgb(200,50,20)", t.drawImage(this.icon_hp, Ft.ICON_X, Ft.ICON_Y + 0 * Ft.STATUS_HEIGHT, 24, 24), this.draw_guage(t, 0, this.player.health.hp / this.player.health.max_hp), t.fillStyle = "rgb(250,250,20)", t.drawImage(this.icon_sp, Ft.ICON_X, Ft.ICON_Y + 1 * Ft.STATUS_HEIGHT, 24, 24), this.draw_guage(t, 1, this.player.health.sp / this.player.health.max_sp), t.fillStyle = "rgb(200,150,50)", t.drawImage(this.icon_hunger, Ft.ICON_X, Ft.ICON_Y + 3 * Ft.STATUS_HEIGHT, 24, 24), this.draw_guage(t, 3, this.player.health.hunger / this.player.health.max_hunger), t.fillStyle = "rgb(20,200,200)", t.drawImage(this.icon_thirst, Ft.ICON_X, Ft.ICON_Y + 4 * Ft.STATUS_HEIGHT, 24, 24), this.draw_guage(t, 4, this.player.health.thirst / this.player.health.max_thirst), t.restore();
    }

  }

  _defineProperty(Ft, "MARGIN_LEFT", 800);

  _defineProperty(Ft, "MARGIN_TOP", 450);

  _defineProperty(Ft, "STATUS_HEIGHT", 30);

  _defineProperty(Ft, "GUAGE_LENGTH", 120);

  _defineProperty(Ft, "GUAGE_TILT", 20);

  _defineProperty(Ft, "ICON_X", -30);

  _defineProperty(Ft, "ICON_Y", -2);

  _defineProperty(Ft, "TEXT_X", 145);

  class Bt {
    constructor(t) {
      this.game = t;
    }

    on_update() {}

    on_draw(t) {
      t.save(), t.fillStyle = Bt.TEXT_COLOR, t.font = Bt.FONT, t.textAlign = "end", t.fillText(Math.floor(this.game.world.player.y / -32) + "m :高度", Bt.MARGIN_LEFT, Bt.MARGIN_TOP + 0 * Bt.TEXT_HEIGHT), 0 <= this.game.world.player.x ? t.fillText(Math.floor(this.game.world.player.x / 32) + "m :前方", Bt.MARGIN_LEFT, Bt.MARGIN_TOP + 1 * Bt.TEXT_HEIGHT) : t.fillText(Math.floor(this.game.world.player.x / -32) + "m :後方", Bt.MARGIN_LEFT, Bt.MARGIN_TOP + 1 * Bt.TEXT_HEIGHT), t.restore();
    }

  }

  _defineProperty(Bt, "MARGIN_TOP", 30);

  _defineProperty(Bt, "MARGIN_LEFT", 940);

  _defineProperty(Bt, "FONT", "bold 16px monospace");

  _defineProperty(Bt, "TEXT_COLOR", "rgb(200,200,200)");

  _defineProperty(Bt, "TEXT_HEIGHT", 20);

  _defineProperty(Bt, "LOG_ROWS", 12);

  class zt {
    constructor(t) {
      this.game = t, this.button_size = 60, this.text_margin = 10, this.calc_button_position(), this.is_enable = !0;
    }

    toggle_enable() {
      this.is_enable = !this.is_enable;
    }

    calc_button_position() {
      this.down_x = 20, this.down_y = 150, this.up_x = this.down_x + 1.1 * this.button_size, this.up_y = this.down_y;
    }

    on_update() {
      if (this.is_enable && this.game.input_controller.get_mouse_press()) {
        let t = this.game.input_controller.mouse_x,
            i = this.game.input_controller.mouse_y;
        this.hit_test_button(t, i, this.down_x, this.down_y, this.button_size) && this.game.world.zoom_out(), this.hit_test_button(t, i, this.up_x, this.up_y, this.button_size) && this.game.world.zoom_in();
      }
    }

    hit_test_button(t, i, e, s, _) {
      return e < t && t < e + _ && s < i && i < s + _;
    }

    on_draw(t) {
      this.is_enable && (t.save(), t.fillStyle = "rgb(200,200,200)", t.strokeStyle = "rgb(200,200,200)", t.font = "bold 24px monospace", t.textBaseline = "top", t.strokeRect(this.down_x, this.down_y, this.button_size, this.button_size), t.fillText("[-]", this.down_x + this.text_margin, this.down_y + this.text_margin), t.strokeRect(this.up_x, this.up_y, this.button_size, this.button_size), t.fillText("[+]", this.up_x + this.text_margin, this.up_y + this.text_margin), t.restore());
    }

  }

  class Wt {
    constructor(t) {
      this.name = "hud", this.game = t, this.hud_menu = new Ut(t), this.item_slot = new Pt(t), this.hud_log = new Dt(t), this.hud_status = new Ft(t), this.hud_compass = new Bt(t), this.hud_camera_control = new zt(t);
    }

    on_update() {
      this.hud_menu.on_update(), this.item_slot.on_update(), this.hud_status.on_update(), this.hud_compass.on_update(), this.hud_camera_control.on_update();
    }

    on_draw(t) {
      this.hud_log.on_draw(t), this.hud_menu.on_draw(t), this.item_slot.on_draw(t), this.hud_status.on_draw(t), this.hud_compass.on_draw(t), this.hud_camera_control.on_draw(t);
    }

  }

  class Yt {
    constructor(t) {
      this.game = t, this.mouse_x = 100, this.mouse_y = 100, this.is_mouse_holding = !1, this.is_down_left = !1, this.is_down_right = !1, this.is_down_up = !1, this.is_down_down = !1, this.is_down_space = !1, this.is_press_left = !1, this.is_press_right = !1, this.is_press_up = !1, this.is_press_down = !1, this.is_press_space = !1, this.is_press_enter = !1, this.is_press_tab = !1, this.is_press_esc = !1, this.is_buffer_left = !1, this.is_buffer_right = !1, this.is_buffer_up = !1, this.is_buffer_down = !1, this.is_buffer_space = !1, this.is_buffer_enter = !1, this.is_buffer_tab = !1, this.is_buffer_esc = !1, this.is_virtual_down_left = !1, this.is_virtual_down_right = !1, this.is_virtual_down_up = !1, this.is_virtual_down_down = !1, this.is_virtual_down_space = !1, this.is_virtual_press_left = !1, this.is_virtual_press_right = !1, this.is_virtual_press_up = !1, this.is_virtual_press_down = !1, this.is_virtual_press_space = !1, this.is_virtual_press_enter = !1, this.is_virtual_press_tab = !1, this.is_virtual_press_esc = !1, this.is_mouse_down = !1, this.is_mouse_press = !1, this.is_mouse_press_buffer = !1, this.is_wheel_up = !1, this.is_wheel_down = !1, this.is_wheel_up_buffer = !1, this.is_wheel_down_buffer = !1, this.active_touch = null, this.auto_virtual_input_enable = !0, this.is_enable_any_key_input = !0, this.is_down_key = [], this.is_pressed_key = [], this.is_pressed_key_buffer = [];
    }

    setup() {
      this.game.display_canvas_element.onmousedown = this.on_mouse_down.bind(this), this.game.display_canvas_element.onmouseup = this.on_mouse_up.bind(this), this.game.display_canvas_element.onmousemove = this.on_mouse_move.bind(this), this.game.display_canvas_element.onwheel = this.on_wheel.bind(this), this.game.display_canvas_element.ontouchstart = this.on_touch_start.bind(this), this.game.display_canvas_element.ontouchmove = this.on_touch_move.bind(this), this.game.display_canvas_element.ontouchend = this.on_touch_end.bind(this), document.addEventListener("keydown", this.on_key_down.bind(this)), document.addEventListener("keyup", this.on_key_up.bind(this));
    }

    on_update() {
      this.is_pressed_key = this.is_pressed_key_buffer, this.is_pressed_key_buffer = [], this.is_wheel_up = this.is_wheel_up_buffer, this.is_wheel_down = this.is_wheel_down_buffer, this.is_wheel_up_buffer = !1, this.is_wheel_down_buffer = !1, this.is_mouse_press = this.is_mouse_press_buffer, this.is_mouse_press_buffer = !1, this.is_mouse_down_consumed = !1, this.is_mouse_press_consumed = !1, this.is_press_left = this.is_buffer_left, this.is_press_right = this.is_buffer_right, this.is_press_up = this.is_buffer_up, this.is_press_down = this.is_buffer_down, this.is_press_space = this.is_buffer_space, this.is_press_enter = this.is_buffer_enter, this.is_press_tab = this.is_buffer_tab, this.is_press_esc = this.is_buffer_esc, this.is_buffer_left = !1, this.is_buffer_right = !1, this.is_buffer_up = !1, this.is_buffer_down = !1, this.is_buffer_space = !1, this.is_buffer_enter = !1, this.is_buffer_tab = !1, this.is_buffer_esc = !1, this.is_virtual_down_left = !1, this.is_virtual_down_right = !1, this.is_virtual_down_up = !1, this.is_virtual_down_down = !1, this.is_virtual_down_space = !1, this.is_virtual_press_left = !1, this.is_virtual_press_right = !1, this.is_virtual_press_up = !1, this.is_virtual_press_down = !1, this.is_virtual_press_space = !1, this.is_virtual_press_enter = !1, this.is_virtual_press_tab = !1, this.is_virtual_press_esc = !1;
    }

    get_mouse_down() {
      return this.is_mouse_down && !this.is_mouse_down_consumed;
    }

    get_mouse_press() {
      return this.is_mouse_press && !this.is_mouse_press_consumed;
    }

    get_down_left() {
      return this.is_down_left || this.is_virtual_down_left;
    }

    get_down_right() {
      return this.is_down_right || this.is_virtual_down_right;
    }

    get_down_up() {
      return this.is_down_up || this.is_virtual_down_up;
    }

    get_down_down() {
      return this.is_down_down || this.is_virtual_down_down;
    }

    get_down_space() {
      return this.is_down_space || this.is_virtual_down_space;
    }

    get_press_left() {
      return this.is_press_left || this.is_virtual_press_left;
    }

    get_press_right() {
      return this.is_press_right || this.is_virtual_press_right;
    }

    get_press_up() {
      return this.is_press_up || this.is_virtual_press_up;
    }

    get_press_down() {
      return this.is_press_down || this.is_virtual_press_down;
    }

    get_press_space() {
      return this.is_press_space || this.is_virtual_press_space;
    }

    get_press_enter() {
      return this.is_press_enter || this.is_virtual_press_enter;
    }

    get_press_tab() {
      return this.is_press_tab || this.is_virtual_press_tab;
    }

    get_press_esc() {
      return this.is_press_esc || this.is_virtual_press_esc;
    }

    get_wheel_up() {
      return this.is_wheel_up;
    }

    get_wheel_down() {
      return this.is_wheel_down;
    }

    on_key_down(t) {
      return t.repeat || (this.is_enable_any_key_input && (this.is_down_key[t.code] = !0, this.is_pressed_key_buffer[t.code] = !0), "Space" == t.code ? (this.is_down_space = !0, this.is_buffer_space = !0) : "Escape" == t.code ? this.is_buffer_esc = !0 : "Tab" == t.code ? this.is_buffer_tab = !0 : "Enter" == t.code ? this.is_buffer_enter = !0 : "KeyA" == t.code || "ArrowLeft" == t.code ? (this.is_down_left = !0, this.is_buffer_left = !0) : "KeyD" == t.code || "ArrowRight" == t.code ? (this.is_down_right = !0, this.is_buffer_right = !0) : "KeyS" == t.code || "ArrowDown" == t.code ? (this.is_down_down = !0, this.is_buffer_down = !0) : "KeyW" != t.code && "ArrowUp" != t.code || (this.is_down_up = !0, this.is_buffer_up = !0)), "F5" == t.code || "F12" == t.code || t.preventDefault(), !1;
    }

    on_key_up(t) {
      return this.is_enable_any_key_input && (this.is_down_key[t.code] = !1), "Space" == t.code ? this.is_down_space = !1 : "KeyA" == t.code || "ArrowLeft" == t.code ? this.is_down_left = !1 : "KeyD" == t.code || "ArrowRight" == t.code ? this.is_down_right = !1 : "KeyS" == t.code || "ArrowDown" == t.code ? this.is_down_down = !1 : "KeyW" != t.code && "ArrowUp" != t.code || (this.is_down_up = !1), t.preventDefault(), !1;
    }

    on_wheel(t) {
      return 0 < t.deltaY && (this.is_wheel_down_buffer = !0), t.deltaY < 0 && (this.is_wheel_up_buffer = !0), !1;
    }

    on_mouse_down(t) {
      let i = this.game.display_canvas_element.getBoundingClientRect();
      return this.mouse_x = t.clientX - i.x, this.mouse_y = t.clientY - i.y, this.is_mouse_down = !0, this.is_mouse_press_buffer = !0, this.game.sound_library.load_sounds(), !1;
    }

    on_mouse_up(t) {
      let i = this.game.display_canvas_element.getBoundingClientRect();
      return this.mouse_x = t.clientX - i.x, this.mouse_y = t.clientY - i.y, this.is_mouse_down = !1, !1;
    }

    on_mouse_move(t) {
      let i = this.game.display_canvas_element.getBoundingClientRect();
      return this.mouse_x = t.clientX - i.x, this.mouse_y = t.clientY - i.y, !1;
    }

    on_touch_start(t) {
      if (null == this.active_touch) {
        this.active_touch = t.changedTouches[0].identifier;
        let i = this.game.display_canvas_element.getBoundingClientRect();
        this.mouse_x = t.changedTouches[0].pageX - i.x, this.mouse_y = t.changedTouches[0].pageY - i.y, this.is_mouse_down = !0, this.is_mouse_press_buffer = !0;
      }

      return this.auto_virtual_input_enable && (this.auto_virtual_input_enable = !1, this.game.log("***** 注意 *****"), this.game.log("スマホ/タブレットは*非推奨*です。"), this.game.log("一応、仮想キーはありますが、"), this.game.log("同時タップが未実装だし、"), this.game.log("PC向けのアクションをスマホでやるのは"), this.game.log("無謀だと思います。"), this.game.log("**************"), this.game.hud_virtual_input.is_enable = !0), this.game.sound_library.load_sounds(), t.preventDefault(), !1;
    }

    on_touch_end(t) {
      for (var i = 0; i < t.changedTouches.length; i++) if (t.changedTouches[i].identifier == this.active_touch) {
        this.active_touch = null, this.is_mouse_down = !1;
        break;
      }

      return t.preventDefault(), !1;
    }

    on_touch_move(t) {
      for (var i = 0; i < t.changedTouches.length; i++) if (t.changedTouches[i].identifier == this.active_touch) {
        let e = this.game.display_canvas_element.getBoundingClientRect();
        this.mouse_x = t.changedTouches[i].pageX - e.x, this.mouse_y = t.changedTouches[i].pageY - e.y;
        break;
      }

      return t.preventDefault(), !1;
    }

    ongoingTouchIndexById(t) {}

  }

  class Zt {}

  _defineProperty(Zt, "FILE_NAME_LIST", ["./img/illustya/cooking_agodashi.png", "./img/illustya/nunchaku.png", "./img/illustya/bullet_fire.png", "./img/illustya/ninjin_carrot.png", "./img/illustya/fantasy_gargoyle_water.png", "./img/illustya/quetzalcoatlus_beak.png", "./img/illustya/food_yasaiitame.png", "./img/illustya/undoukai_flag2.png", "./img/illustya/junk_kikai.png", "./img/illustya/fish_sakana_iwashi.png", "./img/illustya/syousyuzai_spray_musyu.png", "./img/illustya/peryton_horn.png", "./img/illustya/fantasy_seiryu.png", "./img/illustya/bird_toki_fly.png", "./img/illustya/cooking_dendou_mixer.png", "./img/illustya/food_fish_kirimi_red.png", "./img/illustya/gomi_petbottle.png", "./img/illustya/quetzalcoatlus_crown.png", "./img/illustya/fish_kobanzame.png", "./img/illustya/science_senjoubin.png", "./img/illustya/medical_bannouyaku.png", "./img/illustya/handagote.png", "./img/illustya/chain_saw.png", "./img/illustya/kids_mokkou_kyoushitsu_boy.png", "./img/illustya/yumiya.png", "./img/illustya/kouji_dendou_drill.png", "./img/illustya/souji_yuka_mop.png", "./img/illustya/beacon_denpa_hasshinki.png", "./img/illustya/dougu_torobune_tsuchi_yellow.png", "./img/illustya/norimono_boat.png", "./img/illustya/snorkel_goods.png", "./img/illustya/microraptor_beak.png", "./img/illustya/undoukai_flag5.png", "./img/illustya/fish_shark.png", "./img/illustya/tozan_stick.png", "./img/illustya/kaisou_wakame.png", "./img/illustya/tenshi_wing2.png", "./img/illustya/cooking_kokei_nenryou.png", "./img/illustya/wood_hammer_100t.png", "./img/illustya/petbottle_empty.png", "./img/illustya/kouji_yuudoubou.png", "./img/illustya/shovel_scoop_ken.png", "./img/illustya/music_alto_saxophone.png", "./img/illustya/syousyuzai_spray.png", "./img/illustya/fish_fugu2.png", "./img/illustya/sweets_yakiimo.png", "./img/illustya/mujintou_kojima.png", "./img/illustya/fish_kagokakidai.png", "./img/illustya/darts_ya.png", "./img/illustya/kaji_hikeshi_matoi.png", "./img/illustya/dougu_torobune_tsuchi_yellow_dark.png", "./img/illustya/fune_ikada.png", "./img/illustya/fantasy_ryu_doragon_asia.png", "./img/illustya/buki_yari.png", "./img/illustya/undoukai_flag2_i.png", "./img/illustya/ofuro_oke_plastic.png", "./img/illustya/fantasy_genbu.png", "./img/illustya/fuel_feather.png", "./img/illustya/bird_hayabusa.png", "./img/illustya/ofuro_oke_plastic_water.png", "./img/illustya/bucket_iron_water_up.png", "./img/illustya/fish_tai.png", "./img/illustya/yumiya_bowgun.png", "./img/illustya/inugoya.png", "./img/illustya/camp_chakkazai.png", "./img/illustya/present_box.png", "./img/illustya/feather_white.png", "./img/illustya/snorkel_fin.png", "./img/illustya/fish_salmon.png", "./img/illustya/cooking_houchou_chopper.png", "./img/illustya/gomi_can.png", "./img/illustya/bird_kamome.png", "./img/illustya/soccer_vuvuzela_music.png", "./img/illustya/tsuri_esa_kebari.png", "./img/illustya/katana_shirasaya.png", "./img/illustya/bullet_item.png", "./img/illustya/fantasy_peryton.png", "./img/illustya/cooking_hand_blender.png", "./img/illustya/megane_3d_blue_red.png", "./img/illustya/snorkel_goggle.png", "./img/illustya/arrow_color12_play_flip.png", "./img/illustya/battery_namari_chikudenchi.png", "./img/illustya/arrow_color12_play.png", "./img/illustya/science_senjoubin_empty.png", "./img/illustya/machine_heat_gun.png", "./img/illustya/fishing_lure.png", "./img/illustya/kodai_microraptor.png", "./img/illustya/small_star7_yellow.png", "./img/illustya/syamoji_mokusei.png", "./img/illustya/fish_pirarucu2.png", "./img/illustya/bird_hachidori.png", "./img/illustya/sports_sanso_bottle.png", "./img/illustya/tsuyu_mark09_ame.png", "./img/illustya/fish_maguro2.png", "./img/illustya/griffon_wing.png", "./img/illustya/dinosaur_quetzalcoatlus.png", "./img/illustya/alohashirt_gray.png", "./img/illustya/tree_seichou03.png", "./img/illustya/water_gardening_hose.png", "./img/illustya/dougu_micrometer_digital.png", "./img/illustya/dougu_nail_hammer.png", "./img/illustya/kaizoku_takarabako.png", "./img/illustya/toki_wing.png", "./img/illustya/tonbi_wing.png", "./img/illustya/kaden_wifi_router.png", "./img/illustya/smartphone_selfystick.png", "./img/illustya/food_beef_jerky.png", "./img/illustya/piman_greenpepper.png", "./img/illustya/gomi_poribaketsu_close.png", "./img/illustya/undoukai_flag1.png", "./img/illustya/motor_servo_motor.png", "./img/illustya/fantasy_griffon.png", "./img/illustya/fish_hokke.png", "./img/illustya/kousenju.png", "./img/illustya/gas_burner.png", "./img/illustya/hachidori_wing.png", "./img/illustya/feather_green.png", "./img/illustya/pet_robot_cat.png", "./img/illustya/bullet_right.png", "./img/illustya/cooking_hera.png", "./img/illustya/bug_haetataki_atack.png", "./img/illustya/washi_wing.png", "./img/illustya/food_chicken_tebamoto_nama.png", "./img/illustya/syabondama.png", "./img/illustya/tonkachi.png", "./img/illustya/iryou_kusuribako2.png", "./img/illustya/fishing_tsurizao_nobezao.png", "./img/illustya/muchi.png", "./img/illustya/wood_maruta_single.png", "./img/illustya/mushi_mushitoriami.png", "./img/illustya/glass_bin6_clear.png", "./img/illustya/fuel_cloth.png", "./img/illustya/wasyoku_himono.png", "./img/illustya/fuel_leftover.png", "./img/illustya/denryoku_mark.png", "./img/illustya/rain_kasa_red.png", "./img/illustya/character_cthulhu_kuturufu.png", "./img/illustya/fish_sakana_sanma.png", "./img/illustya/feather_pink.png", "./img/illustya/dougu_torobune_tsuchi_red_dark.png", "./img/illustya/tool_pickel.png", "./img/illustya/wood_hammer_10t.png", "./img/illustya/hanabi_rocket.png", "./img/illustya/bird_tonbi.png", "./img/illustya/dougu_bar.png", "./img/illustya/music_recorder.png", "./img/illustya/gardening_sentei_hasami.png", "./img/illustya/fuel_wood.png", "./img/illustya/food_tebasaki.png", "./img/illustya/quadcopter_drone.png", "./img/illustya/hair_drier.png", "./img/illustya/tora_rope.png", "./img/illustya/youkai_byakko.png", "./img/illustya/petbottle_juice.png", "./img/illustya/dougu_army_knife.png", "./img/illustya/haguruma.png", "./img/illustya/cooking_masher.png", "./img/illustya/youkai_suzaku.png", "./img/illustya/small_star6_orange.png", "./img/illustya/fish_mola2.png", "./img/illustya/animal_shachi_killer_whale.png", "./img/illustya/itonokogiri.png", "./img/illustya/airplane_ornithopter.png", "./img/illustya/food_chicken_tebasaki_nama.png", "./img/illustya/dougu_torobune_tsuchi.png", "./img/illustya/war_taihou.png", "./img/illustya/suzaku_wing.png", "./img/illustya/bucket_iron_empty_up.png", "./img/illustya/pet_robot_dog.png", "./img/illustya/inugoya_blue.png", "./img/illustya/tree_ryuuboku.png", "./img/illustya/job_programmer.png", "./img/illustya/feather_brown.png", "./img/illustya/satsumaimo_sweetpotato.png", "./img/illustya/heart_blur.png", "./img/illustya/car_engine.png", "./img/illustya/fish_sakana_sake.png", "./img/illustya/buki_morningstar_flail.png", "./img/illustya/fantasy_dragon.png", "./img/illustya/kaisou_konbu.png", "./img/illustya/kouji_shizai_okiba.png", "./img/illustya/mizudeppou.png", "./img/illustya/yakitori_kawa.png", "./img/illustya/cannonball_right.png", "./img/illustya/medicine_cup_water.png", "./img/illustya/hair_curl_dryer.png", "./img/illustya/shinkai_chouchinankou.png", "./img/illustya/hinawaju.png", "./img/illustya/peryton_wing.png", "./img/illustya/tsue_sennin.png", "./img/illustya/feather_red.png", "./img/illustya/mark_face_laugh.png", "./img/illustya/takibi_dai.png", "./img/illustya/starter_starting_pistol.png", "./img/illustya/cooking_urokohiki.png", "./img/illustya/tekkotsu_silver.png", "./img/illustya/otanjoubi_birthday_present_balloon.png", "./img/illustya/11_8bu_onpu.png", "./img/illustya/war_trident.png", "./img/illustya/undoukai_flag4_i.png", "./img/illustya/undoukai_flag3_i.png", "./img/illustya/harisen.png", "./img/illustya/dougu_nogisu_digital.png", "./img/illustya/cooking_kokei_nenryou_fire.png", "./img/illustya/tomato_red.png", "./img/illustya/kouji_dendou_driver.png", "./img/illustya/nokogiri.png", "./img/illustya/undoukai_flag1_i.png", "./img/illustya/dougu_torobune_tsuchi_red.png", "./img/illustya/cthulhu_deep_ones.png", "./img/illustya/dougu_gluegun.png", "./img/illustya/animal_washi.png", "./img/illustya/medical_syrup_kusuri.png", "./img/illustya/setsumeisyo_manual.png", "./img/illustya/yurei_youngwoman3_sad.png", "./img/illustya/game_ken.png", "./img/illustya/pellet_wood_mokusei.png", "./img/illustya/undoukai_flag4.png", "./img/illustya/text_mu.png", "./img/illustya/bin_tegami.png", "./img/illustya/fish_tobiuo2.png", "./img/illustya/engine_hatsudenki_small.png", "./img/illustya/music_trumpet.png", "./img/illustya/monkey_wrench.png", "./img/illustya/fantasy_dragon_wyvern.png", "./img/illustya/cardboard_open.png", "./img/illustya/bird_kakkou.png", "./img/illustya/wasyoku_yakizakana.png", "./img/illustya/boomerang.png", "./img/illustya/food_chicken_tebamoto.png", "./img/illustya/undoukai_flag5_i.png", "./img/illustya/fashion_maid.png", "./img/illustya/gin_dangan_silver_bullet.png", "./img/illustya/fish_minokasago.png", "./img/illustya/soccer_cheer_horn_music.png", "./img/illustya/kandume_tomato.png", "./img/illustya/food_yakitomorokoshi.png", "./img/illustya/undoukai_flag3.png", "./img/illustya/cannonball_item.png", "./img/illustya/microraptor_wing.png", "./img/illustya/fish_tobiuo.png", "./img/illustya/nature_stone_ishi.png", "./img/illustya/fishing_tsurizao_nagezao.png", "./img/illustya/bullet_feather_white.png", "./img/illustya/bullet_thunder.png", "./img/illustya/vegetable_corn.png", "./img/illustya/takibi_dai_fire.png", "./img/illustya/fish_maguro.png", "./img/illustya/fantasy_gargoyle.png", "./img/illustya/car_battery_blue_red.png", "./img/illustya/tosou_airbrush.png", "./img/illustya/food_yakisake.png"]);

  class Kt {}

  _defineProperty(Kt, "FILE_NAME_LIST", ["./img/wind_effect.png", "./img/ship_frame.png", "./img/ship_floor.png", "./img/dry_lack.png", "./img/fish_fin.png", "./img/cloud.png", "./img/laser_turret.png", "./img/mortor.png", "./img/machine_gun.png", "./img/air_cannon.png", "./img/mast_close.png", "./img/mast_open.png", "./img/spring_green.png", "./img/spring_red.png", "./img/air_ball.png", "./img/bullet_arrow.png", "./img/ladder.png", "./img/catapult.png", "./img/catapult_bullet.png", "./img/catapult_ammo.png", "./img/menu.png", "./img/batsu.png", "./img/check.png", "./img/arrow_up.png", "./img/arrow_down.png", "./img/ship_core.png", "./img/cloud_base.png", "./img/cloud_border.png", "./img/cloud_blur.png", "./img/attack_effect.png", "./img/ship_floor_stone.png", "./img/ship_floor_glass.png", "./img/ship_floor_plastic.png", "./img/ship_floor_bone.png", "./img/ship_floor_iron.png", "./img/ship_floor_silver.png", "./img/ikada.png"]);

  class jt {
    constructor(t) {
      this.game = t, this.image_list = [];
    }

    get_image(t) {
      return this.image_list[t];
    }

    load_images() {
      for (let t = 0; t < Kt.FILE_NAME_LIST.length; t++) {
        let i = new Image();
        i.src = Kt.FILE_NAME_LIST[t], this.image_list[Kt.FILE_NAME_LIST[t]] = i;
        let e = Kt.FILE_NAME_LIST[t];
        e = e.replace("./img/", ""), e = e.replace(".png", ""), this.image_list[e] = i;
      }

      this.load_illustya(), this.load_maked_player();
    }

    load_maked_player() {
      this.saved_character_image = localStorage.getItem("character_image"), null != this.saved_character_image ? (this.saved_image = new Image(), this.saved_image.src = this.saved_character_image, this.player_image = this.saved_image) : this.player_image = this.game.image_library.get_image("cooking_agodashi");
    }

    get_player_image() {
      return this.player_image;
    }

    load_illustya() {
      for (let t = 0; t < Zt.FILE_NAME_LIST.length; t++) if (Zt.FILE_NAME_LIST[t]) {
        let i = new Image();
        i.src = Zt.FILE_NAME_LIST[t], this.image_list[Zt.FILE_NAME_LIST[t]] = i;
        let e = Zt.FILE_NAME_LIST[t];
        e = e.replace("./img/illustya/", ""), e = e.replace(".png", ""), this.image_list[e] = i;
      }
    }

  }

  class qt {}

  _defineProperty(qt, "FILE_NAME_LIST", ["./sound/keytap.mp3", "./sound/513/cymbal/D1.mp3", "./sound/513/cymbal/D2.mp3", "./sound/513/cymbal/E1.mp3", "./sound/513/cymbal/F4.mp3", "./sound/513/cymbal/D1.mp3", "./sound/513/cymbal/D2.mp3", "./sound/513/cymbal/E1.mp3", "./sound/513/cymbal/F4.mp3", "./sound/513/hat/A3.mp3", "./sound/513/hat/A5.mp3", "./sound/513/hat/B1.mp3", "./sound/513/hat/C2.mp3", "./sound/513/hat/C5.mp3", "./sound/513/hat/C6.mp3", "./sound/513/hat/D4.mp3", "./sound/513/hat/E3.mp3", "./sound/513/hat/F4.mp3", "./sound/513/hat/G3.mp3", "./sound/513/perc/A2.mp3", "./sound/513/perc/A3.mp3", "./sound/513/perc/A4.mp3", "./sound/513/perc/B2.mp3", "./sound/513/perc/C4.mp3", "./sound/513/perc/C5.mp3", "./sound/513/perc/C6.mp3", "./sound/513/perc/D5.mp3", "./sound/513/perc/E2.mp3", "./sound/513/perc/G2.mp3", "./sound/513/perc/G4.mp3", "./sound/513/perc/A2.mp3", "./sound/513/perc/A3.mp3", "./sound/513/perc/A4.mp3", "./sound/513/perc/B2.mp3", "./sound/513/perc/C4.mp3", "./sound/513/perc/C5.mp3", "./sound/513/perc/C6.mp3", "./sound/513/perc/D5.mp3", "./sound/513/perc/E2.mp3", "./sound/513/perc/G2.mp3", "./sound/513/perc/G4.mp3", "./sound/513/perc/A2.mp3", "./sound/513/perc/A3.mp3", "./sound/513/perc/A4.mp3", "./sound/513/perc/B2.mp3", "./sound/513/perc/C4.mp3", "./sound/513/perc/C5.mp3", "./sound/513/perc/C6.mp3", "./sound/513/perc/D5.mp3", "./sound/513/perc/E2.mp3", "./sound/513/perc/G2.mp3", "./sound/513/perc/G4.mp3", "./sound/513/hat/A3.mp3", "./sound/513/hat/A5.mp3", "./sound/513/hat/B1.mp3", "./sound/513/hat/C2.mp3", "./sound/513/hat/C5.mp3", "./sound/513/hat/C6.mp3", "./sound/513/hat/D4.mp3", "./sound/513/hat/E3.mp3", "./sound/513/hat/F4.mp3", "./sound/513/hat/G3.mp3", "./sound/513/cymbal/D1.mp3", "./sound/513/cymbal/D2.mp3", "./sound/513/cymbal/E1.mp3", "./sound/513/cymbal/F4.mp3", "./sound/513/snare/A1.mp3", "./sound/513/snare/A2.mp3", "./sound/513/snare/A3.mp3", "./sound/513/snare/C1.mp3", "./sound/513/snare/C2.mp3", "./sound/513/snare/C3.mp3", "./sound/513/snare/C4.mp3", "./sound/513/snare/D2.mp3", "./sound/513/snare/D4.mp3", "./sound/513/snare/E3.mp3", "./sound/513/snare/F2.mp3", "./sound/513/snare/F3.mp3", "./sound/513/tom/A3.mp3", "./sound/513/tom/B4.mp3", "./sound/513/tom/C6.mp3", "./sound/513/tom/E1.mp3", "./sound/513/tom/F4.mp3", "./sound/513/tom/F5.mp3", "./sound/513/tom/G1.mp3", "./sound/513/tom/G3.mp3", "./sound/513/kick/B4.mp3", "./sound/513/kick/B5.mp3", "./sound/513/kick/C4.mp3", "./sound/513/kick/C5.mp3", "./sound/513/kick/D1.mp3", "./sound/513/kick/D2.mp3", "./sound/513/clap/A1.mp3", "./sound/513/clap/A2.mp3", "./sound/513/clap/A3.mp3", "./sound/513/clap/B1.mp3", "./sound/513/clap/B2.mp3", "./sound/513/clap/B3.mp3", "./sound/513/clap/C1.mp3", "./sound/513/clap/C2.mp3", "./sound/513/clap/C3.mp3", "./sound/513/clap/D1.mp3", "./sound/513/clap/D2.mp3", "./sound/513/clap/D3.mp3", "./sound/513/clap/E1.mp3", "./sound/513/clap/E2.mp3", "./sound/513/clap/E3.mp3", "./sound/513/clap/F1.mp3", "./sound/513/clap/F2.mp3", "./sound/513/clap/F3.mp3", "./sound/513/clap/G2.mp3", "./sound/513/clap/G3.mp3"]);

  class Qt {
    constructor(t) {
      this.game = t, this.sound_list = [], this.is_load_start = !1, this.is_mute = !1;
      let i = localStorage.getItem("sound_mute");
      i && (this.is_mute = i == Qt.SAVE_MUTE);
    }

    toggle_mute() {
      this.is_mute = !this.is_mute, this.is_mute ? localStorage.setItem("sound_mute", Qt.SAVE_MUTE) : localStorage.setItem("sound_mute", Qt.SAVE_NOT_MUTE);
    }

    get_sound(t) {
      return this.sound_list[t];
    }

    play_sound(t) {
      this.is_mute || this.sound_list[t] && (this.bufferSource = this.context.createBufferSource(), this.bufferSource.buffer = this.sound_list[t], this.bufferSource.connect(this.context.destination), this.bufferSource.start(0));
    }

    load_sounds() {
      this.is_mute || this.is_load_start || (this.is_load_start = !0, this.context = new (window.AudioContext || window.webkitAudioContext)(), this.context.createMediaElementSource(document.getElementById("audio_tag_c6")).connect(this.context.destination), document.getElementById("audio_tag_c6").play(), this.load_files());
    }

    load_files() {
      for (let t = 0; t < qt.FILE_NAME_LIST.length; t++) if (qt.FILE_NAME_LIST[t]) {
        let i = null,
            e = qt.FILE_NAME_LIST[t];
        i = new XMLHttpRequest(), i.open("GET", e, !0), i.responseType = "arraybuffer", i.onload = function () {
          this.context.decodeAudioData(i.response, function (t) {
            this.sound_list[e] = t;
            let i = e;
            i = i.replace("./sound/", ""), i = i.replace(".wav", ""), i = i.replace(".mp3", ""), this.sound_list[i] = t, this.game.log("sound: " + i);
          }.bind(this));
        }.bind(this), i.send();
      }
    }

  }

  _defineProperty(Qt, "SAVE_MUTE", 1);

  _defineProperty(Qt, "SAVE_NOT_MUTE", 2);

  class Vt {
    constructor(t) {
      this.game = t, this.item_inventory_size = 25, this.tool_item_inventory = [];

      for (let t = 0; t < this.item_inventory_size; t++) this.tool_item_inventory[t] = null;
    }

    on_update() {}

    put_pickup_item(t, i) {
      if (i) {
        for (let i = this.tool_item_inventory.length - 1; 0 <= i; i--) if (null == this.tool_item_inventory[i]) return this.tool_item_inventory[i] = t, !0;
      } else for (let i = 0; i < this.tool_item_inventory.length; i++) if (null == this.tool_item_inventory[i]) return this.tool_item_inventory[i] = t, !0;

      return !1;
    }

    has_empty_space() {
      for (let t = this.tool_item_inventory.length - 1; 0 <= t; t--) if (null == this.tool_item_inventory[t]) return !0;
    }

    on_draw() {}

    cheat() {
      let t = null;
      t = new a(game), t.set_image("./img/illustya/rain_kasa_red.png"), t.equip_part = a.EQUIP_GLIDER, t.riseup_power = 10, this.tool_item_inventory[2] = t, t = new a(game), t.set_image("./img/illustya/feather_red.png"), t.equip_part = a.EQUIP_WING, t.midair_speed = 2, t.fall_speed = .8, this.tool_item_inventory[3] = t, t = new a(game), t.set_image("./img/illustya/snorkel_goggle.png"), t.equip_part = a.EQUIP_GOGGLE, t.underwater_speed = 1, this.tool_item_inventory[4] = t, t = new a(game), t.set_image("./img/illustya/snorkel_fin.png"), t.equip_part = a.EQUIP_FIN, t.underwater_speed = 1, this.tool_item_inventory[5] = t, t = new y(game), this.tool_item_inventory[8] = t, t = new y(game), this.tool_item_inventory[9] = t, t = new y(game), this.tool_item_inventory[10] = t;
    }

    load_data(t) {
      for (let i = 0; i < this.item_inventory_size; i++) this.tool_item_inventory[i] = this.game.save_data_manager.deserialize_item(t[i]);
    }

    save_data() {
      let t = [];

      for (let i = 0; i < this.item_inventory_size; i++) this.tool_item_inventory[i] ? t.push(this.tool_item_inventory[i].save_data()) : t.push(null);

      return t;
    }

  }

  class Jt {
    constructor(t) {
      this.game = t;
    }

    get_fishing_result() {
      let t = Math.floor(100 * Math.random());

      if (t < 30) {
        let t = new x(this.game);
        return t.saving_data.item_name = "流木", t.set_image("tree_ryuuboku"), t.add_material("wood", Math.floor(20 + 10 * Math.random())), t;
      }

      if (t < 60) {
        let t = new x(this.game);
        return t.saving_data.item_name = "石", t.set_image("nature_stone_ishi"), t.add_material("stone", Math.floor(10 + 10 * Math.random())), t;
      }

      let i = new f(this.game);
      return i.set_image("fish_sakana_iwashi"), i.set_content(new y(this.game)), i;
    }

    get_drifting_item() {
      let t = null,
          i = Math.floor(100 * Math.random());
      return i < 30 ? (t = new x(this.game), t.saving_data.item_name = "流木", t.set_image("tree_ryuuboku"), t.add_material("wood", Math.floor(20 + 10 * Math.random()))) : i < 60 ? (t = new x(this.game), t.saving_data.item_name = "古着", t.set_image("alohashirt_gray"), t.add_material("cloth", Math.floor(10 + 10 * Math.random()))) : i < 90 ? (t = new x(this.game), t.saving_data.item_name = "空き缶", t.set_image("gomi_can"), t.add_material("iron", Math.floor(10 + 10 * Math.random()))) : i < 100 ? (t = new x(this.game), t.set_image("glass_bin6_clear"), t.saving_data.item_name = "ビン", t.add_material("jar", 1)) : (t = new x(this.game), t.saving_data.item_name = "ボトル", t.set_image("glass_bin6_clear"), t.add_material("jar", 1)), t;
    }

  }

  class $t {
    constructor(t) {
      this.game = t, this.balance = new Jt(this.game), this.list = {}, this.name_list = [], this.name_list.fuel = "燃料", this.name_list.leftover = "残飯", this.name_list.wood = "木", this.name_list.stone = "石", this.name_list.cloth = "布切れ", this.name_list.iron = "鉄クズ", this.name_list.feather = "鳥の羽根", this.name_list.seed = "種", this.name_list.jar = "ビン", this.name_list.parts = "機械部品", this.name_list.circuit = "電子回路", this.name_list.lead = "鉛", this.name_list.plastic = "プラスチック", this.name_list.silver = "銀の欠片", this.name_list.fur = "毛皮", this.name_list.metal = "金属", this.name_list.bone = "骨", this.name_list.fin = "魚のヒレ";

      for (let t in this.name_list) this.list[t] = 0;
    }

    get_material(t) {
      return this.list[t];
    }

    get_material_name(t) {
      return this.name_list[t];
    }

    put_material(t, i) {
      this.list[t] += i, this.game.log(this.get_material_name(t) + ": +" + i + " (" + this.get_material(t) + ")");
    }

    take_material(t, i) {
      this.list[t] -= i, this.game.log(this.get_material_name(t) + ": -" + i + " (" + this.get_material(t) + ")");
    }

    load_data(t) {
      this.list = t.list;
    }

    save_data() {
      let t = {};
      return t.list = this.list, t;
    }

    cheat() {
      for (let t in this.name_list) this.list[t] = 999;
    }

  }

  class ti extends Object {
    constructor(t) {
      super(t), this.game = t, this.savedata_cursor = 1, this.load_menu_string = [], this.load_menu_string[0] = "New Game", this.load_menu_string[1] = "オートセーブをロード", this.load_menu_string[2] = "データ[1]をロード", this.load_menu_string[3] = "データ[2]をロード", this.data_item_count = 4;
    }

    on_update() {
      if ((this.game.input_controller.get_press_enter() || this.game.input_controller.get_press_space()) && this.select_menu(this.savedata_cursor), this.game.input_controller.get_press_up() && 0 < this.savedata_cursor && (this.savedata_cursor -= 1), this.game.input_controller.get_press_down() && this.savedata_cursor < this.data_item_count - 1 && (this.savedata_cursor += 1), this.game.input_controller.get_mouse_press() && ti.MENU_MARGIN_LEFT - ti.MENU_ARROW_X < this.game.input_controller.mouse_x && ti.MENU_MARGIN_LEFT + ti.MENU_ITEM_WIDTH > this.game.input_controller.mouse_x) for (let t = 0; t < this.data_item_count; t++) if (ti.MENU_MARGIN_TOP + ti.MENU_ITEM_HEIGHT * t < this.game.input_controller.mouse_y && ti.MENU_MARGIN_TOP + ti.MENU_ITEM_HEIGHT * (t + 1) > this.game.input_controller.mouse_y) {
        this.select_menu(t);
        break;
      }
    }

    select_menu(t) {
      0 == t ? (this.game.is_there_title = !1, this.game.log("新しく始めます。"), this.game.sound_library.play_sound("513/symbal/D2")) : 1 == t ? (this.game.log("オートセーブデータをロードします。"), this.game.save_data_manager.load_game("save_data_auto") && (this.game.is_there_title = !1)) : 2 == t ? (this.game.log("データ[1]をロードします。"), this.game.save_data_manager.load_game("save_data_1") && (this.game.is_there_title = !1)) : 3 == t ? (this.game.log("データ[2]をロードします。"), this.game.save_data_manager.load_game("save_data_2") && (this.game.is_there_title = !1)) : 4 == t && (this.game.log("データ[3]をロードします。"), this.game.save_data_manager.load_game("save_data_3") && (this.game.is_there_title = !1));
    }

    on_draw(t) {
      t.save(), t.font = "bold 64px monospace", t.strokeStyle = "rgb(250,250,250)", t.fillStyle = "rgb(250,250,250)", t.strokeText("[ Ikada Builder ]", 150, 150), t.font = ti.MENU_FONT, t.textBaseline = "top";

      for (let i = 0; i < this.data_item_count; i++) t.fillStyle = ti.MENU_COLOR, i == this.savedata_cursor && (t.fillStyle = ti.MENU_COLOR_ACTIVE, t.fillText("->", ti.MENU_MARGIN_LEFT - ti.MENU_ARROW_X, ti.MENU_MARGIN_TOP + ti.MENU_ITEM_HEIGHT * i + ti.MENU_TEXT_MARGIN)), t.fillText(this.load_menu_string[i], ti.MENU_MARGIN_LEFT + ti.MENU_TEXT_MARGIN, ti.MENU_MARGIN_TOP + ti.MENU_ITEM_HEIGHT * i + ti.MENU_TEXT_MARGIN), t.strokeRect(ti.MENU_MARGIN_LEFT, ti.MENU_MARGIN_TOP + ti.MENU_ITEM_HEIGHT * i, ti.MENU_ITEM_WIDTH, ti.MENU_ITEM_HEIGHT);

      t.restore();
    }

  }

  _defineProperty(ti, "MENU_MARGIN_TOP", 200);

  _defineProperty(ti, "MENU_MARGIN_LEFT", 300);

  _defineProperty(ti, "MENU_FONT", "bold 24px monospace");

  _defineProperty(ti, "MENU_COLOR", "rgb(250,250,250)");

  _defineProperty(ti, "MENU_COLOR_ACTIVE", "rgb(150,250,150)");

  _defineProperty(ti, "MENU_ITEM_HEIGHT", 50);

  _defineProperty(ti, "MENU_ITEM_WIDTH", 300);

  _defineProperty(ti, "MENU_TEXT_MARGIN", 10);

  _defineProperty(ti, "MENU_ARROW_X", 50);

  class ii extends i {
    constructor(t) {
      super(t), this.saving_data.item_name = "虫あみ", this.image = this.game.image_library.get_image("./img/illustya/mushi_mushitoriami.png");
    }

    on_click(t, i, e, s) {
      console.log("catchnet onclick!");
    }

  }

  class ei extends i {
    constructor(t) {
      super(t), this.saving_data.item_name = "砲弾", this.image = this.game.image_library.get_image("cannonball_item"), this.ammo_type = "gun", this.ammo_value = 100;
    }

    on_click(t, i, e, s) {
      this.game.log("これは弾薬です。"), this.game.log("弾薬を必要とする設備に補充できます。");
    }

  }

  class si extends G {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("buki_yari"), this.saving_data.item_name = "槍", this.saving_data.power = 10, this.saving_data.cool_time = 10;
    }

    on_attack(t, i, e, s) {
      let _ = this.game.world.player.get_vector_to_cursor(),
          a = new X(this.game);

      a.x = this.game.world.player.x + 10 * _.x, a.y = this.game.world.player.y + 10 * _.y - 16, a.vx = 15 * _.x, a.vy = 15 * _.y, a.line_x = 30 * _.x, a.line_y = 30 * _.y, a.gravity = 0, a.life_time = 10, a.damage = this.calc_damage(), this.game.world.push_entity(a);
    }

  }

  class _i extends G {
    constructor(t) {
      super(t), this.game = t;
    }

    generate_random_weapon(t, i) {
      let e = t * (2 + Math.random()),
          s = Math.floor(Math.random() * Math.random() * 7 + 1.1);
      this.saving_data.fire_spread = s, e = 2 * e / (1 + s), this.saving_data.fire_spread_angle = .2 * Math.random() + .02;

      let _ = Math.random() + .5;

      if (this.saving_data.bullet_lifetime = Math.floor((30 + 30 * Math.random()) / _), this.saving_data.bullet_velocity = Math.floor(12 * _), this.saving_data.bullet_weight = Math.floor(5 + 90 * Math.random()), Math.random() < .2) {
        let t = Math.random() + .5;
        this.saving_data.blast_lifetime = Math.floor((10 + 10 * Math.random()) / t), this.saving_data.blast_velocity = Math.floor(12 * t);
      } else this.saving_data.blast_lifetime = 0, this.saving_data.blast_velocity = 0;

      if (Math.random() < .2) {
        let t = .5 + Math.random();
        this.saving_data.critical_range_lifetime = Math.floor(1 + Math.random() * this.saving_data.bullet_lifetime), this.saving_data.critical_range_lifetime_window = Math.floor(3 + 3 * Math.random() * t), this.saving_data.critical_range_damage = 2 / t;
      } else this.saving_data.critical_range_lifetime = 0, this.saving_data.critical_range_lifetime_window = 0, this.saving_data.critical_range_damage = 1;

      if (Math.random() < .2) {
        let t = .5 + Math.random();
        this.saving_data.critical_chance = .1 + .1 * Math.random() * t, this.saving_data.critical_chance_damage = 2 / t;
      } else this.saving_data.critical_chance = 0, this.saving_data.critical_chance_damage = 1;

      this.saving_data.knockback_rate = .1 + Math.random() * Math.random(), Math.random() < .2 ? (this.saving_data.poison_damage = Math.floor(e * (.1 + .3 * Math.random() + Math.random() * Math.random() * .9)), e *= .8) : this.saving_data.poison_damage = 0, Math.random() < .2 ? this.saving_data.slow_rate = .1 + .1 * Math.random() + Math.random() * Math.random() * .5 : this.saving_data.slow_rate = 0, Math.random() < .2 ? (this.saving_data.life_leech = Math.floor(1 + 3 * Math.random() + Math.random() * Math.random() * 7), e *= .8) : this.saving_data.life_leech = 0;
      let a = Math.random() + .5;
      this.saving_data.cool_time = Math.floor(25 * a), e /= a, this.saving_data.basic_power = Math.floor(e), this.saving_data.bullet_color = "rgb(250,0,250)";
      let h = Math.floor(Math.random() * G.IMAGE_NAME_LIST.length);
      this.set_image(G.IMAGE_NAME_LIST[h]);
    }

  }

  _defineProperty(_i, "IMAGE_NAME_LIST", ["music_recorder", "shovel_scoop_ken", "gas_burner", "nokogiri", "itonokogiri", "souji_yuka_mop", "handagote", "water_gardening_hose", "cooking_dendou_mixer", "syousyuzai_spray", "harisen", "chain_saw", "muchi", "syousyuzai_spray_musyu", "smartphone_selfystick", "kouji_dendou_driver", "kaji_hikeshi_matoi", "tool_pickel", "dougu_micrometer_digital", "dougu_army_knife", "cooking_masher", "dougu_gluegun", "kouji_dendou_drill", "bug_haetataki_atack", "kouji_yuudoubou", "dougu_nogisu_digital", "cooking_houchou_chopper", "wood_hammer_100t", "wood_hammer_10t", "cooking_urokohiki", "dougu_bar", "hair_curl_dryer", "hair_drier", "machine_heat_gun", "nunchaku", "gardening_sentei_hasami", "cooking_hand_blender", "tosou_airbrush", "mizudeppou", "katana_shirasaya", "starter_starting_pistol", "game_ken", "hinawaju", "buki_morningstar_flail", "tozan_stick", "tsue_sennin", "music_alto_saxophone", "soccer_cheer_horn_music", "soccer_vuvuzela_music", "music_trumpet"]);

  class ai extends i {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("boomerang"), this.saving_data.item_name = "ブーメラン";
    }

  }

  class hi extends i {
    constructor(t) {
      super(t), this.game = t, this.image = this.game.image_library.get_image("darts_ya"), this.saving_data.item_name = "矢";
    }

  }

  class oi extends G {
    constructor(t) {
      super(t), this.game = t, this.saving_data.item_name = "クロスボウ", this.image = this.game.image_library.get_image("yumiya_bowgun");
    }

  }

  class li extends i {
    constructor(t) {
      super(t), this.image = this.game.image_library.get_image("wasyoku_yakizakana"), this.saving_data.item_name = "薬箱", this.saving_data.hunger_value = 5, this.saving_data.thirst_value = 5, this.saving_data.is_be_leftover = !0;
    }

    on_click(t, i, e, s) {
      this.saving_data.hunger_value < this.saving_data.thirst_value ? this.game.log(this.saving_data.item_name + "を飲みました。") : this.game.log(this.saving_data.item_name + "を食べました。"), this.game.log("養分: +" + this.saving_data.hunger_value + "%"), this.game.log("水分: +" + this.saving_data.thirst_value + "%");

      let _ = this.game.world.player.health.mod_hunger(this.saving_data.hunger_value);

      this.game.world.player.health.mod_thirst(this.saving_data.thirst_value), this.saving_data.is_be_leftover && 10 < _ && this.game.materials.put_material("leftover", Math.floor(_ / 9)), this.is_consumed = !0;
    }

  }

  class ni {
    constructor(t) {
      this.game = t;
    }

    make_instance(t) {
      return null == t ? null : "ResourceItem" == t.class_name ? new x(this.game) : "FishRod" == t.class_name ? new bt(this.game) : "EquipmentItem" == t.class_name ? new a(this.game) : "ContainerItem" == t.class_name ? new f(this.game) : "SafetyRope" == t.class_name ? new Et(this.game) : "CatchNet" == t.class_name ? new ii(this.game) : "ToolItem" == t.class_name ? new i(this.game) : "CannonAmmoItem" == t.class_name ? new J(this.game) : "WeaponItem" == t.class_name ? new G(this.game) : "SolidFuel" == t.class_name ? new Q(this.game) : "AmmoStone" == t.class_name ? new Ot(this.game) : "Scouter" == t.class_name ? new Tt(this.game) : "AmmoCannon" == t.class_name ? new ei(this.game) : "Spear" == t.class_name ? new si(this.game) : "WeaponRandomItem" == t.class_name ? new _i(this.game) : "DistillBottle" == t.class_name ? new lt(this.game) : "RepairWrench" == t.class_name ? new It(this.game) : "BuildBlock" == t.class_name ? new e(this.game) : "ItemBoomerang" == t.class_name ? new ai(this.game) : "Arrow" == t.class_name ? new hi(this.game) : "Oar" == t.class_name ? new kt(this.game) : "DeconstructHammer" == t.class_name ? new vt(this.game) : "AmmoItem" == t.class_name ? new V(this.game) : "Bow" == t.class_name ? new oi(this.game) : "ChickenRawSaki" == t.class_name ? new C(this.game) : "ChickenRawMoto" == t.class_name ? new L(this.game) : "ChickenCookedSaki" == t.class_name ? new S(this.game) : "GenericFood" == t.class_name ? new u(this.game) : "CookedFish" == t.class_name ? new d(this.game) : "VeggieTomato" == t.class_name ? new mt(this.game) : "ChickenCookedMoto" == t.class_name ? new N(this.game) : "ChickenDried" == t.class_name ? new O(this.game) : "MedicalPack" == t.class_name ? new li(this.game) : "DriedFish" == t.class_name ? new p(this.game) : "FishKirimi" == t.class_name ? new y(this.game) : new i(this.game);
    }

  }

  class ri extends _ {
    constructor(t) {
      super(t), this.name = "ボットホーム", this.is_floor = !0, this.image = this.game.image_library.get_image("ship_floor");
    }

    on_update() {
      super.on_update();
    }

  }

  class mi extends _ {
    constructor(t) {
      super(t), this.name = "ドローンホーム", this.is_floor = !0, this.image = this.game.image_library.get_image("kaden_wifi_router");
    }

    on_update() {
      super.on_update();
    }

  }

  class gi {
    constructor(t) {
      this.game = t;
    }

    make_instance(t) {
      return null == t ? null : "WaterPlace" == t.class_name ? new nt(this.game) : "ShipBlock" == t.class_name ? new _(this.game) : "BotHome" == t.class_name ? new ri(this.game) : "BotHouseDog" == t.class_name ? new tt(this.game) : "ShipCore" == t.class_name ? new m(this.game) : "BotHouseCat" == t.class_name ? new et(this.game) : "WeaponMortorTube" == t.class_name ? new ot(this.game) : "CommonBlock" == t.class_name ? new B(this.game) : "ShipFrame" == t.class_name ? new r(this.game) : "DryLack" == t.class_name ? new pt(this.game) : "ShipFloor" == t.class_name ? new n(this.game) : "ShipFarmWood" == t.class_name ? new ut(this.game) : "LevelFlag2" == t.class_name ? new Z(this.game) : "ShipFarm" == t.class_name ? new gt(this.game) : "WeaponAirCannon" == t.class_name ? new _t(this.game) : "WeaponCatapult" == t.class_name ? new at(this.game) : "ShipMast" == t.class_name ? new yt(this.game) : "FuelEngine" == t.class_name ? new st(this.game) : "VictoryRocket" == t.class_name ? new W(this.game) : "DroneHome" == t.class_name ? new mi(this.game) : "WaterPlace2" == t.class_name ? new rt(this.game) : "WeaponMachineGun" == t.class_name ? new ht(this.game) : "LevelFlag1" == t.class_name ? new Y(this.game) : "LevelFlag3" == t.class_name ? new K(this.game) : "FirePlace" == t.class_name ? new dt(this.game) : "ShipFarmFood" == t.class_name ? new ct(this.game) : new _(this.game);
    }

  }

  class ci {
    constructor(t) {
      this.game = t, this.item_instance_maker = new ni(this.game), this.block_instance_maker = new gi(this.game), this.is_data_saved = !1;
    }

    delete_save_data() {
      localStorage.setItem("save_data_1", JSON.stringify({
        hoge: "fuga",
        deleted: !0
      }));
    }

    save_game(t) {
      let i = {
        hoge: "fuga",
        deleted: !1
      };
      i.item_slot = this.game.hud.item_slot.save_data(), i.inventory = this.game.inventory.save_data(), i.ship = this.game.world.ship.save_data(), i.materials = this.game.materials.save_data(), i.player_health = this.game.world.player.health.save_data(), i.tutorial_data = this.game.tutorial_data.save_data(), console.log("save"), console.log(i), localStorage.setItem(t, JSON.stringify(i));
    }

    load_game(t) {
      try {
        let i = localStorage.getItem(t);
        if (null == i) return this.game.log("セーブデータがありません。"), !1;
        let e = JSON.parse(i);
        if (1 == e.deleted) return this.game.log("セーブデータが消去済みです。"), !1;
        this.game.hud.item_slot.load_data(e.item_slot), this.game.inventory.load_data(e.inventory), this.game.world.ship.load_data(e.ship), this.game.materials.load_data(e.materials), this.game.world.player.health.load_data(e.player_health), this.game.tutorial_data.load_data(e.tutorial_data), console.log("load"), console.log(e), this.game.log("セーブデータをロードしました。");
      } catch (t) {
        return this.game.log("データのロードに失敗しました。"), this.game.log("エラー: " + t), console.log(t), !1;
      }

      return !0;
    }

    deserialize_item(t) {
      let i = this.item_instance_maker.make_instance(t);
      return null == i ? null : (i.load_data(t), i);
    }

    deserialize_block(t) {
      let i = this.block_instance_maker.make_instance(t);
      return null == i ? null : (i.load_data(t), i);
    }

  }

  class ui {
    constructor(t) {
      this.game = t, this.button_size = 120, this.text_margin = 30, this.calc_button_position(), this.is_enable = !1;
    }

    toggle_enable() {
      this.is_enable = !this.is_enable;
    }

    calc_button_position() {
      this.down_x = 100, this.down_y = 400, this.left_x = this.down_x - .5 * this.button_size, this.left_y = this.down_y - .8 * this.button_size, this.right_x = this.down_x + .5 * this.button_size, this.right_y = this.down_y - .8 * this.button_size, this.up_x = this.down_x, this.up_y = this.down_y - 1.6 * this.button_size, this.a_x = 800, this.a_y = 300, this.b_x = this.a_x - 1.2 * this.button_size, this.b_y = this.a_y + .2 * this.button_size;
    }

    on_update() {
      if (this.is_enable) {
        if (this.game.input_controller.get_mouse_press()) {
          let t = this.game.input_controller.mouse_x,
              i = this.game.input_controller.mouse_y;
          this.hit_test_button(t, i, this.down_x, this.down_y, this.button_size) && (this.game.input_controller.is_virtual_press_down = !0, this.game.input_controller.is_mouse_press_consumed = !0), this.hit_test_button(t, i, this.up_x, this.up_y, this.button_size) && (this.game.input_controller.is_virtual_press_up = !0, this.game.input_controller.is_mouse_press_consumed = !0), this.hit_test_button(t, i, this.left_x, this.left_y, this.button_size) && (this.game.input_controller.is_virtual_press_left = !0, this.game.input_controller.is_mouse_press_consumed = !0), this.hit_test_button(t, i, this.right_x, this.right_y, this.button_size) && (this.game.input_controller.is_virtual_press_right = !0, this.game.input_controller.is_mouse_press_consumed = !0), this.hit_test_button(t, i, this.a_x, this.a_y, this.button_size) && (this.game.input_controller.is_virtual_press_space = !0, this.game.input_controller.is_mouse_press_consumed = !0), this.hit_test_button(t, i, this.b_x, this.b_y, this.button_size) && (this.game.input_controller.is_virtual_press_esc = !0, this.game.input_controller.is_mouse_press_consumed = !0);
        }

        if (this.game.input_controller.get_mouse_down()) {
          let t = this.game.input_controller.mouse_x,
              i = this.game.input_controller.mouse_y;
          this.hit_test_button(t, i, this.down_x, this.down_y, this.button_size) && (this.game.input_controller.is_virtual_down_down = !0, this.game.input_controller.is_mouse_down_consumed = !0), this.hit_test_button(t, i, this.up_x, this.up_y, this.button_size) && (this.game.input_controller.is_virtual_down_up = !0, this.game.input_controller.is_mouse_down_consumed = !0), this.hit_test_button(t, i, this.left_x, this.left_y, this.button_size) && (this.game.input_controller.is_virtual_down_left = !0, this.game.input_controller.is_mouse_down_consumed = !0), this.hit_test_button(t, i, this.right_x, this.right_y, this.button_size) && (this.game.input_controller.is_virtual_down_right = !0, this.game.input_controller.is_mouse_down_consumed = !0), this.hit_test_button(t, i, this.a_x, this.a_y, this.button_size) && (this.game.input_controller.is_virtual_down_space = !0, this.game.input_controller.is_mouse_down_consumed = !0), this.hit_test_button(t, i, this.b_x, this.b_y, this.button_size) && (this.game.input_controller.is_virtual_down_esc = !0, this.game.input_controller.is_mouse_down_consumed = !0);
        }
      }
    }

    hit_test_button(t, i, e, s, _) {
      return e < t && t < e + _ && s < i && i < s + _;
    }

    on_draw(t) {
      this.is_enable && (t.save(), t.fillStyle = "rgb(100,100,100)", t.strokeStyle = "rgb(50,50,50)", t.font = "bold 24px monospace", t.textBaseline = "top", t.strokeRect(this.down_x, this.down_y, this.button_size, this.button_size), t.fillText("↓", this.down_x + this.text_margin, this.down_y + this.text_margin), t.strokeRect(this.up_x, this.up_y, this.button_size, this.button_size), t.fillText("↑", this.up_x + this.text_margin, this.up_y + this.text_margin), t.strokeRect(this.left_x, this.left_y, this.button_size, this.button_size), t.fillText("←", this.left_x + this.text_margin, this.left_y + this.text_margin), t.strokeRect(this.right_x, this.right_y, this.button_size, this.button_size), t.fillText("→", this.right_x + this.text_margin, this.right_y + this.text_margin), t.strokeRect(this.a_x, this.a_y, this.button_size, this.button_size), t.fillText("A", this.a_x + this.text_margin, this.a_y + this.text_margin), t.strokeRect(this.b_x, this.b_y, this.button_size, this.button_size), t.fillText("B", this.b_x + this.text_margin, this.b_y + this.text_margin), t.restore());
    }

  }

  class di extends Object {
    constructor(t) {
      super(t), this.game = t;
    }

    test_log() {
      this.game.log("debug command test!!");
    }

    get_random_weapon() {
      let t = new G(this.game);
      t.generate_random_weapon(10, 10), this.game.world.give_tool_item_player(t);
    }

    get_effect_test_weapon() {
      let t = new G(this.game);
      t.set_image("dougu_nail_hammer"), t.saving_data.item_name = "デバッグ武器", t.saving_data.power = 10, t.saving_data.cool_time = 50, t.saving_data.fire_burst = 5, t.saving_data.fire_spread = 3, t.saving_data.fire_spread_angle = .2, t.saving_data.bullet_lifetime = 50, t.saving_data.bullet_velocity = 10, t.saving_data.bullet_weight = 50, t.saving_data.blast_lifetime = 25, t.saving_data.blast_velocity = 5, t.saving_data.critical_range_lifetime = 45, t.saving_data.critical_range_damage = 3, t.saving_data.critical_chance = .1, t.saving_data.critical_chance_damage = 2, t.saving_data.knockback_rate = 1, t.saving_data.poison_damage = 10, t.saving_data.slow_rate = .5, t.saving_data.life_leech = 10, t.saving_data.bullet_color = "rgb(250,0,250)", this.game.world.give_tool_item_player(t);
    }

  }

  class pi {
    constructor() {
      this.name = "ikada", this.version = "0.1", this.game = this, this.display_canvas_element = document.getElementById("my_canvas"), this.display_canvas = this.display_canvas_element.getContext("2d"), this.SCREEN_WIDTH = 960, this.SCREEN_HEIGHT = 600, this.SCREEN_WIDTH_HALF = this.SCREEN_WIDTH / 2, this.SCREEN_HEIGHT_HALF = this.SCREEN_HEIGHT / 2, this.buffer_canvas_element = document.getElementById("my_buffer_canvas"), this.buffer_canvas_element.width = this.SCREEN_WIDTH, this.buffer_canvas_element.height = this.SCREEN_HEIGHT, this.buffer_canvas = this.buffer_canvas_element.getContext("2d"), this.active_canvas = this.display_canvas, this.inactive_canvas = this.buffer_canvas, this.is_use_buffer = !1, this.performance_count = 0, this.update_process_time = 0, this.draw_process_time = 0, this.image_library = new jt(this), this.image_library.load_images(), this.sound_library = new Qt(this), this.input_controller = new Yt(this), this.tutorial_data = new Gt(this), this.world = new D(this), this.hud = new Wt(this), this.inventory = new Vt(this), this.materials = new $t(this), this.save_data_manager = new ci(this), this.is_there_title = !0, this.title_screen = new ti(this), this.movie_playing = null, this.hud_virtual_input = new ui(this), this.dc = new di(this), this.interbal_handle = 0;
    }

    reset() {
      console.log("game reset!"), console.log(this.name, this.version);
    }

    start() {
      this.log("welcome, drifter."), this.log("-----"), this.log("主な操作(仮)"), this.log("WASD: 移動、ジャンプ"), this.log("マウスクリック: アイテムを使う"), this.log("マウスホイール: アイテムスロットを選ぶ"), this.log("Tabキー: メニューを開く"), this.log("Q,E: メニューのタブ移動"), this.log("X,スペース,エンター: メニューの決定"), this.log("-----"), this.input_controller.setup(), this.interbal_handle = setInterval(this.on_update.bind(this), 20);
    }

    test() {
      console.log("game test!");
    }

    log(t) {
      this.hud.hud_log.push_log(t);
    }

    on_update() {
      try {
        performance.mark("on_update_start"), this.input_controller.on_update(), this.hud_virtual_input.on_update(), null != this.movie_playing ? this.movie_playing.on_update() : this.is_there_title ? this.title_screen.on_update() : (this.hud.on_update(), this.world.on_update(), this.tutorial_data.on_update()), this.is_played_log_sound_in_frame = !1, this.input_controller.is_pressed_key.KeyP && (this.game.log("デバッグチート"), this.game.materials.cheat()), this.input_controller.is_pressed_key.KeyL && (this.game.log("ミュート切り替え"), this.game.sound_library.toggle_mute()), this.on_draw(), performance.mark("on_update_end"), this.calc_parformance();
      } catch (t) {
        throw clearInterval(this.interbal_handle), console.log("game halted on error!"), alert(t), this.display_canvas.fillStyle = pi.PROC_TIME_COLOR, this.display_canvas.font = pi.PROC_TIME_FONT, this.display_canvas.fillText("エラー発生: " + t, 200, 200), t;
      }
    }

    calc_parformance() {
      if (performance.measure("update", "on_update_start", "on_update_end"), performance.measure("draw", "on_draw_start", "on_draw_end"), 100 < this.performance_count) {
        this.performance_count = 0;
        let t = 0,
            i = null;
        i = performance.getEntriesByName("update"), t = 0;

        for (let e = 0; e < i.length; e++) t += i[e].duration;

        this.update_process_time = Math.floor(10 * t), i = performance.getEntriesByName("draw"), t = 0;

        for (let e = 0; e < i.length; e++) t += i[e].duration;

        this.draw_process_time = Math.floor(10 * t), performance.clearMeasures();
      } else this.performance_count += 1;
    }

    draw_parformance(t) {
      t.fillStyle = pi.PROC_TIME_COLOR, t.font = pi.PROC_TIME_FONT, t.fillText(" All: " + this.update_process_time + "[us]", pi.PROC_TIME_X, pi.PROC_TIME_Y + 0 * pi.PROC_TIME_SPACING), t.fillText("Draw: " + this.draw_process_time + "[us]", pi.PROC_TIME_X, pi.PROC_TIME_Y + 1 * pi.PROC_TIME_SPACING);
    }

    on_draw() {
      performance.mark("on_draw_start"), this.is_use_buffer || (this.display_canvas.lineWidth = 2, this.display_canvas.fillStyle = "rgb(10,10,30)", this.display_canvas.fillRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT), null != this.movie_playing ? this.movie_playing.on_draw(this.display_canvas) : this.world.on_draw(this.display_canvas), this.hud.on_draw(this.display_canvas), this.hud_virtual_input.on_draw(this.display_canvas), this.is_there_title && this.title_screen.on_draw(this.display_canvas)), performance.mark("on_draw_end");
    }

  }

  _defineProperty(pi, "PROC_TIME_X", 10);

  _defineProperty(pi, "PROC_TIME_Y", 10);

  _defineProperty(pi, "PROC_TIME_SPACING", 12);

  _defineProperty(pi, "PROC_TIME_COLOR", "rgb(222,222,222)");

  _defineProperty(pi, "PROC_TIME_FONT", "bold 12px monospace");

  try {
    var yi = new pi();
    window.game = yi, yi.reset(), yi.test(), yi.start();
  } catch (t) {
    throw alert(t), t;
  }
})();