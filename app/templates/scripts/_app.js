'use strict';
// Here we set up an angular module. We'll attach controllers and
// other components to this module.
var <%= site_name %>Module =  angular.module('<%= site_name %>App', ['ui.bootstrap', 'ngTouch'])
  // Config
  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        // templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


<%= site_name %>Module.controller('MainCtrl', function ($scope) {
  console.log("<%= site_name %>Module is ready");
});
