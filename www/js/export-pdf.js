function ExportPdfCtrl($scope, $stateParams, $window, report, Records, settings, exportTableDefinition) {

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

  function header() {
    return [
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
          'By ' + $scope.settingsRecord.first_name + " " + $scope.settingsRecord.last_name + '\n',
          {
            text: $scope.settingsRecord.position + ' in ' + $scope.settingsRecord.work_place + '\n' + 'ID: ' + $scope.settingsRecord.identification,
            style: "medium_text"
          }
        ],
        alignment: 'right'
      }
    ];
  }

  function patientInfo() {
    return [
      {
        text: [
          {
            text: 'Name: ',
            style: 'label'
          },
                report.first_name + ' ' + report.last_name + '\n',
          {
            text: 'Gender: ',
            style: 'label'
          },
                report.gender + "\n",
          {
            text: 'Weight: ',
            style: 'label'
          },
                report.weight + report.weight_unit + '\n',
          {
            text: 'D.o.B: ',
            style: 'label'
          },
                moment(report.date_of_birth).format('MMM D, YYYY') + " (" + (moment().year() - moment(report.date_of_birth).year()) + " y. old)\n",
          {
            text: 'Next of Kin: ',
            style: 'label'
          },
                report.next_of_kin + '\n',
              ],
        style: "defaultStyle"
            },
      {
        text: [
          {
            text: 'SIN: ',
            style: 'label'
          },
                report.insurance + '\n',
          {
            text: 'MRN: ',
            style: 'label'
          },
                report.mrn + '\n',
          {
            text: 'Address: ',
            style: 'label'
          },
                report.address_street + '\n' + report.address_city + ' ' + report.address_province + '\n',
              ],
        style: "defaultStyle"
            },
      {
        text: [
          {
            text: 'Home Phone #: ',
            style: 'label'
          },
                report.phone_home + '\n',
          {
            text: 'Cell Phone #: ',
            style: 'label'
          },
                report.phone_cell + '\n',
          {
            text: 'Work Phone #: ',
            style: 'label'
          },
                report.phone_work + '\n',
          {
            text: 'Next of Kin Phone #: ',
            style: 'label'
          },
                report.next_of_kin_phone + '\n',
              ],
        style: "defaultStyle"
            }
          ];
  }

  function patientHistory() {
    return [
      {
        text: 'Patient History\n',
        style: 'section_heading'
                },
      {
        text: 'Allergies: ',
        style: 'label'
                },
      {
        text: safe(report.patient_hx) + '\n',
        style: "defaultStyle"
                },
      {
        text: 'Conditions: ',
        style: 'label'
                },
      {
        text: safe(report.patient_hx) + '\n',
        style: "defaultStyle"
                },
      {
        text: 'Medications: ',
        style: 'label'
                },
      {
        text: safe(report.patient_hx) + '\n',
        style: "defaultStyle"
                }
              ]
  }

  function chiefComplaint() {
    return [
      {
        text: 'Chief Complaint\n',
        style: 'section_heading'
                },
      {
        text: 'Primary: ',
        style: 'label'
                },
      {
        text: safe(report.primary_complaint) + '\n',
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
        text: safe(report.pertinent) + '\n',
        style: "defaultStyle"
                }
              ]
  }

  function abc() {
    return [
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
                safe(report.tracheal_deviation) + ' ' + safe(report.tracheal_deviation_side) + "\n",
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
                safe(report.flailed_chest) + ' ' + safe(report.flailed_chest_side) + "\n",
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

  function traumaAuto() {
    return [
      {
        text: [
          {
            text: 'Vehicle: ',
            style: 'label'
                },
                safe(report.trauma_auto_vehicle) + '\n',
          {
            text: 'Seat: ',
            style: 'label'
                },
                safe(report.trauma_auto_seat) + "\n",
          {
            text: 'Airbag Deployed: ',
            style: 'label'
                },
                safe(report.trauma_auto_airbag) + "\n",
          {
            text: 'Safety Belt: ',
            style: 'label'
                },
                safe(report.trauma_auto_seatbelt) + "\n",
          {
            text: 'Helmet: ',
            style: 'label'
                },
                safe(report.trauma_auto_helmet) + "\n",
              ],
        style: "defaultStyle"
            }, {
        text: [
          {
            text: 'Leathers: ',
            style: 'label'
                },
                safe(report.trauma_auto_leathers) + "\n",
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
  
  function traumaPenetrating(){
    return [
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
              safe(report.trauma_penetrating_bleeding) + ' ' + safe(report.trauma_penetrating_controlled) + "\n",
            {
              text: 'Systems Involved: ',
              style: 'label'
            },
              safe(report.trauma_penetrating_body_parts) + "\n",
            ]
  }
  
  function traumaBlunt(){
    return [
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
              safe(report.trauma_blunt_bleeding) + ' ' + safe(report.trauma_blunt_controlled) + "\n",
            {
              text: 'Systems Involved: ',
              style: 'label'
            },
              safe(report.trauma_blunt_body_parts) + "\n",
            ]
  }
  
  function traumaFall(){
    return [
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
              safe(report.trauma_fall_bleeding) + ' ' + safe(report.trauma_fall_controlled) + "\n",
            {
              text: 'Systems Involved: ',
              style: 'label'
            },
              safe(report.trauma_fall_body_parts) + "\n",
            ]
  }
  
  function traumaBurn(){
    return [
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
              safe(report.trauma_burn_body_parts) + '\n',
            ]
  }
  
  function gastrointestinal(){
    return [
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
            ]
  }
  
  function genitourinary(){
    return [
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
            ]
  }
  
  function gyn(){
    return [
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
                safe(report.gyn_gestation_known) + ' ' + safe(report.gyn_gest_weeks) + 'weeks\n',
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
          ]
  }
  
  function fieldDelivery(){
    return [
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
              safe(report.field_delivery_apgar1) + '\n',
            {
              text: 'APGAR 5 min: ',
              style: 'label'
            },
              safe(report.field_delivery_apgar5) + '\n',
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
            ]
  }
  
  function muscular(){
    return [
            {
              text: 'Symptoms: ',
              style: 'label'
            },
              safe(report.muscular_complaint) + '\n',
            ]
  }
  
  function invasiveAirway(){
    return [
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
            ]
  }
  
  function spinal(){
    return [
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
            ]
  }
  
  function signatures(){
    return [
            {
              text: 'Practitioner: ',
              style: 'label'
            },
              safe(report.signature_practitioner_name) + '\n',
            {
              text: 'Patient: ',
              style: 'label'
            },
              safe(report.signature_patient_name) + '\n',
            {
              text: 'Patient no signature reason: ',
              style: 'label'
            },
              safe(report.no_signature_reason) + '\n',
            {
              text: 'Hosital Representative: ',
              style: 'label'
            },
              safe(report.signature_hospital_name) + '\n',
            {
              text: 'Witness: ',
              style: 'label'
            },
              safe(report.signature_witness_name) + '\n',
            ]
  }
  
  function callInfo(){
    return [
            {
              text: [
                {
                  text: 'Attendant 1: ',
                  style: 'label'
                },
                safe(report.call_info_attendant1) + '\n',
                {
                  text: 'Attendant 2: ',
                  style: 'label'
                },
                safe(report.call_info_attendant2) + '\n',
                {
                  text: 'Driver: ',
                  style: 'label'
                },
                safe(report.call_info_driver) + '\n',
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
                  text: 'Time Notified: ',
                  style: 'label'
                },
                safe(report.call_info_time) + '\n',
                {
                  text: 'PPE: ',
                  style: 'label'
                },
                safe(report.call_info_ppe) + '\n',
                {
                  text: 'Determinant: ',
                  style: 'label'
                },
                safe(report.call_info_determinant) + '\n',
                {
                  text: 'Assistance given by: ',
                  style: 'label'
                },
                safe(report.call_info_assistance) + '\n',
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
                safe(report.no_transport_reason) + '\n',
                {
                  text: 'Patient left with: ',
                  style: 'label'
                },
                safe(report.no_transport_left_with) + '\n',
                {
                  text: 'Consult with: ',
                  style: 'label'
                },
                safe(report.no_transport_consult_with) + '\n',
              ],
              style: "defaultStyle"
            }
          ]
  }

  fillDocDefinition = function () {
    $scope.docDefinition = {
      content: [
        {
          columns: header()
        },
        {
          text: 'Patient Info',
          style: 'section_heading'
        },
        {
          columns: $scope.mySettings.export.patient_info ? patientInfo() : empty(),
          columnGap: 10
        },
        {
          columns: [
            {
              text: patientHistory(),
              style: 'margin'
            },
            {
              text: chiefComplaint(),
              style: 'margin'
            }
          ],
          style: 'margin'
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
          text: 'ABC',
          style: 'section_heading'
        },
        {
          columns: abc()
        },
        {
          text: 'Trauma Auto',
          style: 'section_heading'
        },
        {
          columns: traumaAuto()
        },
        {
          text: 'Trauma Penetrating',
          style: 'section_heading'
        },
        {
          text: traumaPenetrating(),
          style: "defaultStyle"
        },
        {
          text: 'Trauma Blunt',
          style: 'section_heading'
        },
        {
          text: traumaBlunt(),
          style: "defaultStyle"
        },
        {
          text: 'Trauma Fall',
          style: 'section_heading'
        },
        {
          text: traumaFall(),
          style: "defaultStyle"
        },
        {
          text: 'Trauma Burn',
          style: 'section_heading'
        },
        {
          text: traumaBurn(),
          style: "defaultStyle"
        },
        {
          text: 'Gastrointestinal',
          style: 'section_heading'
        },
        {
          text: gastrointestinal(),
          style: "defaultStyle"
        },
        {
          text: 'Genitourinary',
          style: 'section_heading'
        },
        {
          text: genitourinary(),
          style: "defaultStyle"
        },
        {
          text: 'Obstetric/Gynecology',
          style: 'section_heading'
        },
        {
          columns: gyn(),
          style: "defaultStyle"
        },
        {
          text: 'Field Delivery',
          style: 'section_heading'
        },
        {
          text: fieldDelivery(),
          style: "defaultStyle"
        },
        {
          text: 'Muscular/Skeletal',
          style: 'section_heading'
        },
        {
          text: muscular(),
          style: "defaultStyle"
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
          text: 'Invasive Airway',
          style: 'section_heading'
        },
        {
          text: invasiveAirway(),
          style: "defaultStyle"
        },
        {
          text: 'Ventilator',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.ventilatorRecords, 'airway_ventilator')
          }
        },
        {
          text: 'CPAP/BiPAP',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.cpapRecords, 'airway_cpap_bipap')
          }
        },
        {
          text: 'Suction',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.suctionRecords, 'airway_suction')
          }
        },
        {
          text: 'IV/IO',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.ivIoRecords, 'iv_io')
          }
        },
        {
          text: 'Splinting/Dressing',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.splintingRecords, 'splinting')
          }
        },
        {
          text: 'Medication',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.medicationRecords, 'medication')
          }
        },
        {
          text: 'Spinal Motion Restriction',
          style: 'section_heading'
        },
        {
          text: spinal(),
          style: "defaultStyle"
        },
        {
          text: 'In/Out',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.inOutRecords, 'in_out')
          }
        },
        {
          text: 'ECG',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.ecgRecords, 'ecg')
          }
        },
        {
          text: 'Signatures',
          style: 'section_heading'
        },
        {
          text: signatures(),
          style: "defaultStyle"
        },
        {
          text: 'Call Info',
          style: 'section_heading'
        },
        {
          columns: callInfo()
        },
        {
          text: 'Narrative',
          style: 'section_heading'
        },
        {
          style: 'tableExample',
          table: {
            headerRows: 1,
            body: getTableArray($scope.narrativeRecords, 'narrative')
          }
        },
        {
          text: 'CPR',
          style: 'section_heading'
        },
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