const fs = require("fs");

module.exports.run = (client) => {
    console.log("Ready")
    fs.readdir("./tasks/", (err, tasks) => {
        tasks.forEach(t => {
            require(`../tasks/${t}`).run(client);
        })
    })
}