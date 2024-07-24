module.exports = async (id) => {
    const response = await fetch(`https://discord.com/api/v9/users/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': "account token here",
            'Content-type': 'aplication/json'
        }
    });

    const resolve = await response.json();
    return resolve;
}
