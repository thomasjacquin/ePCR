angular.module('ePCR', ['ionic', 'ePCR.controllers', 'ePCR.schema', 'ePCR.constants', 'ePCR.services', 'ePCR.directives', 'ePCR.factories', 'ePCR.database', 'angular-websql', 'ngRoute', 'angles', 'ui.bootstrap.datetimepicker'])

.run(function ($ionicPlatform, database) {
  $ionicPlatform.ready(function () {
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

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.config(function ($stateProvider, $ionicConfigProvider, $urlRouterProvider) {

  $ionicConfigProvider.views.maxCache(0);
  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.tabs.style("striped");
  $ionicConfigProvider.navBar.alignTitle("center");
  $ionicConfigProvider.navBar.positionPrimaryButtons("left");
  $ionicConfigProvider.navBar.positionSecondaryButtons("right");
  $ionicConfigProvider.form.checkbox("circle");

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
        templateUrl: 'templates/dash.html',
        controller: 'DashCtrl',
        resolve: {
            reports: function (Reports) {
              return Reports.all();
            }
          }
      }
    }
  })

  .state('tab.reports', {
      url: '/reports',
      views: {
        'tab-reports': {
          templateUrl: 'templates/reports.html',
          controller: 'ReportsCtrl',
          resolve: {
            reports: function (Reports) {
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
            report: function ($stateParams, Reports) {
              return Reports.get($stateParams.reportId)
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
            report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          list: function ($stateParams, Records) {
            return Records.all('vitals', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.vitals',
              tableName: 'vitals',
              indexName: 'vitalsId'
            }
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
          vitals: function ($stateParams, Records) {
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
          vitals: function ($stateParams, Records) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
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
          list: function ($stateParams, Records) {
            return Records.all('neuro', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.neuro',
              tableName: 'neuro',
              indexName: 'neuroId'
            }
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
          neuro: function ($stateParams, Records) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          }
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
          report: function ($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
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
          list: function ($stateParams, Records) {
            return Records.all('airway_basic', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.basic-airway',
              tableName: 'airway_basic',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          report: function ($stateParams, Reports) {
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
          list: function ($stateParams, Records) {
            return Records.all('airway_ventilator', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.ventilator',
              tableName: 'airway_ventilator',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          list: function ($stateParams, Records) {
            return Records.all('airway_cpap_bipap', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.cpap-bipap',
              tableName: 'airway_cpap_bipap',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          list: function ($stateParams, Records) {
            return Records.all('airway_suction', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.suction',
              tableName: 'airway_suction',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          list: function ($stateParams, Records) {
            return Records.all('iv_io', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.iv-io',
              tableName: 'iv_io',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          list: function ($stateParams, Records) {
            return Records.all('splinting', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.splinting',
              tableName: 'splinting',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          list: function ($stateParams, Records) {
            return Records.all('medication', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.medication',
              tableName: 'medication',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          report: function ($stateParams, Reports) {
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
          list: function ($stateParams, Records) {
            return Records.all('in_out', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.in-out',
              tableName: 'in_out',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          list: function ($stateParams, Records) {
            return Records.all('ecg', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.ecg',
              tableName: 'ecg',
              indexName: 'procedureId'
            }
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
          procedure: function ($stateParams, Records) {
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
          report: function ($stateParams, Reports) {
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
          report: function ($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          },
          settings: function (Records) {
            return Records.get('settings', 1)
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
          report: function ($stateParams, Reports) {
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
          list: function ($stateParams, Records) {
            return Records.all('narrative', $stateParams.reportId)
          },
          urlData: function () {
            return {
              newRecordState: 'tab.narrative',
              tableName: 'narrative',
              indexName: 'narrativeId'
            }
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
          narrative: function ($stateParams, Records) {
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
          codeList: function ($stateParams, Records) {
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
          codeList: function ($stateParams, Records) {
            return Records.all('code', $stateParams.reportId)
          }
        }
      }
    }
  })

  .state('tab.export', {
    url: '/report/:reportId/export',
    views: {
      'tab-reports': {
        templateUrl: 'templates/export-options.html',
        controller: 'ExportCtrl',
        resolve: {
          settings: function (Records) {
            return Records.get('settings', 1);
          }
        }
      }
    }
  })
  
  .state('tab.export-pdf', {
    url: '/report/:reportId/export-pdf',
    views: {
      'tab-reports': {
        templateUrl: 'templates/export-pdf.html',
        controller: 'ExportPdfCtrl',
        resolve: {
          report: function ($stateParams, Reports) {
            return Reports.get($stateParams.reportId)
          },
          settings: function (Records) {
            return Records.get('settings', 1);
          }
        }
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-account': {
        templateUrl: 'templates/settings.html',
        controller: 'SettingsCtrl',
        resolve: {
          settings: function (Records) {
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
        templateUrl: 'templates/about.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
function bodyMap() {

  var svgHeight = 964;
  var availableWidth = (window.innerWidth < 600 ? window.innerWidth : 600) -32;
  var bodyWidth = (availableWidth)/2;
  var bodyHeight = bodyWidth*2.53;
  var front = Raphael('lb_front', bodyWidth, bodyHeight);
  front.setViewBox(0, 0, 1, svgHeight);
  var bodyMap = {}
  bodyMap['lb_front'] = front.set();
  var attr = {
    fill: '#f09959',
    stroke: '#666',
    'stroke-width': '1',
    "stroke-linejoin": "round"
  };
  var right_hand_front = front.path("M 50.21875 450.53125 L 27.21875 450.53125 C 27.216002 450.57417 27.15625 451.59375 27.15625 451.59375 C 24.135 460.39625 20.03125 470.3175 17 476.34375 C 10.60125 489.0475 6.72875 498.3025 5.3125 505.03125 C 3.8975 511.75625 1.05875 537.93875 0 543.25 C 0 543.25 -0.355 547.14125 3.1875 547.5 C 6.72625 547.8525 12.045 545.38375 12.28125 531.21875 C 12.28125 531.21875 14.655 516.58375 15.125 512.5625 C 15.59625 508.5525 29.995 492.5025 32.59375 489.90625 C 35.19 487.30875 40.37375 486.9675 42.5 495.34375 C 44.19 502.01875 45.325 516.13875 50.28125 517.78125 C 50.28125 517.78125 56.66625 520.615 55.25 512.125 C 54.09 505.15625 53.61375 495.46625 53.125 482 C 52.7725 472.28375 52.04875 460.41375 49.21875 455.8125 C 49.21875 455.8125 49.691328 453.17569 50.21875 450.53125 z ").attr(attr).data('id', 'right_hand_front');
  var right_forearm_front = front.path("m 278.59375,368.97156 -40.03125,0 c -0.0561,0.63905 -0.0252,1.43049 -0.125,1.9375 -0.99625,5.08625 -6.9825,13.96625 -9.65625,21.59375 0,0 -8.95,23.24625 -11.78125,46.84375 -2.76549,23.04659 -5.1366,59.75993 -5.25,61.53125 l 23,0 c 0.87024,-4.36333 2.52691,-10.94722 7.15625,-21.96875 7.435,-17.70125 21.355,-33.45125 27.25,-62.6875 2.8725,-14.27 5.4225,-37.815 9.1875,-46.71875 0.0836,-0.19753 0.16672,-0.3363 0.25,-0.53125 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_forearm_front');
  var right_arm_front = front.path("m 295.28125,308.56531 c -0.14722,-7.76034 -0.26141,-15.51381 -0.5,-23.15625 -0.27498,-8.80802 -0.6592,-17.49667 -1.21875,-25.9375 -0.55955,-8.44083 -1.29361,-16.65187 -2.3125,-24.5 -0.50944,-3.92407 -1.09295,-7.76639 -1.75,-11.5 -0.65705,-3.73361 -1.39225,-7.36004 -2.21875,-10.875 -0.41593,-1.76889 -0.94325,-3.41685 -1.40625,-5.125 -11.15292,5.47487 -23.05307,16.65819 -29.46875,44.125 -8.375,35.8725 -5.65625,48.5 -5.65625,48.5 0,0 -14.3875,29.25125 -12.03125,60.90625 0,0 0.1441,4.54762 -0.15625,7.96875 l 40.03125,0 c 7.01251,-16.41552 12.9366,-23.95292 16.4375,-57.8125 0.0893,-0.8638 0.15866,-1.76005 0.25,-2.59375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_arm_front');
  var groin = front.path("m 379.0625,532.78406 c 0.54457,-0.21041 1.10692,-0.37459 1.625,-0.65625 0.94523,-0.5139 1.84685,-1.14499 2.6875,-1.875 0.84065,-0.73001 1.62887,-1.54986 2.34375,-2.46875 0.71488,-0.91889 1.33832,-1.91945 1.90625,-3 0.56793,-1.08055 1.06895,-2.25376 1.46875,-3.46875 0.3998,-1.21499 0.69576,-2.4903 0.90625,-3.8125 0.21049,-1.3222 0.34375,-2.69157 0.34375,-4.09375 0,-1.40218 -0.13326,-2.77155 -0.34375,-4.09375 -0.21049,-1.3222 -0.50645,-2.59751 -0.90625,-3.8125 -0.3998,-1.21499 -0.90082,-2.35695 -1.46875,-3.4375 -0.56793,-1.08055 -1.19137,-2.08111 -1.90625,-3 -0.71488,-0.91889 -1.5031,-1.76999 -2.34375,-2.5 -0.84065,-0.73001 -1.74227,-1.3611 -2.6875,-1.875 -0.94523,-0.5139 -1.94011,-0.91694 -2.96875,-1.1875 -1.02864,-0.27056 -2.09663,-0.40625 -3.1875,-0.40625 -1.09087,0 -2.15886,0.13569 -3.1875,0.40625 -1.02864,0.27056 -2.02352,0.6736 -2.96875,1.1875 -0.94523,0.5139 -1.84685,1.14499 -2.6875,1.875 -0.84065,0.73001 -1.62887,1.58111 -2.34375,2.5 -0.71488,0.91889 -1.33832,1.91945 -1.90625,3 -0.56793,1.08055 -1.06895,2.22251 -1.46875,3.4375 -0.3998,1.21499 -0.69576,2.4903 -0.90625,3.8125 -0.21049,1.3222 -0.34375,2.69157 -0.34375,4.09375 0,1.40218 0.13326,2.77155 0.34375,4.09375 0.21049,1.3222 0.50645,2.59751 0.90625,3.8125 0.3998,1.21499 0.90082,2.3882 1.46875,3.46875 0.56793,1.08055 1.19137,2.08111 1.90625,3 0.71488,0.91889 1.5031,1.73874 2.34375,2.46875 0.84065,0.73001 1.74227,1.3611 2.6875,1.875 0.53866,0.29286 1.12027,0.47177 1.6875,0.6875 4.9e-4,-0.0309 -4.8e-4,-0.0628 0,-0.0937 0,0 2.245,0.345 4.9375,0.3125 2.21099,0.0267 3.45297,-0.16804 4.0625,-0.25 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'groin');
  var right_foot_front = front.path("M 332.0625,939.44031 296.5,945.84656 c -0.36719,3.88919 -0.73888,7.53064 -2.09375,9.125 0,0 -2.94,6.125 -11.4375,14.625 -8.4975,8.4925 -17.46875,19.8125 -17.46875,19.8125 0,0 -2.365,1.78125 -4.84375,2.84375 -2.47625,1.0625 -6.96,3.74626 -5.3125,8.49999 1.24875,3.605 3.90625,3.9063 3.90625,3.9063 0,0 2.83375,4.6 7.4375,3.1875 0,0 2.99375,3.1687 9.1875,1.4062 0,0 1.41625,2.1188 4.78125,2.4688 3.36125,0.3512 5.65625,-1.2188 5.65625,-1.2188 0,0 1.12625,3.875 8.09375,3.875 6.44,0 9.62375,-1.9225 11.21875,-9.1875 0,0 4.95,-0.18 8.84375,-4.7812 3.8975,-4.60258 4.24875,-9.57004 6.375,-13.46879 2.1225,-3.90125 1.43375,-6.01375 7.09375,-12.03125 5.6675,-6.01375 3.17875,-15.2325 2.46875,-26.5625 0,0 1.66297,-2.97672 1.65625,-8.90625 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_foot_front');
  var right_lower_leg_front = front.path("m 295.65625,719.37781 c -0.28216,3.73259 -0.57061,7.50932 -0.4375,11.25 0.31125,8.84 -0.0425,12.3975 -1.8125,21.25 -1.7675,8.8525 -4.43,43.14375 -3.84375,60.75 0,0 9.26125,71.2725 11.09375,93.25 2.1225,25.485 -2.46125,28.00625 -3.53125,34.4375 -0.30442,1.83255 -0.44982,3.6758 -0.625,5.53125 l 35.5625,-6.40625 c -0.004,-3.11865 -0.31861,-6.80982 -1.90625,-11.84375 0,0 -0.47125,-24.09625 4.25,-52.40625 4.72,-28.3325 9.925,-42.9575 11.8125,-63.71875 1.88875,-20.7725 3.94,-41.54125 0.46875,-56.59375 0,0 -1.40375,-6.90875 0.71875,-14.6875 0.98062,-3.59946 2.4257,-8.98281 3.75,-14.96875 -0.6819,0.18681 -1.38459,0.42572 -2.0625,0.59375 -2.43646,0.60391 -4.83268,1.10241 -7.21875,1.46875 -2.38607,0.36634 -4.75643,0.61349 -7.09375,0.75 -2.33732,0.13651 -4.64729,0.14808 -6.9375,0.0625 -2.29021,-0.0856 -4.56776,-0.26259 -6.8125,-0.5625 -2.24474,-0.29991 -4.45533,-0.71225 -6.65625,-1.21875 -2.20092,-0.5065 -4.37251,-1.10716 -6.53125,-1.8125 -2.15874,-0.70534 -4.31929,-1.50981 -6.4375,-2.40625 -1.9392,-0.82068 -3.84346,-1.74412 -5.75,-2.71875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_lower_leg_front');
  var right_upper_leg_front = front.path("m 289.6875,467.78406 c -0.47959,3.39256 -0.86963,6.84956 -1.0625,10.40625 -0.9475,17.38125 -3.53125,50.28125 -3.53125,50.28125 0,0 -0.94375,23.60875 -2.3125,47.40625 -2.6075,45.23625 10.625,103.0625 10.625,103.0625 0,0 4.2375,18.05375 3.53125,25.84375 -0.40999,4.49756 -0.89567,9.49298 -1.28125,14.59375 1.90654,0.97463 3.8108,1.89807 5.75,2.71875 2.11821,0.89644 4.27876,1.70091 6.4375,2.40625 2.15874,0.70534 4.33033,1.306 6.53125,1.8125 2.20092,0.5065 4.41151,0.91884 6.65625,1.21875 2.24474,0.29991 4.52229,0.47692 6.8125,0.5625 2.29021,0.0856 4.60018,0.074 6.9375,-0.0625 2.33732,-0.13651 4.70768,-0.38366 7.09375,-0.75 2.38607,-0.36634 4.78229,-0.86484 7.21875,-1.46875 0.67791,-0.16803 1.3806,-0.40694 2.0625,-0.59375 1.54545,-6.98556 2.93216,-14.89228 3.3125,-23.28125 0.71,-15.58 4.25875,-43.1775 4.96875,-71.5 0,0 9.90312,-51.63083 10.625,-97.625 -0.56723,-0.21573 -1.14884,-0.39464 -1.6875,-0.6875 -0.94523,-0.5139 -1.84685,-1.14499 -2.6875,-1.875 -0.84065,-0.73001 -1.62887,-1.54986 -2.34375,-2.46875 -0.71488,-0.91889 -1.33832,-1.91945 -1.90625,-3 -0.56793,-1.08055 -1.06895,-2.25376 -1.46875,-3.46875 -0.2428,-0.73788 -0.39218,-1.53313 -0.5625,-2.3125 L 289.6875,467.78406 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_upper_leg_front');
  var left_foot_front = front.path("m 453.59375,946.56531 -35.65625,-6.875 c 0.0473,5.74583 1.65625,8.65625 1.65625,8.65625 -0.70875,11.33 -3.16125,20.54875 2.5,26.5625 5.66625,6.0175 4.94,8.13 7.0625,12.03125 2.125,3.89875 2.48,8.86621 6.375,13.46879 3.89625,4.6012 8.84375,4.7812 8.84375,4.7812 1.595,7.265 4.78125,9.1875 11.21875,9.1875 6.96875,0 8.09375,-3.875 8.09375,-3.875 0,0 2.29625,1.57 5.65625,1.2188 3.36625,-0.35 4.78125,-2.4688 4.78125,-2.4688 6.19625,1.7625 9.21875,-1.4062 9.21875,-1.4062 4.60375,1.4125 7.4375,-3.1875 7.4375,-3.1875 0,0 2.45625,-0.3788 3.875,-3.9063 1.4125,-3.55123 -2.8325,-7.43749 -5.3125,-8.49999 -2.47625,-1.0625 -4.84375,-2.84375 -4.84375,-2.84375 0,0 -8.94125,-11.32 -17.4375,-19.8125 -8.5,-8.5 -11.46875,-14.625 -11.46875,-14.625 -1.26992,-1.49533 -1.65536,-4.80371 -2,-8.40625 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_foot_front');
  var left_lower_leg_front = front.path("m 454.375,718.53406 c -1.60804,0.96227 -3.26516,2.09861 -4.84375,2.9375 -3.68888,1.96033 -7.31272,3.58934 -10.90625,4.84375 -1.79676,0.62721 -3.58488,1.15146 -5.375,1.59375 -1.79012,0.44229 -3.58007,0.77951 -5.375,1.03125 -1.79493,0.25174 -3.59504,0.41318 -5.40625,0.46875 -1.81121,0.0556 -3.62981,0.0212 -5.46875,-0.125 -1.83894,-0.14623 -3.68436,-0.39634 -5.5625,-0.75 -1.87814,-0.35366 -3.78995,-0.80828 -5.71875,-1.375 -1.9288,-0.56672 -3.88409,-1.24585 -5.875,-2.03125 -0.36802,-0.14518 -0.75463,-0.34723 -1.125,-0.5 1.37516,6.29589 2.88782,11.81984 3.90625,15.5625 2.125,7.77875 0.6875,14.6875 0.6875,14.6875 -3.4675,15.0525 -1.42125,35.82125 0.46875,56.59375 1.8875,20.76125 7.0925,35.38625 11.8125,63.71875 4.72125,28.31 4.25,52.40625 4.25,52.40625 -1.63235,5.17567 -1.93224,8.93991 -1.90625,12.09375 l 35.65625,6.875 c -0.19813,-2.0711 -0.3747,-4.17886 -0.71875,-6.25 -1.07,-6.43125 -5.65375,-8.9525 -3.53125,-34.4375 1.83375,-21.9775 11.09375,-93.25 11.09375,-93.25 0.5925,-17.60625 -2.04375,-51.8975 -3.8125,-60.75 -1.77125,-8.8525 -2.12375,-12.41 -1.8125,-21.25 0.14479,-4.02117 -0.10757,-8.09346 -0.4375,-12.09375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_lower_leg_front');
  var left_upper_leg_front = front.path("m 459.90625,465.31531 -70.0625,52.78125 c -0.20048,1.10244 -0.41282,2.19406 -0.75,3.21875 -0.3998,1.21499 -0.90082,2.3882 -1.46875,3.46875 -0.56793,1.08055 -1.19137,2.08111 -1.90625,3 -0.71488,0.91889 -1.5031,1.73874 -2.34375,2.46875 -0.84065,0.73001 -1.74227,1.3611 -2.6875,1.875 -0.51808,0.28166 -1.08043,0.44584 -1.625,0.65625 0.13137,-0.0177 0.875,-0.0625 0.875,-0.0625 0.7075,46.0175 10.625,97.71875 10.625,97.71875 0.70625,28.3225 4.25875,55.92 4.96875,71.5 0.36737,8.10298 1.69672,15.86225 3.1875,22.6875 0.37037,0.15277 0.75698,0.35482 1.125,0.5 1.99091,0.7854 3.9462,1.46453 5.875,2.03125 1.9288,0.56672 3.84061,1.02134 5.71875,1.375 1.87814,0.35366 3.72356,0.60377 5.5625,0.75 1.83894,0.14623 3.65754,0.18057 5.46875,0.125 1.81121,-0.0556 3.61132,-0.21701 5.40625,-0.46875 1.79493,-0.25174 3.58488,-0.58896 5.375,-1.03125 1.79012,-0.44229 3.57824,-0.96654 5.375,-1.59375 3.59353,-1.25441 7.21737,-2.88342 10.90625,-4.84375 1.57859,-0.83889 3.23571,-1.97523 4.84375,-2.9375 -0.3964,-4.80625 -0.92706,-9.49922 -1.3125,-13.75 -0.70625,-7.79 3.5625,-25.84375 3.5625,-25.84375 0,0 13.20125,-57.82625 10.59375,-103.0625 -1.37,-23.7975 -2.3125,-47.40625 -2.3125,-47.40625 0,0 -2.585,-32.9 -3.53125,-50.28125 -0.24096,-4.43951 -0.80087,-8.71203 -1.46875,-12.875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_upper_leg_front');
  var chest = front.path("m 342.375,183.72156 c -4.92972,4.07859 -11.14106,9.1393 -16.25,12.96875 -2.95475,2.21617 -5.67916,3.16009 -8.3125,3.65625 l -2.21875,0 c -4.23962,0.51149 -8.33906,0.16365 -12.8125,1.34375 -2.20608,0.58194 -5.03447,1.40987 -7.75,2.21875 -2.8881,0.86028 -6.00307,2.01463 -9.15625,3.5625 0.463,1.70815 0.99032,3.35611 1.40625,5.125 0.8265,3.51496 1.5617,7.14139 2.21875,10.875 0.65705,3.73361 1.24056,7.57593 1.75,11.5 1.01889,7.84813 1.75295,16.05917 2.3125,24.5 0.55955,8.44083 0.94377,17.12948 1.21875,25.9375 0.23859,7.64244 0.35278,15.39591 0.5,23.15625 0.14432,-1.31724 0.30964,-2.58086 0.4375,-4.09375 -0.87625,10.35125 0.79125,24.52 2.375,35.40625 0.0455,0.31313 0.36474,1.94339 0.4375,2.375 1.61228,9.5634 9.29388,45.64517 7.46875,52.65625 -2.27125,8.70625 -7.26625,24.7325 -5.9375,35.125 0,0 -7.41683,16.82408 -10.375,37.75 l 69.71875,51.21875 c -0.11013,-0.50394 -0.26109,-0.98079 -0.34375,-1.5 -0.21049,-1.3222 -0.34375,-2.69157 -0.34375,-4.09375 0,-1.40218 0.13326,-2.77155 0.34375,-4.09375 0.21049,-1.3222 0.50645,-2.59751 0.90625,-3.8125 0.3998,-1.21499 0.90082,-2.35695 1.46875,-3.4375 0.56793,-1.08055 1.19137,-2.08111 1.90625,-3 0.71488,-0.91889 1.5031,-1.76999 2.34375,-2.5 0.84065,-0.73001 1.74227,-1.3611 2.6875,-1.875 0.94523,-0.5139 1.94011,-0.91694 2.96875,-1.1875 1.02864,-0.27056 2.09663,-0.40625 3.1875,-0.40625 1.09087,0 2.15886,0.13569 3.1875,0.40625 1.02864,0.27056 2.02352,0.6736 2.96875,1.1875 0.94523,0.5139 1.84685,1.14499 2.6875,1.875 0.84065,0.73001 1.62887,1.58111 2.34375,2.5 0.71488,0.91889 1.33832,1.91945 1.90625,3 0.56793,1.08055 1.06895,2.22251 1.46875,3.4375 0.3998,1.21499 0.69576,2.4903 0.90625,3.8125 0.21049,1.3222 0.34375,2.69157 0.34375,4.09375 0,1.40218 -0.13326,2.77155 -0.34375,4.09375 -0.033,0.2071 -0.11902,0.38901 -0.15625,0.59375 l 70.0625,-52.78125 c -3.16759,-19.74392 -9.96875,-35.28125 -9.96875,-35.28125 1.33125,-10.3925 -3.635,-26.41875 -5.90625,-35.125 -1.80227,-6.93234 5.61148,-41.99695 7.34375,-52.0625 0.0987,-0.57375 0.47422,-2.57771 0.53125,-2.96875 1.13854,-7.81985 2.30341,-17.29928 2.5625,-25.875 l 0,-3.5625 c -0.008,-2.04652 -3.5e-4,-4.12445 -0.15625,-5.96875 0.0478,0.56561 0.10731,0.97873 0.15625,1.53125 0.12681,1.43164 0.30319,2.52791 0.4375,3.875 0.14813,-7.82353 0.29073,-15.63943 0.53125,-23.34375 0.27498,-8.80802 0.6592,-17.46542 1.21875,-25.90625 0.55955,-8.44083 1.29361,-16.65187 2.3125,-24.5 0.50944,-3.92407 1.09295,-7.76639 1.75,-11.5 0.65705,-3.73361 1.39225,-7.36004 2.21875,-10.875 0.49461,-2.10349 1.0947,-4.07663 1.65625,-6.09375 -3.49894,-1.76278 -6.95409,-2.95216 -10.125,-3.875 -2.51816,-0.73287 -5.18567,-1.54899 -7.25,-2.09375 -4.47628,-1.1801 -8.57351,-0.83226 -12.8125,-1.34375 l -1.59375,0 c -2.62518,-0.49616 -5.32606,-1.44008 -8.28125,-3.65625 -4.12175,-3.09041 -9.57093,-7.51431 -14.125,-11.25 -0.387,0.74227 -0.71722,1.57558 -1.125,2.28125 -1.1651,2.01621 -2.39979,3.90661 -3.71875,5.625 -1.31896,1.71839 -2.70686,3.26552 -4.15625,4.6875 -1.44939,1.42198 -2.94361,2.71676 -4.5,3.84375 -1.55639,1.12699 -3.17256,2.1041 -4.8125,2.9375 -1.63994,0.8334 -3.33119,1.52127 -5.03125,2.0625 -1.70006,0.54123 -3.41951,0.93703 -5.15625,1.1875 -1.73674,0.25047 -3.46876,0.35137 -5.21875,0.3125 -1.74999,-0.0389 -3.5102,-0.23569 -5.25,-0.5625 -1.7398,-0.32681 -3.48133,-0.79292 -5.1875,-1.40625 -1.70617,-0.61333 -3.38214,-1.35156 -5.03125,-2.25 -1.64911,-0.89844 -3.24389,-1.94286 -4.8125,-3.125 -1.56861,-1.18214 -3.09783,-2.50433 -4.5625,-3.96875 -1.46467,-1.46442 -2.88145,-3.0672 -4.21875,-4.8125 -1.3373,-1.7453 -2.59476,-3.63149 -3.78125,-5.65625 -0.52506,-0.89602 -0.97654,-1.92445 -1.46875,-2.875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'chest');
  var left_hand_front = front.path("m 539.34375,504.56531 -23.375,0 c 0.0267,0.24525 0.28125,1.59375 0.28125,1.59375 -2.83375,4.60125 -3.525,16.47125 -3.875,26.1875 -0.49,13.46625 -0.97,23.15625 -2.125,30.125 -1.4175,8.49 4.9375,5.65625 4.9375,5.65625 4.95625,-1.6425 6.1225,-15.7625 7.8125,-22.4375 2.12625,-8.37625 7.3125,-8.035 9.90625,-5.4375 2.5975,2.59625 16.99375,18.64625 17.46875,22.65625 0.4675,4.02125 2.8125,18.65625 2.8125,18.65625 0.235,14.165 5.5525,16.63375 9.09375,16.28125 3.5425,-0.35875 3.1875,-4.25 3.1875,-4.25 -1.0625,-5.31125 -3.89375,-31.49375 -5.3125,-38.21875 -1.415,-6.72875 -5.29,-15.98375 -11.6875,-28.6875 -2.73641,-5.43562 -6.23394,-14.03087 -9.125,-22.125 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_hand_front');
  var left_forearm_front = front.path("m 511.75,371.44031 -39.53125,0 c 3.44447,9.84478 5.90132,31.27409 8.625,44.78125 5.89375,29.23625 19.84875,44.98625 27.28125,62.6875 6.59113,15.68688 7.63551,23.74633 7.84375,25.65625 l 23.375,0 c -0.31414,-0.8795 -0.70413,-1.76227 -1,-2.625 0,0 -2.51125,-38.98875 -5.34375,-62.59375 -2.83125,-23.5975 -11.78125,-46.84375 -11.78125,-46.84375 -2.59249,-7.39915 -8.21857,-15.91256 -9.46875,-21.0625 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_forearm_front');
  var left_arm_front = front.path("m 464.59375,207.65906 c -0.56155,2.01712 -1.16164,3.99026 -1.65625,6.09375 -0.8265,3.51496 -1.5617,7.14139 -2.21875,10.875 -0.65705,3.73361 -1.24056,7.57593 -1.75,11.5 -1.01889,7.84813 -1.75295,16.05917 -2.3125,24.5 -0.55955,8.44083 -0.94377,17.09823 -1.21875,25.90625 -0.24052,7.70432 -0.38312,15.52022 -0.53125,23.34375 3.52084,35.31324 9.54469,42.6001 16.75,59.625 0.20127,0.47597 0.36797,1.3815 0.5625,1.9375 l 39.53125,0 c -0.0386,-0.15893 -0.15764,-0.37898 -0.1875,-0.53125 -0.6325,-3.22125 -0.25,-9.90625 -0.25,-9.90625 2.35375,-31.655 -12.0625,-60.90625 -12.0625,-60.90625 0,0 2.72,-12.6275 -5.65625,-48.5 -6.32736,-27.09211 -17.98604,-38.38861 -29,-43.9375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_arm_front');
  var neck_front = front.path("m 342.375,183.72156 c 0.49221,0.95055 0.94369,1.97898 1.46875,2.875 1.18649,2.02476 2.44395,3.91095 3.78125,5.65625 1.3373,1.7453 2.75408,3.34808 4.21875,4.8125 1.46467,1.46442 2.99389,2.78661 4.5625,3.96875 1.56861,1.18214 3.16339,2.22656 4.8125,3.125 1.64911,0.89844 3.32508,1.63667 5.03125,2.25 1.70617,0.61333 3.4477,1.07944 5.1875,1.40625 1.7398,0.32681 3.50001,0.52363 5.25,0.5625 1.74999,0.0389 3.48201,-0.062 5.21875,-0.3125 1.73674,-0.25047 3.45619,-0.64627 5.15625,-1.1875 1.70006,-0.54123 3.39131,-1.2291 5.03125,-2.0625 1.63994,-0.8334 3.25611,-1.81051 4.8125,-2.9375 1.55639,-1.12699 3.05061,-2.42177 4.5,-3.84375 1.44939,-1.42198 2.83729,-2.96911 4.15625,-4.6875 1.31896,-1.71839 2.55365,-3.60879 3.71875,-5.625 0.40778,-0.70567 0.738,-1.53898 1.125,-2.28125 -4.8347,-3.96589 -8.65625,-7.15625 -8.65625,-7.15625 -2.83375,-2.35625 -1.90625,-20.3125 -1.90625,-20.3125 l -22.40625,0 -1.40625,0 -1.4375,0 -1.40625,0 -22.40625,0 c 0,0 0.95875,17.95625 -1.875,20.3125 0,0 -3.25915,2.73034 -6.53125,5.4375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'neck_front');
  var head_front = front.path("m 375.59375,50.346558 c -0.285,0 -0.5875,0.01875 -0.875,0.03125 -5.39875,0.0525 -10.945,0.9575 -16.4375,2.8125 -16.99,5.72625 -23.48125,20.18875 -25.84375,32.4375 -0.8175,3.82375 -1.25375,7.92375 -1.25,12.3125 -0.0471,2.707872 0.0323,4.521012 0.125,5.781252 -0.32243,-0.0943 -0.77584,-0.19162 -1.28125,-0.28125 -0.51781,-0.0855 -1.11437,-0.15625 -1.71875,-0.15625 -0.925,0 -1.87125,0.14875 -2.6875,0.625 -0.30672,0.17937 -0.59086,0.413 -0.875,0.71875 -0.28403,0.30541 -0.57113,0.67828 -0.8125,1.09375 -0.36231,0.62408 -0.6648,1.36044 -0.875,2.1875 -0.07,0.2753 -0.1082,0.54992 -0.15625,0.84375 -0.002,0.0102 0.002,0.0211 0,0.0312 -0.0457,0.28445 -0.10216,0.57514 -0.125,0.875 -0.0501,0.63093 -0.035,1.28179 0.0312,1.96875 0.0595,0.61457 0.17507,1.22818 0.34375,1.875 0.0165,0.0635 0.0137,0.1238 0.0312,0.1875 0.10063,0.36659 0.23539,0.72027 0.375,1.09375 0.13583,0.36305 0.26228,0.72614 0.4375,1.09375 0.17966,0.3799 0.36936,0.74243 0.59375,1.125 0.43453,0.74094 0.83278,1.41658 1.15625,2.0625 0.32385,0.6467 0.57774,1.24405 0.8125,1.8125 1.17948,2.84858 1.37148,4.78854 1.9375,6.875 0.028,0.10378 0.0637,0.20801 0.0937,0.3125 0.0913,0.31669 0.16507,0.64041 0.28125,0.96875 0.13266,0.37719 0.31286,0.76281 0.5,1.125 0.37429,0.72438 0.83438,1.40917 1.375,2 0.539,0.58819 1.14475,1.08095 1.78125,1.4375 0.15953,0.0898 0.33707,0.17851 0.5,0.25 0.46851,0.20556 0.95806,0.31413 1.4375,0.34375 0.0208,0.001 0.0417,-9.2e-4 0.0625,0 0.32257,0.0108 0.65133,-0.0104 0.96875,-0.0937 0.96404,5.398 2.18191,11.06309 3.625,15.15625 3.03625,8.59 11.07375,16.44625 26.5625,21.5625 l 0.0937,0.15625 c 3.225,2.38 7.345,2.86875 9.8125,2.84375 3.09625,0.1675 6.555,-0.46375 9.78125,-2.84375 l 0.0937,-0.15625 c 15.485,-5.11625 23.53,-12.9725 26.5625,-21.5625 1.45615,-4.12517 2.68897,-9.84591 3.65625,-15.28125 1.09096,0.22124 2.22601,-0.14274 3.25,-0.84375 0.0689,-0.0472 0.15085,-0.0747 0.21875,-0.125 0.0829,-0.0566 0.16865,-0.12648 0.25,-0.1875 0.0112,-0.009 0.02,-0.022 0.0312,-0.0312 0.97201,-0.7384 1.84067,-1.77717 2.4375,-2.9375 0.18696,-0.36158 0.33562,-0.71656 0.46875,-1.09375 0.61375,-1.7375 0.82969,-3.28469 1.3125,-5.125 0.24075,-0.91204 0.56856,-1.90626 1.03125,-3.03125 0.003,-0.008 -0.003,-0.0232 0,-0.0312 0.4693,-1.13699 1.10063,-2.39313 1.96875,-3.875 0.21236,-0.36186 0.39021,-0.73431 0.5625,-1.09375 0.004,-0.009 -0.004,-0.0225 0,-0.0312 0.52591,-1.10261 0.86858,-2.17504 1.0625,-3.21875 0.58378,-3.122 -0.16424,-5.86522 -1.34375,-7.5 -0.005,-0.006 0.005,-0.0249 0,-0.0312 -0.27012,-0.37111 -0.57047,-0.6595 -0.875,-0.90625 -0.14872,-0.12192 -0.28438,-0.22313 -0.4375,-0.3125 -0.24423,-0.14317 -0.48376,-0.25408 -0.75,-0.34375 -0.5023,-0.17431 -1.03389,-0.25292 -1.5625,-0.28125 -0.26992,-0.0119 -0.54961,-0.0144 -0.8125,0 -0.52453,0.0259 -1.02738,0.10258 -1.46875,0.1875 -0.4423,0.0872 -0.84,0.19875 -1.125,0.28125 -0.004,0.0594 0.004,0.0374 0,0.0937 -0.0188,0.005 -0.0443,0.0262 -0.0625,0.0312 0.0826,-1.28521 0.16699,-3.08685 0.125,-5.625002 0,-4.38875 -0.43375,-8.48875 -1.25,-12.3125 -2.36435,-12.24875 -8.8472,-26.71125 -25.84345,-32.4375 -5.48625,-1.855 -11.03875,-2.76 -16.4375,-2.8125 -0.285,-0.0125 -0.55625,-0.03125 -0.84375,-0.03125 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'head_front');

  bodyMap['lb_front'].push(head_front, neck_front, chest, groin, right_arm_front, right_forearm_front, right_hand_front, left_arm_front, left_forearm_front, left_hand_front, right_upper_leg_front, right_lower_leg_front, right_foot_front, left_upper_leg_front, left_lower_leg_front, left_foot_front);

  var back = Raphael('lb_back', bodyWidth, bodyHeight);
  back.setViewBox(0, 0, 1, svgHeight);
  bodyMap['lb_back'] = back.set();

  var right_hand_back = back.path("m 539.34375,504.56531 -23.375,0 c 0.0267,0.24525 0.28125,1.59375 0.28125,1.59375 -2.83375,4.60125 -3.525,16.47125 -3.875,26.1875 -0.49,13.46625 -0.97,23.15625 -2.125,30.125 -1.4175,8.49 4.9375,5.65625 4.9375,5.65625 4.95625,-1.6425 6.1225,-15.7625 7.8125,-22.4375 2.12625,-8.37625 7.3125,-8.035 9.90625,-5.4375 2.5975,2.59625 16.99375,18.64625 17.46875,22.65625 0.4675,4.02125 2.8125,18.65625 2.8125,18.65625 0.235,14.165 5.5525,16.63375 9.09375,16.28125 3.5425,-0.35875 3.1875,-4.25 3.1875,-4.25 -1.0625,-5.31125 -3.89375,-31.49375 -5.3125,-38.21875 -1.415,-6.72875 -5.29,-15.98375 -11.6875,-28.6875 -2.73641,-5.43562 -6.23394,-14.03087 -9.125,-22.125 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_hand_back');
  var right_forearm_back = back.path("m 511.1875,364.69031 c -0.39028,-0.17545 -0.8005,-0.39483 -1.1875,-0.5625 -2.09568,-0.90796 -4.14161,-1.70548 -6.15625,-2.34375 -2.01464,-0.63827 -4.0098,-1.13886 -5.96875,-1.4375 -1.95895,-0.29864 -3.88388,-0.39218 -5.8125,-0.28125 -1.92862,0.11093 -3.85762,0.4408 -5.78125,1.03125 -1.92363,0.59045 -3.83726,1.4226 -5.78125,2.5625 -1.94399,1.1399 -3.91655,2.58445 -5.90625,4.34375 -0.85129,0.75271 -1.73078,1.81226 -2.59375,2.6875 0.0706,0.27489 0.14342,0.5347 0.21875,0.75 3.44447,9.84478 5.90132,31.27409 8.625,44.78125 5.89375,29.23625 19.84875,44.98625 27.28125,62.6875 6.59113,15.68688 7.63551,23.74633 7.84375,25.65625 l 23.375,0 c -0.31414,-0.8795 -0.70413,-1.76227 -1,-2.625 0,0 -2.51125,-38.98875 -5.34375,-62.59375 -2.83125,-23.5975 -11.78125,-46.84375 -11.78125,-46.84375 -2.59249,-7.39915 -8.21857,-15.91256 -9.46875,-21.0625 -0.0386,-0.15893 -0.15764,-0.37898 -0.1875,-0.53125 -0.32151,-1.63744 -0.39447,-4.1243 -0.375,-6.21875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_forearm_back');
  var right_arm_back = back.path("m 464.53125,207.65906 c -0.50719,1.51607 -1.07174,2.9875 -1.53125,4.53125 -1.00827,3.38734 -1.92287,6.83968 -2.71875,10.34375 -0.79588,3.50407 -1.48666,7.05815 -2.09375,10.65625 -0.60709,3.5981 -1.1206,7.26807 -1.5625,10.9375 -0.8838,7.33885 -1.44784,14.79331 -1.8125,22.28125 -0.36466,7.48794 -0.52818,14.9821 -0.5625,22.4375 -0.0251,5.44131 0.0611,10.78471 0.125,16.125 0.0357,0.33438 0.0609,0.65956 0.0937,1.03125 3.45114,38.96121 9.70733,45.82565 17.1875,63.5 0.12333,0.29166 0.23202,0.75251 0.34375,1.1875 0.86297,-0.87524 1.74246,-1.93479 2.59375,-2.6875 1.9897,-1.7593 3.96226,-3.20385 5.90625,-4.34375 1.94399,-1.1399 3.85762,-1.97205 5.78125,-2.5625 1.92363,-0.59045 3.85263,-0.92032 5.78125,-1.03125 1.92862,-0.11093 3.85355,-0.0174 5.8125,0.28125 1.95895,0.29864 3.95411,0.79923 5.96875,1.4375 2.01464,0.63827 4.06057,1.43579 6.15625,2.34375 0.387,0.16767 0.79722,0.38705 1.1875,0.5625 0.0188,-2.02585 0.125,-3.6875 0.125,-3.6875 2.35375,-31.655 -12.0625,-60.90625 -12.0625,-60.90625 0,0 2.72,-12.6275 -5.65625,-48.5 -6.3374,-27.13552 -18.03301,-38.39817 -29.06245,-43.9375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_arm_back');
  var groin = back.path("m 379.0625,532.78406 c 0.54457,-0.21041 1.10692,-0.37459 1.625,-0.65625 0.94523,-0.5139 1.84685,-1.14499 2.6875,-1.875 0.84065,-0.73001 1.62887,-1.54986 2.34375,-2.46875 0.71488,-0.91889 1.33832,-1.91945 1.90625,-3 0.56793,-1.08055 1.06895,-2.25376 1.46875,-3.46875 0.3998,-1.21499 0.69576,-2.4903 0.90625,-3.8125 0.21049,-1.3222 0.34375,-2.69157 0.34375,-4.09375 0,-1.40218 -0.13326,-2.77155 -0.34375,-4.09375 -0.21049,-1.3222 -0.50645,-2.59751 -0.90625,-3.8125 -0.3998,-1.21499 -0.90082,-2.35695 -1.46875,-3.4375 -0.56793,-1.08055 -1.19137,-2.08111 -1.90625,-3 -0.71488,-0.91889 -1.5031,-1.76999 -2.34375,-2.5 -0.84065,-0.73001 -1.74227,-1.3611 -2.6875,-1.875 -0.94523,-0.5139 -1.94011,-0.91694 -2.96875,-1.1875 -1.02864,-0.27056 -2.09663,-0.40625 -3.1875,-0.40625 -1.09087,0 -2.15886,0.13569 -3.1875,0.40625 -1.02864,0.27056 -2.02352,0.6736 -2.96875,1.1875 -0.94523,0.5139 -1.84685,1.14499 -2.6875,1.875 -0.84065,0.73001 -1.62887,1.58111 -2.34375,2.5 -0.71488,0.91889 -1.33832,1.91945 -1.90625,3 -0.56793,1.08055 -1.06895,2.22251 -1.46875,3.4375 -0.3998,1.21499 -0.69576,2.4903 -0.90625,3.8125 -0.21049,1.3222 -0.34375,2.69157 -0.34375,4.09375 0,1.40218 0.13326,2.77155 0.34375,4.09375 0.21049,1.3222 0.50645,2.59751 0.90625,3.8125 0.3998,1.21499 0.90082,2.3882 1.46875,3.46875 0.56793,1.08055 1.19137,2.08111 1.90625,3 0.71488,0.91889 1.5031,1.73874 2.34375,2.46875 0.84065,0.73001 1.74227,1.3611 2.6875,1.875 0.53866,0.29286 1.12027,0.47177 1.6875,0.6875 4.9e-4,-0.0309 -4.8e-4,-0.0628 0,-0.0937 0,0 2.245,0.345 4.9375,0.3125 2.21099,0.0267 3.45297,-0.16804 4.0625,-0.25 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'groin');
  var right_foot_back = back.path("m 453,941.37781 c -1.13582,-1.3707 -2.2452,-2.81405 -3.46875,-3.9375 -1.89462,-1.73962 -3.85965,-3.19498 -5.875,-4.34375 -2.01535,-1.14877 -4.06658,-2.00218 -6.09375,-2.5625 -2.02717,-0.56032 -4.03866,-0.80696 -5.96875,-0.78125 -1.93009,0.0257 -3.77591,0.32816 -5.5,0.9375 -0.86205,0.30467 -1.70987,0.67487 -2.5,1.125 -0.79013,0.45013 -1.54541,0.99847 -2.25,1.59375 -0.70459,0.59528 -1.3633,1.25987 -1.96875,2 -0.46656,0.57035 -0.88072,1.21879 -1.28125,1.875 -0.0398,0.7913 -0.16217,1.68778 -0.15625,2.40625 0.0473,5.74583 1.65625,8.65625 1.65625,8.65625 -0.70875,11.33 -3.16125,20.54875 2.5,26.5625 5.66625,6.0175 4.94,8.13 7.0625,12.03125 2.125,3.89875 2.48,8.86621 6.375,13.46879 3.89625,4.6012 8.84375,4.7812 8.84375,4.7812 1.595,7.265 4.78125,9.1875 11.21875,9.1875 6.96875,0 8.09375,-3.875 8.09375,-3.875 0,0 2.29625,1.57 5.65625,1.2188 3.36625,-0.35 4.78125,-2.4688 4.78125,-2.4688 6.19625,1.7625 9.21875,-1.4062 9.21875,-1.4062 4.60375,1.4125 7.4375,-3.1875 7.4375,-3.1875 0,0 2.45625,-0.3788 3.875,-3.9063 1.4125,-3.55123 -2.8325,-7.43749 -5.3125,-8.49999 -2.47625,-1.0625 -4.84375,-2.84375 -4.84375,-2.84375 0,0 -8.94125,-11.32 -17.4375,-19.8125 -8.5,-8.5 -11.46875,-14.625 -11.46875,-14.625 -1.26992,-1.49533 -1.65536,-4.80371 -2,-8.40625 -0.16444,-1.71891 -0.35094,-3.45998 -0.59375,-5.1875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_foot_back');
  var right_lower_leg_back = back.path("m 454.65625,726.44031 c -1.65399,-0.574 -3.31511,-1.26235 -4.96875,-1.71875 -3.25764,-0.89909 -6.52141,-1.57814 -9.78125,-2.03125 -3.25984,-0.45311 -6.5145,-0.66653 -9.78125,-0.6875 -3.26675,-0.021 -6.53412,0.16517 -9.8125,0.5625 -3.27838,0.39733 -6.58028,1.0107 -9.875,1.8125 -3.29472,0.8018 -6.59047,1.77632 -9.90625,2.96875 -0.3439,0.12368 -0.68709,0.3097 -1.03125,0.4375 1.12024,4.73755 2.31295,9.42202 3.125,12.40625 2.125,7.77875 0.6875,14.6875 0.6875,14.6875 -3.4675,15.0525 -1.42125,35.82125 0.46875,56.59375 1.8875,20.76125 7.0925,35.38625 11.8125,63.71875 4.72125,28.31 4.25,52.40625 4.25,52.40625 -1.26049,3.99661 -1.61508,7.00528 -1.75,9.6875 0.40053,-0.65621 0.81469,-1.30465 1.28125,-1.875 0.60545,-0.74013 1.26416,-1.40472 1.96875,-2 0.70459,-0.59528 1.45987,-1.14362 2.25,-1.59375 0.79013,-0.45013 1.63795,-0.82033 2.5,-1.125 1.72409,-0.60934 3.56991,-0.91179 5.5,-0.9375 1.93009,-0.0257 3.94158,0.22093 5.96875,0.78125 2.02717,0.56032 4.0784,1.41373 6.09375,2.5625 2.01535,1.14877 3.98038,2.60413 5.875,4.34375 1.22355,1.12345 2.33293,2.5668 3.46875,3.9375 -0.0498,-0.35396 -0.0665,-0.7103 -0.125,-1.0625 -1.07,-6.43125 -5.65375,-8.9525 -3.53125,-34.4375 1.83375,-21.9775 11.09375,-93.25 11.09375,-93.25 0.5925,-17.60625 -2.04375,-51.8975 -3.8125,-60.75 -1.77125,-8.8525 -2.12375,-12.41 -1.8125,-21.25 0.0501,-1.3924 -0.12442,-2.78795 -0.15625,-4.1875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_lower_leg_back');
  var right_upper_leg_back = back.path("m 462.46875,493.72156 c -0.13891,2.94003 -0.29492,5.84759 -0.78125,8.46875 -0.62627,3.37542 -1.55346,6.50182 -2.6875,9.375 -1.13404,2.87318 -2.49766,5.50546 -4.0625,7.90625 -1.56484,2.40079 -3.33131,4.57298 -5.25,6.53125 -1.91869,1.95827 -3.99193,3.70438 -6.1875,5.25 -2.19557,1.54562 -4.51076,2.89967 -6.90625,4.0625 -2.39549,1.16283 -4.85655,2.12759 -7.375,2.9375 -2.51845,0.80991 -5.0918,1.45065 -7.65625,1.9375 -2.56445,0.48685 -5.12276,0.83759 -7.65625,1.03125 -2.53349,0.19366 -5.04319,0.22592 -7.46875,0.15625 -2.42556,-0.0697 -4.75932,-0.25937 -7,-0.5625 -2.24068,-0.30313 -4.36492,-0.71202 -6.34375,-1.21875 -1.97883,-0.50673 -3.82873,-1.10079 -5.46875,-1.78125 -1.64002,-0.68046 -3.08824,-1.45693 -4.3125,-2.28125 -1.22426,-0.82432 -2.20598,-1.68667 -2.9375,-2.625 l -0.4375,0 c 0.73125,45.97079 10.625,97.53125 10.625,97.53125 0.70625,28.3225 4.25875,55.92 4.96875,71.5 0.36737,8.10298 1.69672,15.86225 3.1875,22.6875 0.27867,1.27583 0.49655,1.95222 0.78125,3.15625 0.34416,-0.1278 0.68735,-0.31382 1.03125,-0.4375 3.31578,-1.19243 6.61153,-2.16695 9.90625,-2.96875 3.29472,-0.8018 6.59662,-1.41517 9.875,-1.8125 3.27838,-0.39733 6.54575,-0.58347 9.8125,-0.5625 3.26675,0.021 6.52141,0.23439 9.78125,0.6875 3.25984,0.45311 6.52361,1.13216 9.78125,2.03125 1.65364,0.4564 3.31476,1.14475 4.96875,1.71875 -0.0601,-2.64226 -0.0656,-5.29113 -0.28125,-7.90625 -0.3964,-4.80625 -0.92706,-9.49922 -1.3125,-13.75 -0.70625,-7.79 3.5625,-25.84375 3.5625,-25.84375 0,0 13.20125,-57.82625 10.59375,-103.0625 -1.37,-23.7975 -2.3125,-47.40625 -2.3125,-47.40625 0,0 -1.36239,-19.30466 -2.4375,-34.75 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_upper_leg_back');
  var left_foot_back = back.path("m 332,938.56531 c -0.0468,-0.0875 -0.077,-0.1951 -0.125,-0.28125 -0.49268,-0.88468 -1.0508,-1.69737 -1.65625,-2.4375 -0.60545,-0.74013 -1.26416,-1.40472 -1.96875,-2 -0.70459,-0.59528 -1.42862,-1.11237 -2.21875,-1.5625 -0.79013,-0.45013 -1.63795,-0.82033 -2.5,-1.125 -1.72409,-0.60934 -3.56991,-0.94304 -5.5,-0.96875 -1.93009,-0.0257 -3.94158,0.25218 -5.96875,0.8125 -2.02717,0.56032 -4.0784,1.41373 -6.09375,2.5625 -2.01535,1.14877 -3.98038,2.60413 -5.875,4.34375 -1.0892,1.0001 -2.07279,2.304 -3.09375,3.5 -0.19968,1.47357 -0.35947,2.949 -0.5,4.4375 -0.36719,3.88919 -0.73888,7.53064 -2.09375,9.125 0,0 -2.94,6.125 -11.4375,14.625 -8.4975,8.4925 -17.46875,19.8125 -17.46875,19.8125 0,0 -2.365,1.78125 -4.84375,2.84375 -2.47625,1.0625 -6.96,3.74626 -5.3125,8.49999 1.24875,3.605 3.90625,3.9063 3.90625,3.9063 0,0 2.83375,4.6 7.4375,3.1875 0,0 2.99375,3.1687 9.1875,1.4062 0,0 1.41625,2.1188 4.78125,2.4688 3.36125,0.3512 5.65625,-1.2188 5.65625,-1.2188 0,0 1.12625,3.875 8.09375,3.875 6.44,0 9.62375,-1.9225 11.21875,-9.1875 0,0 4.95,-0.18 8.84375,-4.7812 3.8975,-4.60258 4.24875,-9.57004 6.375,-13.46879 2.1225,-3.90125 1.43375,-6.01375 7.09375,-12.03125 5.6675,-6.01375 3.17875,-15.2325 2.46875,-26.5625 0,0 1.66297,-2.97672 1.65625,-8.90625 -3.4e-4,-0.26154 -0.0572,-0.60495 -0.0625,-0.875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_foot_back');
  var left_lower_leg_back = back.path("m 350.53125,727.75281 c -0.33071,-0.12265 -0.66952,-0.2874 -1,-0.40625 -3.31578,-1.19243 -6.61153,-2.16695 -9.90625,-2.96875 -3.29472,-0.8018 -6.56537,-1.41517 -9.84375,-1.8125 -3.27838,-0.39733 -6.54575,-0.58347 -9.8125,-0.5625 -3.26675,0.021 -6.55266,0.23439 -9.8125,0.6875 -3.25984,0.45311 -6.49236,1.13216 -9.75,2.03125 -1.67544,0.46241 -3.35545,1.16685 -5.03125,1.75 -0.0443,1.3877 -0.20542,2.77435 -0.15625,4.15625 0.31125,8.84 -0.0425,12.3975 -1.8125,21.25 -1.7675,8.8525 -4.43,43.14375 -3.84375,60.75 0,0 9.26125,71.2725 11.09375,93.25 2.1225,25.485 -2.46125,28.00625 -3.53125,34.4375 -0.0602,0.36242 -0.0758,0.73048 -0.125,1.09375 1.02096,-1.196 2.00455,-2.4999 3.09375,-3.5 1.89462,-1.73962 3.85965,-3.19498 5.875,-4.34375 2.01535,-1.14877 4.06658,-2.00218 6.09375,-2.5625 2.02717,-0.56032 4.03866,-0.83821 5.96875,-0.8125 1.93009,0.0257 3.77591,0.35941 5.5,0.96875 0.86205,0.30467 1.70987,0.67487 2.5,1.125 0.79013,0.45013 1.51416,0.96722 2.21875,1.5625 0.70459,0.59528 1.3633,1.25987 1.96875,2 0.60545,0.74013 1.16357,1.55282 1.65625,2.4375 0.048,0.0861 0.0782,0.19373 0.125,0.28125 -0.0576,-2.95005 -0.38925,-6.35698 -1.84375,-10.96875 0,0 -0.47125,-24.09625 4.25,-52.40625 4.72,-28.3325 9.925,-42.9575 11.8125,-63.71875 1.88875,-20.7725 3.94,-41.54125 0.46875,-56.59375 0,0 -1.40375,-6.90875 0.71875,-14.6875 0.81494,-2.9913 2.00442,-7.66018 3.125,-12.4375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_lower_leg_back');
  var left_upper_leg_back = back.path("m 288.8125,476.50281 c -0.0412,0.57218 -0.1562,1.11021 -0.1875,1.6875 -0.9475,17.38125 -3.53125,50.28125 -3.53125,50.28125 0,0 -0.94375,23.60875 -2.3125,47.40625 -2.6075,45.23625 10.625,103.0625 10.625,103.0625 0,0 4.2375,18.05375 3.53125,25.84375 -0.40999,4.49756 -0.89567,9.49298 -1.28125,14.59375 -0.17792,2.35367 -0.2056,4.72508 -0.28125,7.09375 1.6758,-0.58315 3.35581,-1.28759 5.03125,-1.75 3.25764,-0.89909 6.49016,-1.57814 9.75,-2.03125 3.25984,-0.45311 6.54575,-0.66653 9.8125,-0.6875 3.26675,-0.021 6.53412,0.16517 9.8125,0.5625 3.27838,0.39733 6.54903,1.0107 9.84375,1.8125 3.29472,0.8018 6.59047,1.77632 9.90625,2.96875 0.33048,0.11885 0.66929,0.2836 1,0.40625 0.22782,-0.97127 0.40125,-1.51987 0.625,-2.53125 1.54545,-6.98556 2.93216,-14.89228 3.3125,-23.28125 0.71,-15.58 4.25875,-43.1775 4.96875,-71.5 0,0 9.89128,-51.56045 10.625,-97.53125 l -0.34375,0 c -0.62317,0.73719 -1.49239,1.4479 -2.59375,2.15625 -1.10136,0.70835 -2.42959,1.39377 -3.9375,2.03125 -1.50791,0.63748 -3.2197,1.22543 -5.0625,1.75 -1.8428,0.52457 -3.83146,1.00537 -5.9375,1.375 -2.10604,0.36963 -4.32737,0.63984 -6.625,0.8125 -2.29763,0.17266 -4.67618,0.2226 -7.09375,0.15625 -2.41757,-0.0663 -4.87789,-0.24636 -7.34375,-0.59375 -2.46586,-0.34739 -4.9325,-0.86078 -7.375,-1.53125 -2.4425,-0.67047 -4.84,-1.49567 -7.1875,-2.53125 -2.3475,-1.03558 -4.63166,-2.27603 -6.8125,-3.71875 -2.18084,-1.44272 -4.27622,-3.1081 -6.21875,-5 -1.94253,-1.8919 -3.74242,-3.99189 -5.375,-6.375 -1.63258,-2.38311 -3.09278,-5.02115 -4.34375,-7.9375 -1.25097,-2.91635 -2.29604,-6.13337 -3.09375,-9.625 -0.79771,-3.49163 -1.35219,-7.26606 -1.625,-11.375 -0.27281,-4.10894 -0.26125,-8.54422 0.0625,-13.3125 l -0.34375,-2.6875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_upper_leg_back');
  var left_buttock = back.path("m 375.28125,445.40906 -80.53125,0 c -1.89159,6.32051 -3.85088,13.8041 -5.0625,22.375 -0.40175,2.84191 -0.66219,5.76568 -0.875,8.71875 l 0.34375,2.6875 c -0.32375,4.76828 -0.33531,9.20356 -0.0625,13.3125 0.27281,4.10894 0.82729,7.88337 1.625,11.375 0.79771,3.49163 1.84278,6.70865 3.09375,9.625 1.25097,2.91635 2.71117,5.55439 4.34375,7.9375 1.63258,2.38311 3.43247,4.4831 5.375,6.375 1.94253,1.8919 4.03791,3.55728 6.21875,5 2.18084,1.44272 4.465,2.68317 6.8125,3.71875 2.3475,1.03558 4.745,1.86078 7.1875,2.53125 2.4425,0.67047 4.90914,1.18386 7.375,1.53125 2.46586,0.34739 4.92618,0.5274 7.34375,0.59375 2.41757,0.0663 4.79612,0.0164 7.09375,-0.15625 2.29763,-0.17266 4.51896,-0.44287 6.625,-0.8125 2.10604,-0.36963 4.0947,-0.85043 5.9375,-1.375 1.8428,-0.52457 3.55459,-1.11252 5.0625,-1.75 1.50791,-0.63748 2.83614,-1.3229 3.9375,-2.03125 1.10136,-0.70835 1.97058,-1.41906 2.59375,-2.15625 l 0.34375,0 c 4.9e-4,-0.0309 -4.9e-4,-0.0629 0,-0.0937 4.9e-4,-0.0309 -4.8e-4,-0.063 0,-0.0937 0,0 1.73626,0.0951 2.96875,0.1875 l 2.25,0 0,-87.5 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_buttock');
  var right_buttock = back.path("m 375.28125,445.40906 0,87.5 1.75,0 c 0.66306,-0.0556 1.72648,-0.084 2.03125,-0.125 0.13137,-0.0177 0.875,-0.0625 0.875,-0.0625 9.5e-4,0.0619 -9.8e-4,0.12561 0,0.1875 l 0.4375,0 c 0.73152,0.93833 1.71324,1.80068 2.9375,2.625 1.22426,0.82432 2.67248,1.60079 4.3125,2.28125 1.64002,0.68046 3.48992,1.27452 5.46875,1.78125 1.97883,0.50673 4.10307,0.91562 6.34375,1.21875 2.24068,0.30313 4.57444,0.49283 7,0.5625 2.42556,0.0697 4.93526,0.0374 7.46875,-0.15625 2.53349,-0.19366 5.0918,-0.5444 7.65625,-1.03125 2.56445,-0.48685 5.1378,-1.12759 7.65625,-1.9375 2.51845,-0.80991 4.97951,-1.77467 7.375,-2.9375 2.39549,-1.16283 4.71068,-2.51688 6.90625,-4.0625 2.19557,-1.54562 4.26881,-3.29173 6.1875,-5.25 1.91869,-1.95827 3.68516,-4.13046 5.25,-6.53125 1.56484,-2.40079 2.92846,-5.03307 4.0625,-7.90625 1.13404,-2.87318 2.06123,-5.99958 2.6875,-9.375 0.48633,-2.62116 0.64234,-5.52872 0.78125,-8.46875 -0.48052,-6.90331 -0.80146,-10.16233 -1.09375,-15.53125 -0.24096,-4.43951 -0.80087,-8.71203 -1.46875,-12.875 -1.22109,-7.61116 -2.98425,-14.19443 -4.6875,-19.90625 l -79.9375,0 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'right_buttock');
  var left_hand_back = back.path("m 234.75,500.87781 -23,0 c -0.003,0.0429 -0.0625,1.0625 -0.0625,1.0625 -3.02125,8.8025 -7.125,18.72375 -10.15625,24.75 -6.39875,12.70375 -10.27125,21.95875 -11.6875,28.6875 -1.415,6.725 -4.25375,32.9075 -5.3125,38.21875 0,0 -0.355,3.89125 3.1875,4.25 3.53875,0.3525 8.8575,-2.11625 9.09375,-16.28125 0,0 2.37375,-14.635 2.84375,-18.65625 0.47125,-4.01 14.87,-20.06 17.46875,-22.65625 2.59625,-2.5975 7.78,-2.93875 9.90625,5.4375 1.69,6.675 2.825,20.795 7.78125,22.4375 0,0 6.385,2.83375 4.96875,-5.65625 -1.16,-6.96875 -1.63625,-16.65875 -2.125,-30.125 -0.3525,-9.71625 -1.07625,-21.58625 -3.90625,-26.1875 0,0 0.47258,-2.63681 1,-5.28125 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_hand_back');
  var left_forearm_back = back.path("m 278.90625,368.28406 c -0.68217,-0.67346 -1.38755,-1.5282 -2.0625,-2.125 -1.9897,-1.7593 -3.93101,-3.20385 -5.875,-4.34375 -1.94399,-1.1399 -3.88887,-1.97205 -5.8125,-2.5625 -1.92363,-0.59045 -3.85264,-0.95157 -5.78125,-1.0625 -1.92862,-0.11093 -3.85355,0.0139 -5.8125,0.3125 -1.95896,0.29864 -3.95411,0.79923 -5.96875,1.4375 -2.01464,0.63827 -4.06057,1.40454 -6.15625,2.3125 -0.90408,0.39169 -1.85872,0.87993 -2.78125,1.3125 0.0216,1.58622 0.11001,3.08535 -0.0937,5.40625 -0.0561,0.63905 -0.0252,1.43049 -0.125,1.9375 -0.99625,5.08625 -6.9825,13.96625 -9.65625,21.59375 0,0 -8.95,23.24625 -11.78125,46.84375 -2.76549,23.04659 -5.1366,59.75993 -5.25,61.53125 l 23,0 c 0.87024,-4.36333 2.52691,-10.94722 7.15625,-21.96875 7.435,-17.70125 21.355,-33.45125 27.25,-62.6875 2.8725,-14.27 5.4225,-37.815 9.1875,-46.71875 0.0836,-0.19753 0.16672,-0.3363 0.25,-0.53125 0.10793,-0.25265 0.20509,-0.43893 0.3125,-0.6875 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_forearm_back');
  var left_arm_back = back.path("m 284.96875,207.90906 c -10.88181,5.64157 -22.3239,16.97879 -28.5625,43.6875 -8.375,35.8725 -5.65625,48.5 -5.65625,48.5 0,0 -14.3875,29.25125 -12.03125,60.90625 0,0 -0.0727,1.81055 -0.0625,2.5625 0.92253,-0.43257 1.87717,-0.92081 2.78125,-1.3125 2.09568,-0.90796 4.14161,-1.67423 6.15625,-2.3125 2.01464,-0.63827 4.00979,-1.13886 5.96875,-1.4375 1.95895,-0.29864 3.88388,-0.42343 5.8125,-0.3125 1.92861,0.11093 3.85762,0.47205 5.78125,1.0625 1.92363,0.59045 3.86851,1.4226 5.8125,2.5625 1.94399,1.1399 3.8853,2.58445 5.875,4.34375 0.67495,0.5968 1.38033,1.45154 2.0625,2.125 6.87128,-15.902 12.67798,-23.78655 16.125,-57.125 0.12597,-1.21841 0.24772,-2.46339 0.375,-3.65625 0.0739,-5.78275 0.15218,-11.59473 0.125,-17.5 -0.0343,-7.4554 -0.16659,-14.98081 -0.53125,-22.46875 -0.36466,-7.48794 -0.95995,-14.9424 -1.84375,-22.28125 -0.4419,-3.66943 -0.95541,-7.30815 -1.5625,-10.90625 -0.60709,-3.5981 -1.29787,-7.15218 -2.09375,-10.65625 -0.79588,-3.50407 -1.67923,-6.95641 -2.6875,-10.34375 -0.55005,-1.84793 -1.22506,-3.62953 -1.84375,-5.4375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'left_arm_back');
  var neck_back = back.path("m 335.75,189.06531 c 0.46089,0.12414 0.91295,0.25277 1.375,0.375 3.66287,0.96897 7.37668,1.85394 11.125,2.65625 3.74832,0.80231 7.54981,1.50961 11.40625,2.0625 3.85644,0.55289 7.76279,0.96679 11.75,1.1875 3.98721,0.22071 8.04687,0.25674 12.1875,0.0625 4.14063,-0.19424 8.37079,-0.62054 12.6875,-1.3125 4.31671,-0.69196 8.73456,-1.66506 13.25,-2.9375 1.83419,-0.51687 3.75539,-1.31525 5.625,-1.9375 -6.87721,-5.54873 -13.40625,-10.9375 -13.40625,-10.9375 -1.68812,-1.40367 -2.0209,-8.30668 -2.03125,-13.6875 -4.13952,0.52296 -8.20307,0.95707 -12.1875,1.21875 -4.36275,0.28652 -8.66893,0.42592 -12.96875,0.40625 -4.29982,-0.0197 -8.60327,-0.21276 -12.96875,-0.53125 -3.49622,-0.25507 -7.0749,-0.65127 -10.6875,-1.09375 -7e-4,5.38227 -0.31114,12.28321 -2,13.6875 0,0 -6.36193,5.29437 -13.15625,10.78125 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'neck_back');
  var head_back = back.path("m 350.90625,164.59656 c 3.6126,0.44248 7.19128,0.83868 10.6875,1.09375 4.36548,0.31849 8.66893,0.51158 12.96875,0.53125 4.29982,0.0197 8.606,-0.11973 12.96875,-0.40625 3.98443,-0.26168 8.04798,-0.69579 12.1875,-1.21875 -2.9e-4,-0.15159 -0.0315,-0.31977 -0.0312,-0.46875 6.51363,-4.33163 10.43046,-9.45532 12.34375,-14.875 1.45615,-4.12517 2.68897,-9.84591 3.65625,-15.28125 1.09096,0.22124 2.22601,-0.14274 3.25,-0.84375 0.0689,-0.0472 0.15085,-0.0747 0.21875,-0.125 0.0829,-0.0566 0.16865,-0.12648 0.25,-0.1875 0.0112,-0.009 0.02,-0.022 0.0312,-0.0312 0.97201,-0.7384 1.84067,-1.77717 2.4375,-2.9375 0.18696,-0.36158 0.33562,-0.71656 0.46875,-1.09375 0.61375,-1.7375 0.82969,-3.28469 1.3125,-5.125 0.24075,-0.91204 0.56856,-1.90626 1.03125,-3.03125 0.003,-0.008 -0.003,-0.0232 0,-0.0312 0.4693,-1.13699 1.10063,-2.39313 1.96875,-3.875 0.21236,-0.36186 0.39021,-0.73431 0.5625,-1.09375 0.004,-0.009 -0.004,-0.0225 0,-0.0312 0.52591,-1.10261 0.86858,-2.17504 1.0625,-3.21875 0.58378,-3.122 -0.16424,-5.86522 -1.34375,-7.5 -0.005,-0.006 0.005,-0.0249 0,-0.0312 -0.27012,-0.37111 -0.57047,-0.6595 -0.875,-0.90625 -0.14872,-0.12192 -0.28438,-0.22313 -0.4375,-0.3125 -0.24423,-0.14317 -0.48376,-0.25408 -0.75,-0.34375 -0.5023,-0.17431 -1.03389,-0.25292 -1.5625,-0.28125 -0.26992,-0.0119 -0.54961,-0.0144 -0.8125,0 -0.52453,0.0259 -1.02738,0.10258 -1.46875,0.1875 -0.4423,0.0872 -0.84,0.19875 -1.125,0.28125 -0.004,0.0594 0.004,0.0374 0,0.0937 -0.0188,0.005 -0.0443,0.0262 -0.0625,0.0312 0.0826,-1.28521 0.16699,-3.08685 0.125,-5.625002 0,-4.38875 -0.43375,-8.48875 -1.25,-12.3125 -2.36435,-12.24875 -8.8475,-26.71125 -25.84375,-32.4375 -5.48625,-1.855 -11.03875,-2.76 -16.4375,-2.8125 -0.285,-0.0125 -0.55625,-0.03125 -0.84375,-0.03125 -0.285,0 -0.5875,0.01875 -0.875,0.03125 -5.39875,0.0525 -10.945,0.9575 -16.4375,2.8125 -16.99,5.72625 -23.48125,20.18875 -25.84375,32.4375 -0.8175,3.82375 -1.25375,7.92375 -1.25,12.3125 -0.0471,2.707872 0.0323,4.521012 0.125,5.781252 -0.32243,-0.0943 -0.77584,-0.19162 -1.28125,-0.28125 -0.51781,-0.0855 -1.11437,-0.15625 -1.71875,-0.15625 -0.925,0 -1.87125,0.14875 -2.6875,0.625 -0.30672,0.17937 -0.59086,0.413 -0.875,0.71875 -0.28403,0.30541 -0.57113,0.67828 -0.8125,1.09375 -0.36231,0.62408 -0.6648,1.36044 -0.875,2.1875 -0.07,0.2753 -0.1082,0.54992 -0.15625,0.84375 -0.002,0.0102 0.002,0.0211 0,0.0312 -0.0457,0.28445 -0.10216,0.57514 -0.125,0.875 -0.0501,0.63093 -0.035,1.28179 0.0312,1.96875 0.0595,0.61457 0.17507,1.22818 0.34375,1.875 0.0165,0.0635 0.0137,0.1238 0.0312,0.1875 0.10063,0.36659 0.23539,0.72027 0.375,1.09375 0.13583,0.36305 0.26228,0.72614 0.4375,1.09375 0.17966,0.3799 0.36936,0.74243 0.59375,1.125 0.43453,0.74094 0.83278,1.41658 1.15625,2.0625 0.32385,0.6467 0.57774,1.24405 0.8125,1.8125 1.17948,2.84858 1.37148,4.78854 1.9375,6.875 0.028,0.10378 0.0637,0.20801 0.0937,0.3125 0.0913,0.31669 0.16507,0.64041 0.28125,0.96875 0.13266,0.37719 0.31286,0.76281 0.5,1.125 0.37429,0.72438 0.83438,1.40917 1.375,2 0.539,0.58819 1.14475,1.08095 1.78125,1.4375 0.15953,0.0898 0.33707,0.17851 0.5,0.25 0.46851,0.20556 0.95806,0.31413 1.4375,0.34375 0.0208,0.001 0.0417,-9.2e-4 0.0625,0 0.32257,0.0108 0.65133,-0.0104 0.96875,-0.0937 0.96404,5.398 2.18191,11.06309 3.625,15.15625 1.86202,5.26793 5.62356,10.24671 11.8125,14.5 7e-5,0.0115 -7e-5,0.0197 0,0.0312 0.001,0.25385 -0.0312,0.55045 -0.0312,0.8125 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'head_back');
   var back = back.path("m 335.75,189.06531 c -3.33749,2.69525 -6.82504,5.52626 -9.625,7.625 -2.93113,2.19846 -5.63626,3.15654 -8.25,3.65625 l -2.28125,0 c -4.23962,0.51149 -8.33906,0.16365 -12.8125,1.34375 -2.20608,0.58194 -5.03447,1.40987 -7.75,2.21875 -3.17004,0.94426 -6.58978,2.1996 -10.0625,4 0.61869,1.80797 1.2937,3.58957 1.84375,5.4375 1.00827,3.38734 1.89162,6.83968 2.6875,10.34375 0.79588,3.50407 1.48666,7.05815 2.09375,10.65625 0.60709,3.5981 1.1206,7.23682 1.5625,10.90625 0.8838,7.33885 1.47909,14.79331 1.84375,22.28125 0.36466,7.48794 0.49693,15.01335 0.53125,22.46875 0.0272,5.90527 -0.0511,11.71725 -0.125,17.5 0.10553,-0.98901 0.21786,-1.91145 0.3125,-3.03125 -0.87625,10.35125 0.79125,24.52 2.375,35.40625 0.0455,0.31313 0.36474,1.94339 0.4375,2.375 1.61228,9.5634 9.29388,45.64517 7.46875,52.65625 -2.27125,8.70625 -7.26625,24.7325 -5.9375,35.125 0,0 -2.58575,6.26394 -5.3125,15.375 l 160.46875,0 c -2.71512,-9.10506 -5.28125,-15.375 -5.28125,-15.375 1.33125,-10.3925 -3.635,-26.41875 -5.90625,-35.125 -1.80227,-6.93234 5.61148,-41.99695 7.34375,-52.0625 0.0987,-0.57375 0.47422,-2.57771 0.53125,-2.96875 1.13854,-7.81985 2.30341,-17.29928 2.5625,-25.875 l 0,-2.46875 -0.0625,-0.59375 c -0.0193,-1.30077 -0.0141,-2.65867 -0.0312,-3.96875 -0.0211,-0.83495 0.003,-1.72754 -0.0625,-2.5 0.0156,0.18512 0.0451,0.33732 0.0625,0.5 -0.0639,-5.34029 -0.15005,-10.68369 -0.125,-16.125 0.0343,-7.4554 0.19784,-14.94956 0.5625,-22.4375 0.36466,-7.48794 0.9287,-14.9424 1.8125,-22.28125 0.4419,-3.66943 0.95541,-7.3394 1.5625,-10.9375 0.60709,-3.5981 1.29787,-7.15218 2.09375,-10.65625 0.79588,-3.50407 1.71048,-6.95641 2.71875,-10.34375 0.45951,-1.54375 1.02406,-3.01518 1.53125,-4.53125 -3.48061,-1.74807 -6.90759,-2.95681 -10.0625,-3.875 -2.51816,-0.73287 -5.18567,-1.54899 -7.25,-2.09375 -4.47628,-1.1801 -8.57351,-0.83226 -12.8125,-1.34375 l -1.65625,0 c -2.60546,-0.49971 -5.28718,-1.45779 -8.21875,-3.65625 -2.73595,-2.05136 -6.10926,-4.83385 -9.375,-7.46875 -1.86961,0.62225 -3.79081,1.42063 -5.625,1.9375 -4.51544,1.27244 -8.93329,2.24554 -13.25,2.9375 -4.31671,0.69196 -8.54687,1.11826 -12.6875,1.3125 -4.14063,0.19424 -8.20029,0.15821 -12.1875,-0.0625 -3.98721,-0.22071 -7.89356,-0.63461 -11.75,-1.1875 -3.85644,-0.55289 -7.65793,-1.26019 -11.40625,-2.0625 -3.74832,-0.80231 -7.46213,-1.68728 -11.125,-2.65625 -0.46205,-0.12223 -0.91411,-0.25086 -1.375,-0.375 z").attr(attr).transform("t-184.52135,-50.34656").data('id', 'back');

  bodyMap['lb_back'].push(head_back, neck_back, back, left_buttock, right_buttock, right_arm_back, right_forearm_back, right_hand_back, left_arm_back, left_forearm_back, left_hand_back, right_upper_leg_back, right_lower_leg_back, right_foot_back, left_upper_leg_back, left_lower_leg_back, left_foot_back);
  
  
  var front = Raphael('rule_9_front', bodyWidth, bodyHeight);
  front.setViewBox(0, 0, 1, svgHeight);
  bodyMap['rule_9_front'] = front.set();

  var right_arm_front = front.path("m 377.17411,126.7662 c -13.10342,3.90312 -30.39547,12.45522 -38.625,47.6875 -8.375,35.8725 -5.65625,48.5 -5.65625,48.5 0,0 -14.3875,29.25125 -12.03125,60.90625 0,0 0.1441,4.54762 -0.15625,7.96875 -0.0561,0.63905 -0.0252,1.43049 -0.125,1.9375 -0.99625,5.08625 -6.9825,13.96625 -9.65625,21.59375 0,0 -8.95,23.24625 -11.78125,46.84375 -2.7655,23.04659 -5.13661,59.75993 -5.25,61.53125 -0.003,0.0429 -0.0625,1.0625 -0.0625,1.0625 -3.02125,8.8025 -7.125,18.72375 -10.15625,24.75 -6.39875,12.70375 -10.27125,21.95875 -11.6875,28.6875 -1.415,6.725 -4.25375,32.9075 -5.3125,38.21875 0,0 -0.355,3.89125 3.1875,4.25 3.53875,0.3525 8.8575,-2.11625 9.09375,-16.28125 0,0 2.37375,-14.635 2.84375,-18.65625 0.47125,-4.01 14.87,-20.06 17.46875,-22.65625 2.59625,-2.5975 7.78,-2.93875 9.90625,5.4375 1.69,6.675 2.825,20.795 7.78125,22.4375 0,0 6.385,2.83375 4.96875,-5.65625 -1.16,-6.96875 -1.63625,-16.65875 -2.125,-30.125 -0.3525,-9.71625 -1.07625,-21.58625 -3.90625,-26.1875 0,0 0.47257,-2.63681 1,-5.28125 0.87024,-4.36333 2.52691,-10.94722 7.15625,-21.96875 7.435,-17.70125 21.355,-33.45125 27.25,-62.6875 2.8725,-14.27 5.4225,-37.815 9.1875,-46.71875 0.0836,-0.19753 0.16672,-0.3363 0.25,-0.53125 7.01251,-16.41552 12.9366,-23.95292 16.4375,-57.8125 l 0,-107.25 z").attr(attr).transform("t-266.66421,26.7963").data('id', 'right_arm_front');
  var groin = front.path("m 461.21526,455.6412 c 0.54457,-0.21041 1.10692,-0.37459 1.625,-0.65625 0.94523,-0.5139 1.84685,-1.14499 2.6875,-1.875 0.84065,-0.73001 1.62887,-1.54986 2.34375,-2.46875 0.71488,-0.91889 1.33832,-1.91945 1.90625,-3 0.56793,-1.08055 1.06895,-2.25376 1.46875,-3.46875 0.3998,-1.21499 0.69576,-2.4903 0.90625,-3.8125 0.21049,-1.3222 0.34375,-2.69157 0.34375,-4.09375 0,-1.40218 -0.13326,-2.77155 -0.34375,-4.09375 -0.21049,-1.3222 -0.50645,-2.59751 -0.90625,-3.8125 -0.3998,-1.21499 -0.90082,-2.35695 -1.46875,-3.4375 -0.56793,-1.08055 -1.19137,-2.08111 -1.90625,-3 -0.71488,-0.91889 -1.5031,-1.76999 -2.34375,-2.5 -0.84065,-0.73001 -1.74227,-1.3611 -2.6875,-1.875 -0.94523,-0.5139 -1.94011,-0.91694 -2.96875,-1.1875 -1.02864,-0.27056 -2.09663,-0.40625 -3.1875,-0.40625 -1.09087,0 -2.15886,0.13569 -3.1875,0.40625 -1.02864,0.27056 -2.02352,0.6736 -2.96875,1.1875 -0.94523,0.5139 -1.84685,1.14499 -2.6875,1.875 -0.84065,0.73001 -1.62887,1.58111 -2.34375,2.5 -0.71488,0.91889 -1.33832,1.91945 -1.90625,3 -0.56793,1.08055 -1.06895,2.22251 -1.46875,3.4375 -0.3998,1.21499 -0.69576,2.4903 -0.90625,3.8125 -0.21049,1.3222 -0.34375,2.69157 -0.34375,4.09375 0,1.40218 0.13326,2.77155 0.34375,4.09375 0.21049,1.3222 0.50645,2.59751 0.90625,3.8125 0.3998,1.21499 0.90082,2.3882 1.46875,3.46875 0.56793,1.08055 1.19137,2.08111 1.90625,3 0.71488,0.91889 1.5031,1.73874 2.34375,2.46875 0.84065,0.73001 1.74227,1.3611 2.6875,1.875 0.53866,0.29286 1.12027,0.47177 1.6875,0.6875 4.9e-4,-0.0309 -4.8e-4,-0.0628 0,-0.0937 0,0 2.245,0.345 4.9375,0.3125 2.21099,0.0267 3.45297,-0.16804 4.0625,-0.25 z").attr(attr).transform("t-266.66421,26.7963").data('id', 'groin');
  var right_leg_front = front.path("m 371.83036,390.6412 c -0.47959,3.39256 -0.86963,6.84956 -1.0625,10.40625 -0.9475,17.38125 -3.53125,50.28125 -3.53125,50.28125 0,0 -0.94375,23.60875 -2.3125,47.40625 -2.6075,45.23625 10.625,103.0625 10.625,103.0625 0,0 4.2375,18.05375 3.53125,25.84375 -0.40999,4.49756 -0.89567,9.49298 -1.28125,14.59375 -0.28216,3.73259 -0.57061,7.50932 -0.4375,11.25 0.31125,8.84 -0.0425,12.3975 -1.8125,21.25 -1.7675,8.8525 -4.43,43.14375 -3.84375,60.75 0,0 9.26125,71.2725 11.09375,93.25 2.1225,25.485 -2.46125,28.00625 -3.53125,34.4375 -0.30442,1.83255 -0.44982,3.6758 -0.625,5.53125 -0.36719,3.88919 -0.73888,7.53064 -2.09375,9.125 0,0 -2.94,6.125 -11.4375,14.625 -8.4975,8.4925 -17.46875,19.8125 -17.46875,19.8125 0,0 -2.365,1.78125 -4.84375,2.84375 -2.47625,1.0625 -6.96,3.74626 -5.3125,8.5 1.24875,3.605 3.90625,3.90625 3.90625,3.90625 0,0 2.83375,4.6 7.4375,3.1875 0,0 2.99375,3.16875 9.1875,1.40625 0,0 1.41625,2.11875 4.78125,2.46875 3.36125,0.3512 5.65625,-1.21875 5.65625,-1.21875 0,0 1.12625,3.875 8.09375,3.875 6.44,0 9.62375,-1.9225 11.21875,-9.1875 0,0 4.95,-0.18005 8.84375,-4.78125 3.8975,-4.60254 4.24875,-9.57 6.375,-13.46875 2.1225,-3.90125 1.43375,-6.01375 7.09375,-12.03125 5.6675,-6.01375 3.17875,-15.2325 2.46875,-26.5625 0,0 1.66297,-2.97672 1.65625,-8.90625 -0.004,-3.11865 -0.31861,-6.80982 -1.90625,-11.84375 0,0 -0.47125,-24.09625 4.25,-52.40625 4.72,-28.3325 9.925,-42.9575 11.8125,-63.71875 1.88875,-20.7725 3.94,-41.54125 0.46875,-56.59375 0,0 -1.40375,-6.90875 0.71875,-14.6875 0.98062,-3.59946 2.4257,-8.98281 3.75,-14.96875 1.54545,-6.98556 2.93216,-14.89228 3.3125,-23.28125 0.71,-15.58 4.25875,-43.1775 4.96875,-71.5 0,0 9.90312,-51.63083 10.625,-97.625 -0.56723,-0.21573 -1.14884,-0.39464 -1.6875,-0.6875 -0.94523,-0.5139 -1.84685,-1.14499 -2.6875,-1.875 -0.84065,-0.73001 -1.62887,-1.54986 -2.34375,-2.46875 -0.71488,-0.91889 -1.33832,-1.91945 -1.90625,-3 -0.56793,-1.08055 -1.06895,-2.25376 -1.46875,-3.46875 -0.2428,-0.73788 -0.39218,-1.53313 -0.5625,-2.3125 L 371.83036,390.6412 z").attr(attr).transform("t-266.66421,26.7963").data('id', 'right_leg_front');
  var left_leg_front = front.path("m 542.04911,388.17245 -70.0625,52.78125 c -0.20048,1.10244 -0.41282,2.19406 -0.75,3.21875 -0.3998,1.21499 -0.90082,2.3882 -1.46875,3.46875 -0.56793,1.08055 -1.19137,2.08111 -1.90625,3 -0.71488,0.91889 -1.5031,1.73874 -2.34375,2.46875 -0.84065,0.73001 -1.74227,1.3611 -2.6875,1.875 -0.51808,0.28166 -1.08043,0.44584 -1.625,0.65625 0.13137,-0.0177 0.875,-0.0625 0.875,-0.0625 0.7075,46.0175 10.625,97.71875 10.625,97.71875 0.70625,28.3225 4.25875,55.92 4.96875,71.5 0.36737,8.10298 1.69672,15.86225 3.1875,22.6875 1.37516,6.29589 2.88782,11.81984 3.90625,15.5625 2.125,7.77875 0.6875,14.6875 0.6875,14.6875 -3.4675,15.0525 -1.42125,35.82125 0.46875,56.59375 1.8875,20.76125 7.0925,35.38625 11.8125,63.71875 4.72125,28.31 4.25,52.40625 4.25,52.40625 -1.63235,5.17567 -1.93224,8.93991 -1.90625,12.09375 0.0473,5.74583 1.65625,8.65625 1.65625,8.65625 -0.70875,11.33 -3.16125,20.54875 2.5,26.5625 5.66625,6.0175 4.94,8.13 7.0625,12.03125 2.125,3.89875 2.48,8.86621 6.375,13.46875 3.89625,4.6012 8.84375,4.78125 8.84375,4.78125 1.595,7.265 4.78125,9.1875 11.21875,9.1875 6.96875,0 8.09375,-3.875 8.09375,-3.875 0,0 2.29625,1.56995 5.65625,1.21875 3.36625,-0.35 4.78125,-2.46875 4.78125,-2.46875 6.19625,1.7625 9.21875,-1.40625 9.21875,-1.40625 4.60375,1.4125 7.4375,-3.1875 7.4375,-3.1875 0,0 2.45625,-0.37875 3.875,-3.90625 1.4125,-3.55124 -2.8325,-7.4375 -5.3125,-8.5 -2.47625,-1.0625 -4.84375,-2.84375 -4.84375,-2.84375 0,0 -8.94125,-11.32 -17.4375,-19.8125 -8.5,-8.5 -11.46875,-14.625 -11.46875,-14.625 -1.26992,-1.49533 -1.65536,-4.80371 -2,-8.40625 -0.19813,-2.0711 -0.3747,-4.17886 -0.71875,-6.25 -1.07,-6.43125 -5.65375,-8.9525 -3.53125,-34.4375 1.83375,-21.9775 11.09375,-93.25 11.09375,-93.25 0.5925,-17.60625 -2.04375,-51.8975 -3.8125,-60.75 -1.77125,-8.8525 -2.12375,-12.41 -1.8125,-21.25 0.14479,-4.02117 -0.10757,-8.09346 -0.4375,-12.09375 -0.3964,-4.80625 -0.92706,-9.49922 -1.3125,-13.75 -0.70625,-7.79 3.5625,-25.84375 3.5625,-25.84375 0,0 13.20125,-57.82625 10.59375,-103.0625 -1.37,-23.7975 -2.3125,-47.40625 -2.3125,-47.40625 0,0 -2.585,-32.9 -3.53125,-50.28125 -0.24096,-4.43951 -0.80087,-8.71203 -1.46875,-12.875 z").attr(attr).transform("t-266.66421,26.7963").data('id', 'left_leg_front');
  var left_arm_front = front.path("m 536.61161,126.6412 0,102.21875 c 3.45114,38.96121 9.70733,45.82565 17.1875,63.5 0.20127,0.47597 0.36797,1.3815 0.5625,1.9375 3.44447,9.84478 5.90132,31.27409 8.625,44.78125 5.89375,29.23625 19.84875,44.98625 27.28125,62.6875 6.59113,15.68688 7.63551,23.74633 7.84375,25.65625 0.0267,0.24525 0.28125,1.59375 0.28125,1.59375 -2.83375,4.60125 -3.525,16.47125 -3.875,26.1875 -0.49,13.46625 -0.97,23.15625 -2.125,30.125 -1.4175,8.49 4.9375,5.65625 4.9375,5.65625 4.95625,-1.6425 6.1225,-15.7625 7.8125,-22.4375 2.12625,-8.37625 7.3125,-8.035 9.90625,-5.4375 2.5975,2.59625 16.99375,18.64625 17.46875,22.65625 0.4675,4.02125 2.8125,18.65625 2.8125,18.65625 0.235,14.165 5.5525,16.63375 9.09375,16.28125 3.5425,-0.35875 3.1875,-4.25 3.1875,-4.25 -1.0625,-5.31125 -3.89375,-31.49375 -5.3125,-38.21875 -1.415,-6.72875 -5.29,-15.98375 -11.6875,-28.6875 -2.73641,-5.43562 -6.23394,-14.03087 -9.125,-22.125 -0.31414,-0.8795 -0.70413,-1.76227 -1,-2.625 0,0 -2.51125,-38.98875 -5.34375,-62.59375 -2.83125,-23.5975 -11.78125,-46.84375 -11.78125,-46.84375 -2.59249,-7.39915 -8.21857,-15.91256 -9.46875,-21.0625 -0.0386,-0.15893 -0.15764,-0.37898 -0.1875,-0.53125 -0.6325,-3.22125 -0.25,-9.90625 -0.25,-9.90625 2.35375,-31.655 -12.0625,-60.90625 -12.0625,-60.90625 0,0 2.72,-12.6275 -5.65625,-48.5 -8.33745,-35.69879 -25.97271,-43.98474 -39.125,-47.8125 z").attr(attr).transform("t-266.66421,26.7963").data('id', 'left_arm_front');
  var head_front = front.path("m 423.45536,107.4537 c 0.1672,0.0884 0.33286,0.2253 0.5,0.3125 3.89566,2.03252 7.76321,3.73874 11.625,5.09375 3.86179,1.35501 7.70334,2.35374 11.53125,3.03125 1.91396,0.33875 3.81326,0.58062 5.71875,0.75 1.90549,0.16938 3.82173,0.28125 5.71875,0.28125 1.89702,0 3.79895,-0.11187 5.6875,-0.28125 1.88855,-0.16938 3.74492,-0.41125 5.625,-0.75 3.76016,-0.67751 7.52371,-1.67624 11.25,-3.03125 3.65383,-1.32867 7.28499,-3.01992 10.90625,-5 -4.54951,-3.73832 -8.125,-6.71875 -8.125,-6.71875 -1.73568,-1.44321 -2.07155,-8.71882 -2.0625,-14.15625 6.51363,-4.33163 10.43046,-9.45532 12.34375,-14.875 1.45615,-4.125169 2.68897,-9.845908 3.65625,-15.28125 1.09096,0.221246 2.22601,-0.142739 3.25,-0.84375 0.0689,-0.0472 0.15085,-0.07468 0.21875,-0.125 0.0829,-0.05657 0.16865,-0.126479 0.25,-0.1875 0.0112,-0.0091 0.02,-0.02204 0.0312,-0.03125 0.97201,-0.738402 1.84067,-1.777168 2.4375,-2.9375 0.18696,-0.361575 0.33562,-0.716562 0.46875,-1.09375 0.61375,-1.7375 0.82969,-3.284687 1.3125,-5.125 0.24075,-0.912041 0.56856,-1.906262 1.03125,-3.03125 0.003,-0.0081 -0.003,-0.02317 0,-0.03125 0.4693,-1.136992 1.10063,-2.393125 1.96875,-3.875 0.21236,-0.361854 0.39021,-0.734306 0.5625,-1.09375 0.004,-0.0087 -0.004,-0.02255 0,-0.03125 0.52591,-1.102605 0.86858,-2.175034 1.0625,-3.21875 0.58378,-3.121996 -0.16424,-5.865221 -1.34375,-7.5 -0.005,-0.0064 0.005,-0.02488 0,-0.03125 -0.27012,-0.371103 -0.57047,-0.659498 -0.875,-0.90625 -0.14872,-0.12192 -0.28438,-0.223125 -0.4375,-0.3125 -0.24423,-0.143169 -0.48376,-0.254077 -0.75,-0.34375 -0.5023,-0.174304 -1.03389,-0.25292 -1.5625,-0.28125 -0.26992,-0.0119 -0.54961,-0.01445 -0.8125,0 -0.52453,0.02594 -1.02738,0.102578 -1.46875,0.1875 -0.4423,0.08715 -0.84,0.19875 -1.125,0.28125 -0.004,0.0594 0.004,0.03744 0,0.09375 -0.0188,0.0051 -0.0443,0.02618 -0.0625,0.03125 0.0826,-1.285211 0.16699,-3.086847 0.125,-5.625 0,-4.38875 -0.43375,-8.48875 -1.25,-12.3124995 -2.3643,-12.24875 -8.84745,-26.7112505 -25.8437,-32.4375005 -5.48625,-1.855 -11.03875,-2.76 -16.4375,-2.8125 -0.285,-0.0125 -0.55625,-0.03125 -0.84375,-0.03125 -0.285,0 -0.5875,0.01875 -0.875,0.03125 -5.39875,0.0525 -10.945,0.9575 -16.4375,2.8125 -16.99,5.72625 -23.48125,20.1887505 -25.84375,32.4375005 -0.8175,3.8237495 -1.25375,7.9237495 -1.25,12.3124995 -0.0471,2.70787 0.0323,4.52101 0.125,5.78125 -0.32243,-0.09432 -0.77584,-0.191619 -1.28125,-0.28125 -0.51781,-0.08547 -1.11437,-0.15625 -1.71875,-0.15625 -0.925,0 -1.87125,0.14875 -2.6875,0.625 -0.30672,0.179375 -0.59086,0.412998 -0.875,0.71875 -0.28403,0.30541 -0.57113,0.678281 -0.8125,1.09375 -0.36231,0.624082 -0.6648,1.360446 -0.875,2.1875 -0.07,0.2753 -0.1082,0.549922 -0.15625,0.84375 -0.002,0.01016 0.002,0.02107 0,0.03125 -0.0457,0.284457 -0.10216,0.575143 -0.125,0.875 -0.0501,0.630932 -0.035,1.281791 0.0312,1.96875 0.0595,0.614572 0.17507,1.228186 0.34375,1.875 0.0165,0.06345 0.0137,0.123804 0.0312,0.1875 0.10063,0.366597 0.23539,0.720274 0.375,1.09375 0.13583,0.363057 0.26228,0.726145 0.4375,1.09375 0.17966,0.379904 0.36936,0.742432 0.59375,1.125 0.43453,0.740938 0.83278,1.416584 1.15625,2.0625 0.32385,0.646702 0.57774,1.244053 0.8125,1.8125 1.17948,2.848587 1.37148,4.78854 1.9375,6.875 0.028,0.103786 0.0637,0.208016 0.0937,0.3125 0.0913,0.316691 0.16507,0.640411 0.28125,0.96875 0.13266,0.377188 0.31286,0.76281 0.5,1.125 0.37429,0.72438 0.83438,1.409175 1.375,2 0.539,0.588188 1.14475,1.080952 1.78125,1.4375 0.15953,0.0898 0.33707,0.178513 0.5,0.25 0.46851,0.20556 0.95806,0.314132 1.4375,0.34375 0.0208,0.0013 0.0417,-9.17e-4 0.0625,0 0.32257,0.01082 0.65133,-0.01035 0.96875,-0.09375 0.96404,5.398 2.18191,11.06309 3.625,15.15625 1.86202,5.26793 5.62356,10.24671 11.8125,14.5 7e-5,0.0115 -7e-5,0.0197 0,0.0312 0.0318,5.46771 -0.26016,13.02734 -2.03125,14.5 0,0 -3.45449,2.90317 -7.59375,6.3125 z").attr(attr).transform("t-266.66421,26.7963").data('id', 'head_front');
   var chest = front.path("m 423.45536,107.4537 c -4.79,3.94532 -10.62777,8.67597 -15.1875,12.09375 -2.93113,2.19846 -5.63626,3.15654 -8.25,3.65625 l -2.28125,0 c -4.23962,0.51149 -8.33906,0.16365 -12.8125,1.34375 -2.20608,0.58194 -5.03447,1.40987 -7.75,2.21875 l 0,107.25 c 0.23042,-2.22859 0.47871,-4.21708 0.6875,-6.6875 -0.87625,10.35125 0.79125,24.52 2.375,35.40625 0.0455,0.31313 0.36474,1.94339 0.4375,2.375 0.29215,-0.17439 0.58297,-0.39004 0.875,-0.5625 3.66331,-2.16334 7.29138,-4.17239 10.9375,-6.03125 3.64612,-1.85886 7.30751,-3.57162 10.9375,-5.125 3.62999,-1.55338 7.22882,-2.94062 10.84375,-4.1875 3.61493,-1.24688 7.24283,-2.34188 10.84375,-3.28125 3.60092,-0.93937 7.19327,-1.7129 10.78125,-2.34375 3.58798,-0.63085 7.17389,-1.11618 10.75,-1.4375 3.57611,-0.32132 7.15346,-0.48922 10.71875,-0.5 3.56529,-0.0108 7.10071,0.13673 10.65625,0.4375 3.55554,0.30077 7.10939,0.76167 10.65625,1.375 3.54686,0.61333 7.08577,1.3856 10.625,2.3125 3.53923,0.9269 7.09233,2.00851 10.625,3.25 3.53267,1.24149 7.06658,2.63042 10.59375,4.1875 3.52717,1.55708 7.03977,3.28256 10.5625,5.15625 3.52273,1.87369 7.04314,3.90244 10.5625,6.09375 0.62417,0.38863 1.25092,0.85136 1.875,1.25 0.0987,-0.57375 0.47422,-2.57771 0.53125,-2.96875 1.13854,-7.81985 2.30341,-17.29928 2.5625,-25.875 l 0,-3.5625 c -0.008,-2.04652 -3.5e-4,-4.12445 -0.15625,-5.96875 0.0478,0.56561 0.10731,0.97873 0.15625,1.53125 l 0,-102.21875 c -2.51816,-0.73287 -5.18567,-1.54899 -7.25,-2.09375 -4.47628,-1.1801 -8.57351,-0.83226 -12.8125,-1.34375 l -1.65625,0 c -2.60546,-0.49971 -5.28718,-1.45779 -8.21875,-3.65625 -4.30129,-3.22502 -9.99282,-7.85557 -14.65625,-11.6875 -3.62126,1.98008 -7.25242,3.67133 -10.90625,5 -3.72629,1.35501 -7.48984,2.35374 -11.25,3.03125 -1.88008,0.33875 -3.73645,0.58062 -5.625,0.75 -1.88855,0.16938 -3.79048,0.28125 -5.6875,0.28125 -1.89702,0 -3.81326,-0.11187 -5.71875,-0.28125 -1.90549,-0.16938 -3.80479,-0.41125 -5.71875,-0.75 -3.82791,-0.67751 -7.66946,-1.67624 -11.53125,-3.03125 -3.86179,-1.35501 -7.72934,-3.06123 -11.625,-5.09375 -0.16714,-0.0872 -0.3328,-0.22405 -0.5,-0.3125 z").attr(attr).transform("t-266.66421,26.7963").data('id', 'chest');
  
     var abdomen = front.path("m 457.37151,241.6412 c -3.56529,0.0108 -7.14264,0.17868 -10.71875,0.5 -3.57611,0.32132 -7.16202,0.80665 -10.75,1.4375 -3.58798,0.63085 -7.18033,1.40438 -10.78125,2.34375 -3.60092,0.93937 -7.22882,2.03437 -10.84375,3.28125 -3.61493,1.24688 -7.21376,2.63412 -10.84375,4.1875 -3.62999,1.55338 -7.29138,3.26614 -10.9375,5.125 -3.64612,1.85886 -7.27419,3.86791 -10.9375,6.03125 -0.29203,0.17246 -0.58285,0.38811 -0.875,0.5625 1.61228,9.5634 9.29388,45.64517 7.46875,52.65625 -2.27125,8.70625 -7.26625,24.7325 -5.9375,35.125 0,0 -7.41683,16.82408 -10.375,37.75 l 69.71875,51.21875 c -0.11013,-0.50394 -0.26109,-0.98079 -0.34375,-1.5 -0.21049,-1.3222 -0.34375,-2.69157 -0.34375,-4.09375 0,-1.40218 0.13326,-2.77155 0.34375,-4.09375 0.21049,-1.3222 0.50645,-2.59751 0.90625,-3.8125 0.3998,-1.21499 0.90082,-2.35695 1.46875,-3.4375 0.56793,-1.08055 1.19137,-2.08111 1.90625,-3 0.71488,-0.91889 1.5031,-1.76999 2.34375,-2.5 0.84065,-0.73001 1.74227,-1.3611 2.6875,-1.875 0.94523,-0.5139 1.94011,-0.91694 2.96875,-1.1875 1.02864,-0.27056 2.09663,-0.40625 3.1875,-0.40625 1.09087,0 2.15886,0.13569 3.1875,0.40625 1.02864,0.27056 2.02352,0.6736 2.96875,1.1875 0.94523,0.5139 1.84685,1.14499 2.6875,1.875 0.84065,0.73001 1.62887,1.58111 2.34375,2.5 0.71488,0.91889 1.33832,1.91945 1.90625,3 0.56793,1.08055 1.06895,2.22251 1.46875,3.4375 0.3998,1.21499 0.69576,2.4903 0.90625,3.8125 0.21049,1.3222 0.34375,2.69157 0.34375,4.09375 0,1.40218 -0.13326,2.77155 -0.34375,4.09375 -0.033,0.2071 -0.11902,0.38901 -0.15625,0.59375 l 70.0625,-52.78125 c -3.16759,-19.74392 -9.96875,-35.28125 -9.96875,-35.28125 1.33125,-10.3925 -3.635,-26.41875 -5.90625,-35.125 -1.80227,-6.93234 5.61148,-41.99695 7.34375,-52.0625 -0.62408,-0.39864 -1.25083,-0.86137 -1.875,-1.25 -3.51936,-2.19131 -7.03977,-4.22006 -10.5625,-6.09375 -3.52273,-1.87369 -7.03533,-3.59917 -10.5625,-5.15625 -3.52717,-1.55708 -7.06108,-2.94601 -10.59375,-4.1875 -3.53267,-1.24149 -7.08577,-2.3231 -10.625,-3.25 -3.53923,-0.9269 -7.07814,-1.69917 -10.625,-2.3125 -3.54686,-0.61333 -7.10071,-1.07423 -10.65625,-1.375 -3.55554,-0.30077 -7.09096,-0.44828 -10.65625,-0.4375 z").attr(attr).transform("t-266.66421,26.7963").data('id', 'abdomen');

  bodyMap['rule_9_front'].push(head_front, right_arm_front, left_arm_front, right_leg_front, groin, left_leg_front, chest, abdomen);

    var back = Raphael('rule_9_back', bodyWidth, bodyHeight);
  back.setViewBox(0, 0, 1, svgHeight);
  bodyMap['rule_9_back'] = back.set();

  var right_arm_back = back.path("m 436.61161,246.6412 0,102.21875 c 3.45114,38.96121 9.70733,45.82565 17.1875,63.5 0.20127,0.47597 0.36797,1.3815 0.5625,1.9375 3.44447,9.84478 5.90132,31.27409 8.625,44.78125 5.89375,29.23625 19.84875,44.98625 27.28125,62.6875 6.59113,15.68688 7.63551,23.74633 7.84375,25.65625 0.0267,0.24525 0.28125,1.59375 0.28125,1.59375 -2.83375,4.60125 -3.525,16.47125 -3.875,26.1875 -0.49,13.46625 -0.97,23.15625 -2.125,30.125 -1.4175,8.49 4.9375,5.65625 4.9375,5.65625 4.95625,-1.6425 6.1225,-15.7625 7.8125,-22.4375 2.12625,-8.37625 7.3125,-8.035 9.90625,-5.4375 2.5975,2.59625 16.99375,18.64625 17.46875,22.65625 0.4675,4.02125 2.8125,18.65625 2.8125,18.65625 0.235,14.165 5.5525,16.63375 9.09375,16.28125 3.5425,-0.35875 3.1875,-4.25 3.1875,-4.25 -1.0625,-5.31125 -3.89375,-31.49375 -5.3125,-38.21875 -1.415,-6.72875 -5.29,-15.98375 -11.6875,-28.6875 -2.73641,-5.43562 -6.23394,-14.03087 -9.125,-22.125 -0.31414,-0.8795 -0.70413,-1.76227 -1,-2.625 0,0 -2.51125,-38.98875 -5.34375,-62.59375 -2.83125,-23.5975 -11.78125,-46.84375 -11.78125,-46.84375 -2.59249,-7.39915 -8.21857,-15.91256 -9.46875,-21.0625 -0.0386,-0.15893 -0.15764,-0.37898 -0.1875,-0.53125 -0.6325,-3.22125 -0.25,-9.90625 -0.25,-9.90625 2.35375,-31.655 -12.0625,-60.90625 -12.0625,-60.90625 0,0 2.72,-12.6275 -5.65625,-48.5 -8.33745,-35.69879 -25.97271,-43.98474 -39.125,-47.8125 z").attr(attr).transform("t-166.66421,-93.2038").data('id', 'right_arm_back');
  var right_leg_back = back.path("m 362.14286,576.79745 c 0.0392,0.86498 0.0714,1.73167 0.0937,2.59375 1.16475,45.01834 10.46875,93.90625 10.46875,93.90625 0.70625,28.3225 4.25875,55.92 4.96875,71.5 0.36737,8.10298 1.69672,15.86225 3.1875,22.6875 1.37516,6.29589 2.88782,11.81984 3.90625,15.5625 2.125,7.77875 0.6875,14.6875 0.6875,14.6875 -3.4675,15.0525 -1.42125,35.82125 0.46875,56.59375 1.8875,20.76125 7.0925,35.38625 11.8125,63.71875 4.72125,28.31 4.25,52.40625 4.25,52.40625 -1.63235,5.17567 -1.93224,8.93991 -1.90625,12.09375 0.0473,5.74583 1.65625,8.65625 1.65625,8.65625 -0.70875,11.33 -3.16125,20.5488 2.5,26.5625 5.66625,6.0175 4.94,8.13 7.0625,12.0313 2.125,3.8987 2.48,8.8662 6.375,13.4687 3.89625,4.6012 8.84375,4.7813 8.84375,4.7813 1.595,7.265 4.78125,9.1875 11.21875,9.1875 6.96875,0 8.09375,-3.875 8.09375,-3.875 0,0 2.29625,1.5699 5.65625,1.2187 3.36625,-0.35 4.78125,-2.4687 4.78125,-2.4687 6.19625,1.7625 9.21875,-1.4063 9.21875,-1.4063 4.60375,1.4125 7.4375,-3.1875 7.4375,-3.1875 0,0 2.45625,-0.3787 3.875,-3.9062 1.4125,-3.5513 -2.8325,-7.4375 -5.3125,-8.5 -2.47625,-1.0625 -4.84375,-2.8438 -4.84375,-2.8438 0,0 -8.94125,-11.32 -17.4375,-19.8125 -8.5,-8.5 -11.46875,-14.625 -11.46875,-14.625 -1.26992,-1.49533 -1.65536,-4.80371 -2,-8.40625 -0.19813,-2.0711 -0.3747,-4.17886 -0.71875,-6.25 -1.07,-6.43125 -5.65375,-8.9525 -3.53125,-34.4375 1.83375,-21.9775 11.09375,-93.25 11.09375,-93.25 0.5925,-17.60625 -2.04375,-51.8975 -3.8125,-60.75 -1.77125,-8.8525 -2.12375,-12.41 -1.8125,-21.25 0.14479,-4.02117 -0.10757,-8.09346 -0.4375,-12.09375 -0.3964,-4.80625 -0.92706,-9.49922 -1.3125,-13.75 -0.70625,-7.79 3.5625,-25.84375 3.5625,-25.84375 0,0 13.20125,-57.82625 10.59375,-103.0625 -1.37,-23.7975 -2.3125,-47.40625 -2.3125,-47.40625 0,0 -0.79792,-11.61127 -1.25,-17.59375 -0.55885,-7.39541 -1.04263,-14.54872 -1.53125,-21.75 -0.0163,1.06056 0.081,2.22488 0.0312,3.25 -0.16441,3.39069 -0.51927,6.58349 -1.03125,9.59375 -0.51198,3.01026 -1.16794,5.85894 -2,8.5 -0.83206,2.64106 -1.84412,5.09191 -2.96875,7.375 -1.12463,2.28309 -2.3603,4.37614 -3.75,6.3125 -1.3897,1.93636 -2.93523,3.71165 -4.5625,5.3125 -1.62727,1.60085 -3.35016,3.03592 -5.1875,4.3125 -1.83734,1.27658 -3.76134,2.38022 -5.78125,3.34375 -2.01991,0.96353 -4.13752,1.77578 -6.3125,2.4375 -2.17498,0.66172 -4.41621,1.19136 -6.71875,1.5625 -2.30254,0.37114 -4.6599,0.59571 -7.0625,0.6875 -2.4026,0.0918 -4.86858,0.0513 -7.34375,-0.125 -2.47517,-0.17633 -4.97977,-0.50429 -7.5,-0.9375 -2.52023,-0.43321 -5.05596,-0.97738 -7.59375,-1.65625 -2.53779,-0.67887 -5.06591,-1.49296 -7.59375,-2.40625 -2.26623,-0.81877 -4.51272,-1.75137 -6.75,-2.75 z").attr(attr).transform("t-166.66421,-93.2038").data('id', 'right_leg_back');
  var left_leg_back = back.path("m 352.14286,576.98495 c -2.22852,0.99396 -4.46173,1.93448 -6.71875,2.75 -2.52761,0.91329 -5.05639,1.72738 -7.59375,2.40625 -2.53736,0.67887 -5.07412,1.22304 -7.59375,1.65625 -2.51963,0.43321 -5.02557,0.76117 -7.5,0.9375 -2.47443,0.17633 -4.94198,0.21679 -7.34375,0.125 -2.40177,-0.0918 -4.76087,-0.31636 -7.0625,-0.6875 -2.30163,-0.37114 -4.54473,-0.90078 -6.71875,-1.5625 -2.17402,-0.66172 -4.26232,-1.47397 -6.28125,-2.4375 -2.01893,-0.96353 -3.94487,-2.06717 -5.78125,-3.34375 -1.83638,-1.27658 -3.59239,-2.71165 -5.21875,-4.3125 -1.62636,-1.60085 -3.14239,-3.37614 -4.53125,-5.3125 -1.38886,-1.93636 -2.65735,-4.02941 -3.78125,-6.3125 -1.1239,-2.28309 -2.10604,-4.73394 -2.9375,-7.375 -0.83146,-2.64106 -1.48844,-5.48974 -2,-8.5 -0.51156,-3.01026 -0.86707,-6.20306 -1.03125,-9.59375 -0.0683,-1.40951 0.0361,-2.99212 0.0312,-4.46875 -0.41476,6.06733 -0.79976,11.83698 -1.34375,19.125 -0.60444,8.09798 -1.5,21.25 -1.5,21.25 0,0 -0.94375,23.60875 -2.3125,47.40625 -2.6075,45.23625 10.625,103.0625 10.625,103.0625 0,0 4.2375,18.05375 3.53125,25.84375 -0.40999,4.49756 -0.89567,9.49298 -1.28125,14.59375 -0.28216,3.73259 -0.57061,7.50932 -0.4375,11.25 0.31125,8.84 -0.0425,12.3975 -1.8125,21.25 -1.7675,8.8525 -4.43,43.14375 -3.84375,60.75 0,0 9.26125,71.2725 11.09375,93.25 2.1225,25.485 -2.46125,28.00625 -3.53125,34.4375 -0.30442,1.83255 -0.44982,3.6758 -0.625,5.53125 -0.36719,3.88919 -0.73888,7.53064 -2.09375,9.125 0,0 -2.94,6.125 -11.4375,14.625 -8.4975,8.4925 -17.46875,19.8125 -17.46875,19.8125 0,0 -2.365,1.7813 -4.84375,2.8438 -2.47625,1.0625 -6.96,3.7462 -5.3125,8.5 1.24875,3.605 3.90625,3.9062 3.90625,3.9062 0,0 2.83375,4.6 7.4375,3.1875 0,0 2.99375,3.1688 9.1875,1.4063 0,0 1.41625,2.1187 4.78125,2.4687 3.36125,0.3512 5.65625,-1.2187 5.65625,-1.2187 0,0 1.12625,3.875 8.09375,3.875 6.44,0 9.62375,-1.9225 11.21875,-9.1875 0,0 4.95,-0.1801 8.84375,-4.7813 3.8975,-4.6025 4.24875,-9.57 6.375,-13.4687 2.1225,-3.9013 1.43375,-6.0138 7.09375,-12.0313 5.6675,-6.0137 3.17875,-15.2325 2.46875,-26.5625 0,0 1.66297,-2.97672 1.65625,-8.90625 -0.004,-3.11865 -0.31861,-6.80982 -1.90625,-11.84375 0,0 -0.47125,-24.09625 4.25,-52.40625 4.72,-28.3325 9.925,-42.9575 11.8125,-63.71875 1.88875,-20.7725 3.94,-41.54125 0.46875,-56.59375 0,0 -1.40375,-6.90875 0.71875,-14.6875 0.98062,-3.59946 2.4257,-8.98281 3.75,-14.96875 1.54545,-6.98556 2.93216,-14.89228 3.3125,-23.28125 0.71,-15.58 4.25875,-43.1775 4.96875,-71.5 0,0 9.28802,-48.79662 10.46875,-93.78125 0.0221,-0.84091 0.055,-1.68659 0.0937,-2.53125 z").attr(attr).transform("t-166.66421,-93.2038").data('id', 'left_leg_back');
  var upper_back = back.path("m 284.83036,407.6412 144.65625,0 c 1.56846,-8.69882 3.33316,-17.88119 4.03125,-21.9375 0.0987,-0.57375 0.47422,-2.57771 0.53125,-2.96875 1.13854,-7.81985 2.30341,-17.29928 2.5625,-25.875 l 0,-3.5625 c -0.008,-2.04652 -3.5e-4,-4.12445 -0.15625,-5.96875 0.0478,0.56561 0.10731,0.97873 0.15625,1.53125 l 0,-102.21875 c -2.51816,-0.73287 -5.18567,-1.54899 -7.25,-2.09375 -4.47628,-1.1801 -8.57351,-0.83226 -12.8125,-1.34375 l -1.65625,0 c -2.60546,-0.49971 -5.28718,-1.45779 -8.21875,-3.65625 -4.30129,-3.22502 -9.99282,-7.85557 -14.65625,-11.6875 -4.54951,-3.73832 -8.125,-6.71875 -8.125,-6.71875 -0.2771,-0.23041 -0.47746,-0.81598 -0.6875,-1.3125 l -51.5,0 c -0.2072,0.48755 -0.38277,1.0851 -0.65625,1.3125 0,0 -3.45449,2.90317 -7.59375,6.3125 -4.79,3.94532 -10.62777,8.67597 -15.1875,12.09375 -2.93113,2.19846 -5.63626,3.15654 -8.25,3.65625 l -2.28125,0 c -4.23962,0.51149 -8.33906,0.16365 -12.8125,1.34375 -2.20608,0.58194 -5.03447,1.40987 -7.75,2.21875 l 0,107.25 c 0.23042,-2.22859 0.47871,-4.21708 0.6875,-6.6875 -0.87625,10.35125 0.79125,24.52 2.375,35.40625 0.0455,0.31313 0.36474,1.94339 0.4375,2.375 0.66579,3.94918 2.51735,13.45243 4.15625,22.53125 z").attr(attr).transform("t-166.66421,-93.2038").data('id', 'upper_back');
  var lower_back = back.path("m 284.83036,407.6412 c 2.32989,12.90661 4.38395,26.00913 3.3125,30.125 -2.27125,8.70625 -7.26625,24.7325 -5.9375,35.125 0,0 -7.41683,16.82408 -10.375,37.75 -0.47959,3.39256 -0.86963,6.84956 -1.0625,10.40625 -0.18666,3.4242 -0.47268,6.76372 -0.6875,9.90625 0.005,1.47663 -0.0995,3.05924 -0.0312,4.46875 0.16418,3.39069 0.51969,6.58349 1.03125,9.59375 0.51156,3.01026 1.16854,5.85894 2,8.5 0.83146,2.64106 1.8136,5.09191 2.9375,7.375 1.1239,2.28309 2.39239,4.37614 3.78125,6.3125 1.38886,1.93636 2.90489,3.71165 4.53125,5.3125 1.62636,1.60085 3.38237,3.03592 5.21875,4.3125 1.83638,1.27658 3.76232,2.38022 5.78125,3.34375 2.01893,0.96353 4.10723,1.77578 6.28125,2.4375 2.17402,0.66172 4.41712,1.19136 6.71875,1.5625 2.30163,0.37114 4.66073,0.59571 7.0625,0.6875 2.40177,0.0918 4.86932,0.0513 7.34375,-0.125 2.47443,-0.17633 4.98037,-0.50429 7.5,-0.9375 2.51963,-0.43321 5.05639,-0.97738 7.59375,-1.65625 2.53736,-0.67887 5.06614,-1.49296 7.59375,-2.40625 2.25702,-0.81552 4.49023,-1.75604 6.71875,-2.75 0.0201,-0.43816 0.0557,-0.87881 0.0625,-1.3125 4.9e-4,-0.0309 -4.8e-4,-0.063 0,-0.0937 0,0 0.65246,0.0491 0.75,0.0625 0.54377,0.0748 1.9045,0.27756 4.1875,0.25 2.21099,0.0267 3.45297,-0.16804 4.0625,-0.25 0.0233,-0.003 0.10186,0.004 0.15625,0 0.25174,-0.0206 0.71875,-0.0625 0.71875,-0.0625 0.006,0.40298 0.0441,0.81206 0.0625,1.21875 2.23728,0.99863 4.48377,1.93123 6.75,2.75 2.52784,0.91329 5.05596,1.72738 7.59375,2.40625 2.53779,0.67887 5.07352,1.22304 7.59375,1.65625 2.52023,0.43321 5.02483,0.76117 7.5,0.9375 2.47517,0.17633 4.94115,0.21679 7.34375,0.125 2.4026,-0.0918 4.75996,-0.31636 7.0625,-0.6875 2.30254,-0.37114 4.54377,-0.90078 6.71875,-1.5625 2.17498,-0.66172 4.29259,-1.47397 6.3125,-2.4375 2.01991,-0.96353 3.94391,-2.06717 5.78125,-3.34375 1.83734,-1.27658 3.56023,-2.71165 5.1875,-4.3125 1.62727,-1.60085 3.1728,-3.37614 4.5625,-5.3125 1.3897,-1.93636 2.62537,-4.02941 3.75,-6.3125 1.12463,-2.28309 2.13669,-4.73394 2.96875,-7.375 0.83206,-2.64106 1.48802,-5.48974 2,-8.5 0.51198,-3.01026 0.86684,-6.20306 1.03125,-9.59375 0.0497,-1.02512 -0.0476,-2.18944 -0.0312,-3.25 -0.24568,-3.62087 -0.54419,-7.15705 -0.75,-10.9375 -0.24096,-4.43951 -0.80087,-8.71203 -1.46875,-12.875 -3.16759,-19.74392 -9.96875,-35.28125 -9.96875,-35.28125 1.33125,-10.3925 -3.635,-26.41875 -5.90625,-35.125 -1.07597,-4.13868 0.9889,-17.23811 3.3125,-30.125 l -68.125,0 -8.40625,0 -68.125,0 z").attr(attr).transform("t-166.66421,-93.2038").data('id', 'lower_back');
  var left_arm_back = back.path("m 277.17411,246.7662 c -13.10342,3.90312 -30.39547,12.45522 -38.625,47.6875 -8.375,35.8725 -5.65625,48.5 -5.65625,48.5 0,0 -14.3875,29.25125 -12.03125,60.90625 0,0 0.1441,4.54762 -0.15625,7.96875 -0.0561,0.63905 -0.0252,1.43049 -0.125,1.9375 -0.99625,5.08625 -6.9825,13.96625 -9.65625,21.59375 0,0 -8.95,23.24625 -11.78125,46.84375 -2.7655,23.04659 -5.13661,59.75993 -5.25,61.53125 -0.003,0.0429 -0.0625,1.0625 -0.0625,1.0625 -3.02125,8.8025 -7.125,18.72375 -10.15625,24.75 -6.39875,12.70375 -10.27125,21.95875 -11.6875,28.6875 -1.415,6.725 -4.25375,32.9075 -5.3125,38.21875 0,0 -0.355,3.89125 3.1875,4.25 3.53875,0.3525 8.8575,-2.11625 9.09375,-16.28125 0,0 2.37375,-14.635 2.84375,-18.65625 0.47125,-4.01 14.87,-20.06 17.46875,-22.65625 2.59625,-2.5975 7.78,-2.93875 9.90625,5.4375 1.69,6.675 2.825,20.795 7.78125,22.4375 0,0 6.385,2.83375 4.96875,-5.65625 -1.16,-6.96875 -1.63625,-16.65875 -2.125,-30.125 -0.3525,-9.71625 -1.07625,-21.58625 -3.90625,-26.1875 0,0 0.47257,-2.63681 1,-5.28125 0.87024,-4.36333 2.52691,-10.94722 7.15625,-21.96875 7.435,-17.70125 21.355,-33.45125 27.25,-62.6875 2.8725,-14.27 5.4225,-37.815 9.1875,-46.71875 0.0836,-0.19753 0.16672,-0.3363 0.25,-0.53125 7.01251,-16.41552 12.9366,-23.95292 16.4375,-57.8125 l 0,-107.25 z").attr(attr).transform("t-166.66421,-93.2038").data('id', 'left_arm_back');
  var head_back = back.path("m 331.70536,219.8287 51.5,0 c -1.10557,-2.61349 -1.38261,-8.27441 -1.375,-12.84375 6.51363,-4.33163 10.43046,-9.45532 12.34375,-14.875 1.45615,-4.12517 2.68897,-9.84591 3.65625,-15.28125 1.09096,0.22125 2.22601,-0.14274 3.25,-0.84375 0.0689,-0.0472 0.15085,-0.0747 0.21875,-0.125 0.0829,-0.0566 0.16865,-0.12648 0.25,-0.1875 0.0112,-0.009 0.02,-0.022 0.0312,-0.0312 0.97201,-0.7384 1.84067,-1.77717 2.4375,-2.9375 0.18696,-0.36157 0.33562,-0.71656 0.46875,-1.09375 0.61375,-1.7375 0.82969,-3.28469 1.3125,-5.125 0.24075,-0.91204 0.56856,-1.90626 1.03125,-3.03125 0.003,-0.008 -0.003,-0.0232 0,-0.0312 0.4693,-1.13699 1.10063,-2.39312 1.96875,-3.875 0.21236,-0.36185 0.39021,-0.73431 0.5625,-1.09375 0.004,-0.009 -0.004,-0.0225 0,-0.0312 0.52591,-1.1026 0.86858,-2.17503 1.0625,-3.21875 0.58378,-3.122 -0.16424,-5.86522 -1.34375,-7.5 -0.005,-0.006 0.005,-0.0249 0,-0.0312 -0.27012,-0.3711 -0.57047,-0.6595 -0.875,-0.90625 -0.14872,-0.12192 -0.28438,-0.22312 -0.4375,-0.3125 -0.24423,-0.14317 -0.48376,-0.25408 -0.75,-0.34375 -0.5023,-0.1743 -1.03389,-0.25292 -1.5625,-0.28125 -0.26992,-0.0119 -0.54961,-0.0145 -0.8125,0 -0.52453,0.0259 -1.02738,0.10258 -1.46875,0.1875 -0.4423,0.0872 -0.84,0.19875 -1.125,0.28125 -0.004,0.0594 0.004,0.0374 0,0.0937 -0.0188,0.005 -0.0443,0.0262 -0.0625,0.0312 0.0826,-1.28521 0.16699,-3.08685 0.125,-5.625 0,-4.38875 -0.43375,-8.48875 -1.25,-12.3125 -2.36425,-12.24875 -8.84745,-26.71125 -25.8437,-32.4375 -5.48625,-1.855 -11.03875,-2.76 -16.4375,-2.8125 -0.285,-0.0125 -0.55625,-0.03125 -0.84375,-0.03125 -0.285,0 -0.5875,0.01875 -0.875,0.03125 -5.39875,0.0525 -10.945,0.9575 -16.4375,2.8125 -16.99,5.72625 -23.48125,20.18875 -25.84375,32.4375 -0.8175,3.82375 -1.25375,7.92375 -1.25,12.3125 -0.0471,2.70787 0.0323,4.52101 0.125,5.78125 -0.32243,-0.0943 -0.77584,-0.19162 -1.28125,-0.28125 -0.51781,-0.0855 -1.11437,-0.15625 -1.71875,-0.15625 -0.925,0 -1.87125,0.14875 -2.6875,0.625 -0.30672,0.17938 -0.59086,0.413 -0.875,0.71875 -0.28403,0.30541 -0.57113,0.67828 -0.8125,1.09375 -0.36231,0.62408 -0.6648,1.36045 -0.875,2.1875 -0.07,0.2753 -0.1082,0.54992 -0.15625,0.84375 -0.002,0.0102 0.002,0.0211 0,0.0312 -0.0457,0.28446 -0.10216,0.57514 -0.125,0.875 -0.0501,0.63093 -0.035,1.28179 0.0312,1.96875 0.0595,0.61457 0.17507,1.22819 0.34375,1.875 0.0165,0.0634 0.0137,0.1238 0.0312,0.1875 0.10063,0.3666 0.23539,0.72027 0.375,1.09375 0.13583,0.36306 0.26228,0.72615 0.4375,1.09375 0.17966,0.3799 0.36936,0.74243 0.59375,1.125 0.43453,0.74094 0.83278,1.41658 1.15625,2.0625 0.32385,0.6467 0.57774,1.24405 0.8125,1.8125 1.17948,2.84859 1.37148,4.78854 1.9375,6.875 0.028,0.10379 0.0637,0.20802 0.0937,0.3125 0.0913,0.31669 0.16507,0.64041 0.28125,0.96875 0.13266,0.37719 0.31286,0.76281 0.5,1.125 0.37429,0.72438 0.83438,1.40918 1.375,2 0.539,0.58819 1.14475,1.08095 1.78125,1.4375 0.15953,0.0898 0.33707,0.17851 0.5,0.25 0.46851,0.20556 0.95806,0.31413 1.4375,0.34375 0.0208,10e-4 0.0417,-9.2e-4 0.0625,0 0.32257,0.0108 0.65133,-0.0103 0.96875,-0.0937 0.96404,5.398 2.18191,11.06309 3.625,15.15625 1.86202,5.26793 5.62356,10.24671 11.8125,14.5 7e-5,0.0115 -7e-5,0.0198 0,0.0312 0.0269,4.62343 -0.24035,10.5176 -1.375,13.1875 z").attr(attr).transform("t-166.66421,-93.2038").data('id', 'head_back');

  bodyMap['rule_9_back'].push(head_back, right_arm_back, left_arm_back, right_leg_back, left_leg_back, upper_back, lower_back);
  
  return bodyMap;
}
angular.module('ePCR.constants', [])

.constant('chiefComplaint', {
  primary: [
        "Other",
        "Abdominal Pain",
        "Angina",
        "Angina (Unstable)",
        "Angina (Stable)",
        "Alcohol With-drawl",
        "Allergic Reaction",
        "Altered mental Status",
        "Anaphylaxis",
        "Bradycardia",
        "Burn",
        "Cardiac Arrest",
        "Cerebrovascular Accident (CVA)",
        "Chest Pain (Cardiac)",
        "Chest Pain (Non-Cardiac)",
        "Chest Pain Not Yet Diagnosed",
        "Child Delivery",
        "Croup",
        "Death",
        "Dehydration",
        "Ectopic Pregnancy",
        "Epidural Bleed",
        "Epiglottitis",
        "Food Poisoning",
        "Hypertensive Crisis",
        "Hypertensive Emergency",
        "Hyperthermia",
        "Hypoglycemia",
        "Hypotension",
        "Hypothermia",
        "Labor",
        "Major Trauma",
        "Musculoskeletal Trauma",
        "Nausea",
        "Near Drowning",
        "Obstructed Airway",
        "Overdose",
        "Palpitations",
        "Pelvic Pain",
        "Poisoning",
        "Pregnancy Complications",
        "Psychiatric Emergency",
        "Rape",
        "Respiratory Arrest",
        "Seizure",
        "Sexual Abuse",
        "Shock",
        "Sickle Cell Crisis",
        "SIDS",
        "Smoke Inhalation",
        "Spinal Cord Injury",
        "Subdural Bleed",
        "Syncope",
        "Tachycardia",
        "Transient Ischemic Attacks (TIA)",
        "Unconscious/Unknown",
        "Vaginal Bleeding",
        "Vomiting"
              ],
  pertinent: [
        "Difficulty Breathing",
        "Chest Pain",
        "Nausea",
        "Vomiting",
        "Diarrhea",
        "Dizziness",
        "Headache",
        "Loss of Consciousness",
        "Numbness Tingling",
        "General Weakness",
        "Lethargy",
        "Neck Pain",
      ]
})

.constant('allergies', {
  list: [
        "Anticonvulsants",
        "Aspirin",
        "Ibuprofen",
        "Iodine",
        "Insulin",
        "IV contrast dye",
        "Lidocaine",
        "Naproxen",
        "Novocaine",
        "Penicillin",
        "Sulfa drugs",
        "NKDA",
        "NKDA per staff",
        "NKDA per parent/guardian"
      ]
})

.constant('homeMedications', {
  generic: {
    name: "Generic",
    list: [
        "Acetamin. w codeine",
        "Acetaminophen",
        "Adenosine",
        "Adrenalin",
        "Amiodarone",
        "Anexate",
        "ASA",
        "Atropine Sulfate",
        "Benztropine",
        "Betamethasone",
        "Betaxin",
        "Budesonide",
        "Calcium Chloride",
        "Calcium Gluconate",
        "Dexamethasone",
        "Dextrose",
        "Diazepam",
        "Dimenhydrinate",
        "Diphenhydramine",
        "Furosemide",
        "Glucagon",
        "Haloperidol",
        "Heparin, Carboprost Tromethamine",
        "Hydrocort",
        "Indocid",
        "Intropin",
        "Ipatroprium Br.",
        "Isoptine, Calan",
        "Ketalar",
        "Keterolac",
        "Levophed",
        "Lorazepam",
        "Meperidine",
        "Metoclopramide, Reglan",
        "Metoprolol",
        "MgSO4",
        "Midazolam",
        "Morphine Sulfate",
        "NaHCO3",
        "Naloxone",
        "Nitroglycerine, GTN, NTG",
        "Nitrous Oxide",
        "Olanzepine",
        "Osmitrol",
        "Oxygene",
        "Pantoprazole",
        "Phenytoin",
        "Phytonadione",
        "Pressyn",
        "Prostaglandin",
        "Ranitidine",
        "Retevase",
        "Salbutemol",
        "Sublimaze",
        "Suxamethonium Cl",
        "Syntocinon",
        "Trandate",
        "Xylocard,Xylocaine",
        "Zemuron"
      ]
  },
  brand: {
    name: "Brand",
    list: [
      "Adenocard",
      "Aspirin",
      "Ativan",
      "Atropine",
      "Atrovent",
      "Benadryl",
      "Betaject",
      "Calciject, CaCl",
      "Calcium Gluconate",
      "Codarone",
      "Cogentin",
      "D50W",
      "Decadron",
      "Demerol",
      "Dilantin",
      "Dopamine",
      "Entonox",
      "Epinephrine",
      "Fentanyl",
      "Flumazenil",
      "Glucagon",
      "Gravol",
      "Haldol",
      "Hemabate",
      "Heparin",
      "Hydrocortisone",
      "Indomethacin PR",
      "Ketamine",
      "Labetalol",
      "Lasix",
      "Lidocaine",
      "Magnesium Sulfate",
      "Mannitol",
      "Maxeran",
      "Metolprolol",
      "Morphine",
      "Narcan",
      "Nitroglycerine, GTN, NTG",
      "Norepinephrine",
      "Oxygene",
      "Oxytocin",
      "Pantoloc",
      "Pulmicort",
      "Reteplase",
      "Rocuronium",
      "Sodium Bicarbonate",
      "Succinycholine",
      "Thiamine",
      "Toradol",
      "Tylenol",
      "Tylenol",
      "Valium",
      "Vasopressin",
      "Ventolin",
      "Verapamil",
      "Versed",
      "Vitamin K",
      "Zantac",
      "Zyprexa"
    ]
  }
})

.constant('medicalConditions', {
  csv: {
    name: "Cardiovascular",
    list: [
      "A-Fib",
      "A-Flutter",
      "Acute Coronary Syndrome (ACS)",
      "Acute Myocardial Infarction (AMI)",
      "Angina ",
      "Angina (Unstable)",
      "Aortic Dissection",
      "Aortic Stenosis",
      "Ascites",
      "Atherosclerosis",
      "Atrial Tach",
      "Cardiac Arrhythmia",
      "Cardiomegaly (enlarged heart)",
      "Congenital heart disease",
      "Congestive Heart Failure (CHF)",
      "Coronary Artery Disease (CAD)",
      "Deep Vein Thrombosis",
      "Dyslipidemia",
      "Endocarditis",
      "Heart Failure (Left)",
      "Heart Failure (Right)",
      "Heart Murmur",
      "Hyperlipidemia",
      "Hypertension (HTN)",
      "Left Ventricular Hypertrophy (LVH)",
      "Mitral Valve Prolapse",
      "Myocarditis",
      "Pacemaker (AV)",
      "Pacemaker (Ventricular)",
      "Pacemaker (Wandering Atrial)",
      "Palpitations",
      "Parox Suprav Tachy (PSVT)",
      "Pericardial Effusion",
      "Pericardial Tamponade",
      "Pericarditis",
      "Peripheral Vascular Disease",
      "PVCs",
      "Rheumatic Heart Disease",
      "V-Tach",
      "Valvular heart disease"
    ]
  },
  resp: {
    name: "Respiratory",
    list: [
      "Asthma",
      "Bronchitis",
      "Chron Obstr Pulmon Dis (COPD)",
      "Chronic Cough",
      "Cold",
      "Croup",
      "Cystic Fibrosis",
      "Emphysema",
      "H1N1",
      "Hantavirus",
      "Influenza/Flu",
      "Lung Cancer",
      "Pleurisy",
      "Pneumonia",
      "Pneumothorax",
      "Pulmonary Embolus",
      "Pulmonary Fibrosis",
      "Respir Distress Syndrome (RDS)",
      "Respiratory Syncytial Virus (RSV)",
      "Sarcoidosis",
      "Sleep Apnea",
      "Sudden Infant Death Syn (SIDS)",
      "Swine Flu",
      "Tobacco Use (Current)",
      "Tobacco Use (Hx)",
      "Tuberculosis (TB)"
    ]
  },
  gu_gi: {
    name: "GU/GI",
    list: [
      "Abdominal Adhesions",
      "Acid Reflux",
      "Appendectomy",
      "Appendicitis",
      "Autosom Dom Polycys Kidney Dis",
      "Bacterial Vaginosis",
      "Barrett's Esophagus",
      "Benign Prost Hypertrophy/plasia",
      "Bladder Infection",
      "Bowel Incontinence",
      "Celiac Disease",
      "Chancroid",
      "Chlamydia",
      "Cholecystect (Gallbladder Rem)",
      "Chronic Kidney Disease",
      "Cirrhosis",
      "Colon Polyps",
      "Constipation",
      "Crohn's Disease",
      "Cystic Kidney Disease",
      "Cystitis",
      "Diarrhea",
      "Diverticulosis / Diverticulitis",
      "Duodenal Ulcer",
      "Ectopic Kidney",
      "Emodialysis",
      "End Stage Renal Disease",
      "Erectile Dysfunction (ED)",
      "Fallen Bladder",
      "Food Poisoning",
      "Gallstones",
      "Gastritis",
      "Gastroesoph Refl Dis (GERD)",
      "Genital Herpes",
      "Genital Warts",
      "Gonorrhoea",
      "Goodpasture's Syndrome",
      "Heartburn",
      "Hematuria / Blood in Urine",
      "Hemorrhoids",
      "Hepatitis A",
      "Hepatitis B",
      "Hepatitis C",
      "Hernia",
      "Hiatal Hernia",
      "Hypertension",
      "Ileostomy / Colostomy",
      "Inflammatory Bowel Disease",
      "Inguinal Hernia",
      "Irritable Bowel Syndrome",
      "Lactose Intolerance",
      "Nephrotic Syndrome",
      "Painful Bladder Syndrome",
      "Pancreatitis",
      "Pelvic Inflammatory Disease (PID)",
      "Polycystic Kidney Disease (PKD)",
      "Proctitis",
      "Prostate Cancer",
      "Proteinuria",
      "Pubic Lice (Crabs)",
      "Pyelonephritis (Ren/Kidn Inf)",
      "Renal / Kidney Cysts",
      "Renal / Kidney Failure",
      "Renal / Kidney Stones",
      "Renal / Kidney Transplant",
      "Renal Artery Stenosis (RAS)",
      "Renal Dysplasia",
      "Renal Tubular Acidosis (RTA)",
      "Scabies",
      "Stomach Flu",
      "Stomach Ulcers",
      "Syphillis",
      "Thrush (Candiada)",
      "Trichomoniasis",
      "Ulcer",
      "Urethritis",
      "Urinary Incontinence",
      "Urinary Retention",
      "Urinary Tract Infection (UTI)",
      "Whipple's Disease",
      "Wilson's Disease"
    ]
  },
  neuro: {
    name: "Neuro",
    list: [
      "Acute Dissem encephalomy",
      "Agnosia",
      "Alternating hemiplegia",
      "Alzheimer's disease",
      "Anoxia",
      "Aphasia",
      "Apraxia",
      "Arachnoid cysts",
      "Arachnoiditis",
      "Arteriovenous malformation",
      "Atten Deficit Hyperactiv Dis",
      "Auditory processing disorder",
      "Autonomic Dysfunction",
      "Back Pain",
      "Bell's palsy",
      "Benign Intracranial Hypertension",
      "Brachial plexus injury",
      "Brain abscess",
      "Brain damage",
      "Brain injury",
      "Brain tumor",
      "Brown-Sequard syndrome",
      "Carpal tunnel syndrome",
      "Central pain syndrome",
      "Central pontine myelinolysis",
      "Centronuclear myopathy",
      "Cephalic disorder",
      "Cerebral aneurysm",
      "Cerebral arteriosclerosis",
      "Cerebral atrophy",
      "Cerebral gigantism",
      "Cerebral palsy",
      "Cerebral vasculitis",
      "Cervical spinal stenosis",
      "Chorea",
      "Chronic fatigue syndrome",
      "Chron inflam demy polyneuro",
      "Chronic pain",
      "Coma",
      "Compression neuropathy",
      "Corticobasal degeneration",
      "Cranial arteritis",
      "Creutzfeldt-Jakob disease",
      "Cushing's syndrome",
      "Dementia",
      "Dermatomyositis",
      "Developmental dyspraxia",
      "Diabetic neuropathy",
      "Diffuse sclerosis",
      "Dyslexia",
      "Dystonia",
      "Encephalitis",
      "Epilepsy",
      "Erythromelalgia",
      "Essential tremor",
      "Fainting",
      "Febrile seizures",
      "Fibromyalgia",
      "Gray matter heterotopia",
      "Head injury",
      "Headache",
      "Herpes zoster oticus",
      "Herpes zoster",
      "Huntington's disease",
      "Hydranencephaly",
      "Hydrocephalus",
      "Hypoxia",
      "Immune-Mediated encephalomye",
      "Infantile spasms",
      "Inflammatory myopathy",
      "Intracranial cyst",
      "Intracranial hypertension",
      "Learning disabilities",
      "Locked-In syndrome",
      "Lou Gehrig's dis (Motor Neur Dis)",
      "Lumbar disc disease",
      "Lumbar spinal stenosis",
      "Lyme dis-Neurological Sequelae",
      "Menieres disease",
      "Meningitis",
      "Menkes disease",
      "Microcephaly",
      "Micropsia",
      "Migraine",
      "Mini-stroke (trans isch att)",
      "Mitochondrial myopathy",
      "Mobius syndrome",
      "Monomelic amyotrophy",
      "Motor Neurone Disease",
      "Motor skills disorder",
      "Multi-infarct dementia",
      "Multifocal motor neuropathy",
      "Multiple sclerosis",
      "Multiple system atrophy",
      "Muscular dystrophy",
      "Myasthenia gravis",
      "Myelinoclastic diffuse sclerosis",
      "Myoclonic Encephalopathy",
      "Myoclonus",
      "Myopathy",
      "Narcolepsy",
      "Neuroleptic malignant syndrome",
      "Neuromyotonia",
      "Nonverbal learning disorder",
      "Occipital Neuralgia",
      "Optic neuritis",
      "Orthostatic Hypotension",
      "Palinopsia",
      "Paresthesia",
      "Parkinson's disease",
      "Peripheral neuropathy",
      "Persistent Vegetative State",
      "Pervasive developmental disorders",
      "Photic sneeze reflex",
      "Pinched nerve",
      "Pituitary tumors",
      "PMG",
      "Polio",
      "Polymicrogyria",
      "Polymyositis",
      "Porencephaly",
      "Post-Polio syndrome",
      "Postherpetic Neuralgia (PHN)",
      "Postinfectious Encephalomyelitis",
      "Postural Hypotension",
      "Primary Lateral Sclerosis",
      "Rabies",
      "Reflex neurovascular dystrophy",
      "Repetitive motion disorders",
      "Repetitive stress injury",
      "Restless legs syndrome",
      "Rhythmic Movement Disorder",
      "Sandhoff disease",
      "Schizophrenia",
      "Septo-optic dysplasia",
      "Shaken baby syndrome",
      "Shingles",
      "Sleep apnea",
      "Sleeping sickness",
      "Spina bifida",
      "Spinal cord injury",
      "Spinal cord tumors",
      "Spinal muscular atrophy",
      "Spinocerebellar ataxia",
      "Stroke",
      "Syncope",
      "Synesthesia",
      "Tarsal tunnel syndrome",
      "Temporal arteritis",
      "Tetanus",
      "Tourette syndrome",
      "Toxic encephalopathy",
      "Transient ischemic attack",
      "Transverse myelitis",
      "Traumatic brain injury",
      "Tremor",
      "Whiplash",
      "Wilson's disease"
    ]
  },
  endocrine: {
    name: "Endocrine",
    list: [
      "Acromegaly / Gigantism",
      "Addison's disease",
      "Adrenal insufficiency",
      "Adrenocortical carcinoma",
      "Amenorrhea",
      "Androgen insensitivity syndromes",
      "Carcinoid syndrome",
      "Conn's syndrome",
      "Cushing's disease",
      "Cushing's syndrome",
      "Delayed puberty",
      "Diabetes insipidus",
      "Diabetes",
      "Gender identity disorder",
      "Gestational Diabetes",
      "Glucagonoma",
      "Goitre",
      "Gonadal dysgenesis",
      "Graves-Basedow disease",
      "Hashimoto's thyroiditis",
      "Hermaphroditism",
      "Hyperthyroidism",
      "Hypoglycemia",
      "Hypogonadism (Gonadotropin def)",
      "Hypoparathyroidism",
      "Hypopituitarism",
      "Hypothyroidism",
      "Mature Onset Diab of Y (MODY)",
      "Mineralocorticoid deficiency",
      "Multiple endocrine neoplasia",
      "Osteitis deform (Paget bone Dis)",
      "Osteoporosis",
      "Ovarian failure (Premature Menop)",
      "Pituitary adenomas",
      "Pituitary tumors",
      "Polycystic ovary syndrome",
      "Precocious puberty",
      "Primary hyperparathyroidism",
      "Prolactinoma",
      "Pseudohypoparathyroidism",
      "Rickets and osteomalacia",
      "Secondary hyperparathyroidism",
      "Tertiary hyperparathyroidism",
      "Testicular failure",
      "Thyroid cancer",
      "Thyroidectomy",
      "Thyroiditis",
      "Toxic multinodular goitre",
      "Type 1 Diabetes mellitus",
      "Type 2 Diabetes mellitus"
    ]
  },
  psych: {
    name: "Psychological",
    list: [
      "Acute stress disorder",
      "Adjustment disorder",
      "Amnesia",
      "Anorexia nervosa",
      "Antisocial personality disorder",
      "Anxiety disorder",
      "Asperger syndrome",
      "Attention deficit disorder",
      "Autism",
      "Autophagia",
      "Avoidant personality disorder",
      "Bereavement",
      "Binge eating disorder",
      "Bipolar disorder",
      "Borderline personality disorder",
      "Bulimia nervosa",
      "Cyclothymia",
      "Delirium",
      "Delusional disorder",
      "Dementia",
      "Dependent personality disorder",
      "Depression",
      "Dissociative identity disorder",
      "Down syndrome",
      "Dyslexia",
      "Dyspraxia",
      "Exhibitionism",
      "Gender identity disorder",
      "Generalized anxiety disorder",
      "Hyperactivity disorder",
      "Hyperkinetic syndrome",
      "Hypochondriasis",
      "Hysteria",
      "Kleptomania",
      "Mania",
      "Munchausen syndrome",
      "Narcissistic personality disorder",
      "Narcolepsy",
      "Nightmares",
      "Obsessive-compuls perso dis",
      "Obsessive-compulsive disorder",
      "Pain disorder",
      "Panic attacks",
      "Paranoid personality disorder",
      "Parasomnia",
      "Pathological gambling",
      "Perfectionism",
      "Pervasive developmental disorder",
      "Post-traumatic stress disorder",
      "Postpartum Depression",
      "Primary hypersomnia",
      "Primary insomnia",
      "Psychotic disorder",
      "Pyromania",
      "Rumination syndrome",
      "Sadism and masochism",
      "Schizoid",
      "Schizophrenia",
      "Seasonal affective disorder",
      "Self Injury",
      "Separation anxiety disorder",
      "Sleep disorder",
      "Sleep terror disorder",
      "Sleepwalking disorder",
      "Social anxiety disorder",
      "Stuttering",
      "Suicide",
      "Tourette syndrome"
    ]
  }
})

.constant('bodyParts', {
  list: [
      "Head",
      "Neck",
      "Chest",
      "Abdomen",
      "Pelvis",
      "Left arm",
      "Right arm",
      "Left leg",
      "Right leg",
      "Back"
    ]
})

.constant('muscularInjuries', {
  list: [
        "Deformities",
        "Contusion",
        "Abrasion",
        "Puncture",
        "Penetration",
        "Burn",
        "Tenderness",
        "Laceration",
        "Swelling",
        "Crepitus",
        "Step-off"
      ]
})

.constant('ppe', {
  list: [
        "Gloves",
        "Eye protection",
        "Reflective gear",
        "Isolation gear",
        "Mask"
      ]
})

.constant('exportTableDefinition', {
  vitals: {
    created: {
      name: "Date"
    },
    hr: {
      name: "Heart Rate"
    },
    sys: {
      name: "Systole"
    },
    dia: {
      name: "Diastole"
    },
    fio2: {
      name: "FiO2"
    },
    spo2: {
      name: "SpO2"
    },
    resp: {
      name: "Resp"
    },
    level_of_c: {
      name: "L.O.C."
    },
    left_eye: {
      name: "Left Eye (mm)"
    },
    right_eye: {
      name: "Right Eye (mm)"
    },
    bgl: {
      name: "BGL",
      unit: 'bgl_unit'
    },
    temp: {
      name: "Temp",
      unit: 'temp_unit'
    },
    etco2: {
      name: "etCO2",
      unit: 'etco2_unit'
    },
    pain: {
      name: "Pain"
    }
  },
  neuro: {
        created: {
      name: "Date"
    },
    avpu: {
      name: "AVPU"
    },
    gcs: {
      name: "GCS"
    },
    luxr: {
      name: "Left arm Reflex"
    },
    ruxr: {
      name: "Right arm Reflex"
    },
    llrx: {
      name: "Left leg Reflex"
    },
    rlxr: {
      name: "Right leg Reflex"
    },
    suspect_stroke: {
      name: "Suspect Stroke"
    },
    facial_droop: {
      name: "Facial Droop",
      side: "facial_droop_side"
    },
    arm_drift: {
      name: "Arm Drift",
      side: "arm_drift_side"
    },
    speech: {
      name: "Speech"
    }
  },
  airway_basic: {
        created: {
      name: "Date"
    },
    oxygen_volume: {
      name: "Volume"
    },
    basic_maneuvers: {
      name: "Maneuver"
    },
    opa: {
      name: "OPA"
    },
    npa: {
      name: "NPA"
    },
    bvm: {
      name: "BVM"
    },
    airway_rate: {
      name: "Rate"
    }
  },
  airway_ventilator: {
    created: {
      name: "Date"
    },
    control: {
      name: "Control"
    },
    mode: {
      name: "Mode"
    },
    rate: {
      name: "Rate"
    },
    tidal_volume: {
      name: "Tidal V."
    },
    inspiration_time: {
      name: "Insp. Time"
    },
    inspiration_ratio: {
      name: "Insp. ratio"
    },
    expiration_ratio: {
      name: "Exp. ratio"
    },
    fio2: {
      name: "FiO2"
    },
    peep: {
      name: "Peep"
    },
    sensitivity: {
      name: "Sensitivity"
    },
    expiration_pressure: {
      name: "Exp. P"
    },
    expiration_tidal_volume: {
      name: "Exp. Tidal P"
    },
    max_inspiration_pressure: {
      name: "Max Insp. P"
    },
    plateau_pressure: {
      name: "Plateau P"
    },
    pressure_support: {
      name: "P Support"
    },
    high_pressure_limit: {
      name: "High P lim"
    },
    low_pressure_limit: {
      name: "Low P lim"
    },
    low_min_volume: {
      name: "Low min V"
    }
  },
    airway_cpap_bipap: {
    created: {
      name: "Date"
    },
    device: {
      name: "Device"
    },
    size: {
      name: "Size"
    },
    fio2: {
      name: "FiO2"
    },
    peep: {
      name: "PEEP"
    },
    pressure: {
      name: "Pressure"
    }
  },
  airway_suction: {
    created: {
      name: "Date"
    },
    duration: {
      name: "Duration"
    },
    amount: {
      name: "Amount"
    },
    tip: {
      name: "Tip"
    },
    size: {
      name: "Size"
    }
  },
  iv_io: {
    created: {
      name: "Date"
    },
    site: {
      name: "Site"
    },
    side: {
      name: "Side"
    },
    gauge: {
      name: "Gauge"
    },
    successful: {
      name: "Success"
    },
    fluid: {
      name: "Fluid",
      other: "fluid_other"
    }
  },
  splinting: {
    created: {
      name: "Date"
    },
    location: {
      name: "Location"
    },
    side: {
      name: "Side"
    },
    sensation_prior: {
      name: "Sensation Prior"
    },
    sensation_post: {
      name: "Sensation Post"
    },
    traction_applied: {
      name: "Traction"
    },
    splinting_type: {
      name: "Type",
      other: "splinting_type_other"
    },
    position_found: {
      name: "Position Found",
      other: "position_found_other"
    }
  },
  medication: {
    created: {
      name: "Date"
    },
    medication_type: {
      name: "Type"
    },
    medication: {
      name: "Medication",
      other: "medication_other"
    },
    dose: {
      name: "Dose",
      unit: "dose_unit"
    },
    route: {
      name: "Route",
      other: "route_other"
    },
    indication: {
      name: "Indication"
    },
    administrated: {
      name: "Administrated",
      other: "administrated_other"
    },
    same_dose: {
      name: "Same dose"
    },
  },
in_out: {
    created: {
      name: "Date"
    },
    direction: {
      name: "Direction"
    },
    volume: {
      name: "Volume"
    },
    substance: {
      name: "Substance",
      other: "substance_other"
    }
  },
  ecg: {
    created: {
      name: "Date"
    },
    leads_nb: {
      name: "Leads"
    },
    rhythm: {
      name: "Rhythm"
    },
    regular: {
      name: "Regular"
    },
    bbb: {
      name: "BBB",
    },
    bbb_side: {
      name: "BBB Side",
    },
    st_elevation_list: {
      name: "Elevation",
    },
    st_depression_list: {
      name: "Depression",
    },
    pacs: {
      name: "PACS",
    },
    PVCS: {
      name: "PVCS",
    }
  },
  narrative: {
    created: {
      name: "Date"
    },
    narration: {
      name: "Narrative"
    }
  },
  code: {
    time: {
      name: "Time"
    },
    code: {
      name: "Code"
    }
  }
})

.constant('body_parts_area', {
  rule_of_9: {
    head_front: {
      adult: 4.5,
      obese: 1,
      child: 9,
      infant: 9.5,
    },
    head_back: {
      adult: 4.5,
      obese: 1,
      child: 9,
      infant: 9.5,
    },
    chest: {
      adult: 9,
      obese: 12,
      child: 9,
      infant: 8,
    },
    abdomen: {
      adult: 9,
      obese: 12,
      child: 9,
      infant: 8,
    },
    upper_back: {
      adult: 9,
      obese: 12,
      child: 9,
      infant: 8,
    },
    lower_back: {
      adult: 9,
      obese: 12,
      child: 9,
      infant: 8,
    },
    groin: {
      adult: 1,
      obese: 0,
      child: 1,
      infant: 1,
    },
    left_arm_front: {
      adult: 4.5,
      obese: 2.5,
      child: 4.5,
      infant: 4,
    },
    left_arm_back: {
      adult: 4.5,
      obese: 2.5,
      child: 4.5,
      infant: 4,
    },
    right_arm_front: {
      adult: 4.5,
      obese: 2.5,
      child: 4.5,
      infant: 4,
    },
    right_arm_back: {
      adult: 4.5,
      obese: 2.5,
      child: 4.5,
      infant: 4,
    },
    left_leg_front: {
      adult: 9,
      obese: 10,
      child: 6.75,
      infant: 8,
    },
    left_leg_back: {
      adult: 9,
      obese: 10,
      child: 6.75,
      infant: 8,
    },
    right_leg_front: {
      adult: 9,
      obese: 10,
      child: 6.75,
      infant: 8,
    },
    right_leg_back: {
      adult: 9,
      obese: 10,
      child: 6.75,
      infant: 8,
    }
  },
  lund_browder: {
    head_front: headSurface,
    head_back: headSurface,
    neck_front: 1,
    neck_back: 1,
    chest: 13,
    back: 13,
    left_buttock: 2.5,
    right_buttock: 2.5,
    groin: 1,
    left_arm_front: 2,
    left_arm_back: 2,
    left_forearm_front: 1.5,
    left_forearm_back: 1.5,
    left_hand_front: 1.5,
    left_hand_back: 1.5,
    right_arm_front: 2,
    right_arm_back: 2,
    right_forearm_front: 1.5,
    right_forearm_back: 1.5,
    right_hand_front: 1.5,
    right_hand_back: 1.5,
    left_upper_leg_front: upperLegSurface,
    left_upper_leg_back: upperLegSurface,
    left_lower_leg_front: lowerLegSurface,
    left_lower_leg_back: lowerLegSurface,
    left_foot_front: 1.75,
    left_foot_back: 1.75,
    right_upper_leg_front: upperLegSurface,
    right_upper_leg_back: upperLegSurface,
    right_lower_leg_front: lowerLegSurface,
    right_lower_leg_back: lowerLegSurface,
    right_foot_front: 1.75,
    right_foot_back: 1.75
  }
})

.constant('body_parts_names', {
  head_front: "Face",
  head_back: "Head back",
  chest: "Chest",
  abdomen: "Abdomen",
  upper_back: "Upper back",
  lower_back: "Lower back",
  groin: "Groin",
  left_arm_front: "Left arm front",
  left_arm_back: "Left arm back",
  right_arm_front: "Right arm front",
  right_arm_back: "Right arm back",
  left_leg_front: "Left leg front",
  left_leg_back: "Left leg back",
  right_leg_front: "Right leg Front",
  right_leg_back: "Right leg back",
  neck_front: "Throat",
  neck_back: "Nape",
  back: "Back",
  left_buttock: "Left buttock",
  right_buttock: "Right buttock",
  groin: "Groin",
  left_forearm_front: "Left forearm front",
  left_forearm_back: "Left forearm back",
  left_hand_front: "Left hand front",
  left_hand_back: "Left hand back",
  right_forearm_front: "Right forearm front",
  right_forearm_back: "Right forearm back",
  right_hand_front: "Right palm",
  right_hand_back: "Right hand back",
  left_upper_leg_front: "Left thigh front",
  left_upper_leg_back: "Left thigh back",
  left_lower_leg_front: "Left lower leg front",
  left_lower_leg_back: "Left calf",
  left_foot_front: "Left foot front",
  left_foot_back: "Left foot back",
  right_upper_leg_front: "Right thigh front",
  right_upper_leg_back: "Right thigh back",
  right_lower_leg_front: "Right lower leg front",
  right_lower_leg_back: "Right calf",
  right_foot_front: "Right foot front",
  right_foot_back: "Right foot back"
})

.constant('burnDegrees', {
  First: "Superficial Erythema",
  Second: "PTL",
  Third: "FTL"
})
  
.constant('seatsMap', {
    car1: {
      name: "Driver"
    },
    car2: {
      name: "Front Right"
    },
    car3: {
      name: "Middle Left"
    },
    car4: {
      name: "Middle Right"
    },
    car5: {
      name: "Rear Left"
    },
    car6: {
      name: "Rear Right"
    },
    truck1: {
      name: "Driver"
    },
    truck2: {
      name: "Front center"
    },
    truck3: {
      name: "Front Right"
    },
    motorcycle1: {
      name: "Driver"
    },
    motorcycle2: {
      name: "Passenger"
    },
    motorcycle3: {
      name: "Side Passenger"
    }
})

.constant('gastroMap', {
    right_hypochondriac: "Right hypochondriac",
    epigastric: "Epigastric",
    left_hypochondriac: "Left hypochondriac",
    right_lumbar: "Right lumbar",
    umbilical: "Umbilical",
    left_lumbar: "Left Lumbar",
    right_iliac: "Right iliac",
    hypogastric: "Hypogastric",
    left_iliac: "Left iliac"
})

.constant('timesString', {
    notified: "Notified",
    en_route: "En Route",
    on_scene: "On Scene",
    depart_scene: "Depart Scene",
    destination: "Destination",
    transfer: "Transfer",
    back_service: "Back in Service",
    patient_contact: "Patient Contact",
});
function DashCtrl($scope, reports) {
  $scope.reportsNumber = Object.size(reports);
}

function ReportsCtrl($scope, $q, reports) {

  $scope.reports = reports;
  $scope.showDelete = false;

  $scope.addReport = function () {
    var now = new Date();
    db.insert('report', {
      "first_name": ''
    }).then(function (results) {
      console.log(results.insertId);
      window.location = '#/tab/report/' + results.insertId;
    });
  }

  $scope.toggleDelete = function () {
    $scope.showDelete = !$scope.showDelete;
  }

  $scope.deleteReport = function (reportId) {
    var promises = [];
    promises.push(db.del("report", {
      "id": reportId
    }));
    promises.push(db.del("vitals", {
      "report_id": reportId
    }));
    $q.all(promises)
      .then(function () {
        console.log("Report deleted successfully");
        delete $scope.reports[reportId];
      })
  }
}

function ReportDetailCtrl($scope, $stateParams, report, $window, Records) {

  $scope.report = report;
  $scope.reportId = $stateParams.reportId;

  Records.all('vitals', $stateParams.reportId)
    .then(function (vitalsRecords) {
      $scope.vitalsNumber = Object.size(vitalsRecords);
    })
    .then(function () {
      Records.all('narrative', $stateParams.reportId)
        .then(function (narrativeRecords) {
          $scope.narrativeNumber = Object.size(narrativeRecords);
        })
        .then(function () {
          Records.all('code', $stateParams.reportId)
            .then(function (codeRecords) {
              $scope.codeNumber = Object.size(codeRecords);
            })
        })
    });

  $scope.code = function () {
    $window.location = '#/tab/report/' + $stateParams.reportId + '/code';
  }
}

function PersonalInfoCtrl($scope, $stateParams, $window, report) {

  $scope.personal = {
    "first_name": report.first_name,
    "last_name": report.last_name,
    "date_of_birth": report.date_of_birth ? new Date(report.date_of_birth) : "",
    "gender": report.gender,
    "weight": report.weight,
    "weight_unit": report.weight_unit,
    "address_street": report.address_street,
    "address_city": report.address_city,
    "address_province": report.address_province,
    "phone_home": report.phone_home,
    "phone_work": report.phone_work,
    "phone_cell": report.phone_cell,
    "insurance": report.insurance,
    "mrn": report.mrn,
    "next_of_kin": report.next_of_kin,
    "next_of_kin_phone": report.next_of_kin_phone,
  };
  console.log($scope.personal);

  $scope.save = function () {

    $scope.personal.patient_info_assessed = true;
    db.update("report", $scope.personal, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report");
      $window.history.back();
    });
  }
}

function VitalsChartCtrl($scope, $stateParams, $window, vitals, exportTableDefinition) {

  var xAxis = [],
    data = {};

  $scope.chartsHeight = "height:" + (window.innerHeight - 160) + "px";

  $scope.vitalSelected = {
    serie: "hr"
  };

  $scope.vitalsSeries = [
    {
      code: "hr",
      name: "Heart Rate"
    },
    {
      code: "sys",
      name: "Systole"
    },
    {
      code: "dia",
      name: "Diastole"
    },
    {
      code: "fio2",
      name: "FiO2"
    },
    {
      code: "spo2",
      name: "SpO2"
    },
    {
      code: "resp",
      name: "Respiration"
    },
    {
      code: "level_of_c",
      name: "Consciousness"
    },
    {
      code: "left_eye",
      name: "Left Eye Diameter"
    },
    {
      code: "right_eye",
      name: "Right Eye Diameter"
    },
    {
      code: "bgl",
      name: "Blood Glucose"
    },
    {
      code: "temp",
      name: "Temperature"
    },
    {
      code: "etco2",
      name: "EtCO2"
    },
    {
      code: "pain",
      name: "Pain"
    },
  ];

  for (index in vitals) {
    xAxis.push(vitals[index].created.substring(11));
    $scope.vitalsSeries.forEach(function (serie) {
      if (!data[serie.code])
        data[serie.code] = [];
      data[serie.code].push(vitals[index][serie.code]);
    });
  }


  $scope.chart = {
    labels: xAxis,
    datasets: [
      {
        fillColor: "rgba(151,187,205,0)",
        strokeColor: "#e67e22",
        pointColor: "rgba(151,187,205,0)",
        pointStrokeColor: "#e67e22",
        data: data[$scope.vitalSelected.serie]
          }
      ],
  };

  $scope.options = {
    responsive: true,
    maintainAspectRatio: false,
    animationSteps: 10
  }

  $scope.changeVital = function () {
    $scope.chart.datasets[0].data = data[$scope.vitalSelected.serie];
  }
}

function VitalsCtrl($scope, $stateParams, $window, vitals) {
  $scope.vitalsEntry = vitals;

  $scope.vitals = {
    "hr": vitals.hr,
    "sys": vitals.sys,
    "dia": vitals.dia,
    "fio2": vitals.fio2,
    "spo2": vitals.spo2,
    "resp": vitals.resp,
    "level_of_c": vitals.level_of_c,
    "perrl": vitals.perrl == 'true',
    "left_eye": vitals.left_eye,
    "right_eye": vitals.right_eye,
    "eyes_responsive": vitals.eyes_responsive == 'true',
    "bgl": vitals.bgl,
    "bgl_unit": vitals.bgl_unit,
    "temp": vitals.temp,
    "temp_unit": vitals.temp_unit,
    "etco2": vitals.etco2,
    "etco2_unit": vitals.etco2_unit,
    "pain": vitals.pain || 0,
  };

  console.log($scope.vitals);

  $scope.save = function () {
    db.update("vitals", $scope.vitals, {
      'id': $stateParams.vitalsId
    }).then(function () {
      console.log("Updated vitals");
      $window.history.back();
    });
  }
}

function ChiefComplaintCtrl($scope, $stateParams, $window, report, chiefComplaint) {

  $scope.pertinentList = [];
  $scope.primaryComplaint = chiefComplaint.primary;

  $scope.binding = {
    "primary_complaint": report.primary_complaint,
    "primary_complaint_other": report.primary_complaint_other,
    "secondary_complaint": report.secondary_complaint,
    "pertinent": JSON.parse(report.pertinent)
  };

  var existingPertinent = $scope.binding.pertinent;

  chiefComplaint.pertinent.forEach(function (complaint) {
    var checked = existingPertinent != null ? existingPertinent.indexOf(complaint) != -1 : false;
    $scope.pertinentList.push({
      "text": complaint,
      "checked": checked
    })
  });

  $scope.save = function () {
    var selected = [];
    $scope.pertinentList.forEach(function (value, index) {
      if (value.checked) {
        selected.push(value.text);
      }
    });
    $scope.binding.pertinent = JSON.stringify(selected);


    $scope.binding.chief_complaint_assessed = true;
    db.update("report", $scope.binding, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Chief Complaint");
      $window.history.back();
    });
  }
}

function PatientHistoryCtrl($scope, $stateParams, $window, report) {

  $scope.showDelete = false;

  $scope.patientHistory = {
    "hx_allergies": report.hx_allergies ? JSON.parse(report.hx_allergies) : [],
    "hx_conditions": report.hx_conditions ? JSON.parse(report.hx_conditions) : [],
    "hx_medications": report.hx_medications ? JSON.parse(report.hx_medications) : [],
  };
  console.log($scope.patientHistory);

  $scope.goto = function (state) {
    window.location = '#/tab/report/' + $stateParams.reportId + '/' + state;
  }

  $scope.deleteAllergy = function (item) {
    var list = $scope.patientHistory.hx_allergies;
    list.splice(list.indexOf(item), 1);
    console.log(list);
    $scope.patientHistory.hx_allergies = list;
    $scope.save();
  }

  $scope.deleteCondition = function (item) {
    var list = $scope.patientHistory.hx_conditions;
    list.splice(list.indexOf(item), 1);
    console.log(list);
    $scope.patientHistory.hx_conditions = list;
    $scope.save();
  }

  $scope.deleteMedication = function (item) {
    var list = $scope.patientHistory.hx_medications;
    list.splice(list.indexOf(item), 1);
    console.log(list);
    $scope.patientHistory.hx_medications = list;
    $scope.save();
  }

  $scope.toggleDelete = function () {
    $scope.showDelete = !$scope.showDelete;
  }

  $scope.save = function () {
    console.log($scope.patientHistory);
    var patientHx = {
      "hx_allergies": JSON.stringify($scope.patientHistory.hx_allergies),
      "hx_conditions": JSON.stringify($scope.patientHistory.hx_conditions),
      "hx_medications": JSON.stringify($scope.patientHistory.hx_medications),
    };

    db.update("report", $scope.patientHx, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Patient History");
    });
  }
}

function AllergiesCtrl($scope, $stateParams, $window, report, allergies) {

  $scope.allergiesList = [];

  var existingAllergies = report.hx_allergies;

  allergies.list.forEach(function (allergy) {
    var checked = existingAllergies != null ? existingAllergies.indexOf(allergy) != -1 : false;
    $scope.allergiesList.push({
      "text": allergy,
      "checked": checked
    })
  });

  $scope.add = function () {
    var selected = [];
    $scope.allergiesList.forEach(function (value, index) {
      if (value.checked) {
        selected.push(value.text);
      }
    });


    db.update("report", {
      "hx_allergies": JSON.stringify(selected),
      "patient_hx_assessed": true
    }, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Patient Allergies");
      $window.history.back();
    });
  }
}

function HomeMedicationsCtrl($scope, $stateParams, $window, report, homeMedications) {

  var existingMedications = report.hx_medications;
  var medicationsList = [];

  $scope.categories = [];
  var keys = Object.keys(homeMedications);
  keys.forEach(function (category, index) {
    var items = [];
    homeMedications[category].list.forEach(function (medication) {
      var checked = existingMedications != null ? existingMedications.indexOf(medication) != -1 : false;
      items.push({
        "text": medication,
        "checked": checked
      })
    });
    $scope.categories[index] = {
      name: homeMedications[category].name,
      items: items
    };
  });

  $scope.toggleGroup = function (categories) {
    if ($scope.isGroupShown(categories)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = categories;
    }
  };
  $scope.isGroupShown = function (categories) {
    return $scope.shownGroup === categories;
  };

  $scope.add = function () {
    var selected = [];
    $scope.categories.forEach(function (category, index) {
      category.items.forEach(function (value, index) {
        if (value.checked) {
          selected.push(value.text);
        }
      });
    });


    db.update("report", {
      "hx_medications": JSON.stringify(selected),
      "patient_hx_assessed": true
    }, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Patient Home Medications");
      $window.history.back();
    });
  }
}

function ConditionsCtrl($scope, $stateParams, $window, report, medicalConditions) {

  var existingConditions = report.hx_conditions;
  var conditionsList = [];

  $scope.categories = [];
  var keys = Object.keys(medicalConditions);
  keys.forEach(function (category, index) {
    var items = [];
    medicalConditions[category].list.forEach(function (condition) {
      var checked = existingConditions != null ? existingConditions.indexOf(condition) != -1 : false;
      items.push({
        "text": condition,
        "checked": checked
      })
    });

    $scope.categories[index] = {
      name: medicalConditions[category].name,
      items: items
    };
  });

  $scope.toggleGroup = function (categories) {
    if ($scope.isGroupShown(categories)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = categories;
    }
  };
  $scope.isGroupShown = function (categories) {
    return $scope.shownGroup === categories;
  };

  $scope.add = function () {
    var selected = [];
    $scope.categories.forEach(function (category, index) {
      category.items.forEach(function (value, index) {
        if (value.checked) {
          selected.push(value.text);
        }
      });
    });


    db.update("report", {
      "hx_conditions": JSON.stringify(selected),
      "patient_hx_assessed": true
    }, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Patient Home Conditions");
      $window.history.back();
    });
  }
}

function ExamCtrl($scope, $stateParams, report, Records) {
  $scope.report = report;
  $scope.reportId = $stateParams.reportId;

  Records.all('neuro', $stateParams.reportId)
    .then(function (neuroRecords) {
      $scope.neuroNumber = Object.size(neuroRecords);
    })
}

function NeuroCtrl($scope, $stateParams, $window, neuro) {
  $scope.neuroEntry = neuro;

  $scope.neuro = {
    "avpu": neuro.avpu,
    "gcs": neuro.gcs == 'true',
    "gcs_eyes": Number(neuro.gcs_eyes),
    "gcs_verbal": Number(neuro.gcs_verbal),
    "gcs_motor": Number(neuro.gcs_motor),
    "luxr": neuro.luxr == 'true',
    "ruxr": neuro.ruxr == 'true',
    "llxr": neuro.llxr == 'true',
    "rlxr": neuro.rlxr == 'true',
    "suspect_stroke": neuro.suspect_stroke == 'true',
    "facial_droop": neuro.facial_droop == 'true',
    "facial_droop_side": neuro.facial_droop_side == 'true',
    "arm_drift": neuro.arm_drift == 'true',
    "arm_drift_side": neuro.arm_drift_side == 'true',
    "speech": neuro.speech
  };
  console.log($scope.neuro);

  $scope.calculateGCS = function () {
    $scope.gcs_total = Number($scope.neuro.gcs_eyes) + Number($scope.neuro.gcs_verbal) + Number($scope.neuro.gcs_motor);
  }

  $scope.calculateGCS();

  $scope.save = function () {

    //    $scope.neuro.assessed = true;
    db.update("neuro", $scope.neuro, {
      'id': $stateParams.neuroId
    }).then(function () {
      console.log("Updated neuro");
      $window.history.back();
    });
  }
}

function AbcCtrl($scope, $stateParams, $window, $state, report) {

  $scope.activeButton = 1;

  $scope.abc = {
    "open_patent": report.open_patent == 'true',
    "tracheal_deviation": report.tracheal_deviation == 'true',
    "tracheal_deviation_side": report.tracheal_deviation_side == 'true',
    "interventions": report.interventions == 'true',
    "breathing_type": report.breathing_type == 'true',
    "breathing_effective": report.breathing_effective == 'true',
    "accessory_muscle": report.accessory_muscle == 'true',
    "nasal_flare": report.nasal_flare == 'true',
    "cough": report.cough == 'true',
    "cough_productive": report.cough_productive == 'true',
    "subcutaneous_emphysema": report.subcutaneous_emphysema == 'true',
    "flailed_chest": report.flailed_chest == 'true',
    "flailed_chest_side": report.flailed_chest_side == 'true',
    "suspect_pneumothorax": report.suspect_pneumothorax == 'true',
    "suspect_hemothorax": report.suspect_hemothorax == 'true',
    "ctax4": report.ctax4 == 'true',
    "lung_ul_sound": report.lung_ul_sound,
    "lung_ur_sound": report.lung_ur_sound,
    "lung_ll_sound": report.lung_ll_sound,
    "lung_lr_sound": report.lung_lr_sound,
    "pulse_location": report.pulse_location,
    "pulse_quality": report.pulse_quality,
    "pulse_regular": report.pulse_regular == 'true',
    "jvd": report.jvd == 'true',
    "cap_refill": report.cap_refill,
    "skin_color": report.skin_color,
    "skin_temperature": report.skin_temperature,
    "skin_condition": report.skin_condition,
    "heart_tones": report.heart_tones,
    "heart_tones_quality": report.heart_tones_quality,
    "peripheral_edema": report.peripheral_edema == 'true',
    "peripheral_edema_location": report.peripheral_edema_location,
    "peripheral_edema_severity": report.peripheral_edema_severity,
  };
  console.log($scope.abc);

  $scope.switchTab = function (tab) {
    $scope.activeButton = tab;
  }

  $scope.airwayProcedures = function () {
    $scope.save();
    $state.go('tab.airway', {
      "reportId": $stateParams.reportId
    });
  }

  $scope.save = function (goBack) {

    $scope.abc.abc_assessed = true;
    db.update("report", $scope.abc, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated abc");
      if (goBack)
        $window.history.back();
    });
  }
}

function TraumaCtrl($scope, $stateParams, report) {
  $scope.report = report;
  $scope.reportId = $stateParams.reportId;

  $scope.trauma = {
    "has_trauma": report.has_trauma == 'true'
  }

  $scope.toggle = function () {
    $scope.save();
  }

  $scope.save = function () {
    console.log($scope.trauma);

    db.update("report", $scope.trauma, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated trauma");
    });
  }
}

function TraumaAutoCtrl($scope, $stateParams, $window, report) {

  $scope.auto = {
    "trauma_auto_vehicle": report.trauma_auto_vehicle,
    "trauma_auto_seat": report.trauma_auto_seat,
    "trauma_auto_seatbelt": report.trauma_auto_seatbelt == 'true',
    "trauma_auto_airbag": report.trauma_auto_airbag == 'true',
    "trauma_auto_helmet": report.trauma_auto_helmet == 'true',
    "trauma_auto_leathers": report.trauma_auto_leathers == 'true',
    "trauma_auto_nb_occupants": report.trauma_auto_nb_occupants,
    "trauma_auto_vehicle_speed": report.trauma_auto_vehicle_speed,
    "trauma_auto_speed_unit": report.trauma_auto_speed_unit,
    "trauma_auto_removed_by": report.trauma_auto_removed_by,
    "trauma_auto_details_per": report.trauma_auto_details_per
  };

  $scope.toggleSeat = function ($event) {
    console.log($event.target.id);
    $scope.auto.trauma_auto_seat = $event.target.id;
  }

  $scope.save = function () {

    $scope.auto.trauma_auto_assessed = true;
    db.update("report", $scope.auto, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated trauma auto");
      $window.history.back();
    });
  }
}

function TraumaPenetratingCtrl($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {

  $scope.bodyPartsList = [];
  $scope.penetrating = {
    "trauma_penetrating_assault": report.trauma_penetrating_assault == 'true',
    "trauma_penetrating_moi": report.trauma_penetrating_moi,
    "trauma_penetrating_velocity": report.trauma_penetrating_velocity,
    "trauma_penetrating_bleeding": report.trauma_penetrating_bleeding == 'true',
    "trauma_penetrating_controlled": report.trauma_penetrating_controlled == 'true',
    "trauma_penetrating_body_parts": JSON.parse(report.trauma_penetrating_body_parts)
  };

  var bodyPartsInvolved = $scope.penetrating.trauma_penetrating_body_parts;

  bodyParts.list.forEach(function (part) {
    var checked = bodyPartsInvolved != null ? bodyPartsInvolved.indexOf(part) != -1 : false;
    $scope.bodyPartsList.push({
      "text": part,
      "checked": checked
    })
  });

  $scope.save = function () {
    var selected = [];
    $scope.bodyPartsList.forEach(function (value, index) {
      if (value.checked) {
        selected.push(value.text);
      }
    });
    $scope.penetrating.trauma_penetrating_body_parts = JSON.stringify(selected);


    $scope.penetrating.trauma_penetrating_assessed = true;
    db.update("report", $scope.penetrating, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated trauma penetrating");
      $window.history.back();
    });
  }
}

function TraumaBluntCtrl($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {

  $scope.bodyPartsList = [];
  $scope.blunt = {
    "trauma_blunt_assault": report.trauma_blunt_assault == 'true',
    "trauma_blunt_moi": report.trauma_blunt_moi,
    "trauma_blunt_bleeding": report.trauma_blunt_bleeding == 'true',
    "trauma_blunt_controlled": report.trauma_blunt_controlled == 'true',
    "trauma_blunt_body_parts": JSON.parse(report.trauma_blunt_body_parts),
  };

  var bodyPartsInvolved = $scope.blunt.trauma_blunt_body_parts;

  bodyParts.list.forEach(function (part) {
    var checked = bodyPartsInvolved != null ? bodyPartsInvolved.indexOf(part) != -1 : false;
    $scope.bodyPartsList.push({
      "text": part,
      "checked": checked
    })
  });

  $scope.save = function () {
    var selected = [];
    $scope.bodyPartsList.forEach(function (value, index) {
      if (value.checked) {
        selected.push(value.text);
      }
    });
    $scope.blunt.trauma_blunt_body_parts = JSON.stringify(selected);


    $scope.blunt.trauma_blunt_assessed = true;
    db.update("report", $scope.blunt, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated trauma blunt");
      $window.history.back();
    });
  }
}

function TraumaFallCtrl($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {

  $scope.bodyPartsList = [];
  $scope.fall = {
    "trauma_fall_assault": report.trauma_fall_assault == 'true',
    "trauma_fall_distance": report.trauma_fall_distance,
    "trauma_fall_distance_unit": report.trauma_fall_distance_unit,
    "trauma_fall_surface": report.trauma_fall_surface,
    "trauma_fall_loss_of_c": report.trauma_fall_loss_of_c == 'true',
    "trauma_fall_loss_of_c_time": report.trauma_fall_loss_of_c_time,
    "trauma_fall_bleeding": report.trauma_fall_bleeding == 'true',
    "trauma_fall_controlled": report.trauma_fall_controlled == 'true',
    "trauma_fall_body_parts": JSON.parse(report.trauma_fall_body_parts),
  };

  var bodyPartsInvolved = $scope.fall.trauma_fall_body_parts;

  bodyParts.list.forEach(function (part) {
    var checked = bodyPartsInvolved != null ? bodyPartsInvolved.indexOf(part) != -1 : false;
    $scope.bodyPartsList.push({
      "text": part,
      "checked": checked
    })
  });

  $scope.save = function () {
    var selected = [];
    $scope.bodyPartsList.forEach(function (value, index) {
      if (value.checked) {
        selected.push(value.text);
      }
    });
    $scope.fall.trauma_fall_body_parts = JSON.stringify(selected);


    $scope.fall.trauma_fall_assessed = true;
    db.update("report", $scope.fall, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated trauma fall");
      $window.history.back();
    });
  }
}

function TraumaBurnCtrl($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts, body_parts_area, $timeout) {

  var bodySvg = null;
  $scope.bodyPartsList = [];
  $scope.totalSurface = 0;
  $scope.ptl = 0;
  $scope.ftl = 0;

  $scope.burn = {
    "trauma_burn_total_surface": report.trauma_burn_total_surface,
    "trauma_burn_method": report.trauma_burn_method,
    "trauma_burn_body_type": report.trauma_burn_body_type || 'adult',
    "trauma_burn_age": report.trauma_burn_age || 'adult',
    "trauma_burn_body_parts": report.trauma_burn_body_parts != undefined ? JSON.parse(report.trauma_burn_body_parts) : {},
  };

  var bodyPartsInvolved = $scope.burn.trauma_burn_body_parts;

  $scope.calculateTotalSurface = function () {
    var totalSurface = 0;
    var ptl = 0;
    var ftl = 0;
    angular.forEach(bodyPartsInvolved, function (partObject, partName) {
      var severity = bodyPartsInvolved[partName];
      if (severity == 'Second' || severity == 'Third') {
        var age = $scope.burn.trauma_burn_age;
        var bodyType = $scope.burn.trauma_burn_body_type;
        var method = $scope.burn.trauma_burn_method;
        var criteria = method == 'rule_of_9' ? bodyType : age;
        var method_surfaces = body_parts_area[method];
        if (method_surfaces[partName]) {
          var surface = typeof (method_surfaces[partName]) == 'object' ? method_surfaces[partName][criteria] : method_surfaces[partName];
          totalSurface += surface;
          ptl += severity == "Second" ? surface : 0;
          ftl += severity == "Third" ? surface : 0;
        }
      }
    });
    $timeout(function () {
      $scope.totalSurface = totalSurface;
      $scope.ptl = ptl;
      $scope.ftl = ftl;
    });
  };

  $scope.calculateTotalSurface();

  $scope.resetBodyPartsInvolved = function () {
    bodyPartsInvolved = {};
    $scope.calculateTotalSurface();
    for (side in bodySvg) {
      for (var i = 0, len = bodySvg[side].length; i <= len; i++) {
        var el = bodySvg[side][i];
        if (el) {
          el.node.setAttribute("class", "");
        }
      }
    }
  }

  $scope.fillColors = function () {
    bodySvg = bodyMap();
    var classMap = {
      "First": "first-degree",
      "Second": "second-degree",
      "Third": "third-degree"
    }

    // Add click handler
    for (side in bodySvg) {
      for (var i = 0, len = bodySvg[side].length; i <= len; i++) {
        var el = bodySvg[side][i];
        if (el) {
          el.node.setAttribute("class", classMap[bodyPartsInvolved[el.data('id')]]);

          el.click(function () {
            var part = this.data('id');
            var current = bodyPartsInvolved[part];

            switch (current) {
            case 'First':
              bodyPartsInvolved[part] = "Second";
              this.node.setAttribute("class", classMap["Second"]);
              break;
            case 'Second':
              bodyPartsInvolved[part] = "Third";
              this.node.setAttribute("class", classMap["Third"]);
              break;
            case 'Third':
              delete bodyPartsInvolved[part];
              this.node.setAttribute("class", "");
              break;
            default:
              bodyPartsInvolved[part] = "First";
              this.node.setAttribute("class", classMap["First"]);
              break;
            }

            $scope.calculateTotalSurface();
          });
        }
      }
    }
  }

  angular.element(document).ready(function () {
    $scope.fillColors();
  });

  $scope.save = function () {
    $scope.burn.trauma_burn_body_parts = JSON.stringify(bodyPartsInvolved);
    $scope.burn.trauma_burn_total_surface = $scope.totalSurface;

    $scope.burn.trauma_burn_assessed = true;
    db.update("report", $scope.burn, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated trauma fall");
      $window.history.back();
    });
  }
}

function GiCtrl($scope, $stateParams, $window, report) {

  var map = (report.gi_pain_location != "" && report.gi_pain_location != undefined) ? report.gi_pain_location : [];

  $scope.gi = {
    "gi_soft": report.gi_soft == 'true',
    "gi_flat": report.gi_flat == 'true',
    "gi_non_distended": report.gi_non_distended == 'true',
    "gi_non_tender": report.gi_non_tender == 'true',
    "gi_rebound": report.gi_rebound == 'true',
    "gi_pain_location": map,
    "gi_obese": report.gi_obese == 'true',
    "gi_last_bm": report.gi_last_bm,
    "gi_loi": report.gi_loi,
  };
  console.log($scope.gi);

  $scope.toggleRegion = function (region) {
    if ($scope.gi.gi_pain_location.indexOf(region) == -1) {
      $scope.gi.gi_pain_location.push(region);
    } else {
      $scope.gi.gi_pain_location.splice($scope.gi.gi_pain_location.indexOf(region), 1);
    }
    console.log($scope.gi.gi_pain_location);
  }

  $scope.isSelected = function (region) {
    return $scope.gi.gi_pain_location.indexOf(region) != -1;
  }

  $scope.save = function () {
    $scope.gi.gi_assessed = true;
    db.update("report", $scope.gi, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated GI");
      $window.history.back();
    });
  }
}

function GuCtrl($scope, $stateParams, $window, report) {


  $scope.gu = {
    "gu_pain": report.gu_pain == 'true',
    "gu_frequency": report.gu_frequency == 'true',
    "gu_pain": report.gu_pain == 'true',
    "gu_hematuria": report.gu_hematuria == 'true',
    "gu_incontinence": report.gu_incontinence == 'true',
    "gu_bladder_distention": report.gu_bladder_distention == 'true',
    "gu_urinary_urgency": report.gu_urinary_urgency == 'true',
    "gu_last_void": report.gu_last_void,
  };
  console.log($scope.gu);

  $scope.save = function () {
    $scope.gu.gu_assessed = true;
    db.update("report", $scope.gu, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated GU");
      $window.history.back();
    });
  }
}

function GynCtrl($scope, $stateParams, $window, $state, report) {


  $scope.gyn = {
    "gyn_gravid": report.gyn_gravid,
    "gyn_term": report.gyn_term,
    "gyn_para": report.gyn_para,
    "gyn_abortia": report.gyn_abortia,
    "gyn_live": report.gyn_live,
    "gyn_last_menstruation": report.gyn_last_menstruation,
    "gyn_discharge": report.gyn_discharge == 'true',
    "gyn_substance": report.gyn_substance,
    "gyn_pregnant": report.gyn_pregnant,
    "gyn_edc": report.gyn_edc,
    "gyn_gestation_known": report.gyn_gestation_known == 'true',
    "gyn_gest_weeks": report.gyn_gest_weeks,
    "peripheral_edema": report.peripheral_edema == 'true',
    "peripheral_edema_location": report.peripheral_edema_location,
    "peripheral_edema_severity": report.peripheral_edema_severity,
    "gyn_membrane_intact": report.gyn_membrane_intact == 'true',
    "gyn_time_ruptured": report.gyn_time_ruptured,
    "gyn_fluid": report.gyn_fluid,
    "gyn_expected_babies": report.gyn_expected_babies,
    "gyn_fetal_mvmt": report.gyn_fetal_mvmt == 'true',
    "gyn_last_mvmt": report.gyn_last_mvmt,
    "gyn_mvmt_per_hr": report.gyn_mvmt_per_hr,
    "gyn_contractions": report.gyn_contractions == 'true',
    "gyn_contraction_duration": report.gyn_contraction_duration,
    "gyn_contraction_separation": report.gyn_contraction_separation,
  };
  console.log($scope.gyn);

  $scope.fieldDelivery = function () {
    $scope.save(false);
    $state.go('tab.field-delivery', {
      'reportId': $stateParams.reportId
    });

  }

  $scope.save = function (goBack) {
    $scope.gyn.gyn_assessed = true;
    db.update("report", $scope.gyn, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated Gyn");
      if (goBack)
        $window.history.back();
    });
  }
}

function FieldDeliveryCtrl($scope, $stateParams, $window, $ionicModal, report) {

  apgarSum = function (obj) {
    var sum = 0;
    for (key in obj) {
      sum += parseInt(obj[key]);
    };
    return sum;
  }

  var apgar1 = report.field_delivery_apgar1 != null ? JSON.parse(report.field_delivery_apgar1) : {};
  var apgar5 = report.field_delivery_apgar5 != null ? JSON.parse(report.field_delivery_apgar5) : {};

  $scope.field = {
    "field_delivery_presentation": report.field_delivery_presentation,
    "field_delivery_time": report.field_delivery_time,
    "field_delivery_meconium": report.field_delivery_meconium,
    "field_delivery_cord_cut_length": report.field_delivery_cord_cut_length,
    "field_delivery_apgar1": apgar1,
    "field_delivery_apgar5": apgar5,
    "field_delivery_stimulation_type": report.field_delivery_stimulation_type,
    "field_delivery_placenta": report.field_delivery_placenta == 'true',
    "field_delivery_placenta_time": report.field_delivery_placenta_time,
    "gyn_gestation_known": report.gyn_gestation_known == 'true',
    "field_delivery_placenta_intact": report.field_delivery_placenta_intact == 'true'
  };

  $scope.apgarTotals = {
    "apgar1": apgarSum(apgar1),
    "apgar5": apgarSum(apgar5)
  };

  $ionicModal.fromTemplateUrl('apgar.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal
  })

  $scope.openModal = function (time) {
    $scope.activeModal = time;
    $scope.apgar = time == 1 ? $scope.field.field_delivery_apgar1 : $scope.field.field_delivery_apgar5;
    $scope.modal.show()
  }

  $scope.closeModal = function () {
    if ($scope.activeModal == 1) {
      apgar1 = $scope.apgar;
      $scope.apgarTotals.apgar1 = apgarSum($scope.apgar);
    } else {
      apgar5 = $scope.apgar;
      $scope.apgarTotals.apgar5 = apgarSum($scope.apgar);
    }
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.save = function () {
    $scope.field.field_delivery_apgar1 = Object.size(apgar1) != 0 ? JSON.stringify(apgar1) : null;
    $scope.field.field_delivery_apgar5 = Object.size(apgar1) != 0 ? JSON.stringify(apgar5) : null;

    $scope.field.field_delivery_assessed = true;
    db.update("report", $scope.field, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated Field Delivery");
      $window.history.back();
    });
  }
}

function MuscularCtrl($scope, $stateParams, $window, report, bodyParts, muscularInjuries) {

  $scope.categories = [];
  var groupsShown = [];

  var existingInjuries = JSON.parse(report.muscular_complaint) || {};
  console.log(existingInjuries);

  $scope.muscular = {
    "muscular_has_complaint": report.muscular_has_complaint == 'true',
    "muscular_complaint": existingInjuries,
  };

  bodyParts.list.forEach(function (bodyPart, index) {
    var injuries = [];
    muscularInjuries.list.forEach(function (injury) {
      if (existingInjuries) {
        var checked = existingInjuries[bodyPart] != null ? existingInjuries[bodyPart].indexOf(injury) != -1 : false;
        injuries.push({
          "text": injury,
          "checked": checked
        })
        if (checked && groupsShown.indexOf(bodyPart) == -1) {
          groupsShown.push(bodyPart);
        }
      }
    });

    $scope.categories[index] = {
      name: bodyPart,
      injuries: injuries
    };
  });

  $scope.toggleGroup = function (bodyPart) {
    if (groupsShown.indexOf(bodyPart) == -1) {
      groupsShown.push(bodyPart);
    } else {
      groupsShown.splice(groupsShown.indexOf(bodyPart), 1);
    }
  };
  $scope.isGroupShown = function (bodyPart) {
    return groupsShown.indexOf(bodyPart) != -1;
  };

  $scope.save = function () {
    var selected = {};
    $scope.categories.forEach(function (bodyPart, index) {
      var listForBodyPart = []
      bodyPart.injuries.forEach(function (value, index) {
        if (value.checked) {
          listForBodyPart.push(value.text);
        }
      });
      if (listForBodyPart.length != 0) {
        selected[bodyPart.name] = listForBodyPart;
      }
    });

    $scope.muscular.muscular_complaint = JSON.stringify(selected);
    $scope.muscular.muscular_assessed = true;

    db.update("report", $scope.muscular, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Muscular/Skeletal");
      $window.history.back();
    });
  }
}

function ProceduresCtrl($scope, $webSql, $stateParams, DB_CONFIG, report, Records) {
  $scope.report = report;
  $scope.reportId = $stateParams.reportId;

  $scope.procedures = {
    "spinal_assessed": report.spinal_assessed == 'true'
  };

  Records.all('splinting', $stateParams.reportId)
    .then(function (records) {
      $scope.splintingNumber = Object.size(records);
    })
    .then(function () {
      Records.all('medication', $stateParams.reportId)
        .then(function (records) {
          $scope.medicationNumber = Object.size(records);
        })
        .then(function () {
          Records.all('in_out', $stateParams.reportId)
            .then(function (records) {
              $scope.inOutNumber = Object.size(records);
            })
            .then(function () {
              Records.all('ecg', $stateParams.reportId)
                .then(function (records) {
                  $scope.ecgNumber = Object.size(records);
                })
                .then(function () {
                  Records.all('iv_io', $stateParams.reportId)
                    .then(function (records) {
                      $scope.ivIoNumber = Object.size(records);
                    })
                })
            })
        })
    });
}

function AirwayCtrl($scope, $stateParams, report, Records) {
  $scope.report = report;
  $scope.reportId = $stateParams.reportId;

  Records.all('airway_basic', $stateParams.reportId)
    .then(function (records) {
      $scope.basicAirwayNumber = Object.size(records);
    })
    .then(function () {
      Records.all('airway_ventilator', $stateParams.reportId)
        .then(function (records) {
          $scope.ventilatorNumber = Object.size(records);
        })
        .then(function () {
          Records.all('airway_cpap_bipap', $stateParams.reportId)
            .then(function (records) {
              $scope.cpapBipapNumber = Object.size(records);
            })
            .then(function () {
              Records.all('airway_suction', $stateParams.reportId)
                .then(function (records) {
                  $scope.suctionNumber = Object.size(records);
                })
            })
        })
    });
}

function BasicAirwayCtrl($scope, $stateParams, $window, procedure) {


  $scope.basic = {
    "oxygen_volume": procedure.oxygen_volume,
    "basic_maneuvers": procedure.basic_maneuvers,
    "opa": procedure.opa,
    "npa": procedure.npa,
    "bvm": procedure.bvm == 'true',
    "airway_rate": procedure.airway_rate
  };
  console.log($scope.basic);

  $scope.save = function () {
    db.update("airway_basic", $scope.basic, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated Basic Airway");
      $window.history.back();
    });
  }
}

function InvasiveAirwayCtrl($scope, $stateParams, $window, report) {
  $scope.report = report;

  $scope.invasive = {
    "invasive_airway_secured": $scope.report.invasive_airway_secured == 'true',
    "invasive_airway_device": $scope.report.invasive_airway_device,
    "invasive_airway_size": $scope.report.invasive_airway_size,
    "invasive_airway_cuffed": $scope.report.invasive_airway_cuffed == 'true',
    "invasive_airway_inflation": $scope.report.invasive_airway_inflation,
    "invasive_airway_technique": $scope.report.invasive_airway_technique,
    "invasive_airway_distance": $scope.report.invasive_airway_distance,
    "invasive_airway_attempts": $scope.report.invasive_airway_attempts
  };
  console.log($scope.invasive);

  $scope.save = function () {
    $scope.invasive.invasive_airway_assessed = true;
    db.update("report", $scope.invasive, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated Invasive Airway");
      $window.history.back();
    });
  }
}

function VentilatorCtrl($scope, $stateParams, $window, procedure) {

  $scope.ventilator = {
    "control": procedure.control,
    "mode": procedure.mode,
    "rate": procedure.rate,
    "tidal_volume": procedure.tidal_volume,
    "inspiration_time": procedure.inspiration_time,
    "inspiration_ratio": procedure.inspiration_ratio,
    "expiration_ratio": procedure.expiration_ratio,
    "fiO2": procedure.fiO2,
    "peep": procedure.peep,
    "sensitivity": procedure.sensitivity,
    "expiration_pressure": procedure.expiration_pressure,
    "expiration_tidal_volume": procedure.expiration_tidal_volume,
    "max_inspiration_pressure": procedure.max_inspiration_pressure,
    "plateau_pressure": procedure.plateau_pressure,
    "pressure_support": procedure.pressure_support,
    "high_pressure_limit": procedure.high_pressure_limit,
    "low_pressure_limit": procedure.low_pressure_limit,
    "low_min_volume": procedure.low_min_volume
  };
  console.log($scope.ventilator);

  $scope.save = function () {

    db.update("airway_ventilator", $scope.ventilator, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated Ventilator");
      $window.history.back();
    });
  }
}

function CpapBipapCtrl($scope, $stateParams, $window, procedure) {


  $scope.cpap = {
    "device": procedure.device,
    "size": procedure.size,
    "fiO2": procedure.fiO2,
    "peep": procedure.peep,
    "pressure": procedure.pressure,
  };
  console.log($scope.cpap);

  $scope.save = function () {

    db.update("airway_cpap_bipap", $scope.cpap, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated CPAP/BiPAP");
      $window.history.back();
    });
  }
}

function SuctionCtrl($scope, $stateParams, $window, procedure) {


  $scope.suction = {
    "duration": procedure.duration,
    "amount": procedure.amount,
    "tip": procedure.tip,
    "size": procedure.size,
  };
  console.log($scope.suction);

  $scope.save = function () {

    db.update("airway_suction", $scope.suction, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated Suction");
      $window.history.back();
    });
  }
}

function IvIoCtrl($scope, $stateParams, $window, procedure) {

  $scope.ivio = {
    "site": procedure.site,
    "side": procedure.side,
    "gauge": procedure.gauge,
    "attempts": procedure.attemps,
    "successful": procedure.successful == true,
    "fluid": procedure.fluid,
    "fluid_other": procedure.fluid_other
  };
  console.log($scope.ivio);

  $scope.save = function () {

    db.update("iv_io", $scope.ivio, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated IV/IO");
      $window.history.back();
    });
  }
}

function SplintingCtrl($scope, $stateParams, $window, procedure) {

  $scope.splinting = {
    "location": procedure.location,
    "side": procedure.side,
    "sensation_prior": procedure.sensation_prior == 'true',
    "sensation_post": procedure.sensation_post == 'true',
    "traction_applied": procedure.traction_applied == 'true',
    "splinting_type": procedure.splinting_type,
    "splinting_type_other": procedure.splinting_type_other,
    "position_found": procedure.position_found,
    "position_found_other": procedure.position_found_other
  };
  console.log($scope.splinting);

  $scope.save = function () {
    db.update("splinting", $scope.splinting, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated Splinting");
      $window.history.back();
    });
  }
}

function MedicationCtrl($scope, $stateParams, $window, procedure, homeMedications) {

  $scope.medication_list = procedure.medication_type == 'Generic' ? homeMedications.generic.list : homeMedications.brand.list;
  if ($scope.medication_list[0] != "Other")
    $scope.medication_list.unshift("Other");

  $scope.medication = {
    "medication_type": procedure.medication_type,
    "medication": procedure.medication,
    "medication_other": procedure.medication_other,
    "dose": procedure.dose,
    "dose_unit": procedure.dose_unit,
    "route": procedure.route,
    "route_other": procedure.route_other,
    "indication": procedure.indication,
    "administrated": procedure.administrated,
    "administrated_other": procedure.administrated_other,
    "same_dose": procedure.same_dose,
  };
  console.log($scope.medication);

  $scope.updateMedicationList = function () {
    if ($scope.medication.medication_type == 'Generic') {
      $scope.medication_list = homeMedications.generic.list;
    } else {
      $scope.medication_list = homeMedications.brand.list;
    }
    $scope.medication.medication = '';
    if ($scope.medication_list[0] != "Other")
      $scope.medication_list.unshift("Other");
  }

  $scope.save = function () {

    db.update("medication", $scope.medication, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated Medication");
      $window.history.back();
    });
  }
}

function SpinalCtrl($scope, $stateParams, $window, report) {

  $scope.spinal = {
    "spinal_manual": report.spinal_manual == 'true',
    "spinal_c_collar": report.spinal_c_collar == 'true',
    "spinal_collar_size": report.spinal_collar_size,
    "spinal_backboard": report.spinal_backboard,
    "spinal_transferred_by": report.spinal_transferred_by,
    "spinal_secured_with": report.spinal_secured_with,
  };
  console.log($scope.spinal);

  $scope.save = function () {

    $scope.spinal.spinal_assessed = true;
    db.update("report", $scope.spinal, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated Medication");
      $window.history.back();
    });
  }
}

function InOutCtrl($scope, $stateParams, $window, procedure) {


  $scope.inOut = {
    "direction": procedure.direction,
    "volume": procedure.volume,
    "substance": procedure.substance,
    "substance_other": procedure.substance_other,
  };
  console.log($scope.inOut);

  $scope.save = function () {

    db.update("in_out", $scope.inOut, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated In/Out");
      $window.history.back();
    });
  }
}

function EcgCtrl($scope, $stateParams, $window, procedure) {


  $scope.ecg = {
    "leads_nb": procedure.leads_nb,
    "rhythm": procedure.rhythm,
    "regular": procedure.regular == 'true',
    "bbb": procedure.bbb == 'true',
    "bbb_side": procedure.bbb_side,
    "st_changes": procedure.st_changes == 'true',
    "st_elevation_list": procedure.st_elevation_list ? JSON.parse(procedure.st_elevation_list) : [],
    "st_depression_list": procedure.st_depression_list ? JSON.parse(procedure.st_depression_list) : [],
    "pacs": procedure.pacs == 'true',
    "pvcs": procedure.pvcs == 'true',
  };
  console.log($scope.ecg);

  $scope.elevation = $scope.ecg.st_elevation_list;
  $scope.depression = $scope.ecg.st_depression_list;

  $scope.toggle = function (item) {
    if (($scope.elevation.indexOf(item) == -1) && ($scope.depression.indexOf(item) == -1)) {
      $scope.elevation.push(item);
    } else if ($scope.elevation.indexOf(item) != -1) {
      $scope.elevation.splice($scope.elevation.indexOf(item), 1);
      $scope.depression.push(item);
    } else if ($scope.depression.indexOf(item) != -1) {
      $scope.depression.splice($scope.elevation.indexOf(item), 1);
    }
    console.dir($scope.elevation);
    console.dir($scope.depression);
  };

  $scope.save = function () {
    $scope.ecg.st_elevation_list = JSON.stringify($scope.elevation);
    $scope.ecg.st_depression_list = JSON.stringify($scope.depression);


    db.update("ecg", $scope.ecg, {
      'id': $stateParams.procedureId
    }).then(function () {
      console.log("Updated ECG");
      $window.history.back();
    });
  }
}

function SignaturesCtrl($scope, $stateParams, $window, report) {

  $scope.activeButton = 1;
  $scope.canvasWidth = window.innerWidth - 80;
  $scope.canvasHeight = ($scope.canvasWidth / 3) < 200 ? ($scope.canvasWidth / 3) : 250;

  var signaturePad = null;
  var draftSignatures = [];
  var savedSignatures = [];

  function wireCanvas() {
    var tab = $scope.activeButton;
    switch (tab) {
    case 1:
      wrapper = document.getElementById("signature-pad-practitioner");
      break;
    case 2:
      wrapper = document.getElementById("signature-pad-patient");
      break;
    case 3:
      wrapper = document.getElementById("signature-pad-hospital");
      break;
    case 4:
      wrapper = document.getElementById("signature-pad-witness");
      break;
    default:
      break;
    }
    clearButton = wrapper.querySelector("[data-action=clear]");
    canvas = wrapper.querySelector("canvas");
    canvas.width = $scope.canvasWidth;
    canvas.height = $scope.canvasHeight;

    signaturePad = new SignaturePad(canvas, {
      penColor: "rgb(66, 133, 244)",
      maxWidth: 1.5
    });

    // Load Signature if it exists in DB
    if (savedSignatures[tab] != "") {
      draftSignatures[tab] = savedSignatures[tab];
    }
    // If draft Signature exists, load it
    if (draftSignatures[tab]) {
      signaturePad.fromDataURL(draftSignatures[tab]);
    }

    clearButton.addEventListener("click", function (event) {
      signaturePad.clear();
      draftSignatures[$scope.activeButton] = "";
      //      savedSignatures[$scope.activeButton] = "";
    });

  }

  // Load Signatures
  savedSignatures[1] = report.signature_practitioner;
  savedSignatures[2] = report.signature_patient;
  savedSignatures[3] = report.signature_hospital;
  savedSignatures[4] = report.signature_witness;

  wireCanvas();

  function resizeCanvas() {
    $scope.canvasWidth = window.innerWidth - 80;
    $scope.canvasHeight = ($scope.canvasWidth / 3) < 250 ? ($scope.canvasWidth / 3) : 250;
    setTimeout(wireCanvas(), 100);
  }

  window.onresize = resizeCanvas;

  $scope.signatures = {
    "signature_practitioner_name": report.signature_practitioner_name,
    "signature_patient_name": report.signature_patient_name,
    "signature_hospital_name": report.signature_hospital_name,
    "signature_witness_name": report.signature_witness_name,
    "no_signature": report.no_signature == 'true',
    "no_signature_reason": report.no_signature_reason
  };

  console.log($scope.signatures);

  $scope.switchTab = function (tab) {
    draftSignatures[$scope.activeButton] = signaturePad.toDataURL();
    $scope.activeButton = tab;
    wireCanvas();
  }

  function saveSignature(nb) {
    if (!draftSignatures[nb] || draftSignatures[nb] == "") {
      if (savedSignatures[nb] && savedSignatures[nb] != "") {
        return savedSignatures[nb];
      } else
        return "";
    } else
      return draftSignatures[nb];
  }

  $scope.save = function () {
    // Save current signature
    draftSignatures[$scope.activeButton] = signaturePad.toDataURL();
    $scope.signatures.signature_practitioner = saveSignature(1);
    $scope.signatures.signature_patient = saveSignature(2);
    $scope.signatures.signature_hospital = saveSignature(3);
    $scope.signatures.signature_witness = saveSignature(4);


    $scope.signatures.signature_assessed = true;
    db.update("report", $scope.signatures, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated Signatures");
      $window.history.back();
    });
  }
}

function CallInfoCtrl($scope, $stateParams, $window, $state, report, ppe, settings) {

  $scope.ppeList = [];

  $scope.call = {
    "call_info_attendant1": report.call_info_attendant1,
    "call_info_attendant1_other": report.call_info_attendant1_other,
    "call_info_attendant2": report.call_info_attendant2,
    "call_info_attendant2_other": report.call_info_attendant2_other,
    "call_info_driver": report.call_info_driver,
    "call_info_driver_other": report.call_info_driver_other,
    "call_info_unit_nb": report.call_info_unit_nb,
    "call_info_run_nb": report.call_info_run_nb,
    "call_info_respond_to": report.call_info_respond_to,
    "call_info_milage_start": report.call_info_milage_start,
    "call_info_milage_end": report.call_info_milage_end,
    "call_info_code_en_route": report.call_info_code_en_route,
    "call_info_code_return": report.call_info_code_return,
    "call_info_transported_to": report.call_info_transported_to,
    "call_info_transported_position": report.call_info_transported_position,
    "call_info_time": report.call_info_time != '' ? JSON.parse(report.call_info_time) : {},
    "call_info_ppe": report.call_info_ppe != undefined ? JSON.parse(report.call_info_ppe) : [],
    "call_info_determinant": report.call_info_determinant != '' ? JSON.parse(report.call_info_determinant) : {},
    "call_info_assistance": report.call_info_assistance,
  };

  var existingPpe = $scope.call.call_info_ppe;

  ppe.list.forEach(function (equpiment) {
    var checked = existingPpe != null ? existingPpe.indexOf(equpiment) != -1 : false;
    $scope.ppeList.push({
      "text": equpiment,
      "checked": checked
    })
  });

  $scope.attendantsList = settings.partners ? JSON.parse(settings.partners) : [];
  var me = settings.first_name + ' ' + settings.last_name;
  $scope.attendantsList.unshift(me);
  $scope.attendantsList.push("Other");

  $scope.noTransport = function () {
    $scope.save();
    $state.go('tab.no-transport', {
      "reportId": $stateParams.reportId
    });
  }

  $scope.save = function (goBack) {

    // PPE
    var selected = [];
    $scope.ppeList.forEach(function (value, index) {
      if (value.checked) {
        selected.push(value.text);
      }
    });
    $scope.call.call_info_ppe = JSON.stringify(selected);

    // Determinant
    $scope.call.call_info_determinant = JSON.stringify($scope.call.call_info_determinant);

    // Time
    $scope.call.call_info_time = JSON.stringify($scope.call.call_info_time);


    $scope.call.call_info_assessed = true;
    db.update("report", $scope.call, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated Call Info");
      if (goBack)
        $window.history.back();
    });
  }
}

function NoTransportCtrl($scope, $stateParams, $window, report) {


  $scope.noTransport = {
    "no_transport_mentally_capable": report.no_transport_mentally_capable == 'true',
    "no_transport_should_transport": report.no_transport_should_transport == 'true',
    "no_transport_risk_informed": report.no_transport_risk_informed == 'true',
    "no_transport_reason": report.no_transport_reason,
    "no_transport_reason_other": report.no_transport_reason_other,
    "no_transport_left_with": report.no_transport_left_with,
    "no_transport_left_with_other": report.no_transport_left_with_other,
    "no_transport_consult_with": report.no_transport_consult_with
  };

  $scope.save = function () {

    $scope.noTransport.no_transport_assessed = true;
    db.update("report", $scope.noTransport, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated No Transport");
      $window.history.back();
    });
  }
}

function NarrativeCtrl($scope, $stateParams, $window, narrative) {
  $scope.narrativeEntry = narrative;

  $scope.narrativeEntry = {
    "narration": $scope.narrativeEntry.narration
  };
  console.log($scope.narrativeEntry);

  $scope.save = function () {
    console.log($scope.narrativeEntry);

    db.update("narrative", $scope.narrativeEntry, {
      'id': $stateParams.narrativeId
    }).then(function () {
      console.log("Updated Narrative");
      $window.history.back();
    });
  }
}

function CodeListCtrl($scope, $stateParams, codeList) {
  $scope.codeList = codeList;
  $scope.showDelete = false;

  $scope.toggleDelete = function () {
    $scope.showDelete = !$scope.showDelete;
  }

  $scope.deleteItem = function (itemId) {

    db.del('code', {
        "id": itemId
      })
      .then(function () {
        delete $scope.codeList[itemId];
      });
  }
}

function CodeCtrl($scope, $stateParams, codeList, $window) {
  $scope.timer = 0;
  $scope.timerId = 0;

  $scope.start = function () {
    if ($scope.timer == 0) {
      $scope.timer++
        $scope.timerId = setInterval(function () {
          $scope.$apply(function () {
            $scope.timer++;
          });
        }, 1000);
      $scope.code = {
        "code": "Start",
        "time": new Date()
      };
      $scope.add();
    }

  }

  $scope.stop = function () {
    $scope.timer = 0;
    clearInterval($scope.timerId);
    $scope.code = {
      "code": "Stop",
      "time": new Date()
    };
    $scope.add();
  }

  $scope.tap = function ($event) {
    $scope.code = {
      "code": $event.srcElement.innerText,
      "time": new Date()
    };
    $scope.add();
  }

  $scope.tapExit = function ($event) {
    $scope.code = {
      "code": $event.srcElement.innerText,
      "time": new Date()
    };
    $scope.add();
    $window.location = '#/tab/report/' + $stateParams.reportId + '/code-list';
  }

  $scope.add = function () {

    $scope.code.report_id = $stateParams.reportId;
    db.insert("code", $scope.code)
      .then(function () {
        console.log("Updated Code");
      });
  }
}

function ExportCtrl($scope, $stateParams, $window, settings, $state) {

  var defaults = {
    //    short_report: true,
    patient_info: true,
    vitals: true,
    vitals_charts: true,
    chief_complaint: true,
    patient_hx: true,
    exam: true,
    procedures: true,
    signatures: true,
    call_info: true,
    narrative: true,
    code: true
  }

  $scope.mySettings = {
    "export": settings.export ? JSON.parse(settings.export) : defaults
  }
  console.log($scope.mySettings.export);


  $scope.export = function () {
    var set = {};
    set.export = JSON.stringify($scope.mySettings.export);
    console.log(set);
    db.update("settings", set, {
      'id': 1
    }).then(function () {
      console.log("Updated Settings");
      $state.go('tab.export-pdf', {
        "reportId": $stateParams.reportId
      });
    });
  }
}

function ListCtrl($scope, $stateParams, list, urlData, $state) {
  $scope.list = list;
  $scope.reportId = $stateParams.reportId;
  $scope.showDelete = false;

  $scope.toggleDelete = function () {
    $scope.showDelete = !$scope.showDelete;
  }

  $scope.deleteItem = function (itemId) {

    db.del(urlData.tableName, {
        "id": itemId
      })
      .then(function () {
        delete $scope.list[itemId];
      });
  }

  $scope.addItem = function () {

    db.insert(urlData.tableName, {
      "report_id": $stateParams.reportId
    }).then(function (results) {
      var params = {
        "reportId": $stateParams.reportId
      };
      params[urlData.indexName] = results.insertId
      $state.go(urlData.newRecordState, params);
    });
  }
}

function SettingsCtrl($scope, $stateParams, $window, settings, CameraFactory, $ionicModal) {
  $scope.settings = settings;
  $scope.canvas = null;
  $scope.activeButton = 1;
  $scope.addPartner = {
    name: ""
  };

  $scope.form = {
    "first_name": settings.first_name,
    "last_name": settings.last_name,
    "identification": settings.identification,
    "position": settings.position,
    "work_place": settings.work_place,
    "send_report_to": settings.send_report_to,
    "photoUrl": settings.photoUrl,
    "photoBase64": settings.photoBase64
  };

//  alert("Dans la bdd" + $scope.photoBase64);

  $scope.partners = settings.partners ? JSON.parse(settings.partners) : [];

  $scope.getPhoto = function (fromCamera) {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.FILE_URL,
      sourceType: fromCamera ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true,
      cameraDirection: Camera.Direction.FRONT
    };
    CameraFactory.getPicture(options).then(function (imageURI) {
        $scope.canvas = document.getElementById("profileCanvas");
        var ctx = $scope.canvas.getContext("2d");
        var img = document.getElementById("profilePicture");
        angular.element(img).bind("load", function (e) {
          $scope.canvas.height = img.height;
          $scope.canvas.width = img.width;
          ctx.drawImage(img, 0, 0);
          $scope.form.photoBase64 = $scope.canvas.toDataURL(imageURI || 'image/png');
        });
        $scope.form.photoUrl = imageURI;
      },
      function (err) {
        console.err(err);
      });
  };

  $scope.removePhoto = function () {
    $scope.form.photoUrl = '';
    $scope.form.photoBase64 = safeImage(null);
  }

  $scope.switchTab = function (tab) {
    $scope.activeButton = tab;
  }

  $scope.toggleDelete = function () {
    $scope.showDelete = !$scope.showDelete;
  }

  $scope.deletePartner = function (index) {
    $scope.partners.splice(index, 1);
  }

  $ionicModal.fromTemplateUrl('add_partner.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.modal = modal
  })

  $scope.openModal = function () {
    $scope.modal.show();
  }

  $scope.closeModal = function () {
    $scope.partners.push($scope.addPartner.name);
    $scope.modal.hide();
    $scope.addPartner.name = "";
  };

  $scope.$on('$destroy', function () {
    $scope.modal.remove();
  });

  $scope.save = function () {
    $scope.form.partners = JSON.stringify($scope.partners);
    db.update("settings", $scope.form, {
      'id': 1
    }).then(function () {
      console.log("Updated Settings");
      $window.history.back();
    });
  }
}

angular.module('ePCR.controllers', [])
  .controller('DashCtrl', DashCtrl)
  .controller('ReportsCtrl', ReportsCtrl)
  .controller('ReportDetailCtrl', ReportDetailCtrl)
  .controller('PersonalInfoCtrl', PersonalInfoCtrl)
  .controller('VitalsChartCtrl', VitalsChartCtrl)
  .controller('VitalsCtrl', VitalsCtrl)
  .controller('ChiefComplaintCtrl', ChiefComplaintCtrl)
  .controller('PatientHistoryCtrl', PatientHistoryCtrl)
  .controller('AllergiesCtrl', AllergiesCtrl)
  .controller('HomeMedicationsCtrl', HomeMedicationsCtrl)
  .controller('ConditionsCtrl', ConditionsCtrl)
  .controller('ExamCtrl', ExamCtrl)
  .controller('NeuroCtrl', NeuroCtrl)
  .controller('AbcCtrl', AbcCtrl)
  .controller('TraumaCtrl', TraumaCtrl)
  .controller('TraumaAutoCtrl', TraumaAutoCtrl)
  .controller('TraumaPenetratingCtrl', TraumaPenetratingCtrl)
  .controller('TraumaBluntCtrl', TraumaBluntCtrl)
  .controller('TraumaFallCtrl', TraumaFallCtrl)
  .controller('TraumaBurnCtrl', TraumaBurnCtrl)
  .controller('GiCtrl', GiCtrl)
  .controller('GuCtrl', GuCtrl)
  .controller('GynCtrl', GynCtrl)
  .controller('FieldDeliveryCtrl', FieldDeliveryCtrl)
  .controller('MuscularCtrl', MuscularCtrl)
  .controller('ProceduresCtrl', ProceduresCtrl)
  .controller('AirwayCtrl', AirwayCtrl)
  .controller('BasicAirwayCtrl', BasicAirwayCtrl)
  .controller('InvasiveAirwayCtrl', InvasiveAirwayCtrl)
  .controller('VentilatorCtrl', VentilatorCtrl)
  .controller('CpapBipapCtrl', CpapBipapCtrl)
  .controller('SuctionCtrl', SuctionCtrl)
  .controller('IvIoCtrl', IvIoCtrl)
  .controller('SplintingCtrl', SplintingCtrl)
  .controller('MedicationCtrl', MedicationCtrl)
  .controller('SpinalCtrl', SpinalCtrl)
  .controller('InOutCtrl', InOutCtrl)
  .controller('EcgCtrl', EcgCtrl)
  .controller('SignaturesCtrl', SignaturesCtrl)
  .controller('CallInfoCtrl', CallInfoCtrl)
  .controller('NoTransportCtrl', NoTransportCtrl)
  .controller('NarrativeCtrl', NarrativeCtrl)
  .controller('CodeListCtrl', CodeListCtrl)
  .controller('CodeCtrl', CodeCtrl)
  .controller('ExportCtrl', ExportCtrl)
  .controller('ExportPdfCtrl', ExportPdfCtrl)
  .controller('ListCtrl', ListCtrl)
  .controller('SettingsCtrl', SettingsCtrl);
angular.module("ePCR.database", ['angular-websql', 'ePCR.schema'])

.factory('database', function($webSql, DB_CONFIG) {
  
  return {
    create: function() {
      console.log("Creating database tables");
      db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
      angular.forEach(DB_CONFIG.tables, function(table) {
        db.createTable(table.name, table.columns);
        console.log('Table ' + table.name + ' initialized');
      });
      // Create Settings record
      db.insert('settings', {"first_name":""}).then(function(results) {
        console.log("Initialized Settings record");
      });
    }
  }
    
});
angular.module('ePCR.directives', [])

.directive('goClick', function ($location) {
  return function (scope, element, attrs) {
    var path;

    attrs.$observe('goClick', function (val) {
      path = val;
    });

    element.bind('click', function () {
      scope.$apply(function () {
        $location.path(path);
      });
    });
  };
})

.directive('chartsContainer', function ($window) {
    return function (scope, element, attrs) {
        element.height(300);
    }
})

.directive('myDateTimePicker', function ($ionicPopup) {
  return {
    restrict: 'E',
    template: '<input class="my-date-time-picker" type="text" readonly="readonly" ng-model="dateModel" ng-click="popup()" placeholder="{{placeholder}}">',
    scope: {
      'title': '@',
      'dateModel': '=ngModel',
      'placeholder': '@'
    },
    controller : function($scope, $filter, $ionicPopup) {
      $scope.tmp = {};
      $scope.pop = null;
      $scope.tmp.newDate = $scope.dateModel || Date.now();
      
      $scope.onTimeSet = function(newDate, oldDate) {
//        $scope.dateModel = $scope.tmp.newDate;
        $scope.dateModel = $filter('date')($scope.tmp.newDate, 'medium');
        $scope.pop.close();
      };

      $scope.popup = function() {
        $scope.pop = $ionicPopup.show({
          template: '<div class="my-date-time-picker"><datetimepicker data-ng-model="tmp.newDate" data-on-set-time="onTimeSet(newDate, oldDate)"></datetimepicker></div>',
          title: $scope.title,
          scope: $scope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Choose</b>',
              type: 'button-positive',
              onTap: function(e) {
                //$scope.$apply(function() { //error: apply already in progress
                  $scope.dateModel = $scope.tmp.newDate;
                  $scope.formatted_datetime = $filter('date')($scope.tmp.newDate, 'medium');
                //});
              }
            } //second button
          ] //buttons array
        }); //ionicpopup.show
      }; //scope.popup();
    }
  };
});
function ExportPdfCtrl($scope, $stateParams, $window, report, Records, settings, seatsMap, body_parts_names, burnDegrees, gastroMap, timesString, exportTableDefinition) {

  var BINARY_ARR = null;
  var currentfileEntry = null;

  $scope.mySettings = {
    "export": settings.export ? JSON.parse(settings.export) : defaults
  }
//  alert("defined:" + defined(settings.photoBase64));
//  alert("photo:" + safeImage(settings.photoBase64));

  $scope.docDefinition = {};

  var getTableArray = function (records, tableName) {

    var tableRecords = [];
    var header = [];
    angular.forEach(exportTableDefinition[tableName], function (definition, field) {
      header.push(definition.name);
    });

    tableRecords.push(header);

    for (index in records) {
      var row = [];
      angular.forEach(exportTableDefinition[tableName], function (definition, field) {
        var value = records[index][field] || '';
        if (value == 'true')
          value = 'Yes';
        else if (value == 'false')
          value = '';
        if (records[index][definition.unit]) {
          value += ' ' + records[index][definition.unit];
        }
        if (records[index][definition.other]) {
          value = records[index][definition.other];
        }
        if (value == 'true' & records[index][definition.side]) {
          value = records[index][definition.side];
        }
        row.push(String(value));
      });
      tableRecords.push(row);
    }

    return tableRecords;
  };

  Records.all('vitals', $stateParams.reportId)
    .then(function (records) {
      $scope.vitalsRecords = records;
    })
    .then(function () {
      Records.all('neuro', $stateParams.reportId)
        .then(function (records) {
          $scope.neuroRecords = records;
        })
        .then(function () {
          Records.all('airway_basic', $stateParams.reportId)
            .then(function (records) {
              $scope.basicAirwayRecords = records;
            })
            .then(function () {
              Records.all('airway_ventilator', $stateParams.reportId)
                .then(function (records) {
                  $scope.ventilatorRecords = records;
                })
                .then(function () {
                  Records.all('airway_cpap_bipap', $stateParams.reportId)
                    .then(function (records) {
                      $scope.cpapRecords = records;
                    })
                    .then(function () {
                      Records.all('airway_suction', $stateParams.reportId)
                        .then(function (records) {
                          $scope.suctionRecords = records;
                        })
                        .then(function () {
                          Records.all('narrative', $stateParams.reportId)
                            .then(function (records) {
                              $scope.narrativeRecords = records;
                            })
                            .then(function () {
                              Records.all('iv_io', $stateParams.reportId)
                                .then(function (records) {
                                  $scope.ivIoRecords = records;
                                })
                                .then(function () {
                                  Records.all('splinting', $stateParams.reportId)
                                    .then(function (records) {
                                      $scope.splintingRecords = records;
                                    })
                                    .then(function () {
                                      Records.all('medication', $stateParams.reportId)
                                        .then(function (records) {
                                          $scope.medicationRecords = records;
                                        })
                                        .then(function () {
                                          Records.all('in_out', $stateParams.reportId)
                                            .then(function (records) {
                                              $scope.inOutRecords = records;
                                            })
                                            .then(function () {
                                              Records.all('ecg', $stateParams.reportId)
                                                .then(function (records) {
                                                  $scope.ecgRecords = records;
                                                })
                                                .then(function () {
                                                  Records.all('code', $stateParams.reportId)
                                                    .then(function (records) {
                                                      $scope.cprRecords = records;
                                                    })
                                                    .then(function () {
                                                      Records.get('settings', 1)
                                                        .then(function (record) {
                                                          $scope.settingsRecord = record;
                                                          fillDocDefinition();
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    });



  function empty() {
    return [
      {
        text: ""
      }
    ]
  }

  function include(section, object) {
    return $scope.mySettings.export[section] ? object : '';
  }

  function heading(rec, title) {
    return Object.size(rec) != 0 ? {
      text: title,
      style: 'section_heading'
    } : ""
  }

  function table(rec, tableName) {
    return Object.size(rec) != 0 ? {
      style: 'tableExample',
      table: {
        headerRows: 1,
        body: getTableArray(rec, tableName)
      }
    } : ""
  }

  function header() {
    return {
      columns: [
        {
          text: [
            {
              text: 'Patient Care Report\n',
              style: 'header'
          },
            {
              text: 'Report date: ' + moment().format('MMM D, YYYY'),
              style: 'medium_text'
          },
        ]
      },
      {
        text: [
          'By ' + safe($scope.settingsRecord.first_name) + " " + safe($scope.settingsRecord.last_name) + '\n',
            {
              text: safe($scope.settingsRecord.position) + ' in ' + safe($scope.settingsRecord.work_place) + '\n' + 'ID: ' + safe($scope.settingsRecord.identification),
              style: "medium_text"
          }
        ],
          alignment: 'right'
      },
      {
        image: safeImage(settings.photoBase64),
        height: defined(settings.photoBase64) ? 60 : 0,
        width: defined(settings.photoBase64) ? 60 : 0,
        alignment: 'right'
      }
    ],
      columnGap: 10
    }
  }

  function patientInfo() {
    if (report.patient_info_assessed){
      return {
        columns: [
          {
            text: [
              {
                text: 'Patient Info\n',
                style: 'section_heading'
                },
              {
                text: 'Name: ',
                style: 'label'
          },
                safe(report.first_name) + ' ' + safe(report.last_name) + '\n',
              {
                text: 'Gender: ',
                style: 'label'
          },
                safe(report.gender) + "\n",
              {
                text: 'Weight: ',
                style: 'label'
          },
                safe(report.weight) + safe(report.weight_unit) + '\n',
              {
                text: 'D.o.B: ',
                style: 'label'
          },
                moment(report.date_of_birth).format('MMM D, YYYY') + " (" + (moment().year() - moment(report.date_of_birth).year()) + " y. old)\n",
              {
                text: 'Next of Kin: ',
                style: 'label'
          },
                safe(report.next_of_kin) + '\n',
              ],
            style: "defaultStyle"
            },
          {
            text: [
              {
                text: '\nSIN: ',
                style: 'label'
          },
                safe(report.insurance) + '\n',
              {
                text: 'MRN: ',
                style: 'label'
          },
                safe(report.mrn) + '\n',
              {
                text: 'Address: ',
                style: 'label'
          },
                safe(report.address_street) + '\n' + safe(report.address_city) + ' ' + safe(report.address_province) + '\n',
              ],
            style: "defaultStyle"
            },
          {
            text: [
              {
                text: '\nHome Phone #: ',
                style: 'label'
          },
                safe(report.phone_home) + '\n',
              {
                text: 'Cell Phone #: ',
                style: 'label'
          },
                safe(report.phone_cell) + '\n',
              {
                text: 'Work Phone #: ',
                style: 'label'
          },
                safe(report.phone_work) + '\n',
              {
                text: 'Next of Kin Phone #: ',
                style: 'label'
          },
                safe(report.next_of_kin_phone) + '\n',
              ],
            style: "defaultStyle"
            }
          ],
        columnGap: 10
      } 
    }
    else return "";
  }

  function patientHistory() {
    return {
      text: [
        {
          text: 'Patient History\n',
          style: 'section_heading'
                },
        {
          text: 'Allergies: ',
          style: 'label'
                },
        {
          text: JSONtoString(safe(report.hx_allergies)) + '\n',
          style: "defaultStyle"
                },
        {
          text: 'Conditions: ',
          style: 'label'
                },
        {
          text: JSONtoString(safe(report.hx_conditions)) + '\n',
          style: "defaultStyle"
                },
        {
          text: 'Medications: ',
          style: 'label'
                },
        {
          text: JSONtoString(safe(report.hx_medications)) + '\n',
          style: "defaultStyle"
                }
              ],
      style: 'margin'
    }
  }

  function chiefComplaint() {
    return {
      text: [
        {
          text: 'Chief Complaint\n',
          style: 'section_heading'
                },
        {
          text: 'Primary: ',
          style: 'label'
                },
        {
          text: safe(report.primary_complaint, report.primary_complaint_other) + '\n',
          style: "defaultStyle"
                },
        {
          text: 'Secondary: ',
          style: 'label'
                },
        {
          text: safe(report.secondary_complaint) + '\n',
          style: "defaultStyle"
                },
        {
          text: 'Symptoms: ',
          style: 'label'
                },
        {
          text: JSONtoString(safe(report.pertinent)) + '\n',
          style: "defaultStyle"
                }
              ],
      style: 'margin'
    }
  }

  function hxAndChief() {
    var array = [];
    if ($scope.mySettings.export.patient_hx && report.patient_hx_assessed == 'true')
      array.push(include('patient_hx', patientHistory()));
    if ($scope.mySettings.export.chief_complaint && report.chief_complaint_assessed == 'true')
      array.push(include('chief_complaint', chiefComplaint()));

    if (array.length != 0){
      return {
        columns: array,
        style: 'margin'
      }
    } else
      return "";
  }

  function abc() {
    if (report.abc_assessed) {
      return {
        columns: [
          {
            text: [
              {
                text: 'ABC\n',
                style: 'section_heading'
                },
              {
                text: 'Open & Patent: ',
                style: 'label'
                },
                safe(report.open_patent) + '\n',
              {
                text: 'Tracheal Dev.: ',
                style: 'label'
                },
                safe(report.tracheal_deviation, report.tracheal_deviation_side) + "\n",
              {
                text: 'Interventions: ',
                style: 'label'
                },
                safe(report.interventions) + "\n",
              {
                text: 'Breathing Type: ',
                style: 'label'
                },
                safe(report.breathing_type) + "\n",
              {
                text: 'Laboured: ',
                style: 'label'
                },
                safe(report.breathing_laboured) + "\n",
              {
                text: 'Effective: ',
                style: 'label'
                },
                safe(report.breathing_effective) + "\n",
              {
                text: 'Accessory Muscle: ',
                style: 'label'
                },
                safe(report.accessory_muscle) + "\n",
              {
                text: 'Nasal Flare: ',
                style: 'label'
                },
                safe(report.nasal_flare) + "\n",
              {
                text: 'Cough: ',
                style: 'label'
                },
                safe(report.cough) + "\n",
              {
                text: 'Cough Productive: ',
                style: 'label'
                },
                safe(report.cough_productive) + "\n",
              {
                text: 'Subcut.Emphysema: ',
                style: 'label'
                },
                safe(report.subcutaneous_emphysema) + "\n",
              {
                text: 'Flailed Chest: ',
                style: 'label'
                },
                safe(report.flailed_chest, report.flailed_chest_side) + "\n",
              {
                text: 'Suspect Pneumothorax: ',
                style: 'label'
                },
                safe(report.suspect_pneumothorax) + "\n",
              {
                text: 'Suspect Hemothorax: ',
                style: 'label'
                },
                safe(report.suspect_hemothorax) + "\n",
              {
                text: 'CTAx4: ',
                style: 'label'
                },
                safe(report.suspect_hemothorax) + "\n",
              ],
            style: "defaultStyle"
            },
          {
            text: [
              {
                text: 'Upper Left Sound: ',
                style: 'label'
                },
                safe(report.lung_ul_sound) + "\n",
              {
                text: 'Upper Right Sound: ',
                style: 'label'
                },
                safe(report.lung_ur_sound) + "\n",
              {
                text: 'Lower Left Sound: ',
                style: 'label'
                },
                safe(report.lung_ll_sound) + "\n",
              {
                text: 'Lower Right Sound: ',
                style: 'label'
                },
                safe(report.lung_lr_sound) + "\n",
              {
                text: 'Pulse Location: ',
                style: 'label'
                },
                safe(report.pulse_location) + '\n',
              {
                text: 'Pulse Quality: ',
                style: 'label'
                },
                safe(report.pulse_quality) + "\n",
              {
                text: 'Pulse is Regular: ',
                style: 'label'
                },
                safe(report.pulse_regular) + "\n",
              {
                text: 'JVD: ',
                style: 'label'
                },
                safe(report.jvd) + "\n",
              {
                text: 'Capillary Refill: ',
                style: 'label'
                },
                safe(report.cap_refill) + "\n",
              {
                text: 'Skin Color: ',
                style: 'label'
                },
                safe(report.skin_color) + "\n",
              {
                text: 'Skin Temperature: ',
                style: 'label'
                },
                safe(report.skin_temperature) + "\n",
              {
                text: 'Skin Condition: ',
                style: 'label'
                },
                safe(report.skin_condition) + "\n",
              {
                text: 'Heart Tones: ',
                style: 'label'
                },
                safe(report.heart_tones) + "\n",
              {
                text: 'Heart Tones Quality: ',
                style: 'label'
                },
                safe(report.heart_tones_quality) + "\n",
              {
                text: 'Peripheral Edema: ',
                style: 'label'
                },
                safe(report.peripheral_edema) + ' ' + safe(report.peripheral_edema_location) + ' ' + safe(report.peripheral_edema_severity) + "\n",
              ],
            style: "defaultStyle"
            }
          ]
      }
    } else return "";
  }

  function vehicleSpecific() {
    var vehicleArray = [
      {
        text: 'Vehicle: ',
        style: 'label'
      },
      safe(report.trauma_auto_vehicle) + '\n',
      {
        text: 'Seat: ',
        style: 'label'
      },
      report.trauma_auto_seat ? safe(seatsMap[report.trauma_auto_seat].name) : '' + "\n",
    ];

    var vehicle = report.trauma_auto_vehicle;
    if (["Car", "Minivan", "Light truck", "Semi truck", "R.V."].indexOf(vehicle) != -1) {
      vehicleArray = vehicleArray.concat([{
          text: 'Airbag Deployed: ',
          style: 'label'
        },
        safe(report.trauma_auto_airbag) + "\n", {
          text: 'Safety Belt: ',
          style: 'label'
        },
        safe(report.trauma_auto_seatbelt) + "\n"]);
    } else {
      vehicleArray = vehicleArray.concat([{
          text: 'Helmet: ',
          style: 'label'
        },
        safe(report.trauma_auto_helmet) + "\n", {
          text: 'Leathers: ',
          style: 'label'
        },
        safe(report.trauma_auto_leathers) + "\n"]);
    }
    return vehicleArray;
  }

  function traumaAuto() {
    if (report.trauma_auto_assessed){
      return {
        columns: [
          {
            text: 'Trauma Auto\n',
            style: 'section_heading'
                },
          {
            text: vehicleSpecific(),
            style: "defaultStyle"
          }, {
            text: [
              {
                text: 'Nb of Occupants: ',
                style: 'label'
                },
                safe(report.trauma_auto_nb_occupants) + "\n",
              {
                text: 'Speed: ',
                style: 'label'
                },
                safe(report.trauma_auto_vehicle_speed) + ' ' + safe(report.trauma_auto_speed_unit) + "\n",
              {
                text: 'Pt removed by: ',
                style: 'label'
                },
                safe(report.trauma_auto_removed_by) + "\n",
              {
                text: 'Details given by: ',
                style: 'label'
                },
                safe(report.trauma_auto_details_per) + "\n",
              ],
            style: "defaultStyle"
            }
          ]
      } 
    } else return "";
  }

  function traumaPenetrating() {
    return {
      text: [
        {
          text: 'Trauma Penetrating\n',
          style: 'section_heading'
                },
        {
          text: 'Assault: ',
          style: 'label'
            },
              safe(report.trauma_penetrating_assault) + '\n',
        {
          text: 'Mechanism of Injury: ',
          style: 'label'
            },
              safe(report.trauma_penetrating_moi) + "\n",
        {
          text: 'Velocity: ',
          style: 'label'
            },
              safe(report.trauma_penetrating_velocity) + "\n",
        {
          text: 'Bleeding: ',
          style: 'label'
            },
              safe(report.trauma_penetrating_bleeding) + ' ' + safe(report.trauma_penetrating_controlled == 'true' ? "Controlled" : "") + "\n",
        {
          text: 'Systems Involved: ',
          style: 'label'
            },
              JSONtoString(safe(report.trauma_penetrating_body_parts)) + "\n",
            ],
      style: "defaultStyle"
    }
  }

  function traumaBlunt() {
    return {
      text: [
        {
          text: 'Trauma Blunt\n',
          style: 'section_heading'
                },
        {
          text: 'Assault: ',
          style: 'label'
            },
              safe(report.trauma_blunt_assault) + '\n',
        {
          text: 'Mechanism of Injury: ',
          style: 'label'
            },
              safe(report.trauma_blunt_moi) + "\n",
        {
          text: 'Bleeding: ',
          style: 'label'
            },
              safe(report.trauma_blunt_bleeding) + ' ' + safe(report.trauma_blunt_controlled == 'true' ? "Controlled" : "") + "\n",
        {
          text: 'Systems Involved: ',
          style: 'label'
            },
              JSONtoString(safe(report.trauma_blunt_body_parts)) + "\n",
            ],
      style: "defaultStyle"
    }
  }

  function traumaFall() {
    return {
      text: [
        {
          text: 'Trauma Fall\n',
          style: 'section_heading'
                },
        {
          text: 'Assault: ',
          style: 'label'
            },
              safe(report.trauma_fall_assault) + '\n',
        {
          text: 'Distance: ',
          style: 'label'
            },
              safe(report.trauma_fall_distance) + ' ' + safe(report.trauma_fall_distance_unit) + "\n",
        {
          text: 'Surface: ',
          style: 'label'
            },
              safe(report.trauma_fall_surface) + '\n',
        {
          text: 'Loss of Consciousness: ',
          style: 'label'
            },
              safe(report.trauma_fall_loss_of_c) + ' ' + safe(report.trauma_fall_loss_of_c_time) + 'min\n',
        {
          text: 'Bleeding: ',
          style: 'label'
            },
              safe(report.trauma_fall_bleeding) + ' ' + safe(report.trauma_fall_controlled == 'true' ? "Controlled" : "") + "\n",
        {
          text: 'Systems Involved: ',
          style: 'label'
            },
              JSONtoString(safe(report.trauma_fall_body_parts)) + "\n",
            ],
      style: "defaultStyle"
    }
  }

  function traumaBurn() {
    return {
      text: [
        {
          text: 'Trauma Burn\n',
          style: 'section_heading'
                },
        {
          text: 'Method: ',
          style: 'label'
            },
              safe(report.trauma_burn_method) + '\n',
        {
          text: 'Body Type: ',
          style: 'label'
            },
              safe(report.trauma_burn_body_type) + '\n',
        {
          text: 'Total Surface Burn: ',
          style: 'label'
            },
              safe(report.trauma_burn_total_surface) + '%\n',
        {
          text: 'Details: ',
          style: 'label'
            },
              burnsToString(safe(report.trauma_burn_body_parts), body_parts_names, burnDegrees) + '\n',
            ],
      style: "defaultStyle"
    }
  }

  function trauma() {
    var array = [];
    if (report.trauma_penetrating_assessed == 'true')
      array.push(include('exam', traumaPenetrating()));
    if (report.trauma_blunt_assessed == 'true')
      array.push(include('exam', traumaBlunt()));
    if (report.trauma_fall_assessed == 'true')
      array.push(include('exam', traumaFall()));
    if (report.trauma_burn_assessed == 'true')
      array.push(include('exam', traumaBurn()));

    return array;
  }

  function traumaPart1() {
    var line = [];
    var t = trauma();
    if (t.length > 0)
      line.push(t[0]);
    if (t.length > 1)
      line.push(t[1]);

    if (line.length != 0){
      return {
        columns: line,
        style: 'margin'
      } 
    } else
      return "";
  }

  function traumaPart2() {
    var line = [];
    var t = trauma();
    if (t.length > 2)
      line.push(t[2]);
    if (t.length > 3)
      line.push(t[3]);

    if (line.length != 0){
      return {
        columns: line,
        style: 'margin'
      }
    } else
      return "";
  }

  function gastrointestinal() {
    return {
      text: [
        {
          text: 'Gastrointestinal\n',
          style: 'section_heading'
                },
        {
          text: 'Abdomen is soft: ',
          style: 'label'
            },
              safe(report.gi_soft) + '\n',
        {
          text: 'Abdomen is flat: ',
          style: 'label'
            },
              safe(report.gi_flat) + '\n',
        {
          text: 'Abdomen non distended: ',
          style: 'label'
            },
              safe(report.gi_non_distended) + '\n',
        {
          text: 'Abdomen non tender: ',
          style: 'label'
            },
              safe(report.gi_non_tender) + '\n',
        {
          text: 'Rebound: ',
          style: 'label'
            },
              safe(report.gi_rebound) + '\n',
        {
          text: 'Location of pain: ',
          style: 'label'
            },
              safe(gastroPainToString(report.gi_pain_location, gastroMap)) + '\n',
        {
          text: 'Last BM: ',
          style: 'label'
            },
              safe(report.gi_last_bm) + '\n',
        {
          text: 'Last OI: ',
          style: 'label'
            },
              safe(report.gi_loi) + '\n\n',
            ],
      style: "defaultStyle"
    }
  }

  function genitourinary() {
    return {
      text: [
        {
          text: 'Genitourinary\n',
          style: 'section_heading'
                },
        {
          text: 'Pain: ',
          style: 'label'
            },
              safe(report.gu_pain) + '\n',
        {
          text: 'Frequency: ',
          style: 'label'
            },
              safe(report.gu_frequency) + '\n',
        {
          text: 'Hematuria: ',
          style: 'label'
            },
              safe(report.gu_hematuria) + '\n',
        {
          text: 'Incontinence: ',
          style: 'label'
            },
              safe(report.gu_incontinence) + '\n',
        {
          text: 'Bladder Distention: ',
          style: 'label'
            },
              safe(report.gu_bladder_distention) + '\n',
        {
          text: 'Urinary Urgency: ',
          style: 'label'
            },
              safe(report.gu_urinary_urgency) + '\n',
        {
          text: 'Last Void: ',
          style: 'label'
            },
              safe(report.gu_last_void) + '\n\n'
            ],
      style: "defaultStyle"
    }
  }

  function giGu() {
    var array = [];
    if (report.gi_assessed == 'true')
      array.push(include('exam', gastrointestinal()));
    if (report.gu_assessed == 'true')
      array.push(include('exam', genitourinary()));

    if (array.length != 0){
      return {
        columns: array,
        style: 'margin'
      }
    } else
      return "";
  }

  function gyn() {
    if (report.gyn_assessed){
      return {
        columns: [
          {
            text: [
              {
                text: 'Obstetric/Gynecology\n',
                style: 'section_heading'
                },
              {
                text: 'Gravid: ',
                style: 'label'
                },
                safe(report.gyn_gravid) + '\n',
              {
                text: 'Term: ',
                style: 'label'
                },
                safe(report.gyn_term) + '\n',
              {
                text: 'Para: ',
                style: 'label'
                },
                safe(report.gyn_para) + '\n',
              {
                text: 'Abortia: ',
                style: 'label'
                },
                safe(report.gyn_abortia) + '\n',
              {
                text: 'Live: ',
                style: 'label'
                },
                safe(report.gyn_live) + '\n',
              {
                text: 'Last Menstruation: ',
                style: 'label'
                },
                safe(report.gyn_last_menstruation) + '\n',
              {
                text: 'Vaginal Discharge: ',
                style: 'label'
                },
                safe(report.gyn_discharge) + ' ' + safe(report.gyn_substance) + '\n',
              {
                text: 'Pregnant: ',
                style: 'label'
                },
                safe(report.gyn_pregnant) + '\n',
              {
                text: 'EDC: ',
                style: 'label'
                },
                safe(report.gyn_pregnant) + '\n',
              {
                text: 'Gestation is known: ',
                style: 'label'
                },
                safe(report.gyn_gestation_known) + ' ' + report.gyn_gestation_known == 'true' ? safe(report.gyn_gest_weeks) + ' weeks' : '' + '\n',
              ]
            },
          {
            text: [
              {
                text: 'Membranes Intact: ',
                style: 'label'
                },
                safe(report.gyn_membrane_intact) + ' ' + safe(report.gyn_fluid) + '\n',
              {
                text: 'Babies expected: ',
                style: 'label'
                },
                safe(report.gyn_expected_babies) + '\n',
              {
                text: 'Fetal Movement: ',
                style: 'label'
                },
                safe(report.gyn_fetal_mvmt) + '\n',
              {
                text: 'Last Movement: ',
                style: 'label'
                },
                safe(report.gyn_last_mvmt) + '\n',
              {
                text: 'Movements per hour: ',
                style: 'label'
                },
                safe(report.gyn_mvmt_per_hr) + '\n',
              {
                text: 'Contractions: ',
                style: 'label'
                },
                safe(report.gyn_contraction_duration) + '\n',
              {
                text: 'Contraction Duration: ',
                style: 'label'
                },
                safe(report.gyn_contraction_duration) + ' seconds\n',
              {
                text: 'Contraction Separation: ',
                style: 'label'
                },
                safe(report.gyn_contraction_separation) + ' seconds\n',
              {
                text: 'Peripheral Edema: ',
                style: 'label'
                },
                safe(report.peripheral_edema) + ' ' + safe(report.peripheral_edema_location) + ' ' + safe(report.peripheral_edema_severity) + "\n",
              ],
            }
          ],
        style: "defaultStyle"
      }
    }
    else return "";
  }

  function fieldDelivery() {
    if (report.field_delivery_assessed) {
      return {
        text: [
          {
            text: 'Field Delivery\n',
            style: 'section_heading'
            },
          {
            text: 'Presentation: ',
            style: 'label'
            },
              safe(report.field_delivery_presentation) + '\n',
          {
            text: 'Delivery Time: ',
            style: 'label'
            },
              safe(report.field_delivery_time) + '\n',
          {
            text: 'Meconium: ',
            style: 'label'
            },
              safe(report.field_delivery_meconium) + '\n',
          {
            text: 'Cord cut at: ',
            style: 'label'
            },
              safe(report.field_delivery_cord_cut_length) + '\n',
          {
            text: 'APGAR 1 min: ',
            style: 'label'
            },
              apgarToString(safe(report.field_delivery_apgar1)) + '\n',
          {
            text: 'APGAR 5 min: ',
            style: 'label'
            },
              apgarToString(safe(report.field_delivery_apgar5)) + '\n',
          {
            text: 'Stimulation Required: ',
            style: 'label'
            },
              safe(report.field_delivery_stimulation) + ' ' + safe(report.field_delivery_stimulation_type) + '\n',
          {
            text: 'Placenta Delivery: ',
            style: 'label'
            },
              safe(report.field_delivery_placenta) + safe(report.field_delivery_placenta_time) + '\n',
          {
            text: 'Placenta Intact: ',
            style: 'label'
            },
              safe(report.field_delivery_placenta_intact) + '\n',
            ],
        style: "defaultStyle"
      }
    } else return "";
  }

  function muscular() {
    if (report.muscular_assessed){
      return {
        text: [
          {
            text: 'Muscular/Skeletal\n',
            style: 'section_heading'
            },
          {
            text: 'Symptoms: ',
            style: 'label'
            },
              muscularToString(safe(report.muscular_complaint)) + '\n',
            ],
        style: "defaultStyle"
      }
    }
      else return "";
  }

  function invasiveAirway() {
    if (report.invasive_airway_assessed){
      return {
        text: [
          {
            text: 'Invasive Airway\n',
            style: 'section_heading'
            },
          {
            text: 'Airway Secured: ',
            style: 'label'
            },
              safe(report.invasive_airway_secured) + '\n',
          {
            text: 'Device: ',
            style: 'label'
            },
              safe(report.invasive_airway_device) + '\n',
          {
            text: 'Size: ',
            style: 'label'
            },
              safe(report.invasive_airway_size) + '\n',
          {
            text: 'Cuffed: ',
            style: 'label'
            },
              safe(report.invasive_airway_cuffed) + '\n',
          {
            text: 'Technique: ',
            style: 'label'
            },
              safe(report.invasive_airway_technique) + '\n',
          {
            text: 'Distance: ',
            style: 'label'
            },
              safe(report.invasive_airway_distance) + '\n',
          {
            text: 'Attempts: ',
            style: 'label'
            },
              safe(report.invasive_airway_attempts) + '\n',
            ],
        style: "defaultStyle"
      } 
    } else return "";
  }

  function spinal() {
    if (report.spinal_assessed){
      return {
        text: [
          {
            text: 'Spinal Motion Restriction\n',
            style: 'section_heading'
            },
          {
            text: 'Manual C-Spine: ',
            style: 'label'
            },
              safe(report.spinal_manual) + '\n',
          {
            text: 'C-Collar: ',
            style: 'label'
            },
              safe(report.spinal_c_collar) + '\n',
          {
            text: 'Size: ',
            style: 'label'
            },
              safe(report.spinal_collar_size) + '\n',
          {
            text: 'Back board: ',
            style: 'label'
            },
              safe(report.spinal_backboard) + '\n',
          {
            text: 'Transferred by: ',
            style: 'label'
            },
              safe(report.spinal_transferred_by) + '\n',
          {
            text: 'Secured with: ',
            style: 'label'
            },
              safe(report.spinal_secured_with) + '\n',
            ],
        style: "defaultStyle"
      } 
    } else return "";
  }

  function signaturesHeader() {
    if (report.signature_assessed){
      return {
        text: 'Signatures\n',
        style: 'section_heading'
      }
    } else return "";
  }

  function signatures1() {
    if (report.signature_assessed){
      return {
        columns: [
          {
            text: [
              {
                text: 'Practitioner: ',
                style: 'label'
            },
              safe(report.signature_practitioner_name) + '\n'
          ],
            style: "defaultStyle",
            width: 200
        },
          {
            image: safeImage(report.signature_practitioner),
            height: 75,
            width: 250
          }
      ]
      }
    }else return "";
  }

  function signatures2() {
    if (report.signature_assessed){
      return {
        columns: [
          {
            text: [
              {
                text: 'Patient: ',
                style: 'label'
            },
              safe(report.signature_patient_name) + ' ' + safe(report.no_signature_reason) + '\n',
          ],
            style: "defaultStyle",
            width: 200
        },
          {
            image: safeImage(report.signature_patient),
            height: 75,
            width: 250
          }
      ]
      }
    } else return "";
  }

  function signatures3() {
    if (report.signature_assessed){
      return {
        columns: [
          {
            text: [
              {
                text: 'Hosital Representative: ',
                style: 'label'
            },
              safe(report.signature_hospital_name) + '\n'
          ],
            style: "defaultStyle",
            width: 200
        },
          {
            image: safeImage(report.signature_hospital),
            height: 75,
            width: 250
          }
      ]
      }
    }
    else return "";
  }

  function signatures4() {
    if (report.signature_assessed){
      return {
        columns: [
          {
            text: [
              {
                text: 'Witness: ',
                style: 'label'
            },
              safe(report.signature_witness_name) + '\n',
          ],
            style: "defaultStyle",
            width: 200
        },
          {
            image: safeImage(report.signature_witness),
            height: 75,
            width: 250
          }
      ]
      }
    } else return "";
  }

  function callInfo() {
    return {
      text: [
        {
          text: 'Call Info\n',
          style: 'section_heading'
                },
        {
          text: 'Attendant 1: ',
          style: 'label'
                },
                safe(report.call_info_attendant1, report.call_info_attendant1_other) + '\n',
        {
          text: 'Attendant 2: ',
          style: 'label'
                },
                safe(report.call_info_attendant2, report.call_info_attendant2_other) + '\n',
        {
          text: 'Driver: ',
          style: 'label'
                },
                safe(report.call_info_driver, report.call_info_driver_other) + '\n',
        {
          text: 'Unit #: ',
          style: 'label'
                },
                safe(report.call_info_unit_nb) + '\n',
        {
          text: 'Run #: ',
          style: 'label'
                },
                safe(report.call_info_run_nb) + '\n',
        {
          text: 'Respond to: ',
          style: 'label'
                },
                safe(report.call_info_respond_to) + '\n',
        {
          text: 'Milage Start: ',
          style: 'label'
                },
                safe(report.call_info_milage_start) + '\n',
        {
          text: 'Milage End: ',
          style: 'label'
                },
                safe(report.call_info_milage_end) + '\n',
        {
          text: 'Code en route: ',
          style: 'label'
                },
                safe(report.call_info_code_en_route) + '\n',
        {
          text: 'Code return: ',
          style: 'label'
                },
                safe(report.call_info_code_return) + '\n',
        {
          text: 'Transported to: ',
          style: 'label'
                },
                safe(report.call_info_transported_to) + '\n',
        {
          text: 'Transport position: ',
          style: 'label'
                },
                safe(report.call_info_transported_position) + '\n',
      ],
      style: "defaultStyle",
      width: 150
  }
}

  function callInfoTimes() {
    return {
      text: [
        {
          text: '\nTimes:\n',
          style: 'label'
            },
            safe(TimesToString(report.call_info_time, timesString)) + '\n',
        {
          text: '\nPPE: ',
          style: 'label'
                },
                JSONtoString(safe(report.call_info_ppe)) + '\n',
        {
          text: 'Determinant: ',
          style: 'label'
                },
                JSONtoString(safe(report.call_info_determinant)) + '\n',
        {
          text: 'Assistance given by: ',
          style: 'label'
                },
                safe(report.call_info_assistance, report.call_info_assistance_other) + '\n',
      ],
      style: "defaultStyle",
      width: 200
  }
}

  function noTransport() {
  return {
      text: [
        {
          text: '\nPatient Mentally Capable: ',
          style: 'label'
                },
                safe(report.no_transport_mentally_capable) + '\n',
        {
          text: 'Patient Should be Transported: ',
          style: 'label'
                },
                safe(report.no_transport_should_transport) + '\n',
        {
          text: 'Patient was informed of risks of no transport: ',
          style: 'label'
                },
                safe(report.no_transport_risk_informed) + '\n',
        {
          text: 'Reason for refusal: ',
          style: 'label'
                },
                safe(report.no_transport_reason, report.no_transport_reason_other) + '\n',
        {
          text: 'Patient left with: ',
          style: 'label'
                },
                safe(report.no_transport_left_with, report.no_transport_left_with_other) + '\n',
        {
          text: 'Consult with: ',
          style: 'label'
                },
                safe(report.no_transport_consult_with) + '\n',
              ],
      style: "defaultStyle"
    }
}

  function callTransport() {
    var array = [];
    if ($scope.mySettings.export.call_info && report.call_info_assessed == 'true'){
      array.push(include('call_info', callInfo()));
      array.push(include('call_info', callInfoTimes()));
    }
    if ($scope.mySettings.export.call_info && report.no_transport_assessed == 'true')
      array.push(include('call_info', noTransport()));

    if (array.length != 0)
      return {
        columns: array,
        style: 'margin'
      } 
    else return "";
}



fillDocDefinition = function () {
  var content = [
        header(),
        '\n',
        include('patient_info', patientInfo()),
        hxAndChief(),
        include('vitals', heading($scope.vitalsRecords, 'Vitals')),
        include('vitals', table($scope.vitalsRecords, 'vitals')),
        include('exam', heading($scope.neuroRecords, 'Neuro')),
        include('exam', table($scope.neuroRecords, 'neuro')),
        include('exam', abc()),
        include('exam', traumaAuto()),
        traumaPart1(),
        traumaPart2(),
        giGu(),
        include('exam', gyn()),
        include('exam', fieldDelivery()),
        include('exam', muscular()),
        include('procedures', heading($scope.basicAirwayRecords, 'Basic Airway')),
        include('procedures', table($scope.basicAirwayRecords, 'airway_basic')),
        include('procedures', invasiveAirway()),
        include('procedures', heading($scope.ventilatorRecords, 'Ventilator')),
        include('procedures', table($scope.ventilatorRecords, 'airway_ventilator')),
        include('procedures', heading($scope.cpapRecords, 'CPAP/BiPAP')),
        include('procedures', table($scope.cpapRecords, 'airway_cpap_bipap')),
        include('procedures', heading($scope.suctionRecords, 'Suction')),
        include('procedures', table($scope.suctionRecords, 'airway_suction')),
        include('procedures', heading($scope.ivIoRecords, 'IV/IO')),
        include('procedures', table($scope.ivIoRecords, 'iv_io')),
        include('procedures', heading($scope.splintingRecords, 'Splinting/Dressing')),
        include('procedures', table($scope.splintingRecords, 'splinting')),
        include('procedures', heading($scope.medicationRecords, 'Medication')),
        include('procedures', table($scope.medicationRecords, 'medication')),
        include('procedures', spinal()),
        include('procedures', heading($scope.inOutRecords, 'In/Out')),
        include('procedures', table($scope.inOutRecords, 'in_out')),
        include('procedures', heading($scope.ecgRecords, 'ECG')),
        include('procedures', table($scope.ecgRecords, 'ecg')),
        include('call_info', callTransport()),
        include('narrative', heading($scope.narrativeRecords, 'Narrative')),
        include('narrative', table($scope.narrativeRecords, 'narrative')),
        include('code', heading($scope.cprRecords, 'CPR')),
        include('code', table($scope.cprRecords, 'code')),
        include('signatures', signaturesHeader()),
        include('signatures', signatures1()),
        include('signatures', signatures2()),
        include('signatures', signatures3()),
        include('signatures', signatures4())
      ];

  $scope.docDefinition = {
    content: content,
    styles: {
      header: {
        fontSize: 22,
        bold: true
      },
      section_heading: {
        margin: [0, 15, 0, 0],
        fontSize: 12,
        bold: true
      },
      medium_text: {
        margin: [0, 0, 0, 5],
        fontSize: 10
      },
      label: {
        margin: [0, 0, 0, 5],
        fontSize: 10,
        bold: true
      },
      tableExample: {
        fontSize: 8,
        margin: [0, 5, 0, 0]
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black'
      },
      margin: {
        margin: [0, 10, 0, 0]
      },
      defaultStyle: {
        fontSize: 10
      }
    }
  };
  //    console.log($scope.docDefinition);
}

function fail(error) {
  console.log(error.code);
};

function gotFS(fileSystem) {
  var fileName = report.first_name + " " + report.last_name + ".pdf";
  fileSystem.root.getFile(fileName, {
    create: true,
    exclusive: false
  }, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
  currentfileEntry = fileEntry;
  fileEntry.createWriter(gotFileWriter, fail);
}

function gotFileWriter(writer) {
  writer.onwrite = function (evt) {
    $scope.downloading = false;
    alert(currentfileEntry.name + " was saved on you device");
//    alert(JSON.stringify(currentfileEntry));
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSforRead, fail);
  }
  writer.write(BINARY_ARR);
}

$scope.download = function () {
  $scope.downloading = true;
  if (!window.cordova) {
    pdfMake.createPdf($scope.docDefinition).open();
  } else {
    pdfMake.createPdf($scope.docDefinition).getBuffer(function (buffer) {
      var UTF8_STR = new Uint8Array(buffer); // Convert to UTF-8...                
      BINARY_ARR = UTF8_STR.buffer; // Convert to Binary...
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    });
  }
}
}
angular.module('ePCR.factories', [])

.factory('CameraFactory', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
angular.module('ePCR.schema', [])

.constant('DB_CONFIG', {
  name: 'ePCR',
  description: 'Electronic Patient Care Report',
  version: '',
  size: 10 * 1024 * 1024,
  tables: [
    {
      "name": "report",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "patient_info_assessed": {
          "type": "BOOLEAN"
        },
        "last_name": {
          "type": "TEXT"
        },
        "first_name": {
          "type": "TEXT"
        },
        "date_of_birth": {
          "type": "TEXT"
        },
        "gender": {
          "type": "BOOLEAN"
        },
        "weight": {
          "type": "FLOAT"
        },
        "weight_unit": {
          "type": "TEXT"
        },
        "address_street": {
          "type": "TEXT"
        },
        "address_city": {
          "type": "TEXT"
        },
        "address_province": {
          "type": "TEXT"
        },
        "phone_home": {
          "type": "TEXT"
        },
        "phone_work": {
          "type": "TEXT"
        },
        "phone_cell": {
          "type": "TEXT"
        },
        "insurance": {
          "type": "TEXT"
        },
        "mrn": {
          "type": "TEXT"
        },
        "next_of_kin": {
          "type": "TEXT"
        },
        "next_of_kin_phone": {
          "type": "TEXT"
        },
        "chief_complaint_assessed": {
          "type": "BOOLEAN"
        },
        "primary_complaint": {
          "type": "TEXT"
        },
        "primary_complaint_other": {
          "type": "TEXT"
        },
        "secondary_complaint": {
          "type": "TEXT"
        },
        "pertinent": {
          "type": "TEXT"
        },
        "patient_hx_assessed": {
          "type": "BOOLEAN"
        },
        "hx_allergies": {
          "type": "TEXT"
        },
        "hx_conditions": {
          "type": "TEXT"
        },
        "hx_medications": {
          "type": "TEXT"
        },
        "abc_assessed": {
          "type": "BOOLEAN"
        },
        "open_patent": {
          "type": "BOOLEAN"
        },
        "tracheal_deviation": {
          "type": "BOOLEAN"
        },
        "tracheal_deviation_side": {
          "type": "TEXT"
        },
        "interventions": {
          "type": "BOOLEAN"
        },
        "breathing_type": {
          "type": "TEXT"
        },
        "breathing_laboured": {
          "type": "BOOLEAN"
        },
        "breathing_effective": {
          "type": "BOOLEAN"
        },
        "accessory_muscle": {
          "type": "BOOLEAN"
        },
        "nasal_flare": {
          "type": "BOOLEAN"
        },
        "cough": {
          "type": "BOOLEAN"
        },
        "cough_productive": {
          "type": "BOOLEAN"
        },
        "subcutaneous_emphysema": {
          "type": "BOOLEAN"
        },
        "flailed_chest": {
          "type": "BOOLEAN"
        },
        "flailed_chest_side": {
          "type": "BOOLEAN"
        },
        "suspect_pneumothorax": {
          "type": "BOOLEAN"
        },
        "suspect_hemothorax": {
          "type": "BOOLEAN"
        },
        "ctax4": {
          "type": "BOOLEAN"
        },
        "lung_ul_sound": {
          "type": "TEXT"
        },
        "lung_ur_sound": {
          "type": "TEXT"
        },
        "lung_ll_sound": {
          "type": "TEXT"
        },
        "lung_lr_sound": {
          "type": "TEXT"
        },
        "pulse_location": {
          "type": "TEXT"
        },
        "pulse_quality": {
          "type": "TEXT"
        },
        "pulse_regular": {
          "type": "BOOLEAN"
        },
        "jvd": {
          "type": "BOOLEAN"
        },
        "cap_refill": {
          "type": "TEXT"
        },
        "skin_color": {
          "type": "TEXT"
        },
        "skin_temperature": {
          "type": "TEXT"
        },
        "skin_condition": {
          "type": "TEXT"
        },
        "heart_tones": {
          "type": "TEXT"
        },
        "heart_tones_quality": {
          "type": "TEXT"
        },
        "peripheral_edema": {
          "type": "BOOLEAN"
        },
        "peripheral_edema_location": {
          "type": "TEXT"
        },
        "peripheral_edema_severity": {
          "type": "TEXT"
        },
        "has_trauma": {
          "type": "BOOLEAN"
        },
        "trauma_auto_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_auto_vehicle": {
          "type": "TEXT"
        },
        "trauma_auto_seat": {
          "type": "TEXT"
        },
        "trauma_auto_seatbelt": {
          "type": "BOOLEAN"
        },
        "trauma_auto_airbag": {
          "type": "BOOLEAN"
        },
        "trauma_auto_helmet": {
          "type": "BOOLEAN"
        },
        "trauma_auto_leathers": {
          "type": "BOOLEAN"
        },
        "trauma_auto_nb_occupants": {
          "type": "INTEGER"
        },
        "trauma_auto_vehicle_speed": {
          "type": "INTEGER"
        },
        "trauma_auto_speed_unit": {
          "type": "TEXT"
        },
        "trauma_auto_removed_by": {
          "type": "TEXT"
        },
        "trauma_auto_details_per": {
          "type": "TEXT"
        },
        "trauma_penetrating_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_penetrating_assault": {
          "type": "BOOLEAN"
        },
        "trauma_penetrating_moi": {
          "type": "TEXT"
        },
        "trauma_penetrating_velocity": {
          "type": "TEXT"
        },
        "trauma_penetrating_bleeding": {
          "type": "BOOLEAN"
        },
        "trauma_penetrating_controlled": {
          "type": "BOOLEAN"
        },
        "trauma_penetrating_body_parts": {
          "type": "TEXT"
        },
        "trauma_blunt_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_blunt_assault": {
          "type": "BOOLEAN"
        },
        "trauma_blunt_moi": {
          "type": "TEXT"
        },
        "trauma_blunt_bleeding": {
          "type": "BOOLEAN"
        },
        "trauma_blunt_controlled": {
          "type": "BOOLEAN"
        },
        "trauma_blunt_body_parts": {
          "type": "BOOLEAN"
        },
        "trauma_fall_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_fall_assault": {
          "type": "BOOLEAN"
        },
        "trauma_fall_distance": {
          "type": "INTEGER"
        },
        "trauma_fall_distance_unit": {
          "type": "TEXT"
        },
        "trauma_fall_surface": {
          "type": "TEXT"
        },
        "trauma_fall_loss_of_c": {
          "type": "BOOLEAN"
        },
        "trauma_fall_loss_of_c_time": {
          "type": "FLOAT"
        },
        "trauma_fall_bleeding": {
          "type": "BOOLEAN"
        },
        "trauma_fall_controlled": {
          "type": "BOOLEAN"
        },
        "trauma_fall_body_parts": {
          "type": "BOOLEAN"
        },
        "trauma_burn_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_burn_total_surface": {
          "type": "INTEGER"
        },
        "trauma_burn_body_type": {
          "type": "TEXT"
        },
        "trauma_burn_age": {
          "type": "TEXT"
        },
        "trauma_burn_method": {
          "type": "TEXT"
        },
        "trauma_burn_body_parts": {
          "type": "TEXT"
        },
        "gi_assessed": {
          "type": "BOOLEAN"
        },
        "gi_soft": {
          "type": "BOOLEAN"
        },
        "gi_flat": {
          "type": "BOOLEAN"
        },
        "gi_non_distended": {
          "type": "BOOLEAN"
        },
        "gi_non_tender": {
          "type": "BOOLEAN"
        },
        "gi_rebound": {
          "type": "BOOLEAN"
        },
        "gi_pain_location": {
          "type": "TEXT"
        },
        "gi_obese": {
          "type": "BOOLEAN"
        },
        "gi_last_bm": {
          "type": "TEXT"
        },
        "gi_loi": {
          "type": "TEXT"
        },
        "gu_assessed": {
          "type": "BOOLEAN"
        },
        "gu_pain": {
          "type": "BOOLEAN"
        },
        "gu_frequency": {
          "type": "BOOLEAN"
        },
        "gu_hematuria": {
          "type": "BOOLEAN"
        },
        "gu_incontinence": {
          "type": "BOOLEAN"
        },
        "gu_bladder_distention": {
          "type": "BOOLEAN"
        },
        "gu_urinary_urgency": {
          "type": "BOOLEAN"
        },
        "gu_last_void": {
          "type": "TEXT"
        },
        "gyn_assessed": {
          "type": "BOOLEAN"
        },
        "gyn_gravid": {
          "type": "INTEGER"
        },
        "gyn_term": {
          "type": "INTEGER"
        },
        "gyn_para": {
          "type": "INTEGER"
        },
        "gyn_abortia": {
          "type": "INTEGER"
        },
        "gyn_live": {
          "type": "INTEGER"
        },
        "gyn_last_menstruation": {
          "type": "TEXT"
        },
        "gyn_discharge": {
          "type": "BOOLEAN"
        },
        "gyn_substance": {
          "type": "TEXT"
        },
        "gyn_pregnant": {
          "type": "TEXT"
        },
        "gyn_edc": {
          "type": "TEXT"
        },
        "gyn_gestation_known": {
          "type": "BOOLEAN"
        },
        "gyn_gest_weeks": {
          "type": "INTEGER"
        },
        "gyn_membrane_intact": {
          "type": "BOOLEAN"
        },
        "gyn_time_ruptured": {
          "type": "TEXT"
        },
        "gyn_fluid": {
          "type": "TEXT"
        },
        "gyn_expected_babies": {
          "type": "INTEGER"
        },
        "gyn_fetal_mvmt": {
          "type": "BOOLEAN"
        },
        "gyn_last_mvmt": {
          "type": "TEXT"
        },
        "gyn_mvmt_per_hr": {
          "type": "INTEGER"
        },
        "gyn_contractions": {
          "type": "BOOLEAN"
        },
        "gyn_contraction_duration": {
          "type": "TEXT"
        },
        "gyn_contraction_separation": {
          "type": "TEXT"
        },
        "field_delivery_assessed": {
          "type": "BOOLEAN"
        },
        "field_delivery_presentation": {
          "type": "TEXT"
        },
        "field_delivery_time": {
          "type": "TEXT"
        },
        "field_delivery_meconium": {
          "type": "TEXT"
        },
        "field_delivery_cord_cut_length": {
          "type": "INTEGER"
        },
        "field_delivery_apgar1": {
          "type": "TEXT"
        },
        "field_delivery_apgar5": {
          "type": "TEXT"
        },
        "field_delivery_stimulation": {
          "type": "BOOLEAN"
        },
        "field_delivery_stimulation_type": {
          "type": "TEXT"
        },
        "field_delivery_placenta": {
          "type": "BOOLEAN"
        },
        "field_delivery_placenta_time": {
          "type": "TEXT"
        },
        "field_delivery_placenta_intact": {
          "type": "BOOLEAN"
        },
        "muscular_assessed": {
          "type": "BOOLEAN"
        },
        "muscular_has_complaint": {
          "type": "BOOLEAN"
        },
        "muscular_complaint": {
          "type": "TEXT"
        },
        "invasive_airway_assessed": {
          "type": "BOOLEAN"
        },
        "invasive_airway_secured": {
          "type": "BOOLEAN"
        },
        "invasive_airway_device": {
          "type": "TEXT"
        },
        "invasive_airway_size": {
          "type": "FLOAT"
        },
        "invasive_airway_cuffed": {
          "type": "BOOLEAN"
        },
        "invasive_airway_inflation": {
          "type": "INTEGER"
        },
        "invasive_airway_technique": {
          "type": "TEXT"
        },
        "invasive_airway_distance": {
          "type": "INTEGER"
        },
        "invasive_airway_attempts": {
          "type": "INTEGER"
        },
        "spinal_assessed": {
          "type": "BOOLEAN"
        },
        "spinal_manual": {
          "type": "BOOLEAN"
        },
        "spinal_c_collar": {
          "type": "BOOLEAN"
        },
        "spinal_collar_size": {
          "type": "TEXT"
        },
        "spinal_backboard": {
          "type": "TEXT"
        },
        "spinal_transferred_by": {
          "type": "TEXT"
        },
        "spinal_secured_with": {
          "type": "TEXT"
        },
        "signature_assessed": {
          "type": "BOOLEAN"
        },
        "signature_practitioner_name": {
          "type": "TEXT"
        },
        "signature_practitioner": {
          "type": "TEXT"
        },
        "signature_patient_name": {
          "type": "TEXT"
        },
        "signature_patient": {
          "type": "TEXT"
        },
        "signature_hospital_name": {
          "type": "TEXT"
        },
        "signature_hospital": {
          "type": "TEXT"
        },
        "signature_witness_name": {
          "type": "TEXT"
        },
        "signature_witness": {
          "type": "TEXT"
        },
        "no_signature": {
          "type": "BOOLEAN"
        },
        "no_signature_reason": {
          "type": "TEXT"
        },
        "call_info_assessed": {
          "type": "BOOLEAN"
        },
        "call_info_attendant1": {
          "type": "TEXT"
        },
        "call_info_attendant1_other": {
          "type": "TEXT"
        },
        "call_info_attendant2": {
          "type": "TEXT"
        },
        "call_info_attendant2_other": {
          "type": "TEXT"
        },
        "call_info_driver": {
          "type": "TEXT"
        },
        "call_info_driver_other": {
          "type": "TEXT"
        },
        "call_info_unit_nb": {
          "type": "TEXT"
        },
        "call_info_run_nb": {
          "type": "TEXT"
        },
        "call_info_respond_to": {
          "type": "TEXT"
        },
        "call_info_milage_start": {
          "type": "INTEGER"
        },
        "call_info_milage_end": {
          "type": "INTEGER"
        },
        "call_info_code_en_route": {
          "type": "TEXT"
        },
        "call_info_code_return": {
          "type": "TEXT"
        },
        "call_info_transported_to": {
          "type": "TEXT"
        },
        "call_info_transported_position": {
          "type": "TEXT"
        },
        "call_info_time": {
          "type": "TEXT"
        },
        "call_info_ppe": {
          "type": "TEXT"
        },
        "call_info_determinant": {
          "type": "TEXT"
        },
        "call_info_assistance": {
          "type": "TEXT"
        },
        "call_info_assistance_other": {
          "type": "TEXT"
        },
        "no_transport_assessed": {
          "type": "BOOLEAN"
        },
        "no_transport_mentally_capable": {
          "type": "BOOLEAN"
        },
        "no_transport_should_transport": {
          "type": "BOOLEAN"
        },
        "no_transport_risk_informed": {
          "type": "BOOLEAN"
        },
        "no_transport_reason": {
          "type": "TEXT"
        },
        "no_transport_reason_other": {
          "type": "TEXT"
        },
        "no_transport_left_with": {
          "type": "TEXT"
        },
        "no_transport_left_with_other": {
          "type": "TEXT"
        },
        "no_transport_consult_with": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "vitals",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "hr": {
          "type": "INTEGER"
        },
        "sys": {
          "type": "INTEGER"
        },
        "dia": {
          "type": "INTEGER"
        },
        "fio2": {
          "type": "FLOAT"
        },
        "spo2": {
          "type": "FLOAT"
        },
        "resp": {
          "type": "INTEGER"
        },
        "level_of_c": {
          "type": "TEXT"
        },
        "perrl": {
          "type": "BOOLEAN"
        },
        "left_eye": {
          "type": "INTEGER"
        },
        "right_eye": {
          "type": "INTEGER"
        },
        "eyes_responsive": {
          "type": "BOOLEAN"
        },
        "bgl": {
          "type": "FLOAT"
        },
        "bgl_unit": {
          "type": "TEXT"
        },
        "temp": {
          "type": "FLOAT"
        },
        "temp_unit": {
          "type": "TEXT"
        },
        "etco2": {
          "type": "FLOAT"
        },
        "etco2_unit": {
          "type": "TEXT"
        },
        "pain": {
          "type": "INTEGER"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "neuro",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "assessed": {
          "type": "BOOLEAN"
        },
        "avpu": {
          "type": "TEXT"
        },
        "gcs": {
          "type": "BOOLEAN"
        },
        "gcs_eyes": {
          "type": "INTEGER"
        },
        "gcs_verbal": {
          "type": "INTEGER"
        },
        "gcs_motor": {
          "type": "INTEGER"
        },
        "luxr": {
          "type": "TEXT"
        },
        "ruxr": {
          "type": "TEXT"
        },
        "llxr": {
          "type": "TEXT"
        },
        "rlxr": {
          "type": "TEXT"
        },
        "suspect_stroke": {
          "type": "BOOLEAN"
        },
        "facial_droop": {
          "type": "BOOLEAN"
        },
        "facial_droop_side": {
          "type": "TEXT"
        },
        "arm_drift": {
          "type": "BOOLEAN"
        },
        "arm_drift_side": {
          "type": "TEXT"
        },
        "speech": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "airway_basic",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "oxygen_volume": {
          "type": "FLOAT"
        },
        "basic_maneuvers": {
          "type": "TEXT"
        },
        "opa": {
          "type": "TEXT"
        },
        "npa": {
          "type": "TEXT"
        },
        "bvm": {
          "type": "BOOLEAN"
        },
        "airway_rate": {
          "type": "FLOAT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "airway_ventilator",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "control": {
          "type": "TEXT"
        },
        "mode": {
          "type": "TEXT"
        },
        "rate": {
          "type": "FLOAT"
        },
        "tidal_volume": {
          "type": "FLOAT"
        },
        "inspiration_time": {
          "type": "FLOAT"
        },
        "inspiration_ratio": {
          "type": "FLOAT"
        },
        "expiration_ratio": {
          "type": "FLOAT"
        },
        "fiO2": {
          "type": "FLOAT"
        },
        "peep": {
          "type": "FLOAT"
        },
        "sensitivity": {
          "type": "FLOAT"
        },
        "expiration_pressure": {
          "type": "FLOAT"
        },
        "expiration_tidal_volume": {
          "type": "FLOAT"
        },
        "max_inspiration_pressure": {
          "type": "FLOAT"
        },
        "plateau_pressure": {
          "type": "FLOAT"
        },
        "pressure_support": {
          "type": "FLOAT"
        },
        "high_pressure_limit": {
          "type": "FLOAT"
        },
        "low_pressure_limit": {
          "type": "FLOAT"
        },
        "low_min_volume": {
          "type": "FLOAT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "airway_cpap_bipap",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "device": {
          "type": "TEXT"
        },
        "size": {
          "type": "FLOAT"
        },
        "fiO2": {
          "type": "FLOAT"
        },
        "peep": {
          "type": "FLOAT"
        },
        "pressure": {
          "type": "FLOAT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "airway_suction",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "duration": {
          "type": "INTEGER"
        },
        "amount": {
          "type": "INTEGER"
        },
        "tip": {
          "type": "INTEGER"
        },
        "size": {
          "type": "INTEGER"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "iv_io",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "site": {
          "type": "TEXT"
        },
        "side": {
          "type": "TEXT"
        },
        "gauge": {
          "type": "TEXT"
        },
        "attempts": {
          "type": "INTEGER"
        },
        "successful": {
          "type": "BOOLEAN"
        },
        "fluid": {
          "type": "TEXT"
        },
        "fluid_other": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "splinting",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "location": {
          "type": "TEXT"
        },
        "side": {
          "type": "TEXT"
        },
        "sensation_prior": {
          "type": "BOOLEAN"
        },
        "sensation_post": {
          "type": "BOOLEAN"
        },
        "traction_applied": {
          "type": "BOOLEAN"
        },
        "splinting_type": {
          "type": "TEXT"
        },
        "splinting_type_other": {
          "type": "TEXT"
        },
        "position_found": {
          "type": "TEXT"
        },
        "position_found_other": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "medication",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "medication_type": {
          "type": "TEXT"
        },
        "medication": {
          "type": "TEXT"
        },
        "medication_other": {
          "type": "TEXT"
        },
        "dose": {
          "type": "FLOAT"
        },
        "dose_unit": {
          "type": "TEXT"
        },
        "route": {
          "type": "TEXT"
        },
        "route_other": {
          "type": "TEXT"
        },
        "indication": {
          "type": "TEXT"
        },
        "administrated": {
          "type": "TEXT"
        },
        "administrated_other": {
          "type": "TEXT"
        },
        "same_dose": {
          "type": "INTEGER"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "in_out",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "direction": {
          "type": "TEXT"
        },
        "volume": {
          "type": "INTEGER"
        },
        "substance": {
          "type": "TEXT"
        },
        "substance_other": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "ecg",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "leads_nb": {
          "type": "BOOLEAN"
        },
        "rhythm": {
          "type": "TEXT"
        },
        "regular": {
          "type": "BOOLEAN"
        },
        "bbb": {
          "type": "BOOLEAN"
        },
        "bbb_side": {
          "type": "TEXT"
        },
        "st_changes": {
          "type": "BOOLEAN"
        },
        "st_elevation_list": {
          "type": "TEXT"
        },
        "st_depression_list": {
          "type": "TEXT"
        },
        "pacs": {
          "type": "BOOLEAN"
        },
        "pvcs": {
          "type": "BOOLEAN"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "settings",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "first_name": {
          "type": "TEXT"
        },
        "last_name": {
          "type": "TEXT"
        },
        "identification": {
          "type": "TEXT"
        },
        "position": {
          "type": "TEXT"
        },
        "work_place": {
          "type": "TEXT"
        },
        "send_report_to": {
          "type": "TEXT"
        },
        "export": {
          "type": "TEXT"
        },
        "partners": {
          "type": "TEXT"
        },
        "photoUrl": {
          "type": "TEXT"
        },
        "photoBase64": {
          "type": "TEXT"
        }
      }
   },
    {
      "name": "narrative",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "narration": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "code",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "code": {
          "type": "TEXT"
        },
        "time": {
          "type": "TEXT"
        }
      }
    }
]
});
angular.module('ePCR.services', [])

.service('Reports', function($q, $webSql, DB_CONFIG) {
  var reports = {};
  
  return {
    
    all: function() {
      reports = {};
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

      this.db.selectAll("report").then(function(results) {
        for(var i=0; i < results.rows.length; i++){
            reports[results.rows.item(i).id] = results.rows.item(i);
        }
        console.dir(reports);
        dfd.resolve(reports);
      });
      return dfd.promise;
    },
    
    get: function(reportId) {
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

      this.db.select("report", {
        "id": {
          "value":reportId
        },
      }).then(function(results) {
        dfd.resolve(results.rows.item(0));
      })
      return dfd.promise;
    }

  }
})

.service('Records', function($q, $webSql, DB_CONFIG) {
  var list = {};
  return {
    
    all: function(tableName, itemId) {
      list = {};
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
      this.db.select(tableName,{
        "report_id": itemId
      }).then(function(results) {
          for(var i=0; i < results.rows.length; i++){
              list[results.rows.item(i).id] = results.rows.item(i);
          }
          dfd.resolve(list);
        });
      return dfd.promise;
    },
    
    get: function(tableName, itemId) {
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

      this.db.select(tableName, {
        "id": {
          "value":itemId
        },
      }).then(function(results) {
        dfd.resolve(results.rows.length > 0 ? results.rows.item(0) : {});
      })
      return dfd.promise;
    }
  }
})
var headSurface = {
  0: 9.5,
  1: 8.5,
  5: 6.5,
  10: 5.5,
  15: 4.5,
  adult: 3.5
};

var upperLegSurface = {
  0: 2.75,
  1: 3.25,
  5: 4,
  10: 4.5,
  15: 4.5,
  adult: 4.75
};

var lowerLegSurface = {
  0: 2.5,
  1: 2.5,
  5: 2.75,
  10: 3,
  15: 3.25,
  adult: 3.5
};

function deleteDatebase() {

  db.dropTable('report');
  db.dropTable('vitals');
  db.dropTable('chief_complaint');
  db.dropTable('patient_hx');
  db.dropTable('neuro');
  db.dropTable('abc');
  db.dropTable('trauma');
  db.dropTable('trauma_auto');
  db.dropTable('trauma_fall');
  db.dropTable('trauma_blunt');
  db.dropTable('trauma_fall');
  db.dropTable('trauma_burn');
  db.dropTable('gi_gu');
  db.dropTable('field_delivery');
  db.dropTable('apgar');
  db.dropTable('muscular_skeletal');
  db.dropTable('airway');
  db.dropTable('invasive_airway');
  db.dropTable('ventilator');
  db.dropTable('cpap_bipap');
  db.dropTable('suction');
  db.dropTable('iv_io');
  db.dropTable('splinting');
  db.dropTable('medication');
  db.dropTable('c_spine');
  db.dropTable('in_out');
  db.dropTable('ecg');
  db.dropTable('signatures');
  db.dropTable('call_info');
  db.dropTable('no_transport');
  db.dropTable('narrative');
  db.dropTable('code');
}

Object.size = function (obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
}

function muscularToString(str){
  str = str == "" ? null : str;
  var obj = JSON.parse(str);
  var stringArray = [];
  angular.forEach(obj, function(val, ind){
    var symptoms = [];
    angular.forEach(val, function(symptom, index){
      symptoms.push(symptom);
    });
    stringArray.push(ind + ': ' + symptoms.join(', '));
  });
  return stringArray.join('; ');
}

function TimesToString(str, timesString){
  str = str == "" ? null : str;
  var obj = JSON.parse(str);
  var stringArray = [];
  angular.forEach(obj, function(val, ind){
    stringArray.push(timesString[ind] + ': ' + val);
  });
  return stringArray.join('\n');
}

function apgarToString(str){
  str = str == "" ? null : str;
  if (str != null) {
    var obj = JSON.parse(str);
    var sum = 0;
    for (key in obj) {
      sum += parseInt(obj[key]);
    };
    return sum + ' ' + str.replace('{','(').replace('}',')').replace(/"/g,'').replace(/,/g,', ');
  } else
    return "";
}

function JSONtoString(str){
  str = str == "" ? null : str;
  var obj = JSON.parse(str);
  var stringArray = [];
  angular.forEach(obj, function(val, ind){
    stringArray.push(val);
  });
  return stringArray.join(', ');
}

function burnsToString(str, body_parts_names, burnDegrees){
  str = str == "" ? null : str;
  var obj = JSON.parse(str);
  var stringArray = [];
  angular.forEach(obj, function(val, ind){
    stringArray.push(body_parts_names[ind] + ': ' + burnDegrees[val]);
  });
  return stringArray.join(', ');
}

function gastroPainToString(str, gastroMap){
  var gastro = str.split(',');
  var out = [];
  for (part in gastro){
    out.push(gastroMap[gastro[part]]);
  }
  return out.join(', ');
}

function defined(field){
  return (field != "" && field != 'undefined' && field != undefined && field != null);
}

function safeImage(base64Img){
  if (!defined(base64Img))
    return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=";
  else
    return base64Img;
}

function safe(field, alternativeField) {
  
  if (alternativeField && field == 'Other') {
    return alternativeField;
  }
  
  if (alternativeField && field == 'true' && (alternativeField == 'Left' || alternativeField == 'Right')) {
    return alternativeField;
  }
  
  if (!field || field == 'undefined') {
    return ''
  }
  
  if (field == 'true')
    return 'Yes'
    
  if (field == 'false')
    return 'No'
    
  return field;
}