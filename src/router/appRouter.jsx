import { Spin } from "antd"
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

export const AppRoutesPaths = {

    loginPage: "/login",
    registerPage: "/register",
    welcomePage: "/"

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

            </Routes>
        </React.Suspense>
    )

}