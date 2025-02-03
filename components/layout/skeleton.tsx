import React from "react";
import {Spinner} from "@heroui/spinner";

interface LoadingLabel {
    label: string;
}
const LoadingSkeleton: React.FC<LoadingLabel> = (props) => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Spinner size="lg" label={props.label} color="warning" />
        </div>
        
    )
}

export default LoadingSkeleton;