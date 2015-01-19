angular.module('ePCR.config', [])

  .constant('DB_CONFIG', {
      name: 'myPCR',
      description: 'Electronic Patient Care Report',
      version: '1.0',
      size: 2 * 1024 * 1024,
      tables: [
        {
          name: 'report',
          columns: {
              "report_id":{
                "type": "INTEGER",
                "null": "NOT NULL", // default is "NULL" (if not defined)
                "primary": true, // primary
                "auto_increment": true // auto increment
              },
              "created":{
                "type": "TIMESTAMP",
                "null": "NOT NULL",
                "default": "CURRENT_TIMESTAMP" // default value
              },
              "username":{
                "type": "TEXT",
                "null": "NOT NULL"
              },
              "password": {
                "type": "TEXT",
                "null": "NOT NULL"
              },
              "age": {
                "type": "INTEGER"
              }
          }
        },{
          name: 'patient_info',
          columns: {
              "patient_id":{
                "type": "INTEGER",
                "null": "NOT NULL", // default is "NULL" (if not defined)
                "primary": true, // primary
                "auto_increment": true // auto increment
              },
              "first_name":{
                "type": "TEXT"
              },
              "last_name":{
                "type": "TEXT"
              },
              "gender": {
                "type": "TEXT"
              },
              "age": {
                "type": "DATE"
              }
          }
        }
      ]
  });