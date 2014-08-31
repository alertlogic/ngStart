/**
 * Creates the application root for an angular application at uri (/)
 *
 * @module app
 * 
 * @requires config/config
 * @requires gettext
 * @requires ngRoute
 * @requires ngResource
 * @requires common/common
 *
 * @param angular RequireJS inclusion of AngularJS library
 * @param config RequireJS inclusion of config/config
 *
 * @author Barry Skidmore <bskidmore@alertlogic.com>
 *
 * @returns instance of the app
 *
 * @copyright Alert Logic, Inc 2014
 */

define(['angular',
        'config/config',
        'gettext',
        'ngRoute',
        'ngResource' ], 
        function(angular, config, gettext ) {
	"use strict";

    /** @constructs app */

    var angularModules = config.standardAngularModules;

    var app = angular.module("app", angularModules );

    //  Configure $locationProvider and $routeProvider to allow top-level navigation within this route
	app.config(['$locationProvider', function($locationProvider) {
                        
        $locationProvider.html5Mode(false);
        
	}]);

	return app;
});

