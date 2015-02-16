angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enablePatients: true
  };
})

.controller('ReportsCtrl', function($scope, $q, $webSql, DB_CONFIG, reports) {
  
  $scope.reports = reports;
  $scope.showDelete = false;
    
  $scope.addReport = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.insert('report', {"profile_picture": "http://lorempixel.com/output/people-q-c-200-200-7.jpg"}).then(function(results) {
        console.log(results.insertId);
        window.location = '#/tab/report/' + results.insertId;
    });
  }
  
  $scope.toggleDelete = function(){
    $scope.showDelete = !$scope.showDelete;
  }

  $scope.deleteReport = function(reportId){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    var promises = [];
    promises.push($scope.db.del("report", {"id": reportId}));
    promises.push($scope.db.del("vitals", {"report_id": reportId}));
    $q.all(promises)
    .then(function(){
      console.log("Report deleted successfully");
      delete $scope.reports[reportId];
    })
  }
  
  $scope.deleteDatabase = function(){
    deleteDatabase($webSql, DB_CONFIG);
  }
})

.controller('ReportDetailCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, report, vitals, narrative, code, $window) {
  $scope.report = report;
  $scope.vitalsNumber = Object.size(vitals);
  $scope.narrativeNumber = Object.size(narrative);
  $scope.codeNumber = Object.size(code);
  
  $scope.code = function(){
    $window.location = '#/tab/report/' + $stateParams.reportId + '/code';
  }
})

.controller('PersonalInfoCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;
  
  $scope.personal = {
    "first_name": $scope.report.first_name, 
    "last_name": $scope.report.last_name, 
    "date_of_birth": $scope.report.date_of_birth ? new Date($scope.report.date_of_birth) : "", 
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

.controller('VitalsChartCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, vitals) {
  
  var xAxis = [],
      data = {};
  
  $scope.vitalSelected = {
    serie: "hr"
  };
  
  $scope.vitalsSeries = [
    {code: "hr", name: "Heart Rate"}, 
    {code: "sys", name: "Systole"},
    {code: "dia", name: "Diastole"},
    {code: "fio2", name: "FiO2"},
    {code: "spo2", name: "SpO2"},
    {code: "resp", name: "Respiration"},
    {code: "level_of_c", name: "Consciousness"},
    {code: "left_eye", name: "Left Eye Diameter"},
    {code: "left_eye", name: "Right Eye Diameter"},
    {code: "bgl", name: "Blood Glucose"},
    {code: "temp", name: "Temperature"},
    {code: "etco2", name: "EtCO2"},
    {code: "pain", name: "Pain"},
  ];
  
  for(index in vitals) {  
    xAxis.push(vitals[index].created);
    $scope.vitalsSeries.forEach(function(serie){
      if (!data[serie.code])
        data[serie.code] = [];
      data[serie.code].push(vitals[index][serie.code]);
    });
  }

  $scope.chart = {
      labels : xAxis,
      datasets : [
          {
              fillColor : "rgba(151,187,205,0)",
              strokeColor : "#e67e22",
              pointColor : "rgba(151,187,205,0)",
              pointStrokeColor : "#e67e22",
              data : data[$scope.vitalSelected.serie]
          }
      ], 
  };
  
  $scope.changeVital = function(){
    $scope.chart.datasets[0].data = data[$scope.vitalSelected.serie];
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

.controller('ExamCtrl', function($scope, $webSql, DB_CONFIG, report, neuroList) {
  $scope.report = report;
  $scope.neuroNumber = Object.size(neuroList);
})

.controller('NeuroCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, neuro) {
  $scope.neuroEntry = neuro;

  $scope.neuro = {
    "avpu" : $scope.neuroEntry.avpu,
    "gcs" : $scope.neuroEntry.gcs == 'true',
    "gcs_eyes" : Number($scope.neuroEntry.gcs_eyes),
    "gcs_verbal" : Number($scope.neuroEntry.gcs_verbal),
    "gcs_motor" : Number($scope.neuroEntry.gcs_motor),
    "luxr" : $scope.neuroEntry.luxr == 'true',
    "ruxr" : $scope.neuroEntry.ruxr == 'true',
    "llxr" : $scope.neuroEntry.llxr == 'true',
    "rlxr" : $scope.neuroEntry.rlxr == 'true',
    "suspect_stroke" : $scope.neuroEntry.suspect_stroke == 'true',
    "facial_droop" : $scope.neuroEntry.facial_droop == 'true',
    "facial_droop_side" : $scope.neuroEntry.facial_droop_side == 'true',
    "arm_drift" : $scope.neuroEntry.arm_drift == 'true',
    "arm_drift_side" : $scope.neuroEntry.arm_drift_side == 'true',
    "speech" : $scope.neuroEntry.speech
  };
  console.log($scope.neuro);
  
  $scope.calculateGCS = function(){
    $scope.gcs_total = Number($scope.neuro.gcs_eyes) + Number($scope.neuro.gcs_verbal) + Number($scope.neuro.gcs_motor);
  }
  
  $scope.calculateGCS();
  
  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
//    $scope.neuro.assessed = true;
    $scope.db.update("neuro", $scope.neuro, {
      'id': $stateParams.neuroId
    }).then(function(){
      console.log("Updated neuro");
      $window.history.back();
    });
  }
})

.controller('AbcCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;
  $scope.activeButton = 1;

  $scope.abc = {
    "open_patent" : $scope.report.open_patent == 'true',
    "tracheal_deviation" : $scope.report.tracheal_deviation == 'true',
    "tracheal_deviation_side" : $scope.report.tracheal_deviation_side == 'true',
    "interventions" : $scope.report.interventions == 'true',
    "breathing_type" : $scope.report.breathing_type == 'true',
    "breathing_effective" : $scope.report.breathing_effective == 'true',
    "accessory_muscle" : $scope.report.accessory_muscle == 'true',
    "nasal_flare" : $scope.report.nasal_flare == 'true',
    "cough" : $scope.report.cough == 'true',
    "cough_productive" : $scope.report.cough_productive == 'true',
    "subcutaneous_emphysema" : $scope.report.subcutaneous_emphysema == 'true',
    "flailed_chest" : $scope.report.flailed_chest == 'true',
    "flailed_chest_side" : $scope.report.flailed_chest_side == 'true',
    "suspect_pneumothorax" : $scope.report.suspect_pneumothorax == 'true',
    "suspect_hemothorax" : $scope.report.suspect_hemothorax == 'true',
    "ctax4" : $scope.report.ctax4 == 'true',
    "lung_ul_sound" : $scope.report.lung_ul_sound,
    "lung_ur_sound" : $scope.report.lung_ur_sound,
    "lung_ll_sound" : $scope.report.lung_ll_sound,
    "lung_lr_sound" : $scope.report.lung_lr_sound,
    "pulse_location" : $scope.report.pulse_location,
    "pulse_quality" : $scope.report.pulse_quality,
    "pulse_regular" : $scope.report.pulse_regular == 'true',
    "jvd" : $scope.report.jvd == 'true',
    "cap_refill" : $scope.report.cap_refill,
    "skin_color" : $scope.report.skin_color,
    "skin_temperature" : $scope.report.skin_temperature,
    "skin_condition" : $scope.report.skin_condition,
    "heart_tones" : $scope.report.heart_tones,
    "heart_tones_quality" : $scope.report.heart_tones_quality,
    "peripheral_edema" : $scope.report.peripheral_edema == 'true',
    "peripheral_edema_location" : $scope.report.peripheral_edema_location,
    "peripheral_edema_severity" : $scope.report.peripheral_edema_severity,
  };
  console.log($scope.abc);
  
  $scope.switchTab = function(tab){
    $scope.activeButton = tab;
  }
  
  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.abc.abc_assessed = true;
    $scope.db.update("report", $scope.abc, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated abc");
      $window.history.back();
    });
  }
})

.controller('TraumaCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, report) {
  $scope.report = report;
  $scope.trauma = {
    "has_trauma": $scope.report.has_trauma == 'true'
  }
  
  $scope.toggle = function(){
    $scope.save();
  }
  
  $scope.save = function(){
    console.log($scope.trauma);
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("report", $scope.trauma, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated trauma");
    });
  }
})

.controller('TraumaAutoCtrl', function($scope, $stateParams, $window, $webSql, DB_CONFIG, report) {
  $scope.report = report;
  $scope.auto = {
    "trauma_auto_vehicle": $scope.report.trauma_auto_vehicle,
    "trauma_auto_seat": $scope.report.trauma_auto_seat,
    "trauma_auto_seatbelt": $scope.report.trauma_auto_seatbelt == 'true',
    "trauma_auto_airbag": $scope.report.trauma_auto_airbag == 'true',
    "trauma_auto_helmet": $scope.report.trauma_auto_helmet == 'true',
    "trauma_auto_leathers": $scope.report.trauma_auto_leathers == 'true',
    "trauma_auto_nb_occupants": $scope.report.trauma_auto_nb_occupants,
    "trauma_auto_vehicle_speed": $scope.report.trauma_auto_vehicle_speed,
    "trauma_auto_speed_unit": $scope.report.trauma_auto_speed_unit,
    "trauma_auto_removed_by": $scope.report.trauma_auto_removed_by,
    "trauma_auto_details_per": $scope.report.trauma_auto_details_per,
    "trauma_auto_photo": $scope.report.trauma_auto_photo,
  };
  
  $scope.toggleSeat = function(seat){
    $scope.auto.trauma_auto_seat = seat;
    console.log(seat);
  }
  
  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.auto.trauma_auto_assessed = true;
    $scope.db.update("report", $scope.auto, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated trauma auto");
      $window.history.back();
    });
  }
})

.controller('TraumaPenetratingCtrl', function($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {
  $scope.report = report;
  $scope.bodyPartsList = [];
  $scope.penetrating = {
    "trauma_penetrating_assault": $scope.report.trauma_penetrating_assault == 'true',
    "trauma_penetrating_moi": $scope.report.trauma_penetrating_moi,
    "trauma_penetrating_velocity": $scope.report.trauma_penetrating_velocity,
    "trauma_penetrating_bleeding": $scope.report.trauma_penetrating_bleeding == 'true',
    "trauma_penetrating_controlled": $scope.report.trauma_penetrating_controlled == 'true',
    "trauma_penetrating_body_parts": JSON.parse($scope.report.trauma_penetrating_body_parts)
  };
  
  var bodyPartsInvolved = $scope.penetrating.trauma_penetrating_body_parts;
  
  bodyParts.list.forEach(function(part){
    var checked = bodyPartsInvolved != null ? bodyPartsInvolved.indexOf(part) != -1 : false;
    $scope.bodyPartsList.push({"text": part, "checked": checked})
  });
  
  $scope.save = function(){
    var selected = [];
    $scope.bodyPartsList.forEach(function(value, index){
      if (value.checked){
        selected.push(value.text);
      }
    });
    $scope.penetrating.trauma_penetrating_body_parts = JSON.stringify(selected);
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.penetrating.trauma_penetrating_assessed = true;
    $scope.db.update("report", $scope.penetrating, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated trauma penetrating");
      $window.history.back();
    });
  }
})

.controller('TraumaBluntCtrl', function($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {
  $scope.report = report;
  $scope.bodyPartsList = [];
  $scope.blunt = {
    "trauma_blunt_assault": $scope.report.trauma_blunt_assault == 'true',
    "trauma_blunt_moi": $scope.report.trauma_blunt_moi,
    "trauma_blunt_bleeding": $scope.report.trauma_blunt_bleeding == 'true',
    "trauma_blunt_controlled": $scope.report.trauma_blunt_controlled == 'true',
    "trauma_blunt_body_parts": JSON.parse($scope.report.trauma_blunt_body_parts),
    "trauma_blunt_photo": $scope.report.trauma_blunt_photo
  };
  
  var bodyPartsInvolved = $scope.blunt.trauma_blunt_body_parts;
  
  bodyParts.list.forEach(function(part){
    var checked = bodyPartsInvolved != null ? bodyPartsInvolved.indexOf(part) != -1 : false;
    $scope.bodyPartsList.push({"text": part, "checked": checked})
  });
  
  $scope.save = function(){
    var selected = [];
    $scope.bodyPartsList.forEach(function(value, index){
      if (value.checked){
        selected.push(value.text);
      }
    });
    $scope.blunt.trauma_blunt_body_parts = JSON.stringify(selected);
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.blunt.trauma_blunt_assessed = true;
    $scope.db.update("report", $scope.blunt, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated trauma blunt");
      $window.history.back();
    });
  }
})

.controller('TraumaFallCtrl', function($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {
  $scope.report = report;
  $scope.bodyPartsList = [];
  $scope.fall = {
    "trauma_fall_assault": $scope.report.trauma_fall_assault == 'true',
    "trauma_fall_distance": $scope.report.trauma_fall_distance,
    "trauma_fall_distance_unit": $scope.report.trauma_fall_distance_unit,
    "trauma_fall_surface": $scope.report.trauma_fall_surface,
    "trauma_fall_loss_of_c": $scope.report.trauma_fall_loss_of_c == 'true',
    "trauma_fall_loss_of_c_time": $scope.report.trauma_fall_loss_of_c_time,
    "trauma_fall_bleeding": $scope.report.trauma_fall_bleeding == 'true',
    "trauma_fall_controlled": $scope.report.trauma_fall_controlled == 'true',
    "trauma_fall_body_parts": JSON.parse($scope.report.trauma_fall_body_parts),
    "trauma_fall_photo": $scope.report.trauma_fall_photo
  };
  
  var bodyPartsInvolved = $scope.fall.trauma_fall_body_parts;
  
  bodyParts.list.forEach(function(part){
    var checked = bodyPartsInvolved != null ? bodyPartsInvolved.indexOf(part) != -1 : false;
    $scope.bodyPartsList.push({"text": part, "checked": checked})
  });
  
  $scope.save = function(){
    var selected = [];
    $scope.bodyPartsList.forEach(function(value, index){
      if (value.checked){
        selected.push(value.text);
      }
    });
    $scope.fall.trauma_fall_body_parts = JSON.stringify(selected);
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.fall.trauma_fall_assessed = true;
    $scope.db.update("report", $scope.fall, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated trauma fall");
      $window.history.back();
    });
  }
})

.controller('TraumaBurnCtrl', function($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {
  $scope.report = report;
  $scope.bodyPartsList = [];
  $scope.burn = {
    "trauma_burn_total_surface": $scope.report.trauma_burn_total_surface,
    "trauma_burn_body_type": $scope.report.trauma_burn_body_type,
    "trauma_burn_body_parts": JSON.parse($scope.report.trauma_burn_areas),
    "trauma_burn_body_photo": $scope.report.trauma_burn_body_photo
  };
  
  var bodyPartsInvolved = $scope.burn.trauma_burn_body_parts;
  
  bodyParts.list.forEach(function(part){
    var checked = bodyPartsInvolved != null ? bodyPartsInvolved.indexOf(part) != -1 : false;
    $scope.bodyPartsList.push({"text": part, "checked": checked})
  });
  
  $scope.save = function(){
    var selected = [];
    $scope.bodyPartsList.forEach(function(value, index){
      if (value.checked){
        selected.push(value.text);
      }
    });
    $scope.burn.trauma_burn_body_parts = JSON.stringify(selected);
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.burn.trauma_burn_assessed = true;
    $scope.db.update("report", $scope.burn, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated trauma burn");
    });
  }
})

.controller('GiCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;

  $scope.gi = {
    "gi_soft" : $scope.report.gi_soft == 'true',
    "gi_flat" : $scope.report.gi_flat == 'true',
    "gi_non_distended" : $scope.report.gi_non_distended == 'true',
    "gi_non_tender" : $scope.report.gi_non_tender == 'true',
    "gi_rebound" : $scope.report.gi_rebound == 'true',
    "gi_obese" : $scope.report.gi_obese == 'true',
    "gi_last_bm" : $scope.report.gi_last_bm,
    "gi_loi" : $scope.report.gi_loi,
  };
  console.log($scope.gi);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.gi.gi_assessed = true;
    $scope.db.update("report", $scope.gi, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated GI");
      $window.history.back();
    });
  }
})

.controller('GuCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;

  $scope.gu = {
    "gu_pain" : $scope.report.gu_pain == 'true',
    "gu_frequency" : $scope.report.gu_frequency == 'true',
    "gu_pain" : $scope.report.gu_pain == 'true',
    "gu_hematuria" : $scope.report.gu_hematuria == 'true',
    "gu_incontinence" : $scope.report.gu_incontinence == 'true',
    "gu_bladder_distention" : $scope.report.gu_bladder_distention == 'true',
    "gu_urinary_urgency" : $scope.report.gu_urinary_urgency == 'true',
    "gu_last_void" : $scope.report.gu_last_void,
  };
  console.log($scope.gu);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.gu.gu_assessed = true;
    $scope.db.update("report", $scope.gu, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated GU");
      $window.history.back();
    });
  }
})

.controller('GynCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, $state, report) {
  $scope.report = report;

  $scope.gyn = {
    "gyn_gravid" : $scope.report.gyn_gravid,
    "gyn_term" : $scope.report.gyn_term,
    "gyn_para" : $scope.report.gyn_para,
    "gyn_abortia" : $scope.report.gyn_abortia,
    "gyn_live" : $scope.report.gyn_live,
    "gyn_last_menstruation" : $scope.report.gyn_last_menstruation,
    "gyn_discharge" : $scope.report.gyn_discharge == 'true',
    "gyn_substance" : $scope.report.gyn_substance,
    "gyn_pregnant" : $scope.report.gyn_pregnant,
    "gyn_edc" : $scope.report.gyn_edc,
    "gyn_gestation_known" : $scope.report.gyn_gestation_known == 'true',
    "gyn_gest_weeks" : $scope.report.gyn_gest_weeks,
    "peripheral_edema" : $scope.report.peripheral_edema == 'true',
    "peripheral_edema_location" : $scope.report.peripheral_edema_location,
    "peripheral_edema_severity" : $scope.report.peripheral_edema_severity,
    "gyn_membrane_intact" : $scope.report.gyn_membrane_intact == 'true',
    "gyn_time_ruptured" : $scope.report.gyn_time_ruptured,
    "gyn_fluid" : $scope.report.gyn_fluid,
    "gyn_expected_babies" : $scope.report.gyn_expected_babies,
    "gyn_fetal_mvmt" : $scope.report.gyn_fetal_mvmt == 'true',
    "gyn_last_mvmt" : $scope.report.gyn_last_mvmt,
    "gyn_mvmt_per_hr" : $scope.report.gyn_mvmt_per_hr,
    "gyn_contractions" : $scope.report.gyn_contractions == 'true',
    "gyn_contraction_duration" : $scope.report.gyn_contraction_duration,
    "gyn_contraction_separation" : $scope.report.gyn_contraction_separation,
  };
  console.log($scope.gyn);
  
  $scope.fieldDelivery = function(){
    $scope.save();
    $window.location = '#/tab/report/' + $stateParams.reportId + '/exam/gyn/field-delivery';
  }

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.gyn.gyn_assessed = true;
    $scope.db.update("report", $scope.gyn, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated Gyn");
      $window.history.back();
    });
  }
})

.controller('FieldDeliveryCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, $ionicModal, report) {
  $scope.report = report;
  
  var apgar1 = typeof(JSON.parse($scope.report.field_delivery_apgar1)) == 'object' ? JSON.parse($scope.report.field_delivery_apgar1) : {};
  var apgar5 = typeof(JSON.parse($scope.report.field_delivery_apgar5)) == 'object' ? JSON.parse($scope.report.field_delivery_apgar5) : {};

  $scope.field = {
    "field_delivery_presentation" : $scope.report.field_delivery_presentation,
    "field_delivery_time" : $scope.report.field_delivery_time,
    "field_delivery_meconium" : $scope.report.field_delivery_meconium,
    "field_delivery_cord_cut_length" : $scope.report.field_delivery_cord_cut_length,
    "field_delivery_apgar1" : apgar1,
    "field_delivery_apgar5" : apgar5,
    "field_delivery_stimulation_type" : $scope.report.field_delivery_stimulation_type,
    "field_delivery_placenta" : $scope.report.field_delivery_placenta == 'true',
    "field_delivery_placenta_time" : $scope.report.field_delivery_placenta_time,
    "gyn_gestation_known" : $scope.report.gyn_gestation_known == 'true',
    "field_delivery_placenta_intact" : $scope.report.field_delivery_placenta_intact == 'true'
  };
  
  $scope.apgarTotals = {
    "apgar1": apgarSum(apgar1),
    "apgar5": apgarSum(apgar5)
  };
  
  $ionicModal.fromTemplateUrl('apgar.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })  
  
  $scope.openModal = function(time) {
    $scope.activeModal = time;
    $scope.apgar = time == 1 ? $scope.field.field_delivery_apgar1 : $scope.field.field_delivery_apgar5;
    $scope.modal.show()
  }

  $scope.closeModal = function() {
    if ($scope.activeModal == 1){
      apgar1 = $scope.apgar;
      $scope.apgarTotals.apgar1 = apgarSum($scope.apgar);
    } else {
      apgar5 = $scope.apgar;
      $scope.apgarTotals.apgar5 = apgarSum($scope.apgar);
    }
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.save = function(){
     $scope.field.field_delivery_apgar1 = JSON.stringify(apgar1);
     $scope.field.field_delivery_apgar5 = JSON.stringify(apgar5);
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.field.field_delivery_assessed = true;
    $scope.db.update("report", $scope.field, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated Field Delivery");
      $window.history.back();
    });
  }
})

.controller('MuscularCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report, bodyParts, muscularInjuries) {
  $scope.report = report;
  $scope.categories = [];
  var groupsShown = [];
  
  var existingInjuries = JSON.parse($scope.report.muscular_complaint) || {};
  console.log(existingInjuries);
  
  $scope.muscular = {
    "muscular_has_complaint": $scope.report.muscular_has_complaint == 'true',
    "muscular_complaint": existingInjuries,
  };
  
  bodyParts.list.forEach(function(bodyPart, index) {
    var injuries = [];
    muscularInjuries.list.forEach(function(injury){
      if (existingInjuries){
        var checked = existingInjuries[bodyPart] != null ? existingInjuries[bodyPart].indexOf(injury) != -1 : false;
        injuries.push({"text": injury, "checked": checked})
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
  
  $scope.toggleGroup = function(bodyPart) {
    if (groupsShown.indexOf(bodyPart) == -1){
      groupsShown.push(bodyPart);
    } else {
      groupsShown.splice(groupsShown.indexOf(bodyPart), 1);
    }
  };
  $scope.isGroupShown = function(bodyPart) {
    return groupsShown.indexOf(bodyPart) != -1;
  };
  
  $scope.save = function(){
    var selected = {};
    $scope.categories.forEach(function(bodyPart, index){
      var listForBodyPart = []
      bodyPart.injuries.forEach(function(value, index){
        if (value.checked){
          listForBodyPart.push(value.text);
        }
      });
      if (listForBodyPart.length != 0){
        selected[bodyPart.name] = listForBodyPart;
      }
    });
    
    $scope.muscular.muscular_complaint = JSON.stringify(selected);
    $scope.muscular.muscular_assessed = true;
    
//    console.log(JSON.stringify(selected));
     
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("report", $scope.muscular, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated report: Muscular/Skeletal");
      $window.history.back();
    });
  }
})

.controller('ProceduresCtrl', function($scope, $webSql, DB_CONFIG, report, ivIoList, splintingList, medicationList, inOutList, ecgList) {
  $scope.report = report;
  $scope
  $scope.splintingNumber = Object.size(splintingList);
  $scope.medicationNumber = Object.size(medicationList);
  $scope.inOutNumber = Object.size(inOutList);
  $scope.ecgNumber = Object.size(ecgList);
  $scope.procedures = {
    "spinal_assessed" : report.spinal_assessed == 'true',
    "ivIoNumber" :  Object.size(ivIoList),
    "medicationNumber" :  Object.size(medicationList),
  };
})

.controller('AirwayCtrl', function($scope, $webSql, DB_CONFIG, report, basicAirwayList, ventilatorList, cpapBipapList, suctionList) {
  $scope.report = report;
  $scope.basicAirwayNumber = Object.size(basicAirwayList);
  $scope.ventilatorNumber = Object.size(ventilatorList);
  $scope.cpapBipapNumber = Object.size(cpapBipapList);
  $scope.suctionNumber = Object.size(suctionList);
})

.controller('BasicAirwayCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {
  $scope.procedureEntry = procedure;

  $scope.basic = {
    "oxygen_volume" : $scope.procedureEntry.oxygen_volume,
    "basic_maneuvers" : $scope.procedureEntry.basic_maneuvers,
    "opa" : $scope.procedureEntry.opa,
    "npa" : $scope.procedureEntry.npa,
    "bvm" : $scope.procedureEntry.bvm == 'true',
    "airway_rate" : $scope.procedureEntry.airway_rate
  };
  console.log($scope.basic);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("airway_basic", $scope.basic, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated Basic Airway");
      $window.history.back();
    });
  }
})

.controller('InvasiveAirwayCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;

  $scope.invasive = {
    "invasive_airway_secured" : $scope.report.invasive_airway_secured == 'true',
    "invasive_airway_device" : $scope.report.invasive_airway_device,
    "invasive_airway_size" : $scope.report.invasive_airway_size,
    "invasive_airway_cuffed" : $scope.report.invasive_airway_cuffed == 'true',
    "invasive_airway_inflation" : $scope.report.invasive_airway_inflation,
    "invasive_airway_technique" : $scope.report.invasive_airway_technique,
    "invasive_airway_distance" : $scope.report.invasive_airway_distance,
    "invasive_airway_attempts" : $scope.report.invasive_airway_attempts
  };
  console.log($scope.invasive);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.invasive.invasive_airway_assessed = true;
    $scope.db.update("report", $scope.invasive, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated Invasive Airway");
      $window.history.back();
    });
  }
})

.controller('VentilatorCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {
  $scope.procedureEntry = procedure;

  $scope.ventilator = {
    "control" : $scope.procedureEntry.control,
    "mode" : $scope.procedureEntry.mode,
    "rate" : $scope.procedureEntry.rate,
    "tidal_volume" : $scope.procedureEntry.tidal_volume,
    "inspiration_time" : $scope.procedureEntry.inspiration_time,
    "inspiration_ratio" : $scope.procedureEntry.inspiration_ratio,
    "expiration_ratio" : $scope.procedureEntry.expiration_ratio,
    "fiO2" : $scope.procedureEntry.fiO2,
    "peep" : $scope.procedureEntry.peep,
    "sensitivity" : $scope.procedureEntry.sensitivity,
    "expiration_pressure" : $scope.procedureEntry.expiration_pressure,
    "expiration_tidal_volume" : $scope.procedureEntry.expiration_tidal_volume,
    "max_inspiration_pressure" : $scope.procedureEntry.max_inspiration_pressure,
    "plateau_pressure" : $scope.procedureEntry.plateau_pressure,
    "pressure_support" : $scope.procedureEntry.pressure_support,
    "high_pressure_limit" : $scope.procedureEntry.high_pressure_limit,
    "low_pressure_limit" : $scope.procedureEntry.low_pressure_limit,
    "low_min_volume" : $scope.procedureEntry.low_min_volume
  };
  console.log($scope.ventilator);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("airway_ventilator", $scope.ventilator, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated Ventilator");
      $window.history.back();
    });
  }
})

.controller('CpapBipapCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {
  $scope.procedureEntry = procedure;

  $scope.cpap = {
    "device" : $scope.procedureEntry.device,
    "size" : $scope.procedureEntry.size,
    "fiO2" : $scope.procedureEntry.fiO2,
    "peep" : $scope.procedureEntry.peep,
    "pressure" : $scope.procedureEntry.pressure,
  };
  console.log($scope.cpap);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("airway_cpap_bipap", $scope.cpap, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated CPAP/BiPAP");
      $window.history.back();
    });
  }
})

.controller('SuctionCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {
  $scope.procedureEntry = procedure;

  $scope.suction = {
    "duration" : $scope.procedureEntry.duration,
    "amount" : $scope.procedureEntry.amount,
    "tip" : $scope.procedureEntry.tip,
    "size" : $scope.procedureEntry.size,
  };
  console.log($scope.suction);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("airway_suction", $scope.suction, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated Suction");
      $window.history.back();
    });
  }
})

.controller('IvIoCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {
  $scope.procedureEntry = procedure;

  $scope.ivio = {
    "site" : $scope.procedureEntry.site,
    "side" : $scope.procedureEntry.side,
    "gauge" : $scope.procedureEntry.gauge,
    "attempts" : $scope.procedureEntry.attemps,
    "successful" : $scope.procedureEntry.successful == true,
    "fluid" : $scope.procedureEntry.fluid,
    "fluid_other" : $scope.procedureEntry.fluid_other
  };
  console.log($scope.suction);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("iv_io", $scope.ivio, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated IV/IO");
      $window.history.back();
    });
  }
})

.controller('SplintingCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {
  $scope.procedureEntry = procedure;

  $scope.splinting = {
    "location" : $scope.procedureEntry.location,
    "side" : $scope.procedureEntry.side,
    "sensation_prior" : $scope.procedureEntry.sensation_prior == 'true',
    "sensation_post" : $scope.procedureEntry.sensation_post == 'true',
    "traction_applied" : $scope.procedureEntry.traction_applied == 'true',
    "splinting_type" : $scope.procedureEntry.splinting_type,
    "splinting_type_other" : $scope.procedureEntry.splinting_type_other,
    "position_found" : $scope.procedureEntry.position_found,
    "position_found_other" : $scope.procedureEntry.position_found_other
  };
  console.log($scope.splinting);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("splinting", $scope.splinting, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated Splinting");
      $window.history.back();
    });
  }
})

.controller('MedicationCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure, homeMedications) {
  $scope.procedureEntry = procedure;
  $scope.medication_list = $scope.procedureEntry.medication_type == '0' ?  homeMedications.generic.list : homeMedications.brand.list;
  if ($scope.medication_list[0] != "Other")
    $scope.medication_list.unshift("Other");

  $scope.medication = {
    "medication_type" : $scope.procedureEntry.medication_type,
    "medication" : $scope.procedureEntry.medication,
    "medication_other" : $scope.procedureEntry.medication_other,
    "dose" : $scope.procedureEntry.dose,
    "dose_unit" : $scope.procedureEntry.dose_unit,
    "route" : $scope.procedureEntry.route,
    "route_other" : $scope.procedureEntry.route_other,
    "indication" : $scope.procedureEntry.indication,
    "administrated" : $scope.procedureEntry.administrated,
    "administrated_other" : $scope.procedureEntry.administrated_other,
    "same_dose" : $scope.procedureEntry.same_dose,
  };
  console.log($scope.medication);
  
  $scope.updateMedicationList = function(){
      if ($scope.medication.medication_type == '0') {
          $scope.medication_list = homeMedications.generic.list;
      } else {
          $scope.medication_list = homeMedications.brand.list;
      }
      $scope.medication.medication = '';
      if ($scope.medication_list[0] != "Other")
        $scope.medication_list.unshift("Other");
  }

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("medication", $scope.medication, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated Medication");
      $window.history.back();
    });
  }
})

.controller('SpinalCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;

  $scope.spinal = {
    "spinal_manual" : $scope.report.spinal_manual == 'true',
    "spinal_c_collar" : $scope.report.spinal_c_collar == 'true',
    "spinal_collar_size" : $scope.report.spinal_collar_size,
    "spinal_backboard" : $scope.report.spinal_backboard,
    "spinal_transferred_by" : $scope.report.spinal_transferred_by,
    "spinal_secured_with" : $scope.report.spinal_secured_with,
  };
  console.log($scope.spinal);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.spinal.spinal_assessed = true;
    $scope.db.update("report", $scope.spinal, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated Medication");
      $window.history.back();
    });
  }
})

.controller('InOutCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {
  $scope.procedureEntry = procedure;

  $scope.inOut = {
    "direction" : $scope.procedureEntry.direction,
    "volume" : $scope.procedureEntry.volume,
    "substance" : $scope.procedureEntry.substance,
    "other" : $scope.procedureEntry.other,
  };
  console.log($scope.inOut);

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("in_out", $scope.inOut, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated In/Out");
      $window.history.back();
    });
  }
})

.controller('EcgCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {
  $scope.procedureEntry = procedure;

  $scope.ecg = {
    "leads_nb" : $scope.procedureEntry.leads_nb,
    "rhythm" : $scope.procedureEntry.rhythm,
    "regular" : $scope.procedureEntry.regular == 'true',
    "bbb" : $scope.procedureEntry.bbb == 'true',
    "bbb_side" : $scope.procedureEntry.bbb_side,
    "st_changes" : $scope.procedureEntry.st_changes == 'true',
    "st_elevation_list" : $scope.procedureEntry.st_elevation_list ? JSON.parse($scope.procedureEntry.st_elevation_list) : [],
    "st_depression_list" : $scope.procedureEntry.st_depression_list ? JSON.parse($scope.procedureEntry.st_depression_list) : [],
    "pacs" : $scope.procedureEntry.pacs == 'true',
    "pvcs" : $scope.procedureEntry.pvcs == 'true',
  };
  console.log($scope.ecg);
  
  $scope.elevation = $scope.ecg.st_elevation_list;
  $scope.depression = $scope.ecg.st_depression_list;
  
  $scope.toggle = function(item){
    if (($scope.elevation.indexOf(item) == -1) && ($scope.depression.indexOf(item) == -1)){
      $scope.elevation.push(item);
    } else if ($scope.elevation.indexOf(item) != -1){
      $scope.elevation.splice($scope.elevation.indexOf(item), 1);
      $scope.depression.push(item);
    } else if ($scope.depression.indexOf(item) != -1){
      $scope.depression.splice($scope.elevation.indexOf(item), 1);
    }
    console.dir($scope.elevation);
    console.dir($scope.depression);
  };

  $scope.save = function(){
    $scope.ecg.st_elevation_list = JSON.stringify($scope.elevation);
    $scope.ecg.st_depression_list = JSON.stringify($scope.depression);
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("ecg", $scope.ecg, {
      'id': $stateParams.procedureId
    }).then(function(){
      console.log("Updated ECG");
      $window.history.back();
    });
  }
})

.controller('SignaturesCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;
  $scope.activeButton = 1;
  

  var signaturePads = [];
  var storedSignatures = [];
  
  function wireCanvas(){
    var tab = $scope.activeButton;
    switch (tab){
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
    
    signaturePad = signaturePads[tab] || new SignaturePad(canvas, {
      penColor: "rgb(66, 133, 244)",
    });
    signaturePads[tab] = signaturePad;
    signaturePad.fromDataURL(storedSignatures[tab] || "");

    clearButton.addEventListener("click", function (event) {
      signaturePad.clear();
    });

  }
  
   // Load Signatures
  storedSignatures[1] = $scope.report.signature_practitioner;
  storedSignatures[2] = $scope.report.signature_patient;
  storedSignatures[3] = $scope.report.signature_hospital;
  storedSignatures[4] = $scope.report.signature_witness;
  
  wireCanvas();
  
  function resizeCanvas() {
    var ratio =  window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  }

  window.onresize = resizeCanvas;
  resizeCanvas();

  $scope.signatures = {
    "signature_practitioner_name" : $scope.report.signature_practitioner_name,
    "signature_patient_name" : $scope.report.signature_patient_name,
    "signature_hospital_name" : $scope.report.signature_hospital_name,
    "signature_witness_name" : $scope.report.signature_witness_name,
    "no_signature" : $scope.report.no_signature == 'true',
    "no_signature_reason" : $scope.report.no_signature_reason
  };
  
  console.log($scope.signatures);
  
  $scope.switchTab = function(tab){
    $scope.activeButton = tab;
    wireCanvas();
  }

  $scope.save = function(){
    $scope.signatures.signature_practitioner = signaturePads[1] ? signaturePads[1].toDataURL() : "";
    $scope.signatures.signature_patient = signaturePads[2] ? signaturePads[2].toDataURL() : "";
    $scope.signatures.signature_hospital = signaturePads[3] ? signaturePads[3].toDataURL() : "";
    $scope.signatures.signature_witness = signaturePads[4] ? signaturePads[4].toDataURL() : "";
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.signatures.signature_assessed = true;
    $scope.db.update("report", $scope.signatures, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated Signatures");
      $window.history.back();
    });
  }
})

.controller('SettingsCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, settings) {
  $scope.settings = settings;

  $scope.form = {
    "first_name" : $scope.settings.first_name,
    "last_name" : $scope.settings.last_name,
    "identification" : $scope.settings.identification,
    "position" : $scope.settings.position,
    "work_place" : $scope.settings.work_place,
    "send_report_to" : $scope.settings.send_report_to,
    "photo" : "http://lorempixel.com/output/people-q-c-200-200-7.jpg"
  };

  $scope.save = function(){
    
    console.log($scope.form);
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("settings", $scope.form, {
      'id': 1
    }).then(function(){
      console.log("Updated Settings");
      $window.history.back();
    });
  }
})

.controller('CallInfoCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report, ppe) {
  $scope.report = report;
  $scope.ppeList = [];

  $scope.call = {
    "call_info_attendant1" : $scope.report.call_info_attendant1,
    "call_info_attendant1_other" : $scope.report.call_info_attendant1_other,
    "call_info_attendant2" : $scope.report.call_info_attendant2,
    "call_info_attendant2_other" : $scope.report.call_info_attendant2_other,
    "call_info_driver" : $scope.report.call_info_driver,
    "call_info_driver_other" : $scope.report.call_info_driver_other,
    "call_info_unit_nb" : $scope.report.call_info_unit_nb,
    "call_info_run_nb" : $scope.report.call_info_run_nb,
    "call_info_respond_to" : $scope.report.call_info_respond_to,
    "call_info_milage_start" : $scope.report.call_info_milage_start,
    "call_info_milage_end" : $scope.report.call_info_milage_end,
    "call_info_code_en_route" : $scope.report.call_info_code_en_route,
    "call_info_code_return" : $scope.report.call_info_code_return,
    "call_info_transported_to" : $scope.report.call_info_transported_to,
    "call_info_transported_position" : $scope.report.call_info_transported_position,
    "call_info_time" : $scope.report.call_info_time != '' ? JSON.parse($scope.report.call_info_time) : {},
    "call_info_ppe" : $scope.report.call_info_ppe != undefined ?JSON.parse($scope.report.call_info_ppe) : [],
    "call_info_determinant" : $scope.report.call_info_determinant != '' ?JSON.parse($scope.report.call_info_determinant) : {},
    "call_info_assistance" : $scope.report.call_info_assistance,
  };
  
  var existingPpe = $scope.call.call_info_ppe;

  ppe.list.forEach(function(equpiment){
    var checked = existingPpe != null ? existingPpe.indexOf(equpiment) != -1 : false;
    $scope.ppeList.push({"text": equpiment, "checked": checked})
  });
  
  $scope.noTransport = function(){
    $scope.save();
    $window.location = '#/tab/report/' + $stateParams.reportId + '/no-transport';
  }

  $scope.save = function(){

    // PPE
    var selected = [];
    $scope.ppeList.forEach(function(value, index){
      if (value.checked){
        selected.push(value.text);
      }
    });
    $scope.call.call_info_ppe = JSON.stringify(selected);
    
    // Determinant
    $scope.call.call_info_determinant = JSON.stringify($scope.call.call_info_determinant);
    
    // Time
    $scope.call.call_info_time = JSON.stringify($scope.call.call_info_time);
    
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.call.call_info_assessed = true;
    $scope.db.update("report", $scope.call, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated Call Info");
      $window.history.back();
    });
  }
})

.controller('NoTransportCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;

  $scope.noTransport = {
    "no_transport_mentally_capable" : $scope.report.no_transport_mentally_capable == 'true',
    "no_transport_should_transport" : $scope.report.no_transport_should_transport == 'true',
    "no_transport_risk_informed" : $scope.report.no_transport_risk_informed == 'true',
    "no_transport_reason" : $scope.report.no_transport_reason,
    "no_transport_reason_other" : $scope.report.no_transport_reason_other,
    "no_transport_left_with" : $scope.report.no_transport_left_with,
    "no_transport_left_with_other" : $scope.report.no_transport_left_with_other,
    "no_transport_consult_with" : $scope.report.no_transport_consult_with
  };

  $scope.save = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.noTransport.no_transport_assessed = true;
    $scope.db.update("report", $scope.noTransport, {
      'id': $stateParams.reportId
    }).then(function(){
      console.log("Updated No Transport");
      $window.history.back();
    });
  }
})

.controller('NarrativeCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, narrative) {
  $scope.narrativeEntry = narrative;

  $scope.narrativeEntry = {
    "narration" : $scope.narrativeEntry.narration
  };
  console.log($scope.narrativeEntry);

  $scope.save = function(){
    console.log($scope.narrativeEntry);
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.update("narrative", $scope.narrativeEntry, {
      'id': $stateParams.narrativeId
    }).then(function(){
      console.log("Updated Narrative");
      $window.history.back();
    });
  }
})

.controller('CodeListCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, codeList) {
  $scope.codeList = codeList;
  $scope.showDelete = false;
  
  $scope.toggleDelete = function(){
    $scope.showDelete = !$scope.showDelete;
  }
  
  $scope.deleteItem = function(itemId){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.del('code', {"id": itemId})
    .then(function(){
      delete $scope.codeList[itemId];
     });
  }
})

.controller('CodeCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, codeList, $window) {
  $scope.timer = 0;
  $scope.timerId = 0;
  
  $scope.start = function(){
    if ($scope.timer == 0){
      $scope.timer++
      $scope.timerId = setInterval(function(){
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
  
  $scope.stop = function(){
    $scope.timer = 0;
    clearInterval($scope.timerId);
    $scope.code = {
      "code": "Stop",
      "time": new Date()
    };
    $scope.add();
  }
  
  $scope.tap = function($event){
    $scope.code = {
      "code":$event.srcElement.innerText,
      "time": new Date()
    };
    $scope.add();
  }
  
  $scope.tapExit = function($event){
    $scope.code = {
      "code":$event.srcElement.innerText,
      "time": new Date()
    };
    $scope.add();
    $window.location = '#/tab/report/' + $stateParams.reportId + '/code-list';
  }

  $scope.add = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.code.report_id = $stateParams.reportId;
    $scope.db.insert("code", $scope.code)
    .then(function(){
      console.log("Updated Code");
    });
  }
})

.controller('ExportCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
  $scope.report = report;
  
  $scope.export = {
    "short_report": true, 
    "patient_info": true
  };
  console.log($scope.export);
  
  $scope.export = function(){
     var docDefinition = {
        content: [
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ '*', 'auto', 100, '*' ],

              body: [
                [ 'First', 'Second', 'Third', 'The last one' ],
                [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                [ { text: 'Bold value', bold: true }, 'Val 2', 'Val 3', 'Val 4' ]
              ]
            }
          }
        ]
      };
     // open the PDF in a new window
     pdfMake.createPdf(docDefinition).open();

     // print the PDF (temporarily Chrome-only)
//     pdfMake.createPdf(docDefinition).print();

     // download the PDF (temporarily Chrome-only)
//     pdfMake.createPdf(docDefinition).download('optionalName.pdf');
  }
})

.controller('ListCtrl', function($scope, $stateParams, $webSql, DB_CONFIG, list, tableName, redirection) {
  $scope.list = list;
  $scope.reportId = $stateParams.reportId;
  $scope.showDelete = false;
  
  $scope.toggleDelete = function(){
    $scope.showDelete = !$scope.showDelete;
  }
  
  $scope.deleteItem = function(itemId){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.del(tableName, {"id": itemId})
    .then(function(){
      delete $scope.list[itemId];
     });
  }
    
  $scope.addItem = function(){
    $scope.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
    $scope.db.insert(tableName, {"report_id": $stateParams.reportId}).then(function(results) {
        console.log(results.insertId);
        window.location = redirection + results.insertId;
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
      $scope.db.dropTable('trauma_fall');				
      $scope.db.dropTable('trauma_blunt');				
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

apgarSum = function(obj){
  var sum = 0;
  for (key in obj) {
    sum += parseInt(obj[key]);
  };
  return sum;
}
