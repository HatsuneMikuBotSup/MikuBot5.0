//-------------------------------------------------------------------------------------------------Discord API

const Discord = require("discord.js");
const allIntents = new Discord.Intents(32767);
const client = new Discord.Client({ intents: allIntents });
const request = require("request");
const { Client } = require("pg");
const fs = require("fs");
const path2 = require("path");
const { hasUncaughtExceptionCaptureCallback } = require("process");
require("dotenv").config();


//-------------------------------------------------------------------------------------------------PostgreSQL API

const database = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: process.env.DATABASE,
    database: "MikuBot5.0"
})

//-------------------------------------------------------------------------------------------------Constant


const botName = "Miku";
const renameName = "FuckPutin"; //should be around 10 Characters Never go over lenghth 30
const mainServer = "606567664852402188";
const mainServerDailyDose = "668260830160093184";
const prefix = "!";
var verifyTimer = 1000 * 60 * 1;

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

const interactiveImageSFW = new Map([
    ["baka", ["BAKA", "baka", "Anatawa baka desu", "idiot", "idiot :see_no_evil:", "baka :see_no_evil:", ">:I"]],
    ["blush", [">///<", ".....", "uhhh...", "uhmmmm", ">w<", ">.<", ">//.//<", "O//w//O"]],
    ["cute", ["Nyaa!", "^w^", "pat me!", "Hug me!", "Give me a headpat >.<", "Nya :3"]],
    ["hug", ["ugh fine, I guess u ARE my little pogchamp. Come here!", "come in my arms ^w^!", "huggie wuggie :>", "*hugs*", ":heart:"]],
    ["kill", ["ur time has come -.- ", "time to die", "u dead :3", "hihihiHEHEHEEH", "BONK", "bye bye :>", "I got good money to kill u owo"]],
    ["kiss", ["kisses", "smouch", "xoxo", "hihi", ":kissing_closed_eyes:", ":kiss:"]],
    ["lick", ["I will lick ur tears :>", "yummmm:heart:", "heehee:star_struck:", ":3"]],
    ["love", ["love you too"]],
    ["marry", ["You are my one and only", "Please by my waifu", "Will you be me wife?", "pls marry me uwu"]],
    ["pain", ["..it..h-hurts...", "pain", "I live in Spain without the S", "life is pain", "everything sucks", "Im not feeling well :(", "*sigh*"]],
    ["rob", ["This is a robbery, give me all your money!", "This is a wobbewy, giv me all ur moni UwU"]],
    ["spank", ["u wer vewy bad >:I"]]
]);

const interactiveImageNSFW = new Map([
    ["anal", ["...d-daddy!", "MY ASS >w<", "IT HURTS!", "MY ASS IS WIDE OPEN!", "UR HURTING ME", "nasty boii :>", "u like it rough, heh? :3", "TOO DEEP!", "IT FEELS SO GOOD!", "U hit the wrong hole Onii-Chan!", "You're stretching my asshole :sob:", "DEEPER DEEPER!", "wrong hole :woozy_face:", "THATS THE SPOT :heart:", "I wont be able to walk after this :sob:", "STOOP :sob:", "Your dick is to massive :sob:"]],
    ["armpit", ["Don't tickle me there!", "*yawn*"]],
    ["ass", ["Zzz..", "What are u looking at Onii-chan?", "OwO", "I hope noone sees me naked", "Eeeek!", "O////O", "Put it in :woozy_face:", ":woozy_face: :smirk: "]],
    ["bdsm", ["Stop crying", "Open ur holes", "U won't be able to walk after this", "U CANT ESCAPE ME", ":heart:", "Do u like that?"]],
    ["blowjob", ["Succi Succ", "its soo big o.o", "slurp", "so tasty owo", "I hope u cum in my mouth :see_no_evil:", "Mhmhm does it feel good?", "Mhmhm how does it feel?", "its so massive", "its so big o.o", "It nearly just fits :eyes:", "Cum on my face :weary:", "I want to swallow ur cum :drooling_face:"]],
    ["boobs", ["I hope u like them", "MY TITS ARENT SMALL >:c", "Stop saying they are small :sob:", "Hehe :>", "Don't look at me like that Onii-Chan!", "quit staring", "uhmmmm >.<", "Do u think they are big?", "pls touch them >///<", "please massage them good :>"]],
    ["bunny", ["Nyaa!", "^w^", "pat me!", "Hug me!", "Give me a headpat >.<", "Nya :3", "Am I a good girl? :o"]],
    ["choke", ["I cant breathe..."]],
    ["christmas", ["Mewwy chwistmas UwU"]],
    ["creampie", ["I will get pregnant :sob:", "DID U CUM INSIDE ME?!", "YESSS ONII-CHAN!", "*moans* >///<", "I hope you used a condom", "THIS FEELS SO GOOD", "I CAN FEEL UR HOT CUM", "How should we call the baby? :uwu:", "Don't tell my mom about this, she will kill me", "OMG YES :heart: I LOVE U", "ONII-CHAANNNN O//.//O", "SO MUCH CUM!", "WOAH so much cum o.o", "yes Yes YESSS >//w//<", "Ur cum is so sticky :woozy_face:"]],
    ["feet", ["Don't tickle me there", ">///<", "Do u like my feets?"]],
    ["naked", ["Hehe :>", "Don't look at me like that Onii-Chan!", "quit staring!", "uhmmmm >.<", "Do u like my body?", "Please use me :heart:", "Can I see ur pp now? >///<", "pls touch me O/./O", "Can I touch ur pp now? owo", "Do you think im sexy? :>", "My eyes are up here baka"]],
    ["panties", ["Eeeek!"]],
    ["pussy", ["Hehe :>", "Don't look at me like that Onii-Chan!", "quit staring!", "uhmmmm >.<", "Do u like my pussy?", "Please use me :heart:", "Can I see ur pp now? >///<", "pls touch it O/./O", "Put it inside allready! :heart:", "I think I lost my credit card inside it, can u check?", "Can we have...s-sex?", "Im giving u consent uwu", "you can do everything u want with me >w<", "please be gentle >.<", "U said u will give me an ice if I show it to u", "I think ur pp wont fit :weary:"]],
    ["sex", ["DEEPER!", "CUM INSIDE ME!", "Onii-chan?! >///<", "HARDER!", "DON'T CUM INSIDE ME!", "IM NOT A VIRGIN ANYMORE!:sob:", "This is my first time", "THIS FEELS SOO GOOD!", "FUCK ME HARDER DADDY!", "FUCK ME HARDER ONII-CHAN!", "YOUR DICK IS TOO LARGE!:sob:", "I can feel your dick inside me", "I can feel your dick move inside me", "PLEASE BE GENTLE", "USE ME!", "OMG YES *moans*", "OMG YES :weary:", "Thats the spot", ":heart:", "Ur mine :heart:", "Your dick is to MASSIVE :sob:"]],
    ["titjob", ["not on my face Onii-Chan!", "Your Cum is so warm", "I hope u liked it >.<", "WOAH so much cum o.o"]]
]);

const interactiveFunctions = new Map([
    ["describe", ""],
    ["help", ""],
    ["helpall", ""],
    ["horny", ""],
    ["ping", ""],
    ["submit", ""],
    ["spam", ""]
]);

const interactiveOwnerFunctions = new Map([
    ["dailydosemiku", ""],
    ["renameall", ""],
    ["verifyimage", ""]
]);

//---------------------------------------------------------------------Cache



//-------------------------------------------------------------------------------------------------Boot

client.once("ready", () => {
    //gets executed once at the start of the bot
    client.user.setActivity(botName + " 4 President!");
    console.log(botName + " is online!");
    database.connect().then(console.log("Database connected!"));
    renameAll(client.guilds.cache.get(mainServer), renameName);
    //createDailyDoseMiku();
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

        for (var i = 0; i < interactiveImageSFW.size; i++) {
            if (commandSplitted[0] == Array.from(interactiveImageSFW.keys())[i]) {
                var mention = "";
                if (message.mentions.members.size > 0) {
                    mention = `${message.mentions.members.first().user}`;
                }
                var shoutOutArray = interactiveImageSFW.get(commandSplitted[0]);
                var shoutOut = shoutOutArray[Math.floor(Math.random() * shoutOutArray.length)] + mention;
                var file = mediaSelector("./images/SFW/" + commandSplitted[0] + "/");
                message.channel.send({ content: shoutOut, files: [file] });
                return 0;
            }
        }

        for (var i = 0; i < interactiveImageNSFW.size; i++) {
            if (commandSplitted[0] == Array.from(interactiveImageNSFW.keys())[i]) {
                if (message.channel.nsfw) {
                    var mention = "";
                    if (message.mentions.members.size > 0) {
                        mention = `${message.mentions.members.first().user}`;
                    }
                    var shoutOutArray = interactiveImageNSFW.get(commandSplitted[0]);
                    var shoutOut = shoutOutArray[Math.floor(Math.random() * shoutOutArray.length)] + mention;
                    var file = mediaSelector("./images/NSFW/" + commandSplitted[0] + "/");
                    message.channel.send({ content: shoutOut, files: [file] });
                    return 0;
                } else {
                    message.channel.send("No NSFW allowed here!");
                    return 0;
                }
            }
        }

        //---------------------------------------------------------------------Interactive Function Commands 

        for (var i = 0; i < interactiveFunctions.size; i++) {
            if (commandSplitted[0] == Array.from(interactiveFunctions.keys())[i]) {
                eval(commandSplitted[0] + "(message);");
                return 0;
            }
        }

        for (var i = 0; i < interactiveOwnerFunctions.size; i++) {
            if (commandSplitted[0] == Array.from(interactiveOwnerFunctions.keys())[i]) {
                eval(commandSplitted[0] + "(message);");
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

//---------------------------------------------------------------------RenameAllInGuild MessageBased

function renameall(message) {
    var guild = message.guild;
    const renameName = message.content.slice(prefix.length).split(/[ ,]+/)[1];
    message.channel.send(renameAll(guild, renameName));
}

//---------------------------------------------------------------------RenameAllInGuild

function renameAll(guild, renameName) {
    if (renameName == null || renameName == undefined || renameName.length > 30 || renameName.length < 1) {
        return "Invalid rename name!";
    }
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
    return "Starting to rename everyone with: " + renameName;
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
    [interactiveImageSFW, "SFW image"],
    [interactiveImageNSFW, "NSFW image"],
    [interactiveFunctions, "function"],
    [interactiveOwnerFunctions, "owner function"],
]);

function help(message) {
    var out = "> These are all command for " + botName + ": \n";
    for (var a = 0; a < helpArray.size; a++) {
        out += "\n> All " + helpArray.get(Array.from(helpArray.keys())[a]) + " commands:\n"
        for (var i = 0; i < Array.from(helpArray.keys())[a].size; i++) {
            out += "> " + Array.from(Array.from(helpArray.keys())[a].keys())[i] + "\n";
        }
    }
    message.channel.send(out);
}

//---------------------------------------------------------------------ping

function ping(message) {
    var delay = 0;
    message.channel.send("🏓 pong!").then(m => {
        delay = m.createdTimestamp - message.createdTimestamp;
        m.edit("Delay is: " + delay + "ms");
    });
}

//---------------------------------------------------------------------describe function

function describe(message) {
    const commandSplitted = message.content.slice(prefix.length).split(/[ ,]+/);
    try {
        var out = eval(commandSplitted[1] + ".toString().replace(/`/g, '´')").match(/(.|[\r\n]){1,1980}/g);
        for (var i = 0; i < out.length; i++) {
            message.channel.send("```javascript\n" + out[i] + "```");
        }
    } catch (e) {
        message.channel.send("Error!");
    }
}

//---------------------------------------------------------------------spam

function spam(message) {
    var spamThis = message.content.slice(prefix.length + 4);
    if (spamThis.length == 0) {
        message.channel.send("Error!");
    }
    var out = "";
    while (out.length + spamThis.length < 2000) {
        out += spamThis;
    }
    message.channel.send(out);
}

//---------------------------------------------------------------------horny

function horny() {
    message.channel.send("IM FUCKING HORNY!");
}

//---------------------------------------------------------------------submit

async function submit(message) {
    try {
        var url = [];
        if (message.attachments.size > 0) {
            for (var i = 0; i < message.attachments.size; i++) {
                url[i] = (message.attachments.get(Array.from(message.attachments.keys())[i]).url);
            }
        } else {
            url = message.content.slice(prefix.length).split(/\s+/);
            url.shift();
        }
        console.log(url);
        url.forEach(function(element) {
            request.head(element, function(err, res, body) {
                var ending = "." + res.headers['content-type'].split("/")[1];
                for (var i = 0; i < fileEndings.length; i++) {
                    if (ending == fileEndings[i]) {
                        var path = "./images/dailydosemikupending/" + message.author + "." + Date.now() + ending;
                        request(element).pipe(fs.createWriteStream(path));
                        message.channel.send("Submission succesfull!");
                        return 0;
                    }
                }
                message.channel.send("Filetype not accepted or to big!");
            });
        });

    } catch (e) {
        message.channel.send("Error!");
    }
}

//---------------------------------------------------------------------verifyimage

function verifyimage(message) {
    verifyImage(message.guild);
}

//---------------------------------------------------------------------verifyImage

async function verifyImage(guild) {
    try {
        var channel = client.channels.cache.get(mainServerDailyDose); //guild => channel
        var path = "./images/dailydosemikupending/";
        var destination = "./images/dailydosemiku/";
        var files = fs.readdirSync(path);
        var chosenFile = files[Math.floor(Math.random() * files.length)];

        if (chosenFile == undefined) {
            channel.send("Nothing to verify at the moment. Submit something with " + prefix + "submit");
            return 0;
        }
        channel.send({ content: "Pleasy verify this image :heart:", files: [path + chosenFile] })
            .then(function(message) {
                message.react("✅");
                message.react("❌");
                setTimeout(function() {
                    if (!fs.existsSync(path + chosenFile)) {
                        message.edit("Image disappeared...?");
                        message.reactions.removeAll();
                        return 0;
                    }
                    var likes = message.reactions.cache.get("✅").count;
                    var dislikes = message.reactions.cache.get("❌").count;
                    if (likes > dislikes) {
                        message.edit("Image verified!");
                        message.reactions.removeAll();
                        fs.readdir(destination, (err, files) => {
                            var iterator = files.length;
                            database.query(`INSERT INTO "MikuBot5.0"."DailyImage"(
                                "Id", ending, blacklisted, submitter, "timestamp") VALUES (` +
                                iterator + `,'` +
                                path2.extname(chosenFile).slice(1) + `',` +
                                false + `,` +
                                chosenFile.split(".")[0] + `,'` +
                                (new Date(Date.now())).toLocaleString() + `');`);
                            fs.copyFileSync(path + chosenFile, destination + iterator + path2.extname(chosenFile));
                            fs.unlinkSync(path + chosenFile);
                        });
                    } else if (likes < dislikes) {
                        message.edit("Image rejected!");
                        message.reactions.removeAll();
                        fs.unlinkSync(path + chosenFile);
                    } else {
                        message.edit("Image remains pending!");
                        message.reactions.removeAll();
                    }
                }, verifyTimer);
            });
    } catch (e) {
        channel.send("Error!");
    }
}

//---------------------------------------------------------------------dailydosemiku

function dailydosemiku(message) {
    dailyDoseMiku(message.guild);
}

//---------------------------------------------------------------------dailyDoseMiku

function dailyDoseMiku(guild) {
    var path = "./images/dailydosemiku/";
    var files = fs.readdirSync("./images/dailydosemiku/");
    let chosenFile = files[Math.floor(Math.random() * files.length)];
    client.channels.cache.get(mainServerDailyDose).send({ content: "This is YOUR daily dose of miku!", files: [path + chosenFile] });
}

//---------------------------------------------------------------------createDailyDoseMiku

function createDailyDoseMiku() {
    client.guilds.cache.forEach((guild) => {
        dailyDoseMiku(guild);
    });
}