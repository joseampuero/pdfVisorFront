import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import VisorService from "../services/VisorService";

function Visor() {
    const { file } = useParams();
    const [pdfText, setPdfText] = useState(null);

    useEffect(() => {
        if (pdfText !== null) return;

        console.log("Llamado api", file);
        const getVisualization = async () => {
            const pdfTextResponse = await VisorService.getVisualizationAsync(file);

            console.log("respuesta desde la api", pdfTextResponse);
            setPdfText(pdfTextResponse.text);
        };

        getVisualization();
    });

    return (
        <div>
            <Container>
                <h1>{file}</h1>

                <div className="content" dangerouslySetInnerHTML={{ __html: pdfText }}></div>
            </Container>
        </div>
    );
}

export default Visor;
