require('dotenv-extended').load();
var builder = require('botbuilder');
var restify = require('restify');
var apiairecognizer = require('api-ai-recognizer');
var request = require("request");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});


// Create connector and listen for messages
var connector = new builder.ChatConnector({
    appId: 'b960eb1d-6936-46d7-8a74-f35a8a6d5f6a',
    appPassword: 'TcEyatE9XE4Po8Y8n2bVUAG'
});

server.post('/api/messages', connector.listen());
//POST Call Handler
var bot = new builder.UniversalBot(connector);
var recognizer = new apiairecognizer('60f482a6ba0c40139a174c7a022c37c3');
bot.recognizer(recognizer);
//Create Bot Object

var intents = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', intents);
      intents.matches('DefaultWelcomeIntent', [
                    function (session, args) {
                       console.log("Welcome Intent Fired");
                       console.log("Args : "+JSON.stringify(args));
                        var responseString="Hi there. I am Citi Assistant. How can I help you?"
                        session.send(responseString);
                  }
                ]);//Welcome Intent Fired

    intents.matches('SatisfactoryIntent', [
                  function (session, args) {
                     console.log("Satisfactory Intent Fired");
                     console.log("Args : "+JSON.stringify(args));
                      var responseString="You're welcome."
                      session.send(responseString);
                }
              ]);//Satisfactory Intent Fired

               intents.onDefault(function(session){
                   session.send("Sorry...can you please rephrase?");
               });

// server.get('/', (req, res, next) => {
//     sendProactiveMessage(savedAddress);
//     res.send('Proactive Notification triggered');
//     next();
//   }//Proavtive Notifications
// );


// function sendProactiveMessage(address) {
//   var msg = new builder.Message().address(address);
//   msg.text('Hello, this is a notification from an external Call');
//   msg.textLocale('en-US');
//   bot.send(msg);
// }//GET Call Notification Function
