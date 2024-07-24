const { globalRef } = require("../../../../Database");
const db = require('firebase/database');

module.exports = async (message) => {
    const messageContent = message.content;
    const allowedWords = ['remover', 'remove'].includes(messageContent);

    const emoji = parseEmoji(messageContent);
    if (!emoji || !allowedWords) return;

    if (allowedWords)
        return await db.update(globalRef(message.author.id), { emoji: null });

    let id = emoji?.id ?? emoji?.name;
    await db.update(globalRef(message.author.id), { emoji: id });
}

function parseEmoji(text) {
    if (text.includes('%')) text = decodeURIComponent(text);
    if (!text.includes(':')) return { animated: false, name: text, id: undefined };
    const match = text.match(/<?(?:(a):)?(\w{1,32}):(\d{17,19})?>?/);
    return match && { animated: Boolean(match[1]), name: match[2], id: match[3] };
}