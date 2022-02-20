import React from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Dropzone() {
    const { t } = useTranslation("Components");
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const navigate = useNavigate();
    const mbRelativeValue = Math.pow(10, 6);

    const files = acceptedFiles.map((file) => (
        <li key={file.path}>
            {file.path} - {(file.size / mbRelativeValue).toFixed(2)} MB
        </li>
    ));

    const handleRedirectActionToVisor = (potentialFileToUpload) => {
        if (Object.entries(potentialFileToUpload).length > 0) {
            console.log("te vamos a rederigir a visor/");

            const file = potentialFileToUpload[Object.keys(potentialFileToUpload)[0]];

            navigate(`/visor/${file.path}`);
        } else console.log("Levantar swal desde Dropzone!!");
    };

    return (
        <section className="container">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <p className="dropzone-drag-text">{t("Dropzone.DragAndDropTxt")}</p>
            </div>
            <aside>
                <h4>{t("Dropzone.DragAndDropFooter")}</h4>
                <ul>{files}</ul>
            </aside>
            <div className="mb-4 mt-4">
                <button
                    className="btn btn-dark"
                    onClick={() => handleRedirectActionToVisor({ ...acceptedFiles })}
                >
                    {t("Dropzone.BtnUploadFile")}
                </button>
            </div>
        </section>
    );
}

<Dropzone />;
export default Dropzone;
