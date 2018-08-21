angular.module('bookShelf')
  .controller('BookEditorController', ['$scope', 'BookService', '$location',
    function ($scope, BookService, $location) {
      var vm = this;
      vm.phoneNumberPattern = /^[0-9]*$/;
      vm.emailPattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

      vm.book = BookService.getBook() || {};

      vm.sync = sync;

      function sync(book, bookForm) {
        vm.submitted = true;
        if (bookForm.$valid) {
          BookService.syncBook(book).then(function (response) {
            $location.path('books');
            vm.submitted = false;
          });
        }
      }

    }]);