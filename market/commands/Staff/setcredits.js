const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    const { config, embeds, creditManager } = client;
    const { setCredits, getCredits } = creditManager;

    const hooka = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');

    if (!this.hasAccess(client, message)) return;

    var toGive = message.mentions.users.first();
    if (!toGive) {
        var errEmbed = embeds.errorEmbed("Uh oh, couldn't find this user.");
        return message.channel.send(errEmbed);
    }

    var amount = parseInt(args[1]);
    if (!amount || isNaN(amount)) {
        var errEmbed = embeds.errorEmbed("Please define a valid number.");
        return message.channel.send(errEmbed);
    }

    setCredits(toGive.id, amount);

    var newToGiveBalance = getCredits(toGive.id);

    var giveEmbed = new Discord.RichEmbed()
        .setTitle("Credits Set")
        .setDescription(`Set user <@${toGive.id}> balance to **${amount} credits**!`)
        .addField(`${toGive.username}'s balance`, newToGiveBalance, true)
        .setColor("#00ff00")
    message.channel.send(giveEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Credits Set`)
        .setDescription(`**<@>Successfully Set user <@${toGive.id}> balance to **${amount} credits`)
        .setColor("GREEN")
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff's ID**", `**${message.author.id}**`)
        .setFooter('Made with love')
        .setTimestamp()
    hooka.send(stockEmbed);

}

module.exports.help = {
    accessRoles: ["administrator", "tools", "accountSupplier"],
    description: "Sets credits to a user.",
    usage: "**-setcredit** [user] [amount]"
}

module.exports.hasAccess = (client, message) => {
    var hasAccess = false;
    this.help.accessRoles.forEach(role => {
        var roleID = client.config.roles[role];
        var r = message.guild.roles.find(i => i.id == roleID);
        if (message.member.roles.array().includes(r)) {
            hasAccess = true;
        }
    });
    return hasAccess;
}