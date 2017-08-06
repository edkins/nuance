function weight_class(weight)
{
	return "f" + Math.round(Math.min(9, weight));
}

function adjust(dif)
{
	return Math.pow(dif / 4, 0.5);
}

function letter(weight, charcode)
{
	return $('<span>')
	    	.addClass(weight_class(weight))
		.text(String.fromCharCode(charcode));
}

var state = {
	last: 0
};

var thing = function(){
  $('input').on('keypress', function(event){
	var key, which, timeStamp, dif, weight;
	var key = event.key, which = event.which;
	var timeStamp = event.timeStamp;
	var dif = timeStamp - state.last;
	state.last = timeStamp;
	var avgDown = adjust(dif);
	var weight = 11 - Math.max(0,Math.min(10, avgDown));
	$('#output').append(letter(weight, which));

	$('#outgraph')
		.append($('<div class=foo>')
		.append($('<div class=pad>')
		.height((10 - weight) + "rem"))
		.append($('<div class=bar>')
		.height(weight + "rem")));
  });
};

window.onload = thing;
