minigames = (function(){
    var _minigames = {};

    var minigame_list = []

    _minigames.add_minigame = function( key, new_minigame_function ){
        minigame_list[ key ] = new_minigame_function;
    }
    _minigames.get_minigame_list = function(){
        return minigame_list;
    }

    return _minigames;
})();
