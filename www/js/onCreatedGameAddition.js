// console.log ("onCreatedGameAddition.js loaded")

function onCreatedGameAddition (snap) {
  console.log("new child added")

  console.log("snap", snap.val())

  liveGameDiv = document.querySelector(".liveGameDiv")
  console.log("liveGameDiv", liveGameDiv)

  // LiveGamesFactory.getCurrentGameList()
  //   .then((gameList) => {
  //     $scope.currentGames = gameList
  //     // $scope.selectedGame = $scope.gameNameList[0]
  //   })

  // $scope.$apply(function() {
  //                   //we are now within the angular context, so any updates to the model with be handled correctly
  //                   $scope.cases.push({key: dataSnapshot.key,
  //                                    volunteer_name: dataSnapshot.val().volunteer_name,
  //                                    volunteer_email: dataSnapshot.val().volunteer_email,
  //                                    title: dataSnapshot.val().title,
  //                                    creationdate: '',//(new Date(dataSnapshot.val().creationdate)).toString(),
  //                                    snapshot: dataSnapshot.val().snapshot,
  //                                    message: dataSnapshot.val().message});
  //               });
}
