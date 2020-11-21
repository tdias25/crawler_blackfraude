let products = require('../products.json')

let telegramProductNotifier = require('./helpers/telegramProductNotifier')
const JsonProductFactory = require('./factories/JsonProductFactory')

const Kabum = require('./crawlers/kabum')
const Terabyte = require('./crawlers/terabyte')
const Pichau = require('./crawlers/pichau')

let crawlers = [
    Kabum,
    Pichau
    // Terabyte,
];

(async function () {

    for (crawler of crawlers) {

        for (productData of products) {

            try {

                let expectedProduct = JsonProductFactory(productData)
                let currentProduct = await crawler.findProduct(expectedProduct.getName())

                if (currentProduct.getPrice() <= expectedProduct.getPrice()) {
                    await telegramProductNotifier.notify(currentProduct)
                } else {
                    console.log(` "${expectedProduct.getName()}" não está com preço legal :(`)
                }

            } catch (error) {
                console.log(error)
            }

        }
    }

})()


