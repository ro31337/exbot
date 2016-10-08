require('dotenv').config();
import Currency from './currency';
import Info from './info';
import TelegramBot from 'node-telegram-bot-api';

let stats = require('botanio')(process.env.BOTANIO_TOKEN);
let bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {polling: true});
let banner = 'Welcome! Just type any message and I\'ll get back to you with latest rates!\n' +
  'Добро пожаловать! Введите любое сообщение и я сообщу вам курс валют в странах ЮВА (обновляется каждый час).';
let currency = new Currency();

const commands = {
  '/start': banner,
  'хуй': 'Ага... ну и что теперь?',
  'пизда': 'Джигурда!',
  'гоа': 'Ветер еще жив?',
  '1': '2',
};

(async function(){

  console.log('Loading rates...');
  let tmp = await currency.rates();
  console.log(`${Object.keys(tmp).length} currencies loaded.`);

  bot.on('callback_query', (msg) => {
    const user = msg.from.id;
    const data = msg.data;
    console.dir(msg);
    bot.sendMessage(msg.from.id, `You clicked button with data '${data}'`);
    bot.editMessageText('✔️ Button was here!', { chat_id: msg.message.chat.id, message_id: msg.message.message_id });
  });

  bot.on('message', async function(msg) {

    try {

      // track

      stats.track(msg);

      // send reply

      let chatId = msg.chat.id;
      let command = msg.text.toLowerCase();
      console.dir(msg);
      console.log(`Got '${command}' command from ${chatId} (${msg.chat.first_name})`);

      if(commands[command]) {
        // bot.sendMessage(chatId, commands[command]);
        // bot.sendLocation(chatId, 37.421955, -122.084058);

        // see example here: https://github.com/yagop/node-telegram-bot-api/issues/162
        var options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{text: 'Some button text 1', callback_data: '1'}], // Clicking will send "1"
              // [{text: 'Some button text 2', callback_data: '2'}], // Clicking will send "2"
              // [{text: 'Some button text 3', callback_data: '3'}]  // Clicking will send "3"
            ]
          })
        };

        bot.sendMessage(chatId, 'test', options);
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
