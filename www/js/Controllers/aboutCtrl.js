scoreKeeper.controller('AboutPageCtrl', function($scope, $state, $ionicHistory, $ionicNavBarDelegate) {

  $scope.$on('$ionicView.enter', function(e) {
    $ionicNavBarDelegate.showBar(true);
  });

  $scope.goToCreateGamesPage = function () {
    console.log("func fired")

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $state.go('app.createGame')
  }

  $scope.goToLiveGamesPage = function () {
    console.log("func fired")

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $state.go('app.liveGames')
  }
})
