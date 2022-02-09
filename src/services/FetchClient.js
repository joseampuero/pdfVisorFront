import axios from "axios";

class FetchClient {
    static async get(request) {
        axios
            .get(request.url)
            .then((res) => {
                return res.data;
            })
            .catch((err) => console.log(err));
    }
}

export default FetchClient;
