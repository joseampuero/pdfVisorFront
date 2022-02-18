import useContextMenuCustom from "../hooks/UseContextMenuCustom";
import { VscCopy } from "react-icons/vsc";
import { MdGTranslate } from "react-icons/md";
import { useTranslation } from "react-i18next";
import VisorService from "../services/VisorService";

const ContextMenuCustom = ({ setShowDefaultComponent, setShowWaitForTranslation, setText }) => {
    const { anchorPoint, show, bufferText } = useContextMenuCustom();
    const { t } = useTranslation("Components");

    const handleClickCopy = () => {
        navigator.clipboard.writeText(bufferText);
    };

    const handleClickTranslate = async () => {
        if (bufferText.trim() !== "") {
            setShowWaitForTranslation(true);

            console.log("palabra a traducir: ", bufferText);
            const parsedBufferText = bufferText.replace("\n", " ").trim();
            const translation = await VisorService.translateAsync(parsedBufferText);
            console.log("resultado de la traduccion: ", translation.text);

            setText(translation.text);
            setShowDefaultComponent(false);
            setShowWaitForTranslation(false);
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
                    <span> ... </span>
                    <i className="menu-item-icon"></i>
                </div>
            </div>
        );
    }
    return <></>;
};

export default ContextMenuCustom;
