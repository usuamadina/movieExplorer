(function() {
    'use strict';

    angular

    .module('FilmsModule')

    .controller('FilmsDetailsController', FilmsDetailsController);

    FilmsDetailsController.$inject=['$scope','film'];  
    function FilmsDetailsController($scope, film) {
        var vm = this;
        vm.film = null;        

        function initView() {
            vm.film = film;         
        };

        $scope.$on('$ionicView.loaded', function() {
            initView();
        });
    };
})();
