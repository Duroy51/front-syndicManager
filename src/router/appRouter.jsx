import React from "react";
import { Route, Routes } from "react-router-dom";
import { Circles } from 'react-loader-spinner';
import AuthGuard from '../helpers/AuthGuard';

import Header from "../components/Header.js";
const LoginPage = React.lazy(async () => ({
    default: (await import("../components/Authentication/Login/LoginPage")).LoginPage
}));
const RegisterPage = React.lazy(async () => ({
    default: (await import("../components/Authentication/Register/RegisterPage")).RegisterPage
}));
const WelcomePage = React.lazy(async () => ({
    default: (await import("../components/welcomePage/welcomePageNew.jsx")).LandingPage
}));
const HomePage = React.lazy(async () => ({
    default: (await import("../components/HomePage/HomePage")).HomePage
}));
const CreateSyndicat = React.lazy(async () => ({
    default: (await import("../components/CreateSyndicatPage/CreateSyndicat")).CreateSyndicat
}));
const SyndicatApp = React.lazy(async () => ({
    default: (await import("../components/Syndicat-App/SyndicatApp/Syndicat-App")).SyndicatApp
}));
const Profil = React.lazy(async () => ({
    default: (await import("../components/ProfilPage/ProfilPage.jsx")).SyndicatProfile
}));
/*ajout en bas */
const Membres = React.lazy(async () => ({
    default: (await import("../components/Membres/Membres.jsx")).Membres
}));
/**/
const ChatBox = React.lazy(async () => ({
    default: (await import("../components/Syndicat-App/Chat/ChatBox.jsx")).ChatBox
}));

/**/
const Apercus = React.lazy(async () => ({
    default: (await import("../components/Syndicat-App/Cotisations/Apercus/Apercus.jsx")).Apercus
}));

/**/

const Cotisation2 = React.lazy(async () => ({
    default: (await import("../components/Syndicat-App/Cotisations/Cotisations/Cotisation2.jsx")).Cotisation2
}));

/**/

const Finances = React.lazy(async () => ({
    default: (await import("../components/Syndicat-App/Cotisations/Finances.jsx")).Finances
}));

export const AppRoutesPaths = {
    loginPage: "/login",
    registerPage: "/register",
    welcomePage: "/",
    homePage: "/home",
    createSyndicat: "/home/createSyndicat",
    syndicatApp: "/syndicat-app",
    profil: "/profile",
    /* */
    Membres: "/Membres",
    ChatBox: "/ChatBox",
    ApercusPage: "/Apercus",
    Cotisation2: "/Cotisation2",
    Finances: "/Finances",
};

const CenteredSpinner = () => (
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

export function AppRoute() {
    return (
        <React.Suspense fallback={<CenteredSpinner />}>
            <Header/>
            <Routes>
                {/* Routes publiques */}
                <Route path={AppRoutesPaths.loginPage} element={ <LoginPage /> } />
                <Route path={AppRoutesPaths.registerPage} element={ <RegisterPage /> } />
                <Route path={AppRoutesPaths.welcomePage} element={ <WelcomePage /> } />
                <Route path={AppRoutesPaths.profil} element={ <Profil /> } />
                <Route path={AppRoutesPaths.Membres} element={ <Membres /> } />
                <Route path={AppRoutesPaths.ChatBox} element={ <ChatBox /> } />
                <Route path={AppRoutesPaths.ApercusPage} element={ <Apercus /> } />
                <Route path={AppRoutesPaths.Cotisation2} element={ <Cotisation2 /> } />
                <Route path={AppRoutesPaths.Finances} element={<Finances />} />

                {/* Routes protégées */}
                <Route
                    path={AppRoutesPaths.homePage}
                    element={
                        <AuthGuard> <HomePage /> </AuthGuard>
                        
                    }
                />
                <Route
                    path={AppRoutesPaths.createSyndicat}
                    element={
                        <AuthGuard><CreateSyndicat /></AuthGuard>
                    }
                />
                <Route
                    path={AppRoutesPaths.syndicatApp}
                    element={

                        <AuthGuard><  SyndicatApp/></AuthGuard>
                    }
                />
            </Routes>
        </React.Suspense>
    );
}

