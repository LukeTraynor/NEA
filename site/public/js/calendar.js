//log out function
$(document).ready(function(){
  $("#log_out").click(function(){
      document.cookie = "UserID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "http://localhost:8000/login.html"
      console.log("log out button works")
  });
});

//Checks to make sure the user has a cookie and logs them out if they dont
$(document).ready(function() {
  if (getCookie("UserID") < 1){
      window.location.href = "http://localhost:8000/login.html"
  }

});

var CURRENT_DATE = new Date();
var d = new Date();

var months = 'January February March April May June July August September October November December'.split(' ');
var weekDayName = 'SUN MON TUES WED THURS FRI'.split(' ');
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Returns the day of week which month starts (eg 0 for Sunday, 1 for Monday, etc.)
function getCalendarStart(dayOfWeek, currentDate) {
  var date = currentDate - 1;
  var startOffset = (date % 7) - dayOfWeek;
  if (startOffset > 0) {
    startOffset -= 7;
  }
  return Math.abs(startOffset);
}




// Creating the Calendar
function CreateCalendar(startDay, totalDays, currentDate) {
  var currentRow = 1;
  var currentDay = startDay;
  var $table = $('table');
  var $week = getCalendarRow();
  var $day;
  var i = 1;

  for (; i <= totalDays; i++) {
    $day = $week.find('td').eq(currentDay);
    $day.text(i);
    if (i === currentDate) {
      $day.addClass('today');
    }

    // +1 next day until Saturday (6), then reset to Sunday (0)
    currentDay = ++currentDay % 7;

    // Generate new row when the day is Saturday, but only if there are more days to render
    if (currentDay === 0 && (i + 1 <= totalDays)) {
      $week = getCalendarRow();
      currentRow++;
    }
  }
}

// Clear generated calendar
function clearCalendar() {
  var $trs = $('tr').not(':eq(0)');
  $trs.remove();
  $('.month-year').empty();
}

// Generates table row used when creating Calendar
function getCalendarRow() {
  var $table = $('table');
  var $tr = $('<tr/>');
  for (var i = 0, len = 7; i < len; i++) {
    $tr.append($('<td/>'));
  }
  $table.append($tr);
  return $tr;
}

function myCalendar() {
  var month = d.getUTCMonth();
  var day = d.getUTCDay();
  var year = d.getUTCFullYear();
  var date = d.getUTCDate();
  var totalDaysInMonth = daysInMonth[month];
  var counter = 1;

  var $h3 = $('<h3>');

  $h3.text(months[month] + ' ' + year);
  $h3.appendTo('.month-year');

  var dateToHighlight = 0;

  // Determine if Month && Year are current for Date Highlight
  if (CURRENT_DATE.getUTCMonth() === month && CURRENT_DATE.getUTCFullYear() === year) {
    dateToHighlight = date;
  }

  //Getting February days including the leasp year
  if (month === 1) {
    if ((year % 100 !== 0) && (year % 4 === 0) || (year % 400 === 0)) {
      totalDaysInMonth = 29;
    }
  }

  // Get Start Day
  CreateCalendar(getCalendarStart(day, date), totalDaysInMonth, dateToHighlight);
};

// going back or forward months
function navigationHandler(dir) {
  d.setUTCMonth(d.getUTCMonth() + dir);
  clearCalendar();
  myCalendar();
}

$(document).ready(function() {
  // Bind months
  $('.prev-month').click(function() {
    navigationHandler(-1);
  });
  $('.next-month').click(function() {
    navigationHandler(1);
  });
  // Generate Calendar
  myCalendar();
});