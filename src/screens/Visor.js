import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import ContextMenuCustom from "../components/ContextMenuCustom";
import VisorService from "../services/VisorService";
import "../styles/styles.css";

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
            <ContextMenuCustom />
            <Container>
                <h1>{file}</h1>

                <div className="content" dangerouslySetInnerHTML={{ __html: pdfText }}></div>
            </Container>
        </div>
    );
}

export default Visor;
