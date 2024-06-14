const { express, bodyParser, TelegramBot, TOKEN } = require('./dependencies.js');

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(TOKEN, { polling: true });

bot.setWebHook(`https://${process.env.VERCEL_URL}/bot${TOKEN}`);

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Bot is running');
});

module.exports = app;