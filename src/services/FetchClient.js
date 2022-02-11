import axios from "axios";
import config from "../env";

class FetchClient {
    static async get(request) {
        let response;

        await http
            .get(request.url)
            .then((res) => {
                response = res.data;
            })
            .catch((err) => console.log(err));

        return response;
    }
}

const http = axios.create({
    baseURL: `${config.baseUrl}`,
    headers: { "Content-type": "application/json" },
});

export default FetchClient;
