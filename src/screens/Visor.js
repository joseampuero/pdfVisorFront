import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import ContextMenuCustom from "../components/ContextMenuCustom";
import TranslationBox from "../components/TranslationBox";
import VisorService from "../services/VisorService";
import { Oval } from "react-loader-spinner";
import Card from "react-bootstrap/Card";
import "../styles/styles.css";
import VisorSerializer from "../serializers/visorSerializer";

function Visor() {
    const { file } = useParams();
    const [pdfText, setPdfText] = useState(null);
    const [showDefaultBox, setShowDefaultBox] = useState(true);
    const [showWaitForTranslation, setShowWaitForTranslation] = useState(false);
    const [translatedText, setTranslatedText] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [indexKey, setIndexKey] = useState(0);

    useEffect(() => {
        if (pdfText != null) return;

        console.log("Llamado api", file);
        const getVisualization = async () => {
            setShowSpinner(true);

            let loading = true;
            let index = 0;
            while (loading && index < 40) {
                const pdfTextResponse = await VisorService.getVisualizationAsync(
                    new VisorSerializer(file, index, index + 10).buildRequest()
                );

                console.log("respuesta desde la api", pdfTextResponse.content);
                if (pdfTextResponse.content === null || pdfTextResponse.content.length === 0)
                    loading = false;

                setPdfText(pdfTextResponse.content);
                setIndexKey(index);
                index === 0 && setShowSpinner(false);
                console.log("pagina ", index);

                index += 10;
            }
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
                        {showSpinner && (
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
                        )}
                    </Card.Body>
                </Card>
                {pdfText != null &&
                    pdfText.map((page, index) => {
                        return (
                            <Card
                                className="mt-2"
                                id={`page-${index + indexKey}`}
                                key={`page-${index + indexKey}`}
                            >
                                <Card.Body>
                                    <div
                                        className="content visor-body-text"
                                        dangerouslySetInnerHTML={{ __html: page }}
                                    ></div>
                                </Card.Body>
                            </Card>
                        );
                    })}
            </Container>
        </div>
    );
}

export default Visor;
