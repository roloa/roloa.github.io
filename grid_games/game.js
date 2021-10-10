game = (function(){
    var _game = {}
    var cell_list = []
    for( i = 0 ; i < 25 ; i++ ) {
        cell_list[i] = {}
        cell_list.mini_game = null
    }

    _game.cell_onmousedown = function( x, y ){
        for( i = 0 ; i < cell_list.length ; i++ ) {
            if( cell_list[i].mini_game != null ){
                cell_list[i].mini_game.on_grid_press(x,y)
            }
        }
    }

    _game.initialize_cell_list = function(){
        cell_list[0].dom = document.getElementById('grid-cell-0-0')
        cell_list[1].dom = document.getElementById('grid-cell-1-0')
        cell_list[2].dom = document.getElementById('grid-cell-2-0')
        cell_list[3].dom = document.getElementById('grid-cell-3-0')
        cell_list[4].dom = document.getElementById('grid-cell-4-0')
        cell_list[5].dom = document.getElementById('grid-cell-0-1')
        cell_list[6].dom = document.getElementById('grid-cell-1-1')
        cell_list[7].dom = document.getElementById('grid-cell-2-1')
        cell_list[8].dom = document.getElementById('grid-cell-3-1')
        cell_list[9].dom = document.getElementById('grid-cell-4-1')
        cell_list[10].dom = document.getElementById('grid-cell-0-2')
        cell_list[11].dom = document.getElementById('grid-cell-1-2')
        cell_list[12].dom = document.getElementById('grid-cell-2-2')
        cell_list[13].dom = document.getElementById('grid-cell-3-2')
        cell_list[14].dom = document.getElementById('grid-cell-4-2')
        cell_list[15].dom = document.getElementById('grid-cell-0-3')
        cell_list[16].dom = document.getElementById('grid-cell-1-3')
        cell_list[17].dom = document.getElementById('grid-cell-2-3')
        cell_list[18].dom = document.getElementById('grid-cell-3-3')
        cell_list[19].dom = document.getElementById('grid-cell-4-3')
        cell_list[20].dom = document.getElementById('grid-cell-0-4')
        cell_list[21].dom = document.getElementById('grid-cell-1-4')
        cell_list[22].dom = document.getElementById('grid-cell-2-4')
        cell_list[23].dom = document.getElementById('grid-cell-3-4')
        cell_list[24].dom = document.getElementById('grid-cell-4-4')
    }

    _game.assign_onmousedown_to_grid_cell = function(){
        cell_list[0].dom.onmousedown = function(){ _game.cell_onmousedown(0,0) }
        cell_list[1].dom.onmousedown = function(){ _game.cell_onmousedown(1,0) }
        cell_list[2].dom.onmousedown = function(){ _game.cell_onmousedown(2,0) }
        cell_list[3].dom.onmousedown = function(){ _game.cell_onmousedown(3,0) }
        cell_list[4].dom.onmousedown = function(){ _game.cell_onmousedown(4,0) }
        cell_list[5].dom.onmousedown = function(){ _game.cell_onmousedown(0,1) }
        cell_list[6].dom.onmousedown = function(){ _game.cell_onmousedown(1,1) }
        cell_list[7].dom.onmousedown = function(){ _game.cell_onmousedown(2,1) }
        cell_list[8].dom.onmousedown = function(){ _game.cell_onmousedown(3,1) }
        cell_list[9].dom.onmousedown = function(){ _game.cell_onmousedown(4,1) }
        cell_list[10].dom.onmousedown = function(){ _game.cell_onmousedown(0,2) }
        cell_list[11].dom.onmousedown = function(){ _game.cell_onmousedown(1,2) }
        cell_list[12].dom.onmousedown = function(){ _game.cell_onmousedown(2,2) }
        cell_list[13].dom.onmousedown = function(){ _game.cell_onmousedown(3,2) }
        cell_list[14].dom.onmousedown = function(){ _game.cell_onmousedown(4,2) }
        cell_list[15].dom.onmousedown = function(){ _game.cell_onmousedown(0,3) }
        cell_list[16].dom.onmousedown = function(){ _game.cell_onmousedown(1,3) }
        cell_list[17].dom.onmousedown = function(){ _game.cell_onmousedown(2,3) }
        cell_list[18].dom.onmousedown = function(){ _game.cell_onmousedown(3,3) }
        cell_list[19].dom.onmousedown = function(){ _game.cell_onmousedown(4,3) }
        cell_list[20].dom.onmousedown = function(){ _game.cell_onmousedown(0,4) }
        cell_list[21].dom.onmousedown = function(){ _game.cell_onmousedown(1,4) }
        cell_list[22].dom.onmousedown = function(){ _game.cell_onmousedown(2,4) }
        cell_list[23].dom.onmousedown = function(){ _game.cell_onmousedown(3,4) }
        cell_list[24].dom.onmousedown = function(){ _game.cell_onmousedown(4,4) }
    }

    _game.get_cell = function(x, y){
        return cell_list[ x + (y * 5) ]
    }

    _game.spawn_minigame = function( minigame_function, x, y ){
        _game.get_cell(x, y).mini_game = minigame_function(x, y)
        _game.get_cell(x, y).mini_game.on_start()
        _game.get_cell(x, y).mini_game.redraw()
    }

    _game.init = function(){
        game.initialize_cell_list()
        game.assign_onmousedown_to_grid_cell()

        var minigame_list = minigames.get_minigame_list()
        game.spawn_minigame( minigame_list["touch_light"], 1,2)
        game.spawn_minigame( minigame_list["touch_light"], 3,2)
        game.spawn_minigame( minigame_list["touch_count"], 2,3)


    }

    return _game;

})();
