// Helper Functions

// display work and rest time selectors
var disp_work = function(ms) {
  min = Math.floor(ms/60000);
  $('#work_count').append(min)
}
var disp_rest = function(ms) {
  min = Math.floor(ms/60000)
  $('#rest_count').append(min);
}

// display main timer
var disp_timer = function(ms) {
  var min = Math.floor(ms/60000)
  ms = ms - (min * 60000);
  var sec = Math.floor(ms/1000)
  $('#timer_count').empty();
  $('#timer_count').append(add_zero(min) + ":" + add_zero(sec))
}

// ??display rest timer after main timer is finished
var disp_rest_timer = function(min) {
  $('#timer.count').empty();
  $('#timer.count').append("R" + add_zero(min) + ":00")
}

// add zero prefix for time display
function add_zero(x) {
  if (x < 10) {
    x = "0" + x;
  }
  return x;
}

// returns time left between function call and end in ms
function time_left(end) {
  now = new Date();
  if (now < end) {
    remain = end - now;
    disp_timer(remain);
  } else {
    // TODO: end timer, start break timer
  }
}

// --- START DOCUMENT.READY ---
$(document).ready(function() {  
  // initilize work, rest and timer counts
  var work = 120000; // 2 min in ms
  var rest = 60000;  //1 min in ms
  var sec = 0
  disp_work(work);
  disp_rest(rest);
  disp_timer(work, sec);

  //add or remove work time
  $('#work_minus').click(function() {
    $('#work_count').empty();
    if (work > 60000) {
      work -= 60000;
    } else (work = 60000)
    disp_work(work);
    disp_timer(work, sec);
  })
  $('#work_plus').click(function() {
    $('#work_count').empty();
    if (work < 3600000) {
      work += 60000;
    } else (work = 3600000)
    disp_work(work);
    disp_timer(work, sec);
  })

  //add or remove rest time
  $('#rest_minus').click( function() {
    $('#rest_count').empty();
    if (rest > 60000) {
    rest -= 60000;
    } else (rest = 60000);
    disp_rest(rest);
    disp_rest_timer(rest)
  })
  $('#rest_plus').click( function() {
    $('#rest_count').empty();
    if (rest < 540000) {
      rest = rest + 60000
    } else (rest = 540000);
    disp_rest(rest);
    disp_rest_timer(rest);
  })

  // click start button
  $('#start').on("click", function() {
    var work_stop = new Date( new Date().getTime() + (work) + (sec) );
    var running = setInterval(function() { time_left(work_stop) }, 100)
})

  // click stop button
  $('#stop').on("click", function() {
    console.log("stop button clicked")
    // stop timer
    clearInterval((function() { time_left(work_stop) }))
  })
}); //end doc.ready


