import React from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import VisorService from "../services/VisorService";

function Dropzone(props) {
    const { t } = useTranslation("Components");
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    const getVisualization = async (potentialFileToUpload) => {
        if (Object.entries(potentialFileToUpload).length > 0) {
            const file = potentialFileToUpload[Object.keys(potentialFileToUpload)[0]];
            console.log("Llamado api", file);
            await VisorService.getVisualizationAsync(file.path);
        } else console.log("Levantar swal desde Dropzone!!");
    };

    return (
        <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p>{t("Dropzone.DragAndDropTxt")}</p>
            </div>
            <aside>
                <h4>{t("Dropzone.DragAndDropFooter")}</h4>
                <ul>{files}</ul>
            </aside>
            <div className="mb-4 mt-4">
                <button
                    className="btn btn-primary"
                    onClick={() => getVisualization({ ...acceptedFiles })}
                >
                    {t("Dropzone.BtnUploadFile")}
                </button>
            </div>
        </section>
    );
}

<Dropzone />;
export default Dropzone;
