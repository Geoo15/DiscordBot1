
module.exports.run = (client) => {

    client.on("message", (message) => {

        if (message.channel.id != client.config.inviteChannel) return;

        if (message.author.id != client.config.inviteManagerID) return;




        if (!message.mentions.users.first()) return;



        if (message.content.includes("joined")) client.creditManager.addCredits(message.mentions.users.first().id, 1);

        if (message.content.includes("left")) client.creditManager.removeCredits(message.mentions.users.first().id, 1);



	    console.log(`${message.mentions.users.first().tag} got ${(message.content.includes("joined") ? "added" : "removed")} one credit`);

    })

}