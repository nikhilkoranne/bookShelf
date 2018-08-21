angular.module('bookShelf', ['ngRoute', 'ngMessages', 'ui.bootstrap'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/books', {
      templateUrl: 'src/books/book-list.html',
      controller: 'BookListController',
      controllerAs: 'vm'
    })
      .when('/login', {
        templateUrl: 'src/login/login.html',
        controller: 'LoginController',
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
  ])
  .run(['AuthService', '$location', function (AuthService, $location) {
    if (!AuthService.isLoggedIn()) {
      $location.path('/login');
    }
  }]);