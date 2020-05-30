const Discord = require("discord.js");
const { get } = require("request");

module.exports.run = (client, message, args) => {

    const hook = new Discord.WebhookClient('672611624473067521', 'PWSrWqsxFPSqsYmo7v_P_2-Xlx3Jl8sKewEhuF1MfL1WDDp4qHmJSC7u4nBX1YjAKdaS');
    const hooka = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');

    const { config, embeds, stockManager, productManager } = client;
    const { addAccount, getStock } = stockManager;
    const { getProduct } = productManager;

    if (!this.hasAccess(client, message)) return;

    message.channel.send("**Verifying...**").then(msg => {
        setTimeout(() => {
            msg.delete();
            message.delete();
        }, 500);
    })

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

    var file = message.attachments.first();
    if (!file || !file.filename.includes(".txt")) {
        var errEmbed = embeds.errorEmbed("Please provide a valid file.");
        return message.channel.send(errEmbed);
    }

    get(file.url, {}, (err, res, body) => {
        var rows = body.split("\n");

        rows.forEach(row => {
            var combo = row.split(":");
            addAccount(type, { email: combo[0], password: combo[1].replace("\r", "") });
        })

        var stockEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`Account Stocked`)
            .setDescription(`**Successfully stocked** ${find.displayName}`)
            .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
            .setColor("GREEN")
            .addField("**Amount stocked**", `**${rows.length}** accounts`, true)
            .addField("**Total Stock**", `**${getStock(find.name)}** accounts`, true)
            .setFooter('Made with love')
            .setTimestamp()
        hook.send(stockEmbed);

        var stockEmbed = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`Account Stocked`)
            .setDescription(`**Successfully stocked** ${find.displayName}`)
            .setColor("GREEN")
            .setThumbnail(message.guild.emojis.find(i => i.id == find.emoji.id).url)
            .addField("**Stocked by**", `** ${message.author.tag} **`)
            .addField("**Stocker's ID**", `**${message.author.id}**`)
            .addField("**Amount stocked**", `**${rows.length}** accounts`, true)
            .addField("**Total Stock**", `**${getStock(find.name)}** accounts`, true)
            .setFooter('Made with love')
            .setTimestamp()
        hooka.send(stockEmbed);

        require('./market.js').run(client, null, null);

    })

}

module.exports.help = {
    accessRoles: ["tools", "accountSupplier"],
    description: "Stock accounts of an specific type.",
    usage: "**-stock** [type]"
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