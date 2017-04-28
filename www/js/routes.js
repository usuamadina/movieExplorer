(function() {
    'use-strict';
    angular
    .module('Routes', [])

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state('app', {
            url: '/app',
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
                        films: function(FilmsFactory) {
                            return FilmsFactory.getFilms();
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
                        film: function(FilmsFactory, $stateParams) {
                        	console.log("getFilm desde routes");
                            return FilmsFactory.getFilm($stateParams.filmTitle);
                        }
                    }
                }
            }
        })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/about');
    });

})();
