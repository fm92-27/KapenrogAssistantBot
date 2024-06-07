const handleStartCommand = async (bot, msg, user) => {
    if(user.hasStated) {
        bot.sendMessage(user.chatId, `${user.firstName}, придумай что получше.`);
    } else {
        bot.sendMessage(user.chatId, 'Привет! Я ваш Telegram-бот.\nЯ мало что могу, но я учусь!');
        user.hasStated = true;
        await user.save();
    }
};

module.exports = handleStartCommand;