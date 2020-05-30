const fs = require("fs");
var products = require("../db/products.json");

module.exports.newProduct = (displayName, emoji, price) => {
    if (isNaN(price)) {
        return null;
    }

    var obj = {
        name: displayName.toLowerCase(),
        displayName: displayName,
        price: price,
        emoji: {
            name: emoji.match(/[a-zA-Z]{1,15}/g)[0],
            id: emoji.match(/[0-9]{18}/g)[0]
        }
    }

    products.push(obj);
    fs.writeFileSync(`./db/accounts/${obj.name}.json`, JSON.stringify([], 0, 4));
    fs.writeFileSync("./db/products.json", JSON.stringify(products, 0, 4));
    return obj;
}

module.exports.getProduct = (queue, n) => {
    var i = false;
    products.forEach(p => {
        if (n == 0) {
            if (p.emoji.id == queue) i = p;
        }
        if (!n) {
            if (p.name == queue) i = p;
        }
    });
    return i;
}

module.exports.removeProduct = (product) => {
    products = products.filter(i => i !== product);
    fs.writeFileSync("./db/products.json", JSON.stringify(products, 0, 4));
}

module.exports.getProducts = () => {
    return products;
}