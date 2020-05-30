const Discord = require("discord.js");
const { post } = require("request");

module.exports.run = (client, message, args) => {

    const { config, embeds, stockManager, productManager, creditManager } = client;
    const { getProducts, getProduct } = productManager;
    const { getStock, grabAccount } = stockManager;
    const { getCredits, removeCredits } = creditManager;

    var channel = client.channels.find(i => i.id == config.marketChannel);

    if (message) {
        if (!this.hasAccess(client, message)) return;
    }

    channel.fetchMessages().then(messages => {
        messages.forEach(m => {
            m.delete();
        })
    })

    var marketEmbed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} Bot Market`, client.user.avatarURL)
        .setColor("#959ED7")
        .setTimestamp()

    var products = getProducts();
    var productStr = "";
    products.forEach(product => {
        var emoji = `<:${product.emoji.name}:${product.emoji.id}>`
        productStr += `- ${emoji} \`${product.price} CREDITS\` will get you \`1 ${product.displayName.toUpperCase()} ACCOUNT\` ${(getStock(product.name) == 0) ? "<NO STOCK>\n" : "\n"}`
    })

    marketEmbed.setDescription(productStr);
    channel.send(marketEmbed).then(msg => {
        products.forEach(product => {
            setTimeout(() => {
                msg.react(product.emoji.id);
            }, 100);
        })

        var collector = msg.createReactionCollector((reaction, user) => !user.bot);

        collector.on("collect", (r) => {

            var user = r.users.last();
            var product = getProduct(r.emoji.id, 0);

            if (getCredits(user.id) < 3) {
                var embed = new Discord.RichEmbed()
                    .setTitle(":x: Insufficient credits")
                    .setColor("#FF0000")
                    .setDescription(`You currently do not have enough credits to purchase ${product.displayName} account`)
                return user.send(embed)
            }

            var account = grabAccount(product.name);

            if (!account) {
                var embed = new Discord.RichEmbed()
                    .setTitle(":x: Transaction Incomplete")
                    .setColor("#FF0000")
                    .setDescription(`We currently do not have ${product.displayName} accounts on stock`)
                return user.send(embed)
            }

            removeCredits(user.id, product.price);

            post(config.loggingWebhook, { body: embeds.transactionWebhook(user, account, r.emoji), headers: { 'Content-Type': 'application/json' } })

            var embed = new Discord.RichEmbed()
                .setTitle(":white_check_mark: Transaction Complete")
                .setColor("#00ff00")
                .setThumbnail(r.emoji.url)
                .addField("**Email**",  `**${account.email}**`, true)
                .addField("**Password**", `**${account.password}**`, true)
                .addField("**Total Invites**", `**${getCredits(user.id)}**`, true)
                .addField("**Vouches**", 'If your account worked please make sure to Vouch in our discord as it is very much appricated as it shows that this community is real and not fake  (#vouches)')
                .addField("**Please Read**", '**IF ACCOUNT DETAILS ARE INCORRECT OR YOUR SUBSCRIPTION HAS ENDED**, Please contact support with your account info in the channel #contact-us. MAKE A SUPPORT TICKET')
            user.send(embed)

        })

    })

}

module.exports.help = {
    accessRoles: ["tools", "administrator", "mod", "accountSupplier"],
    description: "Creates the market embed.",
    usage: "**-market**"
}

module.exports.hasAccess = (client, message) => {
    var hasAccess = false;
    this.help.accessRoles.forEach(role => {
        var roleID = client.config.roles[role];
        var r = message.guild.roles.find(i => i.id == roleID);
        if (message.member.roles.array().includes(r)) {
            hasAccess = true;
        }
    });
    return hasAccess;
}