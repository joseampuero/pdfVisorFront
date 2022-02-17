import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import ContextMenuCustom from "../components/ContextMenuCustom";
import TranslationBox from "../components/TranslationBox";
import VisorService from "../services/VisorService";
import "../styles/styles.css";

function Visor() {
    const { file } = useParams();
    const [pdfText, setPdfText] = useState(null);
    const [showDefaultBox, setShowDefaultBox] = useState(true);
    const [showWaitForTranslation, setShowWaitForTranslation] = useState(false);
    const [translatedText, setTranslatedText] = useState(null);

    useEffect(() => {
        if (pdfText !== null) return;

        console.log("Llamado api", file);
        const getVisualization = async () => {
            const pdfTextResponse = await VisorService.getVisualizationAsync(file);

            // console.log("respuesta desde la api", pdfTextResponse);
            setPdfText(pdfTextResponse.text);
        };

        getVisualization();
    });

    return (
        <div>
            <TranslationBox
                showDefaultBox={showDefaultBox}
                showWaitForTranslation={showWaitForTranslation}
                text={translatedText}
            />
            <ContextMenuCustom
                setShowDefaultComponent={setShowDefaultBox}
                setShowWaitForTranslation={setShowWaitForTranslation}
                setText={setTranslatedText}
            />
            <Container className="visor-body-main">
                <h1>{file}</h1>

                <div className="content" dangerouslySetInnerHTML={{ __html: pdfText }}></div>
            </Container>
        </div>
    );
}

export default Visor;
