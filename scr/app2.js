(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var menu = this;
	var promise = MenuSearchService.getMenuCategories();

	promise.then(function (response) {
		menu.categories = response.data;
	})
	.catch(function (error) {
	console.log("Something went terribly wrong.");
	});
	var promise = MenuSearchService.getMenuitems();

	promise.then(function (response) {
	menu.menu_items = response.data;
	//console.log(menu.menu_items.menu_items);
	})
	.catch(function (error) {
	console.log("Something went terribly wrong.");
	});
	
	menu.logMenuItems = function (shortName) {
	var promise = MenuSearchService.getMenuitems();

	promise.then(function (response) {
	  console.log(response.data);
	})
	.catch(function (error) {
	  console.log(error);
	})
	};
	var searchValue = "beef";
	function containsFilter(value) {
	  return value.indexOf(searchValue) !== -1;
	}
	menu.menu_items
	
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

  service.getMenuitems = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });

    return response;
  };

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
