// This loads the environment variables from the .env file
require('dotenv-extended').load();
var util = require('util');
var builder = require('botbuilder');
var restify = require('restify');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot and listen to messages
var connector = new builder.ChatConnector({
    appId: 'b960eb1d-6936-46d7-8a74-f35a8a6d5f6a',
    appPassword: 'TcEyatE9XE4Po8Y8n2bVUAG'
});
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector);
var recognizer = new apiairecognizer('60f482a6ba0c40139a174c7a022c37c3');
bot.recognizer(recognizer);

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



