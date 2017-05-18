// angular.module('starter.factories', [])

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


// Live Games Factory
.factory('LiveGamesFactory', function($http){

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

// Past Games Factory
.factory('PastGamesFactory', function($http){

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


// Auth Factory
.factory('AuthFactory', function($q) {
    return {
      login: function (email, pass) {
        // converts native ES6 promise to angular promise so no $scope.$apply needed
        return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass))
      },

      signOut: function  () {
        return firebase.auth().signOut()
      },

      getUserId: function  () {
        return firebase.auth().currentUser.uid
      },

      getUser: function  () {
        console.log("get user func fired")
        // Joel and Luke are my heroes.  Both Lukes, all lukes.
        return $q(function(resolve, reject) {
            console.log("please let me see this")
            const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
              console.log("does this log")
              unsubscribe();
              if (user) {
                console.log("test1")
                resolve(user.uid);
              } else {
                console.log("test2")
                reject("Not logged in");
              }
            }); //end const unsubscribe
          }); //end return getUser
        } //end getUser
      } // close factory return satement
  }) // end Auth Factory
