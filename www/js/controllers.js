angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('PatientsCtrl', function($scope, $webSql, Patients) {
  $scope.patients = Patients.all();
    
    $scope.addReport = function(){
      $scope.db = $webSql.openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
      $scope.db.insert('user', {"username": 'pc', "password": '1234', 'age': 22}).then(function(results) {
        console.log(results.insertId);
      });
    };
})

.controller('PatientDetailCtrl', function($scope, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
})

.controller('PatientInfoCtrl', function($scope, $stateParams, Patients) {
  $scope.patient = Patients.get($stateParams.patientId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enablePatients: true
  };
})

