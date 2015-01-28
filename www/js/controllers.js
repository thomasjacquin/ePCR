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

.controller('ReportDetailCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, report, vitals) {
  $scope.report = report;
  $scope.vitalsNumber = Object.size(vitals);
  console.log($scope.vitalsNumber);
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
    $scope.personal.patient_info_assessed = true;
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
  $scope.showDelete = false;
  
  $scope.toggleDelete = function(){
    $scope.showDelete = !$scope.showDelete;
  }
  
  $scope.deleteVitals = function(vitalsId){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.del("vitals", {"id": vitalsId})
    .then(function(){
      delete $scope.vitalsList[vitalsId];
     });
  }
    
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
    "hr" : $scope.vitalsEntry.hr,
    "sys" : $scope.vitalsEntry.sys,
    "dia" : $scope.vitalsEntry.dia,
    "fio2" : $scope.vitalsEntry.fio2,
    "spo2" : $scope.vitalsEntry.spo2,
    "resp" : $scope.vitalsEntry.resp,
    "level_of_c" : $scope.vitalsEntry.level_of_c,
    "perrl" : $scope.vitalsEntry.perrl == 'true',
    "left_eye" : $scope.vitalsEntry.left_eye,
    "right_eye" : $scope.vitalsEntry.right_eye,
    "eyes_responsive" : $scope.vitalsEntry.eyes_responsive == 'true',
    "bgl" : $scope.vitalsEntry.bgl,
    "bgl_unit" : $scope.vitalsEntry.bgl_unit,
    "temp" : $scope.vitalsEntry.temp,
    "temp_unit" : $scope.vitalsEntry.temp_unit,
    "etco2" : $scope.vitalsEntry.etco2,
    "pain" : $scope.vitalsEntry.pain,
  };
  
  console.log($scope.vitals);
  
  
  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("vitals", $scope.vitals, {
      'id': $stateParams.vitalsId
    }).then(function(){
      console.log("Updated vitals");
      $window.history.back();
    });
  }
})

.controller('ChiefComplaintCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report, chiefComplaint) {
  $scope.report = report;
  $scope.pertinentList = [];
  $scope.primaryComplaint = chiefComplaint.primary;
  
  $scope.binding = { 
    "primary_complaint": $scope.report.primary_complaint, 
    "primary_complaint_other": $scope.report.primary_complaint_other, 
    "secondary_complaint": $scope.report.secondary_complaint, 
    "pertinent": JSON.parse($scope.report.pertinent)
  };
  
  var existingPertinent = $scope.binding.pertinent;

  chiefComplaint.pertinent.forEach(function(complaint){
    var checked = existingPertinent != null ? existingPertinent.indexOf(complaint) != -1 : false;
    $scope.pertinentList.push({"text": complaint, "checked": checked})
  });
  
  $scope.save = function(){
    var selected = [];
    $scope.pertinentList.forEach(function(value, index){
      if (value.checked){
        selected.push(value.text);
      }
    });
    $scope.binding.pertinent = JSON.stringify(selected);
      
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.binding.chief_complaint_assessed = true;
    $scope.db.update("report", $scope.binding, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated report: Chief Complaint");
      $window.history.back();
    });
  }
})

.controller('PatientHistoryCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;
  $scope.showDelete = false;
  
  $scope.patientHistory = { 
    "hx_allergies": $scope.report.hx_allergies ? $scope.report.hx_allergies.split(','):[], 
    "hx_conditions": $scope.report.hx_conditions ? $scope.report.hx_conditions.split(','):[], 
    "hx_medications": $scope.report.hx_medications ? $scope.report.hx_medications.split(','):[], 
  };
  console.log($scope.patientHistory);
  
  $scope.goto = function(state){
    window.location = '#/tab/report/' + $stateParams.reportId + '/' + state;
  }
  
  $scope.deleteAllergy = function(item){
    var list = $scope.patientHistory.hx_allergies;      
    list.splice(list.indexOf(item),1);
    console.log(list);
    $scope.patientHistory.hx_allergies = list;
    $scope.save();
  }
  
  $scope.deleteCondition = function(item){
    var list = $scope.patientHistory.hx_conditions;      
    list.splice(list.indexOf(item),1);
    console.log(list);
    $scope.patientHistory.hx_conditions = list;
    $scope.save();
  }
    
  $scope.deleteMedication = function(item){
    var list = $scope.patientHistory.hx_medications;      
    list.splice(list.indexOf(item),1);
    console.log(list);
    $scope.patientHistory.hx_medications = list;
    $scope.save();
  }
  
  $scope.toggleDelete = function(){
    $scope.showDelete = !$scope.showDelete;
  }
    
  $scope.save = function(){
    console.log($scope.patientHistory);
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("report", $scope.patientHistory, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated report: Patient History");
    });
  }
})

.controller('AllergiesCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report, allergies) {
  $scope.report = report;
  $scope.allergiesList = [];
  
  var existingAllergies = $scope.report.hx_allergies;

  allergies.list.forEach(function(allergy){
    var checked = existingAllergies != null ? existingAllergies.indexOf(allergy) != -1 : false;
    $scope.allergiesList.push({"text": allergy, "checked": checked})
  });
  
  $scope.add = function(){
    var selected = [];
    $scope.allergiesList.forEach(function(value, index){
      if (value.checked){
        selected.push(value.text);
      }
    });
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("report", {"hx_allergies": selected, "patient_hx_assessed":true}, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated report: Patient Allergies");
      $window.history.back();
    });
  }
})

.controller('HomeMedicationsCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report, homeMedications) {
  $scope.report = report;
  var existingMedications = $scope.report.hx_medications;
  var medicationsList = [];
  
  $scope.categories = [];
  var keys = Object.keys(homeMedications);
  keys.forEach(function(category, index) {
    var items = [];
      homeMedications[category].list.forEach(function(medication){
    var checked = existingMedications != null ? existingMedications.indexOf(medication) != -1 : false;
    items.push({"text": medication, "checked": checked})
  });
    $scope.categories[index] = {
      name: homeMedications[category].name,
      items: items
    };
  });
  
  $scope.toggleGroup = function(categories) {
    if ($scope.isGroupShown(categories)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = categories;
    }
  };
  $scope.isGroupShown = function(categories) {
    return $scope.shownGroup === categories;
  };
  
  $scope.add = function(){
    var selected = [];
    $scope.categories.forEach(function(category, index){
      category.items.forEach(function(value, index){
        if (value.checked){
          selected.push(value.text);
        }
      });
    });
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("report", {"hx_medications": selected, "patient_hx_assessed":true}, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated report: Patient Home Medications");
      $window.history.back();
    });
  }
})

.controller('ConditionsCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report, medicalConditions) {
  $scope.report = report;
  var existingConditions = $scope.report.hx_conditions;
  var conditionsList = [];
  
  $scope.categories = [];
  var keys = Object.keys(medicalConditions);
  keys.forEach(function(category, index) {
    var items = [];
      medicalConditions[category].list.forEach(function(condition){
    var checked = existingConditions != null ? existingConditions.indexOf(condition) != -1 : false;
    items.push({"text": condition, "checked": checked})
  });
    
    $scope.categories[index] = {
      name: medicalConditions[category].name,
      items: items
    };
  });
  
  $scope.toggleGroup = function(categories) {
    if ($scope.isGroupShown(categories)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = categories;
    }
  };
  $scope.isGroupShown = function(categories) {
    return $scope.shownGroup === categories;
  };
  
  $scope.add = function(){
    var selected = [];
    $scope.categories.forEach(function(category, index){
      category.items.forEach(function(value, index){
        if (value.checked){
          selected.push(value.text);
        }
      });
    });
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("report", {"hx_conditions": selected, "patient_hx_assessed":true}, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated report: Patient Home Conditions");
      $window.history.back();
    });
  }
})

.controller('ExamCtrl', function($scope, $webSql, DB_CONFIG, report) {
  $scope.report = report;
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

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}
