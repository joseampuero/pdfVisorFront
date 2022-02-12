import FetchClient from "./FetchClient";

class VisorService {
    static getVisualizationAsync = async (request) => {
        console.log("VisorService", request);

        const response = await FetchClient.get({
            url: `/visor/${request}`,
        });
        return response;
    };
}

export default VisorService;
