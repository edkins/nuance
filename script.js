thing = function(){
  var str, last, avgUp, avgDown;
  str = function(it){
    return JSON.stringify(it);
  };
  last = 0;
  avgUp = 0;
  avgDown = 0;
  $('input').on('keypress', function(arg$){
    var key, which, timeStamp, dif, height;
    key = arg$.key, which = arg$.which, timeStamp = arg$.timeStamp;
    dif = timeStamp - last;
    last = timeStamp;
    avgDown = (3 * avgDown + Math.sqrt(dif)) / 4;
    height = Math.min(10, avgDown - 8);
    console.log('down', key, Math.round(avgDown), Math.round(Math.sqrt(dif)));
    $('#output').append($('<span>').addClass("f" + Math.round(Math.min(9, 11 - height))).text(String.fromCharCode(which)));
    return $('#outgraph').append($('<div class=foo>').append($('<div class=pad>').height((10 - height) + "rem")).append($('<div class=bar>').height(height + "rem")));
  });
};

window.onload = thing;
