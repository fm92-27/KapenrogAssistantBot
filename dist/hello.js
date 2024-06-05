module.exports = (bot, msg, chatId, users) => {
    if (msg.text.toLowerCase() === '/start') {
        if (chatId in users) {
            bot.sendMessage(`${msg.from.first_name}, придумай что по лучше.`);
        } else {
            bot.sendMessage(chatId, 'Привет! Я ваш Telegram-бот.\nЯ мало что могу, но я учусь!');
            users.push(chatId);
        }
    }
};