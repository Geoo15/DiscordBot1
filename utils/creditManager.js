const fs = require("fs");
var credits = require("../db/credits.json");

module.exports.getCredits = (id) => {
    if (!credits[id]) {
        credits[id] = 0;
        fs.writeFileSync("./db/credits.json", JSON.stringify(credits, 0, 4));
    }

    return credits[id];
}

module.exports.addCredits = (id, n) => {
    if (isNaN(n)) {
        return null;
    }
    if (n < 0) {
        n = 0;
    }

    if (!credits[id]) {
        credits[id] = 0;
    }

    credits[id] += n;

    fs.writeFileSync("./db/credits.json", JSON.stringify(credits, 0, 4));
    return credits[id];
}

module.exports.setCredits = (id, n) => {
    if (isNaN(n)) {
        return null;
    }
    if (n < 0) {
        n = 0;
    }

    if (!credits[id]) {
        credits[id] = n;
    }

    credits[id] = n;

    fs.writeFileSync("./db/credits.json", JSON.stringify(credits, 0, 4));
    return credits[id];
}

module.exports.removeCredits = (id, n) => {
    if (isNaN(n)) {
        return null;
    }

    if (n < 0) {
        n = 0;
    }

    if (!credits[id]) {
        credits[id] = 0;
    }

    credits[id] -= n;

    //if (credits[id] < 0) {
    //    credits[id] = 0;
    //}

    fs.writeFileSync("./db/credits.json", JSON.stringify(credits, 0, 4));
    return credits[id];
}

module.exports.getAll = () => {
    return credits;
}