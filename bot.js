const TelegramBot = require('node-telegram-bot-api');

// Вставьте ваш токен Telegram-бота
const token = '6417160738:AAHXA2LCdObDBtVwR65X0VQtOsIEgf8-BoM';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Привет! Я ваш Telegram-бот.');
});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Вы написали: ' + msg.text);
});

console.log('Бот запущен');