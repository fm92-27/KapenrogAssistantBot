const handleStartCommand = (bot, msg) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	bot.sendMessage(chatId, `${chatId}, hello job v2`);
};

module.exports = handleStartCommand;