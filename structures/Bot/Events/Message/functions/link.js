const { globalRef, getDatabaseInfo } = require("../../../../Database");
const db = require('firebase/database');

module.exports = async (message) => {
    const messageContent = message.content;

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

    const links = mapped.map(key => key.link);
    if (links.includes(messageContent)) return;

    if (['remover', 'remove'].includes(messageContent))
        return await db.update(globalRef(message.author.id), { link: null });

    await db.update(globalRef(message.author.id), { link: messageContent.split(" ")[0] });
}