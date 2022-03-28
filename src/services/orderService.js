import ApiRequestManager from '../helpers/apiRequestManager';

const BASE_URL = '/api/orders';

class OrderService {
    constructor(authToken) {
        this.authToken = authToken
    }

    async createOrder(body) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const requestUrl = `${ BASE_URL }`;
        const reqOptions = apiReqManager.getRequestOptions('post', JSON.stringify(body));

        return fetch(requestUrl, reqOptions)
            .then(async response => {
                if (!response.ok) {
                    const jsonResponse = await response.json();
                    return { error: jsonResponse };
                }
                return "Success";
            })
    }
}

export default OrderService;
