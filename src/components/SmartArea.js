// components/SmartArea.js - Versión mejorada con renderizado dinámico
import React, { useState, useEffect, useRef } from "react";
import "../styles/styles.css";

const SmartArea = ({ originalText, translatedText, isLoading, onClose }) => {
    // En lugar de almacenar todos los pares, solo almacenamos los que ya se han procesado
    const [visiblePairs, setVisiblePairs] = useState([]);
    const [isTyping, setIsTyping] = useState(false);

    // Referencias para el procesamiento
    const allSentencesRef = useRef([]);
    const currentPairIndexRef = useRef(0);
    const currentCharIndexRef = useRef(0);
    const timerRef = useRef(null);

    // Preparar las oraciones cuando cambia el texto
    useEffect(() => {
        if (!originalText || !translatedText || isLoading) return;

        // Dividir por puntos, signos de interrogación, exclamación, etc.
        const originalSentences = originalText.split(/(?<=[.!?:])\s+/);
        const translatedSentences = translatedText.split(/(?<=[.!?:])\s+/);

        // Crear pares de oraciones (limitando al menor número de oraciones)
        const minLength = Math.min(originalSentences.length, translatedSentences.length);
        const pairs = [];

        for (let i = 0; i < minLength; i++) {
            pairs.push({
                original: originalSentences[i],
                translation: translatedSentences[i],
            });
        }

        // Guardar todas las oraciones en la referencia
        allSentencesRef.current = pairs;

        // Reiniciar el estado
        setVisiblePairs([]);
        currentPairIndexRef.current = 0;
        currentCharIndexRef.current = 0;

        // Iniciar automáticamente la escritura
        setIsTyping(true);
    }, [originalText, translatedText, isLoading]);

    // Efecto para simular la escritura simultánea
    useEffect(() => {
        if (!allSentencesRef.current.length || !isTyping) {
            return;
        }

        const typeNextChar = () => {
            // Si todavía hay pares de oraciones por procesar
            if (currentPairIndexRef.current < allSentencesRef.current.length) {
                const currentPair = allSentencesRef.current[currentPairIndexRef.current];
                const originalSentence = currentPair.original;
                const translationSentence = currentPair.translation;

                // Calcular la proporción entre original y traducción
                const originalLength = originalSentence.length;
                const translationLength = translationSentence.length;
                const ratio = translationLength / originalLength;

                // Si no hemos terminado con la oración original
                if (currentCharIndexRef.current < originalLength) {
                    // Calcular cuántos caracteres mostrar de la traducción
                    const translationCharsToShow = Math.floor(currentCharIndexRef.current * ratio);

                    // Actualizar el par visible actual
                    setVisiblePairs((prevPairs) => {
                        const newPairs = [...prevPairs];

                        // Si es la primera vez que procesamos este par, añadirlo
                        if (newPairs.length <= currentPairIndexRef.current) {
                            newPairs.push({
                                original: "",
                                translation: "",
                                id: Date.now(), // ID único para React key
                            });
                        }

                        // Actualizar el contenido del par
                        newPairs[currentPairIndexRef.current] = {
                            ...newPairs[currentPairIndexRef.current],
                            original: originalSentence.substring(
                                0,
                                currentCharIndexRef.current + 1
                            ),
                            translation: translationSentence.substring(
                                0,
                                translationCharsToShow + 1
                            ),
                        };

                        return newPairs;
                    });

                    currentCharIndexRef.current++;
                    timerRef.current = setTimeout(typeNextChar, 30);
                }
                // Si terminamos con esta oración, pasamos a la siguiente
                else {
                    // Asegurarse de que se muestre toda la traducción
                    setVisiblePairs((prevPairs) => {
                        const newPairs = [...prevPairs];
                        newPairs[currentPairIndexRef.current] = {
                            ...newPairs[currentPairIndexRef.current],
                            original: originalSentence,
                            translation: translationSentence,
                        };
                        return newPairs;
                    });

                    // Pasar al siguiente par
                    currentPairIndexRef.current++;
                    currentCharIndexRef.current = 0;

                    // Pequeña pausa antes del siguiente par
                    timerRef.current = setTimeout(typeNextChar, 500);
                }
            } else {
                // Hemos terminado con todos los pares
                setIsTyping(false);
            }
        };

        // Iniciar la escritura
        timerRef.current = setTimeout(typeNextChar, 30);

        return () => {
            // Limpiar timeouts si el componente se desmonta
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isTyping]);

    return (
        <div className="smart-area">
            <div className="smart-area-header">
                <span className="action-label">translate</span>
                <button className="close-btn" onClick={onClose}>
                    ×
                </button>
            </div>

            <div className="smart-area-content">
                {isLoading ? (
                    <div className="loading-indicator">Traduciendo...</div>
                ) : (
                    <div className="sentence-pairs-container">
                        {visiblePairs.map((pair, index) => (
                            <div key={pair.id || index} className="sentence-pair visible">
                                <div className="sentence-original typing-text">{pair.original}</div>
                                <div className="sentence-translation typing-text">
                                    {pair.translation}
                                </div>
                            </div>
                        ))}

                        {visiblePairs.length === 0 && !isLoading && (
                            <div className="empty-state">Procesando texto...</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SmartArea;
