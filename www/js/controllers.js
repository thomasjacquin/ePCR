function DashCtrl($scope, reports) {
  $scope.reportsNumber = Object.size(reports);
}

function ReportsCtrl($scope, $q, $webSql, DB_CONFIG, reports) {

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

function ReportDetailCtrl($scope, $stateParams, $webSql, DB_CONFIG, report, $window, Records) {

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

function PersonalInfoCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

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

function VitalsChartCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, vitals, exportTableDefinition) {

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

function VitalsCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, vitals) {
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

function ChiefComplaintCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report, chiefComplaint) {

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

function PatientHistoryCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

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
}

function AllergiesCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report, allergies) {

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
}

function HomeMedicationsCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report, homeMedications) {

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
}

function ConditionsCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report, medicalConditions) {

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
}

function ExamCtrl($scope, $stateParams, $webSql, DB_CONFIG, report, Records) {
  $scope.report = report;
  $scope.reportId = $stateParams.reportId;

  Records.all('neuro', $stateParams.reportId)
    .then(function (neuroRecords) {
      $scope.neuroNumber = Object.size(neuroRecords);
    })
}

function NeuroCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, neuro) {
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

function AbcCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, $state, report) {

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

function TraumaCtrl($scope, $stateParams, $webSql, DB_CONFIG, report) {
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

function TraumaAutoCtrl($scope, $stateParams, $window, $webSql, DB_CONFIG, report) {

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

function GiCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

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
}

function GuCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {


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

function GynCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, $state, report) {


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

function FieldDeliveryCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, $ionicModal, report) {

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

function MuscularCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report, bodyParts, muscularInjuries) {

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

function AirwayCtrl($scope, $stateParams, $webSql, DB_CONFIG, report, Records) {
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

function BasicAirwayCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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

function InvasiveAirwayCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {
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

function VentilatorCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {

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

function CpapBipapCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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

function SuctionCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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

function IvIoCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {

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

function SplintingCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {

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

function MedicationCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure, homeMedications) {

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

function SpinalCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

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

function InOutCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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

function EcgCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, procedure) {


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

function SignaturesCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {

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
      maxWidth: 1.5
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
}

function CallInfoCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, $state, report, ppe, settings) {

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

function NoTransportCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report) {


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

function NarrativeCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, narrative) {
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

function CodeListCtrl($scope, $stateParams, $webSql, DB_CONFIG, codeList) {
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

function CodeCtrl($scope, $stateParams, $webSql, DB_CONFIG, codeList, $window) {
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

function ExportCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, settings, $state, exportTableDefinition) {

  var defaults = {
    short_report: true,
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
      $state.go('tab.export-html', {
        "reportId": $stateParams.reportId
      });
    });
  }
}

function ExportHtmlCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, report, Records, exportTableDefinition) {

  var BINARY_ARR = null;
  var currentfileEntry = null;

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


  fillDocDefinition = function () {
    $scope.docDefinition = {
      content: [
        {
          columns: [
            {
              text: [
                {text: 'Patient Care Report\n', style: 'header'},
                {text: 'Report date: ' + moment().format('MMM D, YYYY'), style: 'medium_text'},
              ]
            },
            {
              text: [
                'By ' + $scope.settingsRecord.first_name + " " + $scope.settingsRecord.last_name + '\n',
                {
                  text: $scope.settingsRecord.position + ' in ' + $scope.settingsRecord.work_place + '\n' + 'ID: ' + $scope.settingsRecord.identification,
                  style: "medium_text"
                }
              ],
              alignment: 'right'
            }
          ]
        },
        {text: 'Patient Info', style: 'section_heading'},
        {
          columns: [
            {
              text: [
                {text: 'Name: ', style: 'label'},
                report.first_name + ' ' + report.last_name + '\n',
                {text: 'Gender: ', style: 'label'},
                report.gender + "\n",
                {text: 'Weight: ', style: 'label'},
                report.weight + report.weight_unit + '\n',
                {text: 'D.o.B: ', style: 'label'},
                moment(report.date_of_birth).format('MMM D, YYYY') + " (" + (moment().year() - moment(report.date_of_birth).year()) + " y. old)\n",
                {text: 'Next of Kin: ', style: 'label'},
                report.next_of_kin + '\n',
              ],
              style: "defaultStyle"
            },
            {
              text: [
                {text: 'SIN: ', style: 'label'},
                report.insurance + '\n',
                {text: 'MRN: ', style: 'label'},
                report.mrn + '\n',
                {text: 'Address: ', style: 'label'},
                report.address_street + '\n' + report.address_city + ' ' + report.address_province + '\n',
              ],
              style: "defaultStyle"
            },
            {
              text: [
                {text: 'Home Phone #: ', style: 'label'},
                report.phone_home + '\n',
                {text: 'Cell Phone #: ', style: 'label'},
                report.phone_cell + '\n',
                {text: 'Work Phone #: ', style: 'label'},
                report.phone_work + '\n',
                {text: 'Next of Kin Phone #: ', style: 'label'},
                report.next_of_kin_phone + '\n',
              ],
              style: "defaultStyle"
            }
          ],
          // optional space between columns
          columnGap: 10
        },
        {
          columns: [
            {
              text: [
                {text: 'Patient History\n', style: 'section_heading'},
                {text: 'Allergies: ', style: 'label'},
                {text: safe(report.patient_hx) + '\n', style: "defaultStyle"},
                {text: 'Conditions: ', style: 'label'},
                {text: safe(report.patient_hx) + '\n', style: "defaultStyle"},
                {text: 'Medications: ', style: 'label'},
                {text: safe(report.patient_hx) + '\n', style: "defaultStyle"}
              ],
              style: 'margin'
            },
            {
              text: [
                {text: 'Chief Complaint\n', style: 'section_heading'},
                {text: 'Primary: ', style: 'label'},
                {text: safe(report.primary_complaint) + '\n', style: "defaultStyle"},
                {text: 'Secondary: ', style: 'label'},
                {text: safe(report.secondary_complaint) + '\n', style: "defaultStyle"},
                {text: 'Symptoms: ', style: 'label'},
                {text: safe(report.pertinent) + '\n', style: "defaultStyle"}
              ],
              style: 'margin'
            }
          ],
          style: 'margin'
        },
        {text: 'Vitals', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.vitalsRecords, 'vitals')
          }
        },
        {text: 'Neuro', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.neuroRecords, 'neuro')
          }
        },
        {text: 'ABC', style: 'section_heading'},
        {
          columns: [
            {
              text: [
                {text: 'Open & Patent: ', style: 'label'},
                safe(report.open_patent) + '\n',
                {text: 'Tracheal Dev.: ', style: 'label'},
                safe(report.tracheal_deviation) + ' ' + safe(report.tracheal_deviation_side)+ "\n",
                {text: 'Interventions: ', style: 'label'},
                safe(report.interventions) + "\n",
                {text: 'Breathing Type: ', style: 'label'},
                safe(report.breathing_type) + "\n",
                {text: 'Laboured: ', style: 'label'},
                safe(report.breathing_laboured) + "\n",
                {text: 'Effective: ', style: 'label'},
                safe(report.breathing_effective) + "\n",
                {text: 'Accessory Muscle: ', style: 'label'},
                safe(report.accessory_muscle) + "\n",
                {text: 'Nasal Flare: ', style: 'label'},
                safe(report.nasal_flare) + "\n",
                {text: 'Cough: ', style: 'label'},
                safe(report.cough) + "\n",
                {text: 'Cough Productive: ', style: 'label'},
                safe(report.cough_productive) + "\n",
                {text: 'Subcut.Emphysema: ', style: 'label'},
                safe(report.subcutaneous_emphysema) + "\n",
                {text: 'Flailed Chest: ', style: 'label'},
                safe(report.flailed_chest) + ' ' + safe(report.flailed_chest_side) + "\n",
                {text: 'Suspect Pneumothorax: ', style: 'label'},
                safe(report.suspect_pneumothorax) + "\n",
                {text: 'Suspect Hemothorax: ', style: 'label'},
                safe(report.suspect_hemothorax) + "\n",
                {text: 'CTAx4: ', style: 'label'},
                safe(report.suspect_hemothorax) + "\n",
              ],
              style: "defaultStyle"
            },
            {
              text: [
                {text: 'Upper Left Sound: ', style: 'label'},
                safe(report.lung_ul_sound) + "\n",
                {text: 'Upper Right Sound: ', style: 'label'},
                safe(report.lung_ur_sound) + "\n",
                {text: 'Lower Left Sound: ', style: 'label'},
                safe(report.lung_ll_sound) + "\n",
                {text: 'Lower Right Sound: ', style: 'label'},
                safe(report.lung_lr_sound) + "\n",
                {text: 'Pulse Location: ', style: 'label'},
                safe(report.pulse_location) + '\n',
                {text: 'Pulse Quality: ', style: 'label'},
                safe(report.pulse_quality) + "\n",
                {text: 'Pulse is Regular: ', style: 'label'},
                safe(report.pulse_regular) + "\n",
                {text: 'JVD: ', style: 'label'},
                safe(report.jvd) + "\n",
                {text: 'Capillary Refill: ', style: 'label'},
                safe(report.cap_refill) + "\n",
                {text: 'Skin Color: ', style: 'label'},
                safe(report.skin_color) + "\n",
                {text: 'Skin Temperature: ', style: 'label'},
                safe(report.skin_temperature) + "\n",
                {text: 'Skin Condition: ', style: 'label'},
                safe(report.skin_condition) + "\n",
                {text: 'Heart Tones: ', style: 'label'},
                safe(report.heart_tones) + "\n",
                {text: 'Heart Tones Quality: ', style: 'label'},
                safe(report.heart_tones_quality) + "\n",
                {text: 'Peripheral Edema: ', style: 'label'},
                safe(report.peripheral_edema)  + ' ' + safe(report.peripheral_edema_location) + ' ' + safe(report.peripheral_edema_severity) + "\n",
              ],
              style: "defaultStyle"
            }
          ]
        },
        {text: 'Trauma Auto', style: 'section_heading'},
        {
          columns: [
            {
              text: [
                {text: 'Vehicle: ', style: 'label'},
                safe(report.trauma_auto_vehicle) + '\n',
                {text: 'Seat: ', style: 'label'},
                safe(report.trauma_auto_seat) + "\n",
                {text: 'Airbag Deployed: ', style: 'label'},
                safe(report.trauma_auto_airbag) + "\n",
                {text: 'Safety Belt: ', style: 'label'},
                safe(report.trauma_auto_seatbelt) + "\n",
                {text: 'Helmet: ', style: 'label'},
                safe(report.trauma_auto_helmet) + "\n",
              ],
              style: "defaultStyle"
            },{
              text: [
              {
                text: 'Leathers: ', style: 'label'},
                safe(report.trauma_auto_leathers) + "\n",
                {text: 'Nb of Occupants: ', style: 'label'},
                safe(report.trauma_auto_nb_occupants) + "\n",
                {text: 'Speed: ', style: 'label'},
                safe(report.trauma_auto_vehicle_speed) + ' ' + safe(report.trauma_auto_speed_unit) + "\n",
                {text: 'Pt removed by: ', style: 'label'},
                safe(report.trauma_auto_removed_by) + "\n",
                {text: 'Details given by: ', style: 'label'},
                safe(report.trauma_auto_details_per) + "\n",
              ],
              style: "defaultStyle"
            }
          ]
        },
        {text: 'Trauma Penetrating', style: 'section_heading'},
        {
          text: [
              {text: 'Assault: ', style: 'label'},
              safe(report.trauma_penetrating_assault) + '\n',
              {text: 'Mechanism of Injury: ', style: 'label'},
              safe(report.trauma_penetrating_moi) + "\n",
              {text: 'Velocity: ', style: 'label'},
              safe(report.trauma_penetrating_velocity) + "\n",
              {text: 'Bleeding: ', style: 'label'},
              safe(report.trauma_penetrating_bleeding) + ' ' + safe(report.trauma_penetrating_controlled) + "\n",
              {text: 'Systems Involved: ', style: 'label'},
              safe(report.trauma_penetrating_body_parts) + "\n",
            ],
            style: "defaultStyle"
        },
        {text: 'Trauma Blunt', style: 'section_heading'},
        {
          text: [
              {text: 'Assault: ', style: 'label'},
              safe(report.trauma_blunt_assault) + '\n',
              {text: 'Mechanism of Injury: ', style: 'label'},
              safe(report.trauma_blunt_moi) + "\n",
              {text: 'Bleeding: ', style: 'label'},
              safe(report.trauma_blunt_bleeding) + ' ' + safe(report.trauma_blunt_controlled) + "\n",
              {text: 'Systems Involved: ', style: 'label'},
              safe(report.trauma_blunt_body_parts) + "\n",
            ],
          style: "defaultStyle"
        },
        {text: 'Trauma Fall', style: 'section_heading'},
        {
          text: [
              {text: 'Assault: ', style: 'label'},
              safe(report.trauma_fall_assault) + '\n',
              {text: 'Distance: ', style: 'label'},
              safe(report.trauma_fall_distance) + ' ' +  safe(report.trauma_fall_distance_unit) + "\n",
              {text: 'Surface: ', style: 'label'},
              safe(report.trauma_fall_surface) + '\n',
              {text: 'Loss of Consciousness: ', style: 'label'},
              safe(report.trauma_fall_loss_of_c) + ' ' + safe(report.trauma_fall_loss_of_c_time) + 'min\n',
              {text: 'Bleeding: ', style: 'label'},
              safe(report.trauma_fall_bleeding) + ' ' + safe(report.trauma_fall_controlled) + "\n",
              {text: 'Systems Involved: ', style: 'label'},
              safe(report.trauma_fall_body_parts) + "\n",
            ],
          style: "defaultStyle"
        },
        {text: 'Trauma Burn', style: 'section_heading'},
        {
          text: [
              {text: 'Method: ', style: 'label'},
              safe(report.trauma_burn_method) + '\n',
              {text: 'Body Type: ', style: 'label'},
              safe(report.trauma_burn_body_type) + '\n',
              {text: 'Total Surface Burn: ', style: 'label'},
              safe(report.trauma_burn_total_surface) + '%\n',
              {text: 'Details: ', style: 'label'},
              safe(report.trauma_burn_body_parts) + '\n',
            ],
          style: "defaultStyle"
        },
        {text: 'Gastrointestinal', style: 'section_heading'},
        {
          text: [
              {text: 'Abdomen is soft: ', style: 'label'},
              safe(report.gi_soft) + '\n',
              {text: 'Abdomen is flat: ', style: 'label'},
              safe(report.gi_flat) + '\n',
              {text: 'Abdomen non distended: ', style: 'label'},
              safe(report.gi_non_distended) + '\n',
              {text: 'Abdomen non tender: ', style: 'label'},
              safe(report.gi_non_tender) + '\n',
              {text: 'Rebound: ', style: 'label'},
              safe(report.gi_rebound) + '\n',
              {text: 'Location of pain: ', style: 'label'},
              safe(report.gi_pain_location) + '\n',
              {text: 'Last BM: ', style: 'label'},
              safe(report.gi_last_bm) + '\n',
              {text: 'Last OI: ', style: 'label'},
              safe(report.gi_loi) + '\n',
            ],
          style: "defaultStyle"
        },
        {text: 'Genitourinary', style: 'section_heading'},
        {
          text: [
              {text: 'Pain: ', style: 'label'},
              safe(report.gu_pain) + '\n',
              {text: 'Frequency: ', style: 'label'},
              safe(report.gu_frequency) + '\n',
              {text: 'Hematuria: ', style: 'label'},
              safe(report.gu_hematuria) + '\n',
              {text: 'Incontinence: ', style: 'label'},
              safe(report.gu_incontinence) + '\n',
              {text: 'Bladder Distention: ', style: 'label'},
              safe(report.gu_bladder_distention) + '\n',
              {text: 'Urinary Urgency: ', style: 'label'},
              safe(report.gu_urinary_urgency) + '\n',
              {text: 'Last Void: ', style: 'label'},
              safe(report.gu_last_void) + '\n'
            ],
          style: "defaultStyle"
        },
        {text: 'Obstetric/Gynecology', style: 'section_heading'},
        {
          columns: [
            {
              text: [
                {text: 'Gravid: ', style: 'label'},
                safe(report.gyn_gravid) + '\n',
                {text: 'Term: ', style: 'label'},
                safe(report.gyn_term) + '\n',
                {text: 'Para: ', style: 'label'},
                safe(report.gyn_para) + '\n',
                {text: 'Abortia: ', style: 'label'},
                safe(report.gyn_abortia) + '\n',
                {text: 'Live: ', style: 'label'},
                safe(report.gyn_live) + '\n',
                {text: 'Last Menstruation: ', style: 'label'},
                safe(report.gyn_last_menstruation) + '\n',
                {text: 'Vaginal Discharge: ', style: 'label'},
                safe(report.gyn_discharge) + ' ' + safe(report.gyn_substance) + '\n',
                {text: 'Pregnant: ', style: 'label'},
                safe(report.gyn_pregnant) + '\n',
                {text: 'EDC: ', style: 'label'},
                safe(report.gyn_pregnant) + '\n',
                {text: 'Gestation is known: ', style: 'label'},
                safe(report.gyn_gestation_known) + ' ' + safe(report.gyn_gest_weeks) + 'weeks\n',
              ]
            },
            {
              text: [
                {text: 'Membranes Intact: ', style: 'label'},
                safe(report.gyn_membrane_intact) + ' ' + safe(report.gyn_fluid) + '\n',
                {text: 'Babies expected: ', style: 'label'},
                safe(report.gyn_expected_babies) + '\n',
                {text: 'Fetal Movement: ', style: 'label'},
                safe(report.gyn_fetal_mvmt) + '\n',
                {text: 'Last Movement: ', style: 'label'},
                safe(report.gyn_last_mvmt) + '\n',
                {text: 'Movements per hour: ', style: 'label'},
                safe(report.gyn_mvmt_per_hr) + '\n',
                {text: 'Contractions: ', style: 'label'},
                safe(report.gyn_contraction_duration) + '\n',
                {text: 'Contraction Duration: ', style: 'label'},
                safe(report.gyn_contraction_duration) + ' seconds\n',
                {text: 'Contraction Separation: ', style: 'label'},
                safe(report.gyn_contraction_separation) + ' seconds\n',
                {text: 'Peripheral Edema: ', style: 'label'},
                safe(report.peripheral_edema)  + ' ' + safe(report.peripheral_edema_location) + ' ' + safe(report.peripheral_edema_severity) + "\n",
              ],
            }
          ],
          style: "defaultStyle"
        },
        {text: 'Field Delivery', style: 'section_heading'},
        {
          text: [
              {text: 'Presentation: ', style: 'label'},
              safe(report.field_delivery_presentation) + '\n',
              {text: 'Delivery Time: ', style: 'label'},
              safe(report.field_delivery_time) + '\n',
              {text: 'Meconium: ', style: 'label'},
              safe(report.field_delivery_meconium) + '\n',
              {text: 'Cord cut at: ', style: 'label'},
              safe(report.field_delivery_cord_cut_length) + '\n',
              {text: 'APGAR 1 min: ', style: 'label'},
              safe(report.field_delivery_apgar1) + '\n',
              {text: 'APGAR 5 min: ', style: 'label'},
              safe(report.field_delivery_apgar5) + '\n',
              {text: 'Stimulation Required: ', style: 'label'},
              safe(report.field_delivery_stimulation) + ' ' + safe(report.field_delivery_stimulation_type) + '\n',
              {text: 'Placenta Delivery: ', style: 'label'},
              safe(report.field_delivery_placenta) + safe(report.field_delivery_placenta_time) + '\n',
              {text: 'Placenta Intact: ', style: 'label'},
              safe(report.field_delivery_placenta_intact) + '\n',
            ],
          style: "defaultStyle"
        },
        {text: 'Muscular/Skeletal', style: 'section_heading'},
        {
          text: [
              {text: 'Symptoms: ', style: 'label'},
              safe(report.muscular_complaint) + '\n',
            ],
          style: "defaultStyle"
        },
        {text: 'Basic Airway', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.basicAirwayRecords, 'airway_basic')
          }
        },
        {text: 'Invasive Airway', style: 'section_heading'},
        {
          text: [
              {text: 'Airway Secured: ', style: 'label'},
              safe(report.invasive_airway_secured) + '\n',
              {text: 'Device: ', style: 'label'},
              safe(report.invasive_airway_device) + '\n',
              {text: 'Size: ', style: 'label'},
              safe(report.invasive_airway_size) + '\n',
              {text: 'Cuffed: ', style: 'label'},
              safe(report.invasive_airway_cuffed) + '\n',
              {text: 'Technique: ', style: 'label'},
              safe(report.invasive_airway_technique) + '\n',
              {text: 'Distance: ', style: 'label'},
              safe(report.invasive_airway_distance) + '\n',
              {text: 'Attempts: ', style: 'label'},
              safe(report.invasive_airway_attempts) + '\n',
            ],
          style: "defaultStyle"
        },
        {text: 'Ventilator', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.ventilatorRecords, 'airway_ventilator')
          }
        },
        {text: 'CPAP/BiPAP', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.cpapRecords, 'airway_cpap_bipap')
          }
        },
        {text: 'Suction', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.suctionRecords, 'airway_suction')
          }
        },
        {text: 'IV/IO', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.ivIoRecords, 'iv_io')
          }
        },
        {text: 'Splinting/Dressing', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.splintingRecords, 'splinting')
          }
        },
        {text: 'Medication', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.medicationRecords, 'medication')
          }
        },
        {text: 'Spinal Motion Restriction', style: 'section_heading'},
        {
          text: [
              {text: 'Manual C-Spine: ', style: 'label'},
              safe(report.spinal_manual) + '\n',
              {text: 'C-Collar: ', style: 'label'},
              safe(report.spinal_c_collar) + '\n',
              {text: 'Size: ', style: 'label'},
              safe(report.spinal_collar_size) + '\n',
              {text: 'Back board: ', style: 'label'},
              safe(report.spinal_backboard) + '\n',
              {text: 'Transferred by: ', style: 'label'},
              safe(report.spinal_transferred_by) + '\n',
              {text: 'Secured with: ', style: 'label'},
              safe(report.spinal_secured_with) + '\n',
            ],
          style: "defaultStyle"
        },
        {text: 'In/Out', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.inOutRecords, 'in_out')
          }
        },
        {text: 'ECG', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.ecgRecords, 'ecg')
          }
        },
        {text: 'Signatures', style: 'section_heading'},
        {
          text: [
              {text: 'Practitioner: ', style: 'label'},
              safe(report.signature_practitioner_name) + '\n',
              {text: 'Patient: ', style: 'label'},
              safe(report.signature_patient_name) + '\n',
              {text: 'Patient no signature reason: ', style: 'label'},
              safe(report.no_signature_reason) + '\n',
              {text: 'Hosital Representative: ', style: 'label'},
              safe(report.signature_hospital_name) + '\n',
              {text: 'Witness: ', style: 'label'},
              safe(report.signature_witness_name) + '\n',
            ],
          style: "defaultStyle"
        },
        {text: 'Call Info', style: 'section_heading'},
        {
          columns: [
            {
              text: [
                {text: 'Attendant 1: ', style: 'label'},
                safe(report.call_info_attendant1) + '\n',
                {text: 'Attendant 2: ', style: 'label'},
                safe(report.call_info_attendant2) + '\n',
                {text: 'Driver: ', style: 'label'},
                safe(report.call_info_driver) + '\n',
                {text: 'Unit #: ', style: 'label'},
                safe(report.call_info_unit_nb) + '\n',
                {text: 'Run #: ', style: 'label'},
                safe(report.call_info_run_nb) + '\n',
                {text: 'Respond to: ', style: 'label'},
                safe(report.call_info_respond_to) + '\n',
                {text: 'Milage Start: ', style: 'label'},
                safe(report.call_info_milage_start) + '\n',
                {text: 'Milage End: ', style: 'label'},
                safe(report.call_info_milage_end) + '\n',
                {text: 'Code en route: ', style: 'label'},
                safe(report.call_info_code_en_route) + '\n',
                {text: 'Code return: ', style: 'label'},
                safe(report.call_info_code_return) + '\n',
                {text: 'Transported to: ', style: 'label'},
                safe(report.call_info_transported_to) + '\n',
                {text: 'Transport position: ', style: 'label'},
                safe(report.call_info_transported_position) + '\n',
              ],
              style: "defaultStyle"
            },
            {
              text: [
                {text: 'Time Notified: ', style: 'label'},
                safe(report.call_info_time) + '\n',
                {text: 'PPE: ', style: 'label'},
                safe(report.call_info_ppe) + '\n',
                {text: 'Determinant: ', style: 'label'},
                safe(report.call_info_determinant) + '\n',
                {text: 'Assistance given by: ', style: 'label'},
                safe(report.call_info_assistance) + '\n',
              ],
              style: "defaultStyle"
            },
            {
              text: [
                {text: 'Patient Mentally Capable: ', style: 'label'},
                safe(report.no_transport_mentally_capable) + '\n',
                {text: 'Patient Should be Transported: ', style: 'label'},
                safe(report.no_transport_should_transport) + '\n',
                {text: 'Patient was informed of risks of no transport: ', style: 'label'},
                safe(report.no_transport_risk_informed) + '\n',
                {text: 'Reason for refusal: ', style: 'label'},
                safe(report.no_transport_reason) + '\n',
                {text: 'Patient left with: ', style: 'label'},
                safe(report.no_transport_left_with) + '\n',
                {text: 'Consult with: ', style: 'label'},
                safe(report.no_transport_consult_with) + '\n',
              ],
              style: "defaultStyle"
            }
          ]
        },
        {text: 'Narrative', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.narrativeRecords, 'narrative')
          }
        },
        {text: 'CPR', style: 'section_heading'},
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.cprRecords, 'code')
          }
        }
      ],

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
    console.log($scope.docDefinition);
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
      alert("The report was saved on your device");
      alert(JSON.parse(currentfileEntry));
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
    //  
  }
}

function ListCtrl($scope, $stateParams, $webSql, DB_CONFIG, list, urlData, $state) {
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

function SettingsCtrl($scope, $stateParams, $webSql, DB_CONFIG, $window, settings, CameraFactory, $ionicModal) {
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
}

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

function safe(field, alternativeField) {
  if (field == 'Other') {
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
  .controller('ExportHtmlCtrl', ExportHtmlCtrl)
  .controller('ListCtrl', ListCtrl)
  .controller('SettingsCtrl', SettingsCtrl);