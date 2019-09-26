var express = require('express');
var fs = require('fs');
var app = express();
const port = 8080;

var list_of_intents = JSON.parse(fs.readFileSync('intents.json', 'utf8'));

console.log("Server Running At: localhost:" + port);

var Client = require('node-rest-client').Client;
var client = new Client();

var io = require('socket.io').listen(app.listen(port));
io.sockets.on("connection",function(socket) {
  console.log('User connected');

  socket.on('clientEvent', function(data) {
    console.log("User prompt: " + JSON.stringify(data));
      // in context

      var intents = list_of_intents.intents;
      var responseMsg;
      var responseContext;

	  for (i = 0; i < intents.length; i++) {
		  console.log("pat: "+ JSON.stringify(intents[i].patterns));
		  var k=-1;
		  for (j = 0; j < intents[i].patterns.length; j++) {
			  if (intents[i].patterns[j] === data.msg) {
				  k=i;
				  break;
			  }
		  }     
		  if (k>-1){
            var responseId = getRandomInt(0, intents[i].responses.length - 1);
            responseMsg = intents[i].responses[responseId];
			console.log("con: "+ JSON.stringify(intents[i].context[0]));
            data.context = intents[i].context[0];
            break;
		  }
        }
		
	  if (k>-1) {	
        for (i = 0; i < intents.length; i++) {
          if(intents[i].tag === data.context) {
            var responseId = getRandomInt(0, intents[i].responses.length - 1);
            responseMsg = intents[i].responses[responseId];
            responseContext = intents[i].context[0];
            break;
           }
        }
	  } else {
            var responseId = getRandomInt(0, intents[3].responses.length - 1);
            responseMsg = intents[3].responses[responseId];
            responseContext = intents[3].context[0];
	  }		  

      console.log("Intent: " + data.context);
      console.log();

      var botparamsvals;
      if (data.botparams) {
        botparamsvals = data.botparams + ' | ' + data.msg;
      } else {
        botparamsvals = data.msg;
      }

      socket.emit('serverEvent', {intent: data.context, msg: responseMsg, context: responseContext, botparams: botparamsvals});
    //}
  });

  socket.on('disconnect', function () {
    console.log('User disconnected');
  });
})

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}