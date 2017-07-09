'use strict';

/**
 * @ngdoc function
 * @name app.controller:MastoriCtrl
 * @description
 * # MastoriCtrl
 * Controller of the app
 */
angular.module('app')
  .controller('MastoriCtrl', ['$scope', '$state', 'MastoriModel', 'AppointmentModel', 'RatingModel', 'AuthService', 'toaster', 'moment', 'matcherFilter',
    function ($scope, $state, MastoriModel, AppointmentModel, RatingModel, AuthService, toaster, $moment, $matcherFilter) {

    $scope.mastori = MastoriModel.query({id: $state.params.id},function success(mastori){
      // screw you angular
      $scope.allowedAppointmentAddresses = $matcherFilter($scope.user.addresses, mastori.areas, 'area_id');
    });
    $scope.user = AuthService.user();
    $scope.hide_appointment_form = true;
    $scope.allowedAppointmentAddresses = []; // init allowed addreses in appountment form

    var appointmentQueryParams = {orderby: 'created_at', order: 'desc', mastori_id: $state.params.id};
    var ratingQueryParams = {orderby: 'created_at', order: 'desc', mastori_id: $state.params.id};

    var today = $moment();

    RatingModel.query(ratingQueryParams, function(ratings){
      $scope.ratings = ratings;
      $scope.ratingAvg = ratings.data.length ==0 ? 0 : calculateAverage(ratings);
    });

    var appointmentInit = function() {
    	$scope.appointment = new AppointmentModel();
    	$scope.appointment.deadline = today.clone().add(1, 'day').toDate();
      //$scope.allowedAppointmentAddresses = $matcherFilter($scope.user.addresses, $scope.mastori.areas, 'area_id');
    };

    $scope.appoointmentRatingInit = function(appointment) {
        appointment.rating = new RatingModel();
    }

    $scope.deadline = {
    	maxDate: today.clone().add(1, 'month').toDate(),
    	minDate: today.toDate()
    };

    $scope.submitAppointment = function(form) {
    	$scope.appointment.mastori_id = $scope.mastori.id;
    	$scope.appointment.user_id = $scope.user.id;

    	form.$setPristine(); // clear form
    	form.$setUntouched();

		  $scope.appointment.$save(function(saved){
        appointmentInit(); // reset appointment
        $scope.appointments.data = !$scope.appointments ? [] : $scope.appointments.data;
        $scope.appointments.data.unshift(saved); // add it first to appointments list

        toaster.pop('success', "Ωραίος!", "Το μαστόρι ενημερώθηκε για το ραντεβού! Επιπλέον κέρδισες " + saved.points_rewarded + " μαστοροπόντους!!");
  		}, function(error){
  			toaster.pop('error', "Ουπς!", "Κάτι δεν πήγε καλά.. Ξαναπροσπάθησε παρακαλώ!");
  		});
    }

    $scope.canSubmitRating = function(appointment) {
      if (!$scope.user || !appointment) {
        return false;
      }
      var appointmentDeadline = $moment(appointment.deadline, "YYYY-MM-DD HH");

      return appointment && today.diff(appointmentDeadline, 'hours') > 1;
    }

    $scope.submitRating = function(form, appointment) {
        form.$setPristine(); // clear form
        form.$setUntouched();

        appointment.rating.mastori_id = $scope.mastori.id;
        appointment.rating.appointment_id = appointment.id;

        appointment.rating.$saveForMastori(function(saved){

            toaster.pop('success', "Κομπλέ!", "Σε ευχαριστούμε για την κριτική σου! Θα δημοσιευτεί μόλις την εγκρίνει ο μαστορο-admin! By the way, μόλις κέρδισες " + saved.points_rewarded + " μαστοροπόντους!!");
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

    $scope.loadMoreRatings= function() {
        if ($scope.busyAp) {
            return;
        }
        $scope.busyRat = true;

        var page = $scope.ratings.current_page + 1;
        var queryParams = angular.extend({page: page}, ratingQueryParams);
        var oldData = $scope.ratings.data;

        RatingModel.query(queryParams, function (data) {
            $scope.busyRat = false;
            $scope.ratings = data;
            $scope.ratings.data = oldData.concat(data.data);
        });
    }

    //calculates the average rating
    var calculateAverage = function(ratings){
      var sum = 0;
      for(var i = 0; i < ratings.data.length; i++){
        sum += parseInt(ratings.data[i].rating);
      }
      var avg = sum/ratings.data.length;
      return avg;
    };

    var initloggedInActions = function() {
        appointmentInit();
        $scope.appointments = AppointmentModel.query(appointmentQueryParams);
    }

    // If user is logged in init appointment, fetch past appointments
    if ($scope.user) {
    	initloggedInActions();
    }

    $scope.$on('user:logedin', function(event,data) {
     $scope.user = AuthService.user();
     initloggedInActions();
   });


   //makes a range array
   $scope.range = function(min, max, step) {
      step = step || 1;
      var input = [];
      for (var i = min; i <= max; i += step) {
          input.push(i);
      }
      return input;
   };


}]);
