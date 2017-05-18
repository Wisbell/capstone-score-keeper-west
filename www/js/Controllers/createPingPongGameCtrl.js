scoreKeeper.controller('CreatePingPongCtrl', function($scope, CreateGameFactory, $location) {

  // this object allows the ability to set gameChocie scope variable
  $scope.settings = {}

  // this sets the default choices
  $scope.settings.playerChoice = "2"
  $scope.settings.gameChoice = "Long"
  $scope.winningScore = "21";
  $scope.switchServer = "5"

  // ng-change function for when gameChoice changes
  $scope.updateSettings = function () {
    console.log("gameChoice changed")

    if($scope.settings.gameChoice === "Long") {
      console.log("long game")
      $scope.winningScore = "21"
      $scope.switchServer = "5"
    }
    else if ($scope.settings.gameChoice === "Short"){
      console.log("short game")
      $scope.winningScore = "11"
      $scope.switchServer = "2"
    }
  }

  // submit ping pong game function
  $scope.createGameButton = function () {
    console.log("createGameButton clicked")

    var gameKey

    // gameId is null on default because the id isn't created until it is posted to firebase
    var gameInfo = {
      "gameType": "Ping Pong",
      "gamePicUrl": "img/ping-pong.jpeg",
      "gameName": $scope.settings.gameName,
      "numPlayers": $scope.settings.playerChoice,
      "winningScore": $scope.winningScore,
      "switchServer": $scope.switchServer,
      "team1Name": $scope.settings.team1Name,
      "team2Name": $scope.settings.team2Name,
      "team1Points": 0,
      "team2Points": 0,
      "gameTypeLinkName": "pingPong",
      "gameHostUid": firebase.auth().currentUser.uid,
      "gameId": false,
      "gameOver": false,
      "winningTeam": false
    }

    console.log("gameInfo object", gameInfo)

    // Don't use JSON.stringify
    CreateGameFactory.createNewGame(gameInfo)
      .then(function(snap){
        // get key of newly created game object
        gameKey = snap.key

        // update game object with parent key as a gameId
        firebase.database().ref('currentGames/' + gameKey).update({
          "gameId": gameKey
        })

      })
      .then(function(){
        $location.url('/app/myGames/pingPong/' + gameKey)
        $scope.$apply()
      })
  }
})
