(function() {
    'use-strict';
    angular
    .module('movieExplorer')


    .factory('fireBaseData', function($firebase) {
       var refUser = new Firebase("https://movieexplorer-2b16e.firebaseio.com/users");


        return {

            refUser: function() {
                return refUser;

            }
        }
    })


    .factory('sharedUtils', sharedUtils);

    sharedUtils.$inject = ['$ionicLoading', '$ionicPopup'];

    function sharedUtils($ionicLoading, $ionicPopup) {


        var functionObj = {};

        functionObj.showLoading = function() {
            $ionicLoading.show({
                content: '<i class=" ion-loading-c"/></i> ', // The text to display in the loading indicator
                animation: 'fade-in', // The animation to use
                showBackdrop: true, // Will a dark overlay or backdrop cover the entire view
                maxWidth: 200, // The maximum width of the loading indicator. Text will be wrapped if longer than maxWidth
                showDelay: 0 // The delay in showing the indicator
            });
        };
        functionObj.hideLoading = function() {
            $ionicLoading.hide();
        };


        functionObj.showAlert = function(title, message) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: message
            });
        };

        return functionObj;

    }

})()