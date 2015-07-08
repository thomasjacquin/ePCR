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
    template: '<input class="my-date-time-picker" type="text" readonly="readonly" ng-model="dateModel" ng-click="openModal()" placeholder="{{placeholder}}">',
    scope: {
      'title': '@',
      'dateModel': '=ngModel',
      'placeholder': '@'
    },
    controller : function($scope, $filter, $ionicModal) {
      $scope.tmp = {};
      $scope.myTime = new Date();
      $scope.newDate = new Date();
       $scope.dateOptions = {
          formatYear: 'yy',
          startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

      $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

        
        $ionicModal.fromTemplateUrl('templates/shared/date-time-modal.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.myTime = new Date();
          $scope.modal = modal;
        });
        $scope.openModal = function() {
          $scope.modal.show();
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
        

//        $scope.pop = $ionicPopup.show({
//          template: '',
//          title: $scope.title,
//          scope: $scope,
//          buttons: [
//            {text: 'Cancel'},
//            {
//              text: '<b>Choose</b>',
//              type: 'button-positive',
//              onTap: function(e) {
//                //$scope.$apply(function() { //error: apply already in progress
//                  $scope.dateModel = $scope.tmp.newDate;
//                  $scope.formatted_datetime = $filter('date')($scope.tmp.newDate, 'medium');
//                //});
//              }
//            } //second button
//          ] //buttons array
//        }); //ionicpopup.show
//      }; //scope.popup();
    }
  };
});