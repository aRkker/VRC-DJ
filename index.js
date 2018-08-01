const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()


// bot token from discord's apps, saved in .env file as
// BOT_TOKEN=[token here]
client.login(process.env.BOT_TOKEN);


client.on('ready', () => {
    console.log('I am ready!');
   
});

client.on('message', message => {
    switch (message.content)
    {
        default: 
            break;
    }

});
