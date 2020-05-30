const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (client, message, args) => {

    const { config, embeds, stockManager, productManager } = client;
    const { removeProduct, getProduct } = productManager;
    const { getStockJSON } = stockManager;

    const hooka = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');

    if (!this.hasAccess(client, message)) return;

    var name = args[0];
    var find = getProduct(name.toLowerCase());
    if (!find) {
        var errEmbed = embeds.errorEmbed("This product does not exists.");
        return message.channel.send(errEmbed);
    }

    var stock = getStockJSON(find.name);
    var stockTxt = "";

    stock.forEach(combo => {
        stockTxt += `${combo.email}:${combo.password}\n`;
    })

    fs.writeFileSync("./temp.txt", stockTxt, { encoding: 'utf8' });

    var productEmbed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} Bot Market`, client.user.avatarURL)
        .setDescription("Succesfully exported stock")
        .setColor("GREEN")
        .addField("Name", `**${find.displayName}**`, true)
        .attachFile("./temp.txt")
    message.author.send(productEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Product Exported`)
        .setDescription(`**<@${message.author.id}> Successfully Exported ${find.name}**`)
        .setColor("GREEN")
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff user ID**", `**${message.author.id}**`)
        .setFooter('Made with love')
        .setTimestamp()
    hooka.send(stockEmbed);
    

}

module.exports.help = {
    accessRoles: ["tools", "accountSupplier"],
    description: "Exports a existing product type.",
    usage: "-export [name]"
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