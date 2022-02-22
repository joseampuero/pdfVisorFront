import { useState } from "react";
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
                                        className="btn btn-primary mt-2 mx-1"
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
