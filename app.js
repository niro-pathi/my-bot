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
       builder.Prompts.text(session,"Thank you for getting in touch today! If you are an existing customer type in your account number, if not then just type 'New Customer'?");
    },
    function(session, results, next)
    {
            //Decision point - is the user a customer?
            if (results.response) {
                var result = results.response;
                if (result=='New Customer') {
                    //Not a customer - the check can be made more intelligent i.e. by using similarity measures
                    console.log("Not a customer");
                    session.dialogData.isCustomer = false;
                    builder.Prompts.text(session,"No worries, how can I help you today?");
                }else
                {
                  //User is a customer - parse the customer id and retrieve name for a customized greeting
                  //**Hard coded service** - default customer id to use: 1234
                  console.log("Customer Id:",result);
                  session.dialogData.customerId = result;
                  
                  builder.Prompts.text(session,"How can I help you today ");
                  
                }
            }
            else
            {
               console.error("No response.");
               next();               
            }
    }
]);