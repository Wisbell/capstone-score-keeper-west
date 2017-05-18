// PingPong Game Controller - Hosting a game
scoreKeeper.controller('HostPingPongGame', function($scope, $state, $ionicHistory, LiveGamesFactory, $stateParams, $ionicModal, $interval, $ionicBody, $location) {

  // store stateParam to make get request
  var gameId = $stateParams.id

  // get the particular games information from firebase and store it
  LiveGamesFactory.getParticularGame(gameId)
    .then(function(game){
      $scope.currentGame = game;
      console.log("scope game", $scope.currentGame)
    })

  // change game scores or current server when changed
  rootDatabase.ref('currentGames/' + gameId).on('child_changed', function(){
    LiveGamesFactory.getParticularGame(gameId)
    .then(function(game){
      $scope.currentGame = game;
      console.log("changed game", $scope.currentGame)

      $scope.$apply()
    })
    // check for a winner when the game is changed
    .then(function(){$scope.checkWinner()})
  })

  $scope.incrementScoreTeamOne = function(){
    console.log("increment team one score function called")

    $scope.teamOneScore

    rootDatabase.ref('currentGames/' + gameId + '/team1Points').once('value')
      .then(function(snap) {
        // console.log('test')
        console.log('snap', snap.val())
        $scope.teamOneScore = snap.val()
        $scope.teamOneScore = $scope.teamOneScore + 1
        console.log("team one score increment", $scope.teamOneScore)

        rootDatabase.ref('currentGames/' + gameId + '/').update({"team1Points": $scope.teamOneScore})
      })
  }

  $scope.decrementScoreTeamOne = function(){
    console.log("decrement team one score function called")

    $scope.teamOneScore

    rootDatabase.ref('currentGames/' + gameId + '/team1Points').once('value')
      .then(function(snap) {
        console.log('snap', snap.val())

        if(snap.val() >= 1){
          $scope.teamOneScore = snap.val()
          $scope.teamOneScore = $scope.teamOneScore - 1
          console.log($scope.teamOneScore)

          rootDatabase.ref('currentGames/' + gameId + '/').update({"team1Points": $scope.teamOneScore})
        } else {
          console.log("score cannot be less than 0")
        }
      })
  }

  $scope.incrementScoreTeamTwo = function(){
    console.log("increment team two score function called")

    $scope.teamTwoScore
    console.log('teamTwoScore initally', $scope.teamTwoScore)

    rootDatabase.ref('currentGames/' + gameId + '/team2Points').once('value')
      .then(function(snap) {
        console.log('snap', snap.val())
        $scope.teamTwoScore = snap.val()
        $scope.teamTwoScore = $scope.teamTwoScore + 1
        console.log("updated team two score", $scope.teamTwoScore)

        rootDatabase.ref('currentGames/' + gameId + '/').update({"team2Points": $scope.teamTwoScore})
      })
  }

  $scope.decrementScoreTeamTwo = function(){
    console.log("decrement team two score function called")

    $scope.teamTwoScore
    console.log('teamTwoScore initally', $scope.teamTwoScore)

    rootDatabase.ref('currentGames/' + gameId + '/team2Points').once('value')
      .then(function(snap) {
        console.log('snap', snap.val())

        if(snap.val() >= 1){
          $scope.teamTwoScore = snap.val()
          $scope.teamTwoScore = $scope.teamTwoScore - 1
          console.log("updated team two score", $scope.teamTwoScore)

          rootDatabase.ref('currentGames/' + gameId + '/').update({"team2Points": $scope.teamTwoScore})
        }
      })
  }

  $scope.checkWinner = function(){
    console.log("checkWinner function called")
    // grab winning score
    var winningScore = $scope.currentGame.winningScore
    // get score of both teams
    var teamOneScore = $scope.currentGame.team1Points// + 1
    console.log("team one score", teamOneScore)
    var teamTwoScore = $scope.currentGame.team2Points// + 1
    console.log("team two score", teamTwoScore)
    // check team 1 score to winning score
    if(teamOneScore == winningScore){
      console.log("team one won")
      // update winningTeam variable on firebase
      rootDatabase.ref('currentGames/' + gameId + '/').update({"winningTeam": $scope.currentGame.team1Name})
      // ask host to end game
        // show modal
      $scope.winnerModal.show()

      // if host ends game change game over value on firebase
      rootDatabase.ref('currentGames/' + gameId + '/').update({"gameOver": true})
    }
    // check team 2 score to winning score
    else if(teamTwoScore == winningScore){
      console.log("team two won")

      rootDatabase.ref('currentGames/' + gameId + '/').update({"winningTeam": $scope.currentGame.team2Name})

      rootDatabase.ref('currentGames/' + gameId + '/').update({"gameOver": true})
      $scope.winnerModal.show()
    } else {
      console.log("no one won")
      // reset gameOver value in firebase
      rootDatabase.ref('currentGames/' + gameId + '/').update({"gameOver": false})

      // reset winning team value in firebase
      rootDatabase.ref('currentGames/' + gameId + '/').update({"winningTeam": ""})
    }
  }

  // winner modal
  $ionicModal.fromTemplateUrl('templates/pingPongWinnerHostModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.winnerModal = modal;
  });

  // close winner modal
  $scope.closeWinnerModal = function(){
    $scope.winnerModal.hide()
    // http://stackoverflow.com/questions/36295476/ionicmodal-disabling-click-events
    $ionicBody.removeClass('modal-open');
    $ionicBody.removeClass('popup-open');
  }


  // make an end game function that moves the game to the past games section of firebase
  $scope.endGame = function() {
    console.log("endGame function called")

    // move current game to past games

    // grab current game info
    rootDatabase.ref('currentGames/' + gameId + '/').once('value')
      .then(function(snap){
        console.log("snap shot yo", snap.val())

        // post object to pastGames
        rootDatabase.ref('pastGames/').push(snap.val())
      })
      .then(function(){
        // remove game from currentGames
        rootDatabase.ref('currentGames/' + gameId + '/').remove()
      })
      .then(function(){
        console.log("did this fire")
        // close modal
        $scope.closeWinnerModal()

        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.about')
      })
  }
}) // Close Ping Pong Host Controller
