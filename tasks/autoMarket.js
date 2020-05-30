const Discord = require("discord.js");

module.exports.run = (client, seconds) => {
    setTimeout(() => {
        require("../commands/Staff/market.js").run(client, null, null);
    }, 1 * 1000);
}