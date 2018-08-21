angular.module('bookShelf')
.factory('LoadingIndicatorInterceptor', [
  '$q', '$injector', 'LoadingService', function ($q, $injector, LoadingService) {
    return {
      'request': function (config) {
        LoadingService.show();
        return config;
      },
      'requestError': function (rejection) {
        LoadingService.hide();
        return $q.reject(rejection);
      },
      'response': function (response) {
        LoadingService.hide();
        return response;
      },
      'responseError': function (rejection) {
        LoadingService.hide();
        return $q.reject(rejection);
      }
    };
  }]);