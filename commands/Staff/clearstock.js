const Discord = require("discord.js");
const { get } = require("request");

module.exports.run = (client, message, args) => {

    const { config, embeds, stockManager, productManager } = client;
    const { getStock, delStock } = stockManager;
    const { getProduct } = productManager;

    const hook = new Discord.WebhookClient('672611624473067521', 'PWSrWqsxFPSqsYmo7v_P_2-Xlx3Jl8sKewEhuF1MfL1WDDp4qHmJSC7u4nBX1YjAKdaS');
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

    delStock(find.name);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Stock Cleared`)
        .setDescription(`**Successfully Cleared** ${find.displayName}**'s stock**`)
        .setColor("GREEN")
        .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
        .addField("**Cleared by**", `** ${message.author.tag} **`)
        .addField("**Total Stock**", `**${getStock(find.name)}** accounts`)
        .setFooter('Made with love')
        .setTimestamp()
             hook.send(stockEmbed);

    var stockEmbed = new Discord.RichEmbed()
       .setAuthor(message.author.username, message.author.avatarURL)
       .setTitle(`Stock Cleared`)
        .setDescription(`**Successfully Cleared ${find.displayName}'s stock`)
       .setColor("GREEN")
       .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
       .addField("**Cleared by**", `** ${message.author.tag} **`)
       .addField("**Clearer's ID**", `**${message.author.id}**`)
       .addField("**Total Stock**", `**${getStock(find.name)}** accounts`)
       .setFooter('Made with love')
       .setTimestamp()
    hooka.send(stockEmbed);

    require('./market.js').run(client, null, null);


}

module.exports.help = {
    accessRoles: ["tools", "accountSupplier"],
    description: "Clears the stock of an specific type. AccountSupplier+ may use this command",
    usage: "**-clearstock** [type]"
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