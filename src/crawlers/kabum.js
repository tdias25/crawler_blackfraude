const httpClient = require('../tools/httpClient')
let product = require('../models/product')

const Kabum = (() => {

    const baseURL = 'https://m.kabum.com.br/busca'

    async function findProduct(productName) {

        httpClient
            .setUrl(baseURL)
            .setHeaders({
                'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
            })
            .setParams({
                string: productName
            });

        await httpClient.get()

        return makeProductFromHtmlResponse(
            httpClient.getRawHtmlResponse()
        )
    }

    function makeProductFromHtmlResponse(htmlResponse) {

        let rawJsonString = htmlResponse.match(/{(.*)}/g)[0];
        let parsedJson = JSON.parse(rawJsonString)

        if (parsedJson.listagem.length === 0) {
            throw new Error('Cannot create product object, not found')
        }

        let rawProduct = parsedJson.listagem[0]

        return product({
            name: rawProduct.nome,
            price: rawProduct.preco_desconto
        });

    }

    return {
        findProduct
    }

})()

module.exports = Kabum