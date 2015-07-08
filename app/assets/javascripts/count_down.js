var CountDown = function(init) {
  this.init = init;
  this.count_down(this.init);
};


CountDown.prototype.count_down = function(init) {
  var _this = this;
  var $sec = $('#sec-left');
  if (_this.init <= 0) {
    $sec.text(0);
    return;
  };
  $sec.text(_this.init);
  var inter = setInterval(function () {
    _this.init -= 1;
    $sec.text(_this.init);
    if (_this.init == 10) {
      $sec.removeClass('green').addClass('red');
    };
    if (_this.init == 0) {
      console.log('cleared');
      clearInterval(inter);
    };
  }, 1000);
};

CountDown.prototype.checkCountDown = function(up, down) {

};

CountDown.prototype.extraTime = function(sec_elapsed) {
  var _this = this;
  var sec_left = 60 - parseInt(sec_elapsed);
  if (sec_left < 10) {
    $('#sec-left').removeClass('green').addClass('red');
  };
  _this.init = sec_left;
};
