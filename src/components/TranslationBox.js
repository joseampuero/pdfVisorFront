import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { FaBrain, FaExchangeAlt } from "react-icons/fa";

const TranslationBox = ({
    showDefaultBox,
    showWaitForTranslation,
    text,
    originalText,
    onRetranslate,
}) => {
    const { t } = useTranslation("Components");
    const [direction, setDirection] = useState("en-es");

    const handleDirectionToggle = () => {
        const newDirection = direction === "en-es" ? "es-en" : "en-es";
        setDirection(newDirection);
        if (onRetranslate && originalText) {
            onRetranslate(originalText, newDirection);
        }
    };

    return (
        <Navbar className="translation-box-navbar" variant="dark" fixed="top">
            <Navbar.Brand href="/">{t("TranslationBox.AppTitle")}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav col-10">
                <Nav className="col-12">
                    {showDefaultBox || showWaitForTranslation ? (
                        <Card className="translation-box-default col-12">
                            <Card.Body>
                                {showWaitForTranslation
                                    ? t("TranslationBox.WaitTranslateText")
                                    : t("TranslationBox.DefaultText")}
                            </Card.Body>
                        </Card>
                    ) : (
                        <Card className="translation-box col-12">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="flex-grow-1">
                                        <small className="text-muted">
                                            {originalText && `"${originalText}" →`}
                                        </small>
                                        <div>{text}</div>
                                    </div>
                                    <Button
                                        variant="outline-light"
                                        size="sm"
                                        onClick={handleDirectionToggle}
                                        title={`Cambiar a ${
                                            direction === "en-es" ? "ES→EN" : "EN→ES"
                                        }`}
                                    >
                                        <FaExchangeAlt />
                                        {direction === "en-es" ? " EN→ES" : " ES→EN"}
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Nav>
                <div className="context-gpt" onClick="/">
                    <p className="my-1">
                        <i className="mx-2">
                            <FaBrain />
                        </i>
                    </p>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TranslationBox;
