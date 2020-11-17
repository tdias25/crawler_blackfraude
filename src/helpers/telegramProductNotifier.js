const telegramClient = require('../tools/telegramClient')

require('dotenv/config');

let telegramProductNotifier = (() => {

    let notify = async (product) => {

        const telegramToken = process.env.TELEGRAM_CHAT_TOKEN;
        const telegramChatId = process.env.TELEGRAM_CHAT_ID;

        const telegramMessage = makeMessage(product)

        let telegram = telegramClient({
            telegramToken,
            telegramChatId,
            telegramMessage
        });

        let sendMessage = await telegram.sendMessage()
    }

    function makeMessage(product) {
        return `O produto "${product.getName()}" está com um preço gostosinho no azeite de "${product.getPrice()}"`;
    }

    return {
        notify
    }

})()

module.exports = telegramProductNotifier