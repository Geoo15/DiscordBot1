const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    const { creditManager } = client;
    const { getCredits } = creditManager;

    var user = message.mentions.users.first();
    if (!user) user = message.author;

    var balance = getCredits(user.id);

    if (user = message.mentions.users.first);
    var balanceEmbed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} Bot Market`, client.user.avatarURL)
        .setColor("#959ED7")
        .addField(`**${message.author.username}'s Balance **`, `**${balance}**`)
        .setFooter('Made with love')
        .setTimestamp()
    message.channel.send(balanceEmbed);

}

module.exports.help = {
    description: "Checks your's or another user's balance",
    usage: "**-balance** [user]"
}