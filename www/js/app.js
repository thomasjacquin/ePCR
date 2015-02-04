// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'customDirectives', 'angular-websql', 'database', 'ePCR.config', 'ngRoute', 'angles'])

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
              vitals: function($stateParams, Records) {
                return Records.all('vitals', $stateParams.reportId)
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
          templateUrl: 'templates/vitals/vitals-list.html',
          controller: 'ListCtrl',
          resolve: {
            list: function($stateParams, Records) {
              return Records.all('vitals', $stateParams.reportId)
            },
            tableName: function() {
              return 'vitals'
            },
            redirection: function($stateParams) {
              return '#/tab/report/' + $stateParams.reportId + '/vitals/'
            }
          }
        }
      }
    })
  
    .state('tab.vitals-charts', {
      url: '/report/:reportId/vitals/charts',
      views: {
        'tab-reports': {
          templateUrl: 'templates/vitals/vitals-chart.html',
          controller: 'VitalsChartCtrl',
          resolve: {
              vitals: function($stateParams, Records) {
                return Records.all('vitals', $stateParams.reportId)
              }
          }
        }
      }
    })
  
    .state('tab.vitals', {
      url: '/report/:reportId/vitals/:vitalsId',
      views: {
        'tab-reports': {
          templateUrl: 'templates/vitals/vitals.html',
          controller: 'VitalsCtrl',
          resolve: {
              vitals: function($stateParams, Records) {
                return Records.get('vitals', $stateParams.vitalsId)
              }
          }
        }
      }
    })
  
  .state('tab.patient-history', {
    url: '/report/:reportId/patient-history',
    views: {
      'tab-reports': {
        templateUrl: 'templates/patient_hx/patient-history.html',
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
        templateUrl: 'templates/patient_hx/allergies.html',
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
        templateUrl: 'templates/patient_hx/home-medications.html',
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
        templateUrl: 'templates/patient_hx/conditions.html',
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
        templateUrl: 'templates/exam/exam.html',
        controller: 'ExamCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            },
            neuroList: function($stateParams, Records) {
              return Records.all('neuro', $stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.neuro-list', {
    url: '/report/:reportId/exam/neuro',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/neuro-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('neuro', $stateParams.reportId)
          },
          tableName: function() {
            return 'neuro'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/exam/neuro/'
          }
        }
      }
    }
  })
  
.state('tab.neuro', {
    url: '/report/:reportId/exam/neuro/:neuroId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/neuro.html',
        controller: 'NeuroCtrl',
        resolve: {
            neuro: function($stateParams, Records) {
              return Records.get('neuro', $stateParams.neuroId)
            }
        }
      }
    }
  })
  
.state('tab.abc', {
    url: '/report/:reportId/exam/abc',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/abc.html',
        controller: 'AbcCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.trauma', {
    url: '/report/:reportId/exam/trauma',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/trauma.html',
        controller: 'TraumaCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.auto', {
    url: '/report/:reportId/exam/trauma/auto',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/auto.html',
        controller: 'TraumaAutoCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.penetrating', {
    url: '/report/:reportId/exam/trauma/penetrating',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/penetrating.html',
        controller: 'TraumaPenetratingCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.blunt', {
    url: '/report/:reportId/exam/trauma/blunt',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/blunt.html',
        controller: 'TraumaBluntCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.fall', {
    url: '/report/:reportId/exam/trauma/fall',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/fall.html',
        controller: 'TraumaFallCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.burn', {
    url: '/report/:reportId/exam/trauma/burn',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/burn.html',
        controller: 'TraumaBurnCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
 .state('tab.gu', {
    url: '/report/:reportId/exam/gu',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/gu.html',
        controller: 'GuCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.gi', {
    url: '/report/:reportId/exam/gi',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/gi.html',
        controller: 'GiCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.gyn', {
    url: '/report/:reportId/exam/gyn',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/gyn.html',
        controller: 'GynCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.field-delivery', {
    url: '/report/:reportId/exam/gyn/field-delivery',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/field-delivery.html',
        controller: 'FieldDeliveryCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.muscular', {
    url: '/report/:reportId/exam/muscular',
    views: {
      'tab-reports': {
        templateUrl: 'templates/exam/muscular.html',
        controller: 'MuscularCtrl',
        resolve: {
            report: function($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
            }
        }
      }
    }
  })
  
  .state('tab.procedures', {
    url: '/report/:reportId/procedure',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/procedures.html',
        controller: 'ProceduresCtrl',
        resolve: {
          report: function($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          },
          ivIoist: function($stateParams, Records) {
            return Records.all('iv_io', $stateParams.reportId)
          },
          splintingList: function($stateParams, Records) {
            return Records.all('splinting', $stateParams.reportId)
          },
          medicationList: function($stateParams, Records) {
            return Records.all('medication', $stateParams.reportId)
          },
          inOutList: function($stateParams, Records) {
            return Records.all('in_out', $stateParams.reportId)
          },
          ecgList: function($stateParams, Records) {
            return Records.all('ecg', $stateParams.reportId)
          },
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
