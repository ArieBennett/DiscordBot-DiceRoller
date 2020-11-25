const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

// usage instructions; list of commands and their format
function botHelp() {
    var str = "command | effect | usage";

    str += "`r` | rolls gaming dice | `/r [a]d[b]+[c]`\n";
    str += "alt. names: `roll`\n";
    str += "`f` | flips coins | `/f [n]`\n";
    str += "alt. names: `flip`\n";

    return str;
}

// roll [num] [sides]-sided dice and add the constant [add]; returns total sum of dice AND constant
function rollDice(num, sides, add) {
    var sum = 0;
    var str = "(";

    for (var i = 0; i < num; i++) {
        var roll = Math.floor(1 + Math.random() * sides);
        sum += roll;
        str += roll;

        if (i != (num-1))
            str += " + ";
    }

    sum += add;
    str += ") + " + add + " = " + sum;
    
    return str;
}

// flip [num] coins; returns the number of heads.
function flipCoins(num) {
    var sum = 0;
    var str = "(";

    for (var i = 0; i < num; i++) {
        var flip = Math.floor(Math.random() * 2);
        sum += flip;

        if (flip == 1)
            str += "H";
        else
            str += "T";

        if (i != (num-1))
            str += " + ";
    }

    str += ") = " + sum + " head";
    if (sum != 1)
        str += "s";

    return str;
}

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

client.login(config.token);