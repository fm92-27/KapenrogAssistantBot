const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fetch = require('node-fetch');
const fs = require('fs');
const readXlsxFile = require('read-excel-file/node');

// Вставьте ваш токен Telegram-бота
const token = 'YOUR_TELEGRAM_BOT_TOKEN';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет! Я ваш Telegram-бот.');
});

bot.onText(/\/getdata/, async (msg) => {
  const chatId = msg.chat.id;
  const fileUrl = 'YOUR_EXCEL_FILE_URL'; // Вставьте ссылку на ваш Excel файл

  try {
    // Скачивание файла
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Не удалось скачать файл: ${response.statusText}`);
    }

    // Запись буфера во временный файл
    const buffer = await response.buffer();
    const tempFilePath = '/tmp/temp.xlsx';
    fs.writeFileSync(tempFilePath, buffer);

    // Чтение файла с использованием read-excel-file
    const rows = await readXlsxFile(tempFilePath);

    let message = 'Данные из Excel файла:\n';
    rows.slice(1).forEach((row, index) => {
      const flag = row[0]; // Значение флажка в первом столбце
      if (flag === 1) { // Проверяем, включен ли флажок
        const rowData = row.slice(1).filter(value => value !== null && value !== '').join(' ');
        if (rowData.trim() !== '') {
          message += `Строка ${index + 2}: ${rowData}\n`; // Индекс +2, чтобы учитывать заголовок и нумерацию с 1
        }
      }
    });

    bot.sendMessage(chatId, message);
  } catch (error) {
    console.error('Ошибка при получении данных из файла:', error);
    bot.sendMessage(chatId, 'Произошла ошибка при получении данных из файла.');
  }
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Вы написали: ' + msg.text);
});