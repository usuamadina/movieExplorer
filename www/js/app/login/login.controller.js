(function() {
    'use-strict';
    angular

        .module('movieExplorer')

    .controller('LoginController', function($scope, $rootScope, $ionicHistory, sharedUtils, $state, $ionicSideMenuDelegate) {        
        $rootScope.extras = false;
        var vm = this;
        vm.user_photo = "";
        vm.user_name = "";
        vm.user_email = "";

                  // For hiding the side bar and nav icon
        // When the user logs out and reaches login page,
        // we clear all the history and cache to prevent back link
        $scope.$on('$ionicView.enter', function(ev) {
            if (ev.targetScope !== $scope) {
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
            }
        });


        //Check if user already logged in
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {

                //Removes back link to login page
                $ionicHistory.nextViewOptions({
                    historyRoot: true
                });
                // $ionicSideMenuDelegate.canDragContent(true); // Sets up the sideMenu dragable
                $rootScope.extras = true;
                sharedUtils.hideLoading();
                $state.go('app.about');

            }
        });



        $scope.loginGmail = function() {

            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log("img user = " + user.photoURL);
                vm.user_photo = result.user.photoURL;
                vm.user_name = result.user.displayName;
                vm.user_email = result.user.email;
                $state.go('app.about');

                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
        }



        $scope.loginFb = function() {
            var provider = new firebase.auth.FacebookAuthProvider();
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                vm.user_photo = result.user.photoURL;
                vm.user_name = result.user.displayName;
                vm.user_email = result.user.email;
                // ...
            }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

        };

        $scope.singOut = function() {
            firebase.auth().signOut().then(function() {
                sharedUtils.hideLoading();
                $state.go('/login');

                // Sign-out successful.
            }, function(error) {
                // An error happened.
            });
        };

      /*  var user_info = firebase.auth().currentUser;
        var name, email, photoUrl, uid;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            uid = user.uid; // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
        }*/





        $scope.getUserImage = function() {
            var user = firebase.auth().currentUser;
            if (user != null){
                return user.photoUrl;
            }
            return null;        }

    })

})()
