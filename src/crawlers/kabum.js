const httpClient = require('../tools/httpClient')
let product = require('../models/product')

const Kabum = (() => {

    const searchUrl = 'https://servicespub.prod.api.aws.grupokabum.com.br/listagem/v1/busca';
    const websiteUrl = 'https://m.kabum.com.br';

    async function findProduct(productName) {

        httpClient.setUrl(searchUrl)
        httpClient.setHeaders({
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36'
        })
        httpClient.setParams({
            string: productName
        });

        let response = await httpClient.get()
        
        return makeProductFromJsonResponse(response)
    }

    function makeProductFromJsonResponse(response) {

        if (response.data.itens.count < 1) {
            throw new Error('Product not found')
        }

        let allProducts = response.data.listagem;
        let firstProduct = allProducts[0]

        return product({
            name: firstProduct.nome,
            price: firstProduct.preco_desconto,
            code: firstProduct.codigo,
            url: makeProductUrl(firstProduct.codigo)
        });

    }

    function makeProductUrl(code) {
        return websiteUrl + '/produto/' + code
    }

    return {
        findProduct
    }

})()

module.exports = Kabum