angular.module('bookShelf')
  .directive('loader', ['$compile', function ($compile) {
    return {
      restrict: 'E',
      template: '<span>' +
        '<i class="fa fa-spinner fa-spin fa-fw loader-icon"></i>' +
        '<div class="loader">' +
        '</div>' +
        '</span>',
      link: function (scope, element, attrs, ctrl) {
        scope.$on('show-loader', function (event) {
          element.attr('style', 'display:block');
        });
        scope.$on('hide-loader', function (event) {
          element.attr('style', 'display:none');
        });
      }
    };
  }]);

