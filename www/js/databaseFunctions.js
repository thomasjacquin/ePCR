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
      // Create Settings record
      db.insert('settings', {"id":1}).then(function(results) {
        console.log("Initialized Settings record");
      });
    }
  }
    
});