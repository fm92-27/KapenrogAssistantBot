const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
const fs = require('fs');
//const path = require('path');
//const axios = require('axios');
//const xlsx = require('xlsx');
//const { callbackQuery } = require('telegraf/filters');

const connectDB = require('./db.js');
const hello = require('./dist/hello.js');

const token = process.env.token;
const mongoURL = process.env.mongoURL;
const bot = new TelegramBot(token, { polling: true });

connectDB(mongoose, mongoURL);

const userSchema = new mongoose.Schema({
	userId: String,
	firstName: String,
	lastName: String,
	username: String,
	chatId: Number,
	hasStarted: Boolean
});

const User = mongoose.model('User', userSchema);

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const userId = msg.from.id;

	let user = await User.findOne({userId});

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
	msg.text.toLowerCase() ? '/start' :	await hello(bot, msg, user);
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