import React, { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerPath from "pdfjs-dist/legacy/build/pdf.worker.entry";
import "../styles/pdf-viewer.css";

// Configurar el worker
pdfjsLib.GlobalWorkerOptions.workerSrc = workerPath;

// Componente para una página individual del PDF
const PDFPage = React.memo(({ page, scale, pageNum, onParagraphClick }) => {
    const canvasRef = useRef(null);
    const pageContainerRef = useRef(null);
    const [paragraphs, setParagraphs] = useState([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Renderizar la página cuando cambia la escala
    useEffect(() => {
        const renderPage = async () => {
            if (!page || !canvasRef.current) return;

            try {
                // Configurar el viewport
                const viewport = page.getViewport({ scale });
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d");

                // Actualizar dimensiones
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                setDimensions({ width: viewport.width, height: viewport.height });

                // Renderizar la página en el canvas
                await page.render({
                    canvasContext: context,
                    viewport: viewport,
                }).promise;

                // Extraer el contenido de texto
                const textContent = await page.getTextContent();

                // Procesar párrafos
                const extractedParagraphs = processTextContent(textContent, viewport);
                setParagraphs(extractedParagraphs);
            } catch (error) {
                console.error(`Error rendering page ${pageNum}:`, error);
            }
        };

        renderPage();
    }, [page, scale, pageNum]);

    // Función para procesar el contenido de texto y extraer párrafos
    const processTextContent = (textContent, viewport) => {
        const items = textContent.items;
        let paragraphGroups = [];
        let currentParagraph = [];
        let lastY = null;
        let lastItem = null;

        // Agrupar elementos de texto en párrafos basados en su posición Y
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const y = item.transform[5];

            // Si es el primer elemento o está en la misma línea (o muy cerca)
            if (lastY === null || Math.abs(y - lastY) < 5) {
                currentParagraph.push(item);
            }
            // Si hay un pequeño espacio pero probablemente sigue siendo el mismo párrafo
            else if (Math.abs(y - lastY) < 15 && lastItem && item.str.trim() !== "") {
                currentParagraph.push(item);
            }
            // Si hay un espacio significativo, es un nuevo párrafo
            else {
                if (currentParagraph.length > 0) {
                    paragraphGroups.push([...currentParagraph]);
                }
                currentParagraph = [item];
            }

            lastY = y;
            lastItem = item;
        }

        // Añadir el último párrafo
        if (currentParagraph.length > 0) {
            paragraphGroups.push([...currentParagraph]);
        }

        // Convertir grupos de párrafos a objetos con propiedades para renderizado
        return paragraphGroups
            .map((paragraph, index) => {
                if (paragraph.length === 0) return null;

                // Obtener el texto completo del párrafo
                const paragraphText = paragraph.map((item) => item.str).join(" ");

                // Ignorar párrafos vacíos o muy cortos
                if (paragraphText.trim().length < 3) return null;

                // Obtener las coordenadas del primer y último elemento
                const firstItem = paragraph[0];
                const lastItem = paragraph[paragraph.length - 1];

                // Coordenadas en el espacio del viewport
                const firstX = firstItem.transform[4];
                const firstY = firstItem.transform[5];
                const lastX = lastItem.transform[4] + lastItem.width;
                const lastY = lastItem.transform[5] - lastItem.height;

                return {
                    id: `page-${pageNum}-paragraph-${index}`,
                    text: paragraphText,
                    style: {
                        left: `${firstX}px`,
                        top: `${lastY}px`,
                        width: `${Math.max(lastX - firstX, 10)}px`,
                        height: `${Math.max(firstY - lastY, 10)}px`,
                    },
                };
            })
            .filter(Boolean); // Filtrar elementos nulos
    };

    // Manejar clic en párrafo
    const handleParagraphClick = (paragraphId, paragraphText) => {
        // Remover selección anterior
        const selectedElements = document.querySelectorAll(".clickable-paragraph.selected");
        selectedElements.forEach((el) => el.classList.remove("selected"));

        // Seleccionar este párrafo
        const paragraphElement = document.getElementById(paragraphId);
        if (paragraphElement) {
            paragraphElement.classList.add("selected");
        }

        // Llamar al callback
        if (onParagraphClick) {
            onParagraphClick(paragraphText, paragraphId);
        }
    };

    return (
        <div
            className="pdf-page"
            ref={pageContainerRef}
            data-page-number={pageNum}
            style={{ position: "relative", width: dimensions.width, height: dimensions.height }}
        >
            <canvas ref={canvasRef} />

            {/* Capa de párrafos clickeables */}
            <div
                className="paragraphs-layer"
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            >
                {paragraphs.map((paragraph) => (
                    <div
                        key={paragraph.id}
                        id={paragraph.id}
                        className="clickable-paragraph"
                        style={{
                            ...paragraph.style,
                            position: "absolute",
                            cursor: "pointer",
                        }}
                        onClick={() => handleParagraphClick(paragraph.id, paragraph.text)}
                    />
                ))}
            </div>
        </div>
    );
});

// Componente principal del visor de PDF
const PDFViewerComponent = ({ pdfUrl, onParagraphClick }) => {
    const [pdfDocument, setPdfDocument] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [scale, setScale] = useState(1.2);
    const [isLoading, setIsLoading] = useState(true);
    const [pageObjects, setPageObjects] = useState([]);
    const containerRef = useRef(null);

    // Cargar el PDF
    useEffect(() => {
        let isMounted = true;

        const loadPdf = async () => {
            try {
                setIsLoading(true);
                console.log("Cargando PDF desde:", pdfUrl);

                // Cargar el documento PDF
                const loadingTask = pdfjsLib.getDocument(pdfUrl);
                const pdf = await loadingTask.promise;

                // Verificar si el componente sigue montado
                if (!isMounted) return;

                setPdfDocument(pdf);
                setNumPages(pdf.numPages);

                // Cargar objetos de página
                const pages = [];
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    if (!isMounted) return;
                    pages.push(page);
                }

                setPageObjects(pages);
                setIsLoading(false);
                console.log(`PDF cargado con ${pdf.numPages} páginas`);
            } catch (error) {
                console.error("Error loading PDF:", error);
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        if (pdfUrl) {
            loadPdf();
        }

        // Cleanup
        return () => {
            isMounted = false;
        };
    }, [pdfUrl]);

    // Manejar zoom
    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
    const handleZoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.1));

    return (
        <div className="pdf-viewer-container">
            <div className="pdf-controls">
                <button className="control-btn" onClick={handleZoomIn} disabled={isLoading}>
                    Zoom In
                </button>
                <button className="control-btn" onClick={handleZoomOut} disabled={isLoading}>
                    Zoom Out
                </button>
                <span className="page-info">
                    {isLoading ? "Cargando..." : `Página ${currentPage} de ${numPages}`}
                </span>
            </div>

            <div className="pdf-viewer" ref={containerRef}>
                {isLoading ? (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Cargando PDF...</p>
                    </div>
                ) : (
                    <div className="pdf-pages-container">
                        {pageObjects.map((page, index) => (
                            <PDFPage
                                key={`page-${index + 1}`}
                                page={page}
                                scale={scale}
                                pageNum={index + 1}
                                onParagraphClick={onParagraphClick}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PDFViewerComponent;
