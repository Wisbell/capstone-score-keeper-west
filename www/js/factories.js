angular.module('starter.factories', [])

// Create Game Factory
.factory('CreateGameFactory', function($http){

  return {
            getGameSettingsList: function(){
                      return gameSettingsRef.once('value')
                        .then((snap) => snap.val())
                        .then((gameSettingsObject) => {
                          // console.log("gameSettingsObject", gameSettingsObject)
                          return gameSettingsObject
                        })
                    },

            getGameNameList: function(){
                      return gameSettingsRef.once('value')
                        .then((snap) => snap.val())
                        .then((gameSettingsObject) => {

                          let nameList = []

                          for(let obj in gameSettingsObject) {
                            nameList.push(gameSettingsObject[obj].gameTypeName)
                          }

                          return nameList
                        })
                    },
            createNewGame: function(createGame){
                      console.log("createNewGame function called from factory")
                      console.log("create game object", createGame)
                      return currentGamesRef.push(createGame)
                        // .then((snap)=>{
                        //   console.log("key?", snap.key)
                        //   return snap.key
                        // })
                    }
          } // Close factory return statement
})


// Live Games Factory
.factory('LiveGamesFactory', function($http){

  return {
            getCurrentGameList: function(){
                      return currentGamesRef.once('value')
                        .then((snap) => snap.val())
                        .then((currentGamesList) => {
                          console.log("currentGamesList", currentGamesList)
                          return currentGamesList
                        })
                    },

            getParticularGame: function(gameId){
                      return rootDatabase.ref(`currentGames/${gameId}`).once('value')
                        .then((snap)=> {
                          return snap.val()
                        })
                    },
            getAllHostGames: function(hostUid){
                      return currentGamesRef.orderByChild('gameHostUid').equalTo(hostUid).once('value')
                        .then((snap)=> {
                          return snap.val()
                        })
                    }
          } // Close factory return statement
})




// app.factory('DoctorFactory', function($http){

//   return {
//             getDoctorList: function(){
//               return $http.get('https://west-doctors-patients.firebaseio.com/doctors.json')
//                 .then(function(val){
//                   console.log("val", val)
//                   return val.data
//               })
//             }
//           }
// })
