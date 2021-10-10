minigames.add_minigame(
    "touch_light",
    function( spawned_x, spawned_y ){
        var _minigame = {}

        var current_x = spawned_x
        var current_y = spawned_y

        var target_x = 0;
        var target_y = 0;
        var clear_count = 3;


        _minigame.set_next_target = function(){
            target_x = Math.floor(Math.random() * 5 )
            target_y = Math.floor(Math.random() * 5 )
        }

        _minigame.on_start = function( x, y ){
            _minigame.set_next_target()
            clear_count = 3;
        }
        _minigame.on_grid_press = function( x, y ){

            if( x == target_x && y == target_y ){
                _minigame.set_next_target()
                clear_count -= 1
                _minigame.redraw();
            }
        }
        _minigame.redraw = function( x, y ){
            var target_cell = game.get_cell(current_x, current_y)
            target_cell.dom.textContent = clear_count+","+target_x+","+target_y+",";
        }

        return _minigame;
    }
);
