angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Reports', function($webSql, DB_CONFIG) {
  
  reports = [];

  this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

  this.db.selectAll("report").then(function(results) {

    for(var i=0; i < results.rows.length; i++){
//      console.log(results.rows.item(i));
//      reports.push(results.rows.item(i));
        reports[results.rows.item(i).id] = results.rows.item(i);
      
    }
    console.dir(reports);
  });

  return {
    all: function() {
      return reports;
    },
    get: function(reportId) {
      // Simple index lookup
      return reports[reportId];
    }
  }
});