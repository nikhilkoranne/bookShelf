angular.module('bookShelf').controller('AddEditModalInstanceCtrl', function ($scope, $uibModalInstance, book, $filter) {

  var vm = this;
  vm.book = book || {};
  vm.maxDate = $filter('date')(new Date(), "yyyy-MM-dd");
  if (vm.book) {
    vm.book.PublishDate = new Date(vm.book.PublishDate);
  }

  vm.save = function (bookForm) {
    vm.submitted = true;
    if (bookForm.$valid) {
      $uibModalInstance.close(vm.book);
      vm.submitted = false;
    }
  };

  vm.cancel = function () {
    $uibModalInstance.dismiss();
  };
});