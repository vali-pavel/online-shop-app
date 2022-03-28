class ApiRequestManager {
    constructor(key, headers = {}) {
        this.key = key
        this.headers = headers
    }

    getRestHeaders() {
        if (this.key) {
            this.headers['Authorization'] = this.key;
        }
        return this.headers;
    }

    getRequestOptions(method, body) {
        let reqOptions = {
            'method': method,
            'headers': this.getRestHeaders(),
        }
        if (body) {
            reqOptions.body = body;
        }
        return reqOptions;
    }
}

export default ApiRequestManager;
