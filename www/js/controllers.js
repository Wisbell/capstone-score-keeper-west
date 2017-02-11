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
  // CreateGameFactory.getGameNameList()
  //   .then((nameList) => {
  //     $scope.gameNameList = nameList
  //     $scope.selectedGame = $scope.gameNameList[0]
  //   })

  // // Object to store info from create game partial
  // $scope.gameInfo = {
  //     gameName: '',

  //     team1: '',
  //     team2: ''
  //   }


  // $scope.submitGameButton = () => {
  //   console.log("submit button clicked")

  //   // gameInfo.gameName = $scope.gameName

  //   // console.log($scope.createForm.gameName)
  //   console.log($scope.gameInfo.gameName)
  // }
})


// Ping Pong Create Game Controller
.controller('CreatePingPongCtrl', function($scope, CreateGameFactory, $location) {

  // this object allows the ability to set gameChocie scope variable
  $scope.settings = {}

  // this sets the default choices
  $scope.settings.playerChoice = "2"
  $scope.settings.gameChoice = "Long"
  $scope.winningScore = "21";
  $scope.switchServer = "5"

  // ng-change function for when gameChoice changes
  $scope.updateSettings = () => {
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
  $scope.createGameButton = () => {
    console.log("createGameButton clicked")

    let gameKey

    let gameInfo = {
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
      "gameHostUid": "uid123"
    }

    console.log("gameInfo object", gameInfo)

    // Don't use JSON.stringify
    CreateGameFactory.createNewGame(gameInfo)
      .then((snap)=>{
        // console.log("snap", snap)
        // console.log("snap key", snap.key)
        // // console.log("key11", snap.key)
        // // how i get the crazy key

        gameKey = snap.key
        console.log("gameKey", gameKey)
      })
      .then(()=>{
        // console.log("gameKey - 2", gameKey)
        $location.url(`/app/myGames/pingPong/${gameKey}`)
        $scope.$apply()
      })
  }
})

// Live Games List Controller
.controller('LiveGamesCtrl', function($scope, LiveGamesFactory) {

  console.log("lives games ctrl loaded")

  currentGamesRef.on('child_added', ()=>{
    console.log("child_added")
    LiveGamesFactory.getCurrentGameList()
    .then((gameList) => {
      $scope.currentGames = gameList
      // $scope.selectedGame = $scope.gameNameList[0]
      $scope.$apply()
    })
  })

  currentGamesRef.on('child_removed', ()=>{
    console.log("child_removed")
    LiveGamesFactory.getCurrentGameList()
    .then((gameList) => {
      $scope.currentGames = gameList
      // $scope.selectedGame = $scope.gameNameList[0]
      $scope.$apply()
    })
  })
})

// PingPong Game Controller - Watching a game
.controller('PingPongGameCtrl', function($scope, LiveGamesFactory, $stateParams) {

  // store stateParam to make get request
  let gameId = $stateParams.id

  // $scope.test = "test"
  // scope variable to store game object
  // $scope.currentGame

  // get the particular games information from firebase and store it
  LiveGamesFactory.getParticularGame(gameId)
    .then((game)=>{
      $scope.currentGame = game;
      console.log("scope game", $scope.currentGame)
    })

  // change game scores or current server when changed
  rootDatabase.ref(`currentGames/${gameId}`).on('child_changed', ()=>{
    LiveGamesFactory.getParticularGame(gameId)
    .then((game)=>{
      $scope.currentGame = game;
      console.log("changed game", $scope.currentGame)
      $scope.$apply()
    })
  })
})


// PingPong Game Controller - Hosting a game
.controller('HostPingPongGame', function($scope, LiveGamesFactory, $stateParams) {

  // store stateParam to make get request
  let gameId = $stateParams.id

  // $scope.test = "test"
  // scope variable to store game object
  // $scope.currentGame

  // get the particular games information from firebase and store it
  LiveGamesFactory.getParticularGame(gameId)
    .then((game)=>{
      $scope.currentGame = game;
      console.log("scope game", $scope.currentGame)
    })

  // change game scores or current server when changed
  rootDatabase.ref(`currentGames/${gameId}`).on('child_changed', ()=>{
    LiveGamesFactory.getParticularGame(gameId)
    .then((game)=>{
      $scope.currentGame = game;
      console.log("changed game", $scope.currentGame)
      $scope.$apply()
    })
  })

  console.log("did this load")

  $scope.incrementScoreTeamOne = function(){
    console.log("increment team one score function called")

    $scope.teamOneScore

    rootDatabase.ref(`currentGames/${gameId}/team1Points`).once('value')
      .then((snap)=> {
        // console.log('test')
        console.log('snap', snap.val())
        $scope.teamOneScore = snap.val()
        $scope.teamOneScore = $scope.teamOneScore + 1
        console.log($scope.teamOneScore)

        rootDatabase.ref(`currentGames/${gameId}/`).update({"team1Points": $scope.teamOneScore})
        // return snap.val()
      })
  }

  $scope.decrementScoreTeamOne = function(){
    console.log("decrement team one score function called")

    $scope.teamOneScore

    rootDatabase.ref(`currentGames/${gameId}/team1Points`).once('value')
      .then((snap)=> {
        // console.log('test')
        console.log('snap', snap.val())
        $scope.teamOneScore = snap.val()
        $scope.teamOneScore = $scope.teamOneScore - 1
        console.log($scope.teamOneScore)

        rootDatabase.ref(`currentGames/${gameId}/`).update({"team1Points": $scope.teamOneScore})
        // return snap.val()
      })
  }

  $scope.incrementScoreTeamTwo = function(){
    console.log("increment team two score function called")

    $scope.teamTwoScore
    console.log('teamTwoScore initally', $scope.teamTwoScore)

    rootDatabase.ref(`currentGames/${gameId}/team2Points`).once('value')
      .then((snap)=> {
        // console.log('test')
        console.log('snap', snap.val())
        $scope.teamTwoScore = snap.val()
        $scope.teamTwoScore = $scope.teamTwoScore + 1
        console.log("updated team two score", $scope.teamTwoScore)

        rootDatabase.ref(`currentGames/${gameId}/`).update({"team2Points": $scope.teamTwoScore})
        // return snap.val()
      })
  }

  $scope.decrementScoreTeamTwo = function(){
    console.log("decrement team two score function called")

    $scope.teamTwoScore
    console.log('teamTwoScore initally', $scope.teamTwoScore)

    rootDatabase.ref(`currentGames/${gameId}/team2Points`).once('value')
      .then((snap)=> {
        // console.log('test')
        console.log('snap', snap.val())
        $scope.teamTwoScore = snap.val()
        $scope.teamTwoScore = $scope.teamTwoScore - 1
        console.log("updated team two score", $scope.teamTwoScore)

        rootDatabase.ref(`currentGames/${gameId}/`).update({"team2Points": $scope.teamTwoScore})
        // return snap.val()
      })
  }

})

// IN TESTING  ----------------------------------
// List a users hosted games partial controll
.controller('UserHostedGameListCtrl', function($scope, LiveGamesFactory, $stateParams) {

  let gameId = $stateParams.id

  // get the particular games information from firebase and store it
  LiveGamesFactory.getParticularGame(gameId)
    .then((game)=>{
      $scope.currentGame = game;
      console.log("scope game", $scope.currentGame)
    })


    // make increment and decrement score functions
    // with real time changes


});
