angular.module('customDirectives', [])

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

.directive('signature', function ($ionicModal) {
  var canvas = null,
    ratio = 1.0;

  return {
    scope: {
      signature: '=ngModel'
    },
    link: function ($scope, $element, $attrs, $controller) {
      $scope.signature = null;
      $scope.signaturePadModel = {};

      $ionicModal.fromTemplateUrl('templates/signature.html', {
        animation: 'slide-in-up',
        scope: $scope,
      }).then(function (modal) {
        $scope.signatureModal = modal;
      });

      $scope.$on('$destroy', function () {
        $scope.signatureModal.remove();
      });

      $scope.openSignatureModal = function () {
        $scope.signatureModal.show();
        canvas = angular.element($scope.signatureModal.modalEl).find('canvas')[0];

        $scope.signaturePad = new SignaturePad(canvas, {
          backgroundColor: '#FFF',
          minWidth: 1,
          maxWidth: 1.5,
          dotSize: 3,
          penColor: 'rgb(66, 133, 244)',
          onEnd: function () {
            $scope.signature = $scope.signaturePad.toDataURL();
          }
        });

        if ($scope.signature) {
          $scope.signaturePad.fromDataURL($scope.signature);
        }
        $scope.resizeCanvas();
      };

      $scope.resizeCanvas = function () {
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext('2d').scale(ratio, ratio);
      };

      $scope.clear = function () {
        $scope.signaturePadModel.signatureConfirm = false;
        $scope.signaturePad.clear();
        $scope.signature = null;
      };

      $scope.save = function () {
        $scope.signaturePadModel = {};
        $scope.signatureModal.hide();
      };
    },
    require: 'ngModel',
    replace: true,
    restrict: 'A',
    templateUrl: 'templates/signature.html'
  };
});