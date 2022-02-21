import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import ContextMenuCustom from "../components/ContextMenuCustom";
import TranslationBox from "../components/TranslationBox";
import VisorService from "../services/VisorService";
import Card from "react-bootstrap/Card";
import "../styles/styles.css";
import VisorSerializer from "../serializers/visorSerializer";
import PageLazyLoad from "../components/PageLazyLoad";
import LoadingSpinner from "../components/LoadingSpinner";
import History from "../components/History";

function Visor() {
    const { file } = useParams();
    const [pdfText, setPdfText] = useState([]);
    const [showDefaultBox, setShowDefaultBox] = useState(true);
    const [showWaitForTranslation, setShowWaitForTranslation] = useState(false);
    const [translatedText, setTranslatedText] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [bufferHistory, setBufferHistory] = useState([]);

    useEffect(() => {
        if (pdfText.length !== 0) return;

        console.log("Llamado api con", file);
        const getVisualization = async () => {
            setShowSpinner(true);

            let index = 0;
            let bufferText = [];
            while (true) {
                const pdfTextResponse = await VisorService.getVisualizationAsync(
                    new VisorSerializer(file, index, index + 10).buildRequest()
                );

                console.log("Respuesta desde la api", pdfTextResponse.content);
                if (pdfTextResponse.content.length === 0) break;

                bufferText = bufferText.concat(pdfTextResponse.content);
                setPdfText(bufferText);

                index === 0 && setShowSpinner(false);
                console.log("Pagina ", index);

                index += 10;
            }
        };

        getVisualization();
    }, []);

    return (
        <div className={showSpinner ? "" : "visor-enviroment"}>
            <History setTranslatedText={setTranslatedText} bufferHistory={bufferHistory} />
            <TranslationBox
                showDefaultBox={showDefaultBox}
                showWaitForTranslation={showWaitForTranslation}
                text={translatedText}
            />
            <ContextMenuCustom
                setShowDefaultComponent={setShowDefaultBox}
                setShowWaitForTranslation={setShowWaitForTranslation}
                setTranslatedText={setTranslatedText}
                setBufferHistory={setBufferHistory}
                bufferHistory={bufferHistory}
            />
            <Container className="visor-body-main">
                <Card>
                    <Card.Title className="mt-2 mx-3">
                        <h1>{file}</h1>
                    </Card.Title>
                    <Card.Body>{showSpinner && <LoadingSpinner />}</Card.Body>
                </Card>
                {!showSpinner && <PageLazyLoad text={pdfText} />}
            </Container>
        </div>
    );
}

export default Visor;
