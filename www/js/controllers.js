angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enablePatients: true
  };
})

.controller('ReportsCtrl', function($scope, $webSql, DB_CONFIG, reports) {
  
  $scope.reports = reports;
    
  $scope.addReport = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.insert('report', {"profile_picture": "http://lorempixel.com/output/people-q-c-200-200-7.jpg"}).then(function(results) {
        console.log(results.insertId);
        window.location = '#/tab/report/' + results.insertId;
    });
  }

  $scope.deleteDatabase = function(){
    deleteDatabase($webSql, DB_CONFIG);
  }
})

.controller('ReportDetailCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, report) {
  $scope.report = report;
})

.controller('PersonalInfoCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;
  
  $scope.personal = {
    "first_name": $scope.report.first_name, 
    "last_name": $scope.report.last_name, 
    "date_of_birth": new Date($scope.report.date_of_birth), 
    "gender": $scope.report.gender, 
    "weight": $scope.report.weight,
    "weight_unit": $scope.report.weight_unit,
    "profile_picture": $scope.report.profile_picture,
    "address_street": $scope.report.address_street,
    "address_city": $scope.report.address_city,
    "address_province": $scope.report.address_province,
    "phone_home": $scope.report.phone_home,
    "phone_work": $scope.report.phone_work,
    "phone_cell": $scope.report.phone_cell,
    "insurance": $scope.report.insurance,
    "mrn": $scope.report.mrn,
    "next_of_kin": $scope.report.next_of_kin,
    "next_of_kin_phone": $scope.report.next_of_kin_phone,
  };
  console.log($scope.personal);
  
  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("report", $scope.personal, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated report");
      $window.history.back();
    });
  }
})

.controller('VitalsListCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, vitalsList) {
  $scope.vitalsList = vitalsList;
  $scope.reportId = $stateParams.reportId;
    
  $scope.addVitals = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.insert('vitals', {"report_id": $stateParams.reportId}).then(function(results) {
        console.log(results.insertId);
        window.location = '#/tab/report/' + $stateParams.reportId + '/vitals/' + results.insertId;
    });
  }
})

.controller('VitalsCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, vitals) {
  $scope.vitalsEntry = vitals;

  $scope.vitals = {
    "hr" : $scope.vitalsEntry.hr
  };
  
  console.log($scope.vitals);
  
  
  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("vitals", $scope.vitals, {
      'report_id': $stateParams.reportId
    }).then(function(){
      console.log("Updated vitals");
      $window.history.back();
    });
  }
})

.controller('ChiefComplaintCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;
  
  $scope.chiefComplaint = { 
    "primary_complaint": $scope.report.primary_complaint, 
    "primary_complaint_other": $scope.report.primary_complaint_other, 
    "secondary_complaint": $scope.report.secondary_complaint, 
    "difficulty_breathing": $scope.report.difficulty_breathing == 'true',
    "chest_pain": $scope.report.chest_pain == 'true',
    "nausea": $scope.report.nausea == 'true',
    "vomiting": $scope.report.vomiting == 'true',
    "diarrhea": $scope.report.diarrhea == 'true',
    "dizziness": $scope.report.dizziness == 'true',
    "headache": $scope.report.headache == 'true',
    "loss_of_c": $scope.report.loss_of_c == 'true',
    "numb_tingling": $scope.report.numb_tingling == 'true',
    "general_weakness": $scope.report.general_weakness == 'true',
    "lethargy": $scope.report.lethargy == 'true',
    "neck_pain": $scope.report.neck_pain == 'true'
  };
  console.log($scope.chiefComplaint);
  
  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("report", $scope.chiefComplaint, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated report: Chief Complaint");
      $window.history.back();
    });
  }
})


function deleteDatebase($webSql, DB_CONFIG){
      $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
      $scope.db.dropTable('report');				
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
