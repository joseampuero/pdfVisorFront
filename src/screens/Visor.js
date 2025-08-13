// screens/Visor.js
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ContextMenuCustom from "../components/ContextMenuCustom";
import SmartArea from "../components/SmartArea";
import PDFViewerComponent from "../components/PDFViewerComponent";
import VisorService from "../services/VisorService";
import "../styles/styles.css";

function Visor() {
    const { file } = useParams();
    const [translatedText, setTranslatedText] = useState(null);
    const [showWaitForTranslation, setShowWaitForTranslation] = useState(false);
    const [bufferHistory, setBufferHistory] = useState([]);

    // Estado para el párrafo seleccionado
    const [selectedParagraph, setSelectedParagraph] = useState(null);
    // Estado para controlar la visibilidad del panel lateral
    const [showSmartArea, setShowSmartArea] = useState(false);

    // Obtener la URL del PDF usando el servicio
    const pdfUrl = VisorService.getPdfUrl(file);
    console.log("📄 URL del PDF:", pdfUrl);
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
        <div className="visor-environment">
            {/* Menú contextual */}
            <ContextMenuCustom
                setShowWaitForTranslation={setShowWaitForTranslation}
                setTranslatedText={setTranslatedText}
                setBufferHistory={setBufferHistory}
                bufferHistory={bufferHistory}
            />

            {/* Layout principal con dos paneles */}
            <div className="main-layout">
                {/* Panel izquierdo - PDF Viewer */}
                <div className={`workspace ${!showSmartArea ? "workspace-expanded" : ""}`}>
                    <PDFViewerComponent pdfUrl={pdfUrl} onParagraphClick={handleParagraphClick} />
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
