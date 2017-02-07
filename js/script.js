$(document).ready(function() {
	var work = 25
	var rest = 5
	var reps = 6
	var min = work
	var sec = 0


// Display work, rest, reps, and time
	disp_work(work);
	disp_rest(rest);
	disp_reps(reps);
	disp_timer(min, sec);

// add or remove work time
	$('#work_minus').click( function() {
		$('#work_count').empty();
		if (work > 1) {
		work = work - 1;
		} else (work = 1);
		disp_work(work);
		timer = new Date(work);
		sec = 0;
		disp_timer(timer, sec)
	})
	$('#work_plus').click( function() {
		$('#work_count').empty();
		if (work < 60) {
			work = work + 1
		} else (work = 60);
		disp_work(work);
		timer = new Date(work);
		sec = 0;
		disp_timer(timer, sec)
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
		if (rest < 9) {
			rest = rest + 1
		} else (rest = 9);
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

// click start button, start timer
	$('#start').one("click", function() {
		var start_time = new Date();
		var add_time = minutes_to_milliseconds(work);
		var work_end_time = new Date(start_time.getTime() + add_time);
		var add_more = minutes_to_milliseconds(rest);
		var rest_end_time = new Date(work_end_time.getTime() + add_more);
		//function displays timer during timing
		var update_work_timer = function() {
			// display time during work timer
			if (new Date() < work_end_time) {
				var time_left = work_end_time.getTime() - new Date();
				min = new Date(time_left).getMinutes();
				sec = new Date(time_left).getSeconds();
				disp_timer(min, sec);
			}
		}

		// function displays timer during rest
		var update_rest_timer = function() {
			if (new Date() < rest_end_time) {
				var time_left = rest_end_time.getTime() - new Date();
				min = new Date(time_left).getMinutes();
				sec = new Date(time_left).getSeconds();
				disp_rest_timer(min, sec);
			}
		}
		var start = function() {
			if (new Date() >= work_end_time && new Date() < rest_end_time) {
				$('#stop').click(function() {
					rest_end_time = work_end_time;
				})
				var run_rest = setInterval(update_rest_timer, 100);
			}
			else if (new Date() < work_end_time) {
				$('#stop').click(function() {
					work_end_time = new Date(0);
				})
				var run_work = setInterval(update_work_timer, 100);
			}
		}

		var run = setInterval(start, 100);
		$('#stop').click(function() {
			clearInterval(run);
			sec = 0;
			disp_timer(work, sec);
		})
	})
})



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
var disp_timer = function(min, sec) {
	min = minutes_to_milliseconds(min);
	sec = sec * 1000;
	$('#timer_count').empty();
	$('#timer_count').append(addZero(new Date(min).getMinutes()) + ":" + addZero(new Date(sec).getSeconds()));
}
var disp_rest_timer = function(min, sec) {
	min = minutes_to_milliseconds(min);
	sec = sec * 1000;
	$('#timer_count').empty();
	$('#timer_count').append("R" +new Date(min).getMinutes() + ":" + addZero(new Date(sec).getSeconds()));
}

// convert minutes to milliseconds
var minutes_to_milliseconds = function(min) {
	var ms = min * 60 * 1000;
	return ms;
}

// add zeros for time display
var addZero = function(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

var repeat = function(fn, times) {
	for (var i = 0; i < times; i++) fn();
}
