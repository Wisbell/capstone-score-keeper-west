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


// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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

  // .state('app.search', {
  //   url: '/search',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/search.html'
  //     }
  //   }
  // })

  // .state('app.browse', {
  //     url: '/browse',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/browse.html'
  //       }
  //     }
  //   })
  //   .state('app.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
  //         controller: 'PlaylistsCtrl'
  //       }
  //     }
  //   })

  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
  //       controller: 'PlaylistCtrl'
  //     }
  //   }
  // })

  // My custom states
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'
      }
    }
  })

  .state('app.createGame', {
    url: '/createGame',
    views: {
      'menuContent': {
        templateUrl: 'templates/createGame.html'
      }
    }
  })

  .state('app.liveGames', {
    url: '/liveGames',
    views: {
      'menuContent': {
        templateUrl: 'templates/liveGames.html'
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