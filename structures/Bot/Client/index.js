const { Client, Collection } = require('discord.js');
const { token } = require('../../../config.json');

const client = new Client({ intents: 3276799 });

module.exports = async (app) => {
    client.commands = new Collection();
    client.aliases = new Collection();

    for (let handler of ['commands', 'events'])
        require(`../Handlers/${handler}`)(client);

    require('../../Express')(client, app);

    await client.login(token);
};