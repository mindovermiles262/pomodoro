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
  var remain = [];
  var ready = true;
  disp_work(work);
  disp_rest(rest);
  disp_timer(work);

  // add or remove work time
  function less_work() {
    $('#work_count').empty();
    if (work > 60000) {
      work -= 60000;
    } else (work = 60000)
    disp_work(work);
    disp_timer(work);
  }
  function more_work() {
    $('#work_count').empty();
      if (work < 3600000) {
        work += 60000;
      } else (work = 3600000)
      disp_work(work);
      disp_timer(work);
  }
  $('#work_minus').on("click", less_work);
  $('#work_plus').on("click", more_work);

  //add or remove rest time
  function less_rest() {
    $('#rest_count').empty();
    if (rest > 60000) {
    rest -= 60000;
    } else (rest = 60000);
    disp_rest(rest);
    disp_rest_timer(rest);
    wait_three(work);
  }
  function more_rest() {
    $('#rest_count').empty();
    if (rest < 540000) {
      rest = rest + 60000
    } else (rest = 540000);
    disp_rest(rest);
    disp_rest_timer(rest);
    wait_three(work);
  }
  $('#rest_minus').on("click", less_rest)
  $('#rest_plus').on("click", more_rest);

  //START function
  function start(w,r) {
    $('#start').text("");
    $('#pause').text("PAUSE");
    $('#work_minus, #work_plus, #rest_minus, #rest_plus').off("click");
    $('.adjleft, .adjright').removeClass('hover');
    var work_stop = new Date( new Date().getTime() + w);
    var rest_stop = new Date( work_stop.getTime() + r);
    var run= setInterval(function() { time_left(work_stop, rest_stop) }, 100);
    //PAUSE function
    $('#pause').click(function() {
      clearInterval(run);
      now = new Date()
      work_remain = work_stop - now;
      rest_remain = rest_stop - now;
      $('#start').text("");
      $('#pause').text("");
      $('#resume').text("RESUME");
      $('#reset').text("RESET");
    })
  }

  //RESUME function
  function resume(w,r) {
    if (w < 0) { w=0 }
    $('#start').text("");
    $('#pause').text("PAUSE");
    $('#resume').text("");
    $('#reset').text("");
    work_stop = new Date( new Date().getTime() + w);
    rest_stop = new Date( work_stop.getTime() + r);
    var run= setInterval(function() { time_left(work_stop, rest_stop) }, 100);
    //PAUSE function
    $('#pause').click(function() {
      clearInterval(run);
      now = new Date()
      work_remain = work_stop - now;
      rest_remain = rest_stop - now;
      $('#start').text("");
      $('#pause').text("");
      $('#resume').text("RESUME");
      $('#reset').text("RESET");
    })    
  }

  //RESET function
  function reset() {
    //reset displays
    $('#work_count').empty();
    disp_work(work);
    $('#rest_count').empty();
    disp_rest(rest);
    disp_timer(work);
    // reset buttons
    $('#reset').text("");
    $('#resume').text("");
    $('#start').text("START");
    $('.adjleft, .adjright').addClass('hover');
    // reset work/rest time adjustment
    $('#work_plus').on("click", more_work);
    $('#work_minus').on("click", less_work);
    $('#rest_minus').on("click", less_rest)
    $('#rest_plus').on("click", more_rest);
  }

  // button push actions
  $('#start').on("click", function() {start(work, rest) })
  $('#reset').on("click", reset)
  $('#resume').on("click",function() {resume(work_remain, rest_remain) })

});
