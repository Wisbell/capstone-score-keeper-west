scoreKeeper
.controller('ScoreKeeperAppCtrl', function($scope, $ionicModal, $timeout, AuthFactory, $location, $state, $ionicHistory) {

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

    AuthFactory.signOut()

    $location.url('/auth/login')
  }

})
