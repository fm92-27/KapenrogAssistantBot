const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const xlsx = require('xlsx');
const fs = require('fs');

const token = '6417160738:AAHXA2LCdObDBtVwR65X0VQtOsIEgf8-BoM';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет! Я ваш Telegram-бот.');
});

bot.onText(/\/getdata/, async (msg) => {
    const chatId = msg.chat.id;
    const fileUrl = 'https://docs.google.com/spreadsheets/d/10GIoToM8KrHlGI96cIA0cjXF1DFnTxv5sZ-MgOd518U/edit?usp=sharing'; // Вставьте ссылку на ваш Excel файл
  
    try {
      // Скачивание файла
      const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
  
      // Чтение файла
      const workbook = xlsx.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0]; // Выберите лист по умолчанию
      const sheet = workbook.Sheets[sheetName];
  
      // Преобразование данных в JSON
      const data = xlsx.utils.sheet_to_json(sheet);
      let message = 'Данные из Excel файла:\n';
      data.forEach((row, index) => {
        message += `Строка ${index + 1}: ${JSON.stringify(row)}\n`;
      });
  
      bot.sendMessage(chatId, message);
    } catch (error) {
      console.error('Ошибка при получении данных из файла:', error);
      bot.sendMessage(chatId, 'Произошла ошибка при получении данных из файла.');
    }
  });

// Обработчик других сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Вы написали: ' + msg.text);
});