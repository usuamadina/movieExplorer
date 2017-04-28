(function() {
    'use strict';

    angular

    .module('FilmsModule')

    .controller('FilmsController', FilmsController);

    FilmsController.$inject=['$scope','Film','films'];   
    function FilmsController($scope, Film, films) {           
        var vm = this;
        vm.films = null;

        function initView() {       
            vm.films = films;           
        };
           $scope.$on('$ionicView.loaded', function() {
               initView();
           });
       };
})();
