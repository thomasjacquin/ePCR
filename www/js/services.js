angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Patients', function($webSql, DB_CONFIG) {
  
  patients = [];

  this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

  this.db.selectAll("report").then(function(results) {
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
