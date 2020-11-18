"use strict"

const axios = require('axios')

let httpClient = (function () {

    let url, params, headers, response, rawHtmlResponse;

    let setHeaders = function (newHeaders) {
        headers = newHeaders;
    }

    let getHeaders = () => headers;

    let setParams = function (newParams) {
        params = newParams
    }

    let getParams = () => params;

    let setUrl = function (newUrl) {
        url = newUrl
    }

    let getUrl = () => url;

    let postRequest = async function () {

        response = await axios.post(getUrl(), {
            data: getParams(),
            headers: getHeaders()
        })

        return response
    }

    let getRequest = async () => {

        response = await axios.get(getUrl(), {
            params: getParams(),
            headers: getHeaders()
        })

        return response
    }

    let getRawHtmlResponse = function () {
        return response.data
    }

    return {
        setHeaders,
        getHeaders,
        setUrl,
        getUrl,
        setParams,
        getParams,
        post: postRequest,
        get: getRequest,
        getRawHtmlResponse
    }
})()

module.exports = httpClient