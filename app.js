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

var intents = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', intents);

intents.matches('DefaultWelcomeIntent', [
    function (session, args) {
      console.log("Welcome Intent Fired");
      console.log("Args : "+JSON.stringify(args));
      var responseString="Hi Mike!How may i assit you today "
      session.send(responseString);
    }
]);//Welcome Intent Fired

intents.matches('health-addons', [
    function (session, args) {
        console.log("health-addons Intend triggered")
        console.log("Args : "+JSON.stringify(args));
        var responseString="Sure Mike. Based on your job profile, team and dependent information"+
                           "HexaHealth recommends the following h-commerce plans for you"+ ""
        var healthPackage="1.Emergency Back Up Home Nurse Care for dependents 50 hrs 24x7 home care at $650." + "" +
                          "2.Intelligent Home Monitoring system for elderly Monthly rental plan $350"
        var msg=responseString + healthPackage;
        session.send(msg);
    }
]);

intents.matches('Health-Package', [
    function (session, args) {
        console.log("Args : "+JSON.stringify(args));
        var responseString="This package costs $650. You also have option to top up hours after consuming 50 hours at $13 per hour."+
        "Would you like to Continue" +""+
        //"<ul><li>Yes</li>"+
        //"<li></li>No</ul>"
            "Yes"+"/"
            "No"
        session.send(responseString);
    }
]);

intents.matches('Thankyou', [
    function (session, args) {
        console.log("Args : "+JSON.stringify(args));
        var responseString="Thank you Mike for purchasing Home Nurse services using your Health eWallet. Invoice no: 1495958. You will also receive email with invoice and purchase details.</br>"+
        "You can also enable complimentary service Medical Assistant skill on your Alexa or Echo Dot for proactive home diagnosis of health conditions. </br>" +
        //"<ul><li><a href= 'https://www.amazon.com/Hexaware-Technologies-Medical-Assistant/dp/B071Y6847B'>Yes I am Interested</a></li>" +
        //"<li></li>No Thanks</ul>"
        
        "Yes I am Interested"+"https://www.amazon.com/Hexaware-Technologies-Medical-Assistant/dp/B071Y6847B" +"  " +
        "No Thanks"
        session.send(responseString);
    }
]);

intents.matches('greeting-Intend', [
    function (session, args) {
      console.log("Welcome Intent Fired");
      console.log("Args : "+JSON.stringify(args));
      var responseString="Have a nice day!!"
      session.send(responseString);
    }
]);

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
