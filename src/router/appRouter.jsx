import React from "react"
import { Route, Routes } from "react-router-dom"
import { Circles } from 'react-loader-spinner';
import AuthGuard from '../helpers/AuthGuard.jsx';
import {getRoleFromToken} from "../services/AccountService.js";

// Imports avec React.lazy
const LoginPage = React.lazy(async () => ({
    default: (await import("../components/Authentication/Login/LoginPage")).LoginPage
}))
const RegisterPage = React.lazy(async () => ({
    default: (await import("../components/Authentication/Register/RegisterPage")).RegisterPage
}))
const WelcomePage = React.lazy(async () => ({
    default: (await import("../components/welcomePage/welcomePageNew.jsx")).LandingPage
}))
const HomePage = React.lazy(async () => ({
    default: (await import("../components/HomePage/HomePage")).HomePage
}))
const SimpleUserHomePage = React.lazy(async () => ({
    default: (await import("../SimpleUserComponent/HomePageSimpleUser.jsx")).SimpleUserHomePage
}))
const SyndicalistHomePage = React.lazy(async () => ({
    default: (await import("../SyndicalistComponents/HomePageSyndicaliste.jsx")).SyndicalistHomePage
}))
const CreateSyndicat = React.lazy(async () => ({
    default: (await import("../components/CreateSyndicatPage/CreateSyndicat")).CreateSyndicat
}))
const SyndicatApp = React.lazy(async () => ({
    default: (await import("../components/Syndicat-App/SyndicatApp/Syndicat-App")).SyndicatApp
}))
const Profil = React.lazy(async () => ({
    default: (await import("../components/ProfilPage/ProfilPage.jsx")).SyndicatProfile
}))

export const AppRoutesPaths = {
    loginPage: "/login",
    registerPage: "/register",
    welcomePage: "/",
    homePage: "/home",
    createSyndicat: "/home/createSyndicat",
    syndicatApp: "/syndicat-app",
    profil: "/profile",
}

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

// Composant qui gère le rendu conditionnel de la page d'accueil selon le rôle
const HomePageWrapper = ({ userRole }) => {
    switch(userRole) {
        case 'guest':
            return <SimpleUserHomePage />;
        case 'syndiqué':
            return <HomePage />;
        case 'syndicalist':
            return <SyndicalistHomePage />;
        
    }
};

export function AppRoute() {
    // Vous devrez implémenter une façon d'obtenir le rôle de l'utilisateur
    // Par exemple, depuis un contexte d'authentification ou un état global
    const userRole = getRoleFromToken(); // À remplacer par votre logique d'obtention du rôle

    return (
        <React.Suspense fallback={<CenteredSpinner/>}>
            <Routes>
                {/* Routes publiques */}
                <Route path={AppRoutesPaths.loginPage} element={<LoginPage/>}/>
                <Route path={AppRoutesPaths.registerPage} element={<RegisterPage/>}/>
                <Route path={AppRoutesPaths.welcomePage} element={<WelcomePage/>}/>
                <Route path={AppRoutesPaths.profil} element={<Profil/>}/>

                {/* Route conditionnelle pour la page d'accueil */}
                <Route
                    path={AppRoutesPaths.homePage}
                    element={
                        <AuthGuard>
                            <HomePageWrapper userRole={userRole} />
                        </AuthGuard>
                    }
                />

                {/* Autres routes protégées */}
                <Route
                    path={AppRoutesPaths.createSyndicat}
                    element={
                        <AuthGuard>
                            <CreateSyndicat/>
                        </AuthGuard>
                    }
                />
                <Route
                    path={AppRoutesPaths.syndicatApp}
                    element={<SyndicatApp/>}
                />
            </Routes>
        </React.Suspense>
    );
}