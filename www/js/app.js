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
              },
              narrative: function($stateParams, Records) {
                return Records.all('narrative', $stateParams.reportId)
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
    url: '/report/:reportId/procedures',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/procedures.html',
        controller: 'ProceduresCtrl',
        resolve: {
          report: function($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          },
          ivIoList: function($stateParams, Records) {
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
  
  .state('tab.airway', {
    url: '/report/:reportId/procedures/airway',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/airway.html',
        controller: 'AirwayCtrl',
        resolve: {
          report: function($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          },
          basicAirwayList: function($stateParams, Records) {
            return Records.all('airway_basic', $stateParams.reportId)
          },
          ventilatorList: function($stateParams, Records) {
            return Records.all('airway_ventilator', $stateParams.reportId)
          },
          cpapBipapList: function($stateParams, Records) {
            return Records.all('airway_cpap_bipap', $stateParams.reportId)
          },
          suctionList: function($stateParams, Records) {
            return Records.all('airway_suction', $stateParams.reportId)
          }
        }
      }
    }
  })
  
  .state('tab.basic-airway-list', {
    url: '/report/:reportId/procedures/airway/basic',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/basic-airway-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('airway_basic', $stateParams.reportId)
          },
          tableName: function() {
            return 'airway_basic'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/airway/basic/'
          }
        }
      }
    }
  })
  
.state('tab.basic-airway', {
    url: '/report/:reportId/procedures/airway/basic/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/basic-airway.html',
        controller: 'BasicAirwayCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('airway_basic', $stateParams.procedureId)
            }
        }
      }
    }
  })
  
  .state('tab.invasive-airway', {
    url: '/report/:reportId/procedures/airway/invasive',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/invasive-airway.html',
        controller: 'InvasiveAirwayCtrl',
        resolve: {
          report: function($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          }
        }
      }
    }
  })
  
  .state('tab.ventilator-list', {
    url: '/report/:reportId/procedures/airway/ventilator',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/ventilator-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('airway_ventilator', $stateParams.reportId)
          },
          tableName: function() {
            return 'airway_ventilator'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/airway/ventilator/'
          }
        }
      }
    }
  })
  
.state('tab.ventilator', {
    url: '/report/:reportId/procedures/airway/ventilator/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/ventilator.html',
        controller: 'VentilatorCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('airway_ventilator', $stateParams.procedureId)
            }
        }
      }
    }
  })
  
.state('tab.cpap-bipap-list', {
    url: '/report/:reportId/procedures/airway/cpap-bipap',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/cpap-bipap-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('airway_cpap_bipap', $stateParams.reportId)
          },
          tableName: function() {
            return 'airway_cpap_bipap'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/airway/cpap-bipap/'
          }
        }
      }
    }
  })
  
.state('tab.cpap-bipap', {
    url: '/report/:reportId/procedures/airway/cpap-bipap/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/cpap-bipap.html',
        controller: 'CpapBipapCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('airway_cpap_bipap', $stateParams.procedureId)
            }
        }
      }
    }
  })
  
  .state('tab.suction-list', {
    url: '/report/:reportId/procedures/airway/suction',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/suction-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('airway_suction', $stateParams.reportId)
          },
          tableName: function() {
            return 'airway_suction'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/airway/suction/'
          }
        }
      }
    }
  })
  
.state('tab.suction', {
    url: '/report/:reportId/procedures/airway/suction/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/suction.html',
        controller: 'SuctionCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('airway_suction', $stateParams.procedureId)
            }
        }
      }
    }
  })
  
.state('tab.iv-io-list', {
    url: '/report/:reportId/procedures/iv-io',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/iv-io-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('iv_io', $stateParams.reportId)
          },
          tableName: function() {
            return 'iv_io'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/iv-io/'
          }
        }
      }
    }
  })
  
.state('tab.iv-io', {
    url: '/report/:reportId/procedures/iv-io/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/iv-io.html',
        controller: 'IvIoCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('iv_io', $stateParams.procedureId)
            }
        }
      }
    }
  })
  
.state('tab.splinting-list', {
    url: '/report/:reportId/procedures/splinting',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/splinting-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('splinting', $stateParams.reportId)
          },
          tableName: function() {
            return 'splinting'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/splinting/'
          }
        }
      }
    }
  })
  
.state('tab.splinting', {
    url: '/report/:reportId/procedures/splinting/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/splinting.html',
        controller: 'SplintingCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('splinting', $stateParams.procedureId)
            }
        }
      }
    }
  })
  
  .state('tab.medication-list', {
    url: '/report/:reportId/procedures/medication',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/medication-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('medication', $stateParams.reportId)
          },
          tableName: function() {
            return 'medication'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/medication/'
          }
        }
      }
    }
  })
  
.state('tab.medication', {
    url: '/report/:reportId/procedures/medication/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/medication.html',
        controller: 'MedicationCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('medication', $stateParams.procedureId)
            }
        }
      }
    }
  })
  
  .state('tab.spinal', {
    url: '/report/:reportId/procedures/spinal',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/spinal-motion-restriction.html',
        controller: 'SpinalCtrl',
        resolve: {
          report: function($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          }
        }
      }
    }
  })
  
  .state('tab.in-out-list', {
    url: '/report/:reportId/procedures/in-out',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/in-out-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('in_out', $stateParams.reportId)
          },
          tableName: function() {
            return 'in_out'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/in-out/'
          }
        }
      }
    }
  })
  
.state('tab.in-out', {
    url: '/report/:reportId/procedures/in-out/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/in-out.html',
        controller: 'InOutCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('in_out', $stateParams.procedureId)
            }
        }
      }
    }
  })

.state('tab.ecg-list', {
    url: '/report/:reportId/procedures/ecg',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/ecg-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('ecg', $stateParams.reportId)
          },
          tableName: function() {
            return 'ecg'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/procedures/ecg/'
          }
        }
      }
    }
  })
  
.state('tab.ecg', {
    url: '/report/:reportId/procedures/ecg/:procedureId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/procedures/ecg.html',
        controller: 'EcgCtrl',
        resolve: {
            procedure: function($stateParams, Records) {
              return Records.get('ecg', $stateParams.procedureId)
            }
        }
      }
    }
  })
  
  .state('tab.signatures', {
    url: '/report/:reportId/signatures',
    views: {
      'tab-reports': {
        templateUrl: 'templates/signatures.html',
        controller: 'SignaturesCtrl',
        resolve: {
          report: function($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          }
        }
      }
    }
  })
  
  .state('tab.call-info', {
    url: '/report/:reportId/call-info',
    views: {
      'tab-reports': {
        templateUrl: 'templates/call-info.html',
        controller: 'CallInfoCtrl',
        resolve: {
          report: function($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          }
        }
      }
    }
  })
  
  .state('tab.no-transport', {
    url: '/report/:reportId/no-transport',
    views: {
      'tab-reports': {
        templateUrl: 'templates/no-transport.html',
        controller: 'NoTransportCtrl',
        resolve: {
          report: function($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          }
        }
      }
    }
  })
  
  .state('tab.narrative-list', {
    url: '/report/:reportId/narrative',
    views: {
      'tab-reports': {
        templateUrl: 'templates/narrative-list.html',
        controller: 'ListCtrl',
        resolve: {
          list: function($stateParams, Records) {
            return Records.all('narrative', $stateParams.reportId)
          },
          tableName: function() {
            return 'narrative'
          },
          redirection: function($stateParams) {
            return '#/tab/report/' + $stateParams.reportId + '/narrative/'
          }
        }
      }
    }
  })
  
.state('tab.narrative', {
    url: '/report/:reportId/narrative/:narrativeId',
    views: {
      'tab-reports': {
        templateUrl: 'templates/narrative.html',
        controller: 'NarrativeCtrl',
        resolve: {
            narrative: function($stateParams, Records) {
              return Records.get('narrative', $stateParams.narrativeId)
            }
        }
      }
    }
  })
  
.state('tab.code-list', {
    url: '/report/:reportId/code-list',
    views: {
      'tab-reports': {
        templateUrl: 'templates/code-list.html',
        controller: 'CodeListCtrl',
        resolve: {
          codeList: function($stateParams, Records) {
            return Records.all('code', $stateParams.reportId)
          }
        }
      }
    }
  })
  
  .state('tab.code', {
    url: '/report/:reportId/code',
    views: {
      'tab-reports': {
        templateUrl: 'templates/code.html',
        controller: 'CodeCtrl',
        resolve: {
          codeList: function($stateParams, Records) {
            return Records.all('code', $stateParams.reportId)
          },
        }
      }
    }
  })
  
  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsCtrl',
        resolve: {
          settings: function(Records) {
              return Records.get('settings', 1)
            }
        }
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
