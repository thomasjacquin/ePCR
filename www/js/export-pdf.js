function ExportPdfCtrl($scope, $stateParams, $window, report, Records, settings, seatsMap, body_parts_names, burnDegrees, exportTableDefinition) {

  var BINARY_ARR = null;
  var currentfileEntry = null;

  $scope.mySettings = {
    "export": settings.export ? JSON.parse(settings.export) : defaults
  }
  console.log($scope.mySettings.export);

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

  function heading(title) {
    return {
      text: title,
      style: 'section_heading'
    }
  }

  function table(rec, tableName) {
    return Object.size(rec) != 0 ? {
      style: 'tableExample',
      table: {
        headerRows: 1,
        body: getTableArray(rec, tableName)
      }
    } : {
      text: 'No Records',
      style: 'defaultStyle'
    }
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
      }
    ]
    }
  }

  function patientInfo() {
    return {
      columns: [
        {
          text: [
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
              text: 'SIN: ',
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
              text: 'Home Phone #: ',
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
    };
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
    if ($scope.mySettings.export.patient_hx)
      array.push(include('patient_hx', patientHistory()));
    if ($scope.mySettings.export.chief_complaint)
      array.push(include('chief_complaint', chiefComplaint()));

    array = array.length == 0 ? [""] : array;
    return {
      columns: array,
      style: 'margin'
    }
  }

  function abc() {
    return {
      columns: [
        {
          text: [
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
    return {
      columns: [
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
  }

  function traumaPenetrating() {
    return {
      text: [
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

  function gastrointestinal() {
    return {
      text: [
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
              safe(report.gi_pain_location) + '\n',
        {
          text: 'Last BM: ',
          style: 'label'
            },
              safe(report.gi_last_bm) + '\n',
        {
          text: 'Last OI: ',
          style: 'label'
            },
              safe(report.gi_loi) + '\n',
            ],
      style: "defaultStyle"
    }
  }

  function genitourinary() {
    return {
      text: [
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
              safe(report.gu_last_void) + '\n'
            ],
      style: "defaultStyle"
    }
  }

  function gyn() {
    return {
      columns: [
        {
          text: [
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

  function fieldDelivery() {
    return {
      text: [
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
  }

  function muscular() {
    return {
      text: [
        {
          text: 'Symptoms: ',
          style: 'label'
            },
              muscularToString(safe(report.muscular_complaint)) + '\n',
            ],
      style: "defaultStyle"
    }
  }

  function invasiveAirway() {
    return {
      text: [
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
  }

  function spinal() {
    return {
      text: [
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
  }

  function signatures1() {
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
  }
  
  function signatures2() {
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
  }
  
  function signatures3() {
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
  
  function signatures4() {
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
  }

  function callInfo() {
    return {
      columns: [
        {
          text: [
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
          style: "defaultStyle"
            },
        {
          text: [
            {
              text: 'Times: ',
              style: 'label'
                },
                TimesToString(safe(report.call_info_time)) + '\n',
            {
              text: 'PPE: ',
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
          style: "defaultStyle"
            },
        {
          text: [
            {
              text: 'Patient Mentally Capable: ',
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
          ],
      style: "defaultStyle",
      columnGap: 10
    }
  }

  fillDocDefinition = function () {
    console.log(report.signature_practitioner);
    var content = [
        header(),
        include('patient_info', heading('Patient Info')),
        include('patient_info', patientInfo()),
        hxAndChief(),
        include('vitals', heading('Vitals')),
        include('vitals', table($scope.vitalsRecords, 'vitals')),
        include('exam', heading('Neuro', 'neuro')),
        include('exam', table($scope.neuroRecords, 'neuro')),
        include('exam', heading('ABC', 'abc')),
        include('exam', abc()),
        include('exam', heading('Trauma Auto')),
        include('exam', traumaAuto()),
        include('exam', heading('Trauma Penetrating')),
        include('exam', traumaPenetrating()),
        include('exam', heading('Trauma Blunt')),
        include('exam', traumaBlunt()),
        include('exam', heading('Trauma Fall')),
        include('exam', traumaFall()),
        include('exam', heading('Trauma Burn')),
        include('exam', traumaBurn()),
        include('exam', heading('Gastrointestinal')),
        include('exam', gastrointestinal()),
        include('exam', heading('Genitourinary')),
        include('exam', genitourinary()),
        include('exam', heading('Obstetric/Gynecology')),
        include('exam', gyn()),
        include('exam', heading('Field Delivery')),
        include('exam', fieldDelivery()),
        include('exam', heading('Muscular/Skeletal')),
        include('exam', muscular()),
        include('procedures', heading('Basic Airway')),
        include('procedures', table($scope.basicAirwayRecords, 'airway_basic')),
        include('procedures', heading('Invasive Airway')),
        include('procedures', invasiveAirway()),
        include('procedures', heading('Ventilator')),
        include('procedures', table($scope.ventilatorRecords, 'airway_ventilator')),
        include('procedures', heading('CPAP/BiPAP')),
        include('procedures', table($scope.cpapRecords, 'airway_cpap_bipap')),
        include('procedures', heading('Suction')),
        include('procedures', table($scope.suctionRecords, 'airway_suction')),
        include('procedures', heading('IV/IO')),
        include('procedures', table($scope.ivIoRecords, 'iv_io')),
        include('procedures', heading('Splinting/Dressing')),
        include('procedures', table($scope.splintingRecords, 'splinting')),
        include('procedures', heading('Medication')),
        include('procedures', table($scope.medicationRecords, 'medication')),
        include('procedures', heading('Spinal Motion Restriction')),
        include('procedures', spinal()),
        include('procedures', heading('In/Out')),
        include('procedures', table($scope.inOutRecords, 'in_out')),
        include('procedures', heading('ECG')),
        include('procedures', table($scope.ecgRecords, 'ecg')),
        include('call_info', heading('Call Info')),
        include('call_info', callInfo()),
        include('narrative', heading('Narrative')),
        include('narrative', table($scope.narrativeRecords, 'narrative')),
        include('code', heading('CPR')),
        include('code', table($scope.cprRecords, 'code')),
//        include('signatures', heading('Signatures')),
//        include('signatures', signatures1()),
//        include('signatures', signatures2()),
//        include('signatures', signatures3()),
//        include('signatures', signatures4())
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
  }
}