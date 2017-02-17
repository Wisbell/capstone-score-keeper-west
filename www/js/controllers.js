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

  $scope.doLogin = (loginData)=>{
    console.log("doLogin function called")
    AuthFactory.login($scope.loginData.username, $scope.loginData.password)
      .then(()=>{
        $location.url('/app/about')
      })
  }

  $scope.goToRegisterPage = () => {
    $location.url('/auth/register')
  }

  $scope.doRegister = (registerData)=>{
    console.log("doLogin function called")
    console.log("register data", $scope.registerData)
    AuthFactory.register($scope.registerData.username, $scope.registerData.password)
      .then(()=>{
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

    $state.go(`app.createGame`)
  }

  $scope.goToLiveGamesPage = function () {
    console.log("func fired")

    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $state.go(`app.liveGames`)
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

    // gameId is null on default because the id isn't created until it is posted to firebase
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
      "gameHostUid": firebase.auth().currentUser.uid,
      "gameId": false,
      "gameOver": false,
      "winningTeam": false
    }

    console.log("gameInfo object", gameInfo)

    // Don't use JSON.stringify
    CreateGameFactory.createNewGame(gameInfo)
      .then((snap)=>{
        // get key of newly created game object
        gameKey = snap.key

        // update game object with parent key as a gameId
        firebase.database().ref(`currentGames/${gameKey}`).update({
          "gameId": gameKey
        })
      })
      .then(()=>{
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

// PingPong Game Controller - Watching a single game
.controller('PingPongGameCtrl', function($scope, $state, $ionicHistory, LiveGamesFactory, $stateParams, $ionicModal, $ionicBody, $timeout) {

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
    .then(()=>{$scope.checkWinnerWatchGame()})
  })

  // winner modal
  $scope.checkWinnerWatchGame = function(){
    console.log("checkWinnerWatchGame function called")

    if($scope.currentGame.gameOver){
      // show modal
      $scope.winnerModal.show()
    } else {
      // This time out is necessary to prevent a bug with the modal
      $timeout(()=>{
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
  let gameId = $stateParams.id
  // $scope.winningScore

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
      // console.log("team 1 points", $scope.currentGame.team1Points)
      // console.log("team 2 points", $scope.currentGame.team2Points)

      $scope.$apply()
    })
    // check for a winner when the game is changed
    .then(()=>{$scope.checkWinner()})
  })

  $scope.incrementScoreTeamOne = function(){
    console.log("increment team one score function called")

    $scope.teamOneScore

    rootDatabase.ref(`currentGames/${gameId}/team1Points`).once('value')
      .then((snap)=> {
        // console.log('test')
        console.log('snap', snap.val())
        $scope.teamOneScore = snap.val()
        $scope.teamOneScore = $scope.teamOneScore + 1
        console.log("team one score increment", $scope.teamOneScore)

        rootDatabase.ref(`currentGames/${gameId}/`).update({"team1Points": $scope.teamOneScore})
        // return snap.val()
      })
      // .then(()=>{$scope.checkWinner()})
  }

  $scope.decrementScoreTeamOne = function(){
    console.log("decrement team one score function called")

    $scope.teamOneScore

    rootDatabase.ref(`currentGames/${gameId}/team1Points`).once('value')
      .then((snap)=> {
        // console.log('test')
        console.log('snap', snap.val())

        if(snap.val() >= 1){
          $scope.teamOneScore = snap.val()
          $scope.teamOneScore = $scope.teamOneScore - 1
          console.log($scope.teamOneScore)

          rootDatabase.ref(`currentGames/${gameId}/`).update({"team1Points": $scope.teamOneScore})
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
      // .then(()=>{$scope.checkWinner()})
  }

  $scope.decrementScoreTeamTwo = function(){
    console.log("decrement team two score function called")

    $scope.teamTwoScore
    console.log('teamTwoScore initally', $scope.teamTwoScore)

    rootDatabase.ref(`currentGames/${gameId}/team2Points`).once('value')
      .then((snap)=> {
        // console.log('test')
        console.log('snap', snap.val())

        if(snap.val() >= 1){
          $scope.teamTwoScore = snap.val()
          $scope.teamTwoScore = $scope.teamTwoScore - 1
          console.log("updated team two score", $scope.teamTwoScore)

          rootDatabase.ref(`currentGames/${gameId}/`).update({"team2Points": $scope.teamTwoScore})
          // return snap.val()
        }
      })
  }

  $scope.checkWinner = function(){
    console.log("checkWinner function called")
    // grab winning score
    let winningScore = $scope.currentGame.winningScore
    // get score of both teams
    let teamOneScore = $scope.currentGame.team1Points// + 1
    console.log("team one score", teamOneScore)
    let teamTwoScore = $scope.currentGame.team2Points// + 1
    console.log("team two score", teamTwoScore)
    // check team 1 score to winning score
    if(teamOneScore == winningScore){
      console.log("team one won")
      // update winningTeam variable on firebase
      rootDatabase.ref(`currentGames/${gameId}/`).update({"winningTeam": $scope.currentGame.team1Name})
      // ask host to end game
        // show modal
      $scope.winnerModal.show()

      // if host ends game change game over value on firebase
      rootDatabase.ref(`currentGames/${gameId}/`).update({"gameOver": true})
    }
    // check team 2 score to winning score
    else if(teamTwoScore == winningScore){
      console.log("team two won")

      rootDatabase.ref(`currentGames/${gameId}/`).update({"winningTeam": $scope.currentGame.team2Name})

      rootDatabase.ref(`currentGames/${gameId}/`).update({"gameOver": true})
      $scope.winnerModal.show()
    } else {
      console.log("no one won")
      // reset gameOver value in firebase
      rootDatabase.ref(`currentGames/${gameId}/`).update({"gameOver": false})

      // reset winning team value in firebase
      rootDatabase.ref(`currentGames/${gameId}/`).update({"winningTeam": ""})
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
    rootDatabase.ref(`currentGames/${gameId}/`).once('value')
      .then((snap)=>{
        console.log("snap shot yo", snap.val())

        // post object to pastGames
        rootDatabase.ref(`pastGames/`).push(snap.val())
      })
      .then(()=>{
        // remove game from currentGames
        rootDatabase.ref(`currentGames/${gameId}/`).remove()
      })
      .then(()=>{
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

  // $scope.startBroadcast = function (){
  //   console.log("startBroadcast function called")

  //   // get user host id
  //   let broadcastId = $stateParams.id
  //   console.log("broadcastId", broadcastId)

  //   // line 148 - create a socket session
  //   connection.session = {
  //                   audio: true,
  //                   video: true,
  //                   oneway: true
  //               };

  //   var socket = connection.getSocket();
  //               socket.emit('check-broadcast-presence', broadcastId, function(isBroadcastExists) {
  //                   if(!isBroadcastExists) {
  //                       // the first person (i.e. real-broadcaster) MUST set his user-id
  //                       connection.userid = broadcastId;
  //                   }
  //                   console.log('check-broadcast-presence', broadcastId, isBroadcastExists);
  //                   socket.emit('join-broadcast', {
  //                       broadcastId: broadcastId,
  //                       userid: connection.userid,
  //                       typeOfStreams: connection.session
  //                   });
  //               });


  // } // close startBroadcast function

            // var enableRecordings = false;
            // var connection = new RTCMultiConnection(null, {
            //     useDefaultDevices: true // if we don't need to force selection of specific devices
            // });
            // // its mandatory in v3
            // connection.enableScalableBroadcast = true;
            // // each relaying-user should serve only 1 users
            // connection.maxRelayLimitPerUser = 1;
            // // we don't need to keep room-opened
            // // scalable-broadcast.js will handle stuff itself.
            // connection.autoCloseEntireSession = true;
            // // by default, socket.io server is assumed to be deployed on your own URL
            // connection.socketURL = '/'; // CHECK THIS LATER
            // // comment-out below line if you do not have your own socket.io server
            // // connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
            // connection.socketMessageEvent = 'scalable-media-broadcast-demo';
            // // document.getElementById('broadcast-id').value = connection.userid;
            // // user need to connect server, so that others can reach him.
            // connection.connectSocket(function(socket) {
            //     // below socket.on('logs not neccessary - west')
            //     // socket.on('logs', function(log) {
            //     //     document.querySelector('h1').innerHTML = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
            //     // });
            //     // this event is emitted when a broadcast is already created.
            //     socket.on('join-broadcaster', function(hintsToJoinBroadcast) {
            //         console.log('join-broadcaster', hintsToJoinBroadcast);
            //         connection.session = hintsToJoinBroadcast.typeOfStreams;
            //         connection.sdpConstraints.mandatory = {
            //             OfferToReceiveVideo: !!connection.session.video,
            //             OfferToReceiveAudio: !!connection.session.audio
            //         };
            //         connection.broadcastId = hintsToJoinBroadcast.broadcastId;
            //         connection.join(hintsToJoinBroadcast.userid);
            //     });
            //     socket.on('rejoin-broadcast', function(broadcastId) {
            //         console.log('rejoin-broadcast', broadcastId);
            //         connection.attachStreams = [];
            //         socket.emit('check-broadcast-presence', broadcastId, function(isBroadcastExists) {
            //             if(!isBroadcastExists) {
            //                 // the first person (i.e. real-broadcaster) MUST set his user-id
            //                 connection.userid = broadcastId;
            //             }
            //             socket.emit('join-broadcast', {
            //                 broadcastId: broadcastId,
            //                 userid: connection.userid,
            //                 typeOfStreams: connection.session
            //             });
            //         });
            //     });
            //     socket.on('broadcast-stopped', function(broadcastId) {
            //         // alert('Broadcast has been stopped.');
            //         // location.reload();
            //         console.error('broadcast-stopped', broadcastId);
            //         alert('This broadcast has been stopped.');
            //     });
            //     // this event is emitted when a broadcast is absent.
            //     socket.on('start-broadcasting', function(typeOfStreams) {
            //         console.log('start-broadcasting', typeOfStreams);
            //         // host i.e. sender should always use this!
            //         connection.sdpConstraints.mandatory = {
            //             OfferToReceiveVideo: false,
            //             OfferToReceiveAudio: false
            //         };
            //         connection.session = typeOfStreams;
            //         // "open" method here will capture media-stream
            //         // we can skip this function always; it is totally optional here.
            //         // we can use "connection.getUserMediaHandler" instead
            //         connection.open(connection.userid, function() {
            //             showRoomURL(connection.sessionid);
            //         });
            //     });
            // });
            // window.onbeforeunload = function() {
            //     // Firefox is ugly.
            //     document.getElementById('open-or-join').disabled = false;
            // };
            // var videoPreview = document.getElementById('video-preview');
            // connection.onstream = function(event) {
            //     if(connection.isInitiator && event.type !== 'local') {
            //         return;
            //     }
            //     if(event.mediaElement) {
            //         event.mediaElement.pause();
            //         delete event.mediaElement;
            //     }
            //     connection.isUpperUserLeft = false;
            //     videoPreview.src = URL.createObjectURL(event.stream);
            //     videoPreview.play();
            //     videoPreview.userid = event.userid;
            //     if(event.type === 'local') {
            //         videoPreview.muted = true;
            //     }
            //     if (connection.isInitiator == false && event.type === 'remote') {
            //         // he is merely relaying the media
            //         connection.dontCaptureUserMedia = true;
            //         connection.attachStreams = [event.stream];
            //         connection.sdpConstraints.mandatory = {
            //             OfferToReceiveAudio: false,
            //             OfferToReceiveVideo: false
            //         };
            //         var socket = connection.getSocket();
            //         socket.emit('can-relay-broadcast');
            //         if(connection.DetectRTC.browser.name === 'Chrome') {
            //             connection.getAllParticipants().forEach(function(p) {
            //                 if(p + '' != event.userid + '') {
            //                     var peer = connection.peers[p].peer;
            //                     peer.getLocalStreams().forEach(function(localStream) {
            //                         peer.removeStream(localStream);
            //                     });
            //                     peer.addStream(event.stream);
            //                     connection.dontAttachStream = true;
            //                     connection.renegotiate(p);
            //                     connection.dontAttachStream = false;
            //                 }
            //             });
            //         }
            //         if(connection.DetectRTC.browser.name === 'Firefox') {
            //             // Firefox is NOT supporting removeStream method
            //             // that's why using alternative hack.
            //             // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
            //             // need to ask all deeper nodes to rejoin
            //             connection.getAllParticipants().forEach(function(p) {
            //                 if(p + '' != event.userid + '') {
            //                     connection.replaceTrack(event.stream, p);
            //                 }
            //             });
            //         }
            //         // Firefox seems UN_ABLE to record remote MediaStream
            //         // WebAudio solution merely records audio
            //         // so recording is skipped for Firefox.
            //         if(connection.DetectRTC.browser.name === 'Chrome') {
            //             repeatedlyRecordStream(event.stream);
            //         }
            //     }
            // };
            // // ask node.js server to look for a broadcast
            // // if broadcast is available, simply join it. i.e. "join-broadcaster" event should be emitted.
            // // if broadcast is absent, simply create it. i.e. "start-broadcasting" event should be fired.

            // // document.getElementById('open-or-join').onclick = function() {
            //   $scope.startBroadcast = function() {
            //     var broadcastId = document.getElementById('broadcast-id').value;
            //     if (broadcastId.replace(/^\s+|\s+$/g, '').length <= 0) {
            //         alert('Please enter broadcast-id');
            //         document.getElementById('broadcast-id').focus();
            //         return;
            //     }
            //     document.getElementById('open-or-join').disabled = true;
            //     connection.session = {
            //         audio: true,
            //         video: true,
            //         oneway: true
            //     };
            //     var socket = connection.getSocket();
            //     socket.emit('check-broadcast-presence', broadcastId, function(isBroadcastExists) {
            //         if(!isBroadcastExists) {
            //             // the first person (i.e. real-broadcaster) MUST set his user-id
            //             connection.userid = broadcastId;
            //         }
            //         console.log('check-broadcast-presence', broadcastId, isBroadcastExists);
            //         socket.emit('join-broadcast', {
            //             broadcastId: broadcastId,
            //             userid: connection.userid,
            //             typeOfStreams: connection.session
            //         });
            //     });
            // };
            // connection.onstreamended = function() {};
            // connection.onleave = function(event) {
            //     if(event.userid !== videoPreview.userid) return;
            //     var socket = connection.getSocket();
            //     socket.emit('can-not-relay-broadcast');
            //     connection.isUpperUserLeft = true;
            //     if(allRecordedBlobs.length) {
            //         // playing lats recorded blob
            //         var lastBlob = allRecordedBlobs[allRecordedBlobs.length - 1];
            //         videoPreview.src = URL.createObjectURL(lastBlob);
            //         videoPreview.play();
            //         allRecordedBlobs = [];
            //     }
            //     else if(connection.currentRecorder) {
            //         var recorder = connection.currentRecorder;
            //         connection.currentRecorder = null;
            //         recorder.stopRecording(function() {
            //             if(!connection.isUpperUserLeft) return;
            //             videoPreview.src = URL.createObjectURL(recorder.blob);
            //             videoPreview.play();
            //         });
            //     }
            //     if(connection.currentRecorder) {
            //         connection.currentRecorder.stopRecording();
            //         connection.currentRecorder = null;
            //     }
            // };
            // var allRecordedBlobs = [];
            // function repeatedlyRecordStream(stream) {
            //     if(!enableRecordings) {
            //         return;
            //     }
            //     connection.currentRecorder = RecordRTC(stream, {
            //         type: 'video'
            //     });
            //     connection.currentRecorder.startRecording();
            //     setTimeout(function() {
            //         if(connection.isUpperUserLeft || !connection.currentRecorder) {
            //             return;
            //         }
            //         connection.currentRecorder.stopRecording(function() {
            //             allRecordedBlobs.push(connection.currentRecorder.blob);
            //             if(connection.isUpperUserLeft) {
            //                 return;
            //             }
            //             connection.currentRecorder = null;
            //             repeatedlyRecordStream(stream);
            //         });
            //     }, 30 * 1000); // 30-seconds
            // };
            // function disableInputButtons() {
            //     document.getElementById('open-or-join').disabled = true;
            //     document.getElementById('broadcast-id').disabled = true;
            // }
            // // ......................................................
            // // ......................Handling broadcast-id................
            // // ......................................................
            // function showRoomURL(broadcastId) {
            //     var roomHashURL = '#' + broadcastId;
            //     var roomQueryStringURL = '?simple=true&broadcastId=' + broadcastId;
            //     var html = '<h2>Unique URL for your room:</h2><br>';
            //     html += 'Hash URL: <a href="' + roomHashURL + '" target="_blank">' + roomHashURL + '</a>';
            //     html += '<br>';
            //     html += 'QueryString URL: <a href="' + roomQueryStringURL + '" target="_blank">' + roomQueryStringURL + '</a>';
            //     var roomURLsDiv = document.getElementById('room-urls');
            //     roomURLsDiv.innerHTML = html;
            //     roomURLsDiv.style.display = 'block';
            // }
            // (function() {
            //     var params = {},
            //         r = /([^&=]+)=?([^&]*)/g;
            //     function d(s) {
            //         return decodeURIComponent(s.replace(/\+/g, ' '));
            //     }
            //     var match, search = window.location.search;
            //     while (match = r.exec(search.substring(1)))
            //         params[d(match[1])] = d(match[2]);
            //     window.params = params;
            // })();
            // var broadcastId = '';
            // if (localStorage.getItem(connection.socketMessageEvent)) {
            //     broadcastId = localStorage.getItem(connection.socketMessageEvent);
            // } else {
            //     broadcastId = connection.token();
            // }
            // // document.getElementById('broadcast-id').value = broadcastId;
            // // document.getElementById('broadcast-id').onkeyup = function() {
            // //     localStorage.setItem(connection.socketMessageEvent, this.value);
            // // };
            // var hashString = location.hash.replace('#', '');
            // if(hashString.length && hashString.indexOf('comment-') == 0) {
            //   hashString = '';
            // }
            // var broadcastId = params.broadcastId;
            // if(!broadcastId && hashString.length) {
            //     broadcastId = hashString;
            // }
            // if(broadcastId && broadcastId.length) {
            //     document.getElementById('broadcast-id').value = broadcastId;
            //     localStorage.setItem(connection.socketMessageEvent, broadcastId);
            //     // auto-join-room
            //     (function reCheckRoomPresence() {
            //         connection.checkPresence(broadcastId, function(isRoomExists) {
            //             if(isRoomExists) {
            //                 document.getElementById('open-or-join').onclick();
            //                 return;
            //             }
            //             setTimeout(reCheckRoomPresence, 5000);
            //         });
            //     })();
            //     disableInputButtons();
            // }
            // // below section detects how many users are viewing your broadcast
            // connection.onNumberOfBroadcastViewersUpdated = function(event) {
            //     if (!connection.isInitiator) return;
            //     document.getElementById('broadcast-viewers-counter').innerHTML = 'Number of broadcast viewers: <b>' + event.numberOfBroadcastViewers + '</b>';
            // };


}) // Close Ping Pong Host Controller



// List a users hosted games partial controller
.controller('UserGameListCtrl', function($scope, LiveGamesFactory, $stateParams, AuthFactory) {

  let gameId = $stateParams.id
  let hostUid = AuthFactory.getUserId()
  // let hostUid = firebase.auth().currentUser.uid

  $scope.liveGameList

  currentGamesRef.on('child_added', (snap)=>{

    LiveGamesFactory.getAllHostGames(hostUid)
    .then((hostGameList)=>{
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

  rootDatabase.ref('pastGames').on('child_added', ()=>{
    console.log("child_added")
    PastGamesFactory.getPastGameList()
    .then((gameList) => {
      $scope.pastGames = gameList

      $scope.$apply()
    })
  })

  rootDatabase.ref('pastGames').on('child_removed', ()=>{
    console.log("child_removed")
    PastGamesFactory.getPastGameList()
    .then((gameList) => {
      $scope.pastGames = gameList
      // $scope.selectedGame = $scope.gameNameList[0]
      $scope.$apply()
    })
  })


});
