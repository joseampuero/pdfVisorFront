import ApiConfiguration from "./types/Configurations";

const config = new ApiConfiguration(process.env.REACT_APP_BACKEND_API_BASE_URL);

export default config;
