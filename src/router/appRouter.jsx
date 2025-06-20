import React from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import AuthGuard from '../helpers/AuthGuard.jsx';
import {getRoleFromToken} from "../services/AccountService.js";
import {AppRoutesPaths} from "./AppRoutesPaths.js";
import {CenteredSpinner} from "./Spinner.jsx";


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
React.lazy(async () => ({
    default: (await import("../SimpleUserComponent/HomePageSimpleUser.jsx")).SimpleUserHomePage
}));
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


const UserAcceuil = React.lazy(async () => ({
    default: (await import("../components/HomePage/AcceuilSection.jsx")).AcceuilSection
}))
const UserSyndicats = React.lazy(async () => ({
    default: (await import("../components/HomePage/MesSyndicatSection.jsx")).MesSyndicats
}))
const UserExplorer = React.lazy(async () => ({
    default: (await import("../components/HomePage/ExploreSection.jsx")).default
}))
const Layout = React.lazy(async () => ({
    default: (await import("../components/HomePage/localcomponent/Layout.jsx")).Layout
}))






export function AppRoute() {
    getRoleFromToken();
    return (
        <React.Suspense fallback={<CenteredSpinner/>}>
            <Routes>
                {/* Routes publiques Du Login, Register */}
                <Route path={AppRoutesPaths.loginPage} element={<LoginPage/>}/>
                <Route path={AppRoutesPaths.registerPage} element={<RegisterPage/>}/>
                <Route path={AppRoutesPaths.welcomePage} element={<WelcomePage/>}/>
                <Route path={AppRoutesPaths.profil} element={<Profil/>}/>


                <Route path={AppRoutesPaths.userPage} element={

                        <Layout/>

                }>
                    {/* Route par défaut - redirige vers dashboard */}
                    <Route index element={<Navigate to={AppRoutesPaths.userHomePage} replace />} />

                    {/* Routes enfants du Layout */}
                    <Route path={AppRoutesPaths.userHomePage} element={<UserAcceuil/>}/>
                    <Route path={AppRoutesPaths.userSyndicat} element={<UserSyndicats/>}/>
                    <Route path={AppRoutesPaths.userExplorer} element={<UserExplorer/>}/>

                </Route>




                {/* Route des utilisateurs du type business*/}
                <Route
                    path={AppRoutesPaths.syndicalistHomePage}
                    element={
                        <AuthGuard>
                            <SyndicalistHomePage />
                        </AuthGuard>
                    }
                />



                {/* Route pour les Simples utilisateurs */}
                <Route
                    path={AppRoutesPaths.createSyndicat}
                    element={
                        <AuthGuard>
                            <CreateSyndicat/>
                        </AuthGuard>
                    }
                />
                <Route
                    path={AppRoutesPaths.userSyndicatApp}
                    element={
                        <AuthGuard>
                            <SyndicatApp/>
                        </AuthGuard>
                    }
                />

            </Routes>
        </React.Suspense>
    );
}
export default AppRoute;