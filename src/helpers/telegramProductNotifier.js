const telegramClient = require('../tools/telegramClient')

require('dotenv/config');

let telegramProductNotifier = (() => {

    let notify = async (product) => {

        const telegramToken = process.env.TELEGRAM_CHAT_TOKEN;
        const telegramChatId = process.env.TELEGRAM_CHAT_ID;

        const telegramMessage = makeMessage(product, 'promotion')

        let telegram = telegramClient({
            telegramToken,
            telegramChatId,
            telegramMessage
        });

        await telegram.sendMessage();
    }

    function makeMessage(product, type) {

        if (type === 'promotion') {
            return `
                O produto "${product.getName()}" está com um preço gostosinho no azeite de "${product.getPrice()}" \n-------------\n Link: ${product.getUrl()}
            `;
        }
    }

    return {
        notify
    }

})();

module.exports = telegramProductNotifier