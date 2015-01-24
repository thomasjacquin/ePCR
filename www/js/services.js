angular.module('starter.services', [])

.service('Reports', function($q, $webSql, DB_CONFIG) {
  var reports = {};
  
  return {
    
    all: function() {
      reports = {};
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

      this.db.selectAll("report").then(function(results) {
        for(var i=0; i < results.rows.length; i++){
            reports[results.rows.item(i).id] = results.rows.item(i);
        }
        console.dir(reports);
        dfd.resolve(reports);
      });
      return dfd.promise;
    },
    
    get: function(reportId) {
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

      this.db.select("report", {
        "id": {
          "value":reportId
        },
      }).then(function(results) {
        dfd.resolve(results.rows.item(0));
      })
      return dfd.promise;
    }

  }
})

.service('Vitals', function($q, $webSql, DB_CONFIG) {
  var vitals = {};
  return {
    
    all: function(reportId) {
      vitals = {};
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
      this.db.select("vitals",{
        "id": reportId
      }).then(function(results) {
          for(var i=0; i < results.rows.length; i++){
              vitals[results.rows.item(i).id] = results.rows.item(i);
          }
          console.dir(vitals);
          dfd.resolve(vitals);
        });
      return dfd.promise;
    },
    
    get: function(vitalsId) {
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

      this.db.select("vitals", {
        "id": {
          "value":vitalsId
        },
      }).then(function(results) {
        dfd.resolve(results.rows.item(0));
      })
      return dfd.promise;
    }

  }
})