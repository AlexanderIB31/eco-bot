import bot from './bot';

if (process.env.NODE_ENV === 'production') {
    bot.launch({
        webhook: {
            domain: `${process.env.HEROKU_URL}${process.env.TELEGRAM_TOKEN}`,
        },
    });
} else {
    bot.launch();
}