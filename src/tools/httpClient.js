"use strict"

const axios = require('axios')

let httpClient = {
    url: null,
    params: {},
    headers: {},
    response: null,
    rawHtmlResponse: null
}

httpClient.setHeaders = function (headers) {
    this.headers = headers;
    return this;
}

httpClient.getHeaders = function () {
    return this.headers
}

httpClient.setParams = function (params) {
    this.params = params;
    return this;
}

httpClient.getParams = function () {
    return this.params;
}

httpClient.getOptions = function () {
    return this.options
}

httpClient.setUrl = function (url) {
    this.url = url;
    return this;
}

httpClient.getUrl = function () {
    return this.url
}

httpClient.post = function () {

    this.response = axios.post(this.getUrl(), {
        data: this.getParams(),
        headers: this.getHeaders()
    })

    return this.response
}

httpClient.get = async function () {

    this.response = await axios.get(this.getUrl(), {
        params: this.getParams(),
        headers: this.getHeaders()
    })

    return this.response
}

httpClient.getRawHtmlResponse = function () {
    return this.response.data
}


module.exports = httpClient