angular.module('ePCR.schema', [])

.constant('DB_CONFIG', {
  name: 'ePCR',
  description: 'Electronic Patient Care Report',
  version: '',
  size: 10 * 1024 * 1024,
  tables: [
    {
      "name": "report",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "patient_info_assessed": {
          "type": "BOOLEAN"
        },
        "last_name": {
          "type": "TEXT"
        },
        "first_name": {
          "type": "TEXT"
        },
        "date_of_birth": {
          "type": "TEXT"
        },
        "gender": {
          "type": "BOOLEAN"
        },
        "weight": {
          "type": "FLOAT"
        },
        "weight_unit": {
          "type": "TEXT"
        },
        "address_street": {
          "type": "TEXT"
        },
        "address_city": {
          "type": "TEXT"
        },
        "address_province": {
          "type": "TEXT"
        },
        "phone_home": {
          "type": "TEXT"
        },
        "phone_work": {
          "type": "TEXT"
        },
        "phone_cell": {
          "type": "TEXT"
        },
        "insurance": {
          "type": "TEXT"
        },
        "mrn": {
          "type": "TEXT"
        },
        "next_of_kin": {
          "type": "TEXT"
        },
        "next_of_kin_phone": {
          "type": "TEXT"
        },
        "chief_complaint_assessed": {
          "type": "BOOLEAN"
        },
        "primary_complaint": {
          "type": "TEXT"
        },
        "primary_complaint_other": {
          "type": "TEXT"
        },
        "secondary_complaint": {
          "type": "TEXT"
        },
        "pertinent": {
          "type": "TEXT"
        },
        "patient_hx_assessed": {
          "type": "BOOLEAN"
        },
        "hx_allergies": {
          "type": "TEXT"
        },
        "hx_conditions": {
          "type": "TEXT"
        },
        "hx_medications": {
          "type": "TEXT"
        },
        "abc_assessed": {
          "type": "BOOLEAN"
        },
        "open_patent": {
          "type": "BOOLEAN"
        },
        "tracheal_deviation": {
          "type": "BOOLEAN"
        },
        "tracheal_deviation_side": {
          "type": "TEXT"
        },
        "interventions": {
          "type": "BOOLEAN"
        },
        "breathing_type": {
          "type": "TEXT"
        },
        "breathing_laboured": {
          "type": "BOOLEAN"
        },
        "breathing_effective": {
          "type": "BOOLEAN"
        },
        "accessory_muscle": {
          "type": "BOOLEAN"
        },
        "nasal_flare": {
          "type": "BOOLEAN"
        },
        "cough": {
          "type": "BOOLEAN"
        },
        "cough_productive": {
          "type": "BOOLEAN"
        },
        "subcutaneous_emphysema": {
          "type": "BOOLEAN"
        },
        "flailed_chest": {
          "type": "BOOLEAN"
        },
        "flailed_chest_side": {
          "type": "BOOLEAN"
        },
        "suspect_pneumothorax": {
          "type": "BOOLEAN"
        },
        "suspect_hemothorax": {
          "type": "BOOLEAN"
        },
        "ctax4": {
          "type": "BOOLEAN"
        },
        "lung_ul_sound": {
          "type": "TEXT"
        },
        "lung_ur_sound": {
          "type": "TEXT"
        },
        "lung_ll_sound": {
          "type": "TEXT"
        },
        "lung_lr_sound": {
          "type": "TEXT"
        },
        "pulse_location": {
          "type": "TEXT"
        },
        "pulse_quality": {
          "type": "TEXT"
        },
        "pulse_regular": {
          "type": "BOOLEAN"
        },
        "jvd": {
          "type": "BOOLEAN"
        },
        "cap_refill": {
          "type": "TEXT"
        },
        "skin_color": {
          "type": "TEXT"
        },
        "skin_temperature": {
          "type": "TEXT"
        },
        "skin_condition": {
          "type": "TEXT"
        },
        "heart_tones": {
          "type": "TEXT"
        },
        "heart_tones_quality": {
          "type": "TEXT"
        },
        "peripheral_edema": {
          "type": "BOOLEAN"
        },
        "peripheral_edema_location": {
          "type": "TEXT"
        },
        "peripheral_edema_severity": {
          "type": "TEXT"
        },
        "has_trauma": {
          "type": "BOOLEAN"
        },
        "trauma_auto_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_auto_vehicle": {
          "type": "TEXT"
        },
        "trauma_auto_seat": {
          "type": "TEXT"
        },
        "trauma_auto_seatbelt": {
          "type": "BOOLEAN"
        },
        "trauma_auto_airbag": {
          "type": "BOOLEAN"
        },
        "trauma_auto_helmet": {
          "type": "BOOLEAN"
        },
        "trauma_auto_leathers": {
          "type": "BOOLEAN"
        },
        "trauma_auto_nb_occupants": {
          "type": "INTEGER"
        },
        "trauma_auto_vehicle_speed": {
          "type": "INTEGER"
        },
        "trauma_auto_speed_unit": {
          "type": "TEXT"
        },
        "trauma_auto_removed_by": {
          "type": "TEXT"
        },
        "trauma_auto_details_per": {
          "type": "TEXT"
        },
        "trauma_penetrating_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_penetrating_assault": {
          "type": "BOOLEAN"
        },
        "trauma_penetrating_moi": {
          "type": "TEXT"
        },
        "trauma_penetrating_velocity": {
          "type": "TEXT"
        },
        "trauma_penetrating_bleeding": {
          "type": "BOOLEAN"
        },
        "trauma_penetrating_controlled": {
          "type": "BOOLEAN"
        },
        "trauma_penetrating_body_parts": {
          "type": "TEXT"
        },
        "trauma_blunt_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_blunt_assault": {
          "type": "BOOLEAN"
        },
        "trauma_blunt_moi": {
          "type": "TEXT"
        },
        "trauma_blunt_bleeding": {
          "type": "BOOLEAN"
        },
        "trauma_blunt_controlled": {
          "type": "BOOLEAN"
        },
        "trauma_blunt_body_parts": {
          "type": "BOOLEAN"
        },
        "trauma_fall_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_fall_assault": {
          "type": "BOOLEAN"
        },
        "trauma_fall_distance": {
          "type": "INTEGER"
        },
        "trauma_fall_distance_unit": {
          "type": "TEXT"
        },
        "trauma_fall_surface": {
          "type": "TEXT"
        },
        "trauma_fall_loss_of_c": {
          "type": "BOOLEAN"
        },
        "trauma_fall_loss_of_c_time": {
          "type": "FLOAT"
        },
        "trauma_fall_bleeding": {
          "type": "BOOLEAN"
        },
        "trauma_fall_controlled": {
          "type": "BOOLEAN"
        },
        "trauma_fall_body_parts": {
          "type": "BOOLEAN"
        },
        "trauma_burn_assessed": {
          "type": "BOOLEAN"
        },
        "trauma_burn_total_surface": {
          "type": "INTEGER"
        },
        "trauma_burn_body_type": {
          "type": "TEXT"
        },
        "trauma_burn_age": {
          "type": "TEXT"
        },
        "trauma_burn_method": {
          "type": "TEXT"
        },
        "trauma_burn_body_parts": {
          "type": "TEXT"
        },
        "gi_assessed": {
          "type": "BOOLEAN"
        },
        "gi_soft": {
          "type": "BOOLEAN"
        },
        "gi_flat": {
          "type": "BOOLEAN"
        },
        "gi_non_distended": {
          "type": "BOOLEAN"
        },
        "gi_non_tender": {
          "type": "BOOLEAN"
        },
        "gi_rebound": {
          "type": "BOOLEAN"
        },
        "gi_pain_location": {
          "type": "TEXT"
        },
        "gi_obese": {
          "type": "BOOLEAN"
        },
        "gi_last_bm": {
          "type": "TEXT"
        },
        "gi_loi": {
          "type": "TEXT"
        },
        "gu_assessed": {
          "type": "BOOLEAN"
        },
        "gu_pain": {
          "type": "BOOLEAN"
        },
        "gu_frequency": {
          "type": "BOOLEAN"
        },
        "gu_hematuria": {
          "type": "BOOLEAN"
        },
        "gu_incontinence": {
          "type": "BOOLEAN"
        },
        "gu_bladder_distention": {
          "type": "BOOLEAN"
        },
        "gu_urinary_urgency": {
          "type": "BOOLEAN"
        },
        "gu_last_void": {
          "type": "TEXT"
        },
        "gyn_assessed": {
          "type": "BOOLEAN"
        },
        "gyn_gravid": {
          "type": "INTEGER"
        },
        "gyn_term": {
          "type": "INTEGER"
        },
        "gyn_para": {
          "type": "INTEGER"
        },
        "gyn_abortia": {
          "type": "INTEGER"
        },
        "gyn_live": {
          "type": "INTEGER"
        },
        "gyn_last_menstruation": {
          "type": "TEXT"
        },
        "gyn_discharge": {
          "type": "BOOLEAN"
        },
        "gyn_substance": {
          "type": "TEXT"
        },
        "gyn_pregnant": {
          "type": "TEXT"
        },
        "gyn_edc": {
          "type": "TEXT"
        },
        "gyn_gestation_known": {
          "type": "BOOLEAN"
        },
        "gyn_gest_weeks": {
          "type": "INTEGER"
        },
        "gyn_membrane_intact": {
          "type": "BOOLEAN"
        },
        "gyn_time_ruptured": {
          "type": "TEXT"
        },
        "gyn_fluid": {
          "type": "TEXT"
        },
        "gyn_expected_babies": {
          "type": "INTEGER"
        },
        "gyn_fetal_mvmt": {
          "type": "BOOLEAN"
        },
        "gyn_last_mvmt": {
          "type": "TEXT"
        },
        "gyn_mvmt_per_hr": {
          "type": "INTEGER"
        },
        "gyn_contractions": {
          "type": "BOOLEAN"
        },
        "gyn_contraction_duration": {
          "type": "TEXT"
        },
        "gyn_contraction_separation": {
          "type": "TEXT"
        },
        "field_delivery_assessed": {
          "type": "BOOLEAN"
        },
        "field_delivery_presentation": {
          "type": "TEXT"
        },
        "field_delivery_time": {
          "type": "TEXT"
        },
        "field_delivery_meconium": {
          "type": "TEXT"
        },
        "field_delivery_cord_cut_length": {
          "type": "INTEGER"
        },
        "field_delivery_apgar1": {
          "type": "TEXT"
        },
        "field_delivery_apgar5": {
          "type": "TEXT"
        },
        "field_delivery_stimulation": {
          "type": "BOOLEAN"
        },
        "field_delivery_stimulation_type": {
          "type": "TEXT"
        },
        "field_delivery_placenta": {
          "type": "BOOLEAN"
        },
        "field_delivery_placenta_time": {
          "type": "TEXT"
        },
        "field_delivery_placenta_intact": {
          "type": "BOOLEAN"
        },
        "muscular_assessed": {
          "type": "BOOLEAN"
        },
        "muscular_has_complaint": {
          "type": "BOOLEAN"
        },
        "muscular_complaint": {
          "type": "TEXT"
        },
        "invasive_airway_assessed": {
          "type": "BOOLEAN"
        },
        "invasive_airway_secured": {
          "type": "BOOLEAN"
        },
        "invasive_airway_device": {
          "type": "TEXT"
        },
        "invasive_airway_size": {
          "type": "FLOAT"
        },
        "invasive_airway_cuffed": {
          "type": "BOOLEAN"
        },
        "invasive_airway_inflation": {
          "type": "INTEGER"
        },
        "invasive_airway_technique": {
          "type": "TEXT"
        },
        "invasive_airway_distance": {
          "type": "INTEGER"
        },
        "invasive_airway_attempts": {
          "type": "INTEGER"
        },
        "spinal_assessed": {
          "type": "BOOLEAN"
        },
        "spinal_manual": {
          "type": "BOOLEAN"
        },
        "spinal_c_collar": {
          "type": "BOOLEAN"
        },
        "spinal_collar_size": {
          "type": "TEXT"
        },
        "spinal_backboard": {
          "type": "TEXT"
        },
        "spinal_transferred_by": {
          "type": "TEXT"
        },
        "spinal_secured_with": {
          "type": "TEXT"
        },
        "signature_assessed": {
          "type": "BOOLEAN"
        },
        "signature_practitioner_name": {
          "type": "TEXT"
        },
        "signature_practitioner": {
          "type": "TEXT"
        },
        "signature_patient_name": {
          "type": "TEXT"
        },
        "signature_patient": {
          "type": "TEXT"
        },
        "signature_hospital_name": {
          "type": "TEXT"
        },
        "signature_hospital": {
          "type": "TEXT"
        },
        "signature_witness_name": {
          "type": "TEXT"
        },
        "signature_witness": {
          "type": "TEXT"
        },
        "no_signature": {
          "type": "BOOLEAN"
        },
        "no_signature_reason": {
          "type": "TEXT"
        },
        "call_info_assessed": {
          "type": "BOOLEAN"
        },
        "call_info_attendant1": {
          "type": "TEXT"
        },
        "call_info_attendant1_other": {
          "type": "TEXT"
        },
        "call_info_attendant2": {
          "type": "TEXT"
        },
        "call_info_attendant2_other": {
          "type": "TEXT"
        },
        "call_info_driver": {
          "type": "TEXT"
        },
        "call_info_driver_other": {
          "type": "TEXT"
        },
        "call_info_unit_nb": {
          "type": "TEXT"
        },
        "call_info_run_nb": {
          "type": "TEXT"
        },
        "call_info_respond_to": {
          "type": "TEXT"
        },
        "call_info_milage_start": {
          "type": "INTEGER"
        },
        "call_info_milage_end": {
          "type": "INTEGER"
        },
        "call_info_code_en_route": {
          "type": "TEXT"
        },
        "call_info_code_return": {
          "type": "TEXT"
        },
        "call_info_transported_to": {
          "type": "TEXT"
        },
        "call_info_transported_position": {
          "type": "TEXT"
        },
        "call_info_time": {
          "type": "TEXT"
        },
        "call_info_ppe": {
          "type": "TEXT"
        },
        "call_info_determinant": {
          "type": "TEXT"
        },
        "call_info_assistance": {
          "type": "TEXT"
        },
        "call_info_assistance_other": {
          "type": "TEXT"
        },
        "no_transport_assessed": {
          "type": "BOOLEAN"
        },
        "no_transport_mentally_capable": {
          "type": "BOOLEAN"
        },
        "no_transport_should_transport": {
          "type": "BOOLEAN"
        },
        "no_transport_risk_informed": {
          "type": "BOOLEAN"
        },
        "no_transport_reason": {
          "type": "TEXT"
        },
        "no_transport_reason_other": {
          "type": "TEXT"
        },
        "no_transport_left_with": {
          "type": "TEXT"
        },
        "no_transport_left_with_other": {
          "type": "TEXT"
        },
        "no_transport_consult_with": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "vitals",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "hr": {
          "type": "INTEGER"
        },
        "sys": {
          "type": "INTEGER"
        },
        "dia": {
          "type": "INTEGER"
        },
        "fio2": {
          "type": "FLOAT"
        },
        "spo2": {
          "type": "FLOAT"
        },
        "resp": {
          "type": "INTEGER"
        },
        "level_of_c": {
          "type": "TEXT"
        },
        "perrl": {
          "type": "BOOLEAN"
        },
        "left_eye": {
          "type": "INTEGER"
        },
        "right_eye": {
          "type": "INTEGER"
        },
        "eyes_responsive": {
          "type": "BOOLEAN"
        },
        "bgl": {
          "type": "FLOAT"
        },
        "bgl_unit": {
          "type": "TEXT"
        },
        "temp": {
          "type": "FLOAT"
        },
        "temp_unit": {
          "type": "TEXT"
        },
        "etco2": {
          "type": "FLOAT"
        },
        "etco2_unit": {
          "type": "TEXT"
        },
        "pain": {
          "type": "INTEGER"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "neuro",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "assessed": {
          "type": "BOOLEAN"
        },
        "avpu": {
          "type": "TEXT"
        },
        "gcs": {
          "type": "BOOLEAN"
        },
        "gcs_eyes": {
          "type": "INTEGER"
        },
        "gcs_verbal": {
          "type": "INTEGER"
        },
        "gcs_motor": {
          "type": "INTEGER"
        },
        "luxr": {
          "type": "TEXT"
        },
        "ruxr": {
          "type": "TEXT"
        },
        "llxr": {
          "type": "TEXT"
        },
        "rlxr": {
          "type": "TEXT"
        },
        "suspect_stroke": {
          "type": "BOOLEAN"
        },
        "facial_droop": {
          "type": "BOOLEAN"
        },
        "facial_droop_side": {
          "type": "TEXT"
        },
        "arm_drift": {
          "type": "BOOLEAN"
        },
        "arm_drift_side": {
          "type": "TEXT"
        },
        "speech": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "airway_basic",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "oxygen_volume": {
          "type": "FLOAT"
        },
        "basic_maneuvers": {
          "type": "TEXT"
        },
        "opa": {
          "type": "TEXT"
        },
        "npa": {
          "type": "TEXT"
        },
        "bvm": {
          "type": "BOOLEAN"
        },
        "airway_rate": {
          "type": "FLOAT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "airway_ventilator",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "control": {
          "type": "TEXT"
        },
        "mode": {
          "type": "TEXT"
        },
        "rate": {
          "type": "FLOAT"
        },
        "tidal_volume": {
          "type": "FLOAT"
        },
        "inspiration_time": {
          "type": "FLOAT"
        },
        "inspiration_ratio": {
          "type": "FLOAT"
        },
        "expiration_ratio": {
          "type": "FLOAT"
        },
        "fiO2": {
          "type": "FLOAT"
        },
        "peep": {
          "type": "FLOAT"
        },
        "sensitivity": {
          "type": "FLOAT"
        },
        "expiration_pressure": {
          "type": "FLOAT"
        },
        "expiration_tidal_volume": {
          "type": "FLOAT"
        },
        "max_inspiration_pressure": {
          "type": "FLOAT"
        },
        "plateau_pressure": {
          "type": "FLOAT"
        },
        "pressure_support": {
          "type": "FLOAT"
        },
        "high_pressure_limit": {
          "type": "FLOAT"
        },
        "low_pressure_limit": {
          "type": "FLOAT"
        },
        "low_min_volume": {
          "type": "FLOAT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "airway_cpap_bipap",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "device": {
          "type": "TEXT"
        },
        "size": {
          "type": "FLOAT"
        },
        "fiO2": {
          "type": "FLOAT"
        },
        "peep": {
          "type": "FLOAT"
        },
        "pressure": {
          "type": "FLOAT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "airway_suction",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "duration": {
          "type": "INTEGER"
        },
        "amount": {
          "type": "INTEGER"
        },
        "tip": {
          "type": "INTEGER"
        },
        "size": {
          "type": "INTEGER"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "iv_io",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "site": {
          "type": "TEXT"
        },
        "side": {
          "type": "TEXT"
        },
        "gauge": {
          "type": "TEXT"
        },
        "attempts": {
          "type": "INTEGER"
        },
        "successful": {
          "type": "BOOLEAN"
        },
        "fluid": {
          "type": "TEXT"
        },
        "fluid_other": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "splinting",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "location": {
          "type": "TEXT"
        },
        "side": {
          "type": "TEXT"
        },
        "sensation_prior": {
          "type": "BOOLEAN"
        },
        "sensation_post": {
          "type": "BOOLEAN"
        },
        "traction_applied": {
          "type": "BOOLEAN"
        },
        "splinting_type": {
          "type": "TEXT"
        },
        "splinting_type_other": {
          "type": "TEXT"
        },
        "position_found": {
          "type": "TEXT"
        },
        "position_found_other": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "medication",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "medication_type": {
          "type": "TEXT"
        },
        "medication": {
          "type": "TEXT"
        },
        "medication_other": {
          "type": "TEXT"
        },
        "dose": {
          "type": "FLOAT"
        },
        "dose_unit": {
          "type": "TEXT"
        },
        "route": {
          "type": "TEXT"
        },
        "route_other": {
          "type": "TEXT"
        },
        "indication": {
          "type": "TEXT"
        },
        "administrated": {
          "type": "TEXT"
        },
        "administrated_other": {
          "type": "TEXT"
        },
        "same_dose": {
          "type": "INTEGER"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "in_out",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "direction": {
          "type": "TEXT"
        },
        "volume": {
          "type": "INTEGER"
        },
        "substance": {
          "type": "TEXT"
        },
        "substance_other": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "ecg",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "leads_nb": {
          "type": "BOOLEAN"
        },
        "rhythm": {
          "type": "TEXT"
        },
        "regular": {
          "type": "BOOLEAN"
        },
        "bbb": {
          "type": "BOOLEAN"
        },
        "bbb_side": {
          "type": "TEXT"
        },
        "st_changes": {
          "type": "BOOLEAN"
        },
        "st_elevation_list": {
          "type": "TEXT"
        },
        "st_depression_list": {
          "type": "TEXT"
        },
        "pacs": {
          "type": "BOOLEAN"
        },
        "pvcs": {
          "type": "BOOLEAN"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "settings",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "first_name": {
          "type": "TEXT"
        },
        "last_name": {
          "type": "TEXT"
        },
        "identification": {
          "type": "TEXT"
        },
        "position": {
          "type": "TEXT"
        },
        "work_place": {
          "type": "TEXT"
        },
        "send_report_to": {
          "type": "TEXT"
        },
        "export": {
          "type": "TEXT"
        },
        "partners": {
          "type": "TEXT"
        },
        "photo": {
          "type": "TEXT"
        }
      }
   },
    {
      "name": "narrative",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "narration": {
          "type": "TEXT"
        },
        "created": {
          "type": "TIMESTAMP",
          "null": "NOT NULL",
          "default": "CURRENT_TIMESTAMP"
        }
      }
   },
    {
      "name": "code",
      "columns": {
        "id": {
          "type": "INTEGER",
          "null": "NOT NULL",
          "primary": true,
          "auto_increment": true
        },
        "report_id": {
          "type": "INTEGER",
          "null": "NOT NULL"
        },
        "code": {
          "type": "TEXT"
        },
        "time": {
          "type": "TEXT"
        }
      }
    }
]
});