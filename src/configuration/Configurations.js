class ApiConfiguration {
    constructor(baseUrl) {
        if (!ApiConfiguration._instance) {
            this.baseUrl = baseUrl;
            ApiConfiguration._instance = this;
        }
        return ApiConfiguration._instance;
    }

    static baseUrl;
}

export default ApiConfiguration;
