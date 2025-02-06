import React from "react";
import {Spinner} from "@heroui/react";

interface LoadingLabel {
    label: string;
}
const LoadingSpinner: React.FC<LoadingLabel> = (props) => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Spinner size="lg" label={props.label} color="warning" />
        </div>
        
    )
}

export default LoadingSpinner;