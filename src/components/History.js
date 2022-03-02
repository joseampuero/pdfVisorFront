import { useState } from "react";
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import VisorService from "../services/VisorService";
import { useTranslation } from "react-i18next";
import "../styles/sidebar.css";
import HistoryHeader from "./HistoryHeader";
import HistoryContent from "./HistoryContent";
import HistoryFooter from "./HistoryFooter";

const History = ({
    setTranslatedText,
    setShowWaitForTranslation,
    setMenuCollapse,
    bufferHistory,
    menuCollapse,
}) => {
    const { t } = useTranslation("Components");

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
                        <HistoryHeader
                            menuIconClick={menuIconClick}
                            menuCollapse={menuCollapse}
                            t={t}
                        />
                    </SidebarHeader>
                    <SidebarContent>
                        {!menuCollapse && (
                            <HistoryContent
                                bufferHistory={bufferHistory}
                                handleClickTranslateFromHistory={handleClickTranslateFromHistory}
                            />
                        )}
                    </SidebarContent>
                    {(bufferHistory.length === 0 || menuCollapse) && (
                        <SidebarFooter>
                            <HistoryFooter t={t} />
                        </SidebarFooter>
                    )}
                </ProSidebar>
            </div>
        </>
    );
};

export default History;
