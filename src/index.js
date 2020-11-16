let products = require('../products.json')

// let telegramClient = require('./tools/telegramClient')
// let telegramProductNotifier = require('./tools/telegramProductNotifier')

const JsonProductFactory = require('./factories/JsonProductFactory')

let Kabum = require('./crawlers/kabum')
const Terabyte = require('./crawlers/terabyte')


let crawlers = [
    Kabum,
    // Terabyte
];

(async function () {

    for (crawler of crawlers) {

        for (productData of products) {

            let expectedProduct = JsonProductFactory(productData)
            let currentProduct = await crawler.findProduct(expectedProduct.getName())


            if (currentProduct.getPrice() <= expectedProduct.getPrice()) {
                console.log(` "${expectedProduct.getName()}" está gostosin no azeite com o valor de ${expectedProduct.getPrice()}`)
                //     telegramProductNotifier.notify(product)
            } else {
                console.log(` "${expectedProduct.getName()}" não está com preço legal :(`)
            }

        }
    }

})()


