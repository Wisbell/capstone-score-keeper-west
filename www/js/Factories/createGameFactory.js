scoreKeeper

// Create Game Factory
.factory('CreateGameFactory', function($http){

  return {
            getGameSettingsList: function(){
                      return gameSettingsRef.once('value')
                        .then(function(snap) { return snap.val() })
                        .then(function(gameSettingsObject) {
                          return gameSettingsObject
                        })
                    },

            getGameNameList: function(){
                      return gameSettingsRef.once('value')
                        .then(function(snap) { return snap.val() })
                        .then(function(gameSettingsObject) {

                          var nameList = []

                          for(var obj in gameSettingsObject) {
                            nameList.push(gameSettingsObject[obj].gameTypeName)
                          }

                          return nameList
                        })
                    },
            createNewGame: function(createGame){
                      console.log("createNewGame function called from factory")
                      console.log("create game object", createGame)
                      return currentGamesRef.push(createGame)
                    }
          } // Close factory return statement
})
