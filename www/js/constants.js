(function(){
	'use-strict';
	angular
	.module('Constants',[])
	
    .constant('filmNames', [
        'the martian',
        'interstellar',
        'star wars episode VII',
        'jupiter ascending',
        'batman v superman',
        'moonwalkers',
        'independence day resurgence',
        'the Space Between Us',
        'star wars'
    ])

    .constant('omdbApi', (function() {

        var namePlaceholder = '[namePlaceholder]';
        return {
            url: 'http://www.omdbapi.com/?t=' + namePlaceholder + '&y=&plot=short&r=json',
            namePlaceholder: namePlaceholder
        };
    })())
})()