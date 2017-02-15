/* --- Helper Functions --- */

// display work and rest time selectors
var disp_work = function(ms) {
  min = Math.floor(ms/60000);
  $('#work_count').append(min)
}
var disp_rest = function(ms) {
  min = Math.floor(ms/60000)
  $('#rest_count').append(min);
}

// display main timer [04:00]
var disp_timer = function(ms) {
  var min = Math.floor(ms/60000)
  ms = ms - (min * 60000);
  var sec = Math.floor(ms/1000)
  $('#timer_count').empty();
  $('#timer_count').append(add_zero(min) + ":" + add_zero(sec))
}

// display rest timer [R1:00]
var disp_rest_timer = function(ms) {
  var min = Math.floor(ms/60000)
  ms = ms - (min * 60000);
  var sec = Math.floor(ms/1000)
  $('#timer_count').empty();
  $('#timer_count').append("R" + min + ":" + add_zero(sec))
}

// add zero prefix for time display [04:08]
function add_zero(x) {
  if (x < 10) {
    x = "0" + x;
  }
  return x;
}

// play sound
function ply() { document.getElementById("snd").play(); }

// updates remaining work or rest time
function time_left(work, rest) {
  now = new Date();
  if (now >= work && now <= rest) {
    // rest timer
    remain = rest - now;
    disp_rest_timer(remain);
  } else if (now < work) {
    // work timer
    remain = work - now;
    disp_timer(remain);
    console.log(remain);
    if (remain < 1000) { ply(); }
  }
}

function wait_three(ms) {
  setTimeout(function() {disp_timer(ms)}, 2000);
}

/* --- START DOCUMENT.READY --- */
$(document).ready(function() {  
  // initilize work, rest, sec (in ms)
  var work = 1500000 // 25 min in ms
  var rest = 300000;  //5 min in ms
  disp_work(work);
  disp_rest(rest);
  disp_timer(work);

  //add or remove work time
  $('#work_minus').click(function() {
    $('#work_count').empty();
    if (work > 60000) {
      work -= 60000;
    } else (work = 60000)
    disp_work(work);
    disp_timer(work);
  })
  $('#work_plus').click(function() {
    $('#work_count').empty();
    if (work < 3600000) {
      work += 60000;
    } else (work = 3600000)
    disp_work(work);
    disp_timer(work);
  })

  //add or remove rest time
  $('#rest_minus').click( function() {
    $('#rest_count').empty();
    if (rest > 60000) {
    rest -= 60000;
    } else (rest = 60000);
    disp_rest(rest);
    disp_rest_timer(rest);
    wait_three(work);
  })
  $('#rest_plus').click( function() {
    $('#rest_count').empty();
    if (rest < 540000) {
      rest = rest + 60000
    } else (rest = 540000);
    disp_rest(rest);
    disp_rest_timer(rest);
    wait_three(work);
  })

  //start function
  function start() {
    $('#start').text("");
    $('#pause').text("PAUSE");
    $('.adjleft, .adjright').removeClass('hover')
    var work_stop = new Date( new Date().getTime() + (work) );
    var rest_stop = new Date( work_stop.getTime() + rest)
    var run= setInterval(function() { time_left(work_stop, rest_stop) }, 100)
    $('#pause').click(function() {
      clearInterval(run);
      $('#pause').text("");
      $('#reset').text("RESET");
    })
  }

  //reset pomodoro timer
  function reset() {
    //reset displays
    $('#work_count').empty();
    disp_work(work);
    $('#rest_count').empty();
    disp_rest(rest);
    disp_timer(work);

    // reset buttons
    $('#reset').text("");
    $('#start').text("START");
  }

  // button pushes
  $('#start').on("click", start)
  $('#reset').on("click", reset)

}); //end doc.ready
