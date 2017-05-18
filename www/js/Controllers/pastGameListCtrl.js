scoreKeeper.controller('PastGamesListCtrl', function($scope, PastGamesFactory) {

  console.log("past games ctrl loaded")

  rootDatabase.ref('pastGames').on('child_added', function(){
    console.log("child_added")
    PastGamesFactory.getPastGameList()
    .then(function(gameList) {
      $scope.pastGames = gameList

      $scope.$apply()
    })
  })

  rootDatabase.ref('pastGames').on('child_removed', function(){
    console.log("child_removed")
    PastGamesFactory.getPastGameList()
    .then(function(gameList) {
      $scope.pastGames = gameList
      $scope.$apply()
    })
  })
})
