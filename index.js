var restify = require('restify');
var builder = require('botbuilder');

const PORT = process.env.port || process.env.PORT || 3978;


// Create bot and add dialogs - you will need to setup your bot to get these.
var bot = new builder.BotConnectorBot({
    appId: '4b8f4189-f508-4924-a9b8-a6eb6fe88b21',
    appPassword: 'xSq1Tq95crj4hC5njprh8xa'
});


//Dialogs definition:
//This is where you create the script for the dialog, the script can be static or dynamic.
bot.add('/', [function(session)
        {
            //Opening Dialog to greet the user
            builder.Prompts.text(session,"Thank you for getting in touch today! If you are an existing customer type in your account number, if not then just type 'no'?");
        },
        function(session, results, next)
        {
            //Decision point - is the user a customer?
            if (results.response) {
                var result = results.response;
                if (result=='no') {
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
        },
        function(session,results,next)
        {
        
         
         if (session.dialogData.isCustomer===false) {

           var text = "I am connecting you to an agent who will be able to help you further.";
           console.log(text);
           localSession.send(text);
           //End the dialog - End of Demo
           session.endDialog();        
            
         }
         else
         {
            session.send("Let me see you need help with... "+results.response);
            //End the dialog - End of Demo
            session.endDialog();
         }
         
         
        }]);

// Setup Restify Server
var server = restify.createServer();

//Query Parser
server.use(restify.queryParser());

//Bot Endpoint
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());


//Get the Bot Endpoint to start listening for Dialog requests
server.listen(PORT, function () {
    console.log('%s listening to %s', server.name, server.url); 
});