const config = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();

function extractArgs(str) {
    var prunedStr = "";

    for(var i = 0; i < str.length; i++) {
    	// if not one of the accepted delimiters
        if ( !(str[i] === 'd' || str[i] === '+' || str[i] === ' ') ) {
        	// if negative, not a normal delimiter, put space first
        	if (str[i] === '-')
            	prunedStr += ' ';
            
            // add char to string
            prunedStr += str[i];
        }
        // otherwise, check that the previous character (if exists) was a space
        else if (str.length > 1 && !(str[i-1] === ' ' || str[i-1] === '-')) {
            prunedStr += ' ';
        }
    }
	
    return prunedStr.split(/ +/);
}

// usage instructions; list of commands and their format
function botHelp() {
    var str = "Help:\n";

    str += "Command: `r` or `roll`\n" +
           "Desc.: rolls gaming dice\n" +
           "Format(s): `/r [a]d[b]+[c]` OR `/r [a] [b] [c]`\n";
    str += "Command: `f` or `flip`\n" +
           "Desc.: flips coins\n" +
           "Format(s): `/f [a]`\n";

    return str;
}

// roll [num] [sides]-sided dice and add the constant [add]; returns total sum of dice AND constant
function rollDice(num, sides, add) {
    // handle incorrect inputs
    if (num < 1)
        return "cannot roll `" + num + "` dice.";
    if (!(sides === 4 || sides === 6 || sides === 8 || sides === 10 || sides === 20 || sides === 100))
        return "cannot roll `" + sides + "-sided` dice.";

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
    // handle incorrect inputs
    if (num < 1)
        return "cannot flip `" + num + "` coins.";

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
    if (!message.content.startsWith(config.prefix) || message.author.bot) {
        return;
    }

    const args = extractArgs(message.content.slice(prefix.length).trim());
    const command = args.shift().toLowerCase();
    const invalidSyntax = "invalid usage! :rofl: See: `" + config.prefix + "help`";

    // if command is "h" OR "help"
    if (command === "h" || command === "help") {
        message.channel.send(botHelp());
    }

    // else if command is "f" OR "flip"
    else if (command === "f" || command === "flip") {
        if (args.length === 0)
            message.channel.send(invalidSyntax);
        else {
            message.channel.send(flipCoins(parseInt(args[0])));
        }
    }

    // else if, command is "r" or "roll"
    else if (command === "r" || command === "roll") {
        if (args.length < 2)
            message.channel.send(invalidSyntax);
        else {
            if (args.length < 3)
                message.channel.send(rollDice(parseInt(args[0]), parseInt(args[1]), 0));
            else
                message.channel.send(rollDice(parseInt(args[0]), parseInt(args[1]), parseInt(args[2])));
        }
    }

});

client.login(config.token);