import useContextMenuCustom from "../hooks/UseContextMenuCustom";
import { VscCopy } from "react-icons/vsc";
import { MdGTranslate } from "react-icons/md";
import { useTranslation } from "react-i18next";

const ContextMenuCustom = () => {
    const { anchorPoint, show, bufferText } = useContextMenuCustom();
    const { t } = useTranslation("Components");

    const handleClickCopy = () => {
        console.log("---- Este metodo es para copiar --- no implementado");
    };

    const handleClickTranslate = () => {
        if (bufferText !== "") {
            console.log("traducir texto seleccionado ---> llamar api con: ", bufferText);
        }
    };

    if (show) {
        return (
            <div className="menu text-center" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
                <div className="menu-item" onClick={() => handleClickCopy()}>
                    <span>{t("ContextMenuCustom.CopyText")}</span>
                    <i className="menu-item-icon">
                        <VscCopy />
                    </i>
                </div>
                <div className="menu-item" onClick={() => handleClickTranslate()}>
                    <span>{t("ContextMenuCustom.TranslateText")}</span>
                    <i className="menu-item-icon-translate">
                        <MdGTranslate />
                    </i>
                </div>
                <hr />
                <div className="menu-item">
                    <span>Copy</span>
                    <i className="menu-item-icon">
                        <VscCopy />
                    </i>
                </div>
            </div>
        );
    }
    return <></>;
};

export default ContextMenuCustom;
