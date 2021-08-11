game = (function(){
  var _game = {}
  /**
   * メインのゲーム画面になるテーブルを作る
   */
  _game.setup_table_dom = function(){
    var grid_table = document.createElement('table')
    grid_table.id = 'grid-table'
    // テーブル構成
    var top_edge = document.createElement('tr')
    var top_left_edge = document.createElement('td')
    top_left_edge.classList.add('sub-cell')
    top_left_edge.classList.add('sub-cell-corner')
    top_edge.appendChild(top_left_edge)
    for(var x = 0 ; x < 5 ; x++){
      var sub_grid_cell = document.createElement('td')
      sub_grid_cell.classList.add('sub-cell')
      sub_grid_cell.classList.add('sub-cell-horizontal')
      top_edge.appendChild(sub_grid_cell);
      var sub_right_side_cell = document.createElement('td')
      sub_right_side_cell.classList.add('sub-cell')
      sub_right_side_cell.classList.add('sub-cell-corner')
      top_edge.appendChild(sub_right_side_cell);
    }
    grid_table.appendChild(top_edge)

    for(var y = 0 ; y < 5 ; y++){
      var grid_row = document.createElement('tr')
      var left_edge = document.createElement('td')
      left_edge.classList.add('sub-cell')
      left_edge.classList.add('sub-cell-vertical')
      grid_row.appendChild(left_edge);
      for(var x = 0 ; x < 5 ; x++){
        var grid_cell = document.createElement('td')
        grid_row.appendChild(grid_cell);
        var text = document.createElement('span')
        text.textContent = 'x'
        grid_cell.appendChild(text);
        grid_cell.classList.add('grid-cell')

        var right_side_cell = document.createElement('td')
        right_side_cell.classList.add('sub-cell')
        right_side_cell.classList.add('sub-cell-vertical')
        grid_row.appendChild(right_side_cell);
      }
      grid_table.appendChild(grid_row);
      var sub_row = document.createElement('tr')
      var sub_left_edge = document.createElement('td')
      sub_left_edge.classList.add('sub-cell')
      sub_left_edge.classList.add('sub-cell-corner')
      sub_row.appendChild(sub_left_edge);
      for(var x = 0 ; x < 5 ; x++){
        var sub_grid_cell = document.createElement('td')
        sub_grid_cell.classList.add('sub-cell')
        sub_grid_cell.classList.add('sub-cell-horizontal')
        sub_row.appendChild(sub_grid_cell);
        var sub_right_side_cell = document.createElement('td')
        sub_right_side_cell.classList.add('sub-cell')
        sub_right_side_cell.classList.add('sub-cell-corner')
        sub_row.appendChild(sub_right_side_cell);
      }
      grid_table.appendChild(sub_row);

    }


    document.getElementById('grid-container').appendChild(grid_table)
  };

  return _game;

})();
