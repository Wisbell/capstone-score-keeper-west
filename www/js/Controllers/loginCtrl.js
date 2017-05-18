// login controller to test authentication
scoreKeeper.controller('LoginCtrl', function($scope, AuthFactory, $location) {

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
