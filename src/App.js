import React from "react";
import i18n from "./i18n";
import { I18nextProvider, useTranslation } from "react-i18next";
import Dropzone from "./components/Dropzone";

function App() {
    const { t } = useTranslation("Home");

    return (
        <I18nextProvider i18n={i18n}>
            <main className="container">
                <h1 className="text-black text-uppercase text-center my-4">{t("HomeTitle")}</h1>
                <div className="row col-12">
                    <div className="col-md-10 col-sm-10 mx-auto p-0">
                        <div className="card p-4">
                            <Dropzone />
                        </div>
                    </div>
                </div>
            </main>
        </I18nextProvider>
    );
}

export default App;
