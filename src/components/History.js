import { useEffect, useState } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaHistory, FaBars, FaGithubAlt } from "react-icons/fa";
import VisorService from "../services/VisorService";
import { useTranslation } from "react-i18next";
import historyColors from "../constants/historyColors.json";
import "../styles/sidebar.css";

const History = ({ setTranslatedText, setShowWaitForTranslation, bufferHistory }) => {
    const { t } = useTranslation("Components");
    const [menuCollapse, setMenuCollapse] = useState(false);

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const handleClickTranslateFromHistory = async (event) => {
        setShowWaitForTranslation(true);

        let sentenceToTranslate = event.currentTarget.innerText;

        const translation = await VisorService.translateAsync(sentenceToTranslate);

        setTranslatedText(translation.text);
        setShowWaitForTranslation(false);
    };

    const shift = (value) => (value += 4);

    const getTypeButton = (index) => {
        if (historyColors.colors === null) return "btn-primary";

        const offset = index % 28;
        let range = 0;
        if (offset >= range && offset < shift(range)) return "btn-dark";
        else if (offset >= range && offset < shift(range)) return "btn-secondary";
        else if (offset >= range && offset < shift(range)) return "btn-primary";
        else if (offset >= range && offset < shift(range)) return "btn-info";
        else if (offset >= range && offset < shift(range)) return "btn-success";
        else if (offset >= range && offset < shift(range)) return "btn-warning";
        else if (offset >= range && offset < shift(range)) return "btn-danger";
    };

    // const styleProperty = (color) => `${color}`;

    const getStyleButton = (index) => {
        const colors = historyColors.colors;
        if (colors === null) return "";

        const offsetForType = index % 28;
        const offsetForColor = index % 4;
        let range = 0;
        debugger;
        if (offsetForType >= range && offsetForType < shift(range))
            return colors.dark[offsetForColor];
        else if (offsetForType >= range && offsetForType < shift(range))
            return colors.secondary[offsetForColor];
        else if (offsetForType >= range && offsetForType < shift(range))
            return colors.primary[offsetForColor];
        else if (offsetForType >= range && offsetForType < shift(range))
            return colors.info[offsetForColor];
        else if (offsetForType >= range && offsetForType < shift(range))
            return colors.success[offsetForColor];
        else if (offsetForType >= range && offsetForType < shift(range))
            return colors.warning[offsetForColor];
        else if (offsetForType >= range && offsetForType < shift(range))
            return colors.danger[offsetForColor];
    };

    return (
        <>
            <div id="header">
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext" onClick={menuIconClick}>
                            <p>
                                {menuCollapse ? (
                                    <i className="mx-2">
                                        <FaBars />
                                    </i>
                                ) : (
                                    <i>
                                        <FaHistory />
                                    </i>
                                )}
                                <span className="mx-4">
                                    {menuCollapse ? "" : t("History.SearchHistory")}
                                </span>
                            </p>
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        {!menuCollapse && (
                            <Menu iconShape="square">
                                {bufferHistory.map((sentence, index) => (
                                    <button
                                        style={{ backgroundColor: getStyleButton(index) }}
                                        className={`btn ${getTypeButton(index)} mt-2 mx-1`}
                                        key={`sentence-${index}`}
                                        onClick={handleClickTranslateFromHistory}
                                    >
                                        {sentence}
                                    </button>
                                ))}
                            </Menu>
                        )}
                    </SidebarContent>
                    {(bufferHistory.length === 0 || menuCollapse) && (
                        <SidebarFooter>
                            <Menu iconShape="square">
                                <MenuItem className="footer-item-main" icon={<FaGithubAlt />}>
                                    {t("History.FooterText")}
                                </MenuItem>
                            </Menu>
                        </SidebarFooter>
                    )}
                </ProSidebar>
            </div>
        </>
    );
};

export default History;
