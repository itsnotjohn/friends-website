const codes = ['-s', '-d'];

module.exports = {
    data: {
        name: "eval",
        production: true
    },

    run: async (client, message, args) => {
        const usingCode = (code) => findCode(message.content, code);
        if (usingCode('-d')) message.delete().catch(() => null);

        let code = args.join(' ');
        if (code.length >= 1024) return message.channel.send({ content: 'Grande demais rapa' });

        try {
            for (const c of codes)
                code = code.replace(c, '');

            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.react('☕').catch(() => null);

            if (!usingCode('-s')) message.channel.send({ content: [clean(evaled)] });
        } catch (err) {
            if (!usingCode('-s')) message.channel.send({ content: [clean(evaled)] });

            message.react('❌').catch(() => null);
        }
    },
};

const clean = text => {
    return typeof (text) === "string"
        ? text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203))
        : text;
}

const getCode = (string) => {
    const codesArray = codes.map(code => {
        if (string.includes(code)) return code;

        return '';
    }).filter(e => !!e);

    if (codesArray.length === 0) return null;
    if (codesArray) return codesArray;
}

const findCode = (string, code) => {
    const codesArray = getCode(string);
    if (!codesArray || codesArray?.length === 0) return;

    const findCode = codesArray.find(codeF => codeF === code);

    if (findCode) return findCode;
    if (!findCode) return null;
}