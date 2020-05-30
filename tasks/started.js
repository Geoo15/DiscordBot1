const Discord = require("discord.js");

module.exports.run = (client) => {
    const hook = new Discord.WebhookClient('670867436567789588', 'roegI-8YX4gmTfStYFUH9zhPb6X0uakqt4jbdKn_FQCECCKsWqMJkLwn-PCI0c2FwDVi');

    var giveEmbed = new Discord.RichEmbed()
        .setTitle(":white_check_mark: Bot Started")
        .setDescription(`Market Bot Has been successfully been started `)
        .setColor("#00ff00")
    hook.send(giveEmbed);

}
