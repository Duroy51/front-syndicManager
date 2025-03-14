import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Circles } from 'react-loader-spinner';
import AuthGuard from '../helpers/AuthGuard.jsx';
import {getRoleFromToken} from "../services/AccountService.js";
import {AppRoutesPaths} from "./AppRoutesPaths.js";
import {CenteredSpinner} from "./Spinner.jsx";
import {HomePageWrapper} from "./Provider.jsx";






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
const ContentManager = React.lazy(async () => ({
    default: (await import("../components/Education/ContentManager.jsx")).default,
  }));
  const CommunicationManager = React.lazy(async () => ({
    default: (await import("../components/Communication/CommunicationManager.jsx")).default,
}));
const ForumTopic = React.lazy(async () => ({
    default: (await import("../components/Communication/ForumTopic.jsx")).default,
}));







export function AppRoute() {

    const userRole = getRoleFromToken();

    return (
        <React.Suspense fallback={<CenteredSpinner/>}>
            <Routes>
                {/* Routes publiques */}
                <Route path={AppRoutesPaths.loginPage} element={<LoginPage/>}/>
                <Route path={AppRoutesPaths.registerPage} element={<RegisterPage/>}/>
                <Route path={AppRoutesPaths.welcomePage} element={<WelcomePage/>}/>
                <Route path={AppRoutesPaths.profil} element={<Profil/>}/>
                <Route path={`${AppRoutesPaths.education.base}/*`} element={<ContentManager />}/>
                            {/* Routes pour la communication */}
                <Route path={`${AppRoutesPaths.communication.base}/*`} element={<CommunicationManager />} />
                <Route path={AppRoutesPaths.communication.forumTopic} element={<ForumTopic />} />

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
export default AppRoute;