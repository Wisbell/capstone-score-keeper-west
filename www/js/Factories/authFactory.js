
// Auth Factory
scoreKeeper.factory('AuthFactory', function($q) {
    return {
      login: function (email, pass) {
        // converts native ES6 promise to angular promise so no $scope.$apply needed
        return $q.resolve(firebase.auth().signInWithEmailAndPassword(email, pass))
      },

      signOut: function  () {
        return firebase.auth().signOut()
      },

      getUserId: function  () {
        return firebase.auth().currentUser.uid
      },

      getUser: function  () {
        console.log("get user func fired")
        // Joel and Luke are my heroes.  Both Lukes, all lukes.
        return $q(function(resolve, reject) {
            console.log("please let me see this")
            const unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
              console.log("does this log")
              unsubscribe();
              if (user) {
                console.log("test1")
                resolve(user.uid);
              } else {
                console.log("test2")
                reject("Not logged in");
              }
            }); //end const unsubscribe
          }); //end return getUser
        } //end getUser
      } // close factory return satement
  }) // end Auth Factory
