const getKeyByValue = require('../../../Functions/getKeyByValue');
const { channels } = require('../../../../config.json');

module.exports = {
    name: 'messageCreate',

    run: async (client, message) => {
        if (message.author.bot || message.channel.type === "dm") return;

        const channelId = message.channel.id;
        if (!Object.values(channels).includes(channelId)) return;

        message.delete().catch(() => null);

        const allowedRole = message.guild.roles.cache.get('1154536640379895871');
        const authMembers = message.member.roles.cache.get(allowedRole.id);
        if (!authMembers) return;

        const channelName = getKeyByValue(channels, channelId);
        require(`./functions/${channelName}`)(message);
    },
};