import axios from "axios";

class FetchClient {
    static async get(request) {
        let response;
        await axios
            .get(request.url)
            .then((res) => {
                response = res.data;
            })
            .catch((err) => console.log(err));

        return response;
    }
}

export default FetchClient;
