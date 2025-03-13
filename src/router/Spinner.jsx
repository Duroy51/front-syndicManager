import {Circles} from "react-loader-spinner";
import React from "react";

export const CenteredSpinner = () => (
    <div className="flex items-center justify-center h-screen">
        <Circles
            height="40"
            width="40"
            color="#3498db"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
        <span className="ml-4 text-gray-600">Chargement...</span>
    </div>
);