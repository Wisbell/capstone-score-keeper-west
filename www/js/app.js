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

// Database Real Time Event Listeners
// currentGamesRef.on('child_added', onCreatedGameAddition)


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

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'ScoreKeeperAppCtrl'
  })

  // My custom states
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'
      }
    }
  })

  .state('app.myGames', {
    url: '/myGames',
    views: {
      'menuContent': {
        templateUrl: 'templates/myGames.html'
      }
    }
  })

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

  // Particular Game Routes Here
  .state('app.pingPongGame', {
    url: '/liveGames/pingPong/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/pingPongGame.html',
        controller: 'PingPongGameCtrl'
      }
    }
  })

  // Other Partial routes Below here

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
        templateUrl: 'templates/pastGames.html'
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
