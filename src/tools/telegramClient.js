const httpClient = require('../tools/httpClient')

let telegramClient = function ({telegramToken, telegramChatId, telegramMessage}) {

    const baseUrl = 'https://api.telegram.org/bot';

    let setToken = function (token) {
        telegramToken = token;
    }

    let getToken = function () {
        return telegramToken
    }

    let setChatId = function (chatId) {
        telegramChatId = chatId;
    }

    let getChatId = () => telegramChatId;

    let setMessage = function (message) {
        telegramMessage = message;
    }

    let getMessage = () => telegramMessage;

    let getUrl = function () {
        return baseUrl + getToken() + '/sendMessage';
    }

    let sendMessage = async () => {

        httpClient
            .setUrl(getUrl())
            .setParams({
                chat_id: getChatId(),
                text: getMessage()
            })

        return await httpClient.get();
    }

    return Object.freeze({
        setToken,
        getToken,
        getUrl,
        setChatId,
        getChatId,
        setMessage,
        getMessage,
        sendMessage
    })

}

module.exports = telegramClient