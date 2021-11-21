import { Telegraf } from "telegraf";


const {TOKEN, SERVER_URL} = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL + URI;

const bot = new Telegraf(TOKEN && TOKEN || '');

bot.on('listRSOPoints', (ctx) => {
    ctx.telegram.sendMessage()
})



