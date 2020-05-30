const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    const { config, embeds, creditManager } = client;
    const { removeCredits, getCredits } = creditManager;

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

    removeCredits(toGive.id, amount);

    var newToGiveBalance = getCredits(toGive.id);

    var giveEmbed = new Discord.RichEmbed()
        .setTitle("Credits Removed")
        .setDescription(`Removed **${amount} credits** from user <@${toGive.id}>!`)
        .addField(`${toGive.username}'s balance`, newToGiveBalance, true)
        .setColor("#00ff00")
        .setFooter('Made with love')
        .setTimestamp()
    message.channel.send(giveEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Credits Removed`)
        .setDescription(`**<@${message.author.id}> Successfully Removed points to <@${toGive.id}>**`)
        .setColor("GREEN")
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff user ID**", `**${message.author.id}**`)
        .addField("**Amount Removed**", `**${amount}** credits`, true)
        .addField(`**${toGive.username} balance**`, `**${newToGiveBalance}** credits`, true)
        .setFooter('Made with love')
        .setTimestamp()
    hooka.send(stockEmbed);

}

module.exports.help = {
    accessRoles: ["administrator", "tools", "accountSupplier"],
    description: "Remove credits from a user. Administrator+ may use this command",
    usage: "**-removecredits** [user] [amount]"
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