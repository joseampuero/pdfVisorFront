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
import { FaHistory, FaArrowAltCircleRight } from "react-icons/fa";
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { GiAbstract050, GiConsoleController } from "react-icons/gi";
import VisorService from "../services/VisorService";
import "../styles/sidebar.css";

const History = ({ setTranslatedText, bufferHistory, setShowWaitForTranslation }) => {
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
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext" onClick={menuIconClick}>
                            {/* Icon change using menucollapse state */}
                            <p>
                                <i>{menuCollapse ? <FaArrowAltCircleRight /> : <FaHistory />}</i>
                                <span className="mx-4">
                                    {menuCollapse ? "" : "Historial de busqueda"}
                                </span>
                            </p>
                        </div>
                        <div className="closemenu" onClick={menuIconClick}>
                            {/* changing menu collapse icon on click */}
                            {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        {!menuCollapse && (
                            <Menu iconShape="square">
                                {bufferHistory.map((sentence, index) => (
                                    <button
                                        className="btn-primary btn mt-2 mx-1"
                                        key={`sentence-${index}`}
                                        onClick={handleClickTranslateFromHistory}
                                    >
                                        {sentence}
                                    </button>
                                ))}
                            </Menu>
                        )}
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </>
    );
};

export default History;
