const TelegramBot = require('node-telegram-bot-api');

// Введите ваш токен, полученный от @BotFather
const token = '6417160738:AAHXA2LCdObDBtVwR65X0VQtOsIEgf8-BoM';

// Создаем бота
const bot = new TelegramBot(token, { polling: true });

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я ваш Telegram-бот.');
});

// Обработчик других сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Вы написали: ' + msg.text);
});