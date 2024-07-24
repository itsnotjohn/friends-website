const { globalRef } = require("../../../../Database");
const db = require('firebase/database');

const validURL = require("../../../../Functions/validURL");

module.exports = async (message) => {
    const messageContent = message.content;

    if (['remover', 'remove'].includes(messageContent))
        return await db.update(globalRef(message.author.id), { customEmoji: null });

    if (!validURL(messageContent)) return;

    await db.update(globalRef(message.author.id), { customEmoji: messageContent });
}