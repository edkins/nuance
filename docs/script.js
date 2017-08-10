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

function from_char_code(charcode)
{
	var result = String.fromCharCode(charcode);
	if (result == ' ')
	{
		result = '\xa0';  // nonbreaking space
	}
	return result;
}

function add_letter(index, weight, charcode)
{
	element = $('<span>')
	    	.addClass(weight_class(weight))
		.text(from_char_code(charcode));
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

function component(x)
{
	if (x < 0)
	{
		return '0';
	}
	else if (x > 255)
	{
		return '255';
	}
	else
	{
		return '' + Math.floor(x);
	}
}

function rgb(r,g,b)
{
	return 'rgb(' + component(r) + ',' + component(g) + ',' + component(b) + ')';
}

function press_time_colour(dif)
{
	var x = 2 * dif - 128;
	return rgb(255-x, x, 0);
}

function modify_colour(index, dif)
{
	get_letter(index).css('color',press_time_colour(dif));
}

var state = {
	last: 0,
	boxes: [],
	index: 0,
	last_by_code: {},
	last_index_by_key: {}
};

var thing = function() {
$('input').on('keypress', function(event){
	var key = event.key;
	var charcode = event.which;
	var timeStamp = event.timeStamp;
	var dif = timeStamp - state.last;
	state.last = timeStamp;
	var avgDown = adjust(dif);
	var weight = Math.max(0,Math.min(10, avgDown));
	if (key == 'Backspace')
	{
		state.index--;
		get_letter(state.index)
			.addClass('typo')
	}
	else
	{
		add_letter( state.index, weight, charcode );
		state.last_index_by_key[key] = state.index;
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
	var key = event.key;
	var charcode = event.which;
	var dif = timeStamp - state.last_by_code[charcode];
	if ( key in state.last_index_by_key )
	{
		modify_colour( state.last_index_by_key[key], dif );
	}
});
};

window.onload = thing;
