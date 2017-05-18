scoreKeeper.controller('UserGameListCtrl', function($scope, LiveGamesFactory, $stateParams, AuthFactory) {

  var gameId = $stateParams.id
  var hostUid = AuthFactory.getUserId()
  // var hostUid = firebase.auth().currentUser.uid

  $scope.liveGameList

  currentGamesRef.on('child_added', function(snap){

    LiveGamesFactory.getAllHostGames(hostUid)
    .then(function(hostGameList){
      $scope.liveGameList = hostGameList
      console.log("liveGameList", $scope.liveGameList)
      // console.log("liveGameList", $scope.liveGameList.gameId)

      $scope.$apply()
    })
  })
})
