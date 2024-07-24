const { globalRef } = require("../../../../Database");
const db = require('firebase/database');

module.exports = async (message) => {
    const messageContent = message.content;
    const username = messageContent.split(" ")[0];

    if (['remover', 'remove'].includes(messageContent))
        return await db.update(globalRef(message.author.id), { instagram: null });

    await db.update(globalRef(message.author.id), { instagram: username });
}