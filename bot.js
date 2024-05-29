const TelegramBot = require('node-telegram-bot-api');
//const { Telegraf, Markup } = require('telegraf');
const axios = require('axios');
const xlsx = require('xlsx');
const fs = require('fs');

const token = '6417160738:AAHXA2LCdObDBtVwR65X0VQtOsIEgf8-BoM';
const bot = new TelegramBot(token, { polling: true });
//const botReply = new Telegraf(token);

function createButtons(commandToBot) {
	return resButton = commandToBot.map((row, index) => {
		//console.log(row, index);
		//if (index == 0) {
			//console.log(row);
			return [{
				text: `${row}`,
				callback_data: `${row}`
			}];
		//}
	});

	//return resButton.map(subArray => subArray[0]);
}

bot.onText(/\/start/, (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Привет! Я ваш Telegram-бот.');
});

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
				message += `Поставщик: ${rowData[0]}\n`;

				//console.log(rowData[0]);

				bot.sendMessage(chatId, 'Test: ', {
					reply_markup: {
						inline_keyboard: createButtons(rowData[0])
					}
				});
				
				/*botReply.command('Выберите данные:', async (ctx) => {
					const buttons = createButtons(rowData[0]);
					return ctx.reply(Markup.inlineKeyboard(buttons));
				});
				botReply.action(/\data_\d+/, (ctx) => {
					return parseInt(ctx.match[0].split('_')[1]);
				});*/
			}
		});

		bot.sendMessage(chatId, message);
	} catch (error) {
		console.error('Ошибка при получении данных из файла:', error);
		bot.sendMessage(chatId, `Произошла ошибка при получении данных из файла. ${error}`);
	}
})

bot.on('message', (msg) => {
	const chatId = msg.chat.id;
	bot.sendMessage(chatId, 'Вы написали: ' + msg.text);
});

console.log('Бот запущен');