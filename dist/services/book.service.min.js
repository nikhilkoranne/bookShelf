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
        }).catch(function (error) {

        });
      }

      function setBook(val) {
        _book = val;
      }

      function getBook() {
        return _book;
      }

      function removeBook(book) {
        var deferred = $q.defer();

        deferred.resolve({});
        return deferred.promise;
      }

      function syncBook(book) {
        var deferred = $q.defer();

        deferred.resolve([]);
        return deferred.promise;
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