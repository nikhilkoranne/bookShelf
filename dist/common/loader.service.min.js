angular.module('bookShelf')
  .factory('LoadingService', [
    '$q', '$injector', '$rootScope', function ($q, $injector, $rootScope) {
      return {
        show: show,
        hide: hide
      };
      function hide() {
        $rootScope.$broadcast('hide-loader');
      }

      function show() {
        $rootScope.$broadcast('show-loader');
      }
    }
  ]);