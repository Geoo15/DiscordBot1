const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    const staffweb = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');

    const { config, embeds, creditManager } = client;
    const { removeCredits, getCredits } = creditManager;


    var toGive = message.mentions.users.first();
    if (!toGive) {
        var errEmbed = embeds.errorEmbed("Uh oh, couldn't find this user.");
        return message.channel.send(errEmbed);
    }

    removeCredits(toGive.id, 99999999999999999999999999);

    var newToGiveBalance = getCredits(toGive.id);

    var giveEmbed = new Discord.RichEmbed()
        .setTitle(":white_check_mark: Transaction Complete")
        .setDescription(`**Successfully Reseted  <@${toGive.id}>!'s credits!**`)
        .addField(`${toGive.username}'s balance`, `**${newToGiveBalance}**`, true)
        .setColor("#00ff00")
    message.channel.send(giveEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Credits Reset`)
        .setDescription(`**Successfully Reseted <@${toGive.id}>!'s credits!**`)
        .setColor("GREEN")
        .addField("**Staff user:**", `** ${message.author.tag} **`)
        .addField("**Staff users ID:**", `**${message.author.id}**`)
        .addField("**Targets's Balance**",`**${newToGiveBalance}**`, true)
        .setFooter('Made with love')
        .setTimestamp()
    staffweb.send(stockEmbed);
}

module.exports.help = {
    accessRoles: ["administrator", "tools", "accountSupplier"],
    description: "Resets [user]/users credits.",
    usage: "**-reset** [user]"
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