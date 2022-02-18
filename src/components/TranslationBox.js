import React from "react";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useTranslation } from "react-i18next";

const TranslationBox = ({ showDefaultBox, showWaitForTranslation, text }) => {
    const { t } = useTranslation("Components");

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
                            <Card.Body>{text}</Card.Body>
                        </Card>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default TranslationBox;
