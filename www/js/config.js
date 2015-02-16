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
         "abc_assessed":{
            "type":"BOOLEAN"
         },
         "open_patent":{
            "type":"BOOLEAN"
         },
         "tracheal_deviation":{
            "type":"BOOLEAN"
         },
         "tracheal_deviation_side":{
            "type":"TEXT"
         },
         "interventions":{
            "type":"BOOLEAN"
         },
         "breathing_type":{
            "type":"TEXT"
         },
         "breathing_laboured":{
            "type":"BOOLEAN"
         },
         "breathing_effective":{
            "type":"BOOLEAN"
         },
         "accessory_muscle":{
            "type":"BOOLEAN"
         },
         "nasal_flare":{
            "type":"BOOLEAN"
         },
         "cough":{
            "type":"BOOLEAN"
         },
         "cough_productive":{
            "type":"BOOLEAN"
         },
         "subcutaneous_emphysema":{
            "type":"BOOLEAN"
         },
         "flailed_chest":{
            "type":"BOOLEAN"
         },
         "flailed_chest_side":{
            "type":"BOOLEAN"
         },
         "suspect_pneumothorax":{
            "type":"BOOLEAN"
         },
         "suspect_hemothorax":{
            "type":"BOOLEAN"
         },
         "ctax4":{
            "type":"BOOLEAN"
         },
         "lung_ul_sound":{
            "type":"TEXT"
         },
         "lung_ur_sound":{
            "type":"TEXT"
         },
         "lung_ll_sound":{
            "type":"TEXT"
         },
         "lung_lr_sound":{
            "type":"TEXT"
         },
         "pulse_location":{
            "type":"TEXT"
         },
         "pulse_quality":{
            "type":"TEXT"
         },
         "pulse_regular":{
            "type":"BOOLEAN"
         },
         "jvd":{
            "type":"BOOLEAN"
         },
         "cap_refill":{
            "type":"TEXT"
         },
         "skin_color":{
            "type":"TEXT"
         },
         "skin_temperature":{
            "type":"TEXT"
         },
         "skin_condition":{
            "type":"TEXT"
         },
         "heart_tones":{
            "type":"TEXT"
         },
         "heart_tones_quality":{
            "type":"TEXT"
         },
         "peripheral_edema":{
            "type":"BOOLEAN"
         },
         "peripheral_edema_location":{
            "type":"TEXT"
         },
         "peripheral_edema_severity":{
            "type":"TEXT"
         },
         "has_trauma":{
            "type":"BOOLEAN"
         },
         "trauma_auto_assessed":{
            "type":"BOOLEAN"
         },
         "trauma_auto_vehicle":{
            "type":"TEXT"
         },
         "trauma_auto_seat":{
            "type":"TEXT"
         },
         "trauma_auto_seatbelt":{
            "type":"BOOLEAN"
         },
         "trauma_auto_airbag":{
            "type":"BOOLEAN"
         },
         "trauma_auto_helmet":{
            "type":"BOOLEAN"
         },
         "trauma_auto_leathers":{
            "type":"BOOLEAN"
         },
         "trauma_auto_nb_occupants":{
            "type":"INTEGER"
         },
         "trauma_auto_vehicle_speed":{
            "type":"INTEGER"
         },
         "trauma_auto_speed_unit":{
            "type":"TEXT"
         },
         "trauma_auto_removed_by":{
            "type":"TEXT"
         },
         "trauma_auto_details_per":{
            "type":"TEXT"
         },
         "trauma_auto_photo":{
            "type":"TEXT"
         },
         "trauma_penetrating_assessed":{
            "type":"BOOLEAN"
         },
         "trauma_penetrating_assault":{
            "type":"BOOLEAN"
         },
         "trauma_penetrating_moi":{
            "type":"TEXT"
         },
         "trauma_penetrating_velocity":{
            "type":"TEXT"
         },
         "trauma_penetrating_bleeding":{
            "type":"BOOLEAN"
         },
         "trauma_penetrating_controlled":{
            "type":"BOOLEAN"
         },
         "trauma_penetrating_body_parts":{
            "type":"TEXT"
         },
         "trauma_penetrating_photo":{
            "type":"TEXT"
         },
         "trauma_blunt_assessed":{
            "type":"BOOLEAN"
         },
         "trauma_blunt_assault":{
            "type":"BOOLEAN"
         },
         "trauma_blunt_moi":{
            "type":"TEXT"
         },
         "trauma_blunt_bleeding":{
            "type":"BOOLEAN"
         },
         "trauma_blunt_controlled":{
            "type":"BOOLEAN"
         },
         "trauma_blunt_body_parts":{
            "type":"BOOLEAN"
         },
         "trauma_blunt_photo":{
            "type":"TEXT"
         },
         "trauma_fall_assessed":{
            "type":"BOOLEAN"
         },
         "trauma_fall_assault":{
            "type":"BOOLEAN"
         },
         "trauma_fall_distance":{
            "type":"INTEGER"
         },
         "trauma_fall_distance_unit":{
            "type":"TEXT"
         },
         "trauma_fall_surface":{
            "type":"TEXT"
         },
         "trauma_fall_loss_of_c":{
            "type":"BOOLEAN"
         },
         "trauma_fall_loss_of_c_time":{
            "type":"FLOAT"
         },
         "trauma_fall_bleeding":{
            "type":"BOOLEAN"
         },
         "trauma_fall_controlled":{
            "type":"BOOLEAN"
         },
         "trauma_fall_body_parts":{
            "type":"BOOLEAN"
         },
         "trauma_fall_photo":{
            "type":"TEXT"
         },
         "trauma_burn_assessed":{
            "type":"BOOLEAN"
         },
         "trauma_burn_areas":{
            "type":"TEXT"
         },
         "trauma_burn_total_surface":{
            "type":"INTEGER"
         },
         "trauma_burn_body_type":{
            "type":"TEXT"
         },
         "trauma_burn_photo":{
            "type":"TEXT"
         },
         "gi_assessed":{
            "type":"BOOLEAN"
         },
         "gi_soft":{
            "type":"BOOLEAN"
         },
         "gi_flat":{
            "type":"BOOLEAN"
         },
         "gi_non_distended":{
            "type":"BOOLEAN"
         },
         "gi_non_tender":{
            "type":"BOOLEAN"
         },
         "gi_rebound":{
            "type":"BOOLEAN"
         },
         "gi_pain_location":{
            "type":"TEXT"
         },
//         "epigastric":{
//            "type":"BOOLEAN"
//         },
//         "suprapubic":{
//            "type":"BOOLEAN"
//         },
         "gi_obese":{
            "type":"BOOLEAN"
         },
         "gi_last_bm":{
            "type":"TEXT"
         },
         "gi_loi":{
            "type":"TEXT"
         },
         "gu_assessed":{
            "type":"BOOLEAN"
         },
         "gu_pain":{
            "type":"BOOLEAN"
         },
         "gu_frequency":{
            "type":"BOOLEAN"
         },
         "gu_hematuria":{
            "type":"BOOLEAN"
         },
         "gu_incontinence":{
            "type":"BOOLEAN"
         },
         "gu_bladder_distention":{
            "type":"BOOLEAN"
         },
         "gu_urinary_urgency":{
            "type":"BOOLEAN"
         },
         "gu_last_void":{
            "type":"TEXT"
         },
         "gyn_assessed":{
            "type":"BOOLEAN"
         },
         "gyn_gravid":{
            "type":"INTEGER"
         },
         "gyn_term":{
            "type":"INTEGER"
         },
         "gyn_para":{
            "type":"INTEGER"
         },
         "gyn_abortia":{
            "type":"INTEGER"
         },
         "gyn_live":{
            "type":"INTEGER"
         },
         "gyn_last_menstruation":{
            "type":"TEXT"
         },
         "gyn_discharge":{
            "type":"BOOLEAN"
         },
         "gyn_substance":{
            "type":"TEXT"
         },
         "gyn_pregnant":{
            "type":"TEXT"
         },
         "gyn_edc":{
            "type":"TEXT"
         },
         "gyn_gestation_known":{
            "type":"BOOLEAN"
         },
         "gyn_gest_weeks":{
            "type":"INTEGER"
         },
         "gyn_membrane_intact":{
            "type":"BOOLEAN"
         },
         "gyn_time_ruptured":{
            "type":"TEXT"
         },
         "gyn_fluid":{
            "type":"TEXT"
         },
         "gyn_expected_babies":{
            "type":"INTEGER"
         },
         "gyn_fetal_mvmt":{
            "type":"BOOLEAN"
         },
         "gyn_last_mvmt":{
            "type":"TEXT"
         },
         "gyn_mvmt_per_hr":{
            "type":"INTEGER"
         },
         "gyn_contractions":{
            "type":"BOOLEAN"
         },
         "gyn_contraction_duration":{
            "type":"TEXT"
         },
         "gyn_contraction_separation":{
            "type":"TEXT"
         },
         "field_delivery_assessed":{
            "type":"BOOLEAN"
         },
         "field_delivery_presentation":{
            "type":"TEXT"
         },
         "field_delivery_time":{
            "type":"TEXT"
         },
         "field_delivery_meconium":{
            "type":"TEXT"
         },
         "field_delivery_cord_cut_length":{
            "type":"INTEGER"
         },
         "field_delivery_apgar1":{
            "type":"TEXT"
         },
         "field_delivery_apgar5":{
            "type":"TEXT"
         },
         "field_delivery_stimulation":{
            "type":"BOOLEAN"
         },
         "field_delivery_stimulation_type":{
            "type":"TEXT"
         },
         "field_delivery_placenta":{
            "type":"BOOLEAN"
         },
         "field_delivery_placenta_time":{
            "type":"TEXT"
         },
         "field_delivery_placenta_intact":{
            "type":"BOOLEAN"
         },
         "muscular_assessed":{
            "type":"BOOLEAN"
         },
         "muscular_has_complaint":{
            "type":"BOOLEAN"
         },
         "muscular_complaint":{
            "type":"TEXT"
         },
         "invasive_airway_assessed":{
            "type":"BOOLEAN"
         },
         "invasive_airway_secured":{
            "type":"BOOLEAN"
         },
         "invasive_airway_device":{
            "type":"TEXT"
         },
         "invasive_airway_size":{
            "type":"FLOAT"
         },
         "invasive_airway_cuffed":{
            "type":"BOOLEAN"
         },
         "invasive_airway_inflation":{
            "type":"INTEGER"
         },
         "invasive_airway_technique":{
            "type":"TEXT"
         },
         "invasive_airway_distance":{
            "type":"INTEGER"
         },
         "invasive_airway_attempts":{
            "type":"INTEGER"
         },
         "spinal_assessed":{
            "type":"BOOLEAN"
         },
         "spinal_manual":{
            "type":"BOOLEAN"
         },
         "spinal_c_collar":{
            "type":"BOOLEAN"
         },
         "spinal_collar_size":{
            "type":"TEXT"
         },
         "spinal_backboard":{
            "type":"TEXT"
         },
         "spinal_transferred_by":{
            "type":"TEXT"
         },
         "spinal_secured_with":{
            "type":"TEXT"
         },
         "signature_assessed":{
            "type":"BOOLEAN"
         },
         "signature_practitioner_name":{
            "type":"TEXT"
         },
         "signature_practitioner":{
            "type":"TEXT"
         },
         "signature_patient_name":{
            "type":"TEXT"
         },
         "signature_patient":{
            "type":"TEXT"
         },
         "signature_hospital_name":{
            "type":"TEXT"
         },
         "signature_hospital":{
            "type":"TEXT"
         },
         "signature_witness_name":{
            "type":"TEXT"
         },
         "signature_witness":{
            "type":"TEXT"
         },
         "no_signature":{
            "type":"BOOLEAN"
         },
         "no_signature_reason":{
            "type":"TEXT"
         },
         "call_info_assessed":{
            "type":"BOOLEAN"
         },
         "call_info_attendant1":{
            "type":"TEXT"
         },
         "call_info_attendant1_other":{
            "type":"TEXT"
         },
         "call_info_attendant2":{
            "type":"TEXT"
         },
         "call_info_attendant2_other":{
            "type":"TEXT"
         },
         "call_info_driver":{
            "type":"TEXT"
         },
         "call_info_driver_other":{
            "type":"TEXT"
         },
         "call_info_unit_nb":{
            "type":"TEXT"
         },
         "call_info_run_nb":{
            "type":"TEXT"
         },
         "call_info_respond_to":{
            "type":"TEXT"
         },
         "call_info_milage_start":{
            "type":"INTEGER"
         },
         "call_info_milage_end":{
            "type":"INTEGER"
         },
         "call_info_code_en_route":{
            "type":"TEXT"
         },
         "call_info_code_return":{
            "type":"TEXT"
         },
         "call_info_transported_to":{
            "type":"TEXT"
         },
         "call_info_transported_position":{
            "type":"TEXT"
         },
         "call_info_time":{
            "type":"TEXT"
         },
         "call_info_ppe":{
            "type":"TEXT"
         },
         "call_info_determinant":{
            "type":"TEXT"
         },
         "call_info_assistance":{
            "type":"TEXT"
         },
         "call_info_assistance_other":{
            "type":"TEXT"
         },
         "no_transport_assessed":{
            "type":"BOOLEAN"
         },
         "no_transport_mentally_capable":{
            "type":"BOOLEAN"
         },
         "no_transport_should_transport":{
            "type":"BOOLEAN"
         },
         "no_transport_risk_informed":{
            "type":"BOOLEAN"
         },
         "no_transport_reason":{
            "type":"TEXT"
         },
         "no_transport_reason_other":{
            "type":"TEXT"
         },
         "no_transport_left_with":{
            "type":"TEXT"
         },
         "no_transport_left_with_other":{
            "type":"TEXT"
         },
         "no_transport_consult_with":{
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
         "gcs_eyes":{
            "type":"INTEGER"
         },
         "gcs_verbal":{
            "type":"INTEGER"
         },
         "gcs_motor":{
            "type":"INTEGER"
         },
         "luxr":{
            "type":"TEXT"
         },
         "ruxr":{
            "type":"TEXT"
         },
         "llxr":{
            "type":"TEXT"
         },
         "rlxr":{
            "type":"TEXT"
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
   {
      "name":"airway_basic",
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
         "oxygen_volume":{
            "type":"FLOAT"
         },
         "basic_maneuvers":{
            "type":"TEXT"
         },
         "opa":{
            "type":"TEXT"
         },
         "npa":{
            "type":"TEXT"
         },
         "bvm":{
            "type":"BOOLEAN"
         },
         "airway_rate":{
            "type":"FLOAT"
         },
         "created":{
            "type":"TIMESTAMP",
            "null":"NOT NULL",
            "default":"CURRENT_TIMESTAMP"
         }
      }
   },
   {
      "name":"airway_ventilator",
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
         "control":{
            "type":"TEXT"
         },
         "mode":{
            "type":"TEXT"
         },
         "rate":{
            "type":"FLOAT"
         },
         "tidal_volume":{
            "type":"FLOAT"
         },
         "inspiration_time":{
            "type":"FLOAT"
         },
         "inspiration_ratio":{
            "type":"FLOAT"
         },
         "expiration_ratio":{
            "type":"FLOAT"
         },
         "fiO2":{
            "type":"FLOAT"
         },
         "peep":{
            "type":"FLOAT"
         },
         "sensitivity":{
            "type":"FLOAT"
         },
         "expiration_pressure":{
            "type":"FLOAT"
         },
         "expiration_tidal_volume":{
            "type":"FLOAT"
         },
         "max_inspiration_pressure":{
            "type":"FLOAT"
         },
         "plateau_pressure":{
            "type":"FLOAT"
         },
         "pressure_support":{
            "type":"FLOAT"
         },
         "high_pressure_limit":{
            "type":"FLOAT"
         },
         "low_pressure_limit":{
            "type":"FLOAT"
         },
         "low_min_volume":{
            "type":"FLOAT"
         },
         "created":{
            "type":"TIMESTAMP",
            "null":"NOT NULL",
            "default":"CURRENT_TIMESTAMP"
         }
      }
   },
   {
      "name":"airway_cpap_bipap",
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
         "device":{
            "type":"TEXT"
         },
         "size":{
            "type":"FLOAT"
         },
         "fiO2":{
            "type":"FLOAT"
         },
         "peep":{
            "type":"FLOAT"
         },
         "pressure":{
            "type":"FLOAT"
         },
         "created":{
            "type":"TIMESTAMP",
            "null":"NOT NULL",
            "default":"CURRENT_TIMESTAMP"
         }
      }
   },
   {
      "name":"airway_suction",
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
         "duration":{
            "type":"INTEGER"
         },
         "amount":{
            "type":"INTEGER"
         },
         "tip":{
            "type":"INTEGER"
         },
         "size":{
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
      "name":"iv_io",
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
         "site":{
            "type":"TEXT"
         },
         "side":{
            "type":"TEXT"
         },
         "gauge":{
            "type":"TEXT"
         },
         "attempts":{
            "type":"INTEGER"
         },
         "successful":{
            "type":"BOOLEAN"
         },
         "fluid":{
            "type":"TEXT"
         },
         "fluid_other":{
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
      "name":"splinting",
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
         "location":{
            "type":"TEXT"
         },
         "side":{
            "type":"TEXT"
         },
         "sensation_prior":{
            "type":"BOOLEAN"
         },
         "sensation_post":{
            "type":"BOOLEAN"
         },
         "traction_applied":{
            "type":"BOOLEAN"
         },
         "splinting_type":{
            "type":"TEXT"
         },
         "splinting_type_other":{
            "type":"TEXT"
         },
         "position_found":{
            "type":"TEXT"
         },
         "position_found_other":{
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
      "name":"medication",
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
         "medication_type":{
            "type":"TEXT"
         },
         "medication":{
            "type":"TEXT"
         },
         "medication_other":{
            "type":"TEXT"
         },
         "dose":{
            "type":"FLOAT"
         },
         "dose_unit":{
            "type":"TEXT"
         },
         "route":{
            "type":"TEXT"
         },
         "route_other":{
            "type":"TEXT"
         },
         "indication":{
            "type":"TEXT"
         },
         "administrated":{
            "type":"TEXT"
         },
         "administrated_other":{
            "type":"TEXT"
         },
         "same_dose":{
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
      "name":"in_out",
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
         "direction":{
            "type":"TEXT"
         },
         "volume":{
            "type":"INTEGER"
         },
         "substance":{
            "type":"TEXT"
         },
         "other":{
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
      "name":"ecg",
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
         "leads_nb":{
            "type":"BOOLEAN"
         },
         "rhythm":{
            "type":"TEXT"
         },
         "regular":{
            "type":"BOOLEAN"
         },
         "bbb":{
            "type":"BOOLEAN"
         },
         "bbb_side":{
            "type":"TEXT"
         },
         "st_changes":{
            "type":"BOOLEAN"
         },
         "st_elevation_list":{
            "type":"TEXT"
         },
         "st_depression_list":{
            "type":"TEXT"
         },
         "pacs":{
            "type":"BOOLEAN"
         },
         "pvcs":{
            "type":"BOOLEAN"
         },
         "created":{
            "type":"TIMESTAMP",
            "null":"NOT NULL",
            "default":"CURRENT_TIMESTAMP"
         }
      }
   },
   {
      "name":"settings",
      "columns":{
         "id":{
            "type":"INTEGER",
            "null":"NOT NULL"
         },
         "first_name":{
            "type":"TEXT"
         },
         "last_name":{
            "type":"TEXT"
         },
         "identification":{
            "type":"TEXT"
         },
         "position":{
            "type":"TEXT"
         },
         "work_place":{
            "type":"TEXT"
         },
         "send_report_to":{
            "type":"TEXT"
         },
         "photo":{
            "type":"TEXT"
         }
      }
   },
   {
      "name":"narrative",
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
         "narration":{
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
      "name":"code",
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
         "code":{
            "type":"TEXT"
         },
         "time":{
            "type":"TEXT"
         }
      }
    }
]
  })

.constant('chiefComplaint',{
      primary:[
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
});