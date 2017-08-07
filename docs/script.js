function weight_class(weight)
{
	return "f" + Math.round(Math.min(9, weight));
}

function adjust(dif)
{
	return Math.pow(dif / 4, 0.5);
}

function add_box()
{
	box = $('<span>').addClass('box');
	$('#output').append(box);
	state.boxes.push(box);
	return box;
}

function add_letter(index, weight, charcode)
{
	element = $('<span>')
	    	.addClass(weight_class(weight))
		.text(String.fromCharCode(charcode));
	if ( index >= state.boxes.length )
	{
		add_box();
	}
	state.boxes[index].append(element);
}

function get_letter(index)
{
	return $(':last-child',state.boxes[index]);
}

var state = {
	last: 0,
	boxes: [],
	index: 0,
	last_by_code: {}
};

var thing = function() {
$('input').on('keypress', function(event){
	var key = event.key;
	var charcode = event.which;
	var timeStamp = event.timeStamp;
	var dif = timeStamp - state.last;
	state.last = timeStamp;
	var avgDown = adjust(dif);
	var weight = 11 - Math.max(0,Math.min(10, avgDown));
	if (key == 'Backspace')
	{
		state.index--;
		get_letter(state.index)
			.addClass('typo')
	}
	else
	{
		add_letter( state.index, weight, charcode );
		state.index++;
	}
});

$('input').on('keydown', function(event) {
	var charcode = event.which;
	var timeStamp = event.timeStamp;
	state.last_by_code[charcode] = timeStamp;
});

$('input').on('keyup', function(event) {
	var timeStamp = event.timeStamp;
	var charcode = event.which;
	var dif = timeStamp - state.last_by_code[charcode];
	console.log('time spent pressed: ' + dif);
});
};

window.onload = thing;
