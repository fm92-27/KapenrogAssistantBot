const User = require('./models/users.js');

const handleStartCommand = async (bot, msg) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	bot.sendMessage(chatId, `${chatId}, hello job v2`);

	let user = await User.findOne({userId});

	//bot.sendMessage(chatId, `${user}, hello(user) job`);

	if(!user) {
		user = new User({
			userId,
			firstMane: msg.from.first_name,
			lastName: msg.from.last_name,
			username: msg.from.username,
			chatId,
			hasStarted: false
		});
		await user.save();
	}

    if(user.hasStarted) {
        bot.sendMessage(user.chatId, `${user.firstName}, придумай что получше.`);
    } else {
        bot.sendMessage(user.chatId, 'Привет! Я ваш Telegram-бот.\nЯ мало что могу, но я учусь!');
        user.hasStarted = true;
        await user.save();
    }
};

module.exports = handleStartCommand;