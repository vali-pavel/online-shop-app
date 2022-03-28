import ApiRequestManager from '../helpers/apiRequestManager';

const BASE_URL = '/api/customers';

class CustomerService {
    constructor(authToken) {
        this.authToken = authToken
    }

    async getCustomer(userId) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const requestUrl = `${ BASE_URL }/${ userId }`;
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

    async createCustomer(body) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const reqOptions = apiReqManager.getRequestOptions('post', JSON.stringify(body));
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

    async updateCustomer(body, customerId) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const requestUrl = `${ BASE_URL }/${ customerId }`;
        const reqOptions = apiReqManager.getRequestOptions('put', JSON.stringify(body));
        return fetch(requestUrl, reqOptions)
            .then(async response => {
                const jsonResponse = await response.json()
                if (!response.ok) {
                    return { error: jsonResponse }
                } else {
                    return jsonResponse
                }

            })
    }
}

export default CustomerService;
