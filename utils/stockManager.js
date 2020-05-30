const fs = require("fs");

module.exports.getStock = (name) => {
    var stock = null;
    try {
        var db = fs.readFileSync(`./db/accounts/${name}.json`);
        stock = JSON.parse(db).length;
    } catch (error) {
        fs.writeFileSync(`./db/accounts/${name}.json`, JSON.stringify([], 0, 4));
        stock = 0;
    }
    return stock;
}


module.exports.getStockJSON = (name) => {
    var stock = null;
    try {
        var db = fs.readFileSync(`./db/accounts/${name}.json`);
        stock = JSON.parse(db);
    } catch (error) {
        stock = null;
    }
    return stock;
}

module.exports.delStock = (name) => {
    fs.writeFileSync(`./db/accounts/${name}.json`, JSON.stringify([], 0, 4));
}

module.exports.grabAccount = (name) => {
    var account = null;
    try {
        var db = fs.readFileSync(`./db/accounts/${name}.json`);
        db = JSON.parse(db);

        account = db.shift();
        fs.writeFileSync(`./db/accounts/${name}.json`, JSON.stringify(db, 0, 4));
    } catch (error) {
        fs.writeFileSync(`./db/accounts/${name}.json`, JSON.stringify([], 0, 4));
    }
    return account;
}

module.exports.addAccount = (name, acc) => {
    try {
        var db = fs.readFileSync(`./db/accounts/${name}.json`);
        db = JSON.parse(db);

        db.push(acc);
        fs.writeFileSync(`./db/accounts/${name}.json`, JSON.stringify(db, 0, 4));
    } catch (error) {
        fs.writeFileSync(`./db/accounts/${name}.json`, JSON.stringify([acc], 0, 4));
    }
}