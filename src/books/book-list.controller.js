angular.module('bookShelf')
  .controller('BookListController', ['$scope', 'BookService', '$location', '$uibModal', '$log',
    function ($scope, BookService, $location, $uibModal, $log) {

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
        for (var i = 0; i < (vm.totalRecords / vm.pageSize); i++) {
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

      function addEditModal(book) {
        var modalInstance = $uibModal.open({
          animation: false,
          templateUrl: 'addEditModal.html',
          controller: 'AddEditModalInstanceCtrl',
          controllerAs: 'vm',
          backdropClass: 'backdrop-delete',
          resolve: {
            book: function () {
              return book;
            }
          }
        });

        modalInstance.result.then(function (book) {
          BookService.syncBook(book).then(function (data) {
            getBookList();
          });
        }, function () {
          $log.info('Modal dismissed');
        });
      }

      function editBook(e, book) {
        e.stopPropagation();
        addEditModal(book);
      }

      function addNew() {
        addEditModal();
      }

      function removeBook(e, book) {
        e.stopPropagation();

        var modalInstance = $uibModal.open({
          animation: false,
          templateUrl: 'deleteModal.html',
          controller: 'DeleteModalInstanceCtrl',
          controllerAs: 'vm',
          backdropClass: 'backdrop-delete',
          size: 'sm'
        });

        modalInstance.result.then(function () {
          BookService.removeBook(book).then(function (data) {
            getBookList();
          });
        }, function () {
          $log.info('Modal dismissed');
        });
      }

      vm.getBookList();
    }]);