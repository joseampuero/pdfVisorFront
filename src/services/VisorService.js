import FetchClient from "./FetchClient";

class VisorService {
    static getVisualizationAsync = async (request) => {
        console.log("VisorService", request);

        const response = await FetchClient.get({
            url: `/visor/${request}`,
        });
        return response;
    };

    static translateAsync = async (text, direction = "en-es") => {
        console.log("🚀 Traduciendo:", text);

        const response = await FetchClient.post({
            url: `/visor/translate/`,
            data: {
                sentence: text,
                direction: direction,
            },
        });
        return response;
    };

    // Nuevo método para obtener la URL del PDF
    static getPdfUrl = (file) => {
        return `http://127.0.0.1:43302/visor/pdf/${file}`;
    };
}

export default VisorService;
