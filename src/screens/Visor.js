import React, { useEffect, useState } from "react";
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
    const [pdfText, setPdfText] = useState([]);
    const [showDefaultBox, setShowDefaultBox] = useState(true);
    const [showWaitForTranslation, setShowWaitForTranslation] = useState(false);
    const [translatedText, setTranslatedText] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    // const [indexKey, setIndexKey] = useState(0);

    useEffect(() => {
        if (pdfText.length !== 0) return;

        console.log("Llamado api", file);
        const getVisualization = async () => {
            setShowSpinner(true);

            let loading = true;
            let index = 0;
            let bufferText = [];
            while (loading) {
                const pdfTextResponse = await VisorService.getVisualizationAsync(
                    new VisorSerializer(file, index, index + 10).buildRequest()
                );

                console.log("respuesta desde la api", pdfTextResponse.content);
                if (pdfTextResponse.content === null || pdfTextResponse.content.length === 0)
                    loading = false;

                bufferText = bufferText.concat(pdfTextResponse.content);
                setPdfText(bufferText);

                index === 0 && setShowSpinner(false);
                console.log("pagina ", index);

                index += 10;
            }
        };

        getVisualization();
    }, []);

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
                {!showSpinner &&
                    pdfText.map((page, index) => {
                        return (
                            <Card
                                className="mt-2 visor-page"
                                id={`page-${index}`}
                                key={`page-${index}`}
                            >
                                <Card.Body>
                                    <div
                                        className="content visor-page-text"
                                        dangerouslySetInnerHTML={{ __html: page }}
                                    ></div>
                                </Card.Body>
                                <Card.Footer className="visor-page-footer text-muted">
                                    {index}
                                </Card.Footer>
                            </Card>
                        );
                    })}
            </Container>
        </div>
    );
}

export default Visor;
