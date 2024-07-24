const { statusColor } = require('../../../config.json');

const { getDatabaseInfo } = require('../../Database');
const { renderFile } = require('ejs');

module.exports = {
    method: 'get',
    param: '/',

    run: async (client, req, res) => {
        const userInfoByAPI = require("../../Functions/userInfoByAPI");
        const getUserInfo = async (id) => await userInfoByAPI(id);

        const guild = await client.guilds.cache.get('1154520797667401748');
        const role = await guild.roles.cache.get('1154536640379895871');
        const members = await role.members.map(member => {
            return {
                id: member.id,
                status: statusColor[member?.presence?.status ?? 'offline']
            }
        });

        const html = await renderFile("views/index.ejs", {
            getUserInfo,
            getDatabaseInfo,
            members
        }, { async: true });

        return res.send(html);
    },
};