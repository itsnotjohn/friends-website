const { getDatabaseInfo } = require('../../Database');

const { renderFile } = require('ejs');

module.exports = {
    method: 'get',
    param: '/:nome',

    run: async (client, req, res) => {
        const userInfoByAPI = require("../../Functions/userInfoByAPI");
        const getUserInfo = async (id) => await userInfoByAPI(id);

        const databaseRef = await getDatabaseInfo('/');
        const mapped = Object.keys(databaseRef).map(key => {
            return {
                id: key,
                lady: databaseRef[key]?.lady,
                clip: databaseRef[key]?.clip,
                instagram: databaseRef[key]?.instagram,
                emoji: databaseRef[key]?.emoji,
                link: databaseRef[key]?.link
            }
        });

        const paramName = req.params.nome;
        const infosByLink = mapped.find(key => key.link === paramName);

        const links = mapped.map(key => key.link);
        if (!links.includes(paramName)) return res.redirect(301, "/");

        const html = await renderFile("views/bio.ejs", {
            getUserInfo,
            getDatabaseInfo,
            infosByLink
        }, { async: true });

        return res.send(html);
    },
};