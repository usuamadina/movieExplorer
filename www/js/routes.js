(function() {
    'use-strict';
    angular
    .module('movieExplorer')

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

        /* .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'js/app/menu/menu.html',
        })*/

        .state('app', {
            url: '/app',
            templateUrl: 'js/app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })

        .state('app.menu', {
            url: '/menu',
            abstract: true,
            templateUrl: 'js/app/menu/menu.html',
        })

        .state('app.about', {
            url: '/about',
            views: {
                'content': {
                    templateUrl: 'js/app/main/about.html'
                }
            }
        })


        .state('app.films', {
            url: '/films',
            views: {
                'content': {
                    templateUrl: 'js/app/films/films.html',
                    controller: 'FilmsController',
                    controllerAs: 'vm',
                    resolve: {
                        films: function(FilmsService) {
                            return FilmsService.getFilms();
                        }
                    }

                }
            }
        })


        .state('app.films-detail', {
            url: '/films/detail/:filmTitle',
            views: {
                'content': {
                    templateUrl: 'js/app/filmsDetails/films-detail.html',
                    controller: 'FilmsDetailsController',
                    controllerAs: 'vm',
                    resolve: {
                        film: function(FilmsService, $stateParams) {
                        	console.log("getFilm desde routes");
                            return FilmsService.getFilm($stateParams.filmTitle);
                        }
                    }
                }
            }
        })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/about');
    });

})();
