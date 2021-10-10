minigames.add_minigame(
    "touch_count",
    function( spawned_x, spawned_y ){
        var _minigame = {}

        var current_x = spawned_x
        var current_y = spawned_y

        var clear_count = 10;

        _minigame.on_start = function( x, y ){
            clear_count = 10;
        }
        _minigame.on_grid_press = function( x, y ){

            if( !(x == current_x && y == current_y) ){
                clear_count -= 1
                _minigame.redraw();
            }
        }
        _minigame.redraw = function( x, y ){
            var target_cell = game.get_cell(current_x, current_y)
            target_cell.dom.textContent = clear_count+",";
        }

        return _minigame;
    }
);
