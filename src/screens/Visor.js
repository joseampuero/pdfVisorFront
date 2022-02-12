import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VisorService from "../services/VisorService";

function Visor() {
    const { file } = useParams();
    const [pdfText, setPdfText] = useState(null);

    useEffect(() => {
        if (pdfText !== null) {
            console.log("salimoooos");
            return;
        }

        console.log("Llamado api", file);
        const getVisualization = async () => {
            const pdfTextResponse = await VisorService.getVisualizationAsync(file);

            console.log("respuesta desde la api", pdfTextResponse);
            setPdfText(pdfTextResponse.saludo);
            console.log("si llegue aca es pq no entendi nada");
        };

        getVisualization();
    });

    // const getVisualization = async (potentialFileToUpload) => {
    //     if (Object.entries(potentialFileToUpload).length > 0) {
    //         const file = potentialFileToUpload[Object.keys(potentialFileToUpload)[0]];
    //         console.log("Llamado api", file);
    //         await VisorService.getVisualizationAsync(file.path);
    //     } else console.log("Levantar swal desde Dropzone!!");
    // };

    return (
        <div>
            <h1>Aca se visualiza la traduccion para {file}</h1>
            <p>{pdfText}</p>
        </div>
    );
}

export default Visor;
