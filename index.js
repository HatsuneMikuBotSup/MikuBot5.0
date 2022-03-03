//-------------------------------------------------------------------------------------------------Discord API

const Discord = require("discord.js");
const allIntents = new Discord.Intents(32509);
const client = new Discord.Client({ intents: allIntents });

//-------------------------------------------------------------------------------------------------PostgreSQL API


//-------------------------------------------------------------------------------------------------Constant

require("dotenv").config();
const botName = "Miku";
const renameName = "🇺🇦"; //should be around 10 Characters Never go over lenghth 30


//-------------------------------------------------------------------------------------------------Boot

client.once("ready", () => {
    //gets executed once at the start of the bot
    client.user.setActivity(botName + " 4 President!");
    console.log(botName + " is online!");



});


//-------------------------------------------------------------------------------------------------Message Event

client.on("messageCreate", (message) => {

    console.log("got a message");
    /*
    if (message.channel.type == "text") {
        console.log(message.author.tag + ": " + message.content);
    } else {
        console.log(
            message.guild.name + " " + message.author.tag + ": " + message.content
        );
    }

    if (message.author.bot) {
        //ensures that the bot doesnt loop, talks with itself or other bots
        return 0;
    }

    if (message.channel.type == "text") {
        message.channel.send(
            "Miku only works inside a server!\n" +
            "Invite me to your server OwO\n\n" +
            "https://discord.com/api/oauth2/authorize?client_id=782328525071056918&permissions=8&scope=bot", { files: ["images/cute/4.jpg"] }
        );
        return 0;
    }



    if (message.author.id == "355429746261229568") {}

    */

});


//-------------------------------------------------------------------------------------------------Client Login

(async() => {
    //bot connects with Discord api
    client.login(process.env.TOKEN);
})();

//-------------------------------------------------------------------------------------------------Functions

//-------------------------------------------------------------------------------------------------RenameAllInGuild

function renameAll(guild, renameName) {
    guild.members.fetch().then((members) => {
        members.forEach(async(member) => {
            if (member.user.id == guild.ownerID) {} else {
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
    });
}

//-------------------------------------------------------------------------------------------------ReplyWithAllGuildInvite

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
                        `Here's your invite: ${invite}` :
                        "There has been an error during the creation of the invite."
                    );
                });
        } else {
            console.log("There has been an error during the creation of the invite.")
        }

    });
}