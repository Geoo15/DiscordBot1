const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    const { config, embeds } = client;

    const staffweb = new Discord.WebhookClient('673393437105586186', 'CbLGzddVZ14BFqBPOqO2V11if-8Quoj8DFhkCIqQ5ALBxwkyhNtQxMNCBxDppS8OVyCZ');


    if (!this.hasAccess(client, message)) return;

    if (!args[0]) {
        var errEmbed = embeds.errorEmbed("Please provide a message.");
        return message.channel.send(errEmbed);
    }

    var argsToStr = "";
    args.forEach(i => {
        argsToStr += `${i} `;
    });

    var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor("#ebc716")
        .setTitle(":gift: Announcement")
        .setFooter("Announcements V1")
        .setTimestamp()
        .setDescription(argsToStr)

    message.channel.send(embed);

    var stockEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`Announcement Made`)
        .setDescription(`**<@${message.author.id}> Successfully made an announcement in <#${message.channel.id}>**`)
        .setColor("GREEN")
        .addField("**Staff user**", `** ${message.author.tag} **`)
        .addField("**Staff users ID**", `**${message.author.id}**`)
        .setFooter('Made with love')
        .setTimestamp()
    staffweb.send(stockEmbed);

    message.channel.send("@everyone").then(msg => {
        setTimeout(() => {
            msg.delete();
            message.delete();
        }, 500);
    })

}

module.exports.help = {
    accessRoles: ["administrator", "tools", "mod"],
    description: "Makes an announcement. Moderator+ may use this command",
    usage: "**-announce** [message]"
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