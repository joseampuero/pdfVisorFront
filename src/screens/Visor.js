import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import ContextMenuCustom from "../components/ContextMenuCustom";
import TranslationBox from "../components/TranslationBox";
import VisorService from "../services/VisorService";
import { Oval } from "react-loader-spinner";
import Card from "react-bootstrap/Card";
import "../styles/styles.css";

function Visor() {
    const { file } = useParams();
    const [pdfText, setPdfText] = useState(null);
    const [showDefaultBox, setShowDefaultBox] = useState(true);
    const [showWaitForTranslation, setShowWaitForTranslation] = useState(false);
    const [translatedText, setTranslatedText] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        if (pdfText !== null) return;

        console.log("Llamado api", file);
        const getVisualization = async () => {
            setShowSpinner(true);
            const pdfTextResponse = await VisorService.getVisualizationAsync(file);

            // console.log("respuesta desde la api", pdfTextResponse);
            setPdfText(pdfTextResponse.text);
            setShowSpinner(false);
        };

        getVisualization();
    });

    return (
        <div className={showSpinner ? "" : "visor-enviroment"}>
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
                <Card>
                    <Card.Title className="mt-2 mx-3">
                        <h1>{file}</h1>
                    </Card.Title>
                    <Card.Body>
                        {showSpinner ? (
                            <div
                                className="visor-spinner"
                                style={{
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                }}
                            >
                                <Oval
                                    color="white"
                                    secondaryColor="gray"
                                    strokeWidth={4}
                                    height={80}
                                    width={80}
                                />
                            </div>
                        ) : (
                            <div
                                className="content visor-body-text"
                                dangerouslySetInnerHTML={{ __html: pdfText }}
                            ></div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}

export default Visor;
