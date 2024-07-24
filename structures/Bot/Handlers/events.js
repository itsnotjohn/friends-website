const { readdirSync } = require('fs');

module.exports = (client) => {
    const path = './structures/Bot/Events/';
    const eventFolders = readdirSync(path);

    for (folder of eventFolders) {
        const event_files = readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of event_files) {
            const event = require(`../Events/${folder}/${file}`);

            if (event.once)
                client.once(event.name, (...args) => event.run(client, ...args));
            else
                client.on(event.name, (...args) => event.run(client, ...args));
        }
    }
};