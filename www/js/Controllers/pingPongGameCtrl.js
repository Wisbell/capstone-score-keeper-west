// PingPong Game Controller - Watching a single game
scoreKeeper.controller('PingPongGameCtrl', function($scope, $state, $ionicHistory, LiveGamesFactory, $stateParams, $ionicModal, $ionicBody, $timeout) {

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
    .then(function(){$scope.checkWinnerWatchGame()})
  })

  // winner modal
  $scope.checkWinnerWatchGame = function(){
    console.log("checkWinnerWatchGame function called")

    if($scope.currentGame.gameOver){
      // show modal
      $scope.winnerModal.show()
    } else {
      // This time out is necessary to prevent a bug with the modal
      $timeout(function(){
        if(!$scope.currentGame.gameOver){
          $scope.closeWinnerWatcherModal()
        }
      }, 100)
    } // close else

  }

  // winner modal
  $ionicModal.fromTemplateUrl('templates/pingPongWinnerWatcherModal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.winnerModal = modal;
  });

  // close winner modal
  $scope.closeWinnerWatcherModal = function(){
    $scope.winnerModal.hide()
    // http://stackoverflow.com/questions/36295476/ionicmodal-disabling-click-events
    $ionicBody.removeClass('modal-open');
    $ionicBody.removeClass('popup-open');
  }

  $scope.endGameWatcher = function() {
    $scope.closeWinnerWatcherModal()

    $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.about')
  }
})
