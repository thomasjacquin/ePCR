angular.module('ePCR.controllers', [])

.controller('DashCtrl', function ($scope, reports) {
  $scope.reportsNumber = Object.size(reports);
})

.controller('ReportsCtrl', function ($scope, $q, $webSql, DB_CONFIG, reports) {

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
})

.controller('ReportDetailCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, report, $window, Records) {

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
})

.controller('PersonalInfoCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

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
})

.controller('VitalsChartCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, vitals) {

  var xAxis = [],
    data = {};

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
    xAxis.push(vitals[index].created);
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

  $scope.changeVital = function () {
    $scope.chart.datasets[0].data = data[$scope.vitalSelected.serie];
  }

})

.controller('VitalsCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, vitals) {
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
})

.controller('ChiefComplaintCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report, chiefComplaint) {

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
})

.controller('PatientHistoryCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

  $scope.showDelete = false;

  $scope.patientHistory = {
    "hx_allergies": report.hx_allergies ? report.hx_allergies.split(',') : [],
    "hx_conditions": report.hx_conditions ? report.hx_conditions.split(',') : [],
    "hx_medications": report.hx_medications ? report.hx_medications.split(',') : [],
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

    db.update("report", $scope.patientHistory, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Patient History");
    });
  }
})

.controller('AllergiesCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report, allergies) {

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
      "hx_allergies": selected,
      "patient_hx_assessed": true
    }, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Patient Allergies");
      $window.history.back();
    });
  }
})

.controller('HomeMedicationsCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report, homeMedications) {

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
      "hx_medications": selected,
      "patient_hx_assessed": true
    }, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Patient Home Medications");
      $window.history.back();
    });
  }
})

.controller('ConditionsCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report, medicalConditions) {

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
      "hx_conditions": selected,
      "patient_hx_assessed": true
    }, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated report: Patient Home Conditions");
      $window.history.back();
    });
  }
})

.controller('ExamCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, report, Records) {
  $scope.report = report;
  $scope.reportId = $stateParams.reportId;

  Records.all('neuro', $stateParams.reportId)
    .then(function (neuroRecords) {
      $scope.neuroNumber = Object.size(neuroRecords);
    })
})

.controller('NeuroCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, neuro) {
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
})

.controller('AbcCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, $state, report) {

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
})

.controller('TraumaCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, report) {
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
})

.controller('TraumaAutoCtrl', function ($scope, $stateParams, $window, $webSql, DB_CONFIG, report) {

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

  $scope.toggleSeat = function (seat) {
    $scope.auto.trauma_auto_seat = seat;
    console.log(seat);
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
})

.controller('TraumaPenetratingCtrl', function ($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {

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
})

.controller('TraumaBluntCtrl', function ($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {

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
})

.controller('TraumaFallCtrl', function ($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts) {

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
})

.controller('TraumaBurnCtrl', function ($scope, $stateParams, $webSql, $window, DB_CONFIG, report, bodyParts, body_parts_area, $timeout) {

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

    $scope.burn.trauma_burn_assessed = true;
    db.update("report", $scope.burn, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated trauma fall");
      $window.history.back();
    });
  }
})

.controller('GiCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

  $scope.gi = {
    "gi_soft": report.gi_soft == 'true',
    "gi_flat": report.gi_flat == 'true',
    "gi_non_distended": report.gi_non_distended == 'true',
    "gi_non_tender": report.gi_non_tender == 'true',
    "gi_rebound": report.gi_rebound == 'true',
    "gi_pain_location": JSON.parse(report.gi_pain_location) || [],
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
})

.controller('GuCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {


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
})

.controller('GynCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, $state, report) {


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
})

.controller('FieldDeliveryCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, $ionicModal, report) {

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
})

.controller('MuscularCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report, bodyParts, muscularInjuries) {

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
})

.controller('ProceduresCtrl', function ($scope, $webSql, $stateParams, DB_CONFIG, report, Records) {
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
})

.controller('AirwayCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, report, Records) {
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
})

.controller('BasicAirwayCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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
})

.controller('InvasiveAirwayCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
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
})

.controller('VentilatorCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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
})

.controller('CpapBipapCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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
})

.controller('SuctionCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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
})

.controller('IvIoCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {

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
})

.controller('SplintingCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {

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
})

.controller('MedicationCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure, homeMedications) {

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
})

.controller('SpinalCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

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
})

.controller('InOutCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


  $scope.inOut = {
    "direction": procedure.direction,
    "volume": procedure.volume,
    "substance": procedure.substance,
    "other": procedure.other,
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
})

.controller('EcgCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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
})

.controller('SignaturesCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

  $scope.activeButton = 1;
  $scope.canvasWidth = window.innerWidth - 80;
  $scope.canvasHeight = ($scope.canvasWidth / 3) < 200 ? ($scope.canvasWidth / 3) : 250;

  var signaturePads = [];
  var storedSignatures = [];

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
  storedSignatures[1] = report.signature_practitioner;
  storedSignatures[2] = report.signature_patient;
  storedSignatures[3] = report.signature_hospital;
  storedSignatures[4] = report.signature_witness;

  wireCanvas();

  function resizeCanvas() {
    $scope.canvasWidth = window.innerWidth - 80;
    $scope.canvasHeight = ($scope.canvasWidth / 3) < 200 ? ($scope.canvasWidth / 3) : 250;
    var ratio = window.devicePixelRatio || 1;
    canvas.width = $scope.canvasWidth * ratio;
    canvas.height = $scope.canvasHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
    setTimeout(wireCanvas(), 100);
  }

  window.onresize = resizeCanvas;
  resizeCanvas();

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
    $scope.activeButton = tab;
    wireCanvas();
  }

  $scope.save = function () {
    $scope.signatures.signature_practitioner = signaturePads[1] ? signaturePads[1].toDataURL() : "";
    $scope.signatures.signature_patient = signaturePads[2] ? signaturePads[2].toDataURL() : "";
    $scope.signatures.signature_hospital = signaturePads[3] ? signaturePads[3].toDataURL() : "";
    $scope.signatures.signature_witness = signaturePads[4] ? signaturePads[4].toDataURL() : "";


    $scope.signatures.signature_assessed = true;
    db.update("report", $scope.signatures, {
      'id': $stateParams.reportId
    }).then(function () {
      console.log("Updated Signatures");
      $window.history.back();
    });
  }
})

.controller('CallInfoCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, $state, report, ppe, settings) {

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
})

.controller('NoTransportCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {


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
})

.controller('NarrativeCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, narrative) {
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
})

.controller('CodeListCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, codeList) {
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
})

.controller('CodeCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, codeList, $window) {
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
})

.controller('ExportCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, report, Records, exportTableDefinition) {

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
        row.push(String(value));
      });
      tableRecords.push(row);
    }

    return tableRecords;
  };

  $scope.short_report = true;
  $scope.patient_info = true;
  $scope.vitals = true;
  $scope.vitals_charts = true;
  $scope.chief_complaint = true;
  $scope.patient_hx = true;
  $scope.exam = true;
  $scope.procedures = true;
  $scope.signatures = true;
  $scope.call_info = true;
  $scope.narrative = true;
  $scope.code = true;

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
              Records.get('settings', 1)
                .then(function (record) {
                  console.log(record)
                  $scope.settingsRecord = record;
                })
            })
        })
    });

  $scope.export = function () {

    var docDefinition = {
      content: [
        {
          text: 'Patient Care Report',
          style: 'header'
        },
           'By Thomas Jacquin',
//        {
//			image: $scope.settingsRecord.photo,
//		},
        {
          text: 'Patient Info',
          style: 'section_heading'
        },
        {
          text: 'Patient Name: ' + report.first_name + ' ' + report.last_name,
          style: "defaultStyle"
        },
        {
          text: 'Patient History',
          style: 'section_heading'
        },
        {
          text: 'Vitals',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.vitalsRecords, 'vitals')
          }
        },
        {
          text: 'Chief Complaint',
          style: 'section_heading'
        },
        {
          text: 'Exam',
          style: 'section_heading'
        },
        {
          text: 'Neuro',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.neuroRecords, 'neuro')
          }
        },
        {
          text: 'Procedures',
          style: 'section_heading'
        },
        {
          text: 'Basic Airway',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.basicAirwayRecords, 'airway_basic')
          }
        },
        {
          text: 'Signatures',
          style: 'section_heading'
        },
        {
          text: 'Call Info',
          style: 'section_heading'
        },
        {
          text: 'Narrative',
          style: 'section_heading'
        },
        {
          text: 'CPR',
          style: 'section_heading'
        },
         ],

      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        section_heading: {
          margin: [0, 20, 0, 0],
          fontSize: 12,
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
        defaultStyle: {
          fontSize: 10
        }
      }
    };
    // open the PDF in a new window
    pdfMake.createPdf(docDefinition).open();

    // print the PDF (temporarily Chrome-only)
    //         pdfMake.createPdf(docDefinition).print();

    // download the PDF (temporarily Chrome-only)
    //         pdfMake.createPdf(docDefinition).download('optionalName.pdf');
  }
})

.controller('ListCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, list, urlData, $state) {
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
})

.controller('SettingsCtrl', function ($scope, $stateParams, $webSql, DB_CONFIG, $window, settings, CameraFactory, $ionicModal) {
  $scope.settings = settings;
  $scope.activeButton = 1;
  $scope.addPartner = {
    name: ""
  };

  $scope.form = {
    "first_name": $scope.settings.first_name,
    "last_name": $scope.settings.last_name,
    "identification": $scope.settings.identification,
    "position": $scope.settings.position,
    "work_place": $scope.settings.work_place,
    "send_report_to": $scope.settings.send_report_to,
    "photo": $scope.settings.photo
  };

  $scope.partners = $scope.settings.partners ? JSON.parse($scope.settings.partners) : [],

    $scope.getPhoto = function (fromCamera) {
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: fromCamera ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 600,
        targetHeight: 600,
        correctOrientation: true,
        cameraDirection: Camera.Direction.FRONT
      };
      CameraFactory.getPicture(options).then(function (imageURI) {
        console.log(imageURI);
        $scope.form.photo = imageURI;
      }, function (err) {
        console.err(err);
      });
    };

  $scope.removePhoto = function () {
    $scope.form.photo = '';
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
})


function deleteDatebase($webSql, DB_CONFIG) {

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