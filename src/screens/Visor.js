// Visor.js - Versión simplificada
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import ContextMenuCustom from "../components/ContextMenuCustom";
import SmartArea from "../components/SmartArea";
import VisorService from "../services/VisorService";
import Card from "react-bootstrap/Card";
import "../styles/styles.css";
import VisorSerializer from "../serializers/visorSerializer";
import PageLazyLoad from "../components/PageLazyLoad";
import LoadingSpinner from "../components/LoadingSpinner";

function Visor() {
    const { file } = useParams();
    const [pdfText, setPdfText] = useState([]);
    const [translatedText, setTranslatedText] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);
    const [bufferHistory, setBufferHistory] = useState([]);
    const [showWaitForTranslation, setShowWaitForTranslation] = useState(false);

    // Nuevo estado para el párrafo seleccionado
    const [selectedParagraph, setSelectedParagraph] = useState(null);
    // Estado para controlar la visibilidad del panel lateral
    const [showSmartArea, setShowSmartArea] = useState(false);

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
    }, [file, pdfText.length]);

    // Handler para manejar clicks en párrafos
    const handleParagraphClick = async (paragraphText, paragraphId) => {
        console.log("🎯 Párrafo clickeado:", paragraphText);
        console.log("📍 ID:", paragraphId);

        // Actualizar el párrafo seleccionado
        setSelectedParagraph({
            text: paragraphText,
            id: paragraphId,
        });

        // Mostrar el panel lateral
        setShowSmartArea(true);

        // Mostrar indicador de carga
        setShowWaitForTranslation(true);

        try {
            // Llamar al servicio de traducción
            const translation = await VisorService.translateAsync(paragraphText, "en-es");

            // Actualizar el texto traducido
            setTranslatedText(translation.text);
            setShowWaitForTranslation(false);

            // Agregar al historial si el texto no es muy largo
            if (paragraphText.length < 100) {
                const newHistoryItem = {
                    text: paragraphText,
                    translation: translation.text,
                    id: paragraphId,
                };
                setBufferHistory([...bufferHistory, newHistoryItem]);
            }
        } catch (error) {
            console.error("❌ Error traduciendo párrafo:", error);
            setTranslatedText("Error al traducir el párrafo");
            setShowWaitForTranslation(false);
        }
    };

    return (
        <div className={showSpinner ? "" : "visor-environment"}>
            {/* Mantenemos ContextMenuCustom por si lo necesitas */}
            <ContextMenuCustom
                setShowWaitForTranslation={setShowWaitForTranslation}
                setTranslatedText={setTranslatedText}
                setBufferHistory={setBufferHistory}
                bufferHistory={bufferHistory}
            />

            {/* Layout principal con dos paneles */}
            <div className="main-layout">
                {/* Panel izquierdo - Workspace */}
                <div className="workspace workspace-expanded">
                    <Container>
                        <Card>
                            <Card.Title className="mt-2 mx-3">
                                <h1>{file}</h1>
                            </Card.Title>
                            <Card.Body>{showSpinner && <LoadingSpinner />}</Card.Body>
                        </Card>
                        {!showSpinner && (
                            <PageLazyLoad text={pdfText} onParagraphClick={handleParagraphClick} />
                        )}
                    </Container>
                </div>

                {/* Panel derecho - Smart Area */}
                {showSmartArea && (
                    <div className="smart-area-container">
                        <SmartArea
                            originalText={selectedParagraph?.text}
                            translatedText={translatedText}
                            isLoading={showWaitForTranslation}
                            onClose={() => setShowSmartArea(false)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Visor;
