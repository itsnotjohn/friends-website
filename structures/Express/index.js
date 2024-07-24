const removeItemOnce = require('../Functions/removeItemOnce');
const { readdirSync } = require('fs');

module.exports = (client, app) => {
    const path = './structures/Express/';
    const methodsFolders = readdirSync(path);

    const removed = removeItemOnce(methodsFolders, "index.js");

    for (folder of removed) {
        if (folder === 'Others') continue;
        const method_files = readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of method_files) {
            const { method, param, run } = require(`./${folder}/${file}`);

            app?.[method](param, (...args) => run(client, ...args));
        }
    }
};