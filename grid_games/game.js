game = (function(){
    var _game = {}
    var cell_list = []

    _game.cell_onmousedown = function( x, y ){
        console.log(x,y)
    }

    _game.initialize_cell_list = function(){
        cell_list[0] = document.getElementById('grid-cell-0-0')
        cell_list[1] = document.getElementById('grid-cell-1-0')
        cell_list[2] = document.getElementById('grid-cell-2-0')
        cell_list[3] = document.getElementById('grid-cell-3-0')
        cell_list[4] = document.getElementById('grid-cell-4-0')
        cell_list[5] = document.getElementById('grid-cell-0-1')
        cell_list[6] = document.getElementById('grid-cell-1-1')
        cell_list[7] = document.getElementById('grid-cell-2-1')
        cell_list[8] = document.getElementById('grid-cell-3-1')
        cell_list[9] = document.getElementById('grid-cell-4-1')
        cell_list[10] = document.getElementById('grid-cell-0-2')
        cell_list[11] = document.getElementById('grid-cell-1-2')
        cell_list[12] = document.getElementById('grid-cell-2-2')
        cell_list[13] = document.getElementById('grid-cell-3-2')
        cell_list[14] = document.getElementById('grid-cell-4-2')
        cell_list[15] = document.getElementById('grid-cell-0-3')
        cell_list[16] = document.getElementById('grid-cell-1-3')
        cell_list[17] = document.getElementById('grid-cell-2-3')
        cell_list[18] = document.getElementById('grid-cell-3-3')
        cell_list[19] = document.getElementById('grid-cell-4-3')
        cell_list[20] = document.getElementById('grid-cell-0-4')
        cell_list[21] = document.getElementById('grid-cell-1-4')
        cell_list[22] = document.getElementById('grid-cell-2-4')
        cell_list[23] = document.getElementById('grid-cell-3-4')
        cell_list[24] = document.getElementById('grid-cell-4-4')
    }

    _game.assign_onmousedown_to_grid_cell = function(){
        cell_list[0].onmousedown = function(){ _game.cell_onmousedown(0,0) }
        cell_list[1].onmousedown = function(){ _game.cell_onmousedown(1,0) }
        cell_list[2].onmousedown = function(){ _game.cell_onmousedown(2,0) }
        cell_list[3].onmousedown = function(){ _game.cell_onmousedown(3,0) }
        cell_list[4].onmousedown = function(){ _game.cell_onmousedown(4,0) }
        cell_list[5].onmousedown = function(){ _game.cell_onmousedown(0,1) }
        cell_list[6].onmousedown = function(){ _game.cell_onmousedown(1,1) }
        cell_list[7].onmousedown = function(){ _game.cell_onmousedown(2,1) }
        cell_list[8].onmousedown = function(){ _game.cell_onmousedown(3,1) }
        cell_list[9].onmousedown = function(){ _game.cell_onmousedown(4,1) }
        cell_list[10].onmousedown = function(){ _game.cell_onmousedown(0,2) }
        cell_list[11].onmousedown = function(){ _game.cell_onmousedown(1,2) }
        cell_list[12].onmousedown = function(){ _game.cell_onmousedown(2,2) }
        cell_list[13].onmousedown = function(){ _game.cell_onmousedown(3,2) }
        cell_list[14].onmousedown = function(){ _game.cell_onmousedown(4,2) }
        cell_list[15].onmousedown = function(){ _game.cell_onmousedown(0,3) }
        cell_list[16].onmousedown = function(){ _game.cell_onmousedown(1,3) }
        cell_list[17].onmousedown = function(){ _game.cell_onmousedown(2,3) }
        cell_list[18].onmousedown = function(){ _game.cell_onmousedown(3,3) }
        cell_list[19].onmousedown = function(){ _game.cell_onmousedown(4,3) }
        cell_list[20].onmousedown = function(){ _game.cell_onmousedown(0,4) }
        cell_list[21].onmousedown = function(){ _game.cell_onmousedown(1,4) }
        cell_list[22].onmousedown = function(){ _game.cell_onmousedown(2,4) }
        cell_list[23].onmousedown = function(){ _game.cell_onmousedown(3,4) }
        cell_list[24].onmousedown = function(){ _game.cell_onmousedown(4,4) }
    }


    return _game;

})();
