import FetchClient from "./FetchClient";
import config from "../env";

class VisorService {
    static getVisualizationAsync = async (request) => {
        console.log("VisorService", request);

        console.log("config object", config.baseUrl);

        const response = await FetchClient.get({ url: `${config.baseUrl}/visor/` });

        console.log("response:", response);
        return response;
    };
}

export default VisorService;
