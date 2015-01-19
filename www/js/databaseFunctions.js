angular.module("database", ['angular-websql', 'ePCR.config'])

.factory('database', function($webSql, DB_CONFIG) {
  
  return {
    create: function() {
      console.log("Creating database tables");
      db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
       angular.forEach(DB_CONFIG.tables, function(table) {
            db.createTable(table.name, table.columns);
            console.log('Table ' + table.name + ' initialized');
        });
    }
  }
    
});


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