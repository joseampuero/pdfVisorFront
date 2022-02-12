import React from "react";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Visor from "./screens/Visor";

function App() {
    return (
        <I18nextProvider i18n={i18n}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/visor/:file" element={<Visor file="" />} />
                </Routes>
            </BrowserRouter>
        </I18nextProvider>
    );
}

export default App;
