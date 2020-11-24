// Discord variables/constants
const Discord = require('discord.js');
const client = new Discord.Client();

// Bot-specific variables/constants
const prefix = "/r";
var   botPassword = "your-token-goes-here";   // see if a commandline argument on launch can set this

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    // ignore messages that don't start with prefix or are bots
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

	const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const response = "";

    // if the message contains "flip"

    // else if, check that it's a number followed by the character 'd'

});

client.login(botPassword);