// Ionic Starter App

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCskxqP_KZuFwl6CtcPCXFlEuqwFNnSdI8",
  authDomain: "west-score-keeper.firebaseapp.com",
  databaseURL: "https://west-score-keeper.firebaseio.com",
  storageBucket: "west-score-keeper.appspot.com",
  messagingSenderId: "436613032037"
};
firebase.initializeApp(config);

// Database References
const rootDatabase = firebase.database()
const gameSettingsRef = firebase.database().ref('gameSettings')
const currentGamesRef = firebase.database().ref('currentGames')

// firebase auth id
// var uid = null;

// firebase.auth().onAuthStateChanged(function(user) {
//   console.log("auth state changed")
//   if (user) {
//     // User is signed in.
//     uid = firebase.auth().currentUser.uid;
//   } else {
//     uid = null;
//   }
// });

const checkForAuth = {
      checkForAuth ($state, $ionicHistory, $location) {
        // http://stackoverflow.com/questions/37370224/firebase-stop-listening-onauthstatechanged
        const authReady = firebase.auth().onAuthStateChanged(user => {
          authReady()
          if (!user) {
            $ionicHistory.nextViewOptions({
              disableBack: true
            });

            // $location.url('/app/myGames/')
            $state.go('app.myGames')
          }
        })
      }
    }


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.factories'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  // $ionicConfigProvider.views.maxCache(0);
  $stateProvider

  // Auth state to fix substate bugs wit autentication
  .state('auth', {
    url: '/auth',
    templateUrl: 'templates/auth.html',
    abstract: true
  })

   .state('auth.login', {
      url: '/login',
      views: {
        'auth': {
          templateUrl: 'templates/login2.html',
          controller: 'LoginCtrl',
          resolve: {
            user (AuthFactory, $location, $state) {
              return AuthFactory.getUser()
                .then(function(user){
                    $location.url('/app/about')
                    // $state.go('app.about')
                })
                .catch(() => $location.url('/auth/login'))
                // .catch(() => $state.go('auth.login'))
            }
          }
        }
      }
    })

   .state('auth.register', {
      url: '/register',
      views: {
        'auth': {
          templateUrl: 'templates/register2.html',
          controller: 'LoginCtrl'
        }
      }
  })


   // main app states
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'ScoreKeeperAppCtrl',
    resolve: {
      user (AuthFactory, $location, $state) {
              return AuthFactory.getUser()
                .then(function(user){
                    $location.url('/app/about')
                    // $state.go('app.about')
                })
                .catch(() => $location.url('/auth/login'))
                // .catch(() => $state.go('auth.login'))
            }
    }
  })

  // --------- My custom states -------------

  // My main route - about page
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html',
        controller: 'AboutPageCtrl'
      }
    }
  })

  // list logged in users hosted games
  .state('app.myGames', {
    url: '/myGames',
    views: {
      'menuContent': {
        templateUrl: 'templates/myGames.html',
        controller: 'UserGameListCtrl',
        resolve: checkForAuth
        // resolve: {
        //   user (AuthFactory, $state, $scope, $location) {
        //     // console.log("does this log")
        //     return AuthFactory.getUser()
        //       .then((user)=>{ console.log(user) })
        //       // .catch(()=>{
        //       // // does this work
        //       // console.log("does this work")

        //       // $location.url('/app/about')

        //       // $state.go('app.about')

        //       // $scope.login()
        //     // })
        //   }
        // }
      }
    }
  })
  // logged in users particular game
  .state('app.myGamesPingPong', {
    url: '/myGames/pingPong/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/pingPongHostGame.html',
        controller: 'HostPingPongGame'
      }
    }
  })
  // show a list of all games able to be created
  .state('app.createGame', {
    url: '/createGame',
    views: {
      'menuContent': {
        templateUrl: 'templates/createGame.html',
        controller: 'CreateGameCtrl'
      }
    }
  })

  // Create Game Routes Below here
  .state('app.createPingPong', {
    url: '/createGame/pingPong',
    views: {
      'menuContent': {
        templateUrl: 'templates/createPingPong.html',
        controller: 'CreatePingPongCtrl'
      }
    }
  })

  // Particular Game Route
  .state('app.pingPongGame', {
    url: '/liveGames/pingPong/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/pingPongGame.html',
        controller: 'PingPongGameCtrl'
      }
    }
  })

  // Live games partial route
  .state('app.liveGames', {
    url: '/liveGames',
    views: {
      'menuContent': {
        templateUrl: 'templates/liveGames.html',
        controller: 'LiveGamesCtrl'
      }
    }
  })

  .state('app.pastGames', {
    url: '/pastGames',
    views: {
      'menuContent': {
        templateUrl: 'templates/pastGames.html',
        controller: 'PastGamesListCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/about');
});


// Notes For Westley - I suffer from KRS, aka "Kant Remember Shit"

// .set()   overwrite

// .update()   just like patch

// .remove()  delete stuffs

//  .push()   like post dummy
