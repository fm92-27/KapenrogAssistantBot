module.exports = (bot, msg, chatId, users) => {
    const statusChat = msg.new_chat_member.status;
    if (statusChat === 'kicken' || statusChat === 'left') {
        delete users[chatId];
    }
};