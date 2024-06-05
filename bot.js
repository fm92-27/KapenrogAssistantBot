const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const users = require('./db/users.json');
const axios = require('axios');
//const xlsx = require('xlsx');
//const { callbackQuery } = require('telegraf/filters');

const token = process.env.token;
const bot = new TelegramBot(token, { polling: true });
//const usersFile = JSON.parse(users);
const usersFile = path.join(__dirname, 'users.json');

const hello = require('./dist/hello');
const deleteChat = require('./dist/deleteChat');

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	//bot.sendMessage(chatId, `${usersFile}`);
	bot.onText('\/start/', (msg) => {
		bot.sendMessage(chatId, `Файл: ${usersFile}`);
	})
	//const usedId = msg.from.id;
	/*if (msg.text.toLowerCase() === '/start') {
		hello(bot, msg, chatId, usersFile);
	} else if (msg.new_chat_members.status === 'kicken' || msg.new_chat_members.status === 'left') {
		deleteChat(bot, msg, chatId, usersFile);
	}*/
})

/*function createButtons(commandToBot) {
	return resButton = commandToBot.map((row, index) => {
		return [{
			text: `${row}`,
			callback_data: `${row}`
		}];
	});
}

bot.onText(/\/getdata/, async (msg) => {
	const chatId = msg.chat.id;
	const fileUrl = 'https://docs.google.com/spreadsheets/d/1wyBwAm3ZQJOFZd5JNXb0PeGDMWznMT2Y/edit?usp=sharing&ouid=104967868883938205514&rtpof=true&sd=true';

	try {
		const res = await axios.get(fileUrl, {responseType: 'arraybuffer'});
		const buffer = Buffer.from(res.data, 'binary');

		const tempFilePath = './temp.xlsx';
		fs.writeFileSync(tempFilePath, buffer);

		const workbook = xlsx.readFile(tempFilePath);
		const sheetName = workbook.SheetNames[0];
		const sheet = workbook.Sheets[sheetName];
		const data = xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false});

		let message = 'Данные из Excel файла:\n';
		const ignoreIndex = [];
		data.slice(2).forEach((row, index) => {
			const rowData = Object.values(row.slice(1))
				.filter(value => {
					if (value === 'FALSE') {
						ignoreIndex.push(index);
						return false;
					}
					return value.trim() !== '' && value !== 'TRUE';
				});

			if (!ignoreIndex.includes(index)) {
				bot.sendMessage(chatId, 'Поставщик: ', {
					reply_markup: {
						inline_keyboard: createButtons([rowData[0]])
					}
				});
				bot.on('callback_query', async (callbackQuery) => {
					const callData = callbackQuery.data;
					//console.log(callData);
					if (callData !== curretData) {
						const curretData = callData;
						bot.sendMessage(chatId, `Вы выбрали: ${callData}`);
					}
				});
			}
		});

		//bot.sendMessage(chatId, message);
	} catch (error) {
		console.error('Ошибка при получении данных из файла:', error);
		bot.sendMessage(chatId, `Произошла ошибка при получении данных из файла. ${error}`);
	}
});

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Вы написали: ' + msg.text);
});*/

console.log('Бот запущен');