const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    const hooka = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');


    require('./market.js').run(client, null, null);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Refreshed Market`)
        .setDescription(`**Successfully Refreshed Market**`)
        .setColor("GREEN")
        .setFooter('Made with love')
        .setTimestamp()
    message.channel.send(stockEmbed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Refreshed Market`)
        .setColor("GREEN")
        .setDescription(`**${message.author.tag} Successfully Refreshed Market**`)
        .addField("**Refreshed by**", `** ${message.author.tag} **`)
        .addField("**Refreshers's ID**", `**${message.author.id}**`)
        .setFooter('Made with love')
        .setTimestamp()
    hooka.send(stockEmbed);

}

module.exports.help = {
    accessRoles: ["administrator", "tools", "mod"],
    description: "Refreshes market. Moderator+ may use this command",
    usage: "**-refresh**"
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