const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    const { config, embeds, creditManager } = client;
    const { getCredits, removeCredits, addCredits } = creditManager;

    const commandused = new Discord.WebhookClient('673402048938639370', 'UesIc02dGiwRSbvfi-lZk83Je6zW8niGrsm0NJI27zM0oBSdGfOjBe1a9W1oDjxdqR_m');



    var giver = message.author;

    var toGive = message.mentions.users.first();
    if (!toGive) {
        var errEmbed = embeds.errorEmbed("Uh oh, couldn't find this user.");
        return message.channel.send(errEmbed);
    }

    var amount = parseInt(args[1]);
    if (!amount || isNaN(amount)) {
        var errEmbed = embeds.errorEmbed("Please define a valid number.");
        return message.channel.send(errEmbed);
    }

    var giverBalance = getCredits(giver.id);
    if (giverBalance < amount) {
        var errEmbed = embeds.errorEmbed("You can't give more than what you have.");
        return message.channel.send(errEmbed);
    }

    removeCredits(giver.id, amount);
    addCredits(toGive.id, amount);

    var newGiverBalance = getCredits(giver.id);
    var newToGiveBalance = getCredits(toGive.id);

    var giveEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`**You Succesfully gave <@${toGive.id}> ${amount} credits**!`)
        .addField(`**${giver.username}'s balance**`, `**${newGiverBalance}** credits`, true)
        .addField(`**${toGive.username}'s balance**`, `**${newToGiveBalance}** credits`, true)
        .setColor("#959ED7")
        .setFooter('Made with love')
        .setTimestamp()
    message.channel.send(giveEmbed);

    var giveEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`User Give Command`)
        .setDescription(`**User <@${giver.id}> gave <@${toGive.id}> ${amount} credits**!`)
        .addField(`**${giver.username}'s balance**`, `**${newGiverBalance}** credits`, true)
        .addField(`**${toGive.username}'s balance**`, `**${newToGiveBalance}** credits`, true)
        .setColor("#959ED7")
        .setFooter('Made with love')
        .setTimestamp()
                commandused.send(giveEmbed);

}

module.exports.help = {
    description: "Give another user credits",
    usage: "**-give** [user] [amount]"
}