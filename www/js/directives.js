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

.directive('myDateTimePicker', function () {
  return {
    restrict: 'E',
    template: '<input class="my-date-time-picker" type="text" readonly="readonly" ng-model="dateModel" ng-click="openModal()" placeholder="{{placeholder}}">',
    scope: {
      'title': '@',
      'dateModel': '=ngModel',
      'placeholder': '@'
    },
    controller : function($scope, $filter, $ionicModal) {

      $ionicModal.fromTemplateUrl('templates/shared/date-time-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.title = $scope.title;
        
        $scope.currentDate = new Date();
        $scope.datePickerCallback = function (val) {
            if(typeof(val)==='undefined'){      
                console.log('Date not selected');
            }else{
                console.log('Selected date is : ', val);
                $scope.selectedDate = val;
            }
        };
        
        var d = moment();
        d.set('hour', 0);
        d.set('minute', 0);
        d.set('second', 0);
        var now = moment();
        var roundedTime = ((now.diff(d, 'seconds'))/60).toFixed(0)*60;
        console.log(roundedTime);
        $scope.slots = {epochTime: roundedTime, format: 12, step: 1};

        $scope.timePickerCallback = function (val) {
          if (typeof (val) === 'undefined') {
            console.log('Time not selected');
          } else {
            console.log('Selected time is : ', val);
          }
        };
      });
      $scope.openModal = function() {
        $scope.modal.show();
      };
      $scope.save = function() {
        var date = $scope.selectedDate || $scope.currentDate;
        console.log(date);
        var d = moment(date);
        d.set('hour', 0);
        d.set('minute', 0);
        d.set('second', 0);
//        console.log(moment(d).valueOf()/1000);
//        console.log($scope.slots.epochTime);
        var result = moment(d).valueOf()/1000 + $scope.slots.epochTime;
//        console.log(result);
        var formattedResult = moment.unix(result).format('MMM Do YYYY, hh:mm A');
//        console.log(formattedResult);
        $scope.dateModel = formattedResult;
        $scope.modal.hide();
      };
      $scope.closeModal = function() {
        $scope.modal.hide();
      };
      //Cleanup the modal when we're done with it!
      $scope.$on('$destroy', function() {
        $scope.modal.remove();
      });
      // Execute action on hide modal
      $scope.$on('modal.hidden', function() {
        // Execute action
      });
      // Execute action on remove modal
      $scope.$on('modal.removed', function() {
        // Execute action
      });
    }
  };
})

.directive('standardTimeMeridian', function() {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      etime: '=etime'
    },
    template: "<strong>{{stime}}</strong>",
    link: function(scope, elem, attrs) {

      scope.stime = epochParser(scope.etime, 'time');

      function prependZero(param) {
        if (String(param).length < 2) {
          return "0" + String(param);
        }
        return param;
      }

      function epochParser(val, opType) {
        if (val === null) {
          return "00:00";
        } else {
          var meridian = ['AM', 'PM'];

          if (opType === 'time') {
            var hours = parseInt(val / 3600);
            var minutes = (val / 60) % 60;
            var hoursRes = hours > 12 ? (hours - 12) : hours;

            var currentMeridian = meridian[parseInt(hours / 12)];

            return (prependZero(hoursRes) + ":" + prependZero(minutes) + " " + currentMeridian);
          }
        }
      }

      scope.$watch('etime', function(newValue, oldValue) {
        scope.stime = epochParser(scope.etime, 'time');
      });

    }
  };
});