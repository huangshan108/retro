function count_down(init) {
  $('#sec-left').text(init);
  var inter = setInterval(function () {
    init -= 1;
    $('#sec-left').text(init);
    if (init == 0) {
      console.log('cleared');
      clearInterval(inter);
    };    
  }, 1000);
};

function checkCountDown(up, down, active) {
  
};