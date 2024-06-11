const { express, bodyParser, TelegramBot, token } = require('./dependencies.js');

const app = express();
app.use(bodyParser.json());

const bot = new TelegramBot(token);

bot.setWebHook(`https://${process.env.VERCEL_URL}/bot${token}`);

app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Bot is running');
  res.send(req);
});

module.exports = app;