angular.module('mainController',[])
		.controller('mainCtrl',function ($scope,$http) {
				
				getData();

				function getData() {
					$http({
						method : "get",
						url : "/getData"
					}).then(function (result) {
						$scope.todos = result.data;
					},function (err) {
						console.log(err);
					})
				}

				$scope.deleteTodo = function (id) {
					$http({
						method : "post",
						url : "/deleteTodo",
						data : { id : id }
					}).then(function (result) {
						getData();

					},function (err) {
						console.log(err);
					})
				}

				$scope.addNewTask = function () {
					$http({
						method : "post",
						url : "/addNewTask",
						data : { msg : $scope.newTask }
					}).then(function (result) {
						$scope.newTask = "";
						getData();
					},function (err) {
						console.log(err);
					})
				}

		})