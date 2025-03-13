import React from "react";
import {SimpleUserHomePage} from "../SimpleUserComponent/HomePageSimpleUser.jsx";
import {HomePage} from "../components/HomePage/HomePage.jsx";
import {SyndicalistHomePage} from "../SyndicalistComponents/HomePageSyndicaliste.jsx";

export const HomePageWrapper = ({ userRole }) => {
    switch(userRole) {
        case 'guest':
            return <SimpleUserHomePage />;
        case 'syndiqué':
            return <HomePage />;
        case 'syndicalist':
            return <SyndicalistHomePage />;

    }
};