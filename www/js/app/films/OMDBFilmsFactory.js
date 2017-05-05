(function() {

    'use-strict';
    angular

     .module('movieExplorer')

    .factory('FilmsService', FilmsService);

    FilmsService.$inject = ['$http', '$q', 'filmNames', 'omdbApi', 'Film'];

    function FilmsService($http, $q, filmNames, omdbApi, Film) {

        var filmsFactory = {};
        filmsFactory.films = [];
        filmsFactory.selectedFilm = null;

        var service = {
            urlFromTitle: urlFromTitle,
            selectedFilmByTitle: selectedFilmByTitle,
            getFilm: getFilm,
            getFilms: getFilms

        };
        return service;


        function urlFromTitle(title) {
            //replace Spaces by +
            var queryString = title.split(' ').join('+');
            //replace placeholder with query        
            var url = omdbApi.url.replace(omdbApi.namePlaceholder, queryString);
            return url;
        }


        function selectedFilmByTitle(title) {

            for (var i = 0; i < filmsFactory.films.length; i++) {
                if (filmsFactory.films[i].title === title) {
                    return filmsFactory.films[i];
                }
            }
            return null;
        }


        function getFilm(title) {

            var deferred = $q.defer();
            if (filmsFactory.films.length > 0) {
                filmsFactory.selectedFilm = selectedFilmByTitle(title);
                //el resolve llama al callback de response (he encontrado el dato y te lo paso)
                deferred.resolve(filmsFactory.selectedFilm);
            } else {

                //$http es un servicio asíncrono, usaremos promesas
                //para recoger los datos de las peticiones

                $http.get(urlFromTitle(title), {}).then(
                    function(response) {
                        filmsFactory.selectedFilm = Film.build(response.data);
                        deferred.resolve(filmsFactory.selectedFilm);
                    },

                    function(error) {
                        filmsFactory.selectedFilm = null;
                        deferred.resolve(null);
                    });
            }
            return deferred.promise;

        }


        function getFilms(){
            var deferred = $q.defer();           
            if (filmsFactory.films.length > 0) {

                deferred.resolve(filmsFactory.films);
            } else {      
                var nDownloads = 0;
                var someErrorOccured = false;
                var resolveIfFinished = function(success) {
                    nDownloads++;
                    if (!success) {
                        someErrorOccured = true;
                    }

                    if (nDownloads === filmNames.length) {
                        if (!someErrorOccured) {
                            console.log("ha ocurrido un error");
                            deferred.resolve(filmsFactory.films);
                        } else {
                            console.log("ha ido todo bien");
                            deferred.reject();
                        }
                    }
                };


                for (var i = 0; i < filmNames.length; i++) {

                    $http.get(urlFromTitle(filmNames[i]), {}).then(
                        function(response) {
                            filmsFactory.films.push(Film.build(response.data));
                            resolveIfFinished(true);

                        },
                        function(error) {
                            resolveIfFinished(false);
                        }

                    );

                }
            }
            return deferred.promise;
        }      
    }

})();
