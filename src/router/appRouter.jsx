import React from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Circles } from 'react-loader-spinner';
import AuthGuard from '../helpers/AuthGuard.jsx';
import {getRoleFromToken} from "../services/AccountService.js";
/*import { 
    MemoizedBlogContent,
    MemoizedPodcastContent,
    MemoizedNewsletterContent,
    MemoizedPrivacyPolicy,
    MemoizedNewsletterArchives
  } from '../components/Education/ContentManager.jsx';
import PodcastTagPage from '../components/Education/PodcastTagPage';
  import ArticleDetail from '../components/Education/ArticleDetail';
*/ 
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
                <Route path={AppRoutesPaths.eventsTest} element={<EventsTest/>}/>
                <Route path={AppRoutesPaths.publicationsTest} element={<PublicationsTest/>}/>

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