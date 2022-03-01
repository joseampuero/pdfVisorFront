import { Menu } from "react-pro-sidebar";

const HistoryContent = ({ bufferHistory, handleClickTranslateFromHistory }) => {
    return (
        <Menu iconShape="square">
            {bufferHistory.map((sentence, index) => (
                <button
                    className={`btn ${sentence.class} mt-2 mx-1`}
                    style={{ backgroundColor: sentence.style }}
                    key={`sentence-${index}`}
                    onClick={handleClickTranslateFromHistory}
                >
                    {sentence.text}
                </button>
            ))}
        </Menu>
    );
};

export default HistoryContent;
