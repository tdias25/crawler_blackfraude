let product = require('../models/product')

module.exports = (JsonProduct) => {

    return product({
        name: JsonProduct.name,
        price: JsonProduct.price
    });
}