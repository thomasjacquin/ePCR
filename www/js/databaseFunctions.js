angular.module("database", ['angular-websql', 'ePCR.config'])

.factory('database', function($webSql, DB_CONFIG) {
  
  return {
    create: function() {
      console.log("Creating database tables");
      db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
      console.log("Creating database tables");
       angular.forEach(DB_CONFIG.tables, function(table) {
            db.createTable(table.name, table.columns);
            console.log('Table ' + table.name + ' initialized');
        });
    }
  }
    
});

///***********************************************************************************/
///* 							Create New tables 								*/
///***********************************************************************************/
//
//function createPCRtables(db){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS patients ' +
//			 ' (id TEXT NOT NULL PRIMARY KEY, ' +
//			 ' last_name TEXT NOT NULL, first_name TEXT NOT NULL, ' + 
//			 ' get_DOB BOOL, date_of_birth TEXT NOT NULL, ' +
//			 ' gender BOOL, weight DECIMAL(3,1), weight_unit BOOL, ' +
//			 ' street TEXT, city TEXT, province TEXT, contact BOOL,' +
//			 ' phone_home TEXT, phone_work TEXT, phone_cell TEXT, phone_message TEXT, ' +
//			 ' insurance TEXT, mrn TEXT, next_of_kin TEXT, nok_phone TEXT, pt_number INTEGER, of_number INTEGER, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS vitals ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' hr INTEGER, sys INTEGER, dia INTEGER, fio2 TEXT, spo2 INTEGER, ' +
//			 ' resp INTEGER, level_of_c TEXT, perrl BOOL, left_eye INTEGER, responsive BOOL, right_eye INTEGER, ' +
//			 ' bgl DECIMAL(3,1), bgl_unit BOOL, temp DECIMAL(3,1), temp_unit BOOL, etco2 INTEGER, ' +
//			 ' pain INTEGER, time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS chief_complaint ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, primary_complaint TEXT, primary_other TEXT, secondary_complaint TEXT, diff_breathing TEXT, chest_pain TEXT, nausea TEXT, vomiting TEXT, ' +
//			 ' diarrhea TEXT, dizziness TEXT, headache TEXT, loc TEXT, numb_tingling TEXT, ' +
//			 ' gal_weakness TEXT, lethargy TEXT, neck_pain TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS patient_hx ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, assessed BOOL, allergies TEXT, custom_allergies TEXT, ' + 
//			 ' conditions TEXT, custom_conditions TEXT, medications TEXT, custom_medications TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS neuro ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, avpu TEXT, gcs BOOL, eyes INTEGER, verbal INTEGER, ' +
//			 ' motor INTEGER, luxr BOOL, ruxr BOOL, llxr BOOL, rlxr BOOL, ' +
//			 ' suspect_stroke BOOL, facial_droop BOOL, facial_droop_side TEXT, ' +
//			 ' arm_drift BOOL, arm_drift_side TEXT, speech TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS abc ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, open_patent BOOL, tracheal_deviation BOOL, tracheal_deviation_side BOOL, interventions BOOL, ' +
//			 ' breathing_type TEXT, laboured BOOL, effective BOOL, accessory_muscle BOOL, nasal_flare BOOL, ' +
//			 ' cough BOOL, productive BOOL, subcut_emph BOOL, flailed_chest BOOL, flailed_chest_side BOOL, suspect_pneu BOOL, ' +
//			 ' suspect_hemo BOOL, ctax4 BOOL, ul_sound TEXT, ur_sound TEXT, ll_sound TEXT, lr_sound TEXT, ' +
//			 ' pulse_location TEXT, pulse_regularity BOOL, pulse_quality TEXT, jvd BOOL, cap_refill BOOL, ' +
//			 ' skin TEXT, abctemp TEXT, dry BOOL, heart_tones TEXT, heart_tones_quality TEXT, peripheral_edema BOOL, ' +
//			 ' peripheral_edema_location TEXT, edema_severity TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS trauma ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' isTrauma BOOL, time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS trauma_auto ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, assessed BOOL, ' +
//			 ' car TEXT, seat TEXT, seatbelt BOOL, airbag BOOL, helmet BOOL, leathers BOOL, ' +
//			 ' nb_occupants INTEGER, approx_speed INTEGER, speed_unit TEXT, removed_by TEXT, per TEXT, photo TEXT,' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS trauma_penetrating ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, assessed BOOL, ' +
//			 ' assault BOOL, moi TEXT, velocity TEXT, bleeding BOOL, controlled BOOL, head BOOL, neck BOOL, chest BOOL, abd BOOL, ' +
//			 ' pelvis BOOL, ulxr BOOL, urxr BOOL, llxr BOOL, lrxr BOOL, back BOOL, photo TEXT,' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS trauma_blunt ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, assessed BOOL, ' +
//			 ' assault BOOL, moi TEXT, bleeding BOOL, controlled BOOL, head BOOL, neck BOOL, chest BOOL, abd BOOL, ' +
//			 ' pelvis BOOL, ulxr BOOL, urxr BOOL, llxr BOOL, lrxr BOOL, back BOOL, photo TEXT,' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS trauma_fall ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, assessed BOOL, ' +
//			 ' assault BOOL, distance INTEGER, distance_unit TEXT, surface TEXT, loss_of_c BOOL, ' +
//			 ' loss_of_c_time DECIMAL(3,1), bleeding BOOL, controlled BOOL,' +
//			 ' head BOOL, neck BOOL, chest BOOL, abd BOOL, ' +
//			 ' pelvis BOOL, ulxr BOOL, urxr BOOL, llxr BOOL, lrxr BOOL, back BOOL, photo TEXT,' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS trauma_burn ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, assessed BOOL, ' +
//			 ' head_front INTEGER, head_back INTEGER, chest INTEGER, abdomen INTEGER, upper_back INTEGER, lower_back INTEGER, ' +
//			 ' ulx_up_front INTEGER, ulx_low_front INTEGER, ulx_up_back INTEGER, ulx_low_back INTEGER, ' +
//			 ' urx_up_front INTEGER, urx_low_front INTEGER, urx_up_back INTEGER, urx_low_back INTEGER, ' +
//			 ' llx_up_front INTEGER, llx_low_front INTEGER, llx_up_back INTEGER, llx_low_back INTEGER, ' +
//			 ' lrx_up_front INTEGER, lrx_low_front INTEGER, lrx_up_back INTEGER, lrx_low_back INTEGER, ' + 
//			 ' total_surface INTEGER, body_type TEXT, photo TEXT,' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS gi_gu ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' gi_assessed BOOL, flat BOOL, soft BOOL, tender BOOL, rebound BOOL, ' +
//			 ' luq BOOL, ruq BOOL, llq BOOL, rlq BOOL, epigastric BOOL, ' +
//			 ' suprapubic BOOL, obese BOOL, last_bm TEXT, loi TEXT, gu_assessed BOOL, ' +
//			 ' pain BOOL, frequency BOOL, hematuria BOOL, incontinence BOOL, bladder_distention BOOL, ' +
//			 ' urinary_urgency BOOL, last_void TEXT, gyn_assessed BOOL, gravid INTEGER, term INTEGER, ' +
//			 ' para INTEGER, abortia INTEGER, live INTEGER, last_menstruation TEXT, discharge BOOL, substance TEXT, pregnant TEXT, edc TEXT, ' +
//			 ' gestation_known BOOL, gest_weeks TEXT, membr_intact BOOL, time_ruptured TEXT, fluid TEXT, expected_babies INTEGER, fetal_mvmt BOOL, last_mvmt TEXT,' +
//			 ' mvmt_per_hr INTEGER, contractions BOOL, contraction_duration INTEGER, contraction_separation INTEGER, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS field_delivery ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, assessed BOOL, ' +
//			 ' presentation TEXT, delivery_time TEXT, meconium TEXT, cord_length INTEGER, apgar1 INTEGER, apgar5 INTEGER, stimulation BOOL, ' +
//			 ' stimulation_type TEXT, placenta BOOL, placenta_time TEXT, placenta_intact BOOL, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS apgar ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' appearance1 TEXT, pulse1 TEXT, grimace1 TEXT, activity1 TEXT, respirations1 TEXT, total1 INTEGER, time1 TEXT, ' +
//			 ' appearance5 TEXT, pulse5 TEXT, grimace5 TEXT, activity5 TEXT, respirations5 TEXT, total5 INTEGER, time5 TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS muscular_skeletal ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, nocomplaint BOOL, muscular TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS airway ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' oxygen INTEGER, basic_maneuvers TEXT, opa TEXT, npa TEXT, bvm BOOL, rate INTEGER, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS invasive_airway ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, secured BOOL, device TEXT, distance INTEGER, size DECIMAL(2,1), cuffed BOOL, inflation INTEGER, bvm BOOL, attempts INTEGER, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS ventilator ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' vented BOOL, control BOOL, mode BOOL, rate INTEGER, tidal_v INTEGER, insp_time INTEGER, i_ratio INTEGER, e_ratio INTEGER, ' +
//			 ' fiO2 INTEGER, peep INTEGER, sensitivity INTEGER, expir_p INTEGER, expir_tidal_v INTEGER, max_insp_p INTEGER, ' +
//			 ' plateau_p INTEGER, p_support INTEGER, high_p_lim INTEGER, low_p_lim INTEGER, low_min_v INTEGER, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS cpap_bipap ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' device BOOL, size INTEGER, fiO2 INTEGER, peep INTEGER, pressure INTEGER, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS suction ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' suction BOOL, duration INTEGER, amount INTEGER, tip INTEGER, size INTEGER, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS iv_io ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' site BOOL, side BOOL, gauge TEXT, attempts INTEGER, successful BOOL, fluid TEXT, fluid_other TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS splinting ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' location TEXT, side BOOL, prior BOOL, post BOOL, traction BOOL, type TEXT, type_other TEXT, position TEXT, position_other TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS medication ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' isGeneric BOOL, medication TEXT, medic_other TEXT, dose DECIMAL(4,2), dose_unit TEXT, route TEXT, route_other TEXT, ' +
//			 ' indication TEXT, admin TEXT, admin_other TEXT, same_dose INTEGER, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS c_spine ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, manual BOOL, c_collar BOOL, size TEXT, backboard TEXT, transferred TEXT, secured TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS in_out ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' intake_volume INTEGER, intake_substance TEXT, intake_other TEXT, outtake_volume INTEGER, outtake_substance TEXT, outtake_other TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS ecg ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' leads_nb BOOL, rhythm TEXT, regular BOOL, bbb BOOL, bbb_side BOOL, st_changes BOOL, bi TEXT, bii TEXT, biii TEXT, ' +
//			 ' bavr TEXT, bavl TEXT, bavf TEXT, bv1 TEXT, bv2 TEXT, bv3 TEXT, bv4 TEXT, bv5 TEXT, bv6 TEXT, ' +
//			 ' ecg_pacs BOOL, ecg_pvcs BOOL, photo TEXT,' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS signatures ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, sigPractitionerText TEXT, sigPatientText TEXT, noSign BOOL, reason TEXT, sigHospReprText TEXT, sigWitnessText TEXT, ' +
//			 ' sigPractitioner TEXT, sigPatient TEXT, sigHospRepr TEXT, sigWitness TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS call_info ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, attendant1 TEXT, attendant1_other TEXT, attendant2 TEXT, attendant2_other TEXT, driver TEXT, driver_other TEXT, ' + 
//			 ' unit_nb TEXT, run_nb TEXT, respond TEXT, milage_start INTEGER, ' +
//			 ' milage_end INTEGER, code_en_route TEXT, code_return TEXT, transported_to TEXT, transported_position TEXT, ' +
//			 ' time_notified TEXT, time_route TEXT, time_on_scene TEXT, time_depart TEXT, time_destination TEXT, ' +
//			 ' time_transfer TEXT, time_back_service TEXT, time_patient_contact TEXT, ppe_gloves BOOL, ppe_eyes BOOL, ppe_reflective BOOL, ' +
//			 ' ppe_isolation BOOL, ppe_mask BOOL, det1 TEXT, det2 TEXT, det3 TEXT, assistance TEXT, other TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS no_transport ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' assessed BOOL, mentally_capable BOOL, should_trans BOOL, informed BOOL, reason TEXT, reason_other TEXT, ' +
//			 ' left_with TEXT, left_with_other TEXT, consult_with TEXT, ' +  
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS narrative ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' narration TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql('CREATE TABLE IF NOT EXISTS code ' +
//			 ' (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, patient TEXT NOT NULL, ' +
//			 ' code_name TEXT, ' +
//			 ' time TEXT );'
//			 );
//		}
//	);
//}
//
///***********************************************************************************/
///* 							Create Dummy Entries 								*/
///***********************************************************************************/
//function createDummyEntries(){
//	createChiefComplaintEntry();
//	createPatientHxEntry();
//	createNeuroEntry();
//	createABCEntry();
//	createTraumaEntry();
//	createAutoTraumaEntry();
//	createPenetratingTraumaEntry();
//	createBluntTraumaEntry();
//	createFallTraumaEntry();
//	createBurnTraumaEntry();
//	createGiGuEntry();
//	createFieldDeliveryEntry();
//	createApgarEntry();
//	createMuscularEntry();
//	createInvasiveAirwayEntry();
//	createSMREntry();
//	createSignatureDBEntry();			
//	createCallInfoEntry();
//	createNoTransportEntry();		
//}
//
///***********************************************************************************/
///* 						Create a dummy Chief Complaint				*/
///***********************************************************************************/
//function createChiefComplaintEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO chief_complaint (patient, assessed, primary_complaint, primary_other, secondary_complaint, diff_breathing, chest_pain, nausea, vomiting, diarrhea, dizziness, ' +
//				' headache, loc, numb_tingling, gal_weakness, lethargy, neck_pain, time) ' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '', getSystemTime()],      
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Patient HX									*/
///***********************************************************************************/
//function createPatientHxEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO patient_hx (patient, assessed, allergies, custom_allergies, conditions, custom_conditions, medications, custom_medications, time) ' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', '', '', '', '', '', '', getSystemTime()],      
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 								Create a dummy Neuro								*/
///***********************************************************************************/
//function createNeuroEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO neuro (patient, assessed, avpu, gcs, eyes, verbal, motor, luxr, ruxr, llxr, rlxr, suspect_stroke, ' +
//				' facial_droop, facial_droop_side, arm_drift, arm_drift_side, speech, time) ' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', '0', 'true', '0', '0', '0', 'negative', 'negative', 'negative', 'negative', 'false', 'false', 'true', 'false', 'true', '0', getSystemTime()],      
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
//
///***********************************************************************************/
///* 								Create a dummy ABC									*/
///***********************************************************************************/
//function createABCEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(			
//				'INSERT INTO abc (patient, assessed, open_patent, tracheal_deviation, tracheal_deviation_side, interventions, ' +  //5
//				' breathing_type, laboured, effective, accessory_muscle, nasal_flare, ' +		//5
//				' cough, productive, subcut_emph, flailed_chest, flailed_chest_side, suspect_pneu, ' + //6
//				' suspect_hemo, ctax4, ul_sound, ur_sound, ll_sound, lr_sound, ' +			//5
//				' pulse_location, pulse_regularity, pulse_quality, jvd, cap_refill, ' +			//5
//				' skin, abctemp, dry, heart_tones, heart_tones_quality, peripheral_edema, ' +		//6
//				' peripheral_edema_location, edema_severity, time) ' +		//3
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', 'true', 'false', 'true', 'false', '0', 'false', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'true', 'false', 'false',  //18
//				'false','0', '0', '0', '0', '0', 'true', '0', 'false', 'true', '0', '0', 'true', '0', '0', 'false', '0', '0', getSystemTime()],      
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 							Create a dummy Trauma									*/
///***********************************************************************************/
//function createTraumaEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(			
//				'INSERT INTO trauma (patient, isTrauma) VALUES (?, ?);', 
//				[getCurrentPatientId(), 'false'],
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Auto Trauma									*/
///***********************************************************************************/
//function createAutoTraumaEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(			
//				'INSERT INTO trauma_auto (patient, assessed, car, seat, seatbelt, airbag, helmet, leathers, nb_occupants, approx_speed, ' +
//				'speed_unit, per, removed_by, photo, time)' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', 'true', '', 'true', 'true', 'true', 'true', '', '', 'true', '0', '0', '', getSystemTime()],
// 				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Penetrating Trauma							*/
///***********************************************************************************/
//function createPenetratingTraumaEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(			
//				'INSERT INTO trauma_penetrating (patient, assessed, assault, moi, velocity, bleeding, controlled, head, neck, chest, abd, ' +
//				' pelvis, ulxr, urxr, llxr, lrxr, back, photo, time)' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', 'false', '', 'false', 'false', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false',
//				'false', '', getSystemTime()], 
// 				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Blunt Trauma									*/
///***********************************************************************************/
//function createBluntTraumaEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(			
//				'INSERT INTO trauma_blunt (patient, assessed, assault, moi, bleeding, controlled, head, neck, chest, abd, ' +
//				' pelvis, ulxr, urxr, llxr, lrxr, back, photo, time)' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', 'false', '', 'false', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false',
//				'false', '', getSystemTime()], 
// 				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Fall Trauma									*/
///***********************************************************************************/
//function createFallTraumaEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(			
//				'INSERT INTO trauma_fall (patient, assessed, assault, distance, distance_unit, surface, loss_of_c, loss_of_c_time, ' +
//				' bleeding, controlled, head, neck, chest, abd, ' +
//				' pelvis, ulxr, urxr, llxr, lrxr, back, photo, time)' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', 'false', '', 'false', '', 'false', '', 'false', 'true', 'false', 'false', 'false', 'false', 'false',
//				'false', 'false', 'false', 'false', 'false', '', getSystemTime()], 
// 				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Burn Entry				*/
///***********************************************************************************/
//function createBurnTraumaEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO trauma_burn (patient, assessed, head_front, head_back, chest, abdomen, upper_back, lower_back, ' +
//				' ulx_up_front, ulx_low_front, ulx_up_back, ulx_low_back, urx_up_front, urx_low_front, urx_up_back, urx_low_back, ' +
//				' llx_up_front, llx_low_front, llx_up_back, llx_low_back, lrx_up_front, lrx_low_front, lrx_up_back, lrx_low_back, ' +
//				' total_surface, body_type, photo, time)' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'adult', '', getSystemTime()], 
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
//
///***********************************************************************************/
///* 						Create a dummy GIGU Entry				*/
///***********************************************************************************/
//function createGiGuEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO gi_gu (patient, gi_assessed, flat, soft, tender, rebound, luq, ruq, llq, rlq, epigastric, suprapubic, ' + //12
//				' obese, last_bm, loi, gu_assessed, pain, frequency, hematuria, incontinence, bladder_distention, urinary_urgency, last_void, ' +//11
//				' gyn_assessed, gravid, term, para, abortia, live, last_menstruation, discharge, substance, pregnant, edc, gestation_known, gest_weeks, ' + //12
//				' membr_intact, time_ruptured, fluid, expected_babies, fetal_mvmt, last_mvmt, mvmt_per_hr, contractions, contraction_duration, ' +
//				' contraction_separation, time )' + //4
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', 'true', 'true', 'true', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', '', '', 'false', 'false',
//				'false', 'false', 'false', 'false', 'false', '', 'false', '', '', '', '', '', '', 'false', '', '0', '', 'true', '',
//				'true', '', '', '', 'false', '', '', 'false', '', '', getSystemTime()], 
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Field Delivery Entry				*/
///***********************************************************************************/
//function createFieldDeliveryEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO field_delivery (patient, assessed, presentation, delivery_time, meconium, cord_length, apgar1, apgar5, stimulation, ' +
//				' stimulation_type, placenta, placenta_time, placenta_intact, time )' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', '0', '', '', '', '1 Minute', '5 Minutes', 'false', '', 'true', '',
//				'true', getSystemTime()],
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy APGAR Entry				*/
///***********************************************************************************/
//function createApgarEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO apgar (patient, appearance1, pulse1, grimace1, activity1, respirations1, total1, time1, ' +
//				' appearance5, pulse5, grimace5, activity5, respirations5, total5, time5)' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '0', '0', ''],
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Muscular Entry				*/
///***********************************************************************************/
//function createMuscularEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO muscular_skeletal (patient, assessed, nocomplaint, muscular)' +
//				' VALUES (?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', true, ''], 
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy Invasive Airway				*/
///***********************************************************************************/
//function createInvasiveAirwayEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO invasive_airway (patient, assessed, secured, device, distance, size, cuffed, inflation, bvm, attempts, time)' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', true, '0', '', '', true, '', true, '', getSystemTime()],
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Create a dummy SMR Airway				*/
///***********************************************************************************/
//function createSMREntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO c_spine (patient, assessed, manual, c_collar, size, backboard, transferred, secured, time)' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', true, true, '0', '0', '0', '0', getSystemTime()], 
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						create a dummy signatures									*/
///***********************************************************************************/
//function createSignatureDBEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO signatures (patient, assessed, sigPractitionerText, sigPatientText, noSign, reason, ' + 
//				'sigHospReprText, sigWitnessText, sigPractitioner, sigPatient, sigHospRepr, sigWitness, time) ' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', '', '', 'false', '0', '', '', '', '', '', '', getSystemTime()],    
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						create a dummy Call Info Entry									*/
///***********************************************************************************/
//function createCallInfoEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO call_info (patient, assessed, attendant1, attendant1_other, attendant2, attendant2_other, driver, driver_other, ' +
//				' unit_nb, run_nb, respond, milage_start, milage_end, ' + //13
//				' code_en_route, code_return, transported_to, transported_position, time_notified, time_route, time_on_scene, ' + //20
//				' time_depart, time_destination, time_transfer, time_back_service, time_patient_contact, ppe_gloves, ppe_eyes, ppe_reflective, ' +
//				' ppe_isolation, ppe_mask, det1, det2, det3, assistance, other, time)' + //36
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', '0', '', '0', '', '0', '', '', '', '', '', '', '', '',
//				'', '0', '', '', '', '', '', '', '', '', 'negative', //23
//				'negative', 'negative', 'negative', 'negative', '', '0', '', '0', '', getSystemTime()],     
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						create a dummy No Transport Entry									*/
///***********************************************************************************/
//function createNoTransportEntry(){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'INSERT INTO no_transport (patient, assessed, mentally_capable, should_trans, informed, reason, reason_other, ' +
//				' left_with, left_with_other, consult_with, time) ' +
//				' VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);', 
//				[getCurrentPatientId(), 'false', 'true', 'true', 'true', '0', '', '0', '', '', getSystemTime()],  
//				null,
//				errorHandler
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 						Delete DB									*/
///***********************************************************************************/
//function dropPCRtables(){
//		dropTable('DROP TABLE IF EXISTS "patients"');				
//		dropTable('DROP TABLE IF EXISTS "vitals"');	
//		dropTable('DROP TABLE IF EXISTS "chief_complaint"');		
//		dropTable('DROP TABLE IF EXISTS "patient_hx"');				
//		dropTable('DROP TABLE IF EXISTS "neuro"');			
//		dropTable('DROP TABLE IF EXISTS "abc"');			
//		dropTable('DROP TABLE IF EXISTS "trauma"');				
//		dropTable('DROP TABLE IF EXISTS "trauma_auto"');				
//		dropTable('DROP TABLE IF EXISTS "trauma_blunt"');				
//		dropTable('DROP TABLE IF EXISTS "trauma_penetrating"');				
//		dropTable('DROP TABLE IF EXISTS "trauma_fall"');
//		dropTable('DROP TABLE IF EXISTS "trauma_burn"');
//		dropTable('DROP TABLE IF EXISTS "gi_gu"');
//		dropTable('DROP TABLE IF EXISTS "field_delivery"');
//		dropTable('DROP TABLE IF EXISTS "apgar"');
//		dropTable('DROP TABLE IF EXISTS "muscular_skeletal"');			
//		dropTable('DROP TABLE IF EXISTS "airway"');			
//		dropTable('DROP TABLE IF EXISTS "invasive_airway"');				
//		dropTable('DROP TABLE IF EXISTS "ventilator"');				
//		dropTable('DROP TABLE IF EXISTS "cpap_bipap"');
//		dropTable('DROP TABLE IF EXISTS "suction"');
//		dropTable('DROP TABLE IF EXISTS "iv_io"');				
//		dropTable('DROP TABLE IF EXISTS "splinting"');		
//		dropTable('DROP TABLE IF EXISTS "medication"');				
//		dropTable('DROP TABLE IF EXISTS "c_spine"');				
//		dropTable('DROP TABLE IF EXISTS "in_out"');	
//		dropTable('DROP TABLE IF EXISTS "ecg"');
//		dropTable('DROP TABLE IF EXISTS "signatures"');
//		dropTable('DROP TABLE IF EXISTS "call_info"');
//		dropTable('DROP TABLE IF EXISTS "no_transport"');
//		dropTable('DROP TABLE IF EXISTS "narrative"');
//		dropTable('DROP TABLE IF EXISTS "code"');
//}
//
//function emptyPCRtables(){
//		dropTable('DELETE FROM patients');				
//		dropTable('DELETE FROM vitals');	
//		dropTable('DELETE FROM chief_complaint');	
//		dropTable('DELETE FROM patient_hx');	
//		dropTable('DELETE FROM neuro');	
//		dropTable('DELETE FROM abc');	
//		dropTable('DELETE FROM trauma');	
//		dropTable('DELETE FROM trauma_auto');	
//		dropTable('DELETE FROM trauma_blunt');	
//		dropTable('DELETE FROM trauma_penetrating');	
//		dropTable('DELETE FROM trauma_fall');	
//		dropTable('DELETE FROM trauma_burn');	
//		dropTable('DELETE FROM gi_gu');	
//		dropTable('DELETE FROM field_delivery');	
//		dropTable('DELETE FROM apgar');	
//		dropTable('DELETE FROM muscular_skeletal');	
//		dropTable('DELETE FROM airway');	
//		dropTable('DELETE FROM invasive_airway');	
//		dropTable('DELETE FROM ventilator');	
//		dropTable('DELETE FROM cpap_bipap');	
//		dropTable('DELETE FROM suction');	
//		dropTable('DELETE FROM cpap_bipap');	
//		dropTable('DELETE FROM iv_io');	
//		dropTable('DELETE FROM splinting');	
//		dropTable('DELETE FROM medication');	
//		dropTable('DELETE FROM c_spine');	
//		dropTable('DELETE FROM in_out');	
//		dropTable('DELETE FROM ecg');	
//		dropTable('DELETE FROM signatures');	
//		dropTable('DELETE FROM call_info');	
//		dropTable('DELETE FROM no_transport');	
//		dropTable('DELETE FROM narrative');	
//		dropTable('DELETE FROM code');	
//}
//
//function deleteRelatedEntries(id){			
//		dropTable("DELETE FROM vitals WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM chief_complaint WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM patient_hx WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM neuro WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM abc WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM trauma WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM trauma_auto WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM trauma_blunt WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM trauma_penetrating WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM trauma_fall WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM trauma_burn WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM gi_gu WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM field_delivery WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM apgar WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM muscular_skeletal WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM airway WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM invasive_airway WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM ventilator WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM cpap_bipap WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM suction WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM cpap_bipap WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM iv_io WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM splinting WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM medication WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM c_spine WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM in_out WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM ecg WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM signatures WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM call_info WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM no_transport WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM narrative WHERE patient='" + id + "';");	
//		dropTable("DELETE FROM code WHERE patient='" + id + "';");	
//}
//
//function dropTable(query){
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				query,[],
//				null,
//				null
//			);
//		}
//	);
//}
//
//var _exportSql = new Array();
//
//
///***********************************************************************************/
///* 				Load sync page  					*/
///***********************************************************************************/
//function loadSync(){
//	// Hide the sync buttons
//	$('#sync_related').hide();
//	// Test the connexion type
//	testConnection();
//	// Build an array with insert requests from existing patients.
//	//exportPatients('');
//	// Clear the password field.
//	$('#sync_password').val(sessionStorage.syncPassword);
//	// Get the login back from localstorage.
//	$('#sync_login').val(localStorage.syncLogin);
//}
//
///***********************************************************************************/
///* 				Export all the patients  					*/
///***********************************************************************************/
//function exportPatients(owner){
//	
//	
//
//	_exportSql = [];
//	
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				'SELECT * FROM patients',
//				[],
//				function (transaction, result) {
//					var emptyList = true;
//					for (var i=0; i < result.rows.length; i++) {
//						var row = result.rows.item(i);
//						exportTables(row.id, owner);						
//					}
//				}
//			);
//		}
//	);
//	setTimeout(function(){
//			$('#exportsql').html(_exportSql.join(' '));
//		}, 10000
//	);
//}
//
///***********************************************************************************/
///* 				Export all the tables of a patient 					*/
///***********************************************************************************/
//function exportTables(id, owner){
//	
//	//New unique ID for a patient
//	var newId = UUID.generate();
//	
//	// If owner already exists, don't reassign an UUID
//	if (owner != '')
//		newId = '';
//
//	// Get all the tables
//	exportTable("patients",id,newId,owner);
//	exportTable("vitals",id,newId,owner);
//	exportTable("chief_complaint",id,newId,owner);		
//	exportTable("patient_hx",id,newId,owner);				
//	exportTable("neuro",id,newId,owner);			
//	exportTable("abc",id,newId,owner);			
//	exportTable("trauma",id,newId,owner);				
//	exportTable("trauma_auto",id,newId,owner);				
//	exportTable("trauma_blunt",id,newId,owner);				
//	exportTable("trauma_penetrating",id,newId,owner);				
//	exportTable("trauma_fall",id,newId,owner);
//	exportTable("trauma_burn",id,newId,owner);
//	exportTable("gi_gu",id,newId,owner);
//	exportTable("field_delivery",id,newId,owner);
//	exportTable("apgar",id,newId,owner);
//	exportTable("muscular_skeletal",id,newId,owner);			
//	exportTable("airway",id,newId,owner);			
//	exportTable("invasive_airway",id,newId,owner);				
//	exportTable("ventilator",id,newId,owner);				
//	exportTable("cpap_bipap",id,newId,owner);
//	exportTable("suction",id,newId,owner);
//	exportTable("iv_io",id,newId,owner);				
//	exportTable("splinting",id,newId,owner);		
//	exportTable("medication",id,newId,owner);				
//	exportTable("c_spine",id,newId,owner);				
//	exportTable("in_out",id,newId,owner);	
//	exportTable("ecg",id,newId,owner);
//	exportTable("signatures",id,newId,owner);
//	exportTable("call_info",id,newId,owner);
//	exportTable("no_transport",id,newId,owner);
//	exportTable("narrative",id,newId,owner);
//	exportTable("code",id,newId,owner);
//}
//
//
//
///***********************************************************************************/
///* 			Export a table  					*/
///***********************************************************************************/
//function exportTable(currentTableName, id, newId, owner){
//		
//	// Find the Patient's data
//	var query = "";
//	if (currentTableName != "patients")
//		query= "SELECT * FROM " + currentTableName + " WHERE patient = '" + id + "';";
//	else
//		query= "SELECT * FROM patients WHERE id = '" + id + "';";
//	//alert(query);
//	
//	db.transaction(
//		function(transaction) {
//			transaction.executeSql(
//				query, [], 
//				function(transaction, results) {
//					
//					if (results.rows) {
//						for (var i = 0; i < results.rows.length; i++) {
//							var row = results.rows.item(i);
//							var _fields = [];
//							var _values = [];
//							for (col in row) {
//								if ((owner == '') && 
//										(((col == "patient") && (currentTableName != "patients")) 
//										 || ((col == "id") && (currentTableName == "patients")))){
//								   _fields.push(col);
//								   _values.push("'" + newId + "'");
//								}
//								else 
//								{
//									_fields.push(col);
//									_values.push("'" + row[col] + "'");
//								}
//
//							}
//							if ((currentTableName == "patients") && (owner != '')){
//								_fields.push("owner");
//								_values.push("'" + owner + "'");	
//							}
//							// Header
//							//_exportSql += "\n-- SQL export for the " + currentTableName + " table\n";
//							_exportSql.push("INSERT INTO " + currentTableName + "(" + _fields.join(",") + ") VALUES (" + _values.join(",") + ");\n");
//						}
//					}
//				}
//			);
//		}
//	);
//}
//
///***********************************************************************************/
///* 			Export a table  					*/
///***********************************************************************************/
//function exportSettings(owner){
//	
//	_exportSql.push("UPDATE epcr_members SET last_name='" + localStorage.employee_last_name + "', first_name='" + localStorage.employee_first_name + "', work_id='" + localStorage.employee_id + "', position='" + localStorage.employee_position + "', work_place='" + localStorage.employee_location + "', reporting_email='" + localStorage.sendReportTo + "', photo='" + localStorage.photoID + "' WHERE email='" + owner + "'; ");
//
//}
//
///***********************************************************************************/
///* 				Fill Patients					*/
///***********************************************************************************/
//function InsertPatients() {
//
//	// Appliquer les requettes sql
//	for(var i=0; i<_exportSql.length-1; i++) {
//		insertIntoDB(_exportSql[i]);
//	}
//
//
//	setTimeout(function(){
//		calculatePatients();
//		_exportSql = [];
//		},5000
//	);
//}
//
///***********************************************************************************/
///* 		Synchronize Patients with Cloud					*/
///***********************************************************************************/
//function logSyncSuccess(){
//	
//	var _login = ($('#sync_login').val()).toLowerCase();
//	var _pass = $.md5($('#sync_password').val());
//	
//	sessionStorage.syncPassword = $('#sync_password').val();
//	localStorage.syncLogin = _login;
//
//	$.ajax({
//		'url': 'http://www.cloudepcr.com/epcr/getAccess.php', 
//		'type': 'POST',
//		'dataType': 'json', 
//		'data': {login: _login, password: _pass}, 
//		'success': function(user) 
//		{
//			for (data in user) {		
//				var row = user[data];
//				if (_login == row['email']){
//					$('#sync_related').show();
//				}
//			}
//		},
//		'error': function(result) 
//		{
//			alert("error: " + result);
//		}
//	});
//	
//}
//
///***********************************************************************************/
///* 		Synchronize Patients with Cloud					*/
///***********************************************************************************/
//function syncPatients(){
//	var answer = confirm("Do you really want to erase the PCRs on the Cloud and replace them by the PCRs from your device?");
//	if (answer){
//	
//		var _login = ($('#sync_login').val()).toLowerCase();
//		var _pass = $.md5($('#sync_password').val());
//
//		$.ajax({
//			'url': 'http://www.cloudepcr.com/epcr/getAccess.php', 
//			'type': 'POST',
//			'dataType': 'json', 
//			'data': {login: _login, password: _pass}, 
//			'success': function(user) 
//			{
//				for (data in user) {		
//					var row = user[data];
//					if (_login == row['email']){
//						$('body').append('<div id="progress">Generating Upload Script</div>');
//						// First: save patients in requests --> goes in _exportSql[]				
//						exportPatients(row['email']);
//						// Export User settings
//						exportSettings(row['email']);
//						setTimeout(function(){
//								$('#progress').html("Deleting remote PCRs");
//								syncPatients2(row['email']);
//							}, 10000
//						);
//					}
//				}
//			},
//			'error': function(result) 
//			{
//				alert("error: " + result);
//			}
//		});
//	}
//}
//
//function syncPatients2(login){
//
//	// Appliquer les DELETE requests sql
//	$.ajax({
//      		'url': 'http://www.cloudepcr.com/epcr/dropOwnerPatients.php', 
//       		'type': 'POST',
//      		'dataType': 'html', 
//      		'data': {owner: login}, 
//       		'success': function(result) 
//       		{
//			setTimeout(function(){
//					$('#progress').html("Sending new PCRs to cloud");
//					syncPatients3(login);
//				}, 5000
//			);
//       		},
//		'error': function(result) 
//       		{
//			alert("error: " + result);
//		}
//	});
//}
//
//function syncPatients3(){
//	// Send Insert requests
//	for (i in _exportSql){
//		$.ajax({
//	      		'url': 'http://www.cloudepcr.com/epcr/query.php', 
//	       		'type': 'POST',
//	      		'dataType': 'html', 
//	      		'data': {query: _exportSql[i]}, 
//	       		'success': function(result) 
//	       		{
//					
//	       		},
//			'error': function(result) 
//	       		{
//				alert("error: " + result);
//			}
//		});
//	}
//	setTimeout(function(){
//			   $('#progress').remove();
//			   //alert("Your PCRs have been sent to the cloud");
//			   jQT.goBack();
//		}, 5000
//	);
//}
//
///*************************************************µµµµµ*******************************************/
///*			get Patients back from the cloud
///******************************************************ù******************************************/
//function getPatientsBack(){
//	
//	var answer = confirm("Do you really want to erase the PCRs on your device and replace them by the PCRs from the Cloud?");
//	if (answer){
//		var _login = ($('#sync_login').val()).toLowerCase();
//		var _pass = $.md5($('#sync_password').val());
//
//		$.ajax({
//			'url': 'http://www.cloudepcr.com/epcr/cloudToApp.php', 
//			'type': 'POST',
//			'dataType': 'json', 
//			'data': {owner: _login}, 
//			'success': function(queries) 
//			{
//				// 1: Delete DB
//				$('body').append('<div id="progress">Deleting your local PCRs</div>');
//				emptyPCRtables();
//				
//				setTimeout(function(){
//						$('#progress').html("Getting back your online PCRs");
//						for(var i=0; i<queries.length-1; i++) {
//							insertIntoDB(queries[i]);
//						}
//					},5000
//				);
//			
//				setTimeout(function(){
//						   $('#progress').remove();
//						   calculatePatients();
//						   //alert("Your PCRs have been downloaded");
//						   jQT.goBack();
//					},15000
//				);
//				
//			},
//			'error': function(data) 
//			{
//				alert("error: " + data);
//			}
//		});
//	}
//
//}
//
///*********************************************************************/
//function insertIntoDB(query){
//	db.transaction(
//		function (transaction) {
//			//console.log(query);
//			transaction.executeSql(query);
//		}
//	);
//}