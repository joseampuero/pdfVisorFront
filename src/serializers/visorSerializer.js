class VisorSerializer {
    constructor(endpoint, from, to) {
        this.endpoint = endpoint;
        this.from = from;
        this.to = to;
    }

    buildRequest = () => `${this.endpoint}/${this.from}/${this.to}`;
}

export default VisorSerializer;
