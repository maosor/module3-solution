(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['NarrowItDownController'];
function NarrowItDownController(NarrowItDownController) {
  var menu = this;
  var promise = MenuSearchService.getMenuCategories();

  promise.then(function (response ) {
    menu.categories = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.foundItems  = function (shortName) {
    var promise = MenuSearchService.getMenuForCategory(shortName);
    promise.then(function (found) {
      menu.categories = response.data;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };
}
  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

}

})();
