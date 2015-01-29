angular.module('ePCR.config', [])

  .constant('DB_CONFIG', {
      name: 'myPCR',
      description: 'Electronic Patient Care Report',
      version: '',
      size: 2 * 1024 * 1024,
      tables: [
   {
      "name":"report",
      "columns":{
         "id":{
            "type":"INTEGER",
            "null":"NOT NULL",
            "primary":true,
            "auto_increment":true
         },
         "patient_info_assessed":{
          "type":"BOOLEAN"
         },
         "last_name":{
            "type":"TEXT"
         },
         "first_name":{
            "type":"TEXT"
         },
         "date_of_birth":{
            "type":"TEXT"
         },
         "gender":{
            "type":"BOOLEAN"
         },
         "weight":{
            "type":"FLOAT"
         },
         "weight_unit":{
            "type":"TEXT"
         },
         "profile_picture":{
            "type":"TEXT"
         },
         "address_street":{
            "type":"TEXT"
         },
         "address_city":{
            "type":"TEXT"
         },
         "address_province":{
            "type":"TEXT"
         },
         "phone_home":{
            "type":"TEXT"
         },
         "phone_work":{
            "type":"TEXT"
         },
         "phone_cell":{
            "type":"TEXT"
         },
         "insurance":{
            "type":"TEXT"
         },
         "mrn":{
            "type":"TEXT"
         },
         "next_of_kin":{
            "type":"TEXT"
         },
         "next_of_kin_phone":{
            "type":"TEXT"
         }, 
         "chief_complaint_assessed":{
          "type":"BOOLEAN"
         },
         "primary_complaint":{
            "type":"TEXT"
         },
         "primary_complaint_other":{
            "type":"TEXT"
         },
         "secondary_complaint":{
            "type":"TEXT"
         },
         "pertinent":{
            "type":"TEXT"
         },
         "patient_hx_assessed":{
          "type":"BOOLEAN"
         },
         "hx_allergies":{
            "type":"TEXT"
         },
         "hx_conditions":{
            "type":"TEXT"
         },
         "hx_medications":{
            "type":"TEXT"
         },
         "created":{
            "type":"TIMESTAMP",
            "null":"NOT NULL",
            "default":"CURRENT_TIMESTAMP"
         }
      }
   },
   {
      "name":"vitals",
      "columns":{
         "id":{
            "type":"INTEGER",
            "null":"NOT NULL",
            "primary":true,
            "auto_increment":true
         },
         "report_id":{
            "type":"INTEGER",
            "null":"NOT NULL"
         },
         "hr":{
            "type":"INTEGER"
         },
         "sys":{
            "type":"INTEGER"
         },
         "dia":{
            "type":"INTEGER"
         },
         "fio2":{
            "type":"FLOAT"
         },
         "spo2":{
            "type":"FLOAT"
         },
         "resp":{
            "type":"INTEGER"
         },
         "level_of_c":{
            "type":"TEXT"
         },
         "perrl":{
            "type":"BOOLEAN"
         },
         "left_eye":{
            "type":"INTEGER"
         },
         "right_eye":{
            "type":"INTEGER"
         },
         "eyes_responsive":{
            "type":"BOOLEAN"
         },
         "bgl":{
            "type":"FLOAT"
         },
         "bgl_unit":{
            "type":"TEXT"
         },
         "temp":{
            "type":"FLOAT"
         },
         "temp_unit":{
            "type":"TEXT"
         },
         "etco2":{
            "type":"FLOAT"
         },
         "etco2_unit":{
            "type":"TEXT"
         },
         "pain":{
            "type":"INTEGER"
         },
         "created":{
            "type":"TIMESTAMP",
            "null":"NOT NULL",
            "default":"CURRENT_TIMESTAMP"
         }
      }
   },
   {
      "name":"neuro",
      "columns":{
         "id":{
            "type":"INTEGER",
            "null":"NOT NULL",
            "primary":true,
            "auto_increment":true
         },
         "report_id":{
            "type":"INTEGER",
            "null":"NOT NULL"
         },
         "assessed":{
            "type":"BOOLEAN"
         },
         "avpu":{
            "type":"TEXT"
         },
         "gcs":{
            "type":"BOOLEAN"
         },
         "eyes":{
            "type":"INTEGER"
         },
         "verbal":{
            "type":"INTEGER"
         },
         "motor":{
            "type":"INTEGER"
         },
         "luxr":{
            "type":"BOOLEAN"
         },
         "ruxr":{
            "type":"BOOLEAN"
         },
         "llxr":{
            "type":"BOOLEAN"
         },
         "rlxr":{
            "type":"BOOLEAN"
         },
         "suspect_stroke":{
            "type":"BOOLEAN"
         },
         "facial_droop":{
            "type":"BOOLEAN"
         },
         "facial_droop_side":{
            "type":"TEXT"
         },
         "arm_drift":{
            "type":"BOOLEAN"
         },
         "arm_drift_side":{
            "type":"TEXT"
         },
         "speech":{
            "type":"TEXT"
         },
         "created":{
            "type":"TIMESTAMP",
            "null":"NOT NULL",
            "default":"CURRENT_TIMESTAMP"
         }
      }
   },
//   {
//      "name":"abc",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "open_patent":{
//            "type":"BOOLEAN"
//         },
//         "tracheal_deviation":{
//            "type":"BOOLEAN"
//         },
//         "tracheal_deviation_side":{
//            "type":"BOOLEAN"
//         },
//         "interventions":{
//            "type":"BOOLEAN"
//         },
//         "breathing_type":{
//            "type":"TEXT"
//         },
//         "laboured":{
//            "type":"BOOLEAN"
//         },
//         "effective":{
//            "type":"BOOLEAN"
//         },
//         "accessory_muscle":{
//            "type":"BOOLEAN"
//         },
//         "nasal_flare":{
//            "type":"BOOLEAN"
//         },
//         "cough":{
//            "type":"BOOLEAN"
//         },
//         "productive":{
//            "type":"BOOLEAN"
//         },
//         "subcut_emph":{
//            "type":"BOOLEAN"
//         },
//         "flailed_chest":{
//            "type":"BOOLEAN"
//         },
//         "flailed_chest_side":{
//            "type":"BOOLEAN"
//         },
//         "suspect_pneu":{
//            "type":"BOOLEAN"
//         },
//         "suspect_hemo":{
//            "type":"BOOLEAN"
//         },
//         "ctax4":{
//            "type":"BOOLEAN"
//         },
//         "ul_sound":{
//            "type":"TEXT"
//         },
//         "ur_sound":{
//            "type":"TEXT"
//         },
//         "ll_sound":{
//            "type":"TEXT"
//         },
//         "lr_sound":{
//            "type":"TEXT"
//         },
//         "pulse_location":{
//            "type":"TEXT"
//         },
//         "pulse_regularity":{
//            "type":"BOOLEAN"
//         },
//         "pulse_quality":{
//            "type":"TEXT"
//         },
//         "jvd":{
//            "type":"BOOLEAN"
//         },
//         "cap_refill":{
//            "type":"BOOLEAN"
//         },
//         "skin":{
//            "type":"TEXT"
//         },
//         "abctemp":{
//            "type":"TEXT"
//         },
//         "dry":{
//            "type":"BOOLEAN"
//         },
//         "heart_tones":{
//            "type":"TEXT"
//         },
//         "heart_tones_quality":{
//            "type":"TEXT"
//         },
//         "peripheral_edema":{
//            "type":"BOOLEAN"
//         },
//         "peripheral_edema_location":{
//            "type":"TEXT"
//         },
//         "edema_severity":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"trauma",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "isTrauma":{
//            "type":"BOOLEAN"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"trauma_auto",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "car":{
//            "type":"TEXT"
//         },
//         "seat":{
//            "type":"TEXT"
//         },
//         "seatbelt":{
//            "type":"BOOLEAN"
//         },
//         "airbag":{
//            "type":"BOOLEAN"
//         },
//         "helmet":{
//            "type":"BOOLEAN"
//         },
//         "leathers":{
//            "type":"BOOLEAN"
//         },
//         "nb_occupants":{
//            "type":"INTEGER"
//         },
//         "approx_speed":{
//            "type":"INTEGER"
//         },
//         "speed_unit":{
//            "type":"TEXT"
//         },
//         "removed_by":{
//            "type":"TEXT"
//         },
//         "per":{
//            "type":"TEXT"
//         },
//         "photo":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"trauma_penetrating",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "assault":{
//            "type":"BOOLEAN"
//         },
//         "moi":{
//            "type":"TEXT"
//         },
//         "velocity":{
//            "type":"TEXT"
//         },
//         "bleeding":{
//            "type":"BOOLEAN"
//         },
//         "controlled":{
//            "type":"BOOLEAN"
//         },
//         "head":{
//            "type":"BOOLEAN"
//         },
//         "neck":{
//            "type":"BOOLEAN"
//         },
//         "chest":{
//            "type":"BOOLEAN"
//         },
//         "abd":{
//            "type":"BOOLEAN"
//         },
//         "pelvis":{
//            "type":"BOOLEAN"
//         },
//         "ulxr":{
//            "type":"BOOLEAN"
//         },
//         "urxr":{
//            "type":"BOOLEAN"
//         },
//         "llxr":{
//            "type":"BOOLEAN"
//         },
//         "lrxr":{
//            "type":"BOOLEAN"
//         },
//         "back":{
//            "type":"BOOLEAN"
//         },
//         "photo":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"trauma_blunt",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "assault":{
//            "type":"BOOLEAN"
//         },
//         "moi":{
//            "type":"TEXT"
//         },
//         "bleeding":{
//            "type":"BOOLEAN"
//         },
//         "controlled":{
//            "type":"BOOLEAN"
//         },
//         "head":{
//            "type":"BOOLEAN"
//         },
//         "neck":{
//            "type":"BOOLEAN"
//         },
//         "chest":{
//            "type":"BOOLEAN"
//         },
//         "abd":{
//            "type":"BOOLEAN"
//         },
//         "pelvis":{
//            "type":"BOOLEAN"
//         },
//         "ulxr":{
//            "type":"BOOLEAN"
//         },
//         "urxr":{
//            "type":"BOOLEAN"
//         },
//         "llxr":{
//            "type":"BOOLEAN"
//         },
//         "lrxr":{
//            "type":"BOOLEAN"
//         },
//         "back":{
//            "type":"BOOLEAN"
//         },
//         "photo":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"trauma_fall",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "assault":{
//            "type":"BOOLEAN"
//         },
//         "distance":{
//            "type":"INTEGER"
//         },
//         "distance_unit":{
//            "type":"TEXT"
//         },
//         "surface":{
//            "type":"TEXT"
//         },
//         "loss_of_c":{
//            "type":"BOOLEAN"
//         },
//         "loss_of_c_time":{
//            "type":"FLOAT"
//         },
//         "bleeding":{
//            "type":"BOOLEAN"
//         },
//         "controlled":{
//            "type":"BOOLEAN"
//         },
//         "head":{
//            "type":"BOOLEAN"
//         },
//         "neck":{
//            "type":"BOOLEAN"
//         },
//         "chest":{
//            "type":"BOOLEAN"
//         },
//         "abd":{
//            "type":"BOOLEAN"
//         },
//         "pelvis":{
//            "type":"BOOLEAN"
//         },
//         "ulxr":{
//            "type":"BOOLEAN"
//         },
//         "urxr":{
//            "type":"BOOLEAN"
//         },
//         "llxr":{
//            "type":"BOOLEAN"
//         },
//         "lrxr":{
//            "type":"BOOLEAN"
//         },
//         "back":{
//            "type":"BOOLEAN"
//         },
//         "photo":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"trauma_burn",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "head_front":{
//            "type":"INTEGER"
//         },
//         "head_back":{
//            "type":"INTEGER"
//         },
//         "chest":{
//            "type":"INTEGER"
//         },
//         "abdomen":{
//            "type":"INTEGER"
//         },
//         "upper_back":{
//            "type":"INTEGER"
//         },
//         "lower_back":{
//            "type":"INTEGER"
//         },
//         "ulx_up_front":{
//            "type":"INTEGER"
//         },
//         "ulx_low_front":{
//            "type":"INTEGER"
//         },
//         "ulx_up_back":{
//            "type":"INTEGER"
//         },
//         "ulx_low_back":{
//            "type":"INTEGER"
//         },
//         "urx_up_front":{
//            "type":"INTEGER"
//         },
//         "urx_low_front":{
//            "type":"INTEGER"
//         },
//         "urx_up_back":{
//            "type":"INTEGER"
//         },
//         "urx_low_back":{
//            "type":"INTEGER"
//         },
//         "llx_up_front":{
//            "type":"INTEGER"
//         },
//         "llx_low_front":{
//            "type":"INTEGER"
//         },
//         "llx_up_back":{
//            "type":"INTEGER"
//         },
//         "llx_low_back":{
//            "type":"INTEGER"
//         },
//         "lrx_up_front":{
//            "type":"INTEGER"
//         },
//         "lrx_low_front":{
//            "type":"INTEGER"
//         },
//         "lrx_up_back":{
//            "type":"INTEGER"
//         },
//         "lrx_low_back":{
//            "type":"INTEGER"
//         },
//         "total_surface":{
//            "type":"INTEGER"
//         },
//         "body_type":{
//            "type":"TEXT"
//         },
//         "photo":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"gi_gu",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "gi_assessed":{
//            "type":"BOOLEAN"
//         },
//         "flat":{
//            "type":"BOOLEAN"
//         },
//         "soft":{
//            "type":"BOOLEAN"
//         },
//         "tender":{
//            "type":"BOOLEAN"
//         },
//         "rebound":{
//            "type":"BOOLEAN"
//         },
//         "luq":{
//            "type":"BOOLEAN"
//         },
//         "ruq":{
//            "type":"BOOLEAN"
//         },
//         "llq":{
//            "type":"BOOLEAN"
//         },
//         "rlq":{
//            "type":"BOOLEAN"
//         },
//         "epigastric":{
//            "type":"BOOLEAN"
//         },
//         "suprapubic":{
//            "type":"BOOLEAN"
//         },
//         "obese":{
//            "type":"BOOLEAN"
//         },
//         "last_bm":{
//            "type":"TEXT"
//         },
//         "loi":{
//            "type":"TEXT"
//         },
//         "gu_assessed":{
//            "type":"BOOLEAN"
//         },
//         "pain":{
//            "type":"BOOLEAN"
//         },
//         "frequency":{
//            "type":"BOOLEAN"
//         },
//         "hematuria":{
//            "type":"BOOLEAN"
//         },
//         "incontinence":{
//            "type":"BOOLEAN"
//         },
//         "bladder_distention":{
//            "type":"BOOLEAN"
//         },
//         "urinary_urgency":{
//            "type":"BOOLEAN"
//         },
//         "last_void":{
//            "type":"TEXT"
//         },
//         "gyn_assessed":{
//            "type":"BOOLEAN"
//         },
//         "gravid":{
//            "type":"INTEGER"
//         },
//         "term":{
//            "type":"INTEGER"
//         },
//         "para":{
//            "type":"INTEGER"
//         },
//         "abortia":{
//            "type":"INTEGER"
//         },
//         "live":{
//            "type":"INTEGER"
//         },
//         "last_menstruation":{
//            "type":"TEXT"
//         },
//         "discharge":{
//            "type":"BOOLEAN"
//         },
//         "substance":{
//            "type":"TEXT"
//         },
//         "pregnant":{
//            "type":"TEXT"
//         },
//         "edc":{
//            "type":"TEXT"
//         },
//         "gestation_known":{
//            "type":"BOOLEAN"
//         },
//         "gest_weeks":{
//            "type":"TEXT"
//         },
//         "membr_intact":{
//            "type":"BOOLEAN"
//         },
//         "time_ruptured":{
//            "type":"TEXT"
//         },
//         "fluid":{
//            "type":"TEXT"
//         },
//         "expected_babies":{
//            "type":"INTEGER"
//         },
//         "fetal_mvmt":{
//            "type":"BOOLEAN"
//         },
//         "last_mvmt":{
//            "type":"TEXT"
//         },
//         "mvmt_per_hr":{
//            "type":"INTEGER"
//         },
//         "contractions":{
//            "type":"BOOLEAN"
//         },
//         "contraction_duration":{
//            "type":"INTEGER"
//         },
//         "contraction_separation":{
//            "type":"INTEGER"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"field_delivery",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "presentation":{
//            "type":"TEXT"
//         },
//         "delivery_time":{
//            "type":"TEXT"
//         },
//         "meconium":{
//            "type":"TEXT"
//         },
//         "cord_length":{
//            "type":"INTEGER"
//         },
//         "apgar1":{
//            "type":"INTEGER"
//         },
//         "apgar5":{
//            "type":"INTEGER"
//         },
//         "stimulation":{
//            "type":"BOOLEAN"
//         },
//         "stimulation_type":{
//            "type":"TEXT"
//         },
//         "placenta":{
//            "type":"BOOLEAN"
//         },
//         "placenta_time":{
//            "type":"TEXT"
//         },
//         "placenta_intact":{
//            "type":"BOOLEAN"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"apgar",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "appearance1":{
//            "type":"TEXT"
//         },
//         "pulse1":{
//            "type":"TEXT"
//         },
//         "grimace1":{
//            "type":"TEXT"
//         },
//         "activity1":{
//            "type":"TEXT"
//         },
//         "respirations1":{
//            "type":"TEXT"
//         },
//         "total1":{
//            "type":"INTEGER"
//         },
//         "time1":{
//            "type":"TEXT"
//         },
//         "appearance5":{
//            "type":"TEXT"
//         },
//         "pulse5":{
//            "type":"TEXT"
//         },
//         "grimace5":{
//            "type":"TEXT"
//         },
//         "activity5":{
//            "type":"TEXT"
//         },
//         "respirations5":{
//            "type":"TEXT"
//         },
//         "total5":{
//            "type":"INTEGER"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"muscular_skeletal",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "nocomplaint":{
//            "type":"BOOLEAN"
//         },
//         "muscular":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"airway",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "oxygen":{
//            "type":"INTEGER"
//         },
//         "basic_maneuvers":{
//            "type":"TEXT"
//         },
//         "opa":{
//            "type":"TEXT"
//         },
//         "npa":{
//            "type":"TEXT"
//         },
//         "bvm":{
//            "type":"BOOLEAN"
//         },
//         "rate":{
//            "type":"INTEGER"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"invasive_airway",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "secured":{
//            "type":"BOOLEAN"
//         },
//         "device":{
//            "type":"TEXT"
//         },
//         "distance":{
//            "type":"INTEGER"
//         },
//         "size":{
//            "type":"FLOAT"
//         },
//         "cuffed":{
//            "type":"BOOLEAN"
//         },
//         "inflation":{
//            "type":"INTEGER"
//         },
//         "bvm":{
//            "type":"BOOLEAN"
//         },
//         "attempts":{
//            "type":"INTEGER"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"ventilator",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "vented":{
//            "type":"BOOLEAN"
//         },
//         "control":{
//            "type":"BOOLEAN"
//         },
//         "mode":{
//            "type":"BOOLEAN"
//         },
//         "rate":{
//            "type":"INTEGER"
//         },
//         "tidal_v":{
//            "type":"INTEGER"
//         },
//         "insp_time":{
//            "type":"INTEGER"
//         },
//         "i_ratio":{
//            "type":"INTEGER"
//         },
//         "e_ratio":{
//            "type":"INTEGER"
//         },
//         "fiO2":{
//            "type":"INTEGER"
//         },
//         "peep":{
//            "type":"INTEGER"
//         },
//         "sensitivity":{
//            "type":"INTEGER"
//         },
//         "expir_p":{
//            "type":"INTEGER"
//         },
//         "expir_tidal_v":{
//            "type":"INTEGER"
//         },
//         "max_insp_p":{
//            "type":"INTEGER"
//         },
//         "plateau_p":{
//            "type":"INTEGER"
//         },
//         "p_support":{
//            "type":"INTEGER"
//         },
//         "high_p_lim":{
//            "type":"INTEGER"
//         },
//         "low_p_lim":{
//            "type":"INTEGER"
//         },
//         "low_min_v":{
//            "type":"INTEGER"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"cpap_bipap",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "device":{
//            "type":"BOOLEAN"
//         },
//         "size":{
//            "type":"INTEGER"
//         },
//         "fiO2":{
//            "type":"INTEGER"
//         },
//         "peep":{
//            "type":"INTEGER"
//         },
//         "pressure":{
//            "type":"INTEGER"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"suction",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "suction":{
//            "type":"BOOLEAN"
//         },
//         "duration":{
//            "type":"INTEGER"
//         },
//         "amount":{
//            "type":"INTEGER"
//         },
//         "tip":{
//            "type":"INTEGER"
//         },
//         "size":{
//            "type":"INTEGER"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"iv_io",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "site":{
//            "type":"BOOLEAN"
//         },
//         "side":{
//            "type":"BOOLEAN"
//         },
//         "gauge":{
//            "type":"TEXT"
//         },
//         "attempts":{
//            "type":"INTEGER"
//         },
//         "successful":{
//            "type":"BOOLEAN"
//         },
//         "fluid":{
//            "type":"TEXT"
//         },
//         "fluid_other":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"splinting",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "location":{
//            "type":"TEXT"
//         },
//         "side":{
//            "type":"BOOLEAN"
//         },
//         "prior":{
//            "type":"BOOLEAN"
//         },
//         "post":{
//            "type":"BOOLEAN"
//         },
//         "traction":{
//            "type":"BOOLEAN"
//         },
//         "type":{
//            "type":"TEXT"
//         },
//         "type_other":{
//            "type":"TEXT"
//         },
//         "position":{
//            "type":"TEXT"
//         },
//         "position_other":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"medication",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "isGeneric":{
//            "type":"BOOLEAN"
//         },
//         "medication":{
//            "type":"TEXT"
//         },
//         "medic_other":{
//            "type":"TEXT"
//         },
//         "dose":{
//            "type":"FLOAT"
//         },
//         "dose_unit":{
//            "type":"TEXT"
//         },
//         "route":{
//            "type":"TEXT"
//         },
//         "route_other":{
//            "type":"TEXT"
//         },
//         "indication":{
//            "type":"TEXT"
//         },
//         "admin":{
//            "type":"TEXT"
//         },
//         "admin_other":{
//            "type":"TEXT"
//         },
//         "same_dose":{
//            "type":"INTEGER"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"c_spine",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "manual":{
//            "type":"BOOLEAN"
//         },
//         "c_collar":{
//            "type":"BOOLEAN"
//         },
//         "size":{
//            "type":"TEXT"
//         },
//         "backboard":{
//            "type":"TEXT"
//         },
//         "transferred":{
//            "type":"TEXT"
//         },
//         "secured":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"in_out",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "intake_volume":{
//            "type":"INTEGER"
//         },
//         "intake_substance":{
//            "type":"TEXT"
//         },
//         "intake_other":{
//            "type":"TEXT"
//         },
//         "outtake_volume":{
//            "type":"INTEGER"
//         },
//         "outtake_substance":{
//            "type":"TEXT"
//         },
//         "outtake_other":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"ecg",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "leads_nb":{
//            "type":"BOOLEAN"
//         },
//         "rhythm":{
//            "type":"TEXT"
//         },
//         "regular":{
//            "type":"BOOLEAN"
//         },
//         "bbb":{
//            "type":"BOOLEAN"
//         },
//         "bbb_side":{
//            "type":"BOOLEAN"
//         },
//         "st_changes":{
//            "type":"BOOLEAN"
//         },
//         "bi":{
//            "type":"TEXT"
//         },
//         "bii":{
//            "type":"TEXT"
//         },
//         "biii":{
//            "type":"TEXT"
//         },
//         "bavr":{
//            "type":"TEXT"
//         },
//         "bavl":{
//            "type":"TEXT"
//         },
//         "bavf":{
//            "type":"TEXT"
//         },
//         "bv1":{
//            "type":"TEXT"
//         },
//         "bv2":{
//            "type":"TEXT"
//         },
//         "bv3":{
//            "type":"TEXT"
//         },
//         "bv4":{
//            "type":"TEXT"
//         },
//         "bv5":{
//            "type":"TEXT"
//         },
//         "bv6":{
//            "type":"TEXT"
//         },
//         "ecg_pacs":{
//            "type":"BOOLEAN"
//         },
//         "ecg_pvcs":{
//            "type":"BOOLEAN"
//         },
//         "photo":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"signatures",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "sigPractitionerText":{
//            "type":"TEXT"
//         },
//         "sigPatientText":{
//            "type":"TEXT"
//         },
//         "noSign":{
//            "type":"BOOLEAN"
//         },
//         "reason":{
//            "type":"TEXT"
//         },
//         "sigHospReprText":{
//            "type":"TEXT"
//         },
//         "sigWitnessText":{
//            "type":"TEXT"
//         },
//         "sigPractitioner":{
//            "type":"TEXT"
//         },
//         "sigPatient":{
//            "type":"TEXT"
//         },
//         "sigHospRepr":{
//            "type":"TEXT"
//         },
//         "sigWitness":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"call_info",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "attendant1":{
//            "type":"TEXT"
//         },
//         "attendant1_other":{
//            "type":"TEXT"
//         },
//         "attendant2":{
//            "type":"TEXT"
//         },
//         "attendant2_other":{
//            "type":"TEXT"
//         },
//         "driver":{
//            "type":"TEXT"
//         },
//         "driver_other":{
//            "type":"TEXT"
//         },
//         "unit_nb":{
//            "type":"TEXT"
//         },
//         "run_nb":{
//            "type":"TEXT"
//         },
//         "respond":{
//            "type":"TEXT"
//         },
//         "milage_start":{
//            "type":"INTEGER"
//         },
//         "milage_end":{
//            "type":"INTEGER"
//         },
//         "code_en_route":{
//            "type":"TEXT"
//         },
//         "code_return":{
//            "type":"TEXT"
//         },
//         "transported_to":{
//            "type":"TEXT"
//         },
//         "transported_position":{
//            "type":"TEXT"
//         },
//         "time_notified":{
//            "type":"TEXT"
//         },
//         "time_route":{
//            "type":"TEXT"
//         },
//         "time_on_scene":{
//            "type":"TEXT"
//         },
//         "time_depart":{
//            "type":"TEXT"
//         },
//         "time_destination":{
//            "type":"TEXT"
//         },
//         "time_transfer":{
//            "type":"TEXT"
//         },
//         "time_back_service":{
//            "type":"TEXT"
//         },
//         "time_patient_contact":{
//            "type":"TEXT"
//         },
//         "ppe_gloves":{
//            "type":"BOOLEAN"
//         },
//         "ppe_eyes":{
//            "type":"BOOLEAN"
//         },
//         "ppe_reflective":{
//            "type":"BOOLEAN"
//         },
//         "ppe_isolation":{
//            "type":"BOOLEAN"
//         },
//         "ppe_mask":{
//            "type":"BOOLEAN"
//         },
//         "det1":{
//            "type":"TEXT"
//         },
//         "det2":{
//            "type":"TEXT"
//         },
//         "det3":{
//            "type":"TEXT"
//         },
//         "assistance":{
//            "type":"TEXT"
//         },
//         "other":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"no_transport",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "assessed":{
//            "type":"BOOLEAN"
//         },
//         "mentally_capable":{
//            "type":"BOOLEAN"
//         },
//         "should_trans":{
//            "type":"BOOLEAN"
//         },
//         "informed":{
//            "type":"BOOLEAN"
//         },
//         "reason":{
//            "type":"TEXT"
//         },
//         "reason_other":{
//            "type":"TEXT"
//         },
//         "left_with":{
//            "type":"TEXT"
//         },
//         "left_with_other":{
//            "type":"TEXT"
//         },
//         "consult_with":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"narrative",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "narration":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   },
//   {
//      "name":"code",
//      "columns":{
//         "id":{
//            "type":"INTEGER",
//            "null":"NOT NULL",
//            "primary":true,
//            "auto_increment":true
//         },
//         "report_id":{
//            "type":"INTEGER",
//            "null":"NOT NULL"
//         },
//         "code_name":{
//            "type":"TEXT"
//         },
//         "created":{
//            "type":"TIMESTAMP",
//            "null":"NOT NULL",
//            "default":"CURRENT_TIMESTAMP"
//         }
//      }
//   }
]
  })

.constant('chiefComplaint',{
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
      list:[
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
    list:[
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
    list:[
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
    list:[
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
    list:[
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
    list:[
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
    list:[
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
    list:[
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
});