const { globalRef } = require("../../../../Database");
const db = require('firebase/database');

module.exports = async (message) => {
    const messageContent = message.content;
    const allowedWords = ['remover', 'remove'].includes(messageContent);

    if (isNaN(messageContent) || messageContent === message.author.id || !allowedWords) return;
    if (allowedWords)
        return await db.update(globalRef(message.author.id), { lady: null });

    await db.update(globalRef(message.author.id), { lady: messageContent });
}