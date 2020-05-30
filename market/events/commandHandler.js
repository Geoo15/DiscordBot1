const fs = require("fs");

module.exports.run = (client) => {
    client.on("message", (message) => {
        if (!message.content.startsWith(client.config.prefix)) return;
        if (message.channel.type !== "text") return;
        if (message.author.bot) return;
    
        var noPrefix = message.content.slice(client.config.prefix.length).split(" ");
        var cmd = noPrefix[0].toLowerCase();
        var args = noPrefix.filter(i => i != cmd);
    
        fs.readdir("./commands/", (err, folders) => {
            folders.forEach(dir => {
                fs.readdir(`./commands/${dir}/`, (err, commands) => {
                    if (commands.includes(`${cmd}.js`)) {
                        require(`../commands/${dir}/${cmd}`).run(client, message, args);
                    }
                })
            })
        })
    })
}