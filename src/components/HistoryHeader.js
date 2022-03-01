import { FaHistory, FaBars } from "react-icons/fa";

const HistoryHeader = ({ menuIconClick, menuCollapse, t }) => {
    return (
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
                <span className="mx-4">{menuCollapse ? "" : t("History.SearchHistory")}</span>
            </p>
        </div>
    );
};

export default HistoryHeader;
