angular.module('starter.controllers', [])

.controller('ScoreKeeperAppCtrl', function($scope, $ionicModal, $timeout, AuthFactory, $location, $state, $ionicHistory) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
  $scope.registerData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.loginModal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.loginModal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)
    AuthFactory.login($scope.loginData.username, $scope.loginData.password)

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 500);
  };

  // -------------------- //
  // Register Modal below //
  // -------------------- //

  $ionicModal.fromTemplateUrl('templates/register.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.registerModal = modal;
  });

  // Triggered in the register modal to close it
  $scope.closeRegister = function() {
    $scope.registerModal.hide();
  };

  // Open the register modal
  $scope.register = function() {
    $scope.registerModal.show();
    $scope.loginModal.hide();
  };

  // Perform the register action when the user submits the register form
  $scope.doRegister = function() {
    console.log('Doing register', $scope.registerData);

    // firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password)

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeRegister();
    }, 1000);
  };

  // sign out function
  $scope.signOut = function() {
    console.log("sign out function called")
    // firebase.auth().signOut()

    AuthFactory.signOut()

    // $ionicHistory.nextViewOptions({
    //   disableBack: true
    // });

    // $state.go(`app.about`)
    // $location.url('/app/about')

    // $state.go(`auth.login`)
    $location.url('/auth/login')
  }

  // store uid
  // const uid = firebase.auth().currentUser.uid;
  // console.log("uid", uid)


})


// login controller to test authentication
.controller('LoginCtrl', function($scope, AuthFactory, $location) {

  $scope.loginData = {};
  $scope.registerData = {};

  $scope.doLogin = function(loginData){
    console.log("doLogin function called")
    AuthFactory.login($scope.loginData.username, $scope.loginData.password)
      .then(function(){
        $location.url('/app/about')
      })
  }

  $scope.goToRegisterPage = function ()  {
    $location.url('/auth/register')
  }

  $scope.doRegister = function(registerData){
    console.log("doLogin function called")
    console.log("register data", $scope.registerData)
    AuthFactory.register($scope.registerData.username, $scope.registerData.password)
      .then(function(){
        $location.url('/app/about')
      })
  }

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


// About Page Controller
.controller('AboutPageCtrl', function($scope, $state, $ionicHistory, $ionicNavBarDelegate) {

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

// Live Games List Controller
.controller('LiveGamesCtrl', function($scope, LiveGamesFactory) {

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
      // $scope.selectedGame = $scope.gameNameList[0]
      $scope.$apply()
    })
  })
})

// PingPong Game Controller - Watching a single game
.controller('PingPongGameCtrl', function($scope, $state, $ionicHistory, LiveGamesFactory, $stateParams, $ionicModal, $ionicBody, $timeout) {

  // store stateParam to make get request
  var gameId = $stateParams.id

  // $scope.test = "test"
  // scope variable to store game object
  // $scope.currentGame

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
          // console.log("game over false")
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
    // console.log("modal closed 2")
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


// PingPong Game Controller - Hosting a game
.controller('HostPingPongGame', function($scope, $state, $ionicHistory, LiveGamesFactory, $stateParams, $ionicModal, $interval, $ionicBody, $location) {

  // store stateParam to make get request
  var gameId = $stateParams.id
  // $scope.winningScore

  // $scope.test = "test"
  // scope variable to store game object
  // $scope.currentGame

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
      // console.log("team 1 points", $scope.currentGame.team1Points)
      // console.log("team 2 points", $scope.currentGame.team2Points)

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
        // return snap.val()
      })
      // .then(()=>{$scope.checkWinner()})
  }

  $scope.decrementScoreTeamOne = function(){
    console.log("decrement team one score function called")

    $scope.teamOneScore

    rootDatabase.ref('currentGames/' + gameId + '/team1Points').once('value')
      .then(function(snap) {
        // console.log('test')
        console.log('snap', snap.val())

        if(snap.val() >= 1){
          $scope.teamOneScore = snap.val()
          $scope.teamOneScore = $scope.teamOneScore - 1
          console.log($scope.teamOneScore)

          rootDatabase.ref('currentGames/' + gameId + '/').update({"team1Points": $scope.teamOneScore})
          // return snap.val()
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
        // console.log('test')
        console.log('snap', snap.val())
        $scope.teamTwoScore = snap.val()
        $scope.teamTwoScore = $scope.teamTwoScore + 1
        console.log("updated team two score", $scope.teamTwoScore)

        rootDatabase.ref('currentGames/' + gameId + '/').update({"team2Points": $scope.teamTwoScore})
        // return snap.val()
      })
      // .then(()=>{$scope.checkWinner()})
  }

  $scope.decrementScoreTeamTwo = function(){
    console.log("decrement team two score function called")

    $scope.teamTwoScore
    console.log('teamTwoScore initally', $scope.teamTwoScore)

    rootDatabase.ref('currentGames/' + gameId + '/team2Points').once('value')
      .then(function(snap) {
        // console.log('test')
        console.log('snap', snap.val())

        if(snap.val() >= 1){
          $scope.teamTwoScore = snap.val()
          $scope.teamTwoScore = $scope.teamTwoScore - 1
          console.log("updated team two score", $scope.teamTwoScore)

          rootDatabase.ref('currentGames/' + gameId + '/').update({"team2Points": $scope.teamTwoScore})
          // return snap.val()
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
        //then go here
        // $location.url(`/app/about`, true)

        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('app.about')
      })
  }
  // ping pong host - streaming stuff
}) // Close Ping Pong Host Controller



// List a users hosted games partial controller
.controller('UserGameListCtrl', function($scope, LiveGamesFactory, $stateParams, AuthFactory) {

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

    // make increment and decrement score functions
    // with real time changes


})


// past games list controller
.controller('PastGamesListCtrl', function($scope, PastGamesFactory) {

  console.log("lives games ctrl loaded")

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
      // $scope.selectedGame = $scope.gameNameList[0]
      $scope.$apply()
    })
  })


});
