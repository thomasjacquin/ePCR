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

.service('Records', function($q, $webSql, DB_CONFIG) {
  var list = {};
  return {
    
    all: function(tableName, itemId) {
      list = {};
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);
      this.db.select(tableName,{
        "report_id": itemId
      }).then(function(results) {
          for(var i=0; i < results.rows.length; i++){
              list[results.rows.item(i).id] = results.rows.item(i);
          }
//          console.log(tableName);
//          console.dir(list);
          dfd.resolve(list);
        });
      return dfd.promise;
    },
    
    get: function(tableName, itemId) {
      var dfd = $q.defer()
      this.db = $webSql.openDatabase(DB_CONFIG.name, DB_CONFIG.version, DB_CONFIG.description, DB_CONFIG.size);

      this.db.select(tableName, {
        "id": {
          "value":itemId
        },
      }).then(function(results) {
        dfd.resolve(results.rows.length > 0 ? results.rows.item(0) : {});
      })
      return dfd.promise;
    }

  }
})