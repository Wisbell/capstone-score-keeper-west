scoreKeeper.controller('LiveGamesCtrl', function($scope, LiveGamesFactory) {

  console.log("lives games ctrl loaded")

  currentGamesRef.on('child_added', function(){
    console.log("child_added")
    LiveGamesFactory.getCurrentGameList()
    .then(function(gameList) {
      $scope.currentGames = gameList
      // $scope.selectedGame = $scope.gameNameList[0]
      $scope.$apply()
    })
  })

  currentGamesRef.on('child_removed', function(){
    console.log("child_removed")
    LiveGamesFactory.getCurrentGameList()
    .then(function(gameList) {
      $scope.currentGames = gameList
      $scope.$apply()
    })
  })
})
