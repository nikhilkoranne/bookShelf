angular.module('bookShelf').controller('DeleteModalInstanceCtrl', function ($scope, $uibModalInstance) {

  var vm = this;
  vm.ok = function () {
    $uibModalInstance.close('yes');
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss();
  };
});