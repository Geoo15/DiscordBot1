const Discord = require("discord.js");
const { get } = require("request");

module.exports.run = (client, message, args) => {

    const { config, embeds, stockManager, productManager } = client;
    const { getStock } = stockManager;
    const { getProduct } = productManager;

    const staffweb = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');

    if (!this.hasAccess(client, message)) return;

    var type = args[0];
    if (!type) {
        var errEmbed = embeds.errorEmbed("Please provide a type of account.");
        return message.channel.send(errEmbed);
    }

    var find = getProduct(type.toLowerCase());
    if (!find) {
        var errEmbed = embeds.errorEmbed("This product does not exists.");
        return message.channel.send(errEmbed);
    }

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("GREEN")
        .addField("Stock", `${getStock(find.name)}`)
    message.channel.send(stockEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Stock Checked`)
        .setDescription(`**<@${message.author.id}> Successfully checked ${find.displayName} stocks**`)
        .setColor("GREEN")
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff users ID**", `**${message.author.id}**`)
        .setFooter('Made with love')
        .setTimestamp()
    staffweb.send(stockEmbed);

}

module.exports.help = {
    accessRoles: ["staff"],
    description: "Checks the stock of an specific type.",
    usage: "**-checkstock** [type]"
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