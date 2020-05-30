const Discord = require("discord.js");

module.exports.run = require("./balance.js").run;

module.exports.help = {
    description: "Checks your's or another user's balance",
    usage: "**-bal** [user]"
}