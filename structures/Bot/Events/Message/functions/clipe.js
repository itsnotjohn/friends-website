const { globalRef } = require("../../../../Database");
const db = require('firebase/database');

module.exports = async (message) => {
    const messageContent = message.content;

    if (['remover', 'remove'].includes(messageContent))
        return await db.update(globalRef(message.author.id), { clipe: null });

    await db.update(globalRef(message.author.id), { clipe: youtube_parser(messageContent) });
}

function youtube_parser(url) {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;
}