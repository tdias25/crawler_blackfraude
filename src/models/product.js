module.exports = function ({ name, price }) {

    setName(name)
    setPrice(price)

    function setName(name) {

        if (typeof name !== 'string') {
            throw new Error('Product name must be a valid string')
        }

        if (name.length <= 0) {
            throw new Error('Product name cannot be null')
        }
    }

    function setPrice(price) {

        if (typeof price !== 'number') {
            throw new Error(`${price} is not a valid price`)
        }
    }

    return Object.freeze({
        getName: () => name,
        getPrice: () => price
    })

}