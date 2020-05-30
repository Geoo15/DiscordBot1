const { RichEmbed } = require("discord.js");

module.exports.errorEmbed = (embedMessage) => {
    var i = new RichEmbed()
        .setTitle(':x: ERROR')
        .setDescription('An error has occured the reason as to why this message was triggered is below.')
        .setFooter(embedMessage)
        .setColor("RED")
    return i;
}

module.exports.transactionWebhook = (user, acc, emoji) => {
    return JSON.stringify({
        "embeds": [
            {
                "title": "Account Claimed",
                "color": 12851995,
                "author": {
                    "name": user.tag,
                    "url": null,
                    "icon_url": user.avatarURL
                },
                "thumbnail": {
                    "url": emoji.url
                },
                "fields": [
                    {
                        "name": "Email",
                        "value": acc.email,
                        "inline": false
                    },
                    {
                        "name": "Password",
                        "value": acc.password,
                        "inline": false
                    }
                ],
            }
        ],
        "username": "Account Manager",
        "avatar_url": null
    })
}

module.exports.stockingWebhook = (user, rows, emoji) => {
    return JSON.stringify({
        "embeds": [
            {
                "title": "Account Stocked",
                "color": 12851995,
                "author": {
                    "name": user.tag,
                    "url": null,
                    "icon_url": user.avatarURL
                },
                "thumbnail": {
                    "url": emoji.url
                },
                "fields": [
                    {
                        "name": "Amount Stocked",
                        "value": rows.length,
                        "inline": false
                    },
                    {
                        "name": "Stock",
                        "value": getStock(find.name),
                        "inline": false
                    }
                ],
            }
        ],
        "username": "Account Manager",
        "avatar_url": null
    })
}

module.exports.grabWebhook = (user, acc, emoji) => {
    return JSON.stringify({
        "embeds": [
            {
                "title": "Account Grabbed",
                "color": 12851995,
                "author": {
                    "name": user.tag,
                    "url": null,
                    "icon_url": user.avatarURL
                },
                "thumbnail": {
                    "url": emoji.url
                },
                "fields": [
                    {
                        "name": "Email",
                        "value": acc.email,
                        "inline": false
                    },
                    {
                        "name": "Password",
                        "value": acc.password,
                        "inline": false
                    }
                ],
            }
        ],
        "username": "Account Manager",
        "avatar_url": null
    })
}