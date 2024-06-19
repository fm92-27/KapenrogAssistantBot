const TelegramBot = require('node-telegram-bot-api');
const hello = require('./dist/hello.js');
const users = require('./users.js');
//const axios = require('axios');
//const fs = require('fs').promises;
//const mongoose = require('mongoose');

const TOKEN = process.env.TOKEN;
//const DATAUSERS = process.env.DATAUSERS;
//const mongoURL = process.env.mongoURL;
//const path = require('path');
//const xlsx = require('xlsx');
//const { callbackQuery } = require('telegraf/filters');

const bot = new TelegramBot(TOKEN, { polling: true });
/*mongoose.connect(mongoURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});*/

/*async function writeReadCheckJson(DATAUSERS, value) {
	let checkResult = true;

	try {
		const res = await axios.get(DATAUSERS);
		const data = res.data;

		if (Object.values(data).includes(value)) {
			checkResult = false;
		} else {
			const key = `key${Object.keys(data).length + 1}`;
			data[key] = value;
			await fs.writeFile(DATAUSERS, JSON.stringify(data, null, 2));
		}
	} catch (err) {
		console.error('Ошибка при работе с JSON файлом:', err);
	}
	return checkResult;
};*/

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	const userData = users.getUsers();
	//const isUser = writeReadCheckJson(DATAUSERS, chatId);
	switch (msg.text.toLowerCase()) {
		case '/start':
			bot.sendMessage(chatId, "Job");
			//bot.sendMessage(chatId, `${userData}`);
			for (i in userData) {
				bot.sendMessage(chatId, `${i}`);
				if (i === chatId) {
					hello(chatId, bot, msg, true);
				} else {
					hello(chatId, bot, msg, false);
					users.createUser(chatId);
				}
			};
			break;
		default:
			bot.sendMessage(chatId, msg.text.toLowerCase());
	}
});

/*function createButtons(commandToBot) {
	return resButton = commandToBot.map((row, index) => {
		return [{
			text: `${row}`,
			callback_data: `${row}`
		}];
	});
}*/

/*bot.onText(/\/getdata/, async (msg) => {
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