(function() {
    'use strict';

    angular

    .module('FilmsModule', ['FilmModel', 'OMDBFilmsFactory'])

})();



/*.config(function($stateProvider){

$stateProvider
  .state('app.films', {
        url: '/films',
          views:{
            'content':{
              templateUrl:'js/app/films/Films/films.html',
              controller: 'FilmsController',
              resolve: {
                films: function(FilmsService){                  
                  return FilmsService.getFilms();
                }
              }
            
          }
      }    
    })

  

    .state('app.films-detail', {
        url: '/films/detail/:filmTitle',
          views:{
            'content':{
              templateUrl:'js/app/films/FilmsDetails/films-detail.html',
              controller: 'FilmsDetailsController',
              resolve: {
                film: function(FilmsService, $stateParams){
                  return FilmsService.getFilm($stateParams.filmTitle);
                }
              }
        }
      }    
  })
});
*/
