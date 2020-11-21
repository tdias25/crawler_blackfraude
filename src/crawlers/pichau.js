const httpClient = require('../tools/httpClient')
const cheerio = require('cheerio')
const money = require('../helpers/money')

let product = require('../models/product')

const Pichau = (() => {

    const searchUrl = 'https://www.pichau.com.br/catalogsearch/result/index';

    async function findProduct(productName) {

        httpClient.setUrl(searchUrl)
        httpClient.setHeaders({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest',
            'referrer': 'https://www.pichau.com.br/catalogsearch/result/?q=' + encodeURIComponent(productName),
        })

        httpClient.setParams({
            q: productName,
            product_list_order: 'price',
            shopbyAjax: 1
        });

        let response = await httpClient.get()

        return makeProductFromResponse(response)
    }

    function makeProductFromResponse(response) {

        const $ = cheerio.load(response.data.categoryProducts);

        let rawPrice = $('.product-item .price-boleto')
            .first()
            .html()

        if (rawPrice.length <= 1) {
            throw new Error('Pichau: could not found product')
        }

        let findPrices = rawPrice.match(/R\$(.*)<\/span>/)
        let brazilianPriceFormat = findPrices[1]

        let productPrice = money.filterMoney(brazilianPriceFormat);

        let productName = $('.product-image-photo')
            .attr('alt')

        let productUrl = $('.product-item-link')
            .attr('href')

        return product({
            name: productName,
            price: productPrice,
            url: productUrl
        });

    }

    return {
        findProduct
    }

})()

module.exports = Pichau