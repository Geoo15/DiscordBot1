const Discord = require("discord.js");
const fs = require("fs");

var client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}, Bot is in ${client.guilds.size} guilds.`);
});

client.config = require("./db/config.json");
client.embeds = require("./utils/embed.js");

client.stockManager = require("./utils/stockManager.js");
client.productManager = require("./utils/productManager.js");
client.creditManager = require("./utils/creditManager.js");

fs.readdir("./events/", (err, events) => {
    events.forEach(e => {
        require(`./events/${e}`).run(client);
    })
})

client.login(client.config.token);