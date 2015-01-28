// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angular-websql', 'database', 'ePCR.config', 'ngRoute'])

.run(function($ionicPlatform, database) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    //Creation of the database
    database.create();
  });
})

.config(function($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

  $ionicConfigProvider.views.maxCache(0);
  
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.reports', {
      url: '/reports',
      views: {
        'tab-reports': {
          templateUrl: 'templates/tab-reports.html',
          controller: 'ReportsCtrl',
          resolve: {
            reports: function(Reports) {
              return Reports.all();
            }
          }
        }
      }
    })
    .state('tab.report-detail', {
      url: '/report/:reportId',
      views: {
        'tab-reports': {
          templateUrl: 'templates/report-detail.html',
          controller: 'ReportDetailCtrl',
          resolve: {
              report: function($stateParams, Reports) {
                return Reports.get($stateParams.reportId)
              },
              vitals: function($stateParams, Vitals) {
                return Vitals.all($stateParams.reportId)
              }
          }
        }
      }
    })
    .state('tab.personal-info', {
        url: '/report/:reportId/info',
        views: {
          'tab-reports': {
            templateUrl: 'templates/personal-info.html',
            controller: 'PersonalInfoCtrl',
            resolve: {
                report: function($stateParams, Reports) {
                  return Reports.get($stateParams.reportId)
                }
            }
          }
        }
      })
  
      .state('tab.chief-complaint', {
      url: '/report/:reportId/chief-complaint',
      views: {
        'tab-reports': {
          templateUrl: 'templates/chief-complaint.html',
          controller: 'ChiefComplaintCtrl',
          resolve: {
              report: function($stateParams, Reports) {
                return Reports.get($stateParams.reportId)
              }
          }
        }
      }
    })
  
    .state('tab.vitals-list', {
      url: '/report/:reportId/vitals',
      views: {
        'tab-reports': {
          templateUrl: 'templates/vitals-list.html',
          controller: 'VitalsListCtrl',
          resolve: {
              vitalsList: function($stateParams, Vitals) {
                return Vitals.all($stateParams.reportId)
              }
          }
        }
      }
    })
  
    .state('tab.vitals', {
      url: '/report/:reportId/vitals/:vitalsId',
      views: {
        'tab-reports': {
          templateUrl: 'templates/vitals.html',
          controller: 'VitalsCtrl',
          resolve: {
              vitals: function($stateParams, Vitals) {
                return Vitals.get($stateParams.vitalsId)
              }
          }
        }
      }
    })
  
  .state('tab.patient-history', {
    url: '/report/:reportId/patient-history',
    views: {
      'tab-reports': {
        templateUrl: 'templates/patient-history.html',
        controller: 'PatientHistoryCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
 .state('tab.allergies', {
    url: '/report/:reportId/allergies',
    views: {
      'tab-reports': {
        templateUrl: 'templates/allergies.html',
        controller: 'AllergiesCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
.state('tab.home-medications', {
    url: '/report/:reportId/home-medications',
    views: {
      'tab-reports': {
        templateUrl: 'templates/home-medications.html',
        controller: 'HomeMedicationsCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.conditions', {
    url: '/report/:reportId/conditions',
    views: {
      'tab-reports': {
        templateUrl: 'templates/conditions.html',
        controller: 'ConditionsCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.exam', {
    url: '/report/:reportId/exam',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam.html',
        controller: 'ExamCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
    
  .state('tab.about', {
    url: '/about',
    views: {
      'tab-about': {
        templateUrl: 'templates/tab-about.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
