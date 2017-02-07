$(document).ready(function() {
  //initilize work, rest and timer counts
  var work = 25;
  var rest = 5;
  var min = work;
  var sec = 0;
  disp_work(work);
  disp_rest(rest);
  disp_timer(min, sec);

  //add or remove work time
  $('#work_minus').click(function() {
    $('#work_count').empty();
    if (work > 1) {
      work -= 1;
    } else (work = 1)
    disp_work(work);
    disp_timer(work, sec);
  })
  $('#work_plus').click(function() {
    $('#work_count').empty();
    if (work < 60) {
      work += 1;
    } else (work = 60)
    disp_work(work);
    disp_timer(work, sec);
  })

  //add or remove rest time
  $('#rest_minus').click( function() {
    $('#rest_count').empty();
    if (rest > 1) {
    rest = rest - 1;
    } else (rest = 1);
    disp_rest(rest);
    disp_rest_timer(rest)
  })
  $('#rest_plus').click( function() {
    $('#rest_count').empty();
    if (rest < 9) {
      rest = rest + 1
    } else (rest = 9);
    disp_rest(rest);
    disp_rest_timer(rest);
  })






}); //end doc.ready

// Helper Functions
var disp_work = function(min) {
  $('#work_count').append(min)
}
var disp_rest = function(min) {
  $('#rest_count').append(min);
}
var disp_timer = function(min, sec) {
  $('#timer_count').empty();
  $('#timer_count').append(add_zero(min) + ":" + add_zero(sec))
}
var disp_rest_timer = function(min) {
  $('#timer.count').empty();
  //$('#timer.count').append("R" + add_zero(min) + ":00")
}
var add_zero = function(x) {
  if (x < 9) {
    x = "0" + x;
  }
  return x;
}
