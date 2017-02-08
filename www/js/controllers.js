angular.module('starter.controllers', [])

.controller('ScoreKeeperAppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})


// Create Game Controller
.controller('CreateGameCtrl', function($scope, CreateGameFactory) {

  // get list of game names to choose from
  CreateGameFactory.getGameNameList()
    .then((nameList) => {
      $scope.gameNameList = nameList
      $scope.selectedGame = $scope.gameNameList[0]
    })

  // Object to store info from create game partial
  $scope.gameInfo = {
      gameName: '',

      team1: '',
      team2: ''
    }


  $scope.submitGameButton = () => {
    console.log("submit button clicked")

    // gameInfo.gameName = $scope.gameName

    // console.log($scope.createForm.gameName)
    console.log($scope.gameInfo.gameName)
  }
})


// Ping Pong Create Game Controller
.controller('CreatePingPongCtrl', function($scope, CreateGameFactory) {

  $scope.settings = {}

  // this sets the default choices
  $scope.playerChoice = "2"
  $scope.settings.gameChoice = "Long"
  $scope.winningScore = "21";
  $scope.switchServer = "5"

  // ng-change function for when gameChoice changes
  $scope.updateSettings = () => {
    console.log("gameChoice changed")

    console.log("gameChoice", $scope.settings.gameChoice)
    console.log("winningScore", $scope.winningScore)
    console.log("switchServer", $scope.switchServer)

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


});
