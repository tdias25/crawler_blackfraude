let products = require('../products.json')

// let telegramClient = require('./tools/telegramClient')
// let telegramProductNotifier = require('./tools/telegramProductNotifier')

const JsonProductFactory = require('./factories/JsonProductFactory')

let Kabum = require('./crawlers/kabum')
const Terabyte = require('./crawlers/terabyte')


let crawlers = [
    Kabum,
    Terabyte
]


crawlers.forEach((crawler) => {

    products.forEach(async (productData) => {

        let expectedProduct = JsonProductFactory(productData)
        let currentProduct = await crawler.findProduct(expectedProduct.getName())

        if (currentProduct.getPrice() <= expectedProduct.getPrice()) {
            console.log(`${expectedProduct.getName()} esta em promocao`)
            //     telegramProductNotifier.notify(product)
        } else {
            console.log(`${expectedProduct.getName()} nao esta batendo certo`)
        }

    })

})