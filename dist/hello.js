module.exports = (bot, msg, chatId) => {
    if (msg.text.toLowerCase() === '/start') {
        bot.sendMessage(chatId, 'Привет! Я ваш Telegram-бот.\nЯ мало что могу, но я учусь!');
    }
};