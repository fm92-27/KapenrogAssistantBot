var isUser = true;

const handleStartCommand = (bot, msg) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	//bot.sendMessage(chatId, `${chatId}, hello job v2`);

	if (isUser) {
		bot.sendMessage(chatId, 'You checked "start"!');
		isUser = false;
	} else {
		bot.sendMessage(chatId, 'Seriously?!');
	};
};

module.exports = { handleStartCommand };