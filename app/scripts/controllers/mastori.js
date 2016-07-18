'use strict';

/**
 * @ngdoc function
 * @name app.controller:MastoriCtrl
 * @description
 * # MastoriCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MastoriCtrl', ['$scope', '$state', 'MastoriModel', 'AppointmentModel', 'AuthService', 'toaster',
    function ($scope, $state, MastoriModel, AppointmentModel, AuthService, toaster) {

    $scope.mastori = MastoriModel.query({id: $state.params.id});
    $scope.user = AuthService.user();
    var appointmentQueryParams = {orderby: 'created_at', order: 'desc', mastori_id: $state.params.id};

    var today = new Date();

    var appointmentInit = function() {
    	$scope.appointment = new AppointmentModel();
    	$scope.appointment.deadline = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate() + 1
		);
		$scope.appointment.address_id = $scope.user.addresses[0].id;
    };

    $scope.deadline = {
    	maxDate: new Date(
			today.getFullYear(),
			today.getMonth() + 1,
			today.getDate()
		),
    	minDate: today
    };

    $scope.submitAppointment = function(form) {
    	$scope.appointment.mastori_id = $scope.mastori.id;
    	$scope.appointment.user_id = $scope.user.id;

    	form.$setPristine(); // clear form
    	form.$setUntouched();

		$scope.appointment.$save(function(saved){
			appointmentInit(); // reset appointment

			toaster.pop('success', "Ωραίος!", "Το μαστόρι ενημερώθηκε για το ραντεβού! Επιπλέον κέρδισες " + saved.points_rewarded + " μαστοροπόντους!!");
		}, function(error){
			toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
		});
    }

    $scope.loadMoreAppointments = function() {
  		if ($scope.busyAp) {
  			return;
  		}
  		$scope.busyAp = true;

  		var page = $scope.appointments.current_page + 1;
  		var queryParams = angular.extend({page: page}, appointmentQueryParams);
    	var oldData = $scope.appointments.data;

    	AppointmentModel.query(queryParams, function (data) {
    		$scope.busyAp = false;
    		$scope.appointments = data;
    		$scope.appointments.data = oldData.concat(data.data);
    	});
    }

    // If user is logged in init appointment, fetch past appointments
    if ($scope.user) {
    	appointmentInit();
    	$scope.appointments = AppointmentModel.query(appointmentQueryParams);
    }

}]);