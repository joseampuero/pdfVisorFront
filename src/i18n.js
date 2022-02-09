import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "../src/translate/es-AR/common.json";

i18n.use(initReactI18next).init({
    lng: "es-AR",
    interpolation: {
        escapeValue: false,
    },
    saveMissing: false,
    resources: {
        es: es,
    },
});

i18n.languages = ["es"];
export default i18n;
