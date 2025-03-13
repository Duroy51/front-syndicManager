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
    }

}