angular.module('bookShelf')
  .factory('BookService', ['$http', '$q',
    function ($http, $q) {

      var _book = {};

      function paginate(list, start, pageSize) {
        return list.slice((start - 1) * pageSize, start * pageSize);
      }

      function getBookList() {
        return $http.get('http://fakerestapi.azurewebsites.net/api/Books').then(function (response) {
          return response.data;
        });
      }

      function setBook(val) {
        _book = val;
      }

      function getBook() {
        return _book;
      }

      function removeBook(book) {
        return $http.delete('http://fakerestapi.azurewebsites.net/api/Books/' + book.ID).then(function (response) {
          return response.data;
        });
      }

      function syncBook(book) {
        return $http({
          url: 'http://fakerestapi.azurewebsites.net/api/Books/' + (book.ID || ''),
          method: book.ID ? 'PUT' : 'POST',
          data: book
        }).then(function (response) {
          return response.data;
        });
      }

      return {
        getBookList: getBookList,
        setBook: setBook,
        getBook: getBook,
        syncBook: syncBook,
        removeBook: removeBook,
        paginate: paginate
      };

    }]);