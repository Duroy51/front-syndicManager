
import React from "react"
import { Route, Routes } from "react-router-dom"
import { Circles } from 'react-loader-spinner';




const LoginPage = React.lazy(async () => ({
    default: (await import("../components/Authentication/Login/LoginPage")).LoginPage
}))
const RegisterPage = React.lazy(async () => ({
    default: (await import("../components/Authentication/Register/RegisterPage")).RegisterPage
}))
const WelcomePage = React.lazy(async () => ({
    default: (await import("../components/welcomePage/welcomePage")).WelcomePage
}))

const HomePage = React.lazy(async () => ({
    default: (await import("../components/HomePage/HomePage")).HomePage
}))

const CreateSyndicat = React.lazy(async () => ({
    default: (await import("../components/CreateSyndicatPage/CreateSyndicat")).CreateSyndicat
}))

const SyndicatApp = React.lazy(async () => ({
    default: (await import("../components/Syndicat-App/SyndicatApp/Syndicat-App")).SyndicatApp
}))

const Profil = React.lazy(async () => ({
    default: (await import("../components/Syndicat-App/Profil/Profil.tsx")).Profile
}))

export const AppRoutesPaths = {

    loginPage: "/login",
    registerPage: "/register",
    welcomePage: "/",
    homePage: "/home",
    createSyndicat: "/home/createSyndicat",
    syndicatApp: "/syndicat-app",
    profil: "/syndicat-app/profil"

}

const CenteredSpinner = () => (
        <div className="flex items-center justify-center h-screen">
            <Circles
                height="40"  // Taille réduite
                width="40"   // Taille réduite
                color="#3498db"  // Couleur bleue
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
            <span className="ml-4 text-gray-600">Chargement...</span>
        </div>

    )
;

export function AppRoute() {
    return (
        <React.Suspense fallback={<CenteredSpinner/>}>
            <Routes>

                <Route path={AppRoutesPaths.loginPage} element={<LoginPage/>}/>
                <Route path={AppRoutesPaths.registerPage} element={<RegisterPage/>}/>
                <Route path={AppRoutesPaths.welcomePage} element={<WelcomePage/>}/>
                <Route path={AppRoutesPaths.homePage} element={<HomePage/>}/>
                <Route path={AppRoutesPaths.createSyndicat} element={<CreateSyndicat/>}/>
                <Route path={AppRoutesPaths.syndicatApp} element={<SyndicatApp/>}/>
                <Route path={AppRoutesPaths.profil} element={<Profil/>}/>

            </Routes>
        </React.Suspense>
    )

}
