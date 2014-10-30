// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    
    $stateProvider
    
    .state('login', {
               url: '/login',
               templateUrl: 'hog/login.html',
               controller: 'loginCtrl'
    })
        
    .state('app',{
      url: "/app",
      abstract: true,
      templateUrl: "hog/menu.html",
      controller: 'AppCtrl'
    })
    .state('app.test', {
               url: "/test",
               views: {
               'menuContent' :{
               templateUrl: "hog/test.html",
               controller: 'testCtrl'
           }
        }
    })
    .state('app.dashboard', {
      url: "/dashboard",
      views: {
        'menuContent' :{
           templateUrl: "hog/dashboard.html",
           controller: 'dashCtrl'
          }
        }
    })
        
//    .state('app.login', {
//        url: "/login",
//        views: {
//        'menuContent' :{
//           templateUrl: "hog/login.html",
//           controller: 'loginCtrl'
//         }
//       }
//    })
    .state('app.farms', {
      url: "/farms",
      views: {
        'menuContent' :{
          templateUrl: "hog/farms.html",
          controller: 'farmsCtrl'
        }
      }
    })
    .state('app.ContainerHome', {
        url: "/ContainerHome/:container_id/:container_name/:site_name/:site_id",
        views: {
        'menuContent' :{
        templateUrl: "hog/ContainerHome.html",
        controller: 'ContainerHomeCtrl'
        }
        }
    })
    .state('app.single', {
      url: "/farms/:farmId",
      views: {
        'menuContent' :{
          templateUrl: "hog/farm.html",
          controller: 'farmCtrl'
        }
      }
    })
    .state('app.inventory', {
           url: "/inventory/:barn_id/:barn_name/:loc_name/:farm_name",
        views: {
            'menuContent' :{
               templateUrl: "hog/inventory.html",
               controller: 'inventoryCtrl'
            }
        }
    })
    .state('app.inventory2', {
        url: "/inventory2/:barn_id/:barn_name/:loc_name/:farm_name",
        views: {
            'menuContent' :{
               templateUrl: "hog/inventory2.html",
               controller: 'inventoryCtrl'
            }
        }
    })
    .state('app.inventory3', {
                      url: "/inventory3/:barn_id/:barn_name/:loc_name/:farm_name",
                      views: {
                      'menuContent' :{
                      templateUrl: "hog/inventory3.html",
                      controller: 'inventoryCtrl'
                      }
                      }
                      })
        .state('app.inventory4', {
               url: "/inventory4/:barn_id/:barn_name/:loc_name/:farm_name",
               views: {
               'menuContent' :{
               templateUrl: "hog/inventory4.html",
               controller: 'inventoryCtrl'
               }
               }
               })
        .state('app.inventory5', {
               url: "/inventory5/:barn_id/:barn_name/:loc_name/:farm_name",
                        views: {
                        'menuContent' :{
                        templateUrl: "hog/inventory5.html",
                        controller: 'inventoryCtrl'
                        }
                        }
                        })
        .state('app.inventory6', {
                                 url: "/inventory6/:barn_id/:barn_name/:loc_name/:farm_name",
                                 views: {
                                 'menuContent' :{
                                 templateUrl: "hog/inventory6.html",
                                 controller: 'inventoryCtrl'
                                 }
                                 }
                                 })
        .state('app.review', {
               url: '/review/:barn_id/:barn_name/:loc_name/:farm_name',
               views: {
               'menuContent' :{
               templateUrl: 'hog/review.html',
               controller: 'reviewCtrl'
               }
               }
               });
    $urlRouterProvider.otherwise('login');
});
