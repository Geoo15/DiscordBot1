const Discord = require("discord.js");
const { get } = require("request");

module.exports.run = (client, message, args) => {

    const { config, embeds, stockManager, productManager } = client;
    const { getProduct, newProduct } = productManager;

    const hook = new Discord.WebhookClient('672611624473067521', 'PWSrWqsxFPSqsYmo7v_P_2-Xlx3Jl8sKewEhuF1MfL1WDDp4qHmJSC7u4nBX1YjAKdaS');
    const hooka = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');

    if (!this.hasAccess(client, message)) return;

    var displayName = args[0];
    var emoji = args[1];
    var price = args[2];

    if (!displayName) {
        var errEmbed = embeds.errorEmbed("Please provide a displayName.");
        return message.channel.send(errEmbed);
    }

    if (!emoji || !emoji.match(/(<:)[a-zA-z]{2,15}(:)[0-9]{18}(>)/g)) {
        var errEmbed = embeds.errorEmbed("Please provide an emoji.");
        return message.channel.send(errEmbed);
    }

    if (!price || isNaN(parseInt(price))) {
        var errEmbed = embeds.errorEmbed("Please provide a valid price.");
        return message.channel.send(errEmbed);
    }

    var find = getProduct(displayName.toLowerCase());

    if (find) {
        var errEmbed = embeds.errorEmbed("This product already exists.");
        return message.channel.send(errEmbed);
    }

    var product = newProduct(displayName, emoji, parseInt(price));

    var productEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Product Added`)
        .setDescription("**You Succesfully created a new product**")
        .setColor("GREEN")
        .addField("**Name**", `**${product.displayName}**`, true)
        .addField("**Emoji**", `<:${product.emoji.name}:${product.emoji.id}>`, true)
        .addField("**Price**", `**${product.price}**`, true)
        .setFooter('Made with love')
        .setTimestamp()
    message.channel.send(productEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Product Added`)
        .setDescription(`**<@${message.author.id}> Succesfully created a new product **`)
        .setColor("GREEN")
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff user ID**", `**${message.author.id}**`)
        .addField("**Name**", `**${product.displayName}**`, true)
        .setThumbnail(message.guild.emojis.find(i => i.id == product.emoji.id).url)
        .addField("**Price**", `**${product.price}**`, true)
        .setFooter('Made with love')
        .setTimestamp()
    hooka.send(stockEmbed);

    var stockEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle(`Product Added`)
    .setDescription(`**<@${message.author.id}> Successfully Added A New product**`)
    .setColor("GREEN")
    .addField("**Name**", `**${product.displayName}**`, true)
    .setThumbnail(message.guild.emojis.find(i => i.id == product.emoji.id).url)
    .addField("**Price**", `**${product.price}**`, true)
    .setFooter('Made with love')
    .setTimestamp()
hook.send(stockEmbed);

    require('./market.js').run(client, null, null);

}

module.exports.help = {
    accessRoles: ["tools", "accountSupplier"],
    description: "Adds a new product type to stock.",
    usage: "**-addproduct** [displayName] [emoji] [price]"
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