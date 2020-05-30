const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    const { config, embeds, stockManager, productManager } = client;
    const { removeProduct, getProduct } = productManager;

    const hook = new Discord.WebhookClient('672611624473067521', 'PWSrWqsxFPSqsYmo7v_P_2-Xlx3Jl8sKewEhuF1MfL1WDDp4qHmJSC7u4nBX1YjAKdaS');
    const hooka = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');

    if (!this.hasAccess(client, message)) return;

    var name = args[0];
    var find = getProduct(name.toLowerCase());
    if (!find) {
        var errEmbed = embeds.errorEmbed("This product does not exists.");
        return message.channel.send(errEmbed);
    }

    removeProduct(find);


    var productEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Product Removed`)
        .setDescription("**You Succesfully Removed a new product**")
        .setColor("GREEN")
        .addField("**Name**", `**${find.displayName}**`, true)
        .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
        .addField("**Price**", `**${find.price}**`, true)
        .setFooter('Made with love')
        .setTimestamp()
    message.channel.send(productEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Product Removed`)
        .setDescription(`**<@${message.author.id}> Succesfully Removed a new product **`)
        .setColor("GREEN")
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff user ID**", `**${message.author.id}**`)
        .addField("**Name**", `**${find.displayName}**`, true)
        .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
        .addField("**Price**", `**${find.price}**`, true)
        .setFooter('Made with love')
        .setTimestamp()
    hooka.send(stockEmbed);

    var stockEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setTitle(`Product Removed`)
    .setDescription(`**<@${message.author.id}> Removed Added A New product**`)
    .setColor("GREEN")
    .addField("**Name**", `**${find.displayName}**`, true)
    .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
    .addField("**Price**", `**${find.price}**`, true)
    .setFooter('Made with love')
    .setTimestamp()
hook.send(stockEmbed);

    require('./market.js').run(client, null, null);

}

module.exports.help = {
    accessRoles: ["tools", "accountSupplier"],
    description: "Removes a existing product type to stock.",
    usage: "**-removeproduct** [name]"
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