
// Live Games Factory
scoreKeeper.factory('LiveGamesFactory', function($http){

  return {
            getCurrentGameList: function(){
                      return currentGamesRef.once('value')
                        .then(function (snap){ return snap.val()})
                        .then(function(currentGamesList) {
                          console.log("currentGamesList", currentGamesList)
                          return currentGamesList
                        })
                    },

            getParticularGame: function(gameId){
                      return rootDatabase.ref('currentGames/' + gameId).once('value')
                        .then(function(snap){
                          return snap.val()
                        })
                    },
            getAllHostGames: function(hostUid){
                      return currentGamesRef.orderByChild('gameHostUid').equalTo(hostUid).once('value')
                        .then(function(snap) {
                          return snap.val()
                        })
                    }
          } // Close factory return statement
})
