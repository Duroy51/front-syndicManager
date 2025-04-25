import React from "react"
import { Route, Routes } from "react-router-dom"
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

const EventsTest = React.lazy(async () => ({
    default: (await import("../globalComponents/Evenement/EventsList")).EventsList
}))
const PublicationsTest = React.lazy(async () => ({
    default: (await import("../globalComponents/Publication/Publication")).Publication
}))

export const AppRoutesPaths = {
    loginPage: "/login",
    registerPage: "/register",
    welcomePage: "/",
    homePage: "/home",
    createSyndicat: "/home/createSyndicat",
    syndicatApp: "/syndicat-app",
    profil: "/profile",
    education: {
        base: "/education",
        blog: "/education/blog",
        blogArticle: "/education/blog/article/:id",
        podcast: "/education/podcast",
        newsletter: "/education/newsletter",
        podcastTag: "/education/podcast/tag/:tag",
        privacy: "/education/privacy",
        archives: "/education/newsletter/archives"
    },
    communication: {
        base: "/communication",
        chat: "/communication/chat",
        forum: "/communication/forum",
        forumTopic: "/communication/forum/topic/:id",
        chatbot: "/communication/chatbot"
    },
    eventsTest: "/test/events",
    publicationsTest: "/test/publications", 
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
        default:
                return <WelcomePage />;
    }
};








export function AppRoute() {

    const userRole = getRoleFromToken();

    return (
        <React.Suspense fallback={<CenteredSpinner/>}>
            <Routes>
                {/* Routes publiques Du Login, Register */}
                <Route path={AppRoutesPaths.loginPage} element={<LoginPage/>}/>
                <Route path={AppRoutesPaths.registerPage} element={<RegisterPage/>}/>
                <Route path={AppRoutesPaths.welcomePage} element={<WelcomePage/>}/>
                <Route path={AppRoutesPaths.profil} element={<Profil/>}/>




                {/* Route des utilisateurs du type business*/}
                <Route
                    path={AppRoutesPaths.syndicalistHomePage}
                    element={
                        <AuthGuard>
                            <SyndicalistHomePage />
                        </AuthGuard>
                    }
                />
                <Route path={AppRoutesPaths.eventsTest} element={<EventsTest/>}/>
                <Route path={AppRoutesPaths.publicationsTest} element={<PublicationsTest/>}/>



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
                    path={AppRoutesPaths.userHomePage}
                    element={
                        <AuthGuard>
                            <HomePage/>
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