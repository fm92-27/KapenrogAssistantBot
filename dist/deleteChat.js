module.exports = (bot, msg, chatId, users) => {
    const statusChat = msg.new_chat_member.status;
    bot.sendMessage(chatId, 'func delete job');
    if (statusChat === 'kicken' || statusChat === 'left') {
        delete users[chatId];
    }
};