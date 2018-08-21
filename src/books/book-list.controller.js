angular.module('bookShelf')
  .controller('BookListController', ['$scope', 'BookService', '$location',
    function ($scope, BookService, $location) {

      var vm = this;
      vm.pages = [];
      vm.pageSize = 10;
      vm.pageNumber = 1;
      vm.getBookList = getBookList;
      vm.editBook = editBook;
      vm.addNew = addNew;
      vm.removeBook = removeBook;
      vm.paginate = paginate;
      vm.changePageSize = changePageSize;
      vm.getSerialNumber = getSerialNumber;

      vm.pageSizeOptions = [{
        id: 10,
        name: 10
      }, {
        id: 20,
        name: 20
      }];

      function getSerialNumber(index) {
        return (vm.pageNumber - 1) * vm.pageSize + (index + 1);
      }

      function changePageSize(pageSize) {
        vm.paginate(1);
      }

      function paginate(pageNumber) {
        vm.pageNumber = pageNumber;
        vm.pages = [];
        for (let i = 0; i < (vm.totalRecords / vm.pageSize); i++) {
          vm.pages.push(i + 1);
        }
        vm.books = BookService.paginate(vm.bookList, pageNumber, vm.pageSize);
      }

      function getBookList() {
        BookService.getBookList().then(function (data) {
          vm.bookList = data;
          vm.totalRecords = data.length;
          vm.paginate(1);
        });
      }

      function editBook(book) {
        BookService.setBook(book);
        $location.path('bookEditor');
      }

      function addNew() {
        BookService.setBook(null);
        $location.path('bookEditor');
      }

      function removeBook(e, book) {
        e.stopPropagation();
        BookService.removeBook(book).then(function (data) {
          getBookList();
        });
      }

      vm.getBookList();
    }]);