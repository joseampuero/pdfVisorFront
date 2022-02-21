import React from "react";
import { Oval } from "react-loader-spinner";

const LoadingSpinner = () => {
    const positionSpinner = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    };

    return (
        <div className="visor-spinner" style={positionSpinner}>
            <Oval color="white" secondaryColor="gray" strokeWidth={4} height={80} width={80} />
        </div>
    );
};

export default LoadingSpinner;
