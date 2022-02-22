import historyColors from "../constants/historyColors.json";

class HistoryItem {
    constructor(text, index) {
        this.text = text;
        this.class = HistoryItem.#getClassButton(index);
        this.style = HistoryItem.#getStyleButton(index);
    }

    static #getClassButton = (index) => {
        if (historyColors.colors === null) return "btn-primary";

        const offset = index % 28;

        let range = HistoryItem.#shift(0);
        if (offset < range) return "btn-dark";

        range = HistoryItem.#shift(range);
        if (offset < range) return "btn-secondary";

        range = HistoryItem.#shift(range);
        if (offset < range) return "btn-primary";

        range = HistoryItem.#shift(range);
        if (offset < range) return "btn-info";

        range = HistoryItem.#shift(range);
        if (offset < range) return "btn-success";

        range = HistoryItem.#shift(range);
        if (offset < range) return "btn-warning";

        range = HistoryItem.#shift(range);
        if (offset < range) return "btn-danger";
    };

    static #shift = (value) => (value += 4);

    static #getStyleButton = (index) => {
        const colors = historyColors.colors;
        if (colors === null) return "";

        const offsetForType = index % 28;
        const offsetForColor = index % 4;

        let range = HistoryItem.#shift(0);
        if (offsetForType < range) return colors.dark[offsetForColor];

        range = HistoryItem.#shift(range);
        if (offsetForType < range) return colors.secondary[offsetForColor];

        range = HistoryItem.#shift(range);
        if (offsetForType < range) return colors.primary[offsetForColor];

        range = HistoryItem.#shift(range);
        if (offsetForType < range) return colors.info[offsetForColor];

        range = HistoryItem.#shift(range);
        if (offsetForType < range) return colors.success[offsetForColor];

        range = HistoryItem.#shift(range);
        if (offsetForType < range) return colors.warning[offsetForColor];

        range = HistoryItem.#shift(range);
        if (offsetForType < range) return colors.danger[offsetForColor];
    };
}

export default HistoryItem;
