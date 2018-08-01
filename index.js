const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

// command handlers in a separate file for clarity
const commands = require('./commands');


// bot token from discord's apps, saved in .env file as
// BOT_TOKEN=[token here]
client.login(process.env.BOT_TOKEN);


// Fired when the bot has logged in succesfully using the token and is ready to do discord related stuff
client.on('ready', () => {

    console.log('I am ready!');
   
});

client.on('message', message => {
    // extract first word
    let command = message.cleanContent.substring(0, message.cleanContent.indexOf(' '));

    // Bot command prefix stored in .env with
    // BOT_COMMAND_PREFIX=!
    // use what ever you like, I'm old so ! was always the shit in IRC

    if (!command.startsWith(process.env.BOT_COMMAND_PREFIX))
        return;

    command = command.substring(1);
    let params = message.cleanContent.split(' ').splice(1);
    switch (command)
    {
       case "addyt": 
            commands.handleYoutube(params, message);
            break;
        default: 
            break;
    }

});
