const Discord = require("discord.js");
const { get } = require("request");

module.exports.run = (client, message, args) => {

    const { config, embeds, stockManager, productManager } = client;
    const { getStock } = stockManager;
    const { getProducts } = productManager;

    const staffweb = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');


    if (!this.hasAccess(client, message)) return;

    var products = getProducts();

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} Bot Market`, client.user.avatarURL)
        .setColor("GREEN")

    products.forEach(product => {
        stockEmbed.addField(product.displayName, `**${getStock(product.name)}** accounts`, true);
    });
    message.channel.send(stockEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Status Checked`)
        .setDescription(`**<@${message.author.id}> Successfully checked stocks status**`)
        .setColor("GREEN")
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff users ID**", `**${message.author.id}**`)
        .setFooter('Made with love')
        .setTimestamp()
    staffweb.send(stockEmbed);


}

module.exports.help = {
    accessRoles: ["staff", "tools"],
    description: "Checks the stock all the types.",
    usage: "**-checkstatus**"
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