const Discord = require("discord.js");
const { post } = require("request");

module.exports.run = (client, message, args) => {

    const { config, embeds, stockManager, productManager } = client;
    const { getProduct } = productManager;
    const { grabAccount } = stockManager;

    const hooka = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');

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

    var account = grabAccount(find.name);

    if (!account) {
        var errEmbed = embeds.errorEmbed(`We do not have ${find.displayName} accounts on stock.`);
        return message.channel.send(errEmbed);
    }

    var embed = new Discord.RichEmbed()
        .setTitle(":white_check_mark: Grabbed Account")
        .setColor("#00ff00")
        .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
        .addField("**Email**", `**${account.email}**`, true)
        .addField("**Password**", `**${account.password}**`, true)
        .setFooter('Made with love')
        .setTimestamp()
    message.channel.send(embed)

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Account Grabbed`)
        .setDescription(`**<@${message.author.id}> Successfully Grabbed an account**`)
        .setColor("GREEN")
        .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff users ID**", `**${message.author.id}**`)
        .addField("**Email**", `**${account.email}**`, true)
        .addField("**Password**", `**${account.password}**`, true)
        .setFooter('Made with love')
        .setTimestamp()
    hooka.send(stockEmbed);
}

module.exports.help = {
    accessRoles: ["administrator", "tools", "accountSupplier", "mod"],
    description: "Gets an account of an specific type.",
    usage: "**-getaccount** [type]"
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