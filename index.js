//-------------------------------------------------------------------------------------------------Discord API

const Discord = require("discord.js");
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: allIntents });
const fs = require('fs')


//-------------------------------------------------------------------------------------------------PostgreSQL API


//-------------------------------------------------------------------------------------------------Constant

require("dotenv").config();
const botName = "Miku";
const renameName = "MikuSlave"; //should be around 10 Characters Never go over lenghth 30
const mainServer = "606567664852402188";
const prefix = "!";

//---------------------------------------------------------------------Word Arrays

const slurWords = [
    "nigger",
    "nigga",
    "niger",
    "niga",
    "niggers",
    "niggas",
    "nigers",
    "nigas"
];

const owoWords = new Map([
    ["owo", "OwO"],
    ["uwu", "UwU"],
    ["òwó", "ÒwÓ"],
    ["ùwú", "ÙwÚ"],
    ["pog", "p...pog..pogchamp:see_no_evil::two_hearts:"],
    ["nice", "69"],
    ["boop", "boop:two_hearts:"]
]);


const interactiveImageLinksSFW = [
    "baka",
    "blush",
    "cute",
    "hug",
    "kill",
    "kiss",
    "lick",
    "love",
    "marry",
    "pain",
    "rob",
    "spank"
];

const interactiveImageLinksNSFW = [
    "anal",
    "armpit",
    "ass",
    "bdsm",
    "blowjob",
    "boobs",
    "bunny",
    "choke",
    "christmas",
    "creampie",
    "feet",
    "naked",
    "panties",
    "pussy",
    "sex",
    "titjob"
];

const interactiveFunctions = [
    "define",
    "help",
    "ping",
    "spam"
];

const interactiveOwnerFunctions = [
    "define",
    "help",
    "ping",
    "spam"
];

//-------------------------------------------------------------------------------------------------Boot

client.once("ready", () => {
    //gets executed once at the start of the bot
    client.user.setActivity(botName + " 4 President!");
    console.log(botName + " is online!");
    renameAll(client.guilds.cache.get(mainServer), renameName);
});

//-------------------------------------------------------------------------------------------------Message Event

client.on("messageCreate", (message) => {

    //---------------------------------------------------------------------Logs Messages

    if (message.channel.type == "GUILD_TEXT") {
        console.log(message.guild.name + ": " + message.author.tag + ": " + message.content);
    } else {
        console.log(message.author.tag + ": " + message.content);
    }

    //---------------------------------------------------------------------Returns 0 for invalid uses

    if (message.author.bot) {
        //ensures that the bot doesnt loop, talks with itself or other bots
        return 0;
    }

    if (message.channel.type != "GUILD_TEXT") {
        message.channel.send(
            "Miku only works inside a server!\n" +
            "Invite me to your server OwO\n\n" +
            "https://discord.com/api/oauth2/authorize?client_id=782328525071056918&permissions=8&scope=bot"
        );
        return 0;
    }

    //---------------------------------------------------------------------Anti Racist Chat

    for (var i = 0; i < slurWords.length; i++) {
        if (message.content.toLowerCase().includes(slurWords[i])) {
            message.delete();
            message.channel.send("You fucking racist go kys! :D");
            console.log("Deleted message for being racist from: " + message.author);
        }
    }

    //---------------------------------------------------------------------OwO UwU responses

    if (true) {
        var response = "";
        for (var i = 0; i < owoWords.size; i++) {
            if (message.content.toLowerCase().includes(Array.from(owoWords.keys())[i])) {
                response += owoWords.get(Array.from(owoWords.keys())[i]) + " ";
            }
        }
        if (response != "") {
            message.channel.send(response);
        }
    }
    //---------------------------------------------------------------------Command Setup

    if (
        //setup for commands that start with the prefix
        message.content.startsWith(prefix) &&
        !message.author.bot &&
        !message.content.toLowerCase().includes("@everyone") &&
        !message.content.toLowerCase().includes("@here")
    ) {
        const command = message.content.slice(prefix.length).toLowerCase();
        const commandSplitted = command.split(/[ ,]+/);

        //---------------------------------------------------------------------Interactive Image Commands SFW + NSFW

        for (var i = 0; i < interactiveImageLinksSFW.length; i++) {
            if (commandSplitted[0] == interactiveImageLinksSFW[i]) {
                message.channel.send("test", {
                    files: [mediaSelector("./images/SFW/" + commandSplitted[0] + "/")]
                });
                return 0;
            }
        }

        for (var i = 0; i < interactiveImageLinksNSFW.length; i++) {
            if (commandSplitted[0] == interactiveImageLinksNSFW[i]) {
                if (message.channel.nsfw) {
                    message.channel.send({
                        files: [mediaSelector("./images/NSFW/" + commandSplitted[0] + "/")]
                    });
                    return 0;
                } else {
                    message.channel.send("No NSFW allowed here!");
                    return 0;
                }
            }
        }

        //---------------------------------------------------------------------Interactive Function Commands 

        for (var i = 0; i < interactiveFunctions.length; i++) {
            if (commandSplitted[0] == interactiveFunctions[i]) {
                message.channel.send(eval(commandSplitted[0] + "(message,commandSplitted);"));
                return 0;
            }
        }
    }
});

//-------------------------------------------------------------------------------------------------Client Login

(async() => {
    //bot connects with Discord api
    client.login(process.env.TOKEN);
})();

//-------------------------------------------------------------------------------------------------Functions

//---------------------------------------------------------------------RenameAllInGuild

function renameAll(guild, renameName) {
    guild.members.fetch().then((members) => {
        members.forEach(async(member) => {
            if (member.user.id == guild.ownerId) {
                console.log("Can't rename owner: " + member.user.username);
            } else {
                if (!member.nickname ||
                    !member.nickname.toLowerCase().includes(renameName.toLowerCase())
                ) {
                    if (member.user.username.length + renameName.length <= 32) {
                        await member.setNickname(renameName + member.user.username);
                        console.log("renaming: " + member.user.username);
                    } else {
                        await member.setNickname(
                            renameName +
                            member.user.username.substring(0, 31 - renameName.length)
                        );
                        console.log("Renaming: " + member.user.username);
                    }
                }
            }
        });
        console.log("Renaming done! server: " + guild.name);
    });
}

//---------------------------------------------------------------------ReplyWithAllGuildInvite

async function replyWithInvite(message) {
    client.guilds.cache.forEach((guild) => {
        if (guild.available) {
            console.log(guild.name + " : " + guild.memberCount);
        }
        const channel = guild.channels.cache.filter((channel) => channel.type === 'GUILD_TEXT').first();
        if (typeof channel !== "undefined") {
            var invite = channel
                .createInvite({ maxAge: 0, maxUses: 1 })
                .then((invite) => {
                    message.channel.send(
                        invite ?
                        `Here is your invite: ${invite}` :
                        "There has been an error during the creation of the invite."
                    );
                });
        } else {
            console.log("There has been an error during the creation of the invite.")
        }
    });
}

//---------------------------------------------------------------------SelectImageOnThisPath

const fileEndings = [
    ".jpg",
    ".jpeg",
    ".gif",
    ".png"
]

function mediaSelector(path) {
    var fileEndingsLengthsTotal = 0;
    var fileEndingsLengths = [];
    for (var i = 0; i < fileEndings.length; i++) {
        var length = fs.readdirSync(path).filter(file => file.endsWith(fileEndings[i])).length
        fileEndingsLengths.push(length);
        fileEndingsLengthsTotal += length;
    }

    const luckyNumber = Math.random() * fileEndingsLengthsTotal;
    var cache = 0;
    for (var i = 0; i < fileEndings.length; i++) {
        cache += fileEndingsLengths[i];
        if (cache > luckyNumber) {
            var fileNumber = Math.floor(Math.random() * fileEndingsLengths[i]);
            return new Discord.MessageAttachment((path + fileNumber + fileEndings[i]),
                fileNumber + fileEndings[i]);
        }
    }
}

//---------------------------------------------------------------------TryCatch

function tryCatch(tryFunction) {
    try {
        tryFunction();
    } catch (e) {
        console.log("Error occured on " + tryFunction.name + ":\n" + e);
    }
}

//---------------------------------------------------------------------help

const helpArray = new Map([
    [interactiveImageLinksSFW, "SFW image"],
    [interactiveImageLinksNSFW, "NSFW image"],
    [interactiveFunctions, "Function"]
]);

function help(message) {
    var returnMessage = "> These are all command for " + botName + ": \n";
    for (var a = 0; a < helpArray.size; a++) {
        returnMessage += "\n> All " + helpArray.get(Array.from(helpArray.keys())[a]) + " commands:\n"
        for (var i = 0; i < Array.from(helpArray.keys())[a].length; i++) {
            returnMessage += "> " + Array.from(helpArray.keys())[a][i] + "\n";
        }
    }
    return returnMessage;
}

//---------------------------------------------------------------------ping

function ping(message) {
    var delay = 0;
    message.channel.send("Delay is: 0ms").then(m => {
        delay = m.createdTimestamp - message.createdTimestamp;
        m.edit("Delay is: " + delay + "ms");
    });
    return "> 🏓 pong!";
}

//---------------------------------------------------------------------describe function

function define(message) {
    const commandSplitted = message.content.slice(prefix.length).split(/[ ,]+/);
    try {
        return "```javascript\n" + eval(commandSplitted[1] + ".toString().replace(/`/g, '´')") + "```";
    } catch (e) {
        return "Error!";
    }
}

//---------------------------------------------------------------------spam

function spam(message) {
    var spamThis = message.content.slice(prefix.length + 4);
    if (spamThis.length == 0) {
        return "Error!";
    }
    var out = "";
    while (out.length + spamThis.length < 2000) {
        out += spamThis;
    }
    return out;
}