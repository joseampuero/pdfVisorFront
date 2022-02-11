import FetchClient from "./FetchClient";

class VisorService {
    static getVisualizationAsync = async (request) => {
        console.log("VisorService", request);

        const response = await FetchClient.get({
            url: `/visor/${request}`,
        });

        console.log("response:", response);
        return response;
    };
}

export default VisorService;
