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
    const fileUrl = 'https://docs.google.com/spreadsheets/d/1wyBwAm3ZQJOFZd5JNXb0PeGDMWznMT2Y/edit?usp=sharing&ouid=104967868883938205514&rtpof=true&sd=truehttps://docs.google.com/spreadsheets/d/1wyBwAm3ZQJOFZd5JNXb0PeGDMWznMT2Y/edit?usp=sharing&ouid=104967868883938205514&rtpof=true&sd=true'; // Вставьте ссылку на ваш Excel файл
  
    try {
      // Скачивание файла
        const response = await axios.get(fileUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');
        console.log('Файл успешно скачан.');
  
      // Чтение файла
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0]; // Выберите лист по умолчанию
        const sheet = workbook.Sheets[sheetName];
        console.log('Файл успешно прочитан.');
  
      // Преобразование данных в JSON
        const data = xlsx.utils.sheet_to_json(sheet, { defval: '' });
        let message = 'Данные из Excel файла:\n';

        data.slice(1).forEach((row, index) => {
          // Предполагаем, что первый столбец содержит флажки
          const flag = row[Object.keys(row)[0]]; // Значение флажка в первом столбце
          if(flag === "TRUE") {
            console.log(typeof(flag) + ": " + flag);
          }
        
          if (flag === 1) { // Проверяем, включен ли флажок
            const rowData = Object.keys(row)
              .slice(1) // Пропускаем первый столбец с флажками
              .map(key => row[key])
              .filter(value => value && value.trim() !== '') // Учитываем только непустые значения
              .join(' ');
        
            if (rowData.trim() !== '') {
              message += `Строка ${index + 2}: ${rowData}\n`; // Индекс +2, чтобы учитывать заголовок и нумерацию с 1
            }
          }
        });
  
        console.log('Итоговое сообщение:', message);
        bot.sendMessage(chatId, message);
    } catch (error) {
        console.log('Ошибка при получении данных из файла:', error);
        bot.sendMessage(chatId, 'Произошла ошибка при получении данных из файла.');
    }
  });

// Обработчик других сообщений
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Вы написали: ' + msg.text);
});