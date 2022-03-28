import ApiRequestManager from '../helpers/apiRequestManager';

const BASE_URL = '/api/users';
const LOGIN_ENDPOINT = '/login';

class UserService {
    constructor(authToken) {
        this.authToken = authToken
    }

    async loginUser(credentials) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const requestUrl = BASE_URL + LOGIN_ENDPOINT;
        const body = JSON.stringify(credentials);
        const reqOptions = apiReqManager.getRequestOptions('post', body)
        return fetch(requestUrl, reqOptions)
            .then(async response => {
                if (!response.ok) {
                    return { error: await response.json() }
                }
                return {
                    token: await response.text()
                }
            })
    }

    async createUser(credentials) {
        const headers = { 'Content-Type': 'application/json' };
        const apiReqManager = new ApiRequestManager(this.authToken, headers);
        const body = JSON.stringify(credentials);
        const reqOptions = apiReqManager.getRequestOptions('post', body);
        return fetch(BASE_URL, reqOptions)
            .then(async response => {
                if (!response.ok) {
                    return { error: await response.json() }
                }
                return {
                    token: await response.text()
                }
            })
    }
}

export default UserService;
