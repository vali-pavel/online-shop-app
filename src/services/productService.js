import ApiRequestManager from '../helpers/apiRequestManager';

const BASE_URL = '/api/products';
const UPLOAD_ENDPOINT = '/upload';
const IMAGES_ENDPOINT = '/images';

class ProductService {
    constructor(authToken) {
        this.authToken = authToken
    }

    async getProduct(productId) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const requestUrl = `${ BASE_URL }/${ productId }`;
        const reqOptions = apiReqManager.getRequestOptions('get');
        return fetch(requestUrl, reqOptions)
            .then(async response => {
                const jsonResponse = await response.json();
                if (!response.ok) {
                    return { error: jsonResponse };
                }
                return jsonResponse;
            })
    }

    async getAllProducts(queryString) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const requestUrl = `${ BASE_URL }?${ queryString }`;
        const reqOptions = apiReqManager.getRequestOptions('get');
        return fetch(requestUrl, reqOptions)
            .then(async response => {
                const jsonResponse = await response.json();
                if (!response.ok) {
                    return { error: jsonResponse };
                }
                return jsonResponse;
            })
    }


    async getImages(productId) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const requestUrl = `${ BASE_URL }/${ productId }/${ IMAGES_ENDPOINT }`;
        const reqOptions = apiReqManager.getRequestOptions('get');
        return fetch(requestUrl, reqOptions)
            .then(async response => {
                const jsonResponse = await response.json();
                if (!response.ok) {
                    return { error: jsonResponse };
                }
                return jsonResponse;
            })
    }

    async createProduct(newProduct) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const body = JSON.stringify(newProduct);
        const reqOptions = apiReqManager.getRequestOptions('post', body);
        return fetch(BASE_URL, reqOptions)
            .then(async response => {
                const jsonResponse = await response.json()
                if (!response.ok) {
                    return { error: jsonResponse }
                } else {
                    return jsonResponse
                }

            })
    }

    async uploadImages(formData) {
        const apiReqManager = new ApiRequestManager(this.authToken);
        const reqOptions = apiReqManager.getRequestOptions('post', formData);
        const reqUrl = BASE_URL + UPLOAD_ENDPOINT;
        return fetch(reqUrl, reqOptions)
            .then(async response => {
                if (!response.ok) {
                    return { error: await response.json() }
                }
            })
    }
}

export default ProductService
