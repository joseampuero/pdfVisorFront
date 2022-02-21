import React from "react";
import { useTranslation } from "react-i18next";
import Dropzone from "../components/Dropzone";

function Home() {
    const { t } = useTranslation("Home");

    return (
        <main className="container">
            <h1 className="text-black home-title text-center my-4">{t("HomeTitle")}</h1>
            <div className="row col-12">
                <div className="col-md-10 col-sm-10 mx-auto p-0">
                    <div className="card p-4">
                        <Dropzone />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;
