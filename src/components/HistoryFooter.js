import { Menu, MenuItem } from "react-pro-sidebar";
import { FaGithubAlt } from "react-icons/fa";

const HistoryFooter = ({ t }) => {
    return (
        <Menu iconShape="square">
            <MenuItem className="footer-item-main" icon={<FaGithubAlt />}>
                {t("History.FooterText")}
            </MenuItem>
        </Menu>
    );
};

export default HistoryFooter;
