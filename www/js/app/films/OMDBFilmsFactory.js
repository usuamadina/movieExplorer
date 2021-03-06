(function() {


    angular

    .module('OMDBFilmsFactory', ['FilmModel', 'Constants'])

    .factory('FilmsFactory', FilmsFactory);

    FilmsFactory.$inject = ['$http', '$q', 'filmNames', 'omdbApi', 'Film'];

    function FilmsFactory($http, $q, filmNames, omdbApi, Film) {

        var filmsFactory = {};
        filmsFactory.films = [];
        filmsFactory.selectedFilm = null;


        var urlFromTitle = function(title) {
            //replace Spaces by +
            var queryString = title.split(' ').join('+');
            //replace placeholder with query        
            var url = omdbApi.url.replace(omdbApi.namePlaceholder, queryString);
            return url;
        }


        var selectedFilmByTitle = function(title) {

            for (var i = 0; i < filmsFactory.films.length; i++) {
                if (filmsFactory.films[i].title === title) {
                    return filmsFactory.films[i];
                    //return films.film;
                }
            }
            return null;
        }


        filmsFactory.getFilm = function(title) {

            var deferred = $q.defer();           
            if (filmsFactory.films.length > 0) {                
                filmsFactory.selectedFilm = selectedFilmByTitle(title);
                //el resolve llama al callback de response (he encontrado el dato y te lo paso)
                deferred.resolve(filmsFactory.selectedFilm);
            } else {
                  console.log("filmsFactory.getFilm");

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


       filmsFactory.getFilms = function() {
            var deferred = $q.defer();
            console.log(filmsFactory.films.length);
            if (filmsFactory.films.length > 0) {

                deferred.resolve(filmsFactory.films);
            } else {
                console.log("entro en getFilms2");
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

        return filmsFactory;
    }

})();


/* FilmFactory.$inject('$http', '$q', 'filmNames', 'omdbApi', 'Film');
     function FilmsFactory($http, $q, filmNames, omdbApi, Film) {

        var filmsFactory = {};
        filmsFactory.films = [];
        filmsFactory.selectedFilm = null;

        var urlFromTitle = function(title) {
            //replace Spaces by +
            var queryString = title.split(' ').join('+');
            //replace placeholder with query        
            var url = omdbApi.url.replace(omdbApi.namePlaceholder, queryString);
            return url;
        }


        var selectedFilmByTitle = function(title) {

            for (var i = 0; i < filmsFactory.films.length; i++) {
                if (filmsFactory.films[i].title === title) {
                    return filmsFactory.films[i];
                    //return films.film;
                }
            };
            return null;
        }


        filmsFactory.getFilm = function(title) {

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


        filmsFactory.getFilms = function() {

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
        };

        return filmsFactory;

    }*/
