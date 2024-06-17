const contentful = require('contentful');

const user = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_ACCESS_TOKEN
});

const getUsers = async () => {
    const res = await user.getEntries({ content_type: 'dataUserBot' });
    return res.items;
}

const createUser = async (chatID) => {
    const res = await user.createEntry('dataUserBot', {
        fields: {
            chatID: { 'en-US': chatID }
        }
    });
    return res;
}

module.exports = { getUsers, createUser };