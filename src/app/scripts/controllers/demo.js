'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope) {


  	$scope.user = {};
  	$scope.activate = function () {
  		$scope.user.activated = true;
  	}

  	$scope.password = function () {
  		debugger;
  	}

  	$scope.sendActivation = function () {
  		debugger;
  	}

    $scope.submit = function() {
      	angular.extend($scope.user,{ 	id: 1,
      									state: 'active',
      									email: 'email@email.com',
      									activated_date: new Date(),
      									login_date: new Date()
      									}) ;
    }
});
