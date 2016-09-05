'use strict';
var socket = io('http://localhost:3000');

var users = {};
var me = socket.id;

socket.on('STATE', function (data) {
  users = data.users;
  me = data.user;
  console.log(':STATE - Users in channel: ' + getUserList());

  postMessage(infoColor, 'Hello! You name is ' + users[me].name + '. Currently,'
              + ' these people are chatting: <br>' + getUserList());
});

socket.on('JOINED', function (data) {
  var user = data.user;
  users[user.id] = user;
  console.log(':JOINED - ' + user.string);

  postMessage(infoColor, user.name + ' just joined the channel!');
});

socket.on('LEFT', function (data) {
  var user = data.user;
  console.log(':LEFT - ' + user.string);
  delete users[user.id];

  postMessage(infoColor, user.name + ' just left :(');
});

//Handle MESG events

socket.on('MESG', function(data) {
	console.log(':MSG - <' + data.from + '> ' + data.message);
  	postMessage(messageColor, formatMessage(data.from, data.message));
});

//HANDLE NAME
socket.on('NAME', function(data) {
	var user = data.user;
	var old = users[user.id];
	users[user.id] = user;

	console.log(':NAME - <' + old.string + '> changed to <' + user.name + '>');

	postMessage(infoColor, '&lt;' + old.name + '&gt; changed their name to &lt;' + user.name + '&gt;');
});


//HANDLE ERROR

socket.on('ERROR', function (data) {
  console.log(':ERROR - ' + data.message);

  postMessage(errorColor, 'ERROR: ' + data.message);
});


//HELPERS FUNCTIONS

function getUserList() {
  return _.reduce(users,
                  function (rest, user) { 
                    return (rest ? rest + ', ' : '') + user.name;
                  },
                  ''
                 );
}


function sendMessage(message) {
	if (message.substring(0,1) != '/') {
		socket.emit('MESG', {message: message});
	} else {
		let params = message.substring(1).split(' ');
		let cmd = params[0];

		sendCommand(cmd, params);
	}
}

function sendCommand(cmd, params) {
	console.log('User attempted cmd' + cmd);
	console.log('Params: ' + params);

	switch(cmd.toLowerCase()) {
		case 'setname':
			setName(params[1]);
			break;
		case 'image':
			sendImage(params[1]);
			break;
		case 'giphy':
			params.shift();
			var term = params.join(' ');
			console.log('Giphy request of: ' + term);
			$.ajax({
				method: "GET",
				url: "giphy/json/" + term,
			}).done(function(result) {
				if (result.data.img_url == undfined) {
					postMessage(errorColor, 'ERROR: No results for giphy seach of "' + term + '"');
				} else {
					sendImage(result.data.image_url);
				}
			});
			break;
		case 'giphy':
  			params.shift();
  			var term = params.join(' ');
  			console.log('Giphy request of: ' + term);
  			$.ajax({
    			method: "GET",
    			url: "giphy/json/" + term,
  			}).done(function (result) {
    			if(result.data.image_url == undefined) {
      				postMessage(errorColor, 'ERROR: No results for giphy search of "'
                  + term + '"');
    			} else {
      			sendImage(result.data.image_url);
    			}
  			});

  break;

		default:
			postMessage(errorColor, 'ERROR: Invalid command "' + cmd + '"');
	}
}

function setName(newName) {
	socket.emit('NAME', {newName: newName});
}

function sendImage(imgUrl) {
	socket.emit('IMG', {url: imgUrl});
}








