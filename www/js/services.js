angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Patients', function($webSql) {
  
  patients = [];
  // Might use a resource here that returns a JSON array
  this.db = $webSql.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
  
  this.db.selectAll("user").then(function(results) {
    for(var i=0; i < results.rows.length; i++){
      patients.push(results.rows.item(i));
    }
  });

  return {
    all: function() {
      return patients;
    },
    get: function(patientId) {
      // Simple index lookup
      return patients[patientId];
    }
  }
});
