const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (client, message, args) => {

    var helpEmbed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} Bot Command List`, client.user.avatarURL)
        .setColor(0x00FFFF)

    var emojis = { General: ":wrench:", Staff: ":police_officer:", Market: ":gift:" }

    fs.readdir("./commands/", (err, folders) => {
        folders.forEach(dir => {
            var title = `${emojis[dir]} ${dir} Commands`;
            var desc = "";
            fs.readdir(`./commands/${dir}/`, (err, commands) => {
                commands.forEach(command => {
                    var cmd = require(`../../commands/${dir}/${command}`).help;
                    desc += `${cmd.usage} | ${cmd.description}\n`;
                })
                helpEmbed.addField(title, desc);
            })
        })
    })

    setTimeout(() => {
        message.author.send(helpEmbed);
    }, 300);

}

module.exports.help = {
    description: "Shows you this current help menu",
    usage: "**-help**"
}