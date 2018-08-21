angular.module('bookShelf', ['ngRoute', 'ngMessages'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/books', {
      templateUrl: 'src/books/book-list.html',
      controller: 'BookListController',
      controllerAs: 'vm'
    })
      .when('/bookEditor', {
        templateUrl: 'src/books/book-editor.html',
        controller: 'BookEditorController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/books'
      });
  }])
  .config([
    '$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('LoadingIndicatorInterceptor');
    }
  ]);