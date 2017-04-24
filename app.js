var restify = require('restify');
var builder = require('botbuilder');


//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
   
 
// Create chat bot
var connector = new builder.ChatConnector({
    appId: '4b8f4189-f508-4924-a9b8-a6eb6fe88b21',
    appPassword: 'xSq1Tq95crj4hC5njprh8xa'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.send('Hello %s!', results.response);
    }
]);