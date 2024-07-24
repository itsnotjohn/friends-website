const { readdirSync } = require('fs');

module.exports = (client) => {
    const path = './structures/Bot/Commands/';
    const commandFolders = readdirSync(path);

    for (folder of commandFolders) {
        const command_files = readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));

        for (const file of command_files) {
            const command = require(`../Commands/${folder}/${file}`);
            if ('data' in command && 'run' in command) client.commands.set(command.data.name, command);

            if ('data' in command && 'run' in command && command.data.aliases) command.data.aliases.forEach(alias => {
                client.aliases.set(alias, command.data.name);
            });
        }
    }
};