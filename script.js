function weight_class(weight)
{
	return "f" + Math.round(Math.min(9, weight));
}

function adjust(dif)
{
	return Math.pow(dif / 4, 0.5);
}

function letter(weight, charcode, index)
{
	return $('<span>')
		.attr('id','letter'+index)
	    	.addClass(weight_class(weight))
		.text(String.fromCharCode(charcode));
}

function get_letter(index)
{
	return $('#letter'+index);
}

var state = {
	last: 0,
	letter_count: 0
};

var thing = function() {
$('input').on('keypress', function(event){
	var key = event.key;
	var which = event.which;
	var timeStamp = event.timeStamp;
	var dif = timeStamp - state.last;
	state.last = timeStamp;
	var avgDown = adjust(dif);
	var weight = 11 - Math.max(0,Math.min(10, avgDown));
	if (key == 'Backspace')
	{
		state.letter_count--;
		get_letter(state.letter_count)
			.addClass('typo')
			.attr('id','dead');
	}
	else
	{
		$('#output').append(letter(weight, which, state.letter_count));
		state.letter_count++;
	}

	$('#outgraph')
		.append($('<div class=foo>')
		.append($('<div class=pad>')
		.height((10 - weight) + "rem"))
		.append($('<div class=bar>')
		.height(weight + "rem")));
});
};

window.onload = thing;
