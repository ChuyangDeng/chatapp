var infoColor = "#888888";
var errorColor = "red";
var messageColor = "#000000";
var nameColor = "blue";
var text = "";

var messagesAreHidden = false;

var formatMessage = function(user, message) {
	return '<span style= "color: '+ nameColor +' ">' + user + '</span>' + ': ' + message;
}

var postMessage = function(color, content) {
	console.log("jQuery is not ready yet");
}

var appendix = function(number) {

}

$(function() { //every time the html loaded this script will run
	
	//append text to a paragraph:
	//$('<p style="color:pink;">What\'s up </p>')
	//	.appendTo('#intro-para'); //one line below the original paragraph
								  //use <span> tag will attach the text directly after the original paragraph


	postMessage = function (color, content) {
		$('<li><span style="color: ' + color + '">' + content + " " + appendix(Math.round(Math.random()*10)) +'</span></li>')
		.hide()
		.appendTo('#messages')
		.fadeIn(200);
	}

	appendix = function(number) {
		switch(number) {
			case 0:
				text = "(๑>◡<๑)";
				break;
			case 1:
				text = "╰(*°▽°*)╯";
				break;
			case 2:
				text = "╮(╯▽╰)╭";
				break;
			case 3:
				text = "(oﾟωﾟo)";
				break;
			case 4:
				text = "d(`･∀･)b";
				break;
			case 5:
				text = "ヽ(✿ﾟ▽ﾟ)ノ";
				break;
			case 6:
				text = "ξ( ✿＞◡❛)";
				break;
			case 7:
				text = "(｡▰‿‿▰｡) ❤";
				break;
			case 8:
				text = "(ΘωΘ。)♡";
				break;
			case 9:
				text = "ლ(╹ε╹ლ)";
				break;
			case 10:
				text = "♡￫ω￩♡";
			default:
				return text;
		}
		return text;
	}

	$('#message-form').submit(function(event) {
		//event.preventDefault();

		sendMessage($('#message').val());
    	$('#message').val('');
	});

	$('#submit').click(function(event) {
		$('#massages').submit();
	});

	$('#delete').click(function(event) {
		$('#message').val('');
	});

	$('#hide').click(function(event) {
		if (messagesAreHidden) {
			$('#messages').show();
			messagesAreHidden = false;
			$('#hide').text('Hide Messages');
		} else {
			$('#messages').hide();
			messagesAreHidden = true;
			$('#hide').text('Show Messages');
		}
	});

	$('#message-form').keypress(function(event) {

		if (event.which == 13) {
			$('#message-form').submit();
			event.preventDefault();
		}

	});

	
});


