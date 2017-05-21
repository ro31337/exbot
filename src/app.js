require('dotenv').config();
import Currency from './currency';
import Info from './info';
import TelegramBot from 'node-telegram-bot-api';

let bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
let banner = 'Welcome! Just type any message and I\'ll get back to you with latest rates!\n' +
  'Добро пожаловать! Введите любое сообщение и я сообщу вам курс валют в странах ЮВА (обновляется каждый час).';
let currency = new Currency();

const commands = {
  '/start': banner,
  'хуй': 'Ага... ну и что теперь?',
  'пизда': 'Джигурда!',
  'гоа': 'Ветер еще жив?'
};

(async function(){

  console.log('Loading rates...');
  let tmp = await currency.rates();
  console.log(`${Object.keys(tmp).length} currencies loaded.`);

  bot.on('message', async function(msg) {

    try {
      // send reply
      let chatId = msg.chat.id;
      let command = msg.text.toLowerCase();
      console.log(`Got '${command}' command from ${chatId} (${msg.chat.first_name})`);

      if(commands[command]) {
        bot.sendMessage(chatId, commands[command]);
      }

      let rates = await currency.rates();
      let info = new Info(rates);
      let text = info.toString();
      bot.sendMessage(chatId, text);
      console.log(`Sent to ${chatId}:`);
      console.log(text);

    }
    catch (err) {
      console.log(`Exception: ${err}`);
    }

  }); // bot.on
}()); // async function
