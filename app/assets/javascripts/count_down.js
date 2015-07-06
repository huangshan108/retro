function count_down(init) {
  var $sec = $('#sec-left');
  $sec.text(init);
  var inter = setInterval(function () {
    init -= 1;
    $sec.text(init);
    if (init == 10) {
      $sec.removeClass('green').addClass('red');
    };
    if (init == 0) {
      console.log('cleared');
      clearInterval(inter);
    };    
  }, 1000);
};

function checkCountDown(up, down, active) {
  
};