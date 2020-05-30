const Discord = require("discord.js");
const fs = require("fs");
var status = require("../db/status.json");

module.exports.run = (client) => {
    var i = 0;
    setInterval(() => {
        if (i >= status.length) {
            i = 0;
        }
        var s = status[i];
        client.user.setPresence(s);
        i++;
    }, 30 * 1000);
}

module.exports.addStatus = (newStatus) => {
    status.push(newStatus);
    fs.writeFile("./db/status.json", JSON.stringify(status, 0, 4));
}