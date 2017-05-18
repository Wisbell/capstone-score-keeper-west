
// Past Games Factory
scoreKeeper.factory('PastGamesFactory', function($http){

  return {
            getPastGameList: function(){
                      return rootDatabase.ref('pastGames').once('value')
                        .then( function (snap) { return snap.val()})
                        .then(function(pastGamesList) {
                          console.log("pastGamesList", pastGamesList)
                          return pastGamesList
                        })
                    }
          } // Close factory return statement
})
