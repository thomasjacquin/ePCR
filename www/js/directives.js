angular.module('ePCR.directives', [])

.directive('goClick', function ($location) {
  return function (scope, element, attrs) {
    var path;

    attrs.$observe('goClick', function (val) {
      path = val;
    });

    element.bind('click', function () {
      scope.$apply(function () {
        $location.path(path);
      });
    });
  };
})

.directive('chartsContainer', function ($window) {
    return function (scope, element, attrs) {
        element.height(300);
    }
})

.directive('myDateTimePicker', function ($ionicPopup) {
  return {
    restrict: 'E',
    template: '<input class="my-date-time-picker" type="text" readonly="readonly" ng-model="dateModel" ng-click="popup()" placeholder="{{placeholder}}">',
    scope: {
      'title': '@',
      'dateModel': '=ngModel',
      'placeholder': '@'
    },
    controller : function($scope, $filter, $ionicPopup) {
      $scope.tmp = {};
      $scope.pop = null;
      $scope.tmp.newDate = $scope.dateModel || Date.now();
      
      $scope.onTimeSet = function(newDate, oldDate) {
//        $scope.dateModel = $scope.tmp.newDate;
        $scope.dateModel = $filter('date')($scope.tmp.newDate, 'medium');
        $scope.pop.close();
      };

      $scope.popup = function() {
        $scope.pop = $ionicPopup.show({
          template: '<div class="my-date-time-picker"><datetimepicker data-ng-model="tmp.newDate" data-on-set-time="onTimeSet(newDate, oldDate)"></datetimepicker></div>',
          title: $scope.title,
          scope: $scope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Choose</b>',
              type: 'button-positive',
              onTap: function(e) {
                //$scope.$apply(function() { //error: apply already in progress
                  $scope.dateModel = $scope.tmp.newDate;
                  $scope.formatted_datetime = $filter('date')($scope.tmp.newDate, 'medium');
                //});
              }
            } //second button
          ] //buttons array
        }); //ionicpopup.show
      }; //scope.popup();
    }
  };
})