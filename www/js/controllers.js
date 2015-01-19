angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('PatientsCtrl', function($scope, $webSql, DB_CONFIG, Patients) {
  
  $scope.patients = Patients.all();
    
  $scope.addReport = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.insert('report', {"name": 'new report'}).then(function(results) {
      console.log(results.insertId);
      $scope.db.insert('patient_info', {"report_id": results.insertId, "first_name": "First", "last_name": "Last", "date_of_birth": "15-04-1983"}).then(function(){
        window.location = '#/tab/patient/' + results.insertId;
      });
      $scope.db.insert('neuro', {"report_id": results.insertId});
      $scope.db.insert('chief_complaint', {"report_id": results.insertId});
      $scope.db.insert('abc', {"report_id": results.insertId});
      $scope.db.insert('trauma', {"report_id": results.insertId});
      $scope.db.insert('trauma_penetrating', {"report_id": results.insertId});
      $scope.db.insert('trauma_blunt', {"report_id": results.insertId});
      $scope.db.insert('trauma_fall', {"report_id": results.insertId});
      $scope.db.insert('trauma_burn', {"report_id": results.insertId});
      $scope.db.insert('gi_gu', {"report_id": results.insertId});
      $scope.db.insert('field_delivery', {"report_id": results.insertId});
      $scope.db.insert('apgar', {"report_id": results.insertId});
      $scope.db.insert('muscular_skeletal', {"report_id": results.insertId});
      $scope.db.insert('invasive_airway', {"report_id": results.insertId});
      $scope.db.insert('c_spine', {"report_id": results.insertId});
      $scope.db.insert('signatures', {"report_id": results.insertId});
      $scope.db.insert('call_info', {"report_id": results.insertId});
      $scope.db.insert('no_transport', {"report_id": results.insertId});
    });
  };

$scope.deleteDatabase = function(){
      $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
      $scope.db.dropTable('patients');				
      $scope.db.dropTable('vitals');	
      $scope.db.dropTable('chief_complaint');		
      $scope.db.dropTable('patient_hx');				
      $scope.db.dropTable('neuro');			
      $scope.db.dropTable('abc');			
      $scope.db.dropTable('trauma');				
      $scope.db.dropTable('trauma_auto');				
      $scope.db.dropTable('trauma_blunt');				
      $scope.db.dropTable('trauma_penetrating');				
      $scope.db.dropTable('trauma_fall');
      $scope.db.dropTable('trauma_burn');
      $scope.db.dropTable('gi_gu');
      $scope.db.dropTable('field_delivery');
      $scope.db.dropTable('apgar');
      $scope.db.dropTable('muscular_skeletal');			
      $scope.db.dropTable('airway');			
      $scope.db.dropTable('invasive_airway');				
      $scope.db.dropTable('ventilator');				
      $scope.db.dropTable('cpap_bipap');
      $scope.db.dropTable('suction');
      $scope.db.dropTable('iv_io');				
      $scope.db.dropTable('splinting');		
      $scope.db.dropTable('medication');				
      $scope.db.dropTable('c_spine');				
      $scope.db.dropTable('in_out');	
      $scope.db.dropTable('ecg');
      $scope.db.dropTable('signatures');
      $scope.db.dropTable('call_info');
      $scope.db.dropTable('no_transport');
      $scope.db.dropTable('narrative');
      $scope.db.dropTable('code');
  }
})

.controller('PatientDetailCtrl', function($scope, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
})

.controller('PatientInfoCtrl', function($scope, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enablePatients: true
  };
})

