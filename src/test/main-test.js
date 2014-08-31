(function (window, require) {
	"use strict";
	var allTestFiles, TEST_REGEXP;

	allTestFiles = [];
	TEST_REGEXP = /\.test\.js$/;

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			allTestFiles.push(file);
		}
	});

  allTestFiles.push("app");
  allTestFiles.push("ngAnimate");
  allTestFiles.push("ui.bootstrap");
  allTestFiles.push("LocalStorageModule");
  allTestFiles.push("ui.select");
  allTestFiles.push("angular-mocks");
  allTestFiles.push("ngResource");
  allTestFiles.push("ngRoute");
  allTestFiles.push("ngSanitize");
  allTestFiles.push("angular-ui-utils");
  allTestFiles.push("gettext");
  allTestFiles.push("angulartics");
  allTestFiles.push("angulartics-ga");
  allTestFiles.push("ng-grid");
  

	require({
		// "/base" is the URL from where karma is serving project files
		baseUrl:'/base/src/main',
		paths:{
      'angular': '/base/src/main/vendor/angular/angular',
      'ngAnimate': '/base/src/main/vendor/angular-animate/angular-animate.min',
      'ui.bootstrap': '/base/src/main/vendor/angular-bootstrap/ui-bootstrap.min',
      'ui.select': '/base/src/main/vendor/angular-ui-select/dist/select',
      'LocalStorageModule': '/base/src/main/vendor/angular-local-storage/angular-local-storage.min',
      'gettext': '/base/src/main/vendor/angular-gettext/dist/angular-gettext.min',
      'angular-mocks': '/base/src/main/vendor/angular-mocks/angular-mocks',
      'ngResource': '/base/src/main/vendor/angular-resource/angular-resource.min',
      'ngRoute': '/base/src/main/vendor/angular-route/angular-route.min',
      'ngSanitize': '/base/src/main/vendor/angular-sanitize/angular-sanitize.min',
      'angular-ui-utils': '/base/src/main/vendor/angular-ui-utils/ui-utils.min',
      'ng-grid': '/base/src/main/vendor/ng-grid/build/ng-grid',
      'translations': '/base/src/main/translations',
      'd3': '/base/src/main/vendor/d3/d3.min',
      'nvd3': '/base/src/main/vendor/nvd3/nv.d3.min',
      'angularjs-nvd3-directives': '/base/src/main/vendor/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.min',
      'angulartics': '/base/src/main/vendor/angulartics/dist/angulartics.min',
      'angulartics-ga': '/base/src/main/vendor/angulartics/dist/angulartics-ga.min',
      'jQuery': '/base/src/main/vendor/jquery/dist/jquery.min'
		},
		shim:{
      'angular': { deps: [], exports: 'angular' },
      'ngAnimate': {deps: ['angular']},
      'ui.bootstrap': {deps: ['angular']},
      'LocalStorageModule': {deps: ['angular']},
      'ui.select': {deps: ['angular']},
      'angular-mocks': {deps: ['angular']},
      'ngResource': {deps: ['angular']},
      'ngRoute': {deps: ['angular']},
      'ngSanitize': {deps: ['angular']},
      'angular-ui-utils': {deps: ['angular']},
      'gettext': {deps: ['angular']},
      'angulartics': {deps: ['angular']},
      'angulartics-ga': {deps: ['angular', 'angulartics']}
		}
	}, allTestFiles, function () {
		window.__karma__.start();
	}, function (err) {
		var failedModules = err.requireModules;
		console.log("err", err);

		if (failedModules && failedModules[0]) {
			throw new Error("Module couldn't be loaded: " + failedModules);
		} else {
			throw new Error("Unkown error:" + err);
		}
	});
}(window, require));