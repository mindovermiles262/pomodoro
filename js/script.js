$(document).ready(function() {
	var work = 25
	var rest = 5
	var reps = 2
	var timer = "00:00"
	
// Display work, rest, reps, and time
	disp_work(work);
	disp_rest(rest);
	disp_reps(reps);
	disp_timer(timer);

// add or remove work time
	$('#work_minus').click( function() {
		$('#work_count').empty();
		if (work > 1) {
		work = work - 1;
		} else (work = 1);
		disp_work(work);
	})
	$('#work_plus').click( function() {
		$('#work_count').empty();
		if (work < 60) {
			work = work + 1
		} else (work = 60);
		disp_work(work);
	})

// add or remove rest time
	$('#rest_minus').click( function() {
		$('#rest_count').empty();
		if (rest > 1) {
		rest = rest - 1;
		} else (rest = 1);
		disp_rest(rest);
	})
	$('#rest_plus').click( function() {
		$('#rest_count').empty();
		if (rest < 15) {
			rest = rest + 1
		} else (rest = 15);
		disp_rest(rest);
	})

// add or remove reps
	$('#reps_minus').click( function() {
		$('#reps_count').empty();
		if (reps > 1) {
		reps = reps - 1;
		} else (reps = 1);
		disp_reps(reps);
	})
	$('#reps_plus').click( function() {
		$('#reps_count').empty();
		if (reps < 5) {
			reps = reps + 1
		} else (reps = 5);
		disp_reps(reps);
	})

});

// functions to display work, rest, rep, timer numbers
var disp_work = function(min) {
	$('#work_count').append(min);
}
var disp_rest = function(min) {
	$('#rest_count').append(min);
}
var disp_reps = function(repetitions) {
	$('#reps_count').append(repetitions);
}
var disp_timer = function(time) {
	$('#timer_count').append(time);
}